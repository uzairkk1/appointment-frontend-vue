<script setup>
import { useQuery } from "@tanstack/vue-query";
import { getAppointments } from "../services/apiAppointments";
import ContentWrapper from "../layouts/ContentWrapper.vue";

const {
  isLoading,
  data: appointments,
  isError,
} = useQuery({
  queryKey: ["appointments"],
  queryFn: getAppointments,
});

const headers = [
  {
    title: "User",
    value: "userId",
  },
  {
    title: "Date Time",
    value: "dateTime",
  },
];
</script>

<template>
  <ContentWrapper :is-loading="isLoading" :is-error="isError">
    <template #main>
      <div class="ma-8">
        <v-row>
          <v-data-table :headers="headers" :items="appointments.data || []">
          </v-data-table>
        </v-row>
      </div>
    </template>
  </ContentWrapper>
</template>
