import { defineStore } from "pinia";

interface State {
  Sidebar_drawer: any;
  mini_sidebar: boolean;
  navbarColor: string;
}

export const useCustomizerStore = defineStore({
  id: "customizer",
  state: (): State => ({
    Sidebar_drawer: null,
    mini_sidebar: false,
    navbarColor: "#1e88e5",
  }),

  getters: {},
  actions: {
    SET_SIDEBAR_DRAWER() {
      this.Sidebar_drawer = !this.Sidebar_drawer;
    },
    SET_MINI_SIDEBAR(payload: any) {
      this.mini_sidebar = payload;
    },
  },
});
