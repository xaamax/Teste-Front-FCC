import { createStore } from 'vuex';
import users from "@/context/users.json";

const store = createStore({
  state: {
    userInfo: JSON.parse(localStorage.getItem("user-info")) || null,
    isLoading: false,
    toast: null
  },
  getters: {
    isAuthenticated: (state) => {
      if (!state.userInfo) return false;
      return users.some((user) => user.email === state.userInfo.email);
    },
  },
  mutations: {
    setUser(state, user) {
      state.userInfo = user;
      localStorage.setItem("user-info", JSON.stringify(user));
    },
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem("user-info");
    },
    setLoading(state, loading) {
      state.isLoading = loading;
    },
    setToast(state, toast) {
      state.toast = toast;
    },
    clearToast(state) {
      state.toast = null;
    }
  },
  actions: {
    login({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("logout");
    },
    showToast({ commit }, toast) {
      commit("setToast", toast);
    }
  },
})

export default store