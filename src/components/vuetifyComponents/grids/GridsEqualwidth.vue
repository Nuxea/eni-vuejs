<script setup lang="ts">
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Equal Width  -->
  <!-- ----------------------------------------------------------------------------- -->
  <v-container class="bg-grey-lighten-5">
    <v-row no-gutters>
      <template v-for="n in 4" :key="n">
        <v-col>
          <v-card class="pa-2" outlined tile> Column </v-card>
        </v-col>
        <v-responsive
          v-if="n === 2"
          :key="`width-${n}`"
          width="100%"
        ></v-responsive>
      </template>
    </v-row>
  </v-container>
</template>
