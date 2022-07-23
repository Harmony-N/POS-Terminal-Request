<template>
  <div>
    <WidgetsStatsA />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <CRow>
              <CCol :sm="5">
                <h4 id="traffic" class="card-title mb-0">Traffic</h4>
                <div class="small text-medium-emphasis">January 2021</div>
              </CCol>
              <CCol :sm="7" class="d-none d-md-block">
                <CButton color="primary" class="float-end">
                  <CIcon icon="cil-cloud-download" />
                </CButton>
                <CButtonGroup
                  class="float-end me-3"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <CButton color="secondary" variant="outline">Day</CButton>
                  <CButton color="secondary" variant="outline" active
                    >Month</CButton
                  >
                  <CButton color="secondary" variant="outline">Year</CButton>
                </CButtonGroup>
              </CCol>
            </CRow>
            <CRow>
              <MainChartExample
                style="height: 300px; max-height: 300px; margin-top: 40px"
              />
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow :xs="{ cols: 1 }" :md="{ cols: 5 }" class="text-center">
              <CCol class="mb-sm-2 mb-0">
                <div class="text-medium-emphasis">Visits</div>
                <strong>29.703 Users (40%)</strong>
                <CProgress
                  class="mt-2"
                  color="success"
                  thin
                  :precision="1"
                  :value="40"
                />
              </CCol>
              <CCol class="mb-sm-2 mb-0 d-md-down-none">
                <div class="text-medium-emphasis">Unique</div>
                <strong>24.093 Users (20%)</strong>
                <CProgress
                  class="mt-2"
                  color="info"
                  thin
                  :precision="1"
                  :value="20"
                />
              </CCol>
              <CCol class="mb-sm-2 mb-0">
                <div class="text-medium-emphasis">Pageviews</div>
                <strong>78.706 Views (60%)</strong>
                <CProgress
                  class="mt-2"
                  color="warning"
                  thin
                  :precision="1"
                  :value="60"
                />
              </CCol>
              <CCol class="mb-sm-2 mb-0">
                <div class="text-medium-emphasis">New Users</div>
                <strong>22.123 Users (80%)</strong>
                <CProgress
                  class="mt-2"
                  color="danger"
                  thin
                  :precision="1"
                  :value="80"
                />
              </CCol>
              <CCol class="mb-sm-2 mb-0 d-md-down-none">
                <div class="text-medium-emphasis">Bounce Rate</div>
                <strong>Average Rate (40.15%)</strong>
                <CProgress class="mt-2" :value="40" thin :precision="1" />
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
    <!-- <WidgetsStatsD /> -->
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
       <Tabs>
        <div class="btn">
          <div>
            <CButton color="secondary" variant="ghost" @click="change">POS terminal</CButton>
          </div>
          <div>
            <CButton color="secondary" variant="ghost" @click="change2">POS Terminal Request</CButton>
          </div>
        </div>
          <Tab name="POS Terminal" v-if="selectedTab==1">
                        <CTable hover responsive>
              <CTableHead color="light">
                <CTableRow >
                  <CTableHeaderCell scope="col">OurpassReference</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Authorisation</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                  <CTableHeaderCell scope="col" >Date Created</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="data in posData" :key="data.id" @click="table1(data)">
                  <CTableHeaderCell scope="row" >{{data.ourpassReference}}</CTableHeaderCell>
                  <CTableDataCell>{{data.authorisation}}</CTableDataCell>
                  <CTableDataCell>{{data.country}}</CTableDataCell>
                  <CTableDataCell>{{data.createdAt}}</CTableDataCell>
                    <CTableDataCell>{{data.menu}}</CTableDataCell>
                </CTableRow>

              </CTableBody>
              </CTable>
          </Tab>
            <br />
             <Tab name="POS Terminal Request" v-if="selectedTab==2">
                      <CTable hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">BusinessID</CTableHeaderCell>
                <CTableHeaderCell scope="col">PosType</CTableHeaderCell>
                <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date Created </CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="data in posRequestData" :key="data.id" @click="table2(data)">
                <CTableHeaderCell scope="row">{{data.businessId}}</CTableHeaderCell>
                <CTableDataCell>{{data.posType}}</CTableDataCell>
                <CTableDataCell>{{data.quantity}}</CTableDataCell>
                <CTableDataCell>{{data.createdAt}}</CTableDataCell>
                  <CTableDataCell>{{data.menu}}</CTableDataCell>
              </CTableRow>
            </CTableBody>
            </CTable>
         </Tab> 
      </Tabs> 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import avatar1 from '@/assets/images/avatars/1.jpg'
import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import avatar6 from '@/assets/images/avatars/6.jpg'
import MainChartExample from './charts/MainChartExample'
import WidgetsStatsA from './widgets/WidgetsStatsTypeA.vue'
// import WidgetsStatsD from './widgets/WidgetsStatsTypeD.vue'
import Tab from '@/components/tab.vue'
import Tabs from '@/components/tabs.vue'



