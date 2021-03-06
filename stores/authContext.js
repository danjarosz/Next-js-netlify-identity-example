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

  const logout = () => {
    netlifyIdentity.logout();
  };

  useEffect(() => {
    // it is looking for a users
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("login event");
    });

    // logout
    netlifyIdentity.on("logout", () => {
      setUser(null);
      console.log("logout event");
    });

    // check, if Netlify checked if a user is logged in - useful if logged user will refresh the page
    netlifyIdentity.on("init", (user) => {
      setUser(user);
      setAuthReady(true);
      console.log("init event");
    });

    //init netlify identity connection - it opens modal
    netlifyIdentity.init();

    return () => {
      // cleaning events
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const context = { user, login, logout, authReady };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
