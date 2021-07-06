//manage

//注册
module.exports = (req, res) => {

  //查询邮箱是否被注册
  api.findData('User', {
    email: req.body.email
  }).then(result => {
    // console.log('register find result ==> ', result);

    //如果邮箱没有被注册, 则执行注册
    if (result.length == 0) {
      //创建userId
      let userId = 'u_' + new Date().getTime();

      //加密密码
      let password = utils.encodeString(req.body.password);

      //随机生一个昵称
      let nickName = utils.getRandomElement(config.nickNameOptions);

      //将数据写入到mysql的user表
      api.createData('User', {
        userId,
        email: req.body.email,
        password,
        nickName
      }).then(r1 => {
        res.send({msg: '注册成功', status: 1000, data: r1});
      }).catch(err => {
        console.log('err ==> ', err);
        res.send({msg: '注册失败', status: 1001});
      })

    } else {
      res.send({msg: '邮箱已经被注册', status: 1002});
    }
    
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '注册失败'});
  })

  
}