export default {
  name: 'Dashboard',
  components: {
    MainChartExample,
    WidgetsStatsA,
    // WidgetsStatsD,
    Tab,
    Tabs
  },
  setup() {
    const progressGroupExample1 = [
      { title: 'Monday', value1: 34, value2: 78 },
      { title: 'Tuesday', value1: 56, value2: 94 },
      { title: 'Wednesday', value1: 12, value2: 67 },
      { title: 'Thursday', value1: 43, value2: 91 },
      { title: 'Friday', value1: 22, value2: 73 },
      { title: 'Saturday', value1: 53, value2: 82 },
      { title: 'Sunday', value1: 9, value2: 69 },
    ]
    const progressGroupExample2 = [
      { title: 'Male', icon: 'cil-user', value: 53 },
      { title: 'Female', icon: 'cil-user-female', value: 43 },
    ]
    const progressGroupExample3 = [
      {
        title: 'Organic Search',
        icon: 'cib-google',
        percent: 56,
        value: '191,235',
      },
      { title: 'Facebook', icon: 'cib-facebook', percent: 15, value: '51,223' },
      { title: 'Twitter', icon: 'cib-twitter', percent: 11, value: '37,564' },
      { title: 'LinkedIn', icon: 'cib-linkedin', percent: 8, value: '27,319' },
    ]
    const tableExample = [
      {
        avatar: { src: avatar1, status: 'success' },
        user: {
          name: 'Yiorgos Avraamu',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'USA', flag: 'cif-us' },
        usage: {
          value: 50,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'success',
        },
        payment: { name: 'Mastercard', icon: 'cib-cc-mastercard' },
        activity: '10 sec ago',
      },
      {
        avatar: { src: avatar2, status: 'danger' },
        user: {
          name: 'Avram Tarasios',
          new: false,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'Brazil', flag: 'cif-br' },
        usage: {
          value: 22,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'info',
        },
        payment: { name: 'Visa', icon: 'cib-cc-visa' },
        activity: '5 minutes ago',
      },
      {
        avatar: { src: avatar3, status: 'warning' },
        user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
        country: { name: 'India', flag: 'cif-in' },
        usage: {
          value: 74,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'warning',
        },
        payment: { name: 'Stripe', icon: 'cib-cc-stripe' },
        activity: '1 hour ago',
      },
      {
        avatar: { src: avatar4, status: 'secondary' },
        user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
        country: { name: 'France', flag: 'cif-fr' },
        usage: {
          value: 98,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'danger',
        },
        payment: { name: 'PayPal', icon: 'cib-cc-paypal' },
        activity: 'Last month',
      },
      {
        avatar: { src: avatar5, status: 'success' },
        user: {
          name: 'Agapetus Tadeáš',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'Spain', flag: 'cif-es' },
        usage: {
          value: 22,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'primary',
        },
        payment: { name: 'Google Wallet', icon: 'cib-cc-apple-pay' },
        activity: 'Last week',
      },
      {
        avatar: { src: avatar6, status: 'danger' },
        user: {
          name: 'Friderik Dávid',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'Poland', flag: 'cif-pl' },
        usage: {
          value: 43,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'success',
        },
        payment: { name: 'Amex', icon: 'cib-cc-amex' },
        activity: 'Last week',
      },
    ]

    return {
      tableExample,
      progressGroupExample1,
      progressGroupExample2,
      progressGroupExample3,
    }
  },
  data(){
    return{
      selectedTab:1,
       tabs:[ {name: 'POS Terminal', id:1},
        {name:'POS Terminal Request', id:2}, 
        ],
      
        "posData": [
            {
                "provider": "flutterwave",
                "ourpassReference": "l1q8snl0",
                "enabled": true,
                "country": "NGN",
                "authorisation": "2215700M",
                "type": "android",
                "status": "allocated",
                "createdAt": "Tue Jul 19 2022 08:24:53 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Tue Jul 19 2022 19:17:19 GMT+0000 (Coordinated Universal Time)",
                "id": 32,
                "walletId": 1016,
                "menu": '...'

            },
            {
                "provider": "flutterwave",
                "ourpassReference": "d2446qgy",
                "enabled": false,
                "country": "NGN",
                "authorisation": "2215699M",
                "type": "android",
                "status": "pending",
                "createdAt": "Tue Jul 19 2022 08:24:53 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Tue Jul 19 2022 08:24:53 GMT+0000 (Coordinated Universal Time)",
                "id": 31,
                "menu": '...'
            },
            {
                "provider": "flutterwave",
                "ourpassReference": "5vbtl2xv",
                "enabled": false,
                "country": "NGN",
                "authorisation": "2215698M",
                "type": "android",
                "status": "pending",
                "createdAt": "Tue Jul 19 2022 08:24:52 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Tue Jul 19 2022 08:24:52 GMT+0000 (Coordinated Universal Time)",
                "id": 30,
                "menu": '...'
            },
            {
                "provider": "flutterwave",
                "ourpassReference": "pdx6w0kg",
                "enabled": false,
                "country": "NGN",
                "authorisation": "2215697M",
                "type": "android",
                "status": "pending",
                "createdAt": "Tue Jul 19 2022 08:24:51 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Tue Jul 19 2022 08:24:51 GMT+0000 (Coordinated Universal Time)",
                "id": 29,
                "menu": '...'
            },
            {
                "provider": "flutterwave",
                "ourpassReference": "fdxkv2gi",
                "enabled": false,
                "country": "NGN",
                "authorisation": "2215696M",
                "type": "android",
                "status": "pending",
                "createdAt": "Tue Jul 19 2022 08:24:50 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Tue Jul 19 2022 08:24:50 GMT+0000 (Coordinated Universal Time)",
                "id": 28,
                "menu": '...'
            },
            {
                "provider": "flutterwave",
                "ourpassReference": "2li8e8iq",
                "enabled": false,
                "country": "NGN",
                "authorisation": "2215695M",
                "type": "android",
                "status": "pending",
                "createdAt": "Tue Jul 19 2022 08:24:49 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Tue Jul 19 2022 08:24:49 GMT+0000 (Coordinated Universal Time)",
                "id": 27,
                "menu": '...'
            },
            {
                "provider": "flutterwave",
                "ourpassReference": "ofe73dhn",
                "enabled": false,
                "country": "NGN",
                "authorisation": "2215694M",
                "type": "android",
                "status": "pending",
                "createdAt": "Tue Jul 19 2022 08:24:49 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Tue Jul 19 2022 08:24:49 GMT+0000 (Coordinated Universal Time)",
                "id": 26,
                "menu": '...'
            },
            {
                "provider": "flutterwave",
                "ourpassReference": "ahbibyjm",
                "enabled": false,
                "country": "NGN",
                "authorisation": "2215693M",
                "type": "android",
                "status": "pending",
                "createdAt": "Tue Jul 19 2022 08:24:47 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Tue Jul 19 2022 08:24:47 GMT+0000 (Coordinated Universal Time)",
                "id": 25,
                "menu": '...'
            },
            {
                "provider": "flutterwave",
                "ourpassReference": "sq1appyb",
                "enabled": false,
                "country": "NGN",
                "authorisation": "2215692M",
                "type": "android",
                "status": "pending",
                "createdAt": "Tue Jul 19 2022 08:24:46 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Tue Jul 19 2022 08:24:46 GMT+0000 (Coordinated Universal Time)",
                "id": 24,
                "menu": '...'
            },
            {
                "provider": "flutterwave",
                "ourpassReference": "7a1nbqq7",
                "enabled": false,
                "country": "NGN",
                "authorisation": "2215691m",
                "type": "android",
                "status": "allocated",
                "createdAt": "Tue Jul 19 2022 08:24:45 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Tue Jul 19 2022 08:24:45 GMT+0000 (Coordinated Universal Time)",
                "id": 23,
                "walletId": 1162,
                "menu": '...'
            }
        ],
        "posRequestData": [
            {
                "id": 25,
                "businessId": 801,
                "quantity": 5,
                "posType": "android",
                "monthlyRevenue": "Above ₦500,000 - ₦700,000",
                "deliveryLocation": "100 Kudirat Abiola Way, Oregun 100212, Lagos, Nigeria",
                "status": "pending",
                "createdAt": "Thu Jul 14 2022 16:54:09 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Thu Jul 14 2022 16:54:09 GMT+0000 (Coordinated Universal Time)",
                "dailySales": "Above 100 - 1000 sales",
                "menu": '...',
            },
            {
                "id": 22,
                "businessId": 801,
                "quantity": 5,
                "posType": "android",
                "monthlyRevenue": "Above ₦500,000 - ₦700,000",
                "deliveryLocation": "100 Kudirat Abiola Way, Oregun 100212, Lagos, Nigeria",
                "status": "pending",
                "createdAt": "Thu Jul 14 2022 16:43:32 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Thu Jul 14 2022 16:43:32 GMT+0000 (Coordinated Universal Time)",
                "dailySales": "Above 100 - 1000 sales",
                "menu": '...'
            }
        ],
    }
  }, methods:{
    table1(data) {
      this.$router.push({
        name: "Reference",
        params: { reference: data.ourpassReference },
      });
    },
    table2(data){
      this.$router.push({
        name: "Request",
        params: { request: data.businessId },
      });
    },
    change(){
     return this.selectedTab=1
    },
    change2(){
      return this.selectedTab=2
    }
  }

}
</script>
<style>
.btn{
  display: flex;
}

</style>