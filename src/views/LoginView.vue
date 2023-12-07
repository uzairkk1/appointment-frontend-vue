<script setup>
import { ref, computed } from "vue";
import {
  useField,
  useForm,
  useIsFormDirty,
  useIsFormValid,
} from "vee-validate";
import * as yup from "yup";

import { useLogin } from "./../composables/useLogin";

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .email("Invalid email provided")
      .required("Email is required")
      .typeError("Email is required"),
    password: yup
      .string()
      .min(6, "Password length should be greater or equal to 6")
      .required("Password is required"),
  }),
});

const isDirty = useIsFormDirty();
const isValid = useIsFormValid();

const isDisabled = computed(() => {
  return !isDirty.value || !isValid.value;
});

const password = useField("password");
const email = useField("email");

const { isLoading, signIn } = useLogin();

const submit = handleSubmit(async (values) => {
  alert(JSON.stringify(values, null, 2));

  const { email, password } = values;

  signIn({ email, password });
});

const loading = ref(false);
</script>
<template>
  <div class="auth-layout-wrapper h-100 w-100">
    <v-sheet class="bg-deep-purple pa-12 h-100 w-100" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-card-title class="mb-4"> <h1>Login</h1> </v-card-title>
        <v-form @submit.prevent="submit">
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

          <br />

          <v-btn
            :disabled="isDisabled || isLoading"
            :loading="isLoading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Sign In
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

<style></style>
