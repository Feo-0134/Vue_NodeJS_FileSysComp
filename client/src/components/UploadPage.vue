<template>
  <div class="hello">
    <el-button @click='uploadFile'>Biu</el-button>
    <div @click="downloadFile">
    <a href="javascript:;">Download</a>
    </div>
    <!-- <form action="/" method="post" enctype="multipart/form-data">
      <input type="file" name="file" multiple>
      <input type="submit" value="Upload" @click=";">
    </form> -->
  </div>
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
</style>
