import axios, { AxiosResponse } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import React, { createContext, ReactNode, useContext } from "react";

export const baseUrl = "http://localhost:34561";

export const config = () => {
  return {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      responseType: "json",
      Authorization: `bearer ${sessionStorage.getItem("userToken")}`,
    },
  };
};

export class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  Login = async (credentials: { userName: string; password: string }) => {
    try {
      const { data }: AxiosResponse<string> = await axios.post(
        `${baseUrl}/Login/Authenticate`,
        credentials,
        config()
      );
      return data;
    } catch (e) {
      return null;
    }
  };

  ValidateLogin = async (token: string) => {
    try {
      const { data }: AxiosResponse<boolean> = await axios.post(
        `${baseUrl}/Login/Validate`,
        { token },
        config()
      );
      return true;
    } catch (e) {
      return false;
    }
  };
}

// const AuthStoreInstance = new AuthStore();

// const AuthStoreContext = createContext<AuthStore>(AuthStoreInstance);

// export const AuthStoreContextProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const authStore = useContext(AuthStoreContext);
//   return (
//     <AuthStoreContext.Provider value={authStore}>
//       {children}
//     </AuthStoreContext.Provider>
//   );
// };

// export const useAuthStore = () => {
//   return useContext(AuthStoreContext);
// };
