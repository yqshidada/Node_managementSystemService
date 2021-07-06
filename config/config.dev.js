//开发环境配置

//服务器基础配置
let serverOptions = {
  //主机
  host: 'http://127.0.0.1',

  //端口
  port: 9000,

  //请求体大小限制
  limitBody: '800kb'
}

exports.serverOptions = serverOptions;


//数据库配置
exports.mysqlOptions = {
  //数据库名称
  database: 'server',
  
  //用户名
  user: 'root',

  //密码
  password: 'zsoft',

  //连接地址, 连接主机
  host: 'localhost',

  //连接数据类型
  dialect: 'mysql',

  //具有多个单词组成的字段名以_分隔, 比如 userId ==> user_id
  underscored: true,

  //时区
  timezone: '+08:00'
}

//加盐配置
exports.saltOptions = {
  //密码
  password: '_pws',

  //token
  token: '_tks'
}

//邮件配置
exports.emailOptions = {
  host: 'smtp.126.com',
  port: 465,
  secure: true,
  user: 'wnyn2021@126.com',
  pass: 'FZGDKEQHCXFKUYQU'
}

//验证有效时间
exports.codeOptions = {
  //单位: minutes
  expires: 5
}

//token配置
exports.tokenOptions = {
  expires: '1d',

  keys: ['rtaad', 'sytdys', 'ahsyt']
}

//昵称配置
exports.nickNameOptions = [
  '白云',
  '青云',
  '老鹰',
  '彩虹'
]

//配置访问静态目录的伪路径
exports.staticBaseUrl = {
  base: '/sdsaafd/files',
  url: `${serverOptions.host}:${serverOptions.port}`
}