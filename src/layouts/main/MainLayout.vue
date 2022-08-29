<template>
  <v-app theme="dark"
         :class="[
            customizer.mini_sidebar ? 'mini-sidebar' : '',
          ]"
  >
    <VerticalHeaderVue />
    <v-main>
        <RouterView />
      <Footer />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import VerticalHeaderVue from "./vertical-header/VerticalHeader.vue";
import { useCustomizerStore } from "@/stores/customizer";
import Footer from "./footer/Footer.vue"

const customizer = useCustomizerStore();
</script>
