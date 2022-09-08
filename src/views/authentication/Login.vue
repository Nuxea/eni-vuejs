<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-snackbar
      v-if="errorMessage"
      v-model="errorMessage"
      location="top"
      :timeout="10000"
      color="error"
    >
      {{ errorMessage }}
    </v-snackbar>
    <v-row justify="center" class="h-100vh" align="center">
      <v-col lg="11" sm="8" xl="7">
        <v-card elevation="10">
          <v-row>
            <v-col
              lg="7"
              class="bg-deep-purple d-none d-md-flex align-center justify-center"
            >
              <div class="d-none d-sm-block">
                <div class="d-flex align-center pa-10 v-col-8">
                  <div>
                    <h2 class="text-h4 text-white font-weight-medium">
                      Elegant Design with unlimited features, built with love
                    </h2>
                    <h6
                      class="text-subtitle-1 text-high-emphasis mt-4 text-white font-weight-regular"
                    >
                      Wrappixel helps developers to build organized and
                      well-coded admin dashboards full of beautiful and feature
                      rich modules.
                    </h6>
                    <v-btn
                      class="mt-6 text-capitalize"
                      size="x-large"
                      variant="outlined"
                      color="white"
                    >En savoir plus</v-btn
                    >
                  </div>
                </div>
              </div>
            </v-col>

            <v-col lg="5">
              <div class="pa-7 pa-sm-12">
                <img src="/src/assets/images/logos/white-logo-icon.svg"  alt=""/>
                <h2 class="font-weight-bold mt-4 text--darken-2">Se Connecter</h2>
                <h6 class="text-subtitle-1 mb-7">
                  Vous n'avez pas de compte ?
                  <v-btn to="/register" color="deep-purple" variant="plain"
                  >S'inscrire</v-btn
                  >
                </h6>

                <v-form
                        ref="form"
                        v-model="valid"
                >
                  <v-text-field
                    v-model="formData.username"
                    :rules="usernameRules"
                    label="Pseudo"
                    name="username"
                    :counter="15"
                    class="my-4"
                    required
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.password"
                    :rules="passwordRules"
                    label="Mot de Passe"
                    name="password"
                    class="my-4"
                    required
                    variant="outlined"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append-inner="show1 = !show1"
                  ></v-text-field>
                  <v-btn color="deep-purple" variant="tonal" @click="handleLogin"
                         :disabled="loading"
                  >Se Connecter</v-btn
                  >
                </v-form>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from '/src/models/user';
import AuthenticationService from '/src/services/authentication.service';
import { onMounted, ref } from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import UserRole from "../../models/user-role";

export default {
  name: `login`,
  setup() {
    let errorMessage = ref(false);
    const show1 = ref(false);
    const valid = ref(true);
    const formData = ref(new User());
    const loading = ref(false);
    const submitted = ref(false);
    const store = useStore();
    const router = useRouter();
    const { currentUser } = store.getters;
    const usernameRules = ref([
      v => !!v || "L'identifiant est requis",
      v => v && !!v.trim() || "L'identifiant ne doit pas être vide",
    ]);
    const passwordRules = ref([
      v => !!v || 'Le mot de passe est requis',
      v => v && !!v.trim() || "Le mot de passe ne doit pas être vide",
    ]);

    onMounted(() => {
      //this.currentUser?.username = this.currentUser != null && this.currentUser.username != null
      if (currentUser?.username){
        router.push('/home');
      }
    });
    function handleLogin() {
      if (!formData.value.username || !formData.value.password) {
        return;
      }
      loading.value = true;
      AuthenticationService.login(formData.value).then((response) => {
        store.dispatch('updateUser', response.data);
        router.push('/');
      }).catch((err) => {
        errorMessage.value = "Votre Identifiant ou votre Mot de Passe est incorrect"
        // console.log(err);
      }).then(() => loading.value = false);
    }

    return {
      errorMessage,
      show1,
      valid,
      formData,
      loading,
      submitted,
      passwordRules,
      usernameRules,
      currentUser,
      handleLogin,
    };
  },
}
</script>
