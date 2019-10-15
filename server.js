const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Router = require('koa-router');
const cors = require('koa2-cors');
const router = new Router({ prefix: '/api' })
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const os = require('os');
const path = require('path');

// log requests

app.use(logger());

app.use(koaBody({ multipart: true }));

// serve files from ./public
// app.use(serve(path.join(__dirname, '/public')));

// handle uploads
const upload = async function (ctx) {
  const file = ctx.request.body.files.file;
  console.log(file)
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
  reader.pipe(stream);
  console.log('uploading %s -> %s', file.name, stream.path);
}

router.post('/upload', upload)

app.use(router.routes())
   .use(router.allowedMethods())
   .use(cors({
    origin: function (ctx) {
      return "*";
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'accesstoken'],
  }))

// listen

app.listen(3000);
console.log('listening on port 3000');