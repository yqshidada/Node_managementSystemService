//manage

//查询用户信息
module.exports = (req, res) => {
  api.findData('User', {
    userId: req.userId
  }, ['nickName', 'avatar', 'email', 'sex', 'createdAt', 'updatedAt']).then(result => {
    res.send({msg: '查询用户信息成功', status: 1120, data: result, staticUrl: `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/userImgs/`});
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '查询用户信息失败', status: 1121});
  })
}