<template>
  <div>
    <div
      class="Crow"
      style="margin-bottom: 20px"
      v-if="posRequestData.status == 'pending'"
    >
      <CButton
        color="success"
        @click="
          buttonClicked()
        "
        >APPROVE REQUEST</CButton
      >
    </div>

    <CAlert color="danger" v-if="error2 !== ''">{{error2}}</CAlert>
    <div v-else>
      <CModal
        
        :visible="visibleLiveDemo"
        @close="
          () => {
            visibleLiveDemo = false
            this.serialNumber = []
            this.modalError = ''
            this.quantity = this.requestQuantity
          }
        "
      >
      
        <CModalHeader>

          <CModalTitle>APPROVE POS REQUEST</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CAlert color="danger" v-if="modalError !== ''">{{modalError}}</CAlert>
          <CForm novalidate>
            <CFormSelect
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Please select a prefered quantity."
              id="validationCustom04"
              label="Quantity:"
              required
              v-model="quantity"
              style="width: 470px; margin-bottom: 15px"
            >
              <option selected="" disabled="" value="">
                {{ quantity }}
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </CFormSelect>

            <CFormInput
              v-for="(i, index) in +quantity"
              :key="index.id"
              type="number"
              id="exampleFormControlInput1"
              label="Serial Number:"
              style="width: 470px; margin-bottom: 15px"
              v-model="serialNumber[i]"
              required
              minlength="8"
              maxlength="14"
              feedbackInvalid="Please enter a terminal ID of length 8."
              placeholder="Enter a valid serial number"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            @click="
              () => {
                visibleLiveDemo = false
              }
            "
          >
            Close
          </CButton>
          <CButton color="primary" @click="submit">SEND</CButton>
        </CModalFooter>
      </CModal>
    </div>

    <div
      style="
        text-align: center;
        font-weight: 800;
        color: chocolate;
        font-size: 30px;
      "
    >
      POS REQUEST
    </div>
     <div>
      <span class="font">Business Name:</span> {{ business?.name}}
    </div>
    <hr>
     <div>
      <span class="font">Phone Number:</span> {{ business?.user?.phoneNumber}}
    </div>
    <hr>
    <div>
      <span class="font">Email:</span> {{ business?.user?.email}}
    </div>
    <hr>
    <div>
      <span class="font"> Quantity: </span>{{ posRequestData.quantity }}
    </div>
    <hr />
    <div><span class="font"> Pos Type: </span>{{ posRequestData.posType }}</div>
    <hr />
    <div>
      <span class="font"> Monthly Revenue:</span>
      {{ posRequestData.monthlyRevenue }}
    </div>
    <hr />
    <div>
      <span class="font">Delivery Location:</span>
      {{ posRequestData.deliveryLocation }}
    </div>
    <hr />
    <div>
      <span class="font"> Daily Sales:</span> {{ posRequestData.dailySales }}
    </div>
    <hr />
    <div><span class="font">Status:</span> {{ posRequestData.status }}</div>
    <hr />
    <div>
      <span class="font"> Date Created: </span>{{ $moment(posRequestData.createdAt).format('MMMM Do YYYY') }}
    </div>
    <hr />
    <div>
      <span class="font"> Update Date:</span> {{ $moment(posRequestData.updatedAt).format('MMMM Do YYYY') }}
    </div>
    <hr>
     


    <div style="margin-top: 100px" v-if="posRequestData.status == 'completed'">
      <span class="p">POS DATA</span>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">SN</CTableHeaderCell>
            <CTableHeaderCell scope="col">Terminal ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>

            <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
            <CTableHeaderCell scope="col">Reference</CTableHeaderCell>
            <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow color="dark" v-for="data in completeddata" :key="data.id">
          <CTableHeaderCell scope="row">{{
              data.authorisation
            }}</CTableHeaderCell>
            <CTableHeaderCell scope="row">{{
              data.authorisation
            }}</CTableHeaderCell>
            <CTableDataCell>{{ data.country }}</CTableDataCell>

            <CTableHeaderCell scope="row">{{ data.enabled }}</CTableHeaderCell>
            <CTableDataCell>{{ data.ourpassReference }}</CTableDataCell>
            <CTableDataCell>{{ data.provider }}</CTableDataCell>
            <CTableHeaderCell scope="row">{{ data.type }}</CTableHeaderCell>
            <CTableDataCell>{{ data.status }}</CTableDataCell>
           
          </CTableRow>
        </CTableBody>
      </CTable>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posRequestData: [],
      request: '',
      visibleLiveDemo: false,
      error2: '',
      quantity: '',
      serialNumber: [],
      serialNumberTwo: '',
      serialNumberThree: '',
      completeddata: [],
      one: false,
      two: false,
      three: false,
      modalError: '',
      requestQuantity: '',
      business: []
    }
  },
  methods: {
    getRequest() {
      this.request = this.$route.params.request
      console.log(this.request)
    },
    async submit() {
      try {
        const response = await this.$http2.post(
          `admin/pos-requests/${this.request}/approve`,
          {
            quantity: Number(this.quantity),
            serialNumbers: this.serialNumber.filter(
              (serialNumber) => serialNumber,
            ),
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
              'verify-admin': 'test_b37c4142cc494daf90b1842713d63caa',
            },
          },
        )
       
        console.log('yea', response)
      } catch (e) {
        // this.error2 = this.getHttpError(e)
        this.modalError =  this.getHttpError(e)
        console.log('error')
        // console.log(e.response.data)
        console.log(this.getHttpError(e))
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
    buttonClicked(){
            this.modalError = ''
            this.visibleLiveDemo = true
            
    },
    async getPOSDetailsById(id){
        try {
     
      const response = await this.$http2.get(
        `/admin/pos-requests/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'verify-admin': 'test_b37c4142cc494daf90b1842713d63caa',
          },
        },
      )
      // console.log('the data is what', response.data.data )
      console.log('the response of pos on the page is ', response.data.data.pos)
      console.log('response', response.data.data)
      this.posRequestData = response.data.data
      this.completeddata = response.data.data.pos
      this.business = response.data.data.business
      

      this.quantity = this.posRequestData.quantity.toString()
      this.requestQuantity = this.posRequestData.quantity.toString()
      this.request = id

      // console.log('data is', this.posRequestData)
    } catch (e) {
      console.log('This is the error')
    }
    }
  },
  async mounted() {
   
  },
  created(){

    const POSId = this.$route.params.request
    this.getPOSDetailsById(POSId)
  }
}
</script>

<style scoped>
.font {
  font-weight: 700;
}
.Crow {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.p {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: green;
  font-weight: 800;
}
</style>
