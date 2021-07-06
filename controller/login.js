//manage

//登录
module.exports = (req, res) => {

  //根据邮箱查询用户信息
  api.findData('User', {
    email: req.body.email
  }, ['userId', 'password']).then(result => {
    // console.log('result ==> ', result);
    //如果用户不存在
    if (result.length == 0) {
      res.send({msg: '邮箱未注册', status: 1032});
    } else {
      //如果用户存在, 则验证密码是否正确
      let password = utils.encodeString(req.body.password);

      if (password == result[0].dataValues.password) {
        //登录成功, 以userId签名一个token
        let token = utils.signToken(result[0].dataValues.userId);
        //将token切片
        let tokens = token.split('.');
        let ts = {

          //干扰项
          rtsraiuu: 'asvDRes6HGslwgcfs6756FCBVNHs98sVB',
          sfds: 'svattrr'
        };
        config.tokenOptions.keys.forEach((v, i) => {
          ts[v] = tokens[i];
        })
        res.send({msg: '登录成功', status: 1030, data: ts});
      } else {
        res.send({msg: '邮箱或者密码不正确', status: 1033});
      }
    }
    
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '登录失败', status: 1031});
  })
}