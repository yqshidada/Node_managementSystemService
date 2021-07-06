//控制器层

//收编所有控制器
const register = require(path.resolve(__basename, 'controller/register.js'));
const sendValidCode = require(path.resolve(__basename, 'controller/sendValidCode.js'));
const login = require(path.resolve(__basename, 'controller/login.js'));
const createType = require(path.resolve(__basename, 'controller/createType.js'));
const findTypeList = require(path.resolve(__basename, 'controller/findTypeList.js'));
const toggleTypeStatus = require(path.resolve(__basename, 'controller/toggleTypeStatus.js'));
const findTypeByTypeId = require(path.resolve(__basename, 'controller/findTypeByTypeId.js'));
const editType = require(path.resolve(__basename, 'controller/editType.js'));
const removeType = require(path.resolve(__basename, 'controller/removeType.js'));
const findTypeCount = require(path.resolve(__basename, 'controller/findTypeCount.js'));
const findUserInfo = require(path.resolve(__basename, 'controller/findUserInfo.js'));
const postProduct = require(path.resolve(__basename, 'controller/postProduct.js'));
const findTypeData = require(path.resolve(__basename, 'controller/findTypeData.js'));
const findProductList = require(path.resolve(__basename, 'controller/findProductList.js'));
const findProductCount = require(path.resolve(__basename, 'controller/findProductCount.js'));
const toggleProductStatus = require(path.resolve(__basename, 'controller/toggleProductStatus.js'));
const removeProduct = require(path.resolve(__basename, 'controller/removeProduct.js'));
const findProductByProId = require(path.resolve(__basename, 'controller/findProductByProId.js'));
const editProduct = require(path.resolve(__basename, 'controller/editProduct.js'));

module.exports = {
  //注册
  register,

  //发送验证码
  sendValidCode,

  //登录
  login,

  //创建商品类型
  createType,

  //查询商品类型列表
  findTypeList,

  //切换商品类型状态
  toggleTypeStatus,

  //根据typeId查询商品类型数据
  findTypeByTypeId,

  //根据typeId编辑商品类型数据
  editType,

  //移除商品类型
  removeType,

  //查询商品类型总数量
  findTypeCount,

  //查询用户信息
  findUserInfo,

  //发布商品
  postProduct,

  //查询商品类型
  findTypeData,

  //查询商品列表
  findProductList,

  //查询商品总数量
  findProductCount,

  //切换商品状态
  toggleProductStatus,

  //删除商品
  removeProduct,

  //根据proeId查询商品数据
  findProductByProId,

  //根据proId编辑商品数据
  editProduct
}