<template>
  <div class="pos">
  <div style="text-align:center; font-weight:800">
    POS DATA
  </div>
  <div>
    Provider: {{}}
  </div>
  <div>
    OurpassReference: {{}}
  </div>
  <div>
    Country: {{}}
  </div>
  <div>
    Enable: {{}}
  </div>
  Authourization: {{}}
  <div>
    Type: {{}}
  </div>
  <div>
    Status: {{}}
  </div>
  <div>
    Date Created: {{}}
  </div>
  <div>
    Update Date: {{}}
  </div>
  <div>
    ID: {{}}
  </div>
  </div>
  
</template>

<script>
export default {
   data(){
    return{
        reference:''
    }
   },
   methods:{
    getReference(){
        console.log(this.$route)
        this.reference = this.$route.params.reference
    }
   },
   mounted(){
    this.getReference()
   }
}
</script>

<style>


</style>