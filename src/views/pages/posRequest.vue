<template>
  <div>
    <div class="Crow" style="margin-bottom:20px;" v-if="posRequestData.status == 'pending'">
<CButton color="success" @click="() => { visibleLiveDemo = true }" >APPROVE REQUEST</CButton>
    </div>
    
    <CAlert color="danger" v-if="error2">ERROR</CAlert>
    <div v-else > 
  <CModal :visible="visibleLiveDemo" @close="() => { visibleLiveDemo = false }">
    <CModalHeader>
      <CModalTitle>APPROVE POS REQUEST</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm 
    novalidate >
      <CFormSelect
      aria-describedby="validationCustom04Feedback"
      feedbackInvalid="Please select a prefered quantity."
      id="validationCustom04"
      label="Quantity:"
      required
      v-model="quantity"
     style="width: 470px;margin-bottom: 15px;"
    >
      <option selected="" disabled="" value="" >
       {{quantity}}
      </option>
      <option value='1' >1</option>
       <option value='2' >2</option>
        <option value='3' >3</option>
    </CFormSelect>

      <CFormInput
     
      v-for="(i, index) in +quantity" :key="index.id"
        type="number"
        id="exampleFormControlInput1"
        label="Serial Number:"
        style="width: 470px;margin-bottom: 15px;"
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
      <CButton color="secondary" @click="() => { visibleLiveDemo = false }">
        Close
      </CButton>
      <CButton color="primary" @click="submit">SEND</CButton>
    </CModalFooter>
  </CModal>
     
    </div>
  
    <div style="text-align: center; font-weight: 800; color: chocolate; font-size: 30px;">
      POS REQUEST
    </div>
    <div>
      <span class="font">BusinessID:</span> {{ posRequestData.businessId }}
    </div>
    <hr />
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
      <span class="font"> Date Created: </span>{{ posRequestData.createdAt }}
    </div>
    <hr />
    <div>
      <span class="font"> Update Date:</span> {{ posRequestData.updatedAt }}
    </div>
    <hr />
   

    <div style="margin-top:100px" v-if="posRequestData.status == 'completed'">
    
    <span class="p">POS DATA</span>
    
      <CTable>
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell scope="col">Terminal ID</CTableHeaderCell>
      <CTableHeaderCell scope="col">Country</CTableHeaderCell>
      
      <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
      <CTableHeaderCell scope="col">Ourpass Reference</CTableHeaderCell>
      <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
      <CTableHeaderCell scope="col">Type</CTableHeaderCell>
      <CTableHeaderCell scope="col">Wallet ID</CTableHeaderCell>
      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
      <CTableHeaderCell scope="col">ID</CTableHeaderCell>
     
     
    </CTableRow>
  </CTableHead>
  <CTableBody>
    
    <CTableRow color="dark" v-for="data in completeddata" :key="data.id">
      <CTableHeaderCell scope="row">{{data.authorisation}}</CTableHeaderCell>
      <CTableDataCell>{{data.country}}</CTableDataCell>
     
      <CTableHeaderCell scope="row">{{data.enabled}}</CTableHeaderCell>
      <CTableDataCell>{{data.ourpassReference}}</CTableDataCell>
      <CTableDataCell>{{data.provider}}</CTableDataCell>
      <CTableHeaderCell scope="row">{{data.type}}</CTableHeaderCell>
      <CTableDataCell>{{data.walletId}}</CTableDataCell>
      <CTableDataCell>{{data.status}}</CTableDataCell>
      <CTableHeaderCell scope="row">{{data.id}}</CTableHeaderCell>
      
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
      error2: false,
      quantity: '',
      serialNumber:[],
      serialNumberTwo:'',
      serialNumberThree:'',
      completeddata: [],
      one: false,
      two: false,
      three: false
      
      
    }
  },
  methods: {
    getRequest() {
      this.request = this.$route.params.request
      console.log(this.request)
    },
    async submit(){
      try{
      
          const response = await this.$http2.post(`admin/pos-requests/${this.request}/approve`, {
            quantity: Number(this.quantity),
            serialNumbers: this.serialNumber.filter(serialNumber => serialNumber )
        },{
           headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),  'verify-admin':'test_b37c4142cc494daf90b1842713d63caa'
      },
        },)
        console.log('yea',response)
       
       
      } catch(e){
        this.error2 = true;
        console.log('error')
      
      }
        },
        
  },
  async created() {
      try{
        this.getRequest()
     this.request = this.$route.params.request
    const response = await this.$http2.get(
      `/admin/pos-requests/${this.request}`,
      {
         headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),  'verify-admin':'test_b37c4142cc494daf90b1842713d63caa'
      }
      },
    )
    // console.log('the data is what', response.data.data )
    console.log('the response of pos on the page is ', response.data.data.pos)
    this.posRequestData = response.data.data
    this.completeddata = response.data.data.pos

    this.quantity = this.posRequestData.quantity.toString()

    
    // console.log('data is', this.posRequestData)
      } catch(e){
        console.log('This is the error')
      }
    
  },
}
</script>

<style scoped>
.font {
  font-weight: 700;
}
.Crow{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.p{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: green;
  font-weight: 800;
}
</style>
