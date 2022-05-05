import { getData } from "../scripts/Module.js";
import {Cart} from "../scripts/Cart.js";


class Category {
    allCategory = [];

    getAllCategories() {
        var thePromise = getData();
        thePromise.then((reqData) => {
            this.allCategory = JSON.parse(reqData);
            this.allCategory = this.allCategory.filter((cat, index) => {
                return cat.order > 0;
            })
            var categoryList = document.querySelector(".sidebar");
            for (let i = 0; i < this.allCategory.length; i++) {
                var catUl = document.createElement("ul");
                catUl.className = "side-nav"

                let catLi = document.createElement("li");
                catLi.className = "side-nav__item";
                catUl.appendChild(catLi)

                let catLink = document.createElement("a");
                catLink.className = "side-nav__link";
                catLink.innerHTML = this.allCategory[i].name;
                catLi.appendChild(catLink);

                categoryList.appendChild(catUl);
            }
        },
            function (err) {
                console.log(err);
            }
        );
    }
}

window.addEventListener('DOMContentLoaded', () => {
    var cateObj = new Category();
    cateObj.getAllCategories();
});

//products Data

const api_ProductData = 'http://localhost:5000/products';

function truncateString(str, n) {
    if (str.length > n) {
        return str.substring(0, n) + "...";
    } else {
        return str;
    }
}

(function () {
    fetch(api_ProductData).then((response) => response.json()).then((data) => {
        for (let i = 0; i < data.length; i++) {
            var productList = document.createElement('div');
            productList.className = 'products__card'
            productList.innerHTML = `
        <h2 class="products__card-title">
            ${data[i].name}
        </h2>
        
        <div class="products__card-body" >
        <div class="products__card-image">
            <img src="${data[i].imageURL}" alt="${data[i].name}" class="products__card-img">
        </div>
        <div class="products__card-desc">
            <p id="style-3">${truncateString(data[i].description, 120)}</p>
        </div>
        </div>
        <div class="products__card-footer">
            <span class="products__card-price">
            <span>MRP Rs.</span>
            ${data[i].price}
            </span>
            <span>
                <button class="btn buy-now" data-pid="${data[i].id}">
                    Buy Now
                </button>
            </span>
        </div>
        `
            document.querySelector('.products').appendChild(productList);
            var buyNow = document.querySelectorAll('.buy-now');
        }

        buyNow.forEach(el => el.addEventListener('click', event => {
            console.log(event.target.getAttribute("data-pid"));
            let id = event.target.getAttribute("data-pid")
            let productIndex = data.findIndex(p => p.id === id);
            let cart = new Cart();
            let filterProduct = cart.myCart.filter(c => c.id === id);
            if(filterProduct.length > 0){
                cart.updateCart(id, 'INCREMENT')
            }
            else{
                cart.addToCart(data[productIndex]);
            }
            
        }));

    }).catch((err) => {
        console.log("Products not found", err)
    })
})()




