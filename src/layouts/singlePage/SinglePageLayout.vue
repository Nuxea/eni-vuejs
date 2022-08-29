<template>
  <v-app theme="dark">
    <RouterView />
  </v-app>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import { useCustomizerStore } from "@/stores/customizer";
const customizer = useCustomizerStore();
</script>
