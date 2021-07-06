//manage

//查询商品类型总数量
module.exports = (req, res) => {
  // let sql = "SELECT COUNT(`t`.`type_id`) AS `count` FROM `type` AS `t` INNER JOIN `user_type` AS `ut` ON `ut`.`type_id` = `t`.`type_id` AND `t`.`remove` = 0 AND `ut`.`user_id` = :userId";

  // api.queryData(sql, 'SELECT', {
  //   userId: req.userId
  // }).then(result => {
  //   res.send({msg: '查询商品类型数量成功', status: 1110, data: result});
  // }).catch(err => {
  //   console.log('err ==> ', err);
  //   res.send({msg: '查询商品类型数量失败', status: 1111});
  // })


  //sql语句替换参数
  let params = {
    userId: req.userId
  };

  let sql = "SELECT COUNT(`t`.`type_id`) AS `count` FROM `type` AS `t` INNER JOIN `user_type` AS `ut` ON `ut`.`type_id` = `t`.`type_id` AND `ut`.`user_id` = :userId AND `t`.`remove` = 0";

  //判断是否存在类型名称查询
  if (req.query.name) {
    sql += " AND `t`.`name` LIKE '%" + req.query.name + "%'";
  }

  //判断是否存在状态
  if (req.query.status) {
    params.status = req.query.status;
    sql += " AND `t`.`status` = :status";
  }

  //判断是否存在日期
  if (req.query.createdAt) {
    params.start = `${req.query.createdAt} 00:00:00`;
    params.end = `${req.query.createdAt} 23:59:59`;

    sql += " AND `t`.`created_at` >= :start AND `t`.`created_at` <= :end";
  }

  api.queryData(sql, 'SELECT', params).then(result => {
    res.send({msg: '查询商品类型数量成功', status: 1110, data: result});
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '查询商品类型数量失败', status: 1111});
  })

}