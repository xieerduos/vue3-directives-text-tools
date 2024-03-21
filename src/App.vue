<template>
  <ul class="filelist-wrap">
    <li
      v-for="item in fileList"
      v-my-tooltip.text.overflow="item.name"
      class="file-item"
    >
      {{ item.name }}
    </li>
  </ul>
  <ul class="filelist-wrap" style="top: calc(15vh + 100px)">
    <li
      v-for="item in fileList"
      v-adjust-text="{ name: item.name }"
      v-my-tooltip.text.overflow="item.name"
      class="file-item"
    >
      {{ item.name }}
    </li>
  </ul>
</template>
<script setup>
import { ref } from "vue";
import { vMyTooltip } from "./directive/vMyTooltip.js";
import { vAdjustText } from "./directive/vAdjustText.js";

const fileList = ref([
  { id: 1, name: "张三.jpg" },
  { id: 2, name: "王五.jpg" },
  { id: 3, name: "d1c7946-6733-4e56-bd18-c40a69b37548.jpg" },
  { id: 4, name: "0d9c47b0-7bec-4d32-bb21-21be9b386113.jpg" },
]);
</script>
<style scoped></style>
