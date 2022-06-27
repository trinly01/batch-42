<template>
  <div>
    <h3>workaborad todos</h3>
    <input v-model="data.task" type="text" placeholder="what needs to be done?" @keyup.enter="addTask">
    <ul>
      <li v-for="t in data.todos" :key="t.id">
        <input type="checkbox" :value="t.isDone" :checked="t.isDone" @change="changeIsDone(t)">
        <span
          :style="{'text-decoration': t.isDone ? 'line-through': ''}"
        >
          {{ t.desc }}
        </span>
        <button>x</button>
      </li>
    </ul>
    {{ itemsLeft }} items left
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue'

const data = reactive({
  task: '',
  todos: [
    {
      _id: Date.now(),
      desc: 'asd',
      isDone: true
    }
  ]
})

const itemsLeft = computed(() => data.todos.filter(t => !t.isDone).length)

// const itemsLeft2 = () => {
//   console.log('itemsLeft222222')
//   return data.todos.filter(t => !t.isDone).length
// }
// const now = () => new Date()

function changeIsDone (t) {
  console.log('asdasd')
  t.isDone = !t.isDone
}

const addTask = () => {
  data.todos.unshift({
    _id: Date.now(),
    desc: data.task,
    isDone: false
  })

  data.task = ''
}
</script>
