<script setup>
import { useQuery } from "@tanstack/vue-query";
import { getDoctors } from "../services/apiUser";
import ContentWrapper from "../layouts/ContentWrapper.vue";

const {
  isLoading,
  data: doctors,
  isError,
} = useQuery({
  queryKey: ["doctors"],
  queryFn: getDoctors,
});

const headers = [
  {
    title: "name",
    value: "name",
  },
  {
    title: "specialization",
    value: "specialization",
  },
  {
    title: "Fees",
    value: "feePerCunsultation",
  },
  {
    title: "experience",
    value: "experience",
  },
  {
    title: "address",
    value: "address",
  },
];

function deb(sd) {
  debugger;
}
</script>

<template>
  <ContentWrapper :is-loading="isLoading" :is-error="false">
    <template #main>
      <div class="ma-8">
        <v-row>
          {{ deb(doctors) }}
          <!-- <v-data-table :headers="headers" :items="doctors.data || []">
          </v-data-table> -->
        </v-row>
      </div>
    </template>
  </ContentWrapper>
</template>
