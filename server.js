const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Router = require('koa-router');
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

const main = ctx => {
  ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); 
  ctx.response.body = 'Hello World';
};

const upload = async function (ctx, next) {
  // ignore non-POSTs
  if ('POST' != ctx.method) return await next();

  const file = ctx.request.files.file;
  console.log(file)
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
  reader.pipe(stream);
  console.log('uploading %s -> %s', file.name, stream.path);
}
router.get('/main', main)
router.post('/upload', upload)

app.use(router.routes())
   .use(router.allowedMethods())

// listen

app.listen(3000);
console.log('listening on port 3000');