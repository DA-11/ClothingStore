let generateCartPage = function () {
    let billAmount = calBillAmount();

    if (cartItems[sum] === 0) {
        cartInfoLabel.innerHTML = ``;
        cartItemsInfo.innerHTML = ``;

        cartInfoLabel.innerHTML = `
        <div>CART EMPTY</div>
        <a href="index.html">
            <button class="btn">Back to Shop</button>
        </a>
        `;
    } else {
        cartInfoLabel.innerHTML = `
        <div>Bill Amount:$ ${billAmount}</div>
        <div class="checkoutAndClearCart">
            <button class="checkOut btn">Checkout</button>
            <button onclick="removeAllItemsFromBag()" class="clearCart btn">Clear Cart</button>
        </div>
        `

        cartItemsInfo.innerHTML = generateCheckOutItems();
    }
}

let calBillAmount = function () {
    if (cartItems[sum] === 0) {
        return 0;
    }

    let ans = 0;

    for (const key in cartItems) {
        if (key !== "total") {
            let item = shopItemsData.find((x) => x.id === key);
            ans += Number(item.price) * cartItems[key];
        }
    }

    return ans;

}

let generateCheckOutItems = function () {

    let html = ``;

    for (const key in cartItems) {
        if (key !== "total") {
            let item = shopItemsData.find((x) => x.id === key);
            let quantity = cartItems[key];
            let itemTotal = calItemTotal(key);
            html += `
            
            <div class="itemInBag">
                <div class="checkout-img">
                    <img src="${item.img}" class="checkout-item-img" >
                </div>
                <div class="checkout-info">
                    
                    <div class="checkout-item-name-price">
                        <div class="checkout-itemname">${item.itemName}</div>
                        <div onclick="removeItemFromBag('${key}')" class="checkout-item-remove">X</div>
                    </div>
                    <div class="checkout-item-desc">
                        ${item.itemDesc}
                    </div>
                    <div class="clothing-item-count">
                        <i onclick="decrement('${key}')" id="clothing-item-decrement">-</i>
                        <div id='${key}'" class="quantity">${quantity}</div>
                        <i onclick="increment('${key}')" id="clothing-item-increment">+</i>
                    </div>
                    
                    <div class="checkout-item-price-and-total">
                        <div>$ ${item.price}</div>
                        <div class="checkout-item-total">Total: $ ${itemTotal}</div>    
                    </div>

                </div>
            </div>
           
            `

        }
    }

    return html;
}

let calItemTotal = function(id){
    
    let item = shopItemsData.find((x) => x.id === id);   
    return item.price * cartItems[id];
    
}

let increment = (id) => {
    updateCount(id,true); 
    generateCartPage();
};

let decrement = function(id){
    updateCount(id,false);
    generateCartPage();
};

let updateCount = function(id,flag){

    cartUpdate(id,flag);

    //let quantity = Number(document.getElementById(id).innerHTML);
    
    let quantityElement = document.getElementById(id);
    let cartCountElement = document.getElementById('cart-count');
    
    let quantity = cartItems[id] === undefined ? 0 : cartItems[id];
    if(quantity === 0){
        generateCartPage();
        localStorage.setItem("data",JSON.stringify(cartItems));
        cartCountElement.innerHTML = Number(cartItems[sum]);
        return;
    }

    if(flag === true && quantity <= 7){
        quantityElement.innerHTML = Number(quantity);
        cartCountElement.innerHTML = Number(cartItems[sum]);
    } else if(flag === false && quantity >= 0){
        quantityElement.innerHTML = Number(quantity);
        cartCountElement.innerHTML = Number(cartItems[sum]);
    } 
    
    localStorage.setItem("data",JSON.stringify(cartItems));
    
}

let cartUpdate = function (id, flag) {

    if (flag === 'flag') {


        if (cartItems[sum] === undefined) {
            cartItems[sum] = 0;
        }

        document.getElementById('cart-count').innerHTML = cartItems[sum];
    }
    else if (flag === true) {

        if (cartItems[id] === undefined) {
            cartItems[id] = 1;
            cartItems[sum] = cartItems[sum] + 1;
        } else if (cartItems[id] < 7) {
            cartItems[id] = cartItems[id] + 1;
            cartItems[sum] = cartItems[sum] + 1;
        }

    } else {
        console.log("entering");
        if (cartItems[id] === undefined){ 
            console.log("returned")    
            return;
        }

        if (cartItems[id] > 0) {
            cartItems[id] = cartItems[id] - 1;
            cartItems[sum] = cartItems[sum] - 1;

            if (cartItems[id] === 0) {
                delete cartItems[id];
            }

        } else if (cartItems[id] === 0) {
            delete cartItems[id];

        }
    }

}

let removeAllItemsFromBag = function(){
    for(const key in cartItems){
        if(key !== "total") removeItemFromBag(key);
    }
}

let removeItemFromBag = function(id){
    cartItems[sum] = cartItems[sum] - cartItems[id];
    cartItems[id] = 0;
    updateCount(id,false);
}


let cartInfoLabel = document.getElementById('cart-info-label');
let cartItemsInfo = document.getElementById('bag');

let cartItems = JSON.parse(localStorage.getItem("data")) || {};
cartUpdate('updating-cart-count', 'flag');
generateCartPage();