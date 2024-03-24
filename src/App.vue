<template>
  <ul class="filelist-wrap" style="top: calc(15vh + 160px)">
    <li><h3>1.只要 hover 显示文本（立即显示 ）</h3></li>
    <li
      v-for="item in fileList"
      v-my-tooltip="{ text: item.name, delay: 0 }"
      class="file-item"
    >
      {{ item.name }}
    </li>
  </ul>
  <ul class="filelist-wrap" style="top: calc(15vh + 160px)">
    <li><h3>2.只要 hover 显示文本（延迟300毫秒）</h3></li>
    <li
      v-for="item in fileList"
      v-my-tooltip="{ text: item.name, delay: 300 }"
      class="file-item"
    >
      {{ item.name }}
    </li>
  </ul>
  <ul class="filelist-wrap" style="top: calc(15vh + 160px)">
    <li><h3>3.文本溢出也不显示文本</h3></li>
    <li
      v-for="item in fileList"
      v-my-tooltip="{ text: item.name, hidden: true }"
      class="file-item"
    >
      {{ item.name }}
    </li>
  </ul>
  <ul class="filelist-wrap">
    <li><h3>4.文本溢出时 hover 显示文本（尾部显示省略号，延迟100毫秒）</h3></li>
    <li
      v-for="item in fileList"
      v-my-tooltip.text.overflow="{ text: item.name, delay: 100 }"
      class="file-item"
    >
      {{ item.name }}
    </li>
  </ul>
  <ul class="filelist-wrap" style="top: calc(15vh + 160px)">
    <li><h3>5.文本溢出时 hover 显示文本（中间显示省略号，延迟100毫秒）</h3></li>
    <li
      v-for="item in fileList"
      v-adjust-text="{ name: item.name }"
      v-my-tooltip.text.overflow="{ text: item.name, delay: 100 }"
      class="file-item"
    >
      {{ item.name }}
    </li>
  </ul>
  <ul class="filelist-wrap" style="top: calc(15vh + 160px)">
    <li><h3>6.文本溢出时 hover 不显示文本（中间显示省略号）</h3></li>
    <li
      v-for="item in fileList"
      v-adjust-text="{ name: item.name }"
      v-my-tooltip.text.overflow="{ text: item.name, delay: 100, hidden: true }"
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
  { id: 3, name: "d1c7946-6733-4e56-bd18-c40a69b37548.jpg" },
  {
    id: 4,
    name: "0d9c47b0-m9d9-7bec-4d32-bb21-2341-ljs3-d832-2990-21be9b386113.jpg",
  },
]);
</script>
<style scoped></style>
