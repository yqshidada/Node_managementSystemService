//商品类型模型

//导入sequelize, 并且解构 DataTypes, Model
const {DataTypes, Model} = require('sequelize');

//创建Type模型并且继承Model基类
class Type extends Model {}

//定义模型字段
Type.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false, 
    primaryKey: true,
    autoIncrement: true,
    comment: '表id'
  },

  typeId: {
    type: DataTypes.STRING(30),
    //是否具有唯一性
    unique: true,
    allowNull: false,
    defaultValue: '',
    comment: '类型id'
  },

  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
    defaultValue: '',
    comment: '类型名称'
  },

  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '类型状态0正常1冻结'
  },

  remove: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否删除类型0正常1删除'
  }

}, {
  //将模型映射到数据库中
  sequelize,

  //定义表名
  tableName: 'type'
})

//Type模型同步到mysql
Type.sync({force: false});

//导出Type模型
module.exports = Type;