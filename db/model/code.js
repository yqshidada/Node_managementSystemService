//用户模型

//导入sequelize, 并且解构 DataTypes, Model
const {DataTypes, Model} = require('sequelize');

//创建Code模型并且继承Model基类
class Code extends Model {}

//定义模型字段
Code.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: '表id'
  },

  codeId: {
    type: DataTypes.STRING(30),
    //是否具有唯一性
    unique: true,
    allowNull: false,
    defaultValue: '',
    comment: '验证码id'
  },

  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    defaultValue: '',
    comment: '邮箱'
  },

  code: {
    type: DataTypes.STRING(12),
    allowNull: false,
    defaultValue: '',
    comment: '验证码'
  }

}, {
  //将模型映射到数据库中
  sequelize,

  //定义表名
  tableName: 'code'
})

//Code模型同步到mysql
Code.sync({force: false});

//导出Code模型
module.exports = Code;