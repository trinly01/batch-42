<template>
  <div>
    <h3>Hello {{ name }}</h3>
    <input type="text" v-model="name">
    <h3>Hello2 {{ human.name }}</h3>
    <input type="text" v-model="human.name">
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'

const name = ref('Jake Zyrus')
const human = reactive({
  name: 'Xander Ford',
  age: 21
})
</script>
