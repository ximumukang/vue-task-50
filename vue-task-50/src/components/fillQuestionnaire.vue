<template>
  <div class="editQuestionnaire">
    <div id="wenjuan">
      <h1 class="creatTitle">
        {{titleAndDate.title}}
      </h1>
      <hr>
      <div id="question-list">
        <div v-for="(item,index) in questionList" class="question">
          <h3>Q<span>{{index+1}}</span> {{item.question}}</h3>
          <textarea v-if="item.isTextType" cols="60" rows="3"></textarea>
          <div v-else>
            <div v-for="(option,optionIndex) in item.options">
              <p>{{option.value}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <button>提交问卷</button>
    <Modal></Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import Modal from './Modal.vue'
  import { mapState} from 'vuex'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    name: 'fillQuestionnaire',
    data:  function(){
      return {
        isEditTitle : false,
      }
    },
    computed : {
      ...mapState([
        'isAddQuestion',
        'questionList',
        'titleAndDate',
        'isOpenModal',
        'message'
      ]),
    },
    methods:{
      ...mapMutations([
        'addQuestion' ,
        'addAudioType' ,
        'addCheckboxType',
        'addTextType',
        'cloneQuestion',
        'deleteQuestion',
        'goDown',
        'goUp',
        'addOption',
        'deleteOption',
        'saveQuestion',
        'submitQuestion'
      ])
    },
    components : {
      Modal
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
  #question-list ul{
    height: 40px;
    opacity: 0;
  }
  #question-list .question{
    padding: .5em;
  }
  #question-list .question:hover {
    background: rgb(254, 241, 232);
  }
  #question-list div:hover>ul{
    opacity: 1;
  }
  #question-list div:nth-child(1) .go-up{
    display: none;
  }
  #question-list div:nth-last-child(1) .go-down{
    display: none;
  }
  #question-list li{
    float: right;
    margin-right: 5px;
  }
  #question-list  p{
    text-indent: 2em;
  }
  .remove-option{
    margin-left: 10px;
    font-size: 14px;
    opacity: 0;
    cursor: pointer;
  }
  .remove-option:before{
    content: "\E600";

  }
  p:hover>.remove-option{
    opacity: 1;
    color: #ee7419;
  }
  #question-list .add-option{
    text-align: center;
    border: 1px dotted grey;
    opacity: 0;
  }
  #question-list .add-option:hover{
    opacity: 1;
  }
  #question-type{
    height: 30px;
    width: 90%;
    margin: 0 auto;
    padding: 25px 0;
    border: 1px solid #7d7d7d;
    text-align: center;
  }
  textarea{
    margin-left: 2em;
    width: 90%;
  }
  /* #question-type div{
     width: 400px;
     margin: 0 auto;
     line-height: 80px;
     height: 80px;
   }*/
  #question-type button{
    width: 100px;
    margin-right: 25px;
    padding: 3px 0;

  }
  #question-type button:before,#question-list div p:before{
    content: "\E600";
    margin-right: 1em;
  }
  #add-question {
    width: 90%;
    margin: 0 auto 1.5em;
    text-align: center;
    line-height: 80px;
    border: 1px solid #7d7d7d;
    background: #dadada;
  }
  #add-question:before{
    content: "\E600";
    margin-right: 5px;
  }
  #my-calender{
    width: 90%;
    line-height: 1.5em;
    margin:30px auto;

  }
  #button-group{
    width: 300px;
    float: right;
  }
  #button-group button{
    padding: 4px 10px;
  }
  #date{
    margin-left: 20%;
  }
  .creatTitle input{
    width: 90%;
    height: 80%;
    text-align: center;
  }
  #question-list input{
    width: 80%;
    text-align: left;
    height: 100%;
  }
</style>
