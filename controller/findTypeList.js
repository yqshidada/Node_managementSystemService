//manage

//查询商品类型列表
module.exports = (req, res) => {
  // console.log('req.query ==> ', req.query);
  // res.send({msg: '查询商品类型列表成功', status: 1060});

  // let sql = "SELECT `t`.`type_id` AS `typeId`, `t`.`name`, `t`.`status`, `t`.`created_at` AS `createdAt`,`t`.`updated_at` AS `updatedAt` FROM `type` AS `t` INNER JOIN `user_type` AS `ut` ON `ut`.`type_id` = `t`.`type_id` AND `ut`.`user_id` = 'u_1614050376032' AND `t`.`remove` = 0 AND `t`.`name` LIKE '%油%' AND `t`.`status` = 0 AND `t`.`created_at` >= '2021-02-23 00:00:00' AND `t`.`created_at` <= '2021-02-23 23:59:59' ORDER BY `t`.`created_at` DESC LIMIT 0, 2";
  
  //sql语句替换参数
  let params = {
    userId: req.userId,
    offset: Number(req.query.offset),
    count: Number(req.query.count)
  };

  let sql = "SELECT `t`.`type_id` AS `typeId`, `t`.`name`, `t`.`status`, `t`.`created_at` AS `createdAt`,`t`.`updated_at` AS `updatedAt` FROM `type` AS `t` INNER JOIN `user_type` AS `ut` ON `ut`.`type_id` = `t`.`type_id` AND `ut`.`user_id` = :userId AND `t`.`remove` = 0";

  //AND `t`.`name` LIKE '%油%' AND `t`.`status` = 0 AND `t`.`created_at` >= '2021-02-23 00:00:00' AND `t`.`created_at` <= '2021-02-23 23:59:59' ORDER BY `t`.`created_at` DESC LIMIT 0, 2

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

  sql += " ORDER BY `t`.`created_at` DESC LIMIT :offset, :count";

  api.queryData(sql, 'SELECT', params).then(result => {
    res.send({msg: '查询商品类型列表成功', status: 1060, data: result});
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '查询商品类型列表失败', status: 1061});
  })

}