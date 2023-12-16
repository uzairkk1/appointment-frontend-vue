<script setup>
import { ref, computed, onMounted } from "vue";
import {
  useField,
  useForm,
  useIsFormDirty,
  useIsFormValid,
} from "vee-validate";
import * as yup from "yup";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";

import { useUpdateDocProfile } from "../composables/useUpdateDocProfile";
import { useUser } from "../composables/useUser";
import ContentWrapper from "../layouts/ContentWrapper.vue";

import { useQueryClient } from "@tanstack/vue-query";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

const queryClient = useQueryClient();

const { updateDoctorProfile, isPending } = useUpdateDocProfile();
const { isLoading, isError, user } = useUser();

const { handleSubmit, resetForm } = useForm({
  validationSchema: yup.object({
    specialization: yup
      .string()
      .required("Specialization is required")
      .typeError("Specialization is required"),
    experience: yup.number().required("experience is required"),
    feePerCunsultation: yup.number().required("Consultation fee is required"),
    address: yup.string().required("address is required"),
  }),
});

// resetForm({
//   values: {
//     specialization: user.value.specialization,
//     experience: user.value.experience,
//     feePerCunsultation: user.value.feePerCunsultation,
//     address: user.value.address,
//   },
// });
// watch([isLoading.value], () => {
//   debugger;
//   if (!isLoading && !isError) {
//     resetForm({
//       values: {
//         specialization: user.value.specialization,
//         experience: user.value.experience,
//         feePerCunsultation: user.value.feePerCunsultation,
//         address: user.value.address,
//       },
//     });
//   }
// });

const select = ref(2);

const startTime = ref("");
const endTime = ref("");

onMounted(() => {
  //set initial values
  isLoading.value = false;
  if (user.value != undefined) {
    resetForm({
      values: {
        specialization: user.value.specialization,
        experience: user.value.experience,
        feePerCunsultation: user.value.feePerCunsultation,
        address: user.value.address,
      },
    });

    let timings = {};
    user.value.timings?.forEach((timing) => {
      timings[timing.dayIndex] = {};
      timings[timing.dayIndex].hasError = false;
      timings[timing.dayIndex].value = timing.timingSlots.map((slot) => {
        let uuid = crypto.randomUUID();
        return {
          uuid,
          text: `${slot.startTime} - ${slot.endTime}`,
          startTime: slot.startTime,
          endTime: slot.endTime,
        };
      });
    });
    docTimingsSelected.value = timings;
    select.value = user.value.timings.length
      ? user.value.timings[0].dayIndex
      : 2;
  }
});

const items = [
  { text: "Monday", value: 2 },
  { text: "Tuesday", value: 3 },
  { text: "Wednesday", value: 4 },
  { text: "Thursday", value: 5 },
  { text: "Friday", value: 6 },
  { text: "Saturday", value: 7 },
  { text: "Sunday", value: 1 },
];

const isDirty = useIsFormDirty();
const isValid = useIsFormValid();

const isDisabled = computed(() => {
  return !isDirty.value || !isValid.value;
});
const timingIsDirty = ref(false);

const hasErrorInTiming = computed(() =>
  Object.entries(docTimingsSelected.value).some((ent) => ent[1].hasError)
);
const disableAdd = computed(() => {
  return !startTime.value || !endTime.value;
});

const docTimingsSelected = ref({
  2: {
    value: [],
  },
});

const specialization = useField("specialization");
const experience = useField("experience");
const feePerCunsultation = useField("feePerCunsultation");
const address = useField("address");

const submit = handleSubmit((values) => {
  let timings = Object.entries(docTimingsSelected.value)
    .map((ent) => ({
      dayIndex: Number(ent[0]),
      timingSlots: ent[1].value.map((v) => ({
        startTime: v.startTime,
        endTime: v.endTime,
      })),
    }))
    .filter((i) => i.timingSlots.length > 0);

  values.timings = timings;

  updateDoctorProfile({ id: user.value._id, bodyData: values });

  queryClient.invalidateQueries({
    queryKey: ["user"],
    exact: true,
  });
});

const dateGreater = ref({ error: false, message: undefined });
const addTime = () => {
  console.log(select.value, startTime.value, endTime.value);
  let uuid = crypto.randomUUID();

  const isEndDateGreater = dayjs(endTime.value, "HH:mm").isSameOrAfter(
    dayjs(startTime.value, "HH:mm")
  );
  if (!isEndDateGreater) {
    dateGreater.value.error = true;
    dateGreater.value.message = "End date should be greater than Start date";
    return;
  }

  dateGreater.value.error = false;
  dateGreater.value.message = undefined;
  docTimingsSelected.value[select.value]?.value.push({
    uuid,
    text: `${startTime.value} - ${endTime.value}`,
    startTime: startTime.value,
    endTime: endTime.value,
  });

  timingIsDirty.value = true;

  const isBetween = checkDates();

  docTimingsSelected.value[select.value].hasError = isBetween;
};

