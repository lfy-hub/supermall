<template>
  <div class="cart">
        <nav-bar class="cart-nav"><div slot="center">购物车({{cartLength}})</div></nav-bar>
        <cart-list/>
        <bottom-bar/>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";

import CartList from "./childComps/CartList.vue"
import BottomBar from "./childComps/BottomBar.vue"

import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar
    },
  computed:{
    ...mapGetters(['cartLength'])
  },
  
};
</script>

<style scoped>
.cart{
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;

}
</style>