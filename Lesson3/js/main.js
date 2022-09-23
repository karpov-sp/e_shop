const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];  //массив товаров из JSON-документа
        this._getProducts()  // метод для получения каталога из JSON-документа
            .then(data => {  //data - объект JS
                this.goods = data;
                //console.log(data);
                this.render()//вывод товаров на страницу
            });
    }

    _getProducts() {
        return fetch('js/catalogData.json')  //возвращает промис
            .then(result => result.json())  //обработчик после промиса
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML("beforeend",productObj.render());
        }
    }

    getSum() {
        let sum = 0;
        this.goods.forEach(item => {
            sum += product.price;
        })
        alert(sum);
    }  
}

class ProductItem {
    constructor(product,img='img/koala.jpg'){
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
    }

    render(){
           return `<div class="product-item">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class Basket {
    constructor(container = '.cart-block') {
        this.container = container;
        this.goods = [];

        this._clickBasket(); 
        this._getBasketItem()
            .then(data => {
                this.goods = data.contents;
                this.render();
             });
    }

    _getBasketItem() {
        return fetch('js/getBasket.json')
        .then(result => result.json())
        .catch(error => {
             console.log(error);
          })
    }

    render() {
        const block =document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new BasketItem();

            block.insertAdjacentHTML("beforeend", productObj.render(product));
        }
    }

    _clickBasket() {
        document.querySelector(".btn-cart").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }
}
class BasketItem {

    render(product,img='img/koala.jpg') {
        return `<div class="cart-item" data-id="${product.id_product}">
                    <div class="product-bio">
                        <img src="${img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${product.product_name}</p>
                            <p class="product-quantity">Quantity: ${product.quantity}</p>
                            <p class="product-single-price">${product.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price"> Стоимость заказа  ${product.quantity * product.price}</p>
                        <button class="del-btn" data-id="${product.id_product}" title="удалить заказ"> X </button>
                    </div>    
                </div>`
    }
}

let list = new ProductList();
list.getSum();
let basket = new Basket();



// Lesson2
// class ProductList{
//     constructor(container = '.products'){
//         this.container = container;
//         this.goods = [];
//         this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
//         this.render();//вывод товаров на страницу
//     }

//     _fetchProducts(){
//         this.goods = [
//             {id: 1, title: 'Notebook', price: 2000},
//             {id: 2, title: 'Mouse', price: 20},
//             {id: 3, title: 'Keyboard', price: 200},
//             {id: 4, title: 'Gamepad', price: 50},
//         ];
//     }
    
//     render(){
//         const block = document.querySelector(this.container);
//         for(let product of this.goods){
//             const item = new ProductItem(product);
//             block.insertAdjacentHTML("beforeend",item.render());
//         }
//     }

//     getSum(){
//         let sum = 0;
//         this.goods.forEach(item => {
//             sum += item.price;
//         })
//         alert(sum);
//     }
// }

// class ProductItem{
//     constructor(product,img='img/koala.jpg'){
//         this.title = product.title;
//         this.id = product.id;
//         this.price = product.price;
//         this.img = img;
//     }
//     render(){
//            return `<div class="product-item">
//                 <img src="${this.img}">
//                 <h3>${this.title}</h3>
//                 <p>${this.price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
//     }
// }

// let list = new ProductList();
// list.getSum();
 
// class Basket{
//     addGood() {

//     }

//     changeGood() {

//     }
    
//     removeGood() {

//     }

//     renderBasket(){

//     }
// }

// class BasketEl{
//     getBasketElSum(){

//     }

//     renderBasketEl(){

//     }
// }


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