const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Router = require('koa-router');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser')
const router = new Router({ prefix: '/api' })
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const os = require('os');
const path = require('path');
const URL = require('url');

// log requests

// app.use(logger());

// app.use(koaBody({ multipart: true }));

// serve files from ./public
// app.use(serve(path.join(__dirname, '/public')));


// handle uploads
const upload = async function (ctx) {
  console.log(ctx.request.body)
  const file = ctx.request.body.files.file;
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(os.tmpdir(), 'uploadfile' + Math.random().toString()));
  reader.pipe(stream);
  console.log('uploading %s -> %s', file.name, stream.path);
}

router.post('/upload', upload)

app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
      }
      return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

// listen

app.listen(3000);
console.log('listening on port 3000');