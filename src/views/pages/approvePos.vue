<template>
  <div class="approve">
   <CForm 
    novalidate >
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
        label="Serial Number:"
        style="width: 500px;margin-bottom: 15px;"
        v-model="serialNumber"
        required
         minlength="8"
         maxlength="14"
        feedbackInvalid="Please enter a terminal ID of length 8."   
        placeholder="Enter a valid serial number"    
      />
      <button class="btn3" @click.prevent="submit">Approve Request</button>
      </CForm>
  </div>
</template>

<script>
export default {
    data(){
        return{
            quantity: '',
            serialNumber: ''
        }
    },
    methods:{
       async submit(){
      try{
        const response = await this.$http2.post('/business/pos-requests/1/approve', {
            quantity: this.quantity,
            serialNumber: this.serialNumber,
        },{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },)
        console.log(response)
      } catch(e){
        console.log('Details is not correct')
      }
        }
    }

}
</script>

<style>
.approve{
    display: flex;
    justify-content: center;
}
.btn3{
  width: 500px;
  border-radius: 5px;
  cursor: pointer;
  background-color:hsla(120,100%,50%,0.3);
  outline: none;
  border: none;
  padding: 10px;
}
.btn3:hover{
  background-color:hsla(120,100%,75%,0.3);
}

</style>