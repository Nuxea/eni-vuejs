<script setup lang="ts">
import { ref } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
import sidebarItems from "./sidebarItem";
import { useStore } from "vuex";

const customizer = useCustomizerStore();
const sidebarMenu = ref(sidebarItems);
const store = useStore();
const { currentUser } = store.getters;
</script>

<template>
  <v-navigation-drawer
    left
    :permanent="$vuetify.display.mdAndUp"
    v-model="customizer.Sidebar_drawer"
    elevation="10"
    rail-width="100"
    mobile-breakpoint="960"
    app
    :rail="customizer.mini_sidebar"
    expand-on-hover=""
  >
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <div class="profile">
        <div class="profile-pic">
          <v-avatar size="45">
            <img src="@/assets/images/users/user2.jpg" width="50" alt="Julia" />
          </v-avatar>
        </div>
        <div class="profile-name">
          <h5>{{ currentUser.username }}</h5>
        </div>
      </div>
      <v-list class="pa-4" color="#fff">
        <!-- ---------------------------------------------- -->
        <!---Menu Loop -->
        <!-- ---------------------------------------------- -->
        <template v-for="(item, i) in sidebarMenu">
          <!-- ---------------------------------------------- -->
          <!---Item Sub Header -->
          <!-- ---------------------------------------------- -->
          <v-list-subheader v-if="item.header">{{
            item.header
          }}</v-list-subheader>
          <!-- ---------------------------------------------- -->
          <!---If Has Child -->
          <!-- ---------------------------------------------- -->
          <v-list-group v-else-if="item.children" class="">
            <!-- ---------------------------------------------- -->
            <!---Dropdown  -->
            <!-- ---------------------------------------------- -->
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :value="item.title"
                rounded="lg"
                class="mb-1"
              >
                <!---Icon  -->
                <v-list-item-avatar start class="v-list-item-avatar--start">
                  <vue-feather
                    :type="item.icon"
                    class="feather-sm"
                  ></vue-feather>
                </v-list-item-avatar>
                <!---Title  -->
                <v-list-item-title
                  v-text="item.title"
                  class="mr-auto"
                ></v-list-item-title>
                <template v-slot:append>
                  <v-list-item-avatar end class="v-list-item-avatar--end">
                    <vue-feather
                      type="chevron-down"
                      class="feather-sm"
                    ></vue-feather>
                  </v-list-item-avatar>
                </template>
              </v-list-item>
            </template>
            <!-- ---------------------------------------------- -->
            <!---Sub Item-->
            <!-- ---------------------------------------------- -->
            <v-list-item
              v-for="(subitem, i) in item.children"
              :key="i"
              :value="subitem.to"
              :to="subitem.to"
              rounded="lg"
              class="first-level-item mb-1"
            >
              <v-list-item-avatar start class="v-list-item-avatar--start">
                <vue-feather type="disc" class="feather-sm"></vue-feather>
              </v-list-item-avatar>
              <v-list-item-title v-text="subitem.title"></v-list-item-title>
            </v-list-item>
          </v-list-group>
          <!-- ---------------------------------------------- -->
          <!---Single Item-->
          <!-- ---------------------------------------------- -->
          <v-list-item v-else :key="i" :to="item.to" rounded="lg" class="mb-1">

            <div class="d-flex">
              <v-list-item-avatar start class="v-list-item-avatar--start">
                <vue-feather
                  :type="item.icon"
                  class="feather-sm v-icon v-icon--size-default"
                ></vue-feather>
              </v-list-item-avatar>
              <v-list-item-title class="ml-5" v-text="item.title"></v-list-item-title>
            </div>
          </v-list-item>
          <!-- ---------------------------------------------- -->
          <!---End Single Item-->
          <!-- ---------------------------------------------- -->
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
