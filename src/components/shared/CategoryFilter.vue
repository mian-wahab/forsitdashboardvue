<template>
  <select v-model="modelValue">
    <option v-for="cat in categories" :key="cat">{{ cat }}</option>
  </select>
</template>

<script setup>
defineProps(['categories', 'modelValue'])
defineEmits(['update:modelValue'])
</script>
