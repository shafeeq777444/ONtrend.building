import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getRedirectResult,
} from "firebase/auth";
import { auth, db } from "./config";
import { doc, getDoc } from "firebase/firestore";

const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

// check if user Exist
export const checkIfUserExists = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists(); //true or false
};

// sign with facebook
export function signInWithFacebook() {
    signInWithPopup(auth, fbProvider)
        .then((result) => {
            const user = result.user;
            const exist = checkIfUserExists(user?.uid); //true or false
            return { exist, user };
        })
        .catch((error) => {
            console.error("Facebook Error:", error);
        });
}

// sign with google
export async function signInWithGoogle() {
  try {
    const result = await getRedirectResult(auth);

    if (!result) return { user: null, exist: null }; // No login attempt

    const user = result.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));

    return {
      user,
      exist: userDoc.exists(),
    };
  } catch (error) {
    console.error("Redirect Sign-In Error", error);
    return { error };
  }
}


// sign with Phone number---------------------------------
let confirmationResultGlobal = null;

// Set up Recaptcha
export const setupReCaptcha = () => {
    console.log(auth);
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    console.log("reCAPTCHA resolved:", response);
                },
            },
            auth
        );
    }
};

// Send OTP
export const signInWithPhone = async (phoneNumber) => {
    setupReCaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        confirmationResultGlobal = confirmationResult;
        return true;
    } catch (err) {
        console.error("Error sending OTP:", err);
        throw err;
    }
};

// Verify OTP
export const verifyOtpCode = async (otpCode) => {
    if (!confirmationResultGlobal) {
        throw new Error("No confirmation result found. Please request OTP first.");
    }

    try {
        const result = await confirmationResultGlobal.confirm(otpCode);
        return result.user; // Login successful
    } catch (err) {
        console.error("OTP verification failed:", err);
        throw err;
    }
};

// sign with email
export async function loginUser(email, password) {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in:", userCred.user);
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            console.error("No user found with this email");
        } else if (error.code === "auth/wrong-password") {
            console.error("Incorrect password");
        } else {
            console.error("Login failed:", error.message);
        }
    }
}

export async function registerUser(email, password) {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registered new user:", userCred.user);
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            console.error("This email is already registered");
        } else {
            console.error("Registration failed:", error.message);
        }
    }
}
