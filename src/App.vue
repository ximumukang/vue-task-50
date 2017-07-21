<template>
  <div>
    <header>
      <h1 id="first-h1">问卷系统</h1>
      <h1 id="second-h1"><router-link to="/">我的问卷</router-link></h1>
    </header>
    <main>
      <div id="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>

<style>
  @import './assets/Font-Awesome-3.2.1/css/font-awesome.min.css';

  *{
    margin: 0;
    padding: 0;
    font: 16px/1.5em Microsoft YaHei,Tahoma,Helvetica,Arial,\\5B8B\4F53,sans-serif;
    color: rgb(85, 85, 85);
  }
  li{
     list-style: none;
   }
  p{
    font-size: 14px;
  }
  table *{
    font-size: 16px;
  }

  a{
    list-style: none;
    color: white;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
  }

  button{
    cursor: pointer;
  }
  button:hover{
    background: #ee7419;
    color: white;
  }
  button a{
    color: rgb(85, 85, 85);
  }
  body{
    background: #dadada;
    position: relative;
    z-index: 1;
  }
  header{
    height: 50px;
    background: #ee7419;
    margin: 0 auto;
  }
  header h1{
    color: white;
    float: left;
    margin-left: 12.5% ;
    font-size: 18px;
    line-height: 50px;
    text-shadow: 0 -.05em .05em rgba(0,0,0,.5);

  }
  #first-1h1{
    padding-left: -16px;
  }
  #first-h1:before{
    content: "  ?  ";
    background: white;
    color: #ee7419;
    border-radius:9px;
    width: 18px;
    height: 18px;
  }
  #second-h1{
    margin-left: 5%;
    padding: 0 10px;
    cursor: pointer;

  }
  #second-h1:hover{
    background: #ee7419 linear-gradient(transparent,hsla(0,0%,100%,.1));
  }
  #second-h1 a{
    display: inline-block;
    font-size: 18px;
    color: white;
    height: 100%;
  }
  #container{
    width:90%;
    min-height: 300px;
    margin: 25px auto;
    padding: 1em 1em 2.5em;
    border-radius: .2em;
    box-shadow: 0 .05em .25em rgba(0,0,0,.5);
    font-size: 16px;
    background: #fff;
    position: relative;
  }
  /* and 与 （ 间必须要一个空格 */
  @media only screen and (min-width:798px){
    #container {
      width: 75%;
      margin: 50px auto;
    }
  }

  hr{
    margin-bottom: 30px;
  }
  #container h1{
    text-align: center;
    font-size: 20px;
    margin: 20px auto;
    min-height: 1.5em;
  }
  #question-list{
    width: 90%;
    min-height: 1px;
    margin: 0 auto;
    line-height: 1.5em;
    padding-bottom:1.5em ;
  }
  #question-list .question{
    padding: .5em;
  }
  #question-list .question h3 {
    font-size: 18px;
    line-height: 2em;
  }
  #container h1:hover,
  #question-list .question:hover {
    background: rgb(254, 241, 232);
  }
  #question-list .question:hover>h3{
    font-weight: 600;
  }
  /* i元素会继承text-indent 所以只需要1em */
  #question-list  p{
    text-indent: 1em;
  }
  textarea{
    margin-left: 2em;
    width: 90%;
  }

  .btn {
    display: inline-block;
    color: black;
    width: 90px;
    height: 34px;
    border-radius: 5px;
    border: 1px solid gainsboro;
    background: white;
    overflow: hidden;
  }
  .btn:hover {
    color: white;
    background: #ee7419;
  }
  a.btn {
    line-height: 34px;
  }
  /*清除浮动*/
  .clearfix:after {
    content: '';
    display: block;
    clear: both;
    width: 0;
    height: 0;
    visibility: hidden;
  }
</style>
