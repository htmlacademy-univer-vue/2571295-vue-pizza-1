<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
