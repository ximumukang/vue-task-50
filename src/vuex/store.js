import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAddQuestion: false,
    survey: {
      questionList: [],
      title: '这里是标题',
      date: '',
      answer:[]
    },
    isOpenModal: false,
    hasCancel: false,
    message: '',
    isFromSubmit: false,
    isFromFill: false,
    isDeleteSaved: false,
    isDeleteSubmit: false,
    savedIndex: -1,
    submitIndex: -1,
    viewIndex: -1,
    deleteIndex:-1,
    isToIndex: true,
    savedQuestionnaire: localStorage.savedQuestionnaire ? JSON.parse(localStorage.savedQuestionnaire) : [],
    submitQuestionnaire:localStorage.submitQuestionnaire ? JSON.parse(localStorage.submitQuestionnaire) : []
  },

  mutations: {

    //Home 相关

    /* 点击新建 列表隐藏 */
    build: function (state) {
      state.isShowTable = false;
    },

    editAgain(state,index){
      state.savedIndex=index;
      let toEdit =JSON.parse(localStorage.savedQuestionnaire)[index];
      state.survey=toEdit;
    },

    fill(state,index){
      state.submitIndex=index;
      let toFill = JSON.parse(localStorage.submitQuestionnaire)[index];
      state.survey=toFill;
    },

    view(state,index){
      state.viewIndex=index;
      let toView = JSON.parse(localStorage.submitQuestionnaire)[index];
      state.survey=toView;
    },

    deleteSaved(state,index){
      state.isOpenModal=true;
      state.message='确定删除此问卷？';
      state.hasCancel=true;
      state.deleteIndex=index;
      state.isDeleteSaved=true;
    },

    confirmDeleteSaved(state){
      let savedQuestionnaire=JSON.parse(localStorage.savedQuestionnaire);
      savedQuestionnaire.splice(state.deleteIndex,1);
      localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
    },

    deleteSubmit(state,index){
      state.isOpenModal=true;
      state.message='确定删除此问卷？';
      state.hasCancel=true;
      state.deleteIndex=index;
      state.isDeleteSubmit=true;
    },

    confirmDeleteSubmit(state){
      let submitQuestionnaire=JSON.parse(localStorage.submitQuestionnaire);
      submitQuestionnaire.splice(state.deleteIndex,1);
      localStorage.savedQuestionnaire=JSON.stringify(submitQuestionnaire);
    },

    updateSurveyList(state){
      state.savedQuestionnaire = localStorage.savedQuestionnaire ? JSON.parse(localStorage.savedQuestionnaire) : [];
      state.submitQuestionnaire = localStorage.submitQuestionnaire ? JSON.parse(localStorage.submitQuestionnaire) : []
    },

    //edit 相关
    addQuestion: function (state) {
      state.isAddQuestion= !state.isAddQuestion;
    },

    addAudioType: function (state) {
      state.survey.questionList.push({
        question: '单选题',
        type:"audio",
        isTextType : false,
        isEditQuestion : false,
        isAudio: true,
        options :
          [
            {value:"选项一" , isEditOption : false , isActive : false , answer : 0} ,
            {value:"选项二" , isEditOption : false , isActive : false , answer : 0} ,
            {value:"选项三" , isEditOption : false , isActive : false , answer : 0}
          ]
      });
      state.isAddQuestion = !state.isAddQuestion;
    },

    addCheckboxType: function (state) {
      state.survey.questionList.push({
        question: '多选题',
        type: 'checkBox',
        isTextType: false,
        isEditQuestion: false,
        isCheckbox: true,
        options:
          [
            {value: '选项一', isEditOption: false, isActive: false, answer: 0},
            {value: '选项二', isEditOption: false, isActive: false, answer: 0},
            {value: '选项三', isEditOption: false, isActive: false, answer: 0}
          ]
      });
      state.isAddQuestion = !state.isAddQuestion;
    },

    addTextType: function (state) {
      state.survey.questionList.push({
        question: '文本题',
        answer: '',
        type: 'text',
        isTextType: true,
        isEditQuestion: false,
      });
      state.isAddQuestion= !state.isAddQuestion;
    },

    /* 复用，删除，下移，上移 */
    cloneQuestion: function (state, index) {
      let aClone = JSON.parse(JSON.stringify(state.survey.questionList[index]));
      state.survey.questionList.splice(index, 0, aClone);
    },

    deleteQuestion : function(state,index){
      state.survey.questionList.splice(index,1);
    },

    goDown :function (state,index) {
      let aQuestion = state.survey.questionList[index];
      state.survey.questionList.splice(index,1);
      state.survey.questionList.splice(index+1,0,aQuestion);
    },

    goUp : function(state,index){
      let aQuestion = state.survey.questionList[index];
      state.survey.questionList.splice(index,1);
      state.survey.questionList.splice(index-1,0,aQuestion);
    },

    /*添加选项*/
    addOption : function (state,index) {
      state.survey.questionList[index].options.push({value: "选项" , isEditOption : false , isActive : false , answer : 0});
    },

    /*删除选项*/
    deleteOption : function (state,{index,optionIndex}) {
      state.survey.questionList[index].options.splice(optionIndex,1);
    },

    /*保存问卷*/
    saveQuestion : function (state) {
      state.message = "问卷已保存.";
      state.isOpenModal = true;
      let savedQuestionnaire=localStorage.savedQuestionnaire?JSON.parse(localStorage.savedQuestionnaire):[];
      if(state.savedIndex >= 0){
        savedQuestionnaire.splice(state.savedIndex,1,state.survey);
      }else {
        savedQuestionnaire.push(state.survey);
      }
      localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
    },

    /*点击发布问卷弹出模态框*/
    submitQuestion : function (state) {
      if(!state.survey.date){
          state.message = "请设置日期。" ;
          state.hasCancel = false ;
      } else if (state.survey.questionList.length === 0){
          state.message = "请合理设置问卷内容。" ;
          state.hasCancel = false ;
      } else {
          state.message  = "是否发布问卷？" ;
          state.hasCancel = true;
          state.isFromSubmit=true;
          state.isToIndex = true ;
      }
      state.isOpenModal = true ;

    },

    //确定发布问卷
    confirmSubmit(state){
      let submitQuestionnaire = localStorage.submitQuestionnaire ? JSON.parse(localStorage.submitQuestionnaire) : [];
      submitQuestionnaire.push(state.survey);
      localStorage.submitQuestionnaire=JSON.stringify(submitQuestionnaire);
      if(state.savedIndex >= 0){
        let savedQuestionnaire=JSON.parse(localStorage.savedQuestionnaire);
        savedQuestionnaire.splice(state.savedIndex,1);
        localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
      }
    },

    /*modal.vue --start--*/
    closeModal(state){
      state.isFromSubmit=false;
      state.isFromFill=false;
      state.hasCancel=false;
      state.isOpenModal = false;
      state.isDeleteSubmit = false;
      state.isDeleteSaved = false;
      state.isToIndex=false;
    },

    //填写问卷时点击改变isActive
    active(state,{item,option,optionIndex}){
      if(item.type==="audio"){
        item.options.forEach(function (value) {
          value.isActive=false;
          value.answer=0
        });
        item.options[optionIndex].isActive=true;
        item.options[optionIndex].answer=1;
      }else if (item.type==="checkBox"){
        option.isActive=!option.isActive;
        option.answer===0 ? option.answer=1 : option.answer=0
      }else{
        return false
      }
    },

    //点击提交填写的问卷弹出模态框
    submitFill(state){
      function isFinish() {
        for(let i=0;i<state.survey.questionList.length;i++){
          let aOption=[];
          if(state.survey.questionList[i].isTextType && state.survey.questionList[i].answer===""){
            return false
          } else if(!state.survey.questionList[i].isTextType){
            for(let f=0 ; f<state.survey.questionList[i].options.length ; f++){
              aOption.push(state.survey.questionList[i].options[f].answer);
            }
            if(eval(aOption.join("+"))===0){
              return false
            }
          }
        }
        return true;
      }
      state.isOpenModal=true;
      if(isFinish()){
        state.message  = "确定提交问卷？" ;
        state.hasCancel = true;
        state.isFromFill=true;
        state.isToIndex=true;
      }else {
        state.message = "请完整填写问卷。";
        state.hasCancel = false;
        state.isFromFill=false;
      }
    },

    //确定提交填完的问卷
    confirmFill(state){
      let submitQuestionnaire = JSON.parse(localStorage.submitQuestionnaire);
      let answer = submitQuestionnaire[state.submitIndex].answer ;
      if(!answer.length){

        for(let i=0,len=state.survey.questionList.length;i<len;i++){
          let aQuestion=[];
          if(state.survey.questionList[i].isTextType){
            aQuestion.push(state.survey.questionList[i].answer);
          }else{
            for(let f=0 ; f<state.survey.questionList[i].options.length ; f++){
              aQuestion.push(state.survey.questionList[i].options[f].answer)
            }
          }
          answer.push(aQuestion)
        }
      }
      else {
        for(let i=0;i<state.survey.questionList.length; i++){
          if(state.survey.questionList[i].options){
            for(let f=0;f<state.survey.questionList[i].options.length ; f++){
              answer[i][f]=answer[i][f]+state.survey.questionList[i].options[f].answer;
            }
          }else {
            answer[i].push(state.survey.questionList[i].answer)
          }
        }
      }
      localStorage.submitQuestionnaire=JSON.stringify(submitQuestionnaire);

    },

    //离开编辑页时还原savedindex为-1
    recoverSavedIndex(state){
      state.savedIndex = -1;
      state.submitIndex = -1;
    },

    //还原survey
    recoverSurvey(state){
      state.survey={
        questionList: [],
        title: '这里是标题',
        date: ''
      };
    }
  },
  actions:{

    //modal点击确定
    confirm({commit,state}){
      if(state.isFromSubmit){
        commit('confirmSubmit')
      }
      if(state.isFromFill){
        commit('confirmFill')
      }
      if(state.isDeleteSaved){
        commit('confirmDeleteSaved');
        commit('updateSurveyList')
      }
      if(state.isDeleteSubmit){
        commit('confirmDeleteSubmit');
        commit('updateSurveyList')
      }
      commit('closeModal')
    }


  },

  getters:{
    /*savedQuestion : state => ({title : state.titleAndDate.title,questionList : state.questionList,date : state.titleAndDate.date})*/
  }
})


