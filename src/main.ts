import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@/scss/style.scss";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import VueApexCharts from "vue3-apexcharts";
// @ts-ignore
import InstantSearch from "vue-instantsearch/vue3/es";
import VCalendar from "v-calendar";
import VueFeather from "vue-feather";
import store from "./stores/index";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";


const app = createApp(App);
app.component(VueFeather.name, VueFeather);
app.use(PerfectScrollbar);
app.use(InstantSearch);
app.use(createPinia());
app.use(VCalendar, {});
app.use(VueApexCharts);
app.use(store);
app.use(router);
app.use(vuetify)
app.component("baseBreadcrumb", BaseBreadcrumb);
app.mount("#app");

