import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

// each vendors foods(parallel version---------------------------------------------------
export const getVendorFoodsAndCategories = async (vendorId) => {
    try {
        console.log(vendorId, "jjj");
        // get full foodcategory
        // Reference to the collection
        const categoriesRef = collection(db, "Food/items/categories");
        const approvedQuery = query(categoriesRef, where("isApproved", "==", true));
        const approvedSnapshots = await getDocs(approvedQuery);

        // get each task (each category included foods) tthat get in array witha ttop array
        const fetchTasks = approvedSnapshots.docs.map(async (categoryDoc) => {
            const categoryId = categoryDoc.id;
            const foodsRef = collection(db, `Food/items/categories/${categoryId}/details`);
            const approvedFoodsQuery = query(foodsRef, where("isApproved", "==", true));
            const foodDocs = await getDocs(approvedFoodsQuery);
            return foodDocs.docs
                .filter((doc) => doc.data().addedBy === vendorId)
                .map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                    category: categoryId,
                }));
        });
        //   all are working asyncronus
        const allFoodsNested = await Promise.all(fetchTasks);
        //   flatten  array
        const allFoods = allFoodsNested.flat();

        const uniqueCategories = ["All",...new Set(allFoods.map((food) => food.category))];

        return {
            foods: allFoods,
            categories: uniqueCategories,
        };
    } catch (er) {
        console.log(er);
        return{
            foods: [],
            categories: [],
        }
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
