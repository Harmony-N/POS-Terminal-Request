<template>
  <article>
    <header class="tabs">
        <ul>
            <li v-for="(tab, index) in tabs" :key="index">
                <div class="nav-item">
                  {{tab.name}}
                
                </div>
                
            </li>
        </ul>

    </header>
   

    <section class="tabs-details">
        <slot></slot>

    </section>

  </article>
</template>

<script>
export default {

    data(){
        return{

            tabs:[ {name: 'POS Terminal'}, {name:'POS Terminal Request'}]
        }
    },
    mounted(){
       this.tabs= this.$children
       
    }

}
</script>

<style>

</style>