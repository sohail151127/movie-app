// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,
         createUserWithEmailAndPassword,
         updateProfile, 
         signInWithEmailAndPassword,
         onAuthStateChanged, 
         signOut,
         GoogleAuthProvider,
         signInWithPopup,
         sendPasswordResetEmail} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

//Register a user .... visit docs... (https://firebase.google.com/docs/auth/web/start)
//Sign up new users
export const registerUser = async(email, password, displayName) =>{
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, {displayName})
        console.log("auth.currentUser:",auth.currentUser)  
    } catch (err) {
        return err.message.replace("Firebase:","")
    } 
}

//Login a user
//Go to documentation (signing in existing user)
export const login = async(email, password)=>{
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("userCredential:",userCredential);
    } catch (err) {
        return err.message.replace("Firebase:","")
    }
}

//Set an authentication state observer and get user data .... onAuthStateChanged .....
//either user is loged in or loged out, it will observer
export const userObserver = (setCurrentUser) =>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setCurrentUser(user)         
        } else {
          // User is signed out
          setCurrentUser(null)
        }
      });
}


//exported to navbar
export const logout=()=>{
    signOut(auth);
}


//Authenticate Using Google with JavaScript
export const signUpProvider = async()=>{
    const provider = new GoogleAuthProvider();

    //signin with popup
    await signInWithPopup(auth, provider)
}


//forget password
export const forgotPassword=async(email)=>{
    try {
        await sendPasswordResetEmail(auth, email);
        return "please check your mail box !"
    } catch (err) {
        return err.message.replace("Firebase:","")
    }
}