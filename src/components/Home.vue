<template>
  <div>
    <router-link to="/edit" id="build" v-if="isShowTable == false">新建问卷</router-link>
    <table v-show="isShowTable">
      <tr>
        <th>标题</th>
        <th>时间</th>
        <th>状态</th>
        <th>操作
          <router-link to="/edit" class="build-new btn">新建问卷</router-link>
        </th>
      </tr>
      <tr v-for="(questionnaire,index) in savedQuestionnaire" class="tr">
        <td>{{questionnaire.titleAndDate.title}}</td>
        <td>{{ questionnaire.titleAndDate.date | empty }}</td>
        <td class="saving">未发布</td>
        <td>
          <router-link to="/edit" class="btn">
            <span @click="editAgain(index)">编辑问卷</span>
          </router-link>
          <a @click="deleteSaved(index)" class="btn">删除问卷</a>
        </td>
      </tr>
      <tr v-for="(questionnaire,index) in submitQuestionnaire" class="tr">
        <td>{{questionnaire.titleAndDate.title}}</td>
        <td>{{questionnaire.titleAndDate.date}}</td>
        <td v-if="new Date(questionnaire.titleAndDate.date)>new Date()" class="ing">发布中</td>
        <td v-else class="been">已结束</td>
        <td>
          <router-link to="/fill" v-if="new Date(questionnaire.titleAndDate.date)>new Date()" class="btn">
            <span @click="fill(index)">填写问卷</span>
          </router-link>
          <router-link to="/view" class="btn">
            <span @click="view(index)">查看数据</span>
          </router-link>
          <a @click="deleteSubmit(index)"
             v-if="new Date(questionnaire.titleAndDate.date)<new Date()"
             class="btn">
            删除问卷
          </a>
        </td>
      </tr>
    </table>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  export default {
    name: 'Home',
    data: function () {
      return {
        savedQuestionnaire: '',
        submitQuestionnaire: '',
        isShowTable: false,
      }
    },
    filters: {
      empty: function (value) {
        if (!value) {
          return "-"
        }
        return value;
      }
    },
    computed: {
      ...mapState([
        'savedIndex',
        'submitIndex',
        'viewIndex'
      ]),
    },
    created: function () {
      this.savedQuestionnaire = localStorage.savedQuestionnaire ? JSON.parse(localStorage.savedQuestionnaire) : [];
      this.submitQuestionnaire = localStorage.submitQuestionnaire ? JSON.parse(localStorage.submitQuestionnaire) : [];
      if (this.savedQuestionnaire.length > 0 || this.submitQuestionnaire.length > 0) {
        this.isShowTable = true
      }
    },
    updated: function () {
      if (this.savedQuestionnaire.length > 0 || this.submitQuestionnaire.length > 0) {
        this.isShowTable = true
      } else {
        this.isShowTable = false
      }
    },
    methods: {
      ...mapMutations([
        'editAgain',
        'fill',
        'view',
        'editAgainChange',
        'toFill',
        'toView'
      ]),
      deleteSaved(index){
        this.savedQuestionnaire.splice(index, 1);
        localStorage.savedQuestionnaire = JSON.stringify(this.savedQuestionnaire);
      },
      deleteSubmit(index){
        this.submitQuestionnaire.splice(index, 1);
        localStorage.submitQuestionnaire = JSON.stringify(this.submitQuestionnaire);
      }
    },
    beforeRouteLeave(to, from, next){
      if (this.savedIndex >= 0) {
        this.editAgainChange();
      }
      if (this.submitIndex >= 0) {
        this.toFill();
      }
      if (this.viewIndex >= 0) {
        this.toView();
      }
      next();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #build {
    width: 200px;
    height: 45px;
    background: #ee7419;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -22.5px;
    color: white;
    font-size: 1.5em;
    line-height: 45px;
    border-radius: .1em;
    box-shadow: 0 .05em .25em rgba(0, 0, 0, .5);
  }

  #build:before {
    content: "\E600";
    padding-right: .5em;
    padding-left: .5em;
  }

  table {
    width: 90%;
    padding: 1em;
    margin: 0 auto;
    border-spacing: 0;
  }

  table th {
    font-size: 20px;
    height: 30px;
    font-weight: bold;
    padding: 1em;
  }

  th span {
    display: inline-block;
    width: 90px;
    height: 34px;
    border: 1px solid black;
  }

  th:hover {
    background: rgb(254, 241, 232);
  }

  .tr:hover {
    background: rgb(254, 241, 232);
  }

  td {
    font-size: 18px;
    text-align: center;
    padding: .5em;
    color: grey;
    border-bottom: 1px solid grey;
  }

  th a {
    display: inline-table;
  }
  a span {
    display: inline-block;
    width: 100%;
    height: 34px;
  }

  a span:hover {
    color: white;
  }

  .add-btn, .view-data, .build-new {
    padding: 0;
  }

  .ing {
    color: lightgreen;
  }

  .been {
    color: firebrick;
  }

  .saving {
    color: grey;
  }
</style>
