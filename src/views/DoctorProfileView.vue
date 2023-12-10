<script setup>
import { ref, computed } from "vue";
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

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

const { updateDoctorProfile, isPending } = useUpdateDocProfile();
const { isLoading, isError, user } = useUser();

const timingsSchema = yup
  .array(
    yup.object().shape({
      dayIndex: yup.number().required("Day is required for slots"),
      timingSlots: yup
        .array(
          yup.object().shape({
            startTime: yup.string().required("Start time can not be empty"),
            endTime: yup
              .string()
              .required("end time can not be empty")
              .test("is-greater", "end time should be greater", function (val) {
                const { startTime } = this.parent;
                return dayjs(val, "HH:mm").isSameOrAfter(
                  dayjs(startTime, "HH:mm")
                );
              }),
          })
        )
        .required("Slots are required"),
    })
  )
  .required()
  .default([{}]);

const { handleSubmit } = useForm({
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

const items = [
  { text: "Monday", value: 1 },
  { text: "Tuesday", value: 2 },
  { text: "Wednesday", value: 3 },
  { text: "Thursday", value: 4 },
  { text: "Friday", value: 5 },
  { text: "Saturday", value: 6 },
  { text: "Sunday", value: 7 },
];
const select = ref(1);

const startTime = ref("");
const endTime = ref("");

const isDirty = useIsFormDirty();
const isValid = useIsFormValid();

const isDisabled = computed(() => {
  return !isDirty.value || !isValid.value;
});
const hasErrorInTiming = computed(() =>
  Object.entries(docTimingsSelected.value).some((ent) => ent[1].hasError)
);
const disableAdd = computed(() => {
  return !startTime.value || !endTime.value;
});

// const docTimings = computed(() => {
//   if (!timings.value) return [];
//   const addedDay = timings.value.find((time) => time.dayIndex == select.value);
//   if (!addedDay) {
//     return [];
//   } else {
//     const timingSlotsArr = addedDay.timingSlots.map((slot) => {
//       return { text: `${slot.startTime} - ${slot.endTime}`, uuid: slot.uuid };
//     });

//     return timingSlotsArr;
//   }
// });

const docTimingsSelected = ref({
  1: {
    value: [],
  },
});

const specialization = useField("specialization");
const experience = useField("experience");
const feePerCunsultation = useField("feePerCunsultation");
const address = useField("address");

const submit = handleSubmit(async (values) => {
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
  // Object.entries(a).map(ent => {
  //   let returnVal = {}
  //   return { dayIndex: Number(ent[0]), timingSlots: ent[1].value.map(v => ({startTime: v.startTime, endTime: v.endTime})) }
  updateDoctorProfile({ id: user.value._id, bodyData: values });
});

const dateGreater = ref({ error: false, message: undefined });
const addTime = () => {
  console.log(select.value, startTime.value, endTime.value);
  // const addedDay = timings.value.find((time) => time.dayIndex == select.value);
  let uuid = crypto.randomUUID();
  // if (!addedDay) {
  //   timings.value.push({
  //     dayIndex: select.value,
  //     timingSlots: [
  //       {
  //         uuid,
  //         startTime: startTime.value,
  //         endTime: endTime.value,
  //       },
  //     ],
  //   });
  // } else {
  //   addedDay.timingSlots.push({
  //     uuid,
  //     startTime: startTime.value,
  //     endTime: endTime.value,
  //   });
  // }

  // const res = timingsSchema.validate(timings.value);
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

// const modelss = ref(undefined);
// const itemsss = [
//   {
//     text: "Weather",
//   },
//   {
//     text: "Geo Location",
//   },
//   {
//     text: "Device",
//   },
// ];

function removeItem() {
  // const itemUUID = item.value;
  // timings.value = timings.value.map((time) => {
  //   if (time.dayIndex == select.value) {
  //     time.timingSlots = time.timingSlots.filter(
  //       (slot) => slot.uuid != itemUUID
  //     );
  //   }
  //   return time;
  // });
  // docTimingsSelected.value[select.value].value = docTimingsSelected.value[
  //   select.value
  // ].value.filter((val) => val.uuid != itemUUID);

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
  <ContentWrapper :is-error="isError">
    <template #main>
      <div class="ma-2">
        <v-row>
          <v-card class="w-100 h-100 pa-2">
            <!-- <v-card-title class="mb-4"> <h1>Login</h1> </v-card-title> -->
            <v-card-text>
              Please fill out the form so that you can be listed in the doctors
              listing
            </v-card-text>
            <v-form v-slot="{ validate }" @submit.prevent="submit">
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

                <v-col md="6">
                  <!-- <v-text-field
                    v-model="address.value.value"
                    :error-messages="address.errorMessage.value"
                    :readonly="loading"
                    clearable
                    label="address"
                    placeholder="Enter your address"
                    type="time"
                  ></v-text-field> -->
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

                  <!-- <v-combobox
                    v-model="docTimings"
                    :items="docTimings"
                    label="Category"
                    multiple
                    chips
                  >
                    <template
                      v-slot:selection="{ attrs, item, parent, selected }"
                    >
                      {{ deb(attrs, item, parent, selected) }}
                      <v-chip v-bind="attrs" :input-value="selected">
                        <span class="pr-2">
                          {{ item.value.text }}
                        </span>
                        <v-icon small @click="parent.selectItem(item)">
                          $delete
                        </v-icon>
                      </v-chip>
                    </template>
                  </v-combobox> -->
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
                    @click="addTime(validate)"
                  >
                    Add Time
                  </v-btn>
                </v-col>
              </v-row>

              <br />

              <v-btn
                :disabled="isDisabled || hasErrorInTiming"
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
