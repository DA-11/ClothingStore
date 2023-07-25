
let generateShop = function(){

    shop.innerHTML = shopItemsData.map((x)=> {

        let item = JSON.parse(localStorage.getItem("data")) || [];
        let {id, img, itemName, itemDesc, price} = x;
        
        return `
        <div class="item">
                <img src=${img} alt="" class="clothing-article-img">
                
                <div class="clothing-item-name">${itemName}</div>
                <p class="clothing-item-desc">${itemDesc}</p>
                
                <div class="price-item-count">
                    <div class="price">$ ${price}</div>
                    <div class="clothing-item-count">
                        <i onclick="decrement('${id}')" id="clothing-item-decrement">-</i>
                        <div id='${id}'" class="quantity">${item[id] === undefined ? 0 : item[id]}</div>
                        <i onclick="increment('${id}')" id="clothing-item-increment">+</i>
                    </div>
                </div>
               
        </div>
        
        `
    }).join("");
};

let increment = (id) => {
    updateCount(id,true); 
};

let decrement = function(id){
    updateCount(id,false);
};

let updateCount = function(id,flag){

    cartUpdate(id,flag);
    
    //let quantity = Number(document.getElementById(id).innerHTML);
    let quantity = cartItems[id] === undefined ? 0 : cartItems[id];
    let quantityElement = document.getElementById(id);
    let cartCountElement = document.getElementById('cart-count');

    if(flag === true && quantity <= 7){
        quantityElement.innerHTML = Number(quantity);
        cartCountElement.innerHTML = Number(cartItems[sum]);
    } else if(flag === false && quantity >= 0){
        quantityElement.innerHTML = Number(quantity);
        cartCountElement.innerHTML = Number(cartItems[sum]);
    } 
    
    localStorage.setItem("data",JSON.stringify(cartItems));
    
}

let cartUpdate = function(id,flag){
    
    if(flag === 'flag') {
      

        if(cartItems[sum] === undefined){
            cartItems[sum] = 0;
        } 

        document.getElementById('cart-count').innerHTML = cartItems[sum];
    }
    else if(flag === true){
       
        if(cartItems[id] === undefined){
            cartItems[id] = 1;
            cartItems[sum] = cartItems[sum] + 1;
        } else if(cartItems[id] < 7){
            cartItems[id] = cartItems[id] + 1;
            cartItems[sum] = cartItems[sum] + 1;
        }
        
    } else {
        
       
        if(cartItems[id] === undefined) return;

        if(cartItems[id] > 0){
            cartItems[id] =  cartItems[id] - 1;
            cartItems[sum] = cartItems[sum] - 1;
            console.log('here1');
        }
        
        if(cartItems[id] === 0){
           
            delete cartItems[id];
        } 
    } 

}


let shop = document.getElementById('shop');

generateShop();
let cartItems = JSON.parse(localStorage.getItem("data")) || {};
cartUpdate('updating-cart-count','flag');

