<script setup lang="ts">
import { ref } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
import LogoLight from "/src/layouts/main/logo/LogoLight.vue";
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

    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->
    <v-container class="text-center">
      <a href="/auction" class="pa-2 text-white text-decoration-none">Enchères</a>
      <a href="/credit" class="pa-2 text-white text-decoration-none">Crédits</a>
    </v-container>

    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <!-- ---------------------------------------------- -->
    <v-menu v-if="currentUser" anchor="bottom end" origin="auto">
      <template v-slot:activator="{ props }">
        <v-btn icon="" v-bind="props">
          <v-badge color="error" dot>
            <v-icon color="white">mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list class="pa-6" elevation="10" rounded="lg" max-width="300">
        <h4 class="d-flex">
          Panier
<!--          <v-chip class="ml-auto" label small color="error"> 5 new </v-chip>-->
        </h4>
        <v-list-item
          class="pa-3 mt-2"
          @click="href"
          rounded="lg"
        >
          <template v-slot:prepend>
            <v-list-item-avatar start>
              <v-btn
                icon
                variant="elevated"
                elevation="0"
                class="mr-3"
              >

              </v-btn>
            </v-list-item-avatar>
          </template>
        </v-list-item>
        <v-btn block variant="elevated" color="secondary" class="mt-4 py-4"
        >Voir le panier</v-btn>
      </v-list>
    </v-menu>
    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu v-if="currentUser" anchor="bottom end" origin="auto" min-width="300">
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
            <span v-if="isAdmin()" class="subtitle-2 font-weight-light">{{ currentUser.role }}</span>
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
          v-if="isAdmin()"
          href="/admin"
          class="pa-3 mb-2"
          title="Dashboard"
          subtitle="Paramètres site"
          rounded="lg"
        >
          <template v-slot:prepend>
            <v-list-item-avatar start>
              <v-btn
                color="primary"
                variant="elevated"
                icon="mdi-pencil"
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
                variant="elevated"
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
          block=""
          color="secondary"
          variant="elevated"
          class="mt-4 py-4"
          >Déconnexion</v-btn
        >
      </v-list>
    </v-menu>

    <!-- ---------------------------------------------- -->
    <!-- Visitors -->
    <!-- ---------------------------------------------- -->
    <v-container v-if="!currentUser" class="text-right">
      <a href="/register" class="pa-2 text-white text-decoration-none">Inscription</a>
      <a href="/login" class="pa-2 text-white text-decoration-none">Connexion</a>
    </v-container>

  </v-app-bar>
</template>
