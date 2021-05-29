import React from "react";
import { useContext, useState, useEffect } from "react";
import { db,auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, displayName) {
    console.log("signup called");
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("getting user cred");
        const user = userCredential.user;
        user
          .updateProfile({
            displayName: displayName,
          })
          .then(console.log("name updated"))
          .catch((error) => console.log("failed to update profile", error));
      })
      .catch(console.log("failed to register user"));
  }

  function addUser(email, displayName, school) {
    db.collection('users').add({
      name: displayName,
      email: email,
      school: school,
      submissions: ['This is submission1', 'This is submission2'],
    })
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
