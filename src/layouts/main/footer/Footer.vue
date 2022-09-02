<template>
    <v-footer
      dark
      padless
      class="text-white text-center d-flex flex-column"
    >
      <v-container fluid>
        <v-row class="pt-4">
          <v-col>
            <v-card height="325" class="white--text text-left overflow-auto">
              <v-card-title class="py-10">Résumé</v-card-title>
              <v-card-text>
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              </v-card-text>
            </v-card>
          </v-col>

          <v-col>
            <v-card class="white--text text-left">
              <v-card-title class="py-10">Liens Utiles</v-card-title>
              <v-card-text>
                <p class="pa-2">
                  <a href="/auction" class="pa-2 text-white text-decoration-none">Enchères</a>
                </p>
                <p class="pa-2">
                  <a href="/credit" class="pa-2 text-white text-decoration-none">Crédits</a>
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col>
            <v-card class="white--text text-left">
              <v-card-title class="py-10">Nous contacter</v-card-title>
              <v-card-text>
                <strong>Adresse</strong>
                <p class="my-5">3 Rue Michael Faraday</p>
                <p class="my-5">44800 Saint-Herblain</p>

                <v-divider class="my-5"></v-divider>

                <strong>Téléphone</strong>
                <p class="my-5">+33 2 28 03 17 28</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Eni-Enchères</strong>
        </v-card-text>
    </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>
