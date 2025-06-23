import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { dbDemo } from "./democonfig";

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
                addedAt: new Date(),
                ...productWithoutReference
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
    console.log(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};



// cart---------------------------------------------
// create/update cart product
export const addToCart = async (userId, product) => {
    try{
    const cartRef = doc(dbDemo, "users", userId, "cart", product.id);
    
    const existingItem = await getDoc(cartRef);
    
    if (existingItem.exists()) {
        const currentQuantity = existingItem.data().quantity || 1;
        await updateDoc(cartRef, {
            quantity: currentQuantity + 1, // ✅ increment quantity
        });
    } else {
      console.log("worked")
// eslint-disable-next-line no-unused-vars
const { reference, ...productWithoutReference } = product;

await setDoc(cartRef, {
  quantity: 1,
  addedAt: new Date(),
  ...productWithoutReference,
});

  }
}catch(er){
    console.log(er)
}
};

// change cart qunatity
export const changeCartQuantity = async (userId, productId, delta) => {
  const cartRef = doc(dbDemo, "users", userId, "cart", productId);
  const existingItem = await getDoc(cartRef);

  if (!existingItem.exists()) {
    console.warn("Product not found in cart.");
    return;
  }

  const currentQuantity = existingItem.data().quantity || 1;
  const newQuantity = currentQuantity + delta;

  if (newQuantity <= 0) {
    // ❌ Remove from cart
    await deleteDoc(cartRef);
  } else {
    // ✅ Update with new quantity
    await updateDoc(cartRef, { quantity: newQuantity });
  }
};


//get all cart product
export const getAllCartItems = async (userId) => {
  const cartCollection = collection(dbDemo, "users", userId, "cart");
  const snapshot = await getDocs(cartCollection);
  return snapshot.docs.map(doc => doc.data());
};

//delete cart product
export const removeFromCart = async (userId, productId) => {
  const cartRef = doc(dbDemo, "users", userId, "cart", productId);
  await deleteDoc(cartRef);
};
