<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { verifyEmail } from "../services/apiAuth";

const route = useRoute();
let param = route.params?.token || "";

const { isLoading, isError, error } = useQuery({
  queryKey: ["emailverification"],
  queryFn: () => verifyEmail(param),
});
</script>
<template>
  <div class="auth-layout-wrapper h-100 w-100">
    <v-sheet class="bg-deep-purple pa-12 h-100 w-100" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-card-title class="mb-4">
          <h2>
            {{ isError ? "Verification failed" : "Verification success" }}
          </h2>
        </v-card-title>
        <v-card-text v-if="isError" class="mb-4">
          Email Verification failed:
          {{ error?.response?.data?.message || "internal server error" }}
        </v-card-text>
        <v-card-text v-else class="mb-4">
          Your email has been verified, click the below button for sign in
        </v-card-text>
        <v-btn
          :disabled="isLoading"
          :loading="isLoading"
          block
          color="success"
          size="large"
          variant="elevated"
          to="/login"
        >
          Sign In
        </v-btn>
      </v-card>
    </v-sheet>
  </div>
</template>

<style></style>
