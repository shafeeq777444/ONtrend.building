import { collection, collectionGroup, getDocs, query, where } from "firebase/firestore";
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

// avoid collection mapping--------------(avoid fetching collection)
export const getVendorFoodsAndCategories = async (vendorId) => {
  try {
    const foodsQuery = query(
      collectionGroup(db, "details"),
      where("isApproved", "==", true),
      where("addedBy", "==", vendorId)
    );

    const snapshot = await getDocs(foodsQuery);

    const categoriesSet = new Set();
    const foods = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const category = data.tag || "Unknown";

      categoriesSet.add(category);

      foods.push({
        ...data,
        id: doc.id,
        category, // use tag as category
      });
    });

    const uniqueCategories = ["All", ...categoriesSet];

    return {
      foods,
      categories: uniqueCategories,
    };
  } catch (error) {
    console.error("Error fetching vendor foods and categories:", error);
    return {
      foods: [],
      categories: [],
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
