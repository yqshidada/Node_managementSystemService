//用户和商品类型的关系模型

//导入sequelize, 并且解构 DataTypes, Model
const {DataTypes, Model} = require('sequelize');

//创建ProductType模型并且继承Model基类
class ProductType extends Model {}

//定义模型字段
ProductType.init({
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

  proId: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: '',
    comment: '商品id'
  },


}, {
  //将模型映射到数据库中
  sequelize,

  //定义表名
  tableName: 'product_type'
})

//Type模型同步到mysql
ProductType.sync({force: false});

//导出Type模型
module.exports = ProductType;