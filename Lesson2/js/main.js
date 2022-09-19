class ProductList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this.render();//вывод товаров на страницу
        //this.allProducts = [];
    }

    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend",item.render());
//              block.innerHTML += item.render();
        }
    }

    getSum(){
        let sum = 0;
        this.goods.forEach(item => {
            sum += item.price;
        })
        alert(sum);
    }
}

class ProductItem{
    constructor(product,img='img/koala.jpg'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
           return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductList();
list.getSum();
 
class Basket{
    addGood() {

    }

    changeGood() {

    }
    
    removeGood() {

    }

    renderBasket(){

    }
}

class BasketEl{
    getBasketElSum(){

    }

    renderBasketEl(){

    }
}


//lesson1 
// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50},
// ];

// //Функция для формирования верстки каждого товара
// const renderProduct = (product,img='img/koala.jpg') => {
//     return `<div class="product-item">
//                 <img src="${img}">
//                 <h3>${product.title}</h3>
//                 <p>${product.price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };

// const renderPage = list => {
//     const productsList = list.map(product => renderProduct(product));
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList.join("");
// };

// renderPage(products);