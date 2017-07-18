<template>
    <div class="editQuestionnaire">
        <div id="wenjuan">
            <h1 class="creatTitle" v-if="isEditTitle">
                <input type="text" v-model="titleAndDate.title" @blur="isEditTitle = false" v-focus>
            </h1>
            <h1 class="creatTitle" v-else @click="isEditTitle = true">
                {{titleAndDate.title}}
            </h1>
            <hr>
            <div id="question-list">
                <div v-for="(item,index) in questionList" class="question">
                    <h3 v-if="item.isEditQuestion">Q<span>{{index+1}}</span>
                      <input type="text" v-model="item.question" @blur="item.isEditQuestion = false" v-focus>
                    </h3>
                    <h3 v-else @click="item.isEditQuestion = true">
                      Q<span>{{index+1}}</span> {{item.question}}
                    </h3>
                    <textarea v-if="item.isTextType" cols="60" rows="3"></textarea>
                    <div v-else>
                        <div v-for="(option,optionIndex) in item.options">
                            <p v-if="option.isEditOption">
                              <input type="text" v-model="option.value" @blur="option.isEditOption = false" v-focus>
                            </p>
                          <p v-else @click="option.isEditOption = true">
                            <span></span>{{option.value}}
                            <span class="remove-option" @click.stop="deleteOption({index,optionIndex})"></span>
                          </p>
                        </div>
                        <p class="add-option" @click.stop="addOption(index)"></p>
                    </div>
                    <ul>
                        <li class="delete-question" @click="deleteQuestion(index)">删除</li>
                        <li class="clone-question" @click="cloneQuestion(index)">复用</li>
                        <li class="go-down" @click="goDown(index)">下移</li>
                        <li class="go-up" @click="goUp(index)">上移</li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="question-type" v-show="isAddQuestion">
            <button id="audio-type" @click="addAudioType">单选</button>
            <button id="checkbox-type" @click="addCheckboxType">多选</button>
            <button id="text-type" @click="addTextType">文本</button>
        </div>
        <div id="add-question" @click="addQuestion">添加问题</div>
        <hr>
        <div id="my-calender">
          <span id="date-group">
            <label id="date" for="mydatepicker">问卷截止日期</label>
            <input id="mydatepicker" type="date" v-model="titleAndDate.date">
          </span>
          <span id="button-group">
            <button id="save-question" @click="saveQuestion">保存问卷</button>&nbsp;&nbsp;&nbsp;
            <button id="submit-question" @click="submitQuestion">发布问卷</button>
          </span>
        </div>
        <Modal></Modal>
  </div>
</template>

<script type="text/ecmascript-6">
    import Modal from './Modal.vue'
    import { mapState} from 'vuex'
    import { mapMutations } from 'vuex'
    import { mapGetters } from 'vuex'
    export default {
        name: 'EditQuestionnaire',
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
        directives : {
            focus : {
                inserted : function (el) {
                    el.focus()
                }
            }
        },
        components : {
            Modal
        }
  }
</script>

<style scoped>
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
    height: 24px;
    opacity: 0;
  }
  #question-list ul li {
    cursor: pointer;
  }
  #question-list .question{
    padding: .25em;
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
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    height: 80px;
    width: 90%;
    margin: 0 auto;
    border: 1px solid #7d7d7d;
  }
  textarea{
    margin-left: 2em;
    width: 90%;
  }
  #question-type button{
    width:25%;
    margin-top: 20px;
    height: 40px;
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
    display: flex;
    flex-flow: row wrap;
    width: 90%;
    line-height: 1.5em;
    margin:30px auto;
    justify-content: space-around;
  }
  #date-group {
    text-align: center;
  }
  #mydatepicker {
    margin-bottom: 0.5em;
  }

  #button-group button{
    padding: 4px 10px;
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
