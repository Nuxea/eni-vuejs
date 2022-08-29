<template>
    <v-container fluid class="page-wrapper">
      <BaseLeftRightPartVue>
        <template v-slot:rightpart>
          <v-list>
            <perfect-scrollbar class="todoheight">
              <v-col cols="12">
                <v-card theme="light" class="card-block">
                  <v-card class="d-flex justify-end mb-5">
                    <v-btn color="primary">
                      <v-icon class="mr-2">mdi-account</v-icon>
                      Nouvelle enchère
                    </v-btn>
                  </v-card>

                  <v-divider></v-divider>
                </v-card>
              </v-col>
            </perfect-scrollbar>
          </v-list>
        </template>
      </BaseLeftRightPartVue>
    </v-container>
</template>

<script>
import BaseLeftRightPartVue from "@/components/BaseLeftRightPart.vue";

export default {
  name: "profile-auction",
  components: {BaseLeftRightPartVue},

}

</script>
<style lang="scss">
.todoheight {
  height: calc(100vh - 300px);
}

.user-card-full {
  overflow: hidden;
}

.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69,90,100,0.08);
  box-shadow: 0 1px 20px 0 rgba(69,90,100,0.08);
  border: none;
  margin-bottom: 30px;
}

.user-card-full .user-profile {
  border-radius: 5px 0 0 5px;
}

.user-profile {
  padding: 20px 0;
}

.card-block {
  padding: 1.25rem;
}

.card .card-block p {
  line-height: 25px;
}

.card-block {
  padding: 1.25rem;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.m-b-20 {
  margin-bottom: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.card .card-block p {
  line-height: 25px;
}

.m-b-10 {
  margin-bottom: 10px;
}

.text-muted {
  color: #919aa3 !important;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.f-w-600 {
  font-weight: 600;
}

.m-b-20 {
  margin-bottom: 20px;
}

.m-t-40 {
  margin-top: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.m-b-10 {
  margin-bottom: 10px;
}

.m-t-40 {
  margin-top: 20px;
}
</style>
