//manage

//创建商品类型
module.exports = (req, res) => {
  //创建商品类型id
  let typeId = 't_' + new Date().getTime();
  //启动事务处理
  api.transactionData(async t => {

    //创建商品类型基础数据
    await api.createData('Type', {
      typeId,
      name: req.body.name,
      status: Number(req.body.status)
    }, t)

    //创建商品类型和用户关系
    await api.createData('UserType', {
      userId: req.userId,
      typeId
    }, t)

  }).then(() => {
    res.send({msg: '创建类型成功', status: 1050});
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '创建类型失败', status: 1051});
  })
}