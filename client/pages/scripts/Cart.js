export class Cart {
    constructor() {
        this.myCart = [];
        this.totalPrice = 0
        this.getCart();
    }

    getProduct(id){
        return this.myCart.filter( p => p.id == id)[0];
    }

    getCart(){
        let myCart = JSON.parse(localStorage.getItem('cartData'));
        if(myCart != null){
            this.myCart = myCart.cart;
            this.totalPrice = myCart.totalPrice;
        }
    }

    addToCart(product) {
        let quantity = 1;
        let productNeedToBeAdded = { ...product, quantity: quantity, totalPrice: quantity * product.price };
        this.myCart = [...this.myCart, productNeedToBeAdded];
        this.calculateTotalPrice();
        this.saveDataToLocalStorage();
        console.log(this.myCart);
    }

    saveDataToLocalStorage(){
        if(window.localStorage){
            // let cartData = JSON.parse(localStorage.getItem('cartData'))
            localStorage.setItem('cartData', JSON.stringify({
                cart: this.myCart,
                totalPrice: this.totalPrice
            }))
        }
    }

    calculateTotalPrice() {
        let total = 0;
        for (const item of this.myCart) {
            total += item.price * item.quantity;
        }
        console.log(total);
        this.totalPrice = total;
    }

    updateCart(id, type){
        let productIndex = this.myCart.findIndex(p => p.id === id);
        let updatedQuantity = this.myCart[productIndex].quantity;
        console.log('this.myCart[productIndex].quantity', productIndex);
        if (type === "INCREMENT") {
            updatedQuantity += 1;
            document.getElementById(id).innerText = updatedQuantity;
            document.getElementById('price_' + id).innerText = `Rs. ${updatedQuantity * this.myCart[productIndex].price}` ;
            console.log("Updated:", updatedQuantity);
        } else {
            updatedQuantity -= 1;
            document.getElementById(id).innerText = updatedQuantity;
            document.getElementById('price_' + id).innerText = `Rs. ${updatedQuantity * this.myCart[productIndex].price}` ;
        }
        if (updatedQuantity === 0) {
            this.myCart = this.myCart.filter(cartItem => cartItem.id !== id);
        } else {
            this.myCart[productIndex] = {
                ...this.myCart[productIndex],
                quantity:  updatedQuantity,
                totalPrice: updatedQuantity * this.myCart[productIndex].price
            }
        }

        this.calculateTotalPrice();
        this.saveDataToLocalStorage();

    }

    updateFinalPrice(){
        let sum = 0;
        if(this.myCart.length > 0){
            for(let i; i < this.myCart.length; i++){
                sum = sum + this.myCart[i].quantity * this.myCart[i].price;
            }
        }
        
    }
}