<template>
  <v-container fluid class="page-wrapper">
    <BaseBreadcrumb
      :title="page.title"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <v-row>
      <v-card v-for="(credit, ind) in filteredList" :key="ind" class="mx-auto my-12" max-width="374">
        <v-img
          height="250"
          :src="'src/assets/images/credits/'+ credit.imageUrl +'.jpeg'"
          cover
        ></v-img>

        <v-card-item>
          <v-card-title>{{ credit.name }}</v-card-title>
        </v-card-item>

        <v-card-text>
          <div>{{ credit.description }}</div>
        </v-card-text>

        <div class="px-4 d-flex justify-end">
          <v-chip>{{ credit.price }} €</v-chip>
        </div>

        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="deep-purple-lighten-2"
            text @click="reserve"
          >
            Ajouter au panier
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import { computed, onMounted, ref, watch } from "vue";
import User from "../../models/user";
import UserService from "../../services/user.service";
import BaseBreadcrumb from "/src/components/BaseBreadcrumb.vue";
import UserRole from "../../models/user-role";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CreditService from "@/services/credit.service";

export default {
  name: "list-Credit",
  components: {BaseBreadcrumb},

  props: {
    selectedUser: { type: Object },
  },

  setup(props, context) {

    const selectedUser = ref(new User());
    const creditList = ref([]);
    const search = ref("");
    const store = useStore();
    const { currentUser } = store.getters;

    onMounted(() => {
      CreditService.getAllCredits().then(response => {
      creditList.value = response.data;
      })
    })

    const filteredList = computed(() => {
      return creditList.value.filter((credit) => {
        const full = credit.name ;
        return full.toLowerCase().includes(search.value.toLowerCase());
      });
    });

    const page = ref({title: "Crédits" });
    const breadcrumbs = ref([
      {
        text:"Accueil",
        disable: false,
        to: "/"
      },
      {
        text: "Achat de crédit",
        disable: false,
      }
    ]);

    return {
      filteredList,
      page,
      breadcrumbs,
    }
  }
}
</script>

<style scoped>

</style>
