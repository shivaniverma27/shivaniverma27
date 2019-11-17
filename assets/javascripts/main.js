window.addEventListener("load", initEvent);
var cartCount;
var products;

function initEvent() {
    showProducts();
    cartCount = document.querySelector("#cartCount");
    document.querySelector("#save").addEventListener("click", saveProducts);
    document.querySelector("#search").addEventListener("keyup", searchProduct);
    loadProducts();
}

function saveProducts() {
    if (window.localStorage) {
        var json = JSON.stringify(object.cartList);
        localStorage.setItem("data", json);
    } else {
        alert("Localstorage is not supported...");
    }
}

function loadProducts() {
    if (window.localStorage) {
        if (localStorage.data) {
            var data = localStorage.getItem("data");
            object.cartList = JSON.parse(data);
            showCart();
            showCartCount();
        }
    }
}

function searchProduct() {
    var value = event.srcElement.value;
    var ul = document.querySelector("#searchItem");
    ul.innerHTML = "";
    if (value.length > 2) {
        for (var i = 0; i < products.length; i++) {
            if (products[i].p_name.includes(value) || products[i].p_brand.includes(value) || products[i].p_category.includes(value)) {
                // console.log(products[i].p_name);
                var li = document.createElement("li");
                li.innerHTML = products[i].p_name;
                ul.appendChild(li);
                li.addEventListener("click", showProductDetail);
            }
        }
    }
}

function showProductDetail() {

}

function showProducts() {
    var parent_div = document.querySelector("#products_list");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            products = this.responseText;
            products = JSON.parse(products);
            products.products.forEach(function(obj) {
                var childDiv = document.createElement("div");
                childDiv.className = "col-md-3 product";
                var img = document.createElement("img");
                img.src = obj.p_img;
                img.className = 'w-100';
                var title = document.createElement("h5");
                title.innerHTML = obj.p_name;
                var price = document.createElement("span");
                price.innerHTML = obj.p_price + " Rs";
                var btn = document.createElement("button");
                btn.innerHTML = "Add to Cart";
                btn.className = "btn btn-primary d-block w-100";
                btn.title = obj.p_id;

                childDiv.appendChild(img);
                childDiv.appendChild(title);
                childDiv.appendChild(price);
                childDiv.appendChild(btn);
                btn.addEventListener("click", addItem);

                parent_div.appendChild(childDiv);
            })
        }
    }
    xhttp.open('get', 'https://raw.githubusercontent.com/ravi4all/UI_WE_Aug2_19/master/products.json');
    xhttp.send();
}

function addItem() {
    var p_id = event.srcElement.title;
    products.products.forEach(function(x) {
        if (x.p_id == p_id) {
            object.addToCart(x.p_id, x.p_name, x.p_brand, x.p_category, x.p_price, x.p_img);
        }
    })
    showCart();
    showCartCount();
}

function showCartCount() {
    var len = object.cartList.length;
    cartCount.innerHTML = len;
}

function showCart() {
    var ul = document.querySelector("#cartList");
    ul.innerHTML = "";
    object.cartList.forEach(function(obj) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = obj.img;
        var title = document.createElement("h5");
        title.innerHTML = obj.name;
        var price = document.createElement("span");
        price.innerHTML = obj.price + " Rs";
        var btn = document.createElement("button");
        btn.innerHTML = "Delete";
        btn.className = "btn btn-primary";
        btn.title = obj.id;

        li.appendChild(img);
        li.appendChild(title);
        li.appendChild(price);
        li.appendChild(btn);
        btn.addEventListener("click", deleteItem);

        ul.appendChild(li);
    })
}

function deleteItem() {
    var p_id = event.srcElement.title;
    object.cartList.forEach(function(x) {
        if (x.id == p_id) {
            object.deleteProduct(x.id);
        }
    });
    showCart();
    showCartCount();
}