function checkDates() {
  let isBetween = false;

  isBetween = docTimingsSelected.value[select.value]?.value.some(
    (val, id, arr) => {
      return arr.some((e) => {
        let isb = false;
        if (e.uuid != val.uuid) {
          isb = dayjs(val.startTime, "HH:mm").isBetween(
            dayjs(e.startTime, "HH:mm"),
            dayjs(e.endTime, "HH:mm"),
            null,
            "[]"
          );
          if (!isb) {
            isb = dayjs(val.endTime, "HH:mm").isBetween(
              dayjs(e.startTime, "HH:mm"),
              dayjs(e.endTime, "HH:mm"),
              null,
              "[]"
            );
          }

          return isb;
        }
      });
    }
  );

  return isBetween;
}

function removeItem() {
  timingIsDirty.value = true;
  const isBetween = checkDates();

  docTimingsSelected.value[select.value].hasError = isBetween;
}

function handleDayChange(item) {
  if (docTimingsSelected.value[item] == undefined) {
    docTimingsSelected.value[item] = { value: [] };
  }
}

const loading = ref(false);
</script>
<template>
  <ContentWrapper :is-loading="isLoading" :is-error="isError">
    <template #main>
      <div class="ma-2">
        <v-row>
          <v-card class="w-100 h-100 pa-2">
            <!-- <v-card-title class="mb-4"> <h1>Login</h1> </v-card-title> -->
            <v-card-text>
              Please fill out the form so that you can be listed in the doctors
              listing
            </v-card-text>
            <v-form @submit.prevent="submit">
              <v-row>
                <v-col md="6">
                  <v-text-field
                    v-model="specialization.value.value"
                    :error-messages="specialization.errorMessage.value"
                    :disabled="isPending"
                    class="mb-2"
                    clearable
                    label="Specialization"
                  ></v-text-field>
                </v-col>
                <v-col md="6">
                  <v-text-field
                    v-model.number="experience.value.value"
                    :error-messages="experience.errorMessage.value"
                    :readonly="loading"
                    clearable
                    label="experience"
                    placeholder="Enter your experience"
                  ></v-text-field>
                </v-col>
                <v-col md="6">
                  <v-text-field
                    v-model.number="feePerCunsultation.value.value"
                    :error-messages="feePerCunsultation.errorMessage.value"
                    :readonly="loading"
                    clearable
                    label="feePerCunsultation"
                    placeholder="Enter your consultation fee in PKR"
                  ></v-text-field>
                </v-col>
                <v-col md="6">
                  <v-text-field
                    v-model="address.value.value"
                    :error-messages="address.errorMessage.value"
                    :readonly="loading"
                    clearable
                    label="address"
                    placeholder="Enter your address"
                  ></v-text-field>
                </v-col>

                <br />
                <v-divider></v-divider>
              </v-row>
              <v-col col="12" class="my-4"> Timings </v-col>
              <v-row>
                <!-- <v-card v-for="item in items" :key="item.value">
                  <h3>{{ item.text }}</h3>
                </v-card> -->

                <v-col col="12">
                  <v-combobox
                    v-model="docTimingsSelected[select].value"
                    label="Select"
                    item-value="uuid"
                    item-title="text"
                    multiple
                    chips
                    closable-chips
                    :error="docTimingsSelected[select].hasError"
                    @update:modelValue="removeItem"
                  >
                    <!-- <template v-slot:selection="{ attrs, item, selected }">
                      <v-chip v-bind="attrs" :input-value="selected" label>
                        <span class="pr-2">
                          {{ item.title }}
                        </span>
                        <v-icon small @click="parent.selectItem(item)"
                          >mdi-close</v-icon
                        >
                      </v-chip>
                    </template> -->
                  </v-combobox>
                </v-col>

                <v-col md="12">
                  <v-select
                    v-model="select"
                    :items="items"
                    item-title="text"
                    item-value="value"
                    label="Select"
                    single-line
                    @update:modelValue="handleDayChange"
                  ></v-select>
                </v-col>
                <v-col md="6">
                  <v-text-field
                    v-model="startTime"
                    :error-messages="address.errorMessage.value"
                    :readonly="loading"
                    clearable
                    label="address"
                    placeholder="Enter your address"
                    type="time"
                  ></v-text-field>
                </v-col>
                <v-col md="6">
                  <v-text-field
                    v-model="endTime"
                    :readonly="loading"
                    clearable
                    label="address"
                    placeholder="Enter your address"
                    type="time"
                    :error="dateGreater.error"
                    :error-messages="dateGreater.message"
                  ></v-text-field>
                </v-col>

                <v-col md="6">
                  <v-btn
                    :disabled="disableAdd"
                    :loading="isPending"
                    block
                    color="success"
                    variant="elevated"
                    @click="addTime"
                  >
                    Add Time
                  </v-btn>
                </v-col>
              </v-row>

              <br />

              <v-btn
                :disabled="
                  (isDisabled && !timingIsDirty) ||
                  hasErrorInTiming ||
                  docTimingsSelected.length == 0
                "
                :loading="isPending"
                block
                color="success"
                type="submit"
                variant="elevated"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card>
        </v-row>
      </div>
    </template>
  </ContentWrapper>
</template>

<style></style>
