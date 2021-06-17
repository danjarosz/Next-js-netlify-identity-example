import { createContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {};

  useEffect(() => {
    // it is looking for a users
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("login event");
    });

    //init netlify identity connection - it opens modal
    netlifyIdentity.init();
  }, []);

  const context = { user, login, logout, authReady };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
