const Product = require("./schemas/product");
const fs = require("fs");

function add(data, img){
    const { name, price, gender } = data;
    const { name: imgName, data: imgData } = img.img;
    return new Promise((resolve, reject)=>{
      fs.appendFile('./public/uploads/' + imgName, imgData, async ()=>{
        try{
          const imagePath = "/uploads/" + imgName
          const product = new Product({name, price: Number(price), gender, imagePath})
          await product.save();
          resolve('Product added')
        }catch(err){
          reject(err.message)
      }
      })
    })
}

async function getAll() {
  return await Product.find();
}

async function getSingle(name) {
  return await Product.findOne({ name });
}

module.exports = {
  add,
  getAll,
  getSingle,
};
