<template>
  <div>
    <div class="Crow" style="margin-bottom:20px;">
      <CButton color="success" v-if="posRequestData.status == completed">Activate</CButton>
     <CButton color="danger" v-else>Deactivate</CButton>
     {{posRequestData.status}}
    </div>
  
    <div style="text-align: center; font-weight: 800; color: chocolate; font-size: 30px;">
      POS
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
    }
  },
  methods: {
    getRequest() {
      this.request = this.$route.params.request
      console.log(this.request)
    },
  },
  async mounted() {
    this.getRequest()
    const response = await this.$http2.get(
      `/business/pos-requests/${this.request}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
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
