btnCategoriesMain.addEventListener('click', ()=>{
    getCategoriesPreview();
    categoriesContainer.classList.toggle('inactive');
});
backArrow.addEventListener('click', ()=>{
    history.back();
    categoriesContainer.classList.add('inactive');
});
logo.addEventListener('click', ()=>{
    location.hash = '#home'
});


//eventos para los cambios del location
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator(){
    if (location.hash.startsWith('#category=')){
        categoryPage();
    }
    else {
        homePage();
    }
    //sube el scroll al inicio
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage(){
    home.classList.remove('inactive');
    category.classList.add('inactive');

    productListBody.innerHTML = '';

    getProducts();
    getCategoriesPreview();
}

function categoryPage(id){
    home.classList.add('inactive');
    category.classList.remove('inactive');

    const [_, categoryData] = location.hash.split('=');
    [categoryId, categoryName] = categoryData.split('-');
    productListBodyCategory.innerHTML = '';
    categoryTitle.textContent = categoryName;    
    
    getProductsByCategory(categoryId);
}