import {
  createContext, ReactNode, useEffect, useState,
} from 'react';

import { firebase, Auth } from 'services/Firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const { displayName, photoURL, uid } = authUser;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account!');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
      return () => unsubscribe();
    });
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await Auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account!');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
