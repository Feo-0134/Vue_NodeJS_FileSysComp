<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Try uploading multiple files at a time.</p>
    <form action="/" method="post" enctype="multipart/form-data">
      <input type="file" name="file" multiple>
      <input type="submit" value="Upload" @click=";">
      <el-button @click='uploadFile'>Biu</el-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UploadPage',
  props: {
    msg: String
  },
  methods: {
    uploadFile() {
      new Promise((resolve, reject) => {
        //this.$http.post(this.apiPath, this.apiPayload)
        this.$http.get(this.apiPath)
        .then((response)=> {
          console.log(response)
        })
        .catch((e)=> {
          console.log(e)
        })
      })
    }
  },
  computed:{
    apiPath() {
      return (
        'http://127.0.0.1:3000/api/main'
      );
    },
    apiPayload() {
      return {
        files:{
          file:{
            path:'C:/Users/t-junzhu/workspace/helloWorld.txt'
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
