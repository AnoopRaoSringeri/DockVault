import axios, { AxiosResponse } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import React, { useContext } from "react";
import { Children, createContext } from "react";
import { User } from "../models/models";
import { baseUrl, config } from "./auth-store";
import { LoadState } from "./types";

export class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  public users: User[] = [];
  private usersLoadState: LoadState = LoadState.NotLoaded;
  Initialize = async () => {
    await this.GetAllUsers();
  };

  GetAllUsers = async () => {
    if (
      this.usersLoadState == LoadState.Loaded ||
      this.usersLoadState == LoadState.Loading
    ) {
      return;
    }
    this.usersLoadState = LoadState.Loading;
    try {
      const { data }: AxiosResponse<User[]> = await axios.get(
        `${baseUrl}/api/Users`,
        config()
      );
      runInAction(() => {
        this.users = data;
        this.usersLoadState = LoadState.Loaded;
      });
      return data;
    } catch (e) {
      return null;
    }
  };

  AddUser = async (user: User) => {
    try {
      const { data }: AxiosResponse<User> = await axios.post(
        `${baseUrl}/api/Users`,
        user,
        config()
      );
      runInAction(() => {
        this.users.push(data);
      });
      return data;
    } catch (e) {
      return null;
    }
  };
}

// const UserStoreInstance = new UserStore();

// const UserStoreContext = createContext<UserStore>(UserStoreInstance);

// export const UserStoreContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const userStore = useContext(UserStoreContext);
//   return (
//     <UserStoreContext.Provider value={userStore}>
//       {children}
//     </UserStoreContext.Provider>
//   );
// };

// export const useUserStore = () => {
//   return useContext(UserStoreContext);
// };
