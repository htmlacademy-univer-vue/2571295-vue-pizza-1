<script setup>
import { AppLayout } from "@/layouts";
import { HomeView } from "@/views";
</script>

<template>

  <App-layout>
    <Home-view />
  </App-layout>

</template>

<style lang="scss">
@import "@/assets/scss/app.scss";
@import "./assets/scss/scaffolding.scss";
@import "@/assets/scss/visually-hidden.scss";
@import "@/assets/scss/fonts.scss";

// body {
//   justify-content: center;
//   align-items: center;
// }
// .main__wrapper {
//   padding-bottom: 30px;
//   background-color: $white;
//   box-shadow: $shadow-light;

//   h1 {
//     margin-bottom: 0;
//     padding: 0 95px;

//     text-align: center;

//     @include b-s36-h42;
//   }

//   p {
//     padding: 0 95px;

//     text-align: center;

//     font-size: 20px;
//     line-height: 30px;
//   }

//   b {
//     font-size: 1.2em;
//   }
// }

// .main__header {
//   margin-bottom: 30px;
//   padding: 20px 0;

//   background-color: $green-600;

//   img {
//     display: block;

//     margin: 0 auto;
//   }
// }

</style>
