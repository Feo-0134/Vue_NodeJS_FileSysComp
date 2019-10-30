<template>
<el-container class="hello">
  <el-header class="appTitle">
  <div class="titleBox Box1">
    <img class="iconImg" alt="Vue logo" src="../assets/logo.png">
  </div>
  <div class="titleBox">
    <p>{{ msg }}</p>
  </div>
  </el-header>
  <el-main class = "mainContent">
    <!-- <el-button class="titleBox" @click=';'>Upload</el-button> -->
    <el-button class="titleBox" @click="downloadFile">
    <el-link :underline="false" href="javascript:;">Download</el-link>
    </el-button>
    <!-- <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/> -->
    <el-upload
      class="upload-demo"
      action="http://127.0.0.1:3000/api/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button class="titleBox">Upload</el-button>
      <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
  </el-main>
  <el-footer>a piece of blur code</el-footer>
</el-container>
</template>

<script>
  export default {
    name: 'UploadPage',
    props: {
      msg: String,
      file:"",
      message:"",
      fileList: []
    },
    data(){
      return {
        currentDate: new Date()
      }
    },
    methods: {
      // templateFunc() {
      //   this.$http.get(this.downloadApiPath)
      //   .then((response)=> {
      //     console.log(response)
      //   })
      //   .catch((error)=>{
      //       console.log(error)
      //   })
      // },
      downloadFile() {
        window.location.href = this.downloadApiPath
      },
      update(e){
        let file = e.target.files[0];
        let param = new FormData(); 
        param.append('file',file);
        console.log(param.get('file'));
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; //添加请求头
        this.$http.post('http://127.0.0.1:3000/api/upload',param,config)
          .then(response=>{
            console.log(response.data);
          })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },
    computed:{
      downloadApiPath() {
        return (
          'http://127.0.0.1:3000/public/template.xlsx'
        );
      },
      uploadApiPath() {
        return (
          'http://127.0.0.1:3000/api/upload'
        );
      },
      uploadApiPayload() {
        return {
          files:{
            file:{
              path:this.$refs.file.files[0].path,
              name:'helloWorld.txt'
            }
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .marginTop60 {
    margin-top: 60px;
  }
  .mainContent {
    min-height: 350px;
    margin-top: 100px;
  }
  h3 {
    margin: 40px 0 0;
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
  .appTitle {
    text-align: left !important;
  }
  .iconImg {
    height: 50px;
    width: 50px !important;
  }
  .titleBox {
    height: 50px;
    display: inline-block;
    width: 200px;
    margin: 10px;
  }
  .Box1 {
    width: 70px !important;
  }
    .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
