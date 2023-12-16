<script setup>
import { useQuery } from "@tanstack/vue-query";
import { getDoctors } from "../services/apiUser";
import ContentWrapper from "../layouts/ContentWrapper.vue";
import { Calendar, DatePicker } from "v-calendar";
import { useRouter } from "vue-router";

const router = useRouter();

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

function onRowClick(evt, row) {
  const { item } = row;
  let id = item._id;
  let redirectURL = `appointments/book?docId=${id}`;
  router.push(redirectURL);
}
</script>

<template>
  <ContentWrapper :is-loading="isLoading" :is-error="false">
    <template #main>
      <div class="ma-8">
        <v-row>
          <!-- {{ deb(doctors) }} -->
          <v-data-table
            @click:row="onRowClick"
            hover
            :headers="headers"
            :items="doctors.data || []"
          >
          </v-data-table>
        </v-row>
        <!-- <v-row>
          <h1>CALENDAR</h1>
          <Calendar />
        </v-row>
        <v-row>
          <h1>DATE PICKER</h1>
          <DatePicker />
        </v-row> -->
      </div>
    </template>
  </ContentWrapper>
</template>
