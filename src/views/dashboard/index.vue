<template>
  <div>
    <Cart/>
    <Sale/>
    <Observe/>
  </div>
</template>

<script>
import Cart from './Cart'
import Sale from './Sale'
import Observe from './Observe'
export default {
  name: 'Dashboard',
  components:{
    Cart,
    Sale,
    Observe
  },
  mounted(){
    this.$store.dispatch('getData')
  }
}
</script>

<style scoped>

</style>
