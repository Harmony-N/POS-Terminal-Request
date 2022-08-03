<template>
  <div class="pos">
    <div class="Crow" style="margin-bottom:20px;">
      <CButton color="success" v-if="data.status !== completed">Activate</CButton>
     <CButton color="danger" v-else>Deactivate</CButton>
 
    </div>
    <div style="text-align: center; font-weight: 800">POS TERMINAL</div>
    <div><span class="font">Provider:</span> {{ data.provider }}</div>
    <hr />
    <div>
      <span class="font">OurpassReference: </span> {{ data.ourpassReference }}
    </div>
    <hr />
    <div><span class="font">Country: </span> {{ data.country }}</div>
    <hr />
    <div><span class="font"> Enable:</span> {{ data.enabled }}</div>
    <hr />
    <div>
      <span class="font">Authourization:</span> {{ data.authorisation }}
    </div>
    <hr />
    <div><span class="font"> Type: </span>{{ data.type }}</div>
    <hr />
    <div><span class="font">Status:</span> {{ data.status }}</div>
    <hr />
    <div><span class="font">Date Created:</span> {{ data.createdAt }}</div>
    <hr />
    <div><span class="font">Update Date:</span> {{ data.updatedAt }}</div>
    <hr />
    <div><span class="font">ID:</span> {{ data.id }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reference: '',

      data: {},
    }
  },
  methods: {
    getReference() {
      //  console.log(this.posData)
      this.reference = this.$route.params.reference
      // console.log( this.reference)
      // this.data= this.reference + this.posData
      // console.log(this.data)
    },
  },
  mounted() {
    this.getReference()
    this.data = this.$store.getters.getPosTerminal(this.reference)
  },

  // async created() {
  //   // this.getReference()
  //   const res= await this.$http2.get('/business/pos/terminals?page=1&limit=10', {
  //     headers:{
  //       Authorization: 'Bearer ' + localStorage.getItem('token')
  //     }
  //   })

  //   console.log(res)
  // },
}
</script>

<style>
.font {
  font-weight: 700;
}
.Crow{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
