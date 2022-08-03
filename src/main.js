import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'




import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faAnglesRight} from '@fortawesome/free-solid-svg-icons'
import { faAnglesLeft} from '@fortawesome/free-solid-svg-icons'
import { faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faAnglesRight,faAnglesLeft,faAngleRight,faAngleLeft,faUserSecret)
// axios.defaults.headers.common['Authorization']= 'Bearer' + localStorage.setItem('token');

const axiosInstance = axios.create({
    
    baseURL:'https://user-api-staging.ourpass.co'
  })
  const axiosInstance2 = axios.create({
  
    baseURL:'https://user-api2-staging.ourpass.co/v1'
  })

const app = createApp(App)
app.use(store)
app.config.globalProperties.$http = { ...axiosInstance }
app.config.globalProperties.$http2 = { ...axiosInstance2 }
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
