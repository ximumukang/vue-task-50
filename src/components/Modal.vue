<template>
  <div class="modal" v-show="isOpenModal">
    <div class="message-box__wrapper" @click.self="closeModal">
      <div class="message-box">
        <h2 class="message-box__title">提示</h2>
        <p class="message-box__message">{{message}}</p>
        <div class="message-box__btns">
          <router-link to="/" v-if="isToIndex">
            <button class="btn" @click="confirm">确定</button>
          </router-link>
          <button class="btn" @click="confirm" v-else>确定</button>
          <button class="btn" @click="cancelModal" v-show="hasCancel">取消</button>
        </div>
      </div>
    </div>
    <div id="modal-mask"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState,mapMutations,mapActions} from 'vuex'

  export default {
    name: 'Modal',
    data: function () {
      return {}
    },
    computed: {
      ...mapState([
        'isOpenModal',
        'hasCancel',
        'message',
        'isToIndex'
      ])
    },
    methods: {
      ...mapMutations([
        'cancelModal',
        'closeModal'
      ]),
      ...mapActions([
        'confirm'
      ])
    }
  }
</script>

<style scoped>
  .message-box__wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2;
  }

  .message-box__wrapper:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }

  #modal-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 1;
  }

  .message-box {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff;
    width: 280px;
    border-radius: 3px;
    font-size: 16px;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .message-box__title {
    text-indent: 1em;
    background-color: rgb(238, 238, 238);
    line-height: 2em;
    font-size: 20px;
    font-weight: bold;
  }

  .message-box__message {
    line-height: 120px;
    text-align: center;
  }

  .message-box__btns {
    text-align: center;
    padding: 10px;
  }
  .btn {
    width:60px;
  }
  @media only screen and (min-width:798px){
    .message-box{
      width: 400px;
    }
  }
</style>
