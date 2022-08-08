import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment';






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
    
    baseURL: process.env.VUE_APP_API_URL_V1
  })
  const axiosInstance2 = axios.create({
  
    baseURL:`${process.env.VUE_APP_API_URL_V2}/v1`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'verify-admin': process.env.VUE_APP_ADMIN_AUTH_KEY,
    },
  })

const app = createApp(App)
app.use(store)
app.config.globalProperties.$http = { ...axiosInstance }
app.config.globalProperties.$http2 = { ...axiosInstance2 }
app.config.globalProperties.$moment =  moment
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)
app.component('font-awesome-icon', FontAwesomeIcon)
// moment().format();




app.mount('#app')
