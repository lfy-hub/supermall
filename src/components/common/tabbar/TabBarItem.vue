<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      //isActive: false,
    }
  },
   computed:{
     activeStyle(){
       return this.isActive?{color:this.activeColor}:{}
     },
      isActive(){
      //判断哪个路由是活跃的
      return this.$route.path.indexOf(this.path)!== -1
    }  
  },  
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  },
  components: {},
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  /* 文字大小 */
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 去掉img标签自带的3px间隔 */
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>