<template>
  <div>
    <div style="font-weight:800; text-align:center; font-size: 30px;">
        Create New POS Terminal
    </div>
    <CForm>
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Terminal ID:"
        style="width: 500px"
        v-model="terminalID"
      />
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Provider:"
        style="width: 500px"
        v-model="provider"
      />
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Country:"
        style="width: 500px"
        v-model="country"
      />
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Type:"
        style="width: 500px"
        v-model="type"
      />
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Serial Number:"
        style="width: 500px"
        v-model="serialNumber"
      />
      <CButton color="success" style="margin-top: 20px" @click.prevent="submit"
        >SUBMIT</CButton
      >
    </CForm>
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
    }
  },

  methods: {
    async submit() {
      const response = await this.$http2.post(
        '/business/pos',
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
      console.log(response)
    },
  },
  async mounted() {
    this.submit()
  },
}
</script>

<style></style>
