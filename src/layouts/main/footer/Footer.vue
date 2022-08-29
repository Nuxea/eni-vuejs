<template>
    <v-footer
      dark
      padless
      class="text-white text-center d-flex flex-column"
    >
      <v-card
        flat
        tile
        class="white--text text-center"
      >
        <v-card class="row d-flex pt-4">
          <v-card class="white--text pt-0 pa-md-4 mx-lg-auto">
            <v-card-title>Nous contacter</v-card-title>
            <v-card-text class="text-left">
              <strong>Adresse</strong>
              <p class="pl-2">3 Rue Michael Faraday</p>
              <p class="pl-2">44800 Saint-Herblain</p>

              <v-divider class="ma-2"></v-divider>

              <strong>Téléphone</strong>
              <p class="pl-2">+33 2 28 03 17 28</p>
            </v-card-text>
          </v-card>

          <v-card height="310" class="white--text pt-0 pa-md-4 mx-lg-auto overflow-auto">
            <v-card-title>Résumé</v-card-title>
            <v-card-text>
              Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </v-card-text>
          </v-card>

          <v-card class="white--text pt-0 pa-md-4 mx-lg-auto">
            <v-card-title>Liens Utiles</v-card-title>
            <v-card-text class="text-left">
              <p class="pa-2">
                <a href="#" class="pa-2 text-white text-decoration-none">Enchères</a>
              </p>
              <p class="pa-2">
                <a href="#" class="pa-2 text-white text-decoration-none">Crédits</a>
              </p>
            </v-card-text>
          </v-card>


        </v-card>



        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Eni-Enchères</strong>
        </v-card-text>
      </v-card>
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
