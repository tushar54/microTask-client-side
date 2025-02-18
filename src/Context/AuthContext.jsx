import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, } from "firebase/auth";
import { auth } from "../firebase.config";
import axios from "axios";

export const Context = createContext()

const AuthContext = ({ children }) => {
    const provider = new GoogleAuthProvider()
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    

    // googlesignup 
    const googleSignup = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    // googlesignup 

    // signIN and sing up withpassword 
    const SignUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const Signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // signIN and sing up withpassword  

    // signout withpassword 
    const Out = () => {
        setLoading(true)
        signOut(auth)
    }
    // signout withpassword 

    //  set observer 
    useEffect(() => {
        const observer = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            if (user) {
                const userinfo = { email: user.email };
                axios.post('https://micro-service-earning-platfrom-server-side.vercel.app/jwt', userinfo)
                    .then(res => {
                       
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token); 
                            setLoading(false);
                        }
                    })
                    .catch(err => console.error("Error setting token:", err));
            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        });
        return () => observer();
    }, []);
    
    //  set observer 

    // value pass
    const addToContext = {
        Signin,
        SignUp,
        Out,
        currentUser,
        loading,
        googleSignup,
        setLoading

    }
    // value pass
    return <Context.Provider value={addToContext}>{children}</Context.Provider>


};

export default AuthContext;