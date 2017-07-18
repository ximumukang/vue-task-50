<template>
    <div class="editQuestionnaire">
      <div id="wenjuan">
        <h1 class="creatTitle">
          {{titleAndDate.title}}
        </h1>
        <hr>
        <div id="question-list">
          <div v-for="(item,index) in questionList" class="question">
            <h3>Q{{index+1}} {{item.question}}</h3>
            <textarea v-if="item.isTextType" v-model="item.answer" cols="60" rows="3"></textarea>
            <div v-else>
              <div v-for="(option,optionIndex) in item.options">
                <p @click="active({item,option,optionIndex})" v-bind:class="{active:option.isActive}">{{option.value}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div id="submit-fill">
        <button @click="submitFill">提交问卷</button>
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
        'questionList',
        'titleAndDate',
        'submitIndex'
      ]),
    },
    methods:{
      ...mapMutations([
        'active',
        'submitFill',
        'clearToFillQuestionnaire'
      ]),

    },
    components : {
      Modal,
    },
    beforeRouteLeave(to,from,next){
        this.clearToFillQuestionnaire();
        next();
    }
  }
</script>
<style>
  hr{
    margin-bottom: 30px;
  }
  #container h1{
    text-align: center;
    font-size: 30px;
    margin: 20px auto;
    height: 30px;
  }
  #container h1:hover{
    background:  rgb(254, 241, 232);
  }
  #question-list{
    width: 90%;
    min-height: 1px;
    margin: 0 auto;
    line-height: 1.5em;
    padding-bottom:1.5em ;
  }
  #question-list .question{
    padding: 1.5em;
  }
  #question-list .question:hover {
    background: rgb(254, 241, 232);
  }

  #question-list li{
    float: right;
    margin-right: 5px;
  }
  #question-list  p{
    text-indent: 2em;
  }
  textarea{
    margin-left: 2em;
    width: 90%;
  }
  #submit-fill {
    text-align: center;
  }
  #question-list .question:hover>h3 {
    font-weight: bold;
  }
  #question-list .question p:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
  .active{
    color: #ee7419;
  }
</style>
