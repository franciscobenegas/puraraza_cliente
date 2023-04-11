import { useState, useEffect, createContext } from "react";
import { Token, User } from "@/api";

const tokenCtrl = new Token();
const userCtrl = new User();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = tokenCtrl.getToken();

      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      if (tokenCtrl.hasExpired(token)) {
        logout();
      } else {
        await login(token);
      }
    })();
  }, []);

  const logout = () => {
    console.log("logout en AuthContext");
    tokenCtrl.removeToken();
    setToken(null);
    setUser(null);
  };

  const login = async (token) => {
    try {
      // TODO: Setear el Token en el localStore
      tokenCtrl.setToken(token);
      // TODO: Optener los datos del Usuario
      const response = await userCtrl.getMe();
      // TODO: Setear los datos del Usuario User
      setUser(response);
      // TODO: Setear el valor de Token en el estado token
      setToken(token);
      // TODO: Hacer un setLoading false
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const updateUser = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
