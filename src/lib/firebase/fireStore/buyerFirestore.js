import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";
import toast from "react-hot-toast";

//  add buyer
export const addBuyer = async (data) => {
    try {
        console.log(data,"okeey")
       const result= await addDoc(collection(db, "users"), data);
       console.log(result)
        toast.success("user register succesfullt");
    } catch (error) {
        console.error("Error adding user: ", error);
    }
};
