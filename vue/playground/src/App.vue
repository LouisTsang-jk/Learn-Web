<template>
  <div id="app" @contextmenu.prevent="rightClick">
    <C1 text="This is compontents 1"/>
  </div>
</template>

<script>
import C1 from './components/C1.vue'

export default {
  name: 'App',
  custom: 'custom',
  components: {
    C1
  },
  created(){
    // console.log(this.$options)
  },
  methods:{
    rightClick(){
      console.log('右键点击事件')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
