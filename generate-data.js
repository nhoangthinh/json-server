const faker = require('faker')
const fs = require('fs')

faker.locale = 'vi'


const randomCategoryList = (n) => {
  if(n<1) return []
  const categoryList = []
  for(var i = 0;i<n;i++){
    const category = {
      id: faker.random.alphaNumeric(9),
      name: faker.random.alpha(30),
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    categoryList.push(category)
  }
  return categoryList;
}

const randomProductList = (categories,n) => {
  if(n<1) return []
  const productList = []
  for(var i = 0;i<n;i++){
    const product = {
      id: faker.random.alpha(9),
      categoryId: categories[i%5].id,
      name: faker.commerce.productName(),
      price: Number.parseFloat(faker.commerce.price()),
      color: faker.commerce.color(),
      description: faker.commerce.productDescription(),
      image: faker.image.imageUrl(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    productList.push(product)
  }
  return productList;
}

(() => {
  // prepare db object
  const categories = randomCategoryList(5)
  const products = randomProductList(categories,15)
  const db = {
    categories: categories,
    products: products,
    profile:{
      name: "Po"
    }
  };
  // write db object to db.json
  fs.writeFile("db.json", JSON.stringify(db),()=>{
    console.log('Generate data successfully!')
  })
})()