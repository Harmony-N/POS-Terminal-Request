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
                  <CButton color="info" @click="() => { visibleLiveDemo = true }" style="margin-right:10px">Filter</CButton>
                    <CModal :visible="visibleLiveDemo" @close="() => { visibleLiveDemo = false }">
                      <CModalHeader>
                        <CModalTitle>Modal title</CModalTitle>
                      </CModalHeader>
                      <CModalBody>Woohoo, you're reading this text in a modal!</CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" @click="() => { visibleLiveDemo = false }">
                          Close
                        </CButton>
                        <CButton color="primary">Save changes</CButton>
                      </CModalFooter>
                    </CModal>
                    </div>
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
                      <CToaster placement="top-end">
                          <CToast v-for="(toast, index) in toasts" :key="index.id" color="danger" class="text-white">
                            <CToastHeader closeButton>
                            <span class="me-auto fw-bold">{{toast.title}}</span>
                            
                            </CToastHeader>
                            <CToastBody >
                              {{ toast.content }}
                            </CToastBody>  
                          </CToast>
                        </CToaster>
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
                        data.serialNumber
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
       toasts: [],
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

        console.log('the res is ',res)
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
        this.totalpages2 = Math.round(response.data.data.totalCount / 10) 
        this.count1 = response.data.data.totalCount
        this.posRequestData = response.data.data.posRequestData
      } catch (e) {
        this.toasts.push({
          title:' WARNING!!!',
          content: this.getHttpError(e)
        })
      }
    },
    getHttpError(error){
            if (error.response) {
          return error.response.data.error;
        }
        if (error.request) {
          return error.request.message;
        }
        return error.message;


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
