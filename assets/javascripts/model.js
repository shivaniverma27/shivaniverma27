// function Cart(id,name,brand,cat,price,img) {
// 	this.id = id;
// 	this.name = name;
// 	this.brand = brand;
// 	this.price = price;
// 	this.cat = cat;
// 	this.img = img;
// }

class Cart {
    constructor(id, name, brand, cat, price, img) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.cat = cat;
        this.img = img;
        this.toDelete = false;
    }
}

var object = {
    "cartList": [],
    "addToCart": function(id, name, brand, cat, price, img) {
        var obj = new Cart(id, name, brand, cat, price, img);
        this.cartList.push(obj);
        console.log(this.cartList);
    },

    "deleteProduct": function(p_id) {
        var item = this.cartList.filter(function(obj) {
            return obj.id == p_id;
        });
        item[0].toDelete = true;
        this.cartList = this.cartList.filter(function(obj) {
            return obj.toDelete == false;
        })
    },

    "sortProduct": function() {

    },

    "searchProduct": function() {

    }
}