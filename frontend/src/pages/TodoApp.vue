<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Seek TodoApp {{ data.age }}</q-toolbar-title>

      <q-btn flat round dense icon="whatshot" />
    </q-toolbar>
    <pie-chart :donut="true" :data="[['active', numbers.active], ['completed', numbers.completed]]"></pie-chart>
    <div class="q-pa-md q-gutter-sm">
      <div class="md-row">
        <q-input class="col" v-model="data.task" label="todo" value="" placeholder="what needs to be done"
          @keyup.enter="addTask" />
        <q-btn label="add" />
      </div>
      <div class="row">
        <q-tabs v-model="data.tab" class="text-teal col">
          <q-tab name="all" icon="mail" label="All">
            <q-badge v-if="numbers.all" color="grey" floating>{{ numbers.all }}</q-badge>
          </q-tab>
          <q-tab name="active" icon="alarm" label="Active">
            <q-badge v-if="numbers.active" color="red" floating>{{ numbers.active }}</q-badge>
          </q-tab>
          <q-tab name="completed" icon="movie" label="Completed">
            <q-badge v-if="numbers.completed" color="green" floating>{{ numbers.completed }}</q-badge>
          </q-tab>
        </q-tabs>
        <q-btn @click="clearCompleted">Clear completed</q-btn>
      </div>
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="(t, i) in filterByStatus" :key="t.id">
          <q-item-section avatar>
            <q-checkbox :modelValue="t.isDone" @update:model-value="changeIsDone(t)" />
          </q-item-section>
          <q-item-section @dblclick="data.editing = i" v-if="data.editing !== i" :style="{
            'text-decoration': t.isDone ? 'line-through' : ''
          }" :class="{
  'text-grey': t.isDone
}">
            {{ t.desc }}
          </q-item-section>
          <q-input v-else-if="editing === i" v-model="t.desc" @keyup.enter="data.editing = -1"
            @keyup.esc="data.editing = -1"></q-input>
          <q-item-section side>
            <q-btn flat round icon="delete" size="sm" color="red" />
          </q-item-section>
        </q-item>
      </q-list>
      <div>
        {{ itemsLeft }} items left
      </div>
    </div>
    <cj-steven v-model="data.food" :name="data.name" gender="male" :age="data.age" @ageAdded="ageData => data.age = ageData + 1" />
  </div>
</template>
<script setup>
import { reactive, computed, getCurrentInstance } from 'vue'
import cjSteven from 'components/cjSteven.vue'

const { $wings } = getCurrentInstance().appContext.config.globalProperties

const data = reactive({
  age: 21,
  name: 'Steven',
  tab: 'all',
  food: ['tenola'],
  editing: -1,
  task: '',
  todos: [
    {
      _id: Date.now(),
      desc: 'asd',
      isDone: true
    },
    {
      _id: Date.now() + 123123,
      desc: 'xcv',
      isDone: true
    }
  ]
})

const todosSrvc = $wings.wingsService('todos')

todosSrvc.on('dataChange', (todos) => {
  console.log(todos)
  data.todos = [...todos]
})
todosSrvc.init()

function printTodos () {
  console.log('original', data.todos)
  const arrMap = data.todos.map(row => [row._id, row.desc, row.isDone])
  console.log('arrMap', arrMap)
  const dd = {
    // Print To dos
    // Columns: ID, Description, Status
    content: [
      {
        style: 'tableExample',
        table: {
          body: [
            ['ID', 'Description', 'Status'],
            ...arrMap
          ]
        }
      }
    ]
  }
  console.log('table', dd.content[0].table.body)
  return dd
}
printTodos()

const itemsLeft = computed(() => data.todos.filter(t => !t.isDone).length)

const filterByStatus = computed(() => {
  switch (data.tab) {
    case 'completed':
      return data.todos.filter(t => t.isDone)
    case 'active':
      return data.todos.filter(t => !t.isDone)
    default:
      return data.todos
  }
})

const numbers = computed(() => {
  const active = data.todos.filter(t => !t.isDone).length
  const allTodos = data.todos.length
  const completed = allTodos - active

  return { active, all: allTodos, completed }
})

function clearCompleted () {
  data.todos = data.todos.filter(t => !t.isDone)
}

// const itemsLeft2 = () => {
//   console.log('itemsLeft222222')
//   return data.todos.filter(t => !t.isDone).length
// }
// const now = () => new Date()

async function changeIsDone (t) {
  console.log('asdasd')

  await todosSrvc.patch(t._id, {
    isDone: !t.isDone
  })
  // t.isDone = todo.isDone
}

const addTask = async () => {
  // data.todos.unshift({
  //   _id: Date.now(),
  //   desc: data.task,
  //   isDone: false
  // })

  await todosSrvc.create({
    desc: data.task,
    isDone: false
  })

  // data.todos.unshift(newTodo)

  data.task = ''
}
</script>
