import Vue from 'vue' ;
import Vuex from 'vuex' ;

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isAddQuestion : false ,
    questionList : [] ,
    titleAndDate :{
      title : '这里是标题',
      date : ''
    },
    isOpenModal : false ,
    hasCancel : false ,
    message : '',
    isFormSubmit :false,
    isFromFill :false,
    currentSavedQuestion : null,
    savedIndex : -1,
    submitIndex : -1,
    viewIndex : -1,
    isToIndex :true,
  },

  mutations : {
    /*点击新建 列表隐藏*/
    build : function (state) {
      state.isShowTable=false;
      router.push({path:"editQuestionnaire"});
    },
    addQuestion : function (state) {
      state.isAddQuestion= !state.isAddQuestion;
    },
    addAudioType : function (state) {
      state.questionList.push({
        question: "单选题",
        type:"audio",
        isTextType : false,
        isEditQuestion : false,
        options :
          [
            {value:"选项一" , isEditOption : false , isActive : false , answer : 0} ,
            {value:"选项二" , isEditOption : false , isActive : false , answer : 0} ,
            {value:"选项三" , isEditOption : false , isActive : false , answer : 0}
          ]
      });
      state.isAddQuestion= !state.isAddQuestion;
    },
    addCheckboxType : function (state) {
      state.questionList.push({
        question: "多选题",
        type:"checkBox",
        isTextType : false,
        isEditQuestion : false,
        options :
          [
            {value:"选项一" , isEditOption : false , isActive : false , answer : 0} ,
            {value:"选项二" , isEditOption : false , isActive : false , answer : 0} ,
            {value:"选项三" , isEditOption : false , isActive : false , answer : 0}
          ]
      });
      state.isAddQuestion= !state.isAddQuestion;
    },
    addTextType : function (state) {
      state.questionList.push({
        question: "文本题",
        answer: "",
        type:"text",
        isTextType : true,
        isEditQuestion : false,
      });
      state.isAddQuestion= !state.isAddQuestion;
    },
    /*复用，删除，下移，上移*/
    cloneQuestion : function(state,index){
      state.questionList.splice(index,0,state.questionList[index]);
    },
    deleteQuestion : function(state,index){
      state.questionList.splice(index,1);
    },
    goDown :function (state,index) {
      let aQuestion = state.questionList[index];
      state.questionList.splice(index,1);
      state.questionList.splice(index+1,0,aQuestion);
    },
    goUp : function(state,index){
      let aQuestion = state.questionList[index];
      state.questionList.splice(index,1);
      state.questionList.splice(index-1,0,aQuestion);
    },
    /*添加选项*/
    addOption : function (state,index) {
      state.questionList[index].options.push({value: "选项" , isEditOption : false , isActive : false , answer : 0});
    },
    /*删除选项*/
    deleteOption : function (state,{index,optionIndex}) {
      state.questionList[index].options.splice(optionIndex,1);
    },
    /*保存问卷*/
    saveQuestion : function (state) {
      state.message = "问卷已保存."
      state.isOpenModal = true;
      state.currentSavedQuestion={
        questionList : state.questionList ,
        titleAndDate : state.titleAndDate
      }
      if(state.savedIndex >= 0){
        let savedQuestionnaire=JSON.parse(localStorage.savedQuestionnaire)
        savedQuestionnaire.splice(state.savedIndex,1,state.currentSavedQuestion);
        localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
        state.currentSavedQuestion=null;
      }
    },
    /*child's confirm emit closeModal*/
    closeModal : function (state) {
      state.isOpenModal = false ;
    },

    /*发布问卷*/
    submitQuestion : function (state) {
      if(!state.titleAndDate.date){
          state.message = "请设置日期。" ;
          state.hasCancel = false ;
      } else if (state.questionList.length == 0){
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
    /*modal.vue --start--*/
    closeModal(state){
      state.isOpenModal = false ;
    },
    //modal点击确定
    confirm(state){
      //确定发布问卷
      if(state.isFromSubmit){
        let submitQuestionnaire = localStorage.submitQuestionnaire ? JSON.parse(localStorage.submitQuestionnaire) : [];
        state.currentSavedQuestion={
          questionList : state.questionList ,
          titleAndDate : state.titleAndDate
        }
        submitQuestionnaire.push(state.currentSavedQuestion);
        localStorage.submitQuestionnaire=JSON.stringify(submitQuestionnaire);
        state.currentSavedQuestion=null;
        if(state.savedIndex >= 0){
          let savedQuestionnaire=JSON.parse(localStorage.savedQuestionnaire);
          savedQuestionnaire.splice(state.savedIndex,1);
          localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
        }

      }
      //确定提交填完的问卷
      if(state.isFromFill){
        var dataAll = localStorage.dataAll ? JSON.parse(localStorage.dataAll) : [] ;
        var data = dataAll[state.submitIndex] ;
        if(data==undefined){
          data=[];
          for(let i=0;i<state.questionList.length;i++){
            var aOption=[]
            if(state.questionList[i].isTextType){
              aOption.push(state.questionList[i].answer);
            }else{
              for(let f=0 ; f<state.questionList[i].options.length ; f++){
                aOption.push(state.questionList[i].options[f].answer)
              }
            }
            data.push(aOption)
          }
        }
        else {
          for(let i=0;i<state.questionList.length; i++){
            if(state.questionList[i].options){
              for(let f=0;f<state.questionList[i].options.length ; f++){
                data[i][f]=Number(data[i][f])+Number(state.questionList[i].options[f].answer);
              }
            }else {
              data[i].push(state.questionList[i].answer)
            }
          }
        }
        dataAll[state.submitIndex]=data;
        localStorage.dataAll=JSON.stringify(dataAll);
      }
      state.isFromSubmit=false;
      state.isFromFill=false;
      state.hasCancel=false;
      state.isOpenModal = false ;
      state.isToIndex=false;
    },
    cancelModal(state){
      state.isOpenModal = false ;
      state.hasCancel = false ;
      state.isToIndex=false;
    },
    //退出编辑页时清除数据
    clearCurrentSavedQuestion(state){
        state.currentSavedQuestion=null;
        state.savedIndex=-1;
        state.questionList=[] ;
        state.titleAndDate ={
          title : '这里是标题',
          date : ''
        }
    },
    //退出完成问卷页时清除数据
    clearToFillQuestionnaire(state){
      state.submitIndex=-1;
      state.questionList=[] ;
      state.titleAndDate ={
          title : '这里是标题',
          date : ''
      }
    },
    //退出查看数据页时清除数据
    clearViewQuestion(state){
      state.viewIndex=-1;
      state.questionList=[] ;
      state.titleAndDate ={
        title : '这里是标题',
        date : ''
      }
    },
    editAgain(state,index){
      state.savedIndex=index;
    },
    fill(state,index){
      state.submitIndex=index;
    },
    //点击查看数据
    view(state,index){
      state.viewIndex=index;
    },
    //再次编辑改变state的questionList
    editAgainChange(state){
      let toEditQuestionnaire =JSON.parse(localStorage.savedQuestionnaire)[state.savedIndex];
      state.questionList=toEditQuestionnaire.questionList;
      state.titleAndDate=toEditQuestionnaire.titleAndDate;
    },
    //去完成问卷改变state的questionList
    toFill(state){
      let toFillQuestionnaire = JSON.parse(localStorage.submitQuestionnaire)[state.submitIndex];
      state.questionList=toFillQuestionnaire.questionList;
      state.titleAndDate=toFillQuestionnaire.titleAndDate;
    },
    //去查看数据
    toView(state){
      let toViewQuestionnaire = JSON.parse(localStorage.submitQuestionnaire)[state.viewIndex];
      state.questionList=toViewQuestionnaire.questionList;
      state.titleAndDate=toViewQuestionnaire.titleAndDate;
    },
    //填写问卷时点击改变isActive
    active(state,{item,option,optionIndex}){
      if(item.type=="audio"){
        item.options.forEach(function (value) {
          value.isActive=false;
          value.answer=0
        })
        item.options[optionIndex].isActive=true;
        item.options[optionIndex].answer=1;
      }else if (item.type=="checkBox"){
        option.isActive=!option.isActive;
        option.answer==0 ? option.answer=1 : option.answer=0
      }else{
        return
      }
    },
    //提交已完成的问卷
    submitFill(state){
      function isFinish() {
        for(let i=0;i<state.questionList.length;i++){
          var aOption=[]
          if(state.questionList[i].isTextType && state.questionList[i].answer==""){
            return false
          } else if(!state.questionList[i].isTextType){
            for(let f=0 ; f<state.questionList[i].options.length ; f++){
              aOption.push(state.questionList[i].options[f].answer);
            }
            if(eval(aOption.join("+"))==0){
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

    }
  },
  actions:{
    /*setApp({commit},platform){
      commit('SET_APP',platform);
    }*/
  },

  getters:{
    /*savedQuestion : state => ({title : state.titleAndDate.title,questionList : state.questionList,date : state.titleAndDate.date})*/
  }
})
