//模型层

//收编所有模型

//导入User模型
const User = require(path.resolve(__basename, 'db/model/user.js'));

//导入Code模型
const Code = require(path.resolve(__basename, 'db/model/code.js'));

//导入Type模型
const Type = require(path.resolve(__basename, 'db/model/type.js'));

//导入UserType模型
const UserType = require(path.resolve(__basename, 'db/model/userType.js'));

//导入Product模型
const Product = require(path.resolve(__basename, 'db/model/product.js'));

//导入ProductType模型
const ProductType = require(path.resolve(__basename, 'db/model/productType.js'));

//导入UserProduct模型
const UserProduct = require(path.resolve(__basename, 'db/model/userProduct.js'));


//导出所有模型
module.exports = {
  User,
  Code,
  Type,
  UserType,
  Product,
  ProductType,
  UserProduct
};