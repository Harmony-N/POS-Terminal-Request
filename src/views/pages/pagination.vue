<template>
  <section>
    <p class="pagination-container">
<font-awesome-icon icon="fa-solid fa-angles-left" :class="{disabled:pending }" class="fad" @click="goToFirstPage()"/>
<font-awesome-icon icon="fa-solid fa-angle-left" :class="{disabled:pending }" class="fad" @click="prevPage()"/>
<span class="inner-pagination-content word" >Showing page {{page}} of {{totalPages}}</span>
<font-awesome-icon icon="fa-solid fa-angle-right" :class="{disabled:pending }" class="fad"   @click="nextPage()"/>
<font-awesome-icon icon="fa-solid fa-angles-right" :class="{disabled:pending }" class="fad"  @click="goToLastPage()"/>

</p>
  </section>
</template>

<script>
export default {
  props: {
    page: Number,
    totalPages: Number,
    pending: {
        type: Boolean,
        default: false
    }
  },
  data(){
    return{
    currentPage: 1
    }
  },
  methods:{
    prevPage(){
        if(this.currentPage >= 1){
             this.$emit('prev', this.currentPage--)
        }
    
    },
    nextPage(){
        if(this.currentPage <= this.totalPages) {
           this.$emit('next', this.currentPage++)
        }
    },
    goToLastPage(){
        this.$emit('next', this.totalPages)

    },goToFirstPage(){
      this.$emit('prev', 1)
    }
  }  

}
</script>

<style>
.pagination-container{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
}
.fad{
    width: 20px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
}
.word{
    font-size: 14px;
}
.disabled{
    color: grey;
    pointer-events: none;
}

</style>