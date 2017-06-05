<template>
    <div>
      <header>
        <h1 id="first-h1">问卷系统</h1>
        <h1 id="second-h1"><router-link to="/">我的问卷</router-link></h1>
      </header>
      <main>
        <div id="container">
          <div v-if="fatherComponent == 'home'">
            <router-link to="/editQuestionnaire" id="build"  v-if="isShowTable == false">新建问卷</router-link>
            <table v-show="isShowTable">
              <tr>
                <th>标题</th>
                <th>时间</th>
                <th>状态</th>
                <th>操作 <button class="build-new">
                  <router-link to="/editQuestionnaire">新建问卷</router-link>
                  <!-- <a @click="router.push('editQuestionnaire')"></a>-->
                </button>
                </th>
              </tr>
              <tr v-for="(questionnaire,index) in savedQuestionnaire" class="tr">
                <td>{{questionnaire.titleAndDate.title}}</td>
                <td>{{ questionnaire.titleAndDate.date | empty }}</td>
                <td>未发布</td>
                <td>
                  <button ><router-link to="/editQuestionnaire">
                    <span @click="editAgain(index)">编辑问卷</span></router-link>
                  </button>
                  <button @click="deleteSaved(index)">删除问卷</button>
                </td>
              </tr>
              <tr v-for="(questionnaire,index) in submitQuestionnaire" class="tr">
                <td>{{questionnaire.titleAndDate.title}}</td>
                <td>{{ questionnaire.titleAndDate.date}}</td>
                <td>{{new Date(questionnaire.titleAndDate.date)>new Date() ? "发布中" : "已结束"}}</td>
                <td>
                  <button  v-if="new Date(questionnaire.titleAndDate.date)>new Date()">
                    <router-link to="/fill"><span @click="fill(index)">填写问卷</span></router-link>
                  </button>
                  <button>
                    <router-link to="/view"><span @click="view(index)">查看数据</span></router-link>
                  </button>
                  <button @click="deleteSubmit(index)" v-if="new Date(questionnaire.titleAndDate.date)<new Date()">删除问卷</button>
                </td>
              </tr>
            </table>
          </div>
          <slot></slot>
          <router-view></router-view>
        </div>
      </main>
        <!--<a id="build" @click="router.push('editQuestionnaire')">新建问卷</a>-->
    </div>
</template>
<script type="text/ecmascript-6">
  import { mapState,mapMutations } from 'vuex'
export default {
  name: 'Home',
  props:['fatherComponent'],
  data:function () {
    return {
        savedIndex : '',
        savedQuestionnaire :'',
        submitQuestionnaire :'',
        isShowTable:false,
    }
  },
  filters:{
     empty:function (value) {
       if(!value){
           return "-"
       }
       return value ;
     }
  } ,
  computed:{
      ...mapState([
        'savedIndex',
        'submitIndex'
      ]),
  },
  created:function () {
    this.savedQuestionnaire=localStorage.savedQuestionnaire ? JSON.parse(localStorage.savedQuestionnaire) : [];
    this.submitQuestionnaire=localStorage.submitQuestionnaire ? JSON.parse(localStorage.submitQuestionnaire) : [];
    if(this.savedQuestionnaire.length > 0 || this.submitQuestionnaire.length >0){
      this.isShowTable=true
    }else{
      this.isShowTable=false
    }
  },
  methods:{
     /* editAgain(index){
       router.push('editQuestionnaire');
        alert(index);
      },*/
    ...mapMutations([
        'editAgain',
        'fill',
        'view'
    ]),
    deleteSaved(index){
        this.savedQuestionnaire.splice(index,1);
        localStorage.savedQuestionnaire=JSON.stringify(this.savedQuestionnaire);
        if(this.savedQuestionnaire.length==0 && this.submitQuestionnaire==0){
          this.isShowTable=false;
        }
    },
    deleteSubmit(index){
      this.submitQuestionnaire.splice(index,1);
      localStorage.submitQuestionnaire=JSON.stringify(this.submitQuestionnaire);
      if(this.savedQuestionnaire.length==0 && this.submitQuestionnaire==0){
        this.isShowTable=false;
      }
    }
  },

  beforeRouteLeave(to,from,next){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #build{
      width: 200px;
      height:45px;
      background:#ee7419 ;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -100px;
      margin-top: -22.5px;
      color: white;
      font-size: 1.5em;
      line-height: 45px;
      border-radius: .1em;
      box-shadow: 0 .05em .25em rgba(0,0,0,.5);
  }
  #build:before{
      content: "\E600";
      padding-right: .5em;
      padding-left: .5em;
  }
  table{
      width: 90%;
      padding: 1em;
      margin: 0 auto;
      border-spacing: 0;
  }
  table th{
      font-size: 20px;
      font-weight: bold;
      padding: 1em;
  }
  th:hover{
      background:rgb(254, 241, 232);
  }
  .tr:hover{
      background:rgb(254, 241, 232);
  }
  button{
      width: 6em;
      padding: 3px;
      margin-left: 1em;
  }
  td{
      font-size: 18px;
      text-align: center;
      padding: .5em;
      color: grey;
      border-bottom: 1px solid grey;
  }
  a{
      color: black;
  }
  a:hover{
      color: white;
  }
  button a{
      display: block;
      width: 100%;
      height: 100%;
      padding: 3px;
  }
  .add-btn,.view-data,.build-new{
      padding: 0;
  }
  .ing{
      color: lightgreen;
  }
  .been{
      color:firebrick;
  }
  .saving{
      color: grey;
  }
</style>
