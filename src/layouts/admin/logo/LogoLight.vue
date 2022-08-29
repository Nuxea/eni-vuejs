<template>
  <div class="logo">
    <RouterLink to="/admin" class="d-flex">
      <img src="../../../assets/images/logos/white-logo-icon.svg" alt=""/>
      <img
        src="../../../assets/images/logos/white-logo-text.svg"
        class="pl-3"
       alt=""/>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
