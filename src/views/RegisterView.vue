<script setup>
import { ref, computed } from "vue";
import {
  useField,
  useForm,
  useIsFormDirty,
  useIsFormValid,
} from "vee-validate";
import * as yup from "yup";

import { useRegister } from "./../composables/useRegister";

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup
      .string()
      .required("Name is required")
      .max(32)
      .typeError("Name is required"),
    email: yup
      .string()
      .email("Invalid email provided")
      .required("Email is required")
      .typeError("Email is required"),
    password: yup
      .string()
      .min(6, "Password length should be greater or equal to 6")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password should be same"),
  }),
});

const isDirty = useIsFormDirty();
const isValid = useIsFormValid();

const isDisabled = computed(() => {
  return !isDirty.value || !isValid.value;
});

const password = useField("password");
const confirmPassword = useField("confirmPassword");
const email = useField("email");
const name = useField("name");

const { isPending, signUp } = useRegister();

const submit = handleSubmit(async (values) => {
  const { email, password, name, confirmPassword } = values;

  signUp({ email, password, name, confirmPassword });
});

const loading = ref(false);
</script>
<template>
  <div class="auth-layout-wrapper h-100 w-100">
    <v-sheet class="bg-deep-purple pa-12 h-100 w-100" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-card-title class="mb-4"> <h1>Sign Up</h1> </v-card-title>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
            :readonly="loading"
            class="mb-2"
            clearable
            label="Name"
          ></v-text-field>

          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            :readonly="loading"
            class="mb-2"
            clearable
            label="Email"
          ></v-text-field>

          <v-text-field
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            :readonly="loading"
            clearable
            label="Password"
            placeholder="Enter your password"
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword.value.value"
            :error-messages="confirmPassword.errorMessage.value"
            :readonly="loading"
            clearable
            label="Confirm Password"
            placeholder="Confirm your password"
          ></v-text-field>

          <br />

          <v-btn
            :disabled="isDisabled || isPending"
            :loading="isPending"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Sign Up
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

<style></style>
