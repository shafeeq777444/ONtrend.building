import { collection, collectionGroup, getDocs, limit, query, startAfter, where } from "firebase/firestore";
import { db } from "../config";

// each vendors foods(parallel version---------------------------------------------------
// export const getVendorFoodsAndCategories = async (vendorId) => {
//   try {
//     const categoriesRef = collection(db, "Food/items/categories");
//     const approvedQuery = query(categoriesRef, where("isApproved", "==", true));
//     const approvedSnapshots = await getDocs(approvedQuery);

//     const fetchVendorFoodsByCategory = approvedSnapshots.docs.map(async (categoryDoc) => {
//       const categoryId = categoryDoc.id;
//       const foodsRef = collection(db, `Food/items/categories/${categoryId}/details`);
//       const approvedFoodsQuery = query(
//         foodsRef,
//         where("isApproved", "==", true),
//         where("addedBy", "==", vendorId) // ✅ filter at query-level
//       );

//       const foodDocs = await getDocs(approvedFoodsQuery);

//       return foodDocs.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//         category: categoryId,
//       }));
//     });

//     const nestedFoods = await Promise.all(fetchVendorFoodsByCategory);
//     const allFoods = nestedFoods.flat();

//     const uniqueCategories = ["All", ...new Set(allFoods.map((food) => food.category))];

//     return {
//       foods: allFoods,
//       categories: uniqueCategories,
//     };
//   } catch (error) {
//     console.error("Error fetching vendor foods and categories:", error);
//     return {
//       foods: [],
//       categories: [],
//     };
//   }
// };

// get all catergories (vedner included)
export const getVendorFoodCategories = async (vendorId) => {
  try {
    const q = query(
      collectionGroup(db, "details"),
      where("isApproved", "==", true),
      where("addedBy", "==", vendorId)
    );

    const snapshot = await getDocs(q);

    const categoriesSet = new Set();

    snapshot.forEach((doc) => {
      const tag = doc.data()?.tag;
      if (tag) categoriesSet.add(tag);
    });

    const categories = ["All", ...Array.from(categoriesSet)];
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return ["All"];
  }
};

// avoid collection mapping--------------(avoid fetching collection)
export const getVendorFoodsPaginated = async (
  vendorId,
  pageSize = 12,
  lastVisibleDoc = null,
  categoryFilter = "All"
) => {
  try {
    let filters = [
      where("isApproved", "==", true),
      where("addedBy", "==", vendorId)
    ];

    if (categoryFilter && categoryFilter !== "All") {
      filters.push(where("tag", "==", categoryFilter));
    }

    let q = query(
      collectionGroup(db, "details"),
      ...filters,
      limit(pageSize)
    );

    if (lastVisibleDoc) {
      q = query(q, startAfter(lastVisibleDoc));
    }

    const snapshot = await getDocs(q);

    const foods = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      category: doc.data()?.tag || "Unknown",
    }));

    return {
      foods,
      lastVisible: snapshot.docs[snapshot.docs.length - 1] || null,
      hasMore: snapshot.size === pageSize,
    };
  } catch (error) {
    console.error("Error fetching paginated foods:", error);
    return {
      foods: [],
      lastVisible: null,
      hasMore: false,
    };
  }
};




// each vendors foods (serial version)
// export const getVendorFoodsAndCategories = async (vendorId) => {
//     try {
//         console.log(vendorId, "jjj");

//         const categoriesRef = collection(db, "Food/items/categories");
//         const approvedQuery = query(categoriesRef, where("isApproved", "==", true));
//         const approvedSnapshots = await getDocs(approvedQuery);

//         const allFoods = [];

//         for (const categoryDoc of approvedSnapshots.docs) {
//             const categoryId = categoryDoc.id;
//             const foodsRef = collection(db, `Food/items/categories/${categoryId}/details`);
//             const approvedFoodsQuery = query(foodsRef, where("isApproved", "==", true));
//             const foodDocs = await getDocs(approvedFoodsQuery);

//             for (const doc of foodDocs.docs) {
//                 const data = doc.data();
//                 if (data.addedBy === vendorId) {
//                     allFoods.push({
//                         ...data,
//                         id: doc.id,
//                         category: categoryId,
//                     });
//                 }
//             }
//         }

//         const uniqueCategories = ["All", ...new Set(allFoods.map((food) => food.category))];

//         return {
//             foods: allFoods,
//             categories: uniqueCategories,
//         };
//     } catch (err) {
//         console.error(err);
//         return {
//             foods: [],
//             categories: [],
//         };
//     }
// };
