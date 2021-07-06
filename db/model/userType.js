//用户和商品类型的关系模型

//导入sequelize, 并且解构 DataTypes, Model
const {DataTypes, Model} = require('sequelize');

//创建UserType模型并且继承Model基类
class UserType extends Model {}

//定义模型字段
UserType.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: '表id'
  },

  typeId: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: '',
    comment: '类型id'
  },

  userId: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: '',
    comment: '用户id'
  },


}, {
  //将模型映射到数据库中
  sequelize,

  //定义表名
  tableName: 'user_type'
})

//Type模型同步到mysql
UserType.sync({force: false});

//导出Type模型
module.exports = UserType;