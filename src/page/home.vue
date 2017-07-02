<template>
  <Home father-component="home"></Home>
</template>
<script type="text/ecmascript-6">
  import Home from '../components/Home.vue'
  import { mapState,mapMutations } from 'vuex'
  export default {
    name :'home',
    components:{
       Home
    },
    computed:{
      ...mapState([
          'savedIndex',
          'submitIndex',
          'viewIndex'
      ])
    },
    methods:{
      ...mapMutations([
        'editAgainChange',
        'toFill',
        'toView'
      ])
    },
    beforeRouteLeave(to,from,next){
        if(this.savedIndex >= 0){
          this.editAgainChange();
        }
        if(this.submitIndex >=0){
          this.toFill();
        }
        if(this.viewIndex >=0){
          this.toView();
        }
      next();
    }
  }
</script>
<style>

</style>
