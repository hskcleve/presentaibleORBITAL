import React from "react";
import { useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import firebase from "firebase/app";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, displayName, school, role) {
    console.log("signup called");
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("getting user cred");
        const user = userCredential.user;
        const uid = user.uid;
        user
          .updateProfile({
            displayName: displayName,
          })
          .then(console.log("name updated"))
          .catch((error) => console.log("failed to update profile", error));
        addUser(uid, email, displayName, school, role);
      })
  }

  function addUser(uid, email, displayName, school, role) {
    db.collection("users")
      .doc(uid)
      .set({
        name: displayName,
        email: email,
        school: school,
        role: { tutor: role === "Tutor", student: role === "Student" },
        posts: [],
        classes: [],
      });
  }
  /*
  function login(email, password) {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
    return auth.signInWithEmailAndPassword(email, password);
    })
  }*/
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    addUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
