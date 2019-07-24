<template>
  <div class="imgUploader" :class="{'imgUploader--hidden': imgList.length >= limitnum  }">
    <el-upload
      ref="upload"
      action=""
      :http-request="httpUpload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload2"
      :on-change="onChange"
      :limit="limitnum"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-button class="imgUploader__btn" v-if="!auto" :type="btntype" @click="okUpload">{{btntext}}</el-button>
  </div>
</template>

<script>
  export default {
    name: "fbsImgUploader",
    props: {
      //文件路径
      fileurl: {
        type: String,
        default: "images"
      },
      //限制上传图片数量
      limitnum: {
        type: Number,
        default: 999
      },
      btntext: {
        type: String,
        default: '确认上传'
      },
      btntype: {
        type:String,
        default: ""
      },
      btnshow: {
        type: Boolean,
        default: false
      },
      auto:{
        type: Boolean,
        default: true
      },
      beforeUpload: {
        type: Function,
        default: function () {
          return true
        }
      }
    },
    data() {
      return {
        dialogImageUrl: "",
        dialogVisible: false,
        imgList: [],
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeUpload2(file){
        console.log(file)
      },
      httpUpload(param){
        // let cb = this.beforeUpload ? this.beforeUpload(this.imgList) : true
        let cb =  this.beforeUpload(this.imgList)
        if(!cb && cb != undefined){
          return
        }
        let fileObj = param.file;
        if(this.auto){
          let storageRef = this.$firebase.storage().ref();
          storageRef.child(this.fileurl + "/" + fileObj.name).put(fileObj).then(res => {
            this.$emit("onsuccess", res.metadata)
          }).catch((err) => {
            this.$emit("onerror", err)
          })
        }
      },
      myUpload(fileUrl = "images", param){
        let fileObj = param.raw;
        console.log(fileObj)
        let storageRef = this.$firebase.storage().ref();
        return new Promise((resolve, reject) => {
          storageRef.child(fileUrl + "/" + param.name).put(fileObj).then(res => {
            resolve(res.metadata)
          }).catch((err) => {
            reject(err)
          });
        })
      },
      onChange(file, fileList){
        this.imgList = fileList
        this.$emit("onchange", {
          file: file,
          fileList: fileList
        })
      },
      okUpload(){
        // this.$emit("before-upload", this.imgList)
        this.beforeUpload(this.imgList)
        if (this.imgList.length <= 0){
          this.$emit("onerror", {
            list: [],
            state: "error",
            message: "The Image is null"
          })
          return;
        }
        Promise.all(
          this.imgList.map(item => this.myUpload(this.fileurl, item))
        ).then((res) => {
          this.$emit("onsuccess", res)
        }).catch((err) => {
          this.$emit("onerror", err)
        })
      }
    }
  }
</script>

<style lang="scss">
  .imgUploader{
    &__btn{
      margin-top: 20px;
    }
    &--hidden{
      .el-upload--picture-card{
        display: none;
      }
    }
  }
</style>
