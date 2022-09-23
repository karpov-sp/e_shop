class Param{
    constructor(element){
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.discount = +element.dataset['discount'];
    } 
}

class Order{
    constructor(group1,group2,additional_property){
        this.group1 = new Param(this._select(group1));
        this.group2 = new Param(this._select(group2));
        this.additional_properties = this._getAdditional_properties(additional_property);
    }

    _getAdditional_properties(name){
        let result = [];
        this._selectAll(name).forEach(e => {
            let obj = new Param(el);
            result.push(obj);
        });
        return result;
    }

    _select(name){
        return document.querySelector('input[name=${name}]:checked');
    }

    _selectAll(name){
        return [...document.querySelectorAll('input[name=${name}]:checked')];
    }

    _sumPrice(){
        let result = this.group1.price + this.group2.price;
        this.additional_properties.forEach(el => result += el.price);
        return result;
    }

    _sumDiscount(){
        let result = this.group1.price * this.group1.discount / 100 + 
            this.group2.price * this.group2.discount / 100;
        this.additional_properties.forEach(el => result += el.discount);
        return result;
    }

    showSum(price, discount){
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(discount).textContent = this._sumDiscount();
    }

}