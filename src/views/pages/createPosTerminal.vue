<template>
  <div>
     <CAlert color="danger" v-if="modalError !== ''">{{modalError}}</CAlert>
    <div style="font-weight:800; text-align: center; font-size: 30px;margin-bottom: 20px;">
        Create New POS Terminal
    </div>
    <div class="form">
    <CForm 
    novalidate >
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Terminal ID:"
        style="width: 500px;margin-bottom: 15px;"
        v-model="terminalID"
        required
         minlength="4"
         maxlength="8"
        feedbackInvalid="Please enter a terminal ID of length 8."
        
      />
      <CFormSelect
      aria-describedby="validationCustom04Feedback"
      feedbackInvalid="Please select a valid provider."
      id="validationCustom04"
      label="Provider:"
      required
      v-model="provider"
     style="width: 500px;margin-bottom: 15px;"
    >
      <option selected="" disabled="" value="">
       Select an option
      </option>
      <option>flutterwave</option>
    </CFormSelect>

      

       <CFormSelect
      aria-describedby="validationCustom04Feedback"
      feedbackInvalid="Please select a valid Type."
      id="validationCustom04"
      label="Type:"
      required
      v-model="type"
     style="width: 500px;margin-bottom: 15px;"
    >
      <option selected="" disabled="" value="">
      Select an option
      </option>
      <option>andriod</option>
    </CFormSelect>
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Serial Number:"
       style="width: 500px;margin-bottom: 15px;"
        v-model="serialNumber"
      />
      <CFormSelect
      aria-describedby="validationCustom04Feedback"
      feedbackInvalid="Please select a valid Country."
      id="validationCustom04"
      label="Country:"
      style="width: 500px;" 
      required
      v-model="country"
     
    >
      <option selected="" disabled="" value="">
      Select country
      </option>
      <option>NGN</option>
    </CFormSelect>
     
      <button class="btn2" @click.prevent="submit">Submit</button>
    </CForm>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      terminalID: '',
      provider: '',
      country: '',
      type: '',
      serialNumber: '',
      modalError: ''
    }
  },

  methods: {
    async submit() {
      try{
        const response = await this.$http2.post(
        '/admin/pos',
        {
          terminalId: this.terminalID,
          provider: this.provider,
          country: this.country,
          type: this.type,
          serialNumber: this.serialNumber,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      )
      console.log('the response of the terminal is', response)
      } catch(e){
        console.log(e)
        this.modalError =  this.getHttpError(e)
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
  
}
</script>

<style>
.form{

  width: 555px;
  margin: 0 auto;
}
.btn2{
  width: 500px;
  border-radius: 5px;
  cursor: pointer;
 background-color:hsla(120,100%,50%,0.3);
  margin-top: 10px;
  color: black;
  padding: 10px;
transition-timing-function: ease-in;
outline: none;
border: none;
text-align: center;

}
.btn2:hover{
  background-color:hsla(120,100%,75%,0.3);
}
</style>
