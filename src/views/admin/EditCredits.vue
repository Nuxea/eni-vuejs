<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  ></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" sm="12">
      <v-card>
        <v-card-text class="pa-5">
          <v-row>
            <v-col cols="12" lg="4" md="6">
              <v-text-field
                density="compact"
                v-model="search"
                label="Rechercher"
                hide-details
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="8" md="6" class="text-right">
              <v-dialog v-model="dialog" persistent>
                <template v-slot:activator="{ props }">
                  <v-btn color="deep-purple" v-bind="props" class="ml-auto">
                    <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>
                    Nouveau Crédit
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="pa-4 bg-deep-purple">
                    <span class="title text-white">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedCredit.name"
                              label="Nom"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedCredit.description"
                              label="Description"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedCredit.price"
                              min="1"
                              label="Prix"
                              type="number"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedCredit.imageUrl"
                              label="Image"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="close">Annuler</v-btn>
                    <v-btn
                      color="deep-purple"
                      :disabled="selectedCredit.name === '' || selectedCredit.description === '' || selectedCredit.price === ''"
                      variant="elevated"
                      @click="save"
                    >Sauvegarder
                    </v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-table density="compact" class="mt-5">
            <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(credit, ind) in filteredList" :key="ind">
              <td>{{ ind + 1 }}</td>
              <td>
                <div class="d-flex align-center py-4">
                  <div>
                    <v-img
                      :src="`/assets/images/users/2.jpg`"
                      width="45px"
                      class="rounded-circle img-fluid"
                    ></v-img>
                  </div>

                  <div class="ml-5">
                    <h4>{{ credit.name }}</h4>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-center py-4">
                  <div class="ml-5">
                    <h4>{{ credit.description }}</h4>
                  </div>
                </div>
              </td>
              <td>
                <v-chip>
                  {{ credit.price }} €
                </v-chip>
              </td>
              <td>
                <v-icon
                  small
                  class="mr-2 text-deep-purple cursor-pointer"
                  @click="editCredit(credit)"
                  title="Modifier"
                >mdi-pencil
                </v-icon>
                <v-dialog v-model="deleteDialog" persistent>
                  <template v-slot:activator="{ props }">
                    <v-icon
                      small
                      class="text-error cursor-pointer"
                      title="Supprimer"
                      @click="deleteRequest(credit)"
                    >mdi-delete
                    </v-icon>
                  </template>
                  <v-card>
                    <v-card-title class="pa-4 bg-deep-purple">
                      <span class="title text-white">Supprimer</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <p>Voulez-vous vraiment supprimer {{selectedCredit.name }} ?</p>
                      </v-container>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                      <v-spacer></v-spacer>
                      <v-btn color="deep-purple" @click="closeDelete">Annuler</v-btn>
                      <v-btn
                        color="error"
                        :disabled="selectedCredit.name === '' || selectedCredit.description === ''"
                        variant="elevated"
                        @click="deleteCredit"
                      >Supprimer
                      </v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import { computed, onMounted, ref } from "vue";
import BaseBreadcrumb from "/src/components/BaseBreadcrumb.vue";
import Credit from "../../models/credit";
import CreditService from "../../services/credit.service";

export default {
  name: "list-credit",
  components: {BaseBreadcrumb},

  props: {
    selectedCredit: { type: Object },
  },
  setup(props, context) {
    const selectedCredit = ref(new Credit());
    const selectedIndex = ref(undefined);
    const defaultCredit = ref(new Credit());
    const creditList = ref([]);
    const valid = ref(true);
    const dialog = ref(false);
    const deleteDialog = ref(false);
    const search = ref("");

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

    function editCredit(credit) {
      selectedCredit.value = Object.assign({}, credit);
      dialog.value = true;
    }

    function deleteRequest(credit) {
      selectedCredit.value = Object.assign({}, credit);
      deleteDialog.value = true;
    }

    function deleteCredit(){
      CreditService.deleteCredit(selectedCredit.value).then(() => {
        creditList.value.splice(selectedIndex.value, 1);
        deleteDialog.value = false;
      }).catch((err) => {
        console.log(err);
      })
    }

    function close() {
      deleteDialog.value = false;
      dialog.value = false;
      setTimeout(() => {
        selectedCredit.value = Object.assign({}, defaultCredit.value);
      }, 300);
    }

    function closeDelete() {
      deleteDialog.value = false;
    }

    function save() {
      if (!selectedCredit.value.name || !selectedCredit.value.description || !selectedCredit.value.price){
        return;
      }
      CreditService.saveCredit(selectedCredit.value).then(response => {
        context.emit('saved', response.data);
        if (selectedCredit.value.id === null){
          creditList.value.push(selectedCredit.value);
        } else {
          if (selectedCredit.value.id){
            creditList.value.splice(selectedCredit.value, 1);
          }
          creditList.value.unshift(selectedCredit.value);
        }

        close();
      }).catch((err) => {
        console.log(err);
      })
    }

    const formTitle = computed(() => {
      const creditId = selectedCredit.value.id;
      return creditId === undefined ? "Nouveau Crédit" : "Modifier Crédit";
    });

    const page = ref({title: "Crédits" });
    const breadcrumbs = ref([
      {
        title:"Admin",
        disable: false,
        href: "/admin"
      },
      {
        title: "Liste des Crédits",
        disable: false,
      }
    ])

    return {
      filteredList,
      formTitle,
      page,
      breadcrumbs,
      creditList,
      valid,
      dialog,
      deleteDialog,
      search,
      selectedCredit,
      editCredit,
      deleteRequest,
      deleteCredit,
      close,
      closeDelete,
      save
    }
  }
}
</script>
