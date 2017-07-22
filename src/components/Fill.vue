<template>
    <div class="editQuestionnaire">
      <div id="wenjuan">
        <h1 class="creatTitle">
          {{survey.title}}
        </h1>
        <hr>
        <div id="question-list">
          <div v-for="(item,index) in survey.questionList" class="question">
            <h3>Q{{index+1}} {{item.question}}</h3>
            <textarea v-if="item.isTextType" v-model="item.answer" cols="60" rows="3"></textarea>
            <div v-else>
              <div v-for="(option,optionIndex) in item.options">
                <p v-if="item.isAudio" @click="active({item,option,optionIndex})" :class="{active:option.isActive}">
                  <i :class="option.isActive ? 'icon-circle': 'icon-circle-blank'"></i>
                  {{option.value}}
                </p>
                <p v-if="item.isCheckbox" @click="active({item,option,optionIndex})" :class="{active:option.isActive}">
                  <i :class="option.isActive ? 'icon-check':'icon-check-empty'"></i>
                  {{option.value}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div id="submit-fill">
        <a @click="submitFill" class="btn">提交问卷</a>
      </div>
      <Modal></Modal>
    </div>
</template>
<script type="text/ecmascript-6">

  import Modal from '../components/Modal.vue'
  import { mapState,mapMutations,mapGetters } from 'vuex'
  export default {
    name: 'fill',
    data:  function(){
      return {
        isEditTitle : false,
      }
    },
    computed : {
      ...mapState([
        'survey',
        'submitIndex'
      ]),
    },
    methods:{
      ...mapMutations([
        'active',
        'submitFill',
        'recoverSurvey'
      ]),

    },
    components : {
      Modal,
    },
    beforeRouteLeave(to,from,next){
        this.recoverSurvey();
        next();
    }
  }
</script>
<style scoped>

  #submit-fill {
    text-align: center;
  }
  .active{
    color: #ee7419;
  }
  .active * {
    color: #ee7419;
  }
</style>
