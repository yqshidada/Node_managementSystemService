//manage

const api = require("../service/api");

//发送验证码
module.exports = (req, res) => {

  //随机验证码
  let code = utils.createValidCode(6);

  //生成验证码id
  let codeId = 'c_' + new Date().getTime();

  //先保存验证码到数据库, 再发邮件
  api.createData('Code', {
    codeId, 
    email: req.body.email, 
    code
  }).then(result => {
    // console.log('result ==> ', result);
    res.send({msg: '发送验证码成功', status: 1010, data: {codeId: result.dataValues.codeId}});

    return;
    //开发测试屏蔽发邮件
    utils.sendEmail({
      //发件者地址
      from: config.emailOptions.user,
      //接收邮件地址
      to: req.body.email,
  
      //邮件主题
      subject: '后台管理系统',
  
      //邮件内容
      text: `验证码为：${code}, ${config.codeOptions.expires}分钟内有效`
    }).then(() => {
      res.send({msg: '发送验证码成功', status: 1010, data: {codeId: result.dataValues.codeId}});
    }).catch(err => {
      console.log('err ==> ', err);
      res.send({msg: '发送验证码失败', status: 1011});
    })

  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '发送验证码失败', status: 1011});
  })

}