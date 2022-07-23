<template>
  <div>
   <div style="text-align:center; font-weight:800">
    POS REQUEST
  </div>
  <div >
    BusinessID: {{}}
  </div>
  <div>
    Quantity: {{}}
  </div>
  <div>
    Pos Type: {{}}
  </div>
  <div>
    Monthly Revenue: {{}}
  </div>
  Delivery Location: {{}}
  <div>
    Daily Sales: {{}}
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
             "posRequestData": [
            {
                "id": 25,
                "businessId": 801,
                "quantity": 5,
                "posType": "android",
                "monthlyRevenue": "Above ₦500,000 - ₦700,000",
                "deliveryLocation": "100 Kudirat Abiola Way, Oregun 100212, Lagos, Nigeria",
                "status": "pending",
                "createdAt": "Thu Jul 14 2022 16:54:09 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Thu Jul 14 2022 16:54:09 GMT+0000 (Coordinated Universal Time)",
                "dailySales": "Above 100 - 1000 sales",
                "menu": '...',
            },
            {
                "id": 22,
                "businessId": 801,
                "quantity": 5,
                "posType": "android",
                "monthlyRevenue": "Above ₦500,000 - ₦700,000",
                "deliveryLocation": "100 Kudirat Abiola Way, Oregun 100212, Lagos, Nigeria",
                "status": "pending",
                "createdAt": "Thu Jul 14 2022 16:43:32 GMT+0000 (Coordinated Universal Time)",
                "updatedAt": "Thu Jul 14 2022 16:43:32 GMT+0000 (Coordinated Universal Time)",
                "dailySales": "Above 100 - 1000 sales",
                "menu": '...'
            }
        ],
        name:'harmony'
        }
    }

}
</script>

<style>

</style>