//manage

//根据proeId查询商品数据
module.exports = (req, res) => {
  let sql = "SELECT `p`.`pro_id` AS `proId`, `p`.`name`, `p`.`enname`, `p`.`price`, `p`.`img`, `p`.`detail_img` AS `detailImg`, `p`.`status`, `p`.`desc`, `pt`.`type_id` AS `typeId` FROM `product` AS `p` INNER JOIN `product_type` AS `pt` ON `p`.`pro_id` = `pt`.`pro_id` INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id` INNER JOIN `user_product` AS `up` ON `up`.`pro_id` = `p`.`pro_id` AND `p`.`remove` = 0 AND `t`.`remove` = 0 AND `up`.`user_id` = :userId AND `p`.`pro_id` = :proId";

  api.queryData(sql, 'SELECT', {
    userId: req.userId,
    proId: req.query.proId
  }).then(result => {
    res.send({msg: '查询商品成功', status: 1220, data: result, staticUrl: `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/proImgs/`});
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '查询商品失败', status: 1221});
  })

}