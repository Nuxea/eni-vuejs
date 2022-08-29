<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center" class="h-100vh" align="center">
      <v-col lg="11" sm="8" xl="7">
        <v-card elevation="10">
          <v-row>
            <v-col lg="5" class="pr-0">
              <div class="pa-7 pa-sm-12">
                <img src="/src/assets/images/logo-icon.png"  alt=""/>

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
                  @submit.prevent="handleRegister"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="formData.username"
                    label="Pseudo"
                    name="username"
                    class="mt-4"
                    required
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.email"
                    label="E-mail"
                    name="email"
                    class="mt-4"
                    required
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.password"
                    label="Mot de Passe"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    name="password"
                    required
                    variant="outlined"
                    :type="show1 ? 'text' : 'password'"
                    @click:append-inner="show1 = !show1"
                  ></v-text-field>
                  <v-btn color="primary" class="py-6" @click="handleRegister"
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
import User from '/src/models/user';
import AuthenticationService from '/src/services/authentication.service';
import vuex from "vuex";

export default {
  name: `register`,
  data() {
    return {
      show1: false,
      formData: new User(),
      loading: false,
      submitted: false,
      valid: false,
    };
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),
  },
  mounted() {
    if (this.currentUser?.username) {
      this.$router.push("/admin");
    }
  },
  methods: {
    handleRegister() {
      if (!this.formData.username || !this.formData.email || !this.formData.password) {
        return;
      }
      this.loading = true;

      AuthenticationService.register(this.formData).then(() => {
        this.$router.push("/login");
      }).catch((err) => {
        console.log(err);
      }).then(() => (this.loading = false));
    },
  },
};
</script>
