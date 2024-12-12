import './assets/css/main.css'
import './assets/css/custom-buttons.css'
import './assets/css/basic-notification-window.css'
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'tippy.js/dist/tippy.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueTippy from 'vue-tippy'

library.add(fas)

const app = createApp(App)

app.use(VueTippy)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')



let tempUser = {
  _id: 'user-123',
  userLogin: "Ewa"
}

localStorage.setItem("user", JSON.stringify(tempUser))
