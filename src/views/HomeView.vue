<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { getAppointments } from "../services/apiAppointments";
import ContentWrapper from "../layouts/ContentWrapper.vue";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useUser } from "../composables/useUser";
import {
  useAcceptAppointment,
  useRejectAppointment,
} from "../composables/useAppointment";

import dayjs from "dayjs";
import { computed } from "vue";
dayjs.extend(customParseFormat);

const {
  isLoading,
  data: appointments,
  isError,
} = useQuery({
  queryKey: ["appointments"],
  queryFn: getAppointments,
});

const { mutateAcceptAppointment, isPending } = useAcceptAppointment();
const { mutateRejectAppointment, isPending: rejectPending } =
  useRejectAppointment();

const { user } = useUser();

const headers = computed(() => {
  let headers = [
    {
      title: "Doctor",
      value: "username",
    },
    {
      title: "Status",
      value: "status",
    },
    {
      title: "Appointment Date",
      value: "appDate",
    },
    {
      title: "Appointment Time",
      value: "appTime",
    },
  ];

  if (user && user.value.role === "DOCTOR") {
    headers.push({
      title: "Actions",
      value: "actions",
    });
  }
  return headers;
});
</script>

<template>
  <ContentWrapper :is-loading="isLoading" :is-error="isError">
    <template #main>
      <div class="ma-8">
        <v-row>
          <v-data-table :headers="headers" :items="appointments.data || []">
            <template v-slot:item.username="{ item }">
              {{ item.doctorId.name }}
            </template>
            <template v-slot:item.appTime="{ item }">
              From
              {{ dayjs(item.timeSlot.startTime, "HH:mm").format("h:mm A") }} To
              {{ dayjs(item.timeSlot.endTime, "HH:mm").format("h:mm A") }}
            </template>
            <template v-slot:item.appDate="{ item }">
              {{ dayjs(item.date).format("DD/MM/YYYY") }}
            </template>
            <template v-slot:item.actions="{ item }">
              <div v-if="item.status == 'ACCEPTED'">
                <v-chip variant="flat" color="green">
                  <v-icon> mdi-check </v-icon>
                </v-chip>
              </div>
              <div v-else-if="item.status == 'REJECTED'">
                <v-chip variant="flat" color="red">
                  <v-icon> mdi-close </v-icon>
                </v-chip>
              </div>
              <div v-else>
                <v-btn
                  icon="mdi-check"
                  class="ml-1"
                  color="primary"
                  size="x-small"
                  @click="mutateAcceptAppointment(item._id)"
                ></v-btn>
                <v-btn
                  icon="mdi-close"
                  class="ml-1"
                  color="red"
                  size="x-small"
                  @click="mutateRejectAppointment(item._id)"
                ></v-btn>
              </div>
            </template>
          </v-data-table>
        </v-row>
      </div>
    </template>
  </ContentWrapper>
</template>
