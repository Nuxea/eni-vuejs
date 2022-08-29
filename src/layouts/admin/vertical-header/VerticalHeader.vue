<script setup lang="ts">
import { ref } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
import LogoLight from "../logo/LogoLight.vue";
import { useStore } from "vuex";
import router from "@/router";
import UserRole from "@/models/user-role";
const customizer = useCustomizerStore();
const href = ref(undefined);
const store = useStore();
const { currentUser } = store.getters;
function isAdmin() {
  return currentUser?.role === UserRole.ADMIN;
}
function logOut() {
  store.dispatch("clearUser");
  router.push("/login")
}
</script>

<template>
  <v-app-bar theme="dark"
             elevation="5"
             :class="[
                'v-topbar',
                customizer.navbarColor === '#f6f6f6' ? '' : 'text-white',
    ]"
  >
    <!-- ---------------------------------------------- -->
    <!---Logo part -->
    <!-- ---------------------------------------------- -->
    <div class="pa-4">
      <LogoLight />
    </div>
    <v-app-bar-nav-icon
      class="hidden-sm-and-down"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    />
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
    />
    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu anchor="bottom end" origin="auto" min-width="300">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="pa-0 px-1"
          elevation="0"
          color="transparent"
          plain
          :ripple="false"
        >
          <v-avatar size="35">
            <img src="@/assets/images/users/user2.jpg" width="40" alt="Julia" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list class="pa-6" elevation="10" rounded="lg">
        <h4 class="font-weight-medium fs-18">Profil</h4>
        <div class="d-flex align-center my-4">
          <img
            src="@/assets/images/users/user2.jpg"
            alt="Julia"
            class="rounded-circle"
            width="90"
          />
          <div class="ml-4">
            <h4 class="font-weight-medium fs-18">{{ currentUser.username }}</h4>
            <span class="subtitle-2 font-weight-light">{{ currentUser.role }}</span>
            <div class="d-flex align-center">
              <vue-feather
                type="mail"
                size="16"
                class="d-flex grey--text"
              ></vue-feather>
              <span class="subtitle-2 font-weight-light ml-1"
                >{{ currentUser.email }}</span
              >
            </div>
          </div>
        </div>
        <v-list-item
          v-if="isAdmin"
          href="/"
          class="pa-3 mb-2"
          title="Retour au site"
          subtitle="Site internet"
          rounded="lg"
        >
          <template v-slot:prepend>
            <v-list-item-avatar start>
              <v-btn
                color="primary"
                variant="contained"
                icon="mdi-home"
                elevation="0"
                size="small"
                class="mr-3"
              >
              </v-btn>
            </v-list-item-avatar>
          </template>
        </v-list-item>
        <v-list-item
          href="/profile"
          class="pa-3 mb-2"
          title="Mon Profil"
          subtitle="Infos personnelles"
          rounded="lg"
        >
          <template v-slot:prepend>
            <v-list-item-avatar start>
              <v-btn
                color="error"
                variant="contained"
                icon="mdi-account"
                elevation="0"
                size="small"
                class="mr-3"
              >
              </v-btn>
            </v-list-item-avatar>
          </template>
        </v-list-item>
        <v-btn
          @click="logOut"
          block
          color="secondary"
          variant="contained"
          class="mt-4 py-4"
          >Déconnexion</v-btn
        >
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
