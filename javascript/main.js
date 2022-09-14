const api = axios.create({
    baseURL: 'http://localhost:1337/api/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
});


function createCategory(element){
    
    const categoryName = element.attributes.name;
    const categoryId = element.id;
    
    const h2CategoryItem = document.createElement('h2');
    h2CategoryItem.innerText = categoryName;
    h2CategoryItem.classList.add('category-item');
    categoriesContainer.appendChild(h2CategoryItem);

    h2CategoryItem.addEventListener('click', ()=>{
        location.hash = `#category=${categoryId}-${categoryName}`;
        categoriesContainer.innerHTML = "";
        categoriesContainer.classList.add('inactive');

    });
}

async function getCategoriesPreview(){
    categoriesContainer.innerHTML = '';
    const { data } = await api('categories/');
    const arrayBucle = data.data;
    arrayBucle.forEach(element => {
        createCategory(element);
    });
    
}

function createProduct(element, container){
    const productId = element.id;
    const productName = element.attributes.title;
    const productColor = element.attributes.color;
    const productSizes = element.attributes.sizes;
    const finalPrice = element.attributes.finalPrice;
    console.log(element)
    
    const productContainer = document.createElement('article');
    productContainer.classList.add('product-container');
    const productImgContainer = document.createElement('div');
    productImgContainer.classList.add('productImg-container');
    const productNameContainer = document.createElement('div');
    productNameContainer.classList.add('productName-container');
    const productDetailsContainer = document.createElement('div');
    productDetailsContainer.classList.add('productDetails-container');
    const productPriceContainer = document.createElement('div');
    productPriceContainer.classList.add('productPrice-container');

    const H3productName = document.createElement('h3');
    const H3productId = document.createElement('h3');
    const H3productColor = document.createElement('h3');
    const H3productSizes = document.createElement('h3');
    const H3finalPrice = document.createElement('h3');

    H3productName.innerText = productName;
    H3productId.innerText =  `ID: ${productId}`;
    H3productColor.innerText = `Color: ${productColor}`;
    H3productSizes.innerText = `Medidas: ${productSizes}`;
    H3finalPrice.innerText = `$${finalPrice}`;

    productNameContainer.appendChild(H3productName);
    productNameContainer.appendChild(H3productId);
    productDetailsContainer.appendChild(H3productColor);
    productDetailsContainer.appendChild(H3productSizes);
    productPriceContainer.appendChild(H3finalPrice);
    
    productContainer.appendChild(productImgContainer);
    productContainer.appendChild(productNameContainer);
    productContainer.appendChild(productDetailsContainer);
    productContainer.appendChild(productPriceContainer);

//    productListBody.appendChild(productContainer);
    container.appendChild(productContainer);



}

async function getProducts(){
    const { data } = await api(`products?populate=categories`);
    const arrayBucle = data.data;
    arrayBucle.forEach(element => {
        createProduct(element, productListBody);
    });
}

async function getProductsByCategory(categoryId){
    const { data } = await api(`categories/${categoryId}?populate=products`);
    const productosByCategory = data.data.attributes.products.data;
    
    productosByCategory.forEach(element => {
        createProduct(element, productListBodyCategory);
    });
}

