<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "common/scroll/Scroll";
import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated(){
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100%-93px);
}
.content {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 93px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #fff;
}
</style>
