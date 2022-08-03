<template>
  <section>
    <p class="pagination-container">
<font-awesome-icon icon="fa-solid fa-angles-left" />
<font-awesome-icon icon="fa-solid fa-angle-left" />
<span class="inner-pagination-content">Showing page {{page}} of {{pages}}</span>
<font-awesome-icon icon="fa-solid fa-angle-right" />
<font-awesome-icon icon="fa-solid fa-angles-right" />

</p>
  </section>
</template>

<script>
export default {
    props:['totalRecords', 'perPageOptions'],
    data(){
        return{
        page:1,
        perpage: this.perPageOptions[0]
        }
    },
    // computed: {
    //     pages(){

    //     }
    // }

}
</script>

<style>
.pagination-container{
    display: flex;
    justify-content: flex-end;
}

</style>