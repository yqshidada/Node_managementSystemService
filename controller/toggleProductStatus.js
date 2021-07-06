//manage

//切换商品状态
module.exports = (req, res) => {

  //根据userId和proId查询商品是否存在
  api.findData('UserProduct', {
    userId: req.userId,
    proId: req.body.proId
  }).then(r => {
    // console.log('r ==> ', r);
    if (r.length > 0) {

      //根据proId修改status
      api.updateData('Product', {
        status: req.body.status
      }, {
        proId: req.body.proId
      }).then(result => {
        res.send({
          msg: '切换商品状态成功', status: 1200, data: {
            result,
            status: req.body.status
          }
        });
      }).catch(err => {
        console.log('err ==> ', err);
        res.send({ msg: '切换商品状态失败', status: 1201 });
      })

    } else {
      res.send({ msg: '切换商品状态失败', status: 1201 });
    }
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({ msg: '切换商品状态失败', status: 1201 });
  })



}