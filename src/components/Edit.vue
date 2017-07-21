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
          <h3 >Q{{index + 1}}
            <input v-if="item.isEditQuestion" type="text" v-model="item.question"
                   @blur="item.isEditQuestion = false" v-focus>
            <span v-else @click="item.isEditQuestion = true">{{item.question}}</span>
          </h3>
          <textarea v-if="item.isTextType" cols="60" rows="3"></textarea>
          <div v-else>
            <div v-for="(option,optionIndex) in item.options">
              <p>
                <i :class="{'icon-circle-blank': item.isAudio,'icon-check-empty': item.isCheckbox}"></i>
                <input v-if="option.isEditOption"
                       type="text" v-model="option.value"
                       @blur="option.isEditOption = false" v-focus />
                <span v-else @click="option.isEditOption = true">{{option.value}}</span>
                <i class="remove-option icon-trash" @click.stop="deleteOption({index,optionIndex})"></i>
              </p>
            </div>
            <p class="add-option" @click.stop="addOption(index)"><i class="icon-plus"></i></p>
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
      <button class="btn" id="audio-type" @click="addAudioType">
        <i class="icon-circle-blank icon-large"></i> 单选
      </button>
      <button class="btn" id="checkbox-type" @click="addCheckboxType">
        <i class="icon-check-empty icon-large"></i> 多选
      </button>
      <button class="btn" id="text-type" @click="addTextType">
        <i class="icon-book icon-large"></i> 文本
      </button>
    </div>
    <div id="add-question" @click="addQuestion">
      <i class="icon-plus icon-large"></i> 添加问题
    </div>
    <hr>
    <div id="my-calender">
          <span id="date-group">
            <label id="date" for="mydatepicker">问卷截止日期</label>
            <input id="mydatepicker" type="date" v-model="titleAndDate.date">
          </span>
      <span id="button-group">
            <button class="btn" id="save-question" @click="saveQuestion">保存问卷</button>&nbsp;&nbsp;&nbsp;
            <button class="btn" id="submit-question" @click="submitQuestion">发布问卷</button>
          </span>
    </div>
    <Modal></Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from './Modal.vue'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EditQuestionnaire',
    data: function () {
      return {
        isEditTitle: false,
      }
    },
    computed: {
      ...mapState([
        'isAddQuestion',
        'questionList',
        'titleAndDate',
        'isOpenModal',
        'message',
        'currentSavedQuestion',
        'savedIndex'
      ]),
    },
    methods: {
      ...mapMutations([
        'addQuestion',
        'addAudioType',
        'addCheckboxType',
        'addTextType',
        'cloneQuestion',
        'deleteQuestion',
        'goDown',
        'goUp',
        'addOption',
        'deleteOption',
        'saveQuestion',
        'submitQuestion',
        'clearCurrentSavedQuestion'
      ])
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    components: {
      Modal
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      if (this.currentSavedQuestion) {
        let savedQuestionnaire = localStorage.savedQuestionnaire ? JSON.parse(localStorage.savedQuestionnaire) : [];
        savedQuestionnaire.push(this.currentSavedQuestion);
        localStorage.savedQuestionnaire = JSON.stringify(savedQuestionnaire);
      }
      this.clearCurrentSavedQuestion();
      next();
    }
  }
</script>

<style scoped>

  #question-list ul {
    height: 24px;
    opacity: 0;
  }

  #question-list ul li {
    cursor: pointer;
  }

  #question-list div:hover > ul {
    opacity: 1;
  }

  #question-list div:nth-child(1) .go-up {
    display: none;
  }

  #question-list div:nth-last-child(1) .go-down {
    display: none;
  }

  #question-list li {
    float: right;
    margin-right: 5px;
  }

  .remove-option {
    font-size: 14px;
    opacity: 0;
    cursor: pointer;
  }

  p:hover > .remove-option {
    opacity: 1;
    color: #ee7419;
  }

  .add-option {
    text-align: center;
    border: 1px dotted grey;
    opacity: 0;
    cursor: pointer;
  }

  .add-option:hover {
    opacity: 1;
  }

  #question-type {
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    height: 80px;
    width: 90%;
    margin: 0 auto;
    border: 1px solid #7d7d7d;
  }

  #question-type button {
    width: 25%;
    margin-top: 20px;
  }

  #add-question {
    width: 90%;
    margin: 0 auto 1.5em;
    text-align: center;
    line-height: 80px;
    border: 1px solid #7d7d7d;
    background: #dadada;
  }

  #my-calender {
    display: flex;
    flex-flow: row wrap;
    width: 90%;
    line-height: 1.5em;
    margin: 30px auto;
    justify-content: space-around;
  }

  #date-group {
    text-align: center;
  }

  #mydatepicker {
    margin-bottom: 0.5em;
  }

  #button-group button {
    padding: 4px 10px;
  }

  .creatTitle input {
    width: 90%;
    height: 80%;
    text-align: center;
  }

  #question-list input {
    width: 80%;
    text-align: left;
    height: 90%;
  }
</style>
