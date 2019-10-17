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
    <el-button class="titleBox" @click='uploadFile'>Upload</el-button>
    <el-button class="titleBox" @click="downloadFile">
    <el-link :underline="false" href="javascript:;">Download</el-link>
      <!-- <form action="/" method="post" enctype="multipart/form-data">
      <input type="file" name="file" multiple>
      <input type="submit" value="Upload" @click=";">
      </form> -->
    </el-button>
  </el-main>
  <el-footer>a piece of blur code</el-footer>
</el-container>
</template>

<script>
  export default {
    name: 'UploadPage',
    props: {
      msg: String
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

      uploadFile() {
          // this.$http.get(this.apiPath)
          this.$http.post(this.uploadApiPath, this.uploadApiPayload)
      },
    },
    computed:{
      downloadApiPath() {
        return (
          'http://127.0.0.1:3000/public/temp.zip'
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
              path:'C:/Users/t-junzhu/workspace/helloWorld.txt',
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
</style>
