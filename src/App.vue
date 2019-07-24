<template>
  <div id="app">
    <img src="./assets/logo.png">
      <fbs-img-uploader :limitnum="limitnum" :fileurl="fileurl" @onchange="changeFun" @onsuccess="successFun" @onerror="errorFun" :before-upload="beforeUpload"></fbs-img-uploader>
  </div>
</template>

<script>
  import FbsImgUploader from "./fbstorage-img-uploader";
  export default {
    name: 'app',
    components: {FbsImgUploader},
    data () {
      return {
        fileurl: "img",
        limitnum: 2
      }
    },
    methods: {
      changeFun(params){
        console.log(params)
      },
      successFun(res){
        console.log(res)
      },
      errorFun(err){
        console.log(err)

      },
      beforeUpload(param){
        console.log('上传前',param)
        // return false
      }
    }

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
