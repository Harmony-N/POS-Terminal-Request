<template>
  <div>
    <div style="font-weight:800; text-align: center; font-size: 30px;">
        Generate POS Request
    </div>
    <CForm >
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Quantity:"
        style="width: 500px"
        v-model="quantity"
      />
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Delivery Location:"
        style="width: 500px"
        v-model="deliveryLocation"
      />
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Pos Type:"
        style="width: 500px"
        v-model="posType"
      />
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Monthly Revenue:"
        style="width: 500px"
        v-model="monthlyRevenue"
      />
      <CFormInput
        type="number"
        id="exampleFormControlInput1"
        label="Wallet ID:"
        style="width: 500px"
        v-model="walletID"
      />
      <CFormInput
        type="text"
        id="exampleFormControlInput1"
        label="Daily Sales:"
        style="width: 500px"
        v-model="dailySales"
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
      quantity: '',
      deliveryLocation: '',
      posType: '',
      monthlyRevenue: '',
      walletID: '',
      dailySales: '',
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
  },
  async mounted() {
    this.submit()
  },
}
</script>

<style></style>
