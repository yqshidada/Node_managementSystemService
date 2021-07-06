//manage

const { Op } = require("sequelize");

//移除商品类型(假删除, 逻辑删除【更新某个字段来标记】)
module.exports = (req, res) => {
  api.updateData('Type', {
    remove: 1
  }, {
    typeId: {
      [Op.in]: req.body.typeIds
    }
  }).then(result => {
    res.send({msg: '删除商品类型成功', status: 1100, data: result});
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '删除商品类型失败', status: 1101});
  })
}