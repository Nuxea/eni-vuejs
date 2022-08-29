<script setup lang="ts">
import { RouterView } from "vue-router";
import VerticalSidebarVue from "./vertical-sidebar/VerticalSidebar.vue";
import VerticalHeaderVue from "./vertical-header/VerticalHeader.vue";
import { useCustomizerStore } from "@/stores/customizer";

const customizer = useCustomizerStore();
</script>

<template>
  <v-app theme="dark"
         :class="[
            customizer.mini_sidebar ? 'mini-sidebar' : '',
          ]"
  >
    <VerticalHeaderVue />
    <VerticalSidebarVue />
    <v-main>
      <v-container fluid class="page-wrapper">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
