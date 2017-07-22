<template>
  <div class="editQuestionnaire">
    <div id="wenjuan">
      <h1 class="creatTitle">
        {{survey.title}}
      </h1>
      <hr>
      <div id="question-list">
        <div v-for="(item,index) in survey.questionList" class="question">
          <h3>Q{{index + 1}} {{item.question}}</h3>
          <p v-if="item.isTextType" v-for="value in answer[index]">{{value}}</p>
          <div>
            <canvas v-show="!item.isTextType" width='220px' height='220px'></canvas>
            <div class="describe">
                  <span v-for="(option,optionIndex) in item.options">{{option.value}}
                    <span v-bind:class="fillColors[optionIndex]"></span>
                  </span>
            </div>
          </div>
        </div><!--question-->
      </div><!--question-list-->
      <hr>
      <div id="back-div">
          <router-link to="/" class="btn">返回</router-link>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import Home from '../components/Home.vue'
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name: 'view',
    data: function () {
      return {
        fillColors: ["blue", "red", "green", "black", "pink", "orange", "grey", "gold", "white"]
      }
    },
    computed: {
      ...mapState([
        'survey',
        'isOpenModal',
        'message',
        'submitIndex',
        'viewIndex'
      ]),
      answer: function () {
        return JSON.parse(localStorage.submitQuestionnaire)[this.viewIndex].answer;
      }
    },
    methods: {
      ...mapMutations([
          'recoverSurvey'
      ]),
    },
    updated(){
      let canvasEles = document.getElementsByTagName("canvas");
      for (let i = 0,len=canvasEles.length; i < len; i++) {
        if (typeof this.answer[i][0] !== "number") {
          continue;
        }
        let a = 0, b = 0, aQuestionData = eval(this.answer[i].join("+"));
        for (let f = 0; f < this.answer[i].length; f++) {
          let context = canvasEles[i].getContext("2d");
          context.beginPath();
          let percentage = (this.answer[i][f] / aQuestionData),
            scale = percentage.toFixed(2);
          b = a + (2 * Math.PI) * percentage;

          context.arc(110, 110, 100, a, b, false);
          context.lineTo(110, 110);
          a = b;
          context.fillStyle = this.fillColors[f];
          context.globalAlpha = 0.35;
          context.fill();
          context.closePath();
        }
      }
    },
    beforeRouteLeave(to,from,next){
        this.recoverSurvey();
        next();
    }

  }


</script>

<style scoped>
  #back-div {
    text-align: center;
  }
  .question div {
    text-align: center;
  }
  .describe {
    text-align: center;
  }

  .blue, .red, .green, .black, .pink, .orange, .grey, .gold, .white {
    width: 16px;
    height: 16px;
    opacity: 0.35;
    display: inline-block;
    margin: 0 1.5em 0 .5em;
  }

  .blue {
    background-color: blue;
  }

  .red {
    background-color: red;
  }

  .green {
    background-color: green;
  }

  .black {
    background-color: black;
  }

  .pink {
    background-color: pink;
  }

  .orange {
    background-color: orange;
  }

  .grey {
    background-color: grey;
  }

  .gold {
    background-color: gold;
  }

  .white {
    background-color: white;
  }
</style>
