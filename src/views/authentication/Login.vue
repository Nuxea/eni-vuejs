<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center" class="h-100vh" align="center">
      <v-col lg="11" sm="8" xl="7">
        <v-card elevation="10">
          <v-row>
            <v-col
              lg="7"
              class="bg-primary d-none d-md-flex align-center justify-center"
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
                <img src="/src/assets/images/logos/dark-logo-icon.svg"  alt=""/>
                <h2 class="font-weight-bold mt-4 text--darken-2">Se Connecter</h2>
                <h6 class="text-subtitle-1 mb-7">
                  Vous n'avez pas de compte ?
                  <v-btn to="/register" variant="plain"
                  >S'inscrire</v-btn
                  >
                </h6>

                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                >
                  <v-text-field
                    v-model="formData.username"
                    :rules="usernameRules"
                    label="Pseudo"
                    name="username"
                    class="mt-4"
                    required
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.password"
                    :rules="passwordRules"
                    label="Mot de Passe"
                    name="password"
                    required
                    variant="outlined"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append-inner="show1 = !show1"
                  ></v-text-field>
                  <v-btn color="primary" class="py-6" @click="handleLogin"
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
  setup: function () {
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
      v => (v && v.length <= 10) || "L'identifiant doit faire moins de 10 caractères",
    ]);
    const passwordRules = ref([
      v => !!v || 'Le mot de passe est requis',
      v => (v && v.length <= 10) || 'Le mot de passe doit faire moins de 10 caractères',
    ]);

    onMounted(() => {
      //this.currentUser?.username = this.currentUser != null && this.currentUser.username != null
      if (currentUser?.role === UserRole.ADMIN) {
        router.push('/admin');
      } else if (currentUser?.username){
        router.push('/');
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
        console.log(err);
      })
        .then(() => loading.value = false);
    }

    return {
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
