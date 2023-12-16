<script setup>
import { useQuery } from "@tanstack/vue-query";
import { getDoctor } from "../services/apiUser";
import { getBookingSlots } from "../services/apiAppointments";
import ContentWrapper from "../layouts/ContentWrapper.vue";
import { Calendar } from "v-calendar";
import { useRoute } from "vue-router";
import { ref, watchEffect, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { useCreateAppointment } from "../composables/useAppointment";
import { useUser } from "../composables/useUser";

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

const route = useRoute();
const docId = route.query.docId;
const {
  isLoading,
  data: doctor,
  isError,
} = useQuery({
  queryKey: ["doctor", docId],
  queryFn: () => getDoctor(docId),
});

const { user } = useUser();

const { mutateCreateAppointment, isPending } = useCreateAppointment();

const bookingQuery = ref(false);
const loadingDialog = ref(false);
const queryDate = ref(null);

const doctorClone = ref(null);

const {
  isLoading: isSlotsLoading,
  data: slots,
  isError: isSlotsError,
} = useQuery({
  queryKey: ["slots", queryDate],
  queryFn: ({ queryKey }) => getBookingSlots({ docId, date: queryKey[1] }),
  // select: (res) => {
  //   console.log("useQuery Select: ", data);
  //   const slots = res.data;
  //   if (slots.length == 0) {
  //     doctorClone.value.timings = doctor.value.data.timings;
  //     return [];
  //   }
  //   slots.forEach((slot) => {});
  // },
  enabled: bookingQuery,
});

const disabledDates = ref([
  {
    repeat: {
      weekdays: [],
    },
  },
]);

watchEffect((newVal, oldVal) => {
  if (isLoading.value == false && doctor?.value.data != undefined) {
    disabledDates.value[0].repeat.weekdays = doctor.value.data.disabledDays;
    doctorClone.value = JSON.parse(JSON.stringify(doctor.value.data));
  }
});
watchEffect(() => {
  if (isSlotsLoading.value == false && slots?.value?.data != undefined) {
    console.log(doctor.value.data);
    debugger;
    if (slots.value.data.length == 0) {
      doctorClone.value.timings = doctor.value.data.timings;
    } else {
      slots.value.data.forEach((slot) => {
        doctorClone.value.timings = doctorClone.value.timings.map((t) => {
          t.timingSlots = t.timingSlots.map((time) => {
            if (
              slot.date === queryDate.value &&
              slot.timeSlot.startTime == time.startTime &&
              slot.timeSlot.endTime == time.endTime
            ) {
              time.isBooked = true;
              debugger;
            }

            return time;
          });
          debugger;
          return t;
        });
      });
    }
    loadingDialog.value = false;
    dialog.value = true;
  }
});

const dialog = ref(false);
function handleDayClick(clickedDetails, evt) {
  const clickedPosition = clickedDetails.weekday;
  queryDate.value = new Date(clickedDetails.id).toISOString();

  loadingDialog.value = true;
  setTimeout(() => {
    bookingQuery.value = true;
  }, 100);
}

function bookSlot(slot) {
  const data = {
    doctorId: docId,
    date: queryDate.value,
    timeSlot: slot,
    userId: user.value._id,
  };

  mutateCreateAppointment(data);
}

// function deb(item) {
//   debugger;
// }

onBeforeUnmount(() => {
  loadingDialog.value = false;
  dialog.value = false;
});
</script>

<template>
  <ContentWrapper :is-loading="isLoading" :is-error="isError">
    <template #main>
      <div class="ma-8">
        <v-row>
          <!-- {{ deb(doctors) }} -->
          {{ JSON.stringify(doctorClone) }}
        </v-row>
        <h1>CALENDAR</h1>
        <v-row>
          <div col="12">
            <Calendar
              @dayclick="handleDayClick"
              :disabled-dates="disabledDates"
            />
          </div>
        </v-row>
        <!-- <v-row>
          <h1>DATE PICKER</h1>
          <DatePicker />
        </v-row> -->
      </div>

      <v-dialog v-model="dialog" persistent width="400">
        <v-card>
          <v-card-title
            >Select Time Slot for
            {{ dayjs(queryDate).format("L") }}</v-card-title
          >
          <v-card-text>
            <template
              v-for="timings in doctorClone.timings"
              :key="timings.dayIndex"
            >
              <!-- {{ deb(timings) }} -->
              <v-row
                v-for="slots in timings.timingSlots"
                :key="`${slots.startTime} - ${slots.endTime}`"
                class="align-center justify-space-between px-6 my-2"
              >
                <div>
                  From {{ dayjs(slots.startTime, "HH:mm").format("h:m A") }} To
                  {{ dayjs(slots.endTime, "HH:mm").format("h:m A") }}
                </div>
                <v-btn color="secondary" v-if="slots.isBooked" disabled
                  >Booked</v-btn
                >
                <v-btn
                  color="primary"
                  v-else
                  @click="
                    bookSlot({
                      startTime: slots.startTime,
                      endTime: slots.endTime,
                    })
                  "
                  >Book</v-btn
                >
              </v-row>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = false">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-overlay
        :model-value="loadingDialog"
        class="align-center justify-center"
      >
        <v-dialog :model-value="true" :scrim="false" persistent width="auto">
          <v-card color="primary">
            <v-card-text>
              Please stand by
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-overlay>
    </template>
  </ContentWrapper>
</template>
