const Product = require("./schemas/product");

//prettier-ignore
async function add(data, img){
    const { name, price, gender } = data;
    const { data: imgData } = img.img;
    try{
        const product = new Product({name, price: Number(price), gender, image: imgData})
        await product.save();
        return 'Product added'
    }catch(err){
        return err.message;
    }
}

async function get() {
  const products = await Product.find();
  return products;
}

module.exports = {
  add,
  get,
};
