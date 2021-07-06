//中间件层

//导入请求域白名单
const hostList = require(path.resolve(__basename, 'whiteList/hostList.js'));

//导入验证码白名单
const codeList = require(path.resolve(__basename, 'whiteList/codeList.js'));

//导入token白名单
const tokenList = require(path.resolve(__basename, 'whiteList/tokenList.js'));

//拦截层
module.exports = app => {

  //CORS 跨域资源共享
  //app.all(*)表示所有请求路径必须经过
  app.all('*', (req, res, next) => {

    //动态允许域名请求
    res.header("Access-Control-Allow-Origin", req.headers.origin);

    //*表示允许所有域请求，在实际开发中，一般指定允许某个域请求，如上面设置
    // res.header("Access-Control-Allow-Origin", "*");

    //如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type,token");

    //该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    //该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可
    //部署到公网服务器时, 不能跨域携带cookie的, 此时需要将cookie挂载到请求头里面, 后端通过截取请求头信息获取cookie
    //res.header("Access-Control-Allow-Origin", "*") 不能 和 res.header('Access-Control-Allow-Credentials', true) 一起使用
    //res.header('Access-Control-Allow-Credentials', true);

    next();

  });

  //检测OPTIONS嗅探, 如果不检测OPTIONS请求，则下面的中间件会被执行两次
  app.use((req, res, next) => {
    // console.log('req.method ==> ', req.method);
    if (req.method == 'OPTIONS') {
      res.send(true);
    } else {
      next();
    }
    
  })

  //请求域拦截层
  app.use((req, res, next) => {

    if (hostList.indexOf(req.headers.origin) > -1) {
      //当前请求域存在hostList白名单
      //将请求传递给下一个中间或者路由
      next();

    } else {
      res.send({msg: '请求域不合法', status: 0});
    }

    
  })

  //验证码拦截
  app.use((req, res, next) => {

    let url = req.url.split('?')[0];

    if (codeList.indexOf(url) > -1) {
      //需要验证验证码

      let params = req.body.codeId ? req.body : req.query;

      //截取codeId
      if (!params.codeId) {
        return res.send({msg: '验证码错误', status: 1021});
      }

      //如果存在codeId, 则需要根据获取验证码的邮箱、codeId、验证码的有效时间验证码, code

      //根据codeId查询当前验证码
      api.findData('Code', {
        codeId: params.codeId
      }).then(result => {
        // console.log('result ==> ', result);

        if (result.length == 0) {
          return res.send({msg: '验证码不存在', status: 1024});
        }

        let data = result[0].dataValues;
        if (data.email != params.email) {
          res.send({msg: '发送验证码邮箱错误', status: 1022});
        } else if (data.code != params.validCode) {
          res.send({msg: '验证码错误', status: 1021});
        } else {
          //验证码验证是否在5分钟内有效
          let time = new Date().getTime() - config.codeOptions.expires * 60 * 1000;

          //创建验证码的时间
          let codeTime = new Date(data.createdAt);

          if (codeTime >= time) {
            //验证码有效
            next();
          } else {
            res.send({msg: '验证码失效', status: 1023});
          }
        }
      }).catch(err => {
        console.log('err ==> ', err);
        res.send({msg: '验证码错误', status: 1021});
      })
      
    } else {
      console.log('无需验证验证码, 直接通过');
      next();
    }
    
  })

  //token拦截
  app.use((req, res, next) => {

    let url = req.url.split('?')[0];

    if (tokenList.indexOf(url) > -1) {

      console.log('token拦截');
      
      //截取请求头
      let token = req.headers.token;
      // console.log('token ==> ', token);

      let t = utils.transformCookie(token);
      // console.log('t ==> ', t);

      if (!t) {
        return res.send({msg: '请先登录', status: 1041});
      }

      //获取有效的cookie信息
      let tk = [];
      config.tokenOptions.keys.forEach(v => {
        tk.push(t[v]);
      })

      tk = tk.join('.');

      // console.log('tk ==> ', tk);
    
      //解析token
      utils.verifyToken(tk).then(result => {
        // console.log('result ==> ', result);

        //将userId挂在req, 传递给下一个中间件或者路由
        req.userId = result.data;
        next();
      }).catch(err => {
        console.log('err ==> ', err);
        res.send({msg: '请先登录', status: 1041});
      })
      

    } else {
      console.log('无需验证token, 直接通过');
      next();
    }

    

  })

}