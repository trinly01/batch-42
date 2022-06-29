import { boot } from 'quasar/wrappers'

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

import wings from 'wings4'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do

  app.config.globalProperties.$wings = wings('http://localhost:3030')

  app.use(VueChartkick)
})
