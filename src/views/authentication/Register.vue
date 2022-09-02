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
            <v-col lg="5" class="pr-0">
              <div class="pa-7 pa-sm-12">
                <img src="/src/assets/images/logos/white-logo-icon.svg"  alt=""/>

                <h2
                  class="font-weight-bold mt-4 blue-grey--text text--darken-2"
                >
                  Inscription
                </h2>
                <h6 class="text-subtitle-1 text-grey-darken-1">
                  Vous avez déjà un compte ?
                  <v-btn to="/login" variant="plain"
                    >Se Connecter</v-btn
                  >
                </h6>

                <v-form
                  ref="form"
                  v-model="valid"
                >
                  <v-text-field
                    v-model="formData.username"
                    label="Pseudo"
                    :rules="usernameRules"
                    :counter="15"
                    name="username"
                    class="my-4"
                    required
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.email"
                    label="E-mail"
                    :rules="emailRules"
                    name="email"
                    class="my-4"
                    required
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.password"
                    label="Mot de Passe"
                    :rules="passwordRules"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    name="password"
                    required
                    class="my-4"
                    variant="outlined"
                    :type="show1 ? 'text' : 'password'"
                    @click:append-inner="show1 = !show1"
                  ></v-text-field>
                  <v-btn color="primary" @click="handleRegister"
                         :disabled="loading"
                  >S'inscrire</v-btn
                  >
                </v-form>

              </div>
            </v-col>
            <v-col
              lg="7"
              class="bg-primary d-none d-md-flex align-center justify-center"
            >
              <div class="d-none d-sm-block">
                <div class="d-flex align-center pa-10">
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
                      >Learn More</v-btn
                    >
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from "@/models/user";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import AuthenticationService from "@/services/authentication.service";

export default {
  name: "Register",

  setup(props, context) {
    const show1 = ref(false);
    const router = useRouter();
    const store = useStore();
    const { currentUser } = store.getters;
    const formData = ref(new User());
    const valid = ref(false);
    const loading = ref(false);
    const submitted = ref(false);
    const errorMessage = ref('');
    const emailRules = ref([
      v => !!v || "L'e-mail est requis",
      v => /.+@.+\..+/.test(v) || "L'e-mail doit être valide",
    ]);
    const usernameRules = ref([
      v => !!v || "L'identifiant est requis",
      v => (v && v.length <= 15) || "L'identifiant doit faire moins de 15 caractères",
      v => v && !!v.trim() || "L'identifiant ne doit pas être vide",

    ]);
    const passwordRules = ref([
      v => !!v || 'Le mot de passe est requis',
      v => (v && v.length >= 5) || 'Le mot de passe doit faire plus de 5 caractères',
      v => v && !!v.trim() || "Le mot de passe ne doit pas être vide",
    ]);

    onMounted(() => {
      if (currentUser?.username){
        router.push("/home");
      }
    });

    function handleRegister() {
      if (!formData.value.username || !formData.value.email || !formData.value.password) {
        return;
      }
      loading.value = true;
      AuthenticationService.register(formData.value).then(() => {
        router.push("/login");
      }).catch((err) => {
        if (err?.response?.status === 409) {
          errorMessage.value = "Votre identifiant ou votre e-mail existe déjà ou n'est pas valide";
        } else {
          errorMessage.value = "Une erreur est survenue";
        }

        console.log(err);
      }).then(() => (loading.value = false));
    }

    return {
      show1,
      errorMessage,
      valid,
      loading,
      submitted,
      formData,
      emailRules,
      usernameRules,
      passwordRules,
      handleRegister
    }
  }
}
</script>
