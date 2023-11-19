<script setup>
import { defineProps, reactive } from "vue";
defineProps({
  menuItem: Object,
  small: Boolean,
  subgroup: Object,
});

function getTitle(title) {
  return title;
}
</script>
<template>
  <div>
    <v-list-item
      :title="getTitle(menuItem.key)"
      v-if="!menuItem.items"
      :class="{ 'primary--text': menuItem.link == menuItem.current }"
      :input-value="menuItem.value"
      :href="menuItem.link"
      :exact="menuItem.exact"
      :disabled="menuItem.disabled"
      active-class="primary--text"
      exact-active-class="primary--text"
      link
    >
      <v-list-item-icon>
        <v-icon :small="small" :class="{ 'grey--text': menuItem.disabled }">
          {{ menuItem.icon || "mdi-circle-medium" }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          {{ menuItem.key ? menuItem.key : menuItem.text }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-group
      v-else
      :value="menuItem.regex ? menuItem.regex.test(menuItem.current) : false"
      :disabled="menuItem.disabled"
      :sub-group="subgroup"
      :href="menuItem.link"
      link
    >
      <template v-slot:activator>
        <v-list-item-icon v-if="!subgroup" :title="getTitle(menuItem.key)">
          <v-icon :small="small">{{
            menuItem.icon || "mdi-circle-medium"
          }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ menuItem.key ? menuItem.key : menuItem.text }}
          </v-list-item-title>
        </v-list-item-content>
      </template>

      <slot></slot>
    </v-list-group>
  </div>
</template>
