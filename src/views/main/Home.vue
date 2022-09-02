<script setup>
import { ref } from "vue";
const show = ref(false);
let show1 = ref(false);
const show2 = ref(false);

</script>

<template>
  <v-parallax width="100%" height="500" src="https://images.unsplash.com/photo-1502847427791-d0194ec4cff4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80">

    <div class="d-flex flex-row justify-end align-center mb-6 text-white">
      <div class="d-flex flex-column justify-center text-white ma-4">
        <h1 class="text-h4 font-weight-thin ">
          Eni-Enchères
        </h1>
        <h4 class="subheading ">
          Surenchérissez dés maintenant !
        </h4>
      </div>
      <img class="me-15 my-15 rounded-xl rounded-be-0" width="500" src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" alt="">
    </div>
  </v-parallax>
  <v-container class="mt-10">
    <v-row class="justify-space-evenly">
      <v-list-item
        href="#"
        class="pa-3 mb-2"
        title="Présentation"
        max-width="300"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid, aperiam deleniti dignissimos distinctio esse fugit harum hic illo inventore ipsum libero porro qui quod quos sequi totam voluptas voluptates."
        rounded="lg"
      >
      </v-list-item>
      <v-list-item
        href="#"
        class="pa-3 mb-2"
        title="Présentation"
        max-width="300"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid, aperiam deleniti dignissimos distinctio esse fugit harum hic illo inventore ipsum libero porro qui quod quos sequi totam voluptas voluptates."
        rounded="lg"
      >
      </v-list-item>
      <v-list-item
        href="#"
        class="pa-3 mb-2"
        title="Présentation"
        max-width="300"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid, aperiam deleniti dignissimos distinctio esse fugit harum hic illo inventore ipsum libero porro qui quod quos sequi totam voluptas voluptates."
        rounded="lg"
      >
      </v-list-item>
    </v-row>
  </v-container>

  <v-container>

  </v-container>

<!--https://picsum.photos/400/400?random-->


</template>
