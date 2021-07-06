//服务层
//API层
//操作mysql

const { QueryTypes } = require('sequelize');

class API {

  //插入数据
  createData(modelName, values, t) {
    //modelName: 模型名称, string
    //values: 插入数据, object
    //t: 事务处理对象, object
    if (t) {
      //参与事务处理
      return model[modelName].create(values, {transaction: t});
    }

    return model[modelName].create(values);
  }

  //查询数据
  findData(modelName, condition, attributes) {
    //modelName: 模型名称, string
    //condition: 查询条件, object
    //attributes: 查询字段, array, 当不传递attributes, 则默认查询所有字段
    return model[modelName].findAll({
      where: condition,
      attributes
    });
  }

  //更新数据(假删除，逻辑删除)
  updateData(modelName, values, condition) {
    //modelName: 模型名称, string
    //values: 修改的数据, object
    //condition: 查询条件, object
    return model[modelName].update(values, {
      where: condition
    });
  }

  //事务处理
  transactionData(fn) {
    //fn: 函数
    return sequelize.transaction(fn);
  }

  //原始查询
  queryData(sql, type, replacements) {
    //sql: sql语句, string
    //type: sql操作类型, string
    //replacements: sql替换值, object
    return sequelize.query(sql, {
      //sql操作方式(增删改查)
      type: QueryTypes[type],

      //sql语句替换值
      replacements
    })
  }

}

module.exports = new API();