<script setup lang="ts">
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Size -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-subtitle-1 text-grey-darken-1">
    The size prop allows you to customize the size of each dot.
  </p>
  <div class="text-center mt-4">
    <v-timeline>
      <v-timeline-item color="purple-lighten-2" fill-dot right>
        <v-card>
          <v-card-title class="purple-lighten-2">
            <v-icon dark size="42" class="mr-4"> mdi-magnify </v-icon>
            <h2 class="display-1 white--text font-weight-light">Title 1</h2>
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
            imperdiet nec ut, sed euismod convenire principes at. Est et nobis
            iisque percipit.
          </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="amber-lighten-1" fill-dot size="small">
        <v-card>
          <v-card-title class="amber-lighten-1 justify-end">
            <h2 class="display-1 mr-4 white--text font-weight-light">
              Title 2
            </h2>
            <v-icon dark size="42"> mdi-home-outline </v-icon>
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
            imperdiet nec ut, sed euismod convenire principes at. Est et nobis
            iisque percipit.
          </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="cyan-lighten-1" fill-dot>
        <v-card>
          <v-card-title class="cyan-lighten-1">
            <v-icon class="mr-4" dark size="42"> mdi-email-outline </v-icon>
            <h2 class="display-1 white--text font-weight-light">Title 3</h2>
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
            imperdiet nec ut, sed euismod convenire principes at. Est et nobis
            iisque percipit.
          </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="red-lighten-1" fill-dot size="small">
        <v-card>
          <v-card-title class="red-lighten-1 justify-end">
            <h2 class="display-1 mr-4 white--text font-weight-light">
              Title 4
            </h2>
            <v-icon dark size="42"> mdi-account-multiple-outline </v-icon>
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
            imperdiet nec ut, sed euismod convenire principes at. Est et nobis
            iisque percipit.
          </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="green-lighten-1" fill-dot right>
        <v-card>
          <v-card-title class="green-lighten-1">
            <v-icon class="mr-4" dark size="42"> mdi-phone-in-talk </v-icon>
            <h2 class="display-1 white--text font-weight-light">Title 5</h2>
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
            imperdiet nec ut, sed euismod convenire principes at. Est et nobis
            iisque percipit.
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

