<template>
  <Home>
    <EditQuestionnaire></EditQuestionnaire>
  </Home>
</template>

<script type="text/ecmascript-6">
  import Home from '../components/Home.vue'
  import EditQuestionnaire from '../components/EditQuestionnaire'
  import { mapState, mapMutations} from 'vuex'
  export default {
      name: 'editQuestionnaire',
      components: {
          Home,
          EditQuestionnaire
      },
      computed :{
        ...mapState([
            'currentSavedQuestion',
            'savedIndex'
        ]),
      },
      methods:{
        ...mapMutations([
          'clearCurrentSavedQuestion'
        ])
      },
      beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`

        if(this.currentSavedQuestion){
            let savedQuestionnaire=localStorage.savedQuestionnaire ? JSON.parse(localStorage.savedQuestionnaire) : [];
            savedQuestionnaire.push(this.currentSavedQuestion);
            localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);

        }
        this.clearCurrentSavedQuestion();
        next();
      }
  }
</script>

<style>

</style>
