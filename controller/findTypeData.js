//manage

//查询商品类型
module.exports = (req, res) => {

  let sql = "SELECT `t`.`type_id` AS `typeId`, `t`.`name`, `t`.`status`, `t`.`created_at` AS `createdAt`, `t`.`updated_at` AS `updatedAt` FROM `type` AS `t` INNER JOIN `user_type` AS `ut` ON `ut`.`type_id` = `t`.`type_id` AND `ut`.`user_id` = :userId AND `t`.`remove` = 0 ORDER BY`t`.`created_at` DESC";

  api.queryData(sql, 'SELECT', {
    userId: req.userId
  }).then(result => {
    res.send({msg: '查询商品类型成功', status: 1140, data: result});
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '查询商品类型失败', status: 1141});
  })

  
}