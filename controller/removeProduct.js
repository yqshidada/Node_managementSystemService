//manage

const { Op } = require("sequelize");

//移除商品(假删除, 逻辑删除【更新某个字段来标记】)
module.exports = (req, res) => {
  api.updateData('Product', {
    remove: 1
  }, {
    proId: {
      [Op.in]: req.body.proIds
    }
  }).then(result => {
    res.send({msg: '删除商品成功', status: 1210, data: result});
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '删除商品失败', status: 1211});
  })
}