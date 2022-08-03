<template>
  <div>
    <div class="Crow" style="margin-bottom:20px;" v-if="posRequestData.status == 'pending'">
<CButton color="success" @click="() => { visibleLiveDemo = true }" >APPROVE REQUEST</CButton>
    </div>
    
    <CAlert color="danger" v-if="error">ERROR</CAlert>
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
       Select an option
      </option>
      <option value=1>1</option>
       <option value=2>2</option>
        <option value=3>3</option>
    </CFormSelect>

      <CFormInput
        type="number"
        id="exampleFormControlInput1"
        label="Serial Number:"
        style="width: 470px;margin-bottom: 15px;"
        v-model="serialNumber"
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
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      posRequestData: [],
      request: '',
      visibleLiveDemo: false,
      error: false,
      quantity: '',
      serialNumber:'',
      
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
            serialNumbers: [this.serialNumber],
        },{
           headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),  'verify-admin':'test_b37c4142cc494daf90b1842713d63caa'
      },
        },)
        console.log('yea',response)
      } catch(e){
        this.error = true;
      }
        }
  },
  async mounted() {
    this.getRequest()
    const response = await this.$http2.get(
      `/admin/pos-requests/${this.request}`,
      {
         headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),  'verify-admin':'test_b37c4142cc494daf90b1842713d63caa'
      }
      },
    )
    // console.log('the data is what', response.data.data )
    console.log('the response on the page is ', response)
    this.posRequestData = response.data.data
    
    // console.log('data is', this.posRequestData)
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
</style>
