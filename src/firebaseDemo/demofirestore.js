/* eslint-disable no-unused-vars */
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

import { serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "@/firebase/config";
import localforage from "localforage";

//************************ utils ***********************************************************************
const generateCartItemId = (productId, variant, addons, pricePerQunatity) => {
    const sortedAddons = [...addons].sort().join(",");
    return `${productId}_${variant}_${sortedAddons}_${pricePerQunatity}`;
};

//************************ Hooks ***********************************************************************
// ################################# whishlist  #######################################
export async function toggleToWishlist(userId, product) {
    try {
        const wishlistRef = doc(db, "users", userId, "wishlist", product.id);
        const { reference, ...productWithoutReference } = product;
        const snap = await getDoc(wishlistRef);

        if (snap.exists()) {
            await deleteDoc(wishlistRef);
            console.log("Product removed from wishlist");
            return { action: "removed", productId: product.id };
        } else {
            await setDoc(wishlistRef, {
                createdAt: serverTimestamp(), // ✅ create time
                ...productWithoutReference,
            });
            console.log("Product added to wishlist");
            return { action: "added", productId: product.id };
        }
    } catch (error) {
        console.error("Error adding to wishlist:", error);
    }
}

export const fetchWishlist = async (userId) => {
    const colRef = collection(db, "users", userId, "wishlist");
    const snapshot = await getDocs(colRef);
    console.log(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ######################################### cart #################################
// // ----------- create/update cart product ---------------------------
// export const addToCart = async (userId, product) => {
//   const {
//     id,
//     selectedVariant,
//     selectedAddons = [],
//     pricePerQuantity = "0",
//     quantity = 1,
//     reference,
//     restaurantName,
//     ...rest
//   } = product;

//   const price = parseFloat(pricePerQuantity);
//   const cartItemId = generateCartItemId(id, selectedVariant, selectedAddons, price);
//   const cartRef = doc(db, "users", userId, "cart", cartItemId);

//   const cartCollectionRef = collection(db, "users", userId, "cart");
//   const cartSnapshot = await getDocs(cartCollectionRef);

//   if (!cartSnapshot.empty) {
//     const firstItem = cartSnapshot.docs[0].data();
//     if (firstItem.restaurantName !== restaurantName) {
//       throw new Error("You can only order from one vendor at a time."); // ✅ reaches onError now
//     }
//   }

//   const existingItem = await getDoc(cartRef);
//   if (existingItem.exists()) {
//     const currentQty = existingItem.data().quantity || 0;
//     const newQuantity = currentQty + quantity;

//     await updateDoc(cartRef, {
//       quantity: newQuantity,
//       totalPrice: parseFloat((price * newQuantity).toFixed(3)),
//       updatedAt: serverTimestamp(),
//     });
//   } else {
//     await setDoc(cartRef, {
//       ...rest,
//       selectedVariant,
//       selectedAddons,
//       quantity,
//       totalPrice: parseFloat((price * quantity).toFixed(3)),
//       restaurantName,
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//     });
//   }
// };


// // -------- change/update cart qunatity (from cart page) ------------
// export const changeCartQuantity = async (userId, cartId, delta) => {
//     const cartRef = doc(db, "users", userId, "cart", cartId);
//     const existingItem = await getDoc(cartRef);

//     if (!existingItem.exists()) {
//         console.warn("Product not found in cart.");
//         return;
//     }

//     const currentQuantity = existingItem.data().quantity || 1;
//     const newQuantity = currentQuantity + delta;

//     if (newQuantity <= 0) {
//         return;
//     } else {
//         // ✅ Update with new quantity
//         await updateDoc(cartRef, { quantity: newQuantity });
//     }
// };

// //----------  get all cart product --------------------------------
// export const getAllCartItems = async (userId) => {
//     const cartCollection = collection(db, "users", userId, "cart");
//     const snapshot = await getDocs(cartCollection);

//     const items = snapshot.docs.map((doc) => ({
//         id: doc.id, // Firestore document ID (cartItemId)
//         ...doc.data(), // Cart item data
//     }));

//     console.log(items);
//     return items;
// };

// //------------------ delete cart product -------------------------
// export const removeFromCart = async (userId, productId) => {
//     const cartRef = doc(db, "users", userId, "cart", productId);
//     await deleteDoc(cartRef);
// };


// ########## indexDb (cart Handle) ##############################
const cartStore = localforage.createInstance({
  name: "myApp",
  storeName: "cart", // 'cart' objectStore
});

// // ----------- indesDb:create/update cart product ---------------------------
export const addToCart = async (userId, product) => {
  const {
    id,
    selectedVariant,
    selectedAddons = [],
    pricePerQuantity = "0",
    quantity = 1,
    reference,
    restaurantName,
    ...rest
  } = product;

  const price = parseFloat(pricePerQuantity);
  const cartItemId = generateCartItemId(id, selectedVariant, selectedAddons, price);

  const allItems = await cartStore.getItem(userId) || {};
  const cartItems = allItems || {};

  const cartItemsArray = Object.values(cartItems);
  if (cartItemsArray.length > 0) {
    const firstItem = cartItemsArray[0];
    if (firstItem.restaurantName !== restaurantName) {
      throw new Error("You can only order from one vendor at a time.");
    }
  }

  const existingItem = cartItems[cartItemId];
  if (existingItem) {
    const newQuantity = (existingItem.quantity || 0) + quantity;

    cartItems[cartItemId] = {
      ...existingItem,
      quantity: newQuantity,
      totalPrice: parseFloat((price * newQuantity).toFixed(3)),
      updatedAt: new Date().toISOString(),
    };
  } else {
    cartItems[cartItemId] = {
      ...rest,
      selectedVariant,
      selectedAddons,
      quantity,
      totalPrice: parseFloat((price * quantity).toFixed(3)),
      restaurantName,
      reference: JSON.stringify(reference), // serialize complex data
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  await cartStore.setItem(userId, cartItems);
};

// // -------- indexDb:change/update cart qunatity (from cart page) ------------
export const changeCartQuantity = async (userId, cartId, delta) => {
  const cartItems = await cartStore.getItem(userId) || {};

  const existingItem = cartItems[cartId];
  if (!existingItem) {
    console.warn("Product not found in cart.");
    return;
  }

  const currentQuantity = existingItem.quantity || 1;
  const newQuantity = currentQuantity + delta;

  if (newQuantity <= 0) {
    return;
  }

  cartItems[cartId] = {
    ...existingItem,
    quantity: newQuantity,
    totalPrice: parseFloat((parseFloat(existingItem.pricePerQuantity || "0") * newQuantity).toFixed(3)),
    updatedAt: new Date().toISOString(),
  };

  await cartStore.setItem(userId, cartItems);
};

// //----------  IndexDB: get all cart product --------------------------------
export const getAllCartItems = async (userId) => {
  const cartItems = await cartStore.getItem(userId) || {};

  const items = Object.entries(cartItems).map(([id, item]) => ({
    id,
    ...item,
    reference: item.reference ? JSON.parse(item.reference) : null, // deserialize
  }));

  console.log(items);
  return items;
};

// //------------------ IndexDB: delete cart product -------------------------
export const removeFromCart = async (userId, productId) => {
  const cartItems = await cartStore.getItem(userId) || {};

  if (cartItems[productId]) {
    delete cartItems[productId];
    await cartStore.setItem(userId, cartItems);
  }
};
