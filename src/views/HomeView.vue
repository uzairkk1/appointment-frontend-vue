<script setup>
import { useQuery } from "@tanstack/vue-query";
import { getAppointments } from "../services/apiAppointments";

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
  <div v-if="isLoading">loading.......</div>
  <div v-else-if="isError">ohh now error....</div>
  <div v-else class="ma-8">
    <v-row>
      <v-col md="4" sm="6" xs="12">
        <v-card>
          <template v-slot:title> This is a title </template>

          <template v-slot:text> This is content </template>
        </v-card>
      </v-col>
      <v-col md="4" sm="6" xs="12">
        <v-card>
          <template v-slot:title> This is a title </template>

          <template v-slot:subtitle> This is a subtitle </template>

          <template v-slot:text> This is content </template>
        </v-card>
      </v-col>
      <v-col md="4" sm="6" xs="12">
        <v-card>
          <template v-slot:title> This is a title </template>

          <template v-slot:subtitle> This is a subtitle </template>

          <template v-slot:text> This is content </template>
        </v-card>
      </v-col>
      <v-col md="4" sm="6" xs="12">
        <v-card>
          <template v-slot:title> This is a title </template>

          <template v-slot:subtitle> This is a subtitle </template>

          <template v-slot:text> This is content </template>
        </v-card>
      </v-col>
      <v-col md="4" sm="6" xs="12">
        <v-card>
          <template v-slot:title> This is a title </template>

          <template v-slot:subtitle> This is a subtitle </template>

          <template v-slot:text> This is content </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table :headers="headers" :items="appointments.data || []">
      </v-data-table>
    </v-row>
  </div>
</template>
