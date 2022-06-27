<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Seek TodoApp</q-toolbar-title>

      <q-btn flat round dense icon="whatshot" />
    </q-toolbar>
    <div class="q-pa-md q-gutter-sm">
      <div class="md-row">
        <q-input class="col" v-model="data.task" label="todo" value="" placeholder="what needs to be done" @keyup.enter="addTask" />
        <q-btn label="add" />
      </div>
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="(t, i) in data.todos" :key="t.id">
          <q-item-section avatar>
            <q-checkbox v-model="t.isDone" />
          </q-item-section>
          <q-item-section
            @dblclick="data.editing = i"
            v-if="data.editing !== i "
            :style="{
              'text-decoration': t.isDone ? 'line-through' : ''
            }"
            :class="{
              'text-grey': t.isDone
            }"
          >
            {{ t.desc }}
          </q-item-section>
          <q-input v-else-if="editing === i" v-model="t.desc" @keyup.enter="data.editing = -1" @keyup.esc="data.editing = -1"></q-input>
          <q-item-section side>
            <q-btn flat round icon="delete" size="sm" color="red" />
          </q-item-section>
        </q-item>
      </q-list>
    <div>
      {{ itemsLeft }} items left
    </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue'

const data = reactive({
  editing: -1,
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

// function changeIsDone (t) {
//   console.log('asdasd')
//   t.isDone = !t.isDone
// }

const addTask = () => {
  data.todos.unshift({
    _id: Date.now(),
    desc: data.task,
    isDone: false
  })

  data.task = ''
}
</script>
