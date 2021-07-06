//manage

//根据proId编辑商品数据
module.exports = (req, res) => {
  // console.log('req.body ==> ', req.body);
  //01-没有图片, 没有类型, 只有商品基础数据, 只修改Product模型数据
  //02-没有图片, 没有商品基础数据, 只有商品类型, 只修改ProductType模型数据
  //03-没有商品基础数据, 没有类型, 只有图片, 先上传图片, 在将上传的图片名称写入Product模型

  //保存proId
  let proId = req.body.proId;
  delete req.body.proId;

  //商品类型typeId
  let typeId = req.body.typeId;

  //获取图片信息
  let imgName = ['img', 'detailImg'];
  let imgs = {};
  imgName.forEach(v => {
    if (req.body[v]) {
      imgs[v] = req.body[v];
      imgs[v + 'Type'] = req.body[v + 'Type'];
      delete req.body[v];
      delete req.body[v + 'Type'];
    }
  })

  //判断是否存在图片
  let keys = Object.keys(imgs);
  if (keys.length == 0) {
    //没有图片

    //判断是否存在类型
    if (typeId) {
      //需要修改ProductType模型数据
      delete req.body.typeId;
      
      //判断是否存在商品基础数据
      if (JSON.stringify(req.body) != '{}') {
        //修改商品基础数据
      }

    } else {
      //修改商品基础数据

    }


  } else {
    //存在图片
    //先上传图片, 待上传完毕图片后, 判断是否存在商品类型, 判断是否存在商品基础数据
    
    if (typeId) {
      //需要修改ProductType模型数据
      delete req.body.typeId;

    }

    //判断是否存在商品基础数据
    if (JSON.stringify(req.body) != '{}') {
      //修改商品基础数据
      
    }

  }


  res.send({msg: '编辑商品成功', status: 1230});

}