<template>
  <div>
    <WidgetsStatsA :posData="posData" :count="count" :count1="count1" />
    <!-- <CRow>
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
    </CRow> -->
    <!-- <WidgetsStatsD /> -->
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <Tabs>
              <div class="btn">
                <div class="btn1">
                  <CButton color="secondary" variant="ghost" @click="change"
                    >POS terminal</CButton
                  >
                  <CButton color="secondary" variant="ghost" @click="change2"
                    >POS Terminal Request</CButton
                  >
                </div>
                <div>
                  <div v-if="selectedTab == 1">
                    <CButton
                      color="secondary"
                      variant="outline"
                      @click="posTerminal(data)"
                      >Create New POS Terminal</CButton
                    >
                  </div>
                  <div v-if="selectedTab == 2" class="search">
                    <div>
                      <CForm>
                        <CFormInput
                          type="email"
                          id="exampleFormControlInput1"
                          placeholder="Search with name@example.com"
                          style="width: 340px"
                          v-model="businessEmail"
                        />
                      </CForm>
                    </div>
                    <div>
                      <CButton
                        color="success"
                        variant="outline"
                        @click="getPOSRequestData"
                        v-model="businessEmail"
                        >search</CButton
                      >
                    </div>
                  </div>
                </div>
              </div>
              <Tab name="POS Terminal" v-if="selectedTab == 1">
                <pagination
                  v-if="posData"
                  @next="nextPage"
                  @prev="prevPage"
                  :page="page"
                  :totalPages="totalPages"
                  :pending="pending"
                />

                <CTable hover responsive :posData="computedData">
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell scope="col"
                        >Reference</CTableHeaderCell
                      >
                      <CTableHeaderCell scope="col"
                        >Serial Number</CTableHeaderCell
                      >
                      <CTableHeaderCell scope="col"
                        >Terminal ID</CTableHeaderCell
                      >
                      <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                      <CTableHeaderCell scope="col"
                        >Date Created</CTableHeaderCell
                      >
                      <CTableHeaderCell scope="col"> Status </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow
                      v-for="data in posData"
                      :key="data.id"
                      @click="table1(data)"
                    >
                      <CTableHeaderCell scope="row">{{
                        data.ourpassReference
                      }}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{{
                        data.ourpassReference
                      }}</CTableHeaderCell>
                      <CTableDataCell>{{ data.authorisation }}</CTableDataCell>
                      <CTableDataCell>{{ data.country }}</CTableDataCell>
                      <CTableDataCell>{{
                        $moment(data.createdAt).format('MMMM Do YYYY ')
                      }}</CTableDataCell>
                      <CTableDataCell
                        :class="
                          data.status.toLowerCase() === 'allocated'
                            ? 'status-green'
                            : 'status-yellow'
                        "
                        >{{ data.status }}</CTableDataCell
                      >
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </Tab>
              <br />
              <Tab name="POS Terminal Request" v-if="selectedTab == 2">
                <pagination
                  v-if="posRequestData"
                  @next="nextPage"
                  @prev="prevPage"
                  :page="page"
                  :totalPages="totalpages2"
                  :pending="pending"
                />
                <CTable hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell scope="col"
                        >Business Name</CTableHeaderCell
                      >
                      <CTableHeaderCell scope="col"
                        >Business Email</CTableHeaderCell
                      >
                      <CTableHeaderCell scope="col"
                        >Phone Number</CTableHeaderCell
                      >
                      <CTableHeaderCell scope="col">PosType</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                      <CTableHeaderCell scope="col"
                        >Monthly Revenue
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow
                      v-for="data in posRequestData"
                      :key="data.id"
                      @click="table2(data)"
                    >
                      <CTableHeaderCell scope="row">{{
                        data.business.name
                      }}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{{
                        data.business.user.email
                      }}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{{
                        data.business.user.phoneNumber
                      }}</CTableHeaderCell>
                      <CTableDataCell>{{ data.posType }}</CTableDataCell>
                      <CTableDataCell>{{ data.quantity }}</CTableDataCell>
                      <CTableDataCell>{{ data.monthlyRevenue }}</CTableDataCell>
                      <CTableDataCell
                        :class="
                          data.status.toLowerCase() === 'completed'
                            ? 'status-green'
                            : 'status-yellow'
                        "
                        >{{ data.status }}</CTableDataCell
                      >
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
// import MainChartExample from './charts/MainChartExample'
import WidgetsStatsA from './widgets/WidgetsStatsTypeA.vue'
// import WidgetsStatsD from './widgets/WidgetsStatsTypeD.vue'
import Tab from '@/components/tab.vue'
import Tabs from '@/components/tabs.vue'
import pagination from './pages/pagination.vue'
// import { CIcon } from '@coreui/icons-vue'
import { cilFilter } from '@coreui/icons'
import { cilList } from '@coreui/icons'

const perPageOptions = [40, 50, 100]

export default {
  name: 'Dashboard',
  components: {
    // MainChartExample,
    WidgetsStatsA,
    // WidgetsStatsD,
    Tab,
    Tabs,
    // CIcon,
    pagination,
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
  data() {
    return {
      businessEmail: '',
      cilList,
      cilFilter,
      search: '',
      selectedTab: 1,
      tabs: [
        { name: 'POS Terminal', id: 1 },
        { name: 'POS Terminal Request', id: 2 },
      ],
      pagination: { page: 1, perpage: perPageOptions[0] },
      perPageOptions,

      posData: [],
      posRequestData: [],
      page: 1,
      totalPages: null,
      totalpages2: null,
      pending: false,
      count: 0,
      count1: 0,
    }
  },
  methods: {
    table1(data) {
      this.$router.push({
        name: 'Reference',
        params: { reference: data.ourpassReference },
      })
    },
    table2(data) {
      this.$router.push({
        name: 'Request',
        params: { request: data.id },
      })
    },
    change() {
      return (this.selectedTab = 1)
    },
    change2() {
      return (this.selectedTab = 2)
    },
    posTerminal() {
      this.$router.push({
        name: 'CreatePos',
        // params:{posT: data.terminalId}
      })
    },
    posTerminalRequest() {
      this.$router.push({
        name: 'CreatePosRequest',
      })
    },
    nextPage(data) {
      this.page = data
      this.getPosData()
    },
    prevPage(data) {
      this.page = data
      this.getPosData()
    },
    async getPosData() {
      try {
        this.pending = true

        const res = await this.$http2.get(
          `/admin/pos?page=${this.page}&limit=40`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
              'verify-admin': 'test_b37c4142cc494daf90b1842713d63caa',
            },
          },
        )

        console.log(res)
        this.totalPages = Math.round(res.data.data.totalCount / 40)
        console.log('the total count is', res.data.data.totalCount)
        this.count = res.data.data.totalCount
        this.posData = res.data.data.posData
        console.log(this.posData.length)

        this.$store.commit('setPosTerminal', this.posData)
        this.pending = false
      } catch (error) {
        console.log(error)
      }
    },
    async getPOSRequestData() {
      try {
       
        let response
        if (this.businessEmail && this.businessEmail != null) {
           const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        if (this.businessEmail.match(pattern) == null) {
          console.log('wrong email')
          return
        }
          response = await this.$http2.get(
            `/admin/pos-requests?page=1&limit=10&businessEmail=${this.businessEmail}`,
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'verify-admin': 'test_b37c4142cc494daf90b1842713d63caa',
              },
            },
          )
        } else {
           response = await this.$http2.get(
            `/admin/pos-requests?page=1&limit=10`,
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'verify-admin': 'test_b37c4142cc494daf90b1842713d63caa',
              },
            },
          )
        }

        console.log('the response is ', response)
        this.totalpages2 = Math.round(response.data.data.totalCount / 26)
        this.count1 = response.data.data.totalCount
        this.posRequestData = response.data.data.posRequestData
      } catch (e) {
        console.log('error')
      }
    },
  },
  computed: {
    computedData() {
      if (!this.posData) return []
      else {
        const firstIndex = (this.pagination.page - 1) * this.pagination.perpage
        const lastIndex = this.pagination.page * this.pagination.perpage

        console.log('the index are', firstIndex, lastIndex)
        return this.posData.slice(firstIndex, lastIndex)
      }
    },
    // filteredRequest(){
    //   return this.posRequestData.filter((pos)=>{
    //     return pos.
    //   })
    // }
  },

  async created() {
    this.getPosData()
    this.getPOSRequestData()
  },
}
</script>
<style>
.btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.btn1 {
  display: flex;
  flex-direction: row;
}
.table1 {
  overflow: auto;
  height: 50px;
}
.status-green {
  color: green;
}
.status-yellow {
  color: #e3aa2b;
}
/* .pagination{
  margin-top: 10px;
} */
.search {
  display: flex;
  flex-direction: row;
}
</style>
