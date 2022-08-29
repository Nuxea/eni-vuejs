<template>
    <v-container fluid class="page-wrapper">
      <v-card class="mt-6" max-height="760">
        <v-layout>
          <v-navigation-drawer
            permanent
          >
            <v-list>
              <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                :title="currentUser.username"
                :subtitle="currentUser.email"
              ></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
              <v-list-item prepend-icon="mdi-account" title="Mes Infos" value="infos" to="/profile/user"></v-list-item>
              <v-list-item prepend-icon="mdi-clipboard-list-outline" title="Mes Enchères" value="auctions" to="/profile/auction"></v-list-item>
              <v-list-item prepend-icon="mdi-cash" title="Mes Achats" value="purchases" to="/profile/purchase"></v-list-item>
            </v-list>
          </v-navigation-drawer>

          <v-main>
            <v-container>
              <h2 class="text-center pb-5">Bienvenue sur votre profil</h2>
              <v-divider></v-divider>
              <router-view />
            </v-container>
          </v-main>
        </v-layout>
      </v-card>
    </v-container>


</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();
const { currentUser } = store.getters;

</script>

<style scoped>
</style>
