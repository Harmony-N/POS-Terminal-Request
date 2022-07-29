<template>
  <div>
    <!-- <div  style="margin-bottom:20px;">
      <CButton color="success" @click="approve" >Approve</CButton>
     
    </div> -->
    <div style="font-weight:800; text-align: center; font-size: 30px; margin-bottom: 20px;">
        POS Request
    </div>
    <div class="formR">
    <CForm 
    class=" needs-validation"
    novalidate>
      <CFormSelect
      aria-describedby="validationCustom04Feedback"
      feedbackInvalid="Please select a prefered quantity."
      id="validationCustom04"
      label="Quantity:"
      required
      v-model="quantity"
     style="width: 500px;margin-bottom: 15px;"
    >
      <option selected="" disabled="" value="">
       Select an option
      </option>
      <option>1</option>
       <option>2</option>
        <option>3</option>
    </CFormSelect>

      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Delivery Location:"
       style="width: 500px;margin-bottom: 15px;"
        v-model="deliveryLocation"
      />
      <CFormSelect
      aria-describedby="validationCustom04Feedback"
      feedbackInvalid="Please select a valid pos type."
      id="validationCustom04"
      label="POS Type:"
      required
      v-model="posType"
     style="width: 500px;margin-bottom: 15px;"
    >
      <option selected="" disabled="" value="">
       Select an option
      </option>
      <option>android</option>
      
    </CFormSelect>

       <CFormSelect
      aria-describedby="validationCustom04Feedback"
      feedbackInvalid="Please select a valid pos type."
      id="validationCustom04"
      label="Monthly Revenue:"
      required
      v-model="monthlyRevenue"
     style="width: 500px;margin-bottom: 15px;"
    >
      <option selected="" disabled="" value="">
       Select average monthly revenue
      </option>
      <option>₦300,000 - ₦500,000</option>
      <option>Above ₦500,000 - ₦700,000</option>
      <option>Above ₦700,000 - ₦1,000,000</option>
      <option>Above ₦1,000,000 </option>
      
    </CFormSelect>
      <CFormInput
        type="number"
        id="exampleFormControlInput1"
        label="Wallet ID:"
         style="width: 500px;margin-bottom: 15px;"
        v-model="walletID"
      />
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Daily Sales:"
          style="width: 500px;margin-bottom: 15px;"
        v-model="dailySales"
      />
       <button class="btn3" @click.prevent="submit">Submit</button>
    </CForm>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: '',
      deliveryLocation: '',
      posType: '',
      monthlyRevenue: '',
      walletID: '',
      dailySales: '',
      approve:[]
    }
  },
  methods: {
    async submit() {
      const response = await this.$http2.post(
        '/business/pos-requests',
        {
          quantity: this.quantity,
          deliveryLocation: this.deliveryLocation,
          posType: this.posType,
          monthlyRevenue: this.monthlyRevenue,
          walletId: this.walletID,
          dailySales: this.dailySales,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      )
      console.log(response)
    },

    async approve(){
      const requets = await this.$http2.post('/business/pos-requests/1/approve', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },)

        console.log(requets)
    }
  },
  // async mounted() {
  //   this.submit()
  // },

}
</script>

<style>
.formR{
  width: 555px;
  margin: 0 auto;
}
.btn3{
  width: 500px;
  border-radius: 5px;
  cursor: pointer;
 background-color:hsla(120,100%,50%,0.3);

  color: black;
  padding: 10px;
transition-timing-function: ease-in;
outline: none;
border: none;
text-align: center;
}
.btn3:hover{
  background-color:hsla(120,100%,75%,0.3);
}
</style>
