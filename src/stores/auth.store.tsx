import { ROLES } from "@static/constants";
import { Action, action, Computed, computed } from "easy-peasy";
import { Page } from "types/pages";
import { User } from "types/user";

export interface IAuthStore {
  user: User;
  setUser: Action<IAuthStore, Page>;
  removeUser: Action<IAuthStore>;
  doLogOut: Action<IAuthStore>;
  isLoggedIn: Computed<IAuthStore>;
  userRole: Computed<IAuthStore>;
}

const authStore: IAuthStore = {
  user: {},
  setUser: action((state, user) => {
    state.user = user;
  }),
  removeUser: action(state => {
    state.user = {};
  }),
  doLogOut: action(state => {
    state.user = {};
    state.isLoggedIn = false;
  }),
  isLoggedIn: computed(state => state.user.hasOwnProperty("role")),
  userRole: computed(state =>
    state.user.hasOwnProperty("role") ? state.user.role : ROLES.UNAUTHORIZED
  )
};

export default authStore;
