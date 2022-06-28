<template>
  <div>
    <div>hello sir {{ props.name }}</div>
    <div>age: <button>-</button> {{ data.age }} <button @click="addAge">+</button></div>
    <div>food: {{ props.modelValue }}</div>
    <div>
      <q-select
        @update:model-value="(val) => emit('update:model-value', val)"
        filled
        v-model="data.food"
        multiple
        :options="['sinigang', 'tenola', 'pandesal', 'lichon']"
        use-chips
        stack-label
        label="Food"
      />
    </div>
    <div v-html="data.article">
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ['sinigang']
  },
  name: {
    type: String,
    default: 'CJ'
  },
  age: {
    type: Number,
    default: 25
  }
})

const emit = defineEmits(['ageAdded', 'update:model-value'])

const data = reactive({
  age: props.age,
  food: props.modelValue,
  article: `
    <h1>Hello Article</h1>
    <button onclick="alert('hello')">Hello Article</button>
    <script>
      alert('hello sir Abraham')
      console.log('test')
      window.hello = () => {
        alert('hello sir Abraham')
        console.log('test')
      }
  `
})

const addAge = () => {
  data.age++
  emit('ageAdded', data.age)
}
</script>
