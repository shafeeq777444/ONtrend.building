/* eslint-disable no-unused-vars */
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { dbDemo } from "./democonfig";
import { serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

//************ utils ************
const generateCartItemId = (productId, variant, addons, pricePerQunatity) => {
    const sortedAddons = [...addons].sort().join(",");
    return `${productId}_${variant}_${sortedAddons}_${pricePerQunatity}`;
};

//************ Hooks ************
// whishlist
export async function toggleToWishlist(userId, product) {
    try {
        const wishlistRef = doc(dbDemo, "users", userId, "wishlist", product.id);
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
    const colRef = collection(dbDemo, "users", userId, "wishlist");
    const snapshot = await getDocs(colRef);
    console.log(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ######################################### cart #################################
// ----------- create/update cart product ---------------------------
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
  const cartRef = doc(dbDemo, "users", userId, "cart", cartItemId);

  const cartCollectionRef = collection(dbDemo, "users", userId, "cart");
  const cartSnapshot = await getDocs(cartCollectionRef);

  if (!cartSnapshot.empty) {
    const firstItem = cartSnapshot.docs[0].data();
    if (firstItem.restaurantName !== restaurantName) {
      throw new Error("You can only order from one vendor at a time."); // ✅ reaches onError now
    }
  }

  const existingItem = await getDoc(cartRef);
  if (existingItem.exists()) {
    const currentQty = existingItem.data().quantity || 0;
    const newQuantity = currentQty + quantity;

    await updateDoc(cartRef, {
      quantity: newQuantity,
      totalPrice: parseFloat((price * newQuantity).toFixed(3)),
      updatedAt: serverTimestamp(),
    });
  } else {
    await setDoc(cartRef, {
      ...rest,
      selectedVariant,
      selectedAddons,
      quantity,
      totalPrice: parseFloat((price * quantity).toFixed(3)),
      restaurantName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
};


// -------- change/update cart qunatity (from cart page) ------------
export const changeCartQuantity = async (userId, cartId, delta) => {
    const cartRef = doc(dbDemo, "users", userId, "cart", cartId);
    const existingItem = await getDoc(cartRef);

    if (!existingItem.exists()) {
        console.warn("Product not found in cart.");
        return;
    }

    const currentQuantity = existingItem.data().quantity || 1;
    const newQuantity = currentQuantity + delta;

    if (newQuantity <= 0) {
        return;
    } else {
        // ✅ Update with new quantity
        await updateDoc(cartRef, { quantity: newQuantity });
    }
};

//get all cart product
export const getAllCartItems = async (userId) => {
    const cartCollection = collection(dbDemo, "users", userId, "cart");
    const snapshot = await getDocs(cartCollection);

    const items = snapshot.docs.map((doc) => ({
        id: doc.id, // Firestore document ID (cartItemId)
        ...doc.data(), // Cart item data
    }));

    console.log(items);
    return items;
};

//delete cart product
export const removeFromCart = async (userId, productId) => {
    const cartRef = doc(dbDemo, "users", userId, "cart", productId);
    await deleteDoc(cartRef);
};
