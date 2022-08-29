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
                  <v-btn color="primary" v-bind="props" class="ml-auto">
                    <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>
                    Nouvelle Catégorie
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="pa-4 bg-secondary">
                    <span class="title text-white">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row>
                          <v-col cols="12" sm="12">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedType.name"
                              label="Nom"
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
                      color="secondary"
                      :disabled="selectedType.name === ''"
                      variant="contained"
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
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(type, ind) in filteredList" :key="ind">
              <td>{{ ind + 1 }}</td>
              <td>
                <div class="d-flex align-center py-4">
                  <div class="ml-5">
                    <h4>{{ type.name }}</h4>
                  </div>
                </div>
              </td>
              <td>
                <v-icon
                  small
                  class="mr-2 text-info cursor-pointer"
                  @click="editType(type)"
                  title="Modifier"
                >mdi-pencil
                </v-icon>
                <v-dialog v-model="deleteDialog" persistent>
                  <template v-slot:activator="{ props }">
                    <v-icon
                      small
                      class="text-error cursor-pointer"
                      title="Supprimer"
                      @click="deleteRequest(type)"
                    >mdi-delete
                    </v-icon>
                  </template>
                  <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                      <span class="title text-white">Supprimer</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <p>Voulez-vous vraiment supprimer {{selectedType.name }} ?</p>
                      </v-container>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                      <v-spacer></v-spacer>
                      <v-btn color="secondary" @click="closeDelete">Annuler</v-btn>
                      <v-btn
                        color="error"
                        :disabled="selectedType.name === ''"
                        variant="contained"
                        @click="deleteType"
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
import AuctionType from "../../models/auction-type";
import AuctionTypeService from "../../services/auctionType.service";


export default {
  name: "list-type",
  components: {BaseBreadcrumb},

  props: {
    selectedType: { type: Object },
  },
  setup(props, context) {
    const selectedType = ref(new AuctionType());
    const selectedIndex = ref(undefined);
    const defaultType = ref(new AuctionType());
    const typeList = ref([]);
    const valid = ref(true);
    const dialog = ref(false);
    const deleteDialog = ref(false);
    const search = ref("");

    onMounted(() => {
      AuctionTypeService.getAllAuctionTypes().then(response => {
        typeList.value = response.data;
      })
    })

    const filteredList = computed(() => {
      return typeList.value.filter((type) => {
        const full = type.name ;
        return full.toLowerCase().includes(search.value.toLowerCase());
      });
    });

    function editType(type) {
      selectedType.value = Object.assign({}, type);
      dialog.value = true;
    }

    function deleteRequest(type) {
      selectedType.value = Object.assign({}, type);
      deleteDialog.value = true;
    }

    function deleteType(){
      AuctionTypeService.deleteAuctionType(selectedType.value).then(() => {
        typeList.value.splice(selectedIndex.value, 1);
        deleteDialog.value = false;
      }).catch((err) => {
        console.log(err);
      })
    }

    function close() {
      deleteDialog.value = false;
      dialog.value = false;
      setTimeout(() => {
        selectedType.value = Object.assign({}, defaultType.value);
      }, 300);
    }

    function closeDelete() {
      deleteDialog.value = false;
    }

    function save() {
      if (!selectedType.value.name){
        return;
      }
      AuctionTypeService.saveAuctionType(selectedType.value).then(response => {
        context.emit('saved', response.data);
        if (selectedType.value.id === null) {
          typeList.value.push(selectedType.value);
        } else {
          if (selectedType.value.id){
            typeList.value.splice(selectedType.value,1);
          }
          typeList.value.unshift(selectedType.value);
        }

        close();
      }).catch((err) => {
        console.log(err);
      })
    }

    const formTitle = computed(() => {
      const auctionId = selectedType.value.id;
      return auctionId === undefined ? "Nouvelle Catégorie" : "Modifier Catégorie";
    });

    const page = ref({title: "Catégories" });
    const breadcrumbs = ref([
      {
        text:"Admin",
        disable: false,
        to: "/admin"
      },
      {
        text: "Liste des Catégories",
        disable: false,
      }
    ])

    return {
      filteredList,
      formTitle,
      page,
      breadcrumbs,
      typeList,
      valid,
      dialog,
      deleteDialog,
      search,
      selectedType,
      editType,
      deleteRequest,
      deleteType,
      close,
      closeDelete,
      save
    }
  }
}
</script>
