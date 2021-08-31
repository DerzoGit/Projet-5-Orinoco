"use strict";

const choosenTeddies = JSON.parse(localStorage.getItem("userBasket"));
console.log(choosenTeddies);

// const logTeddies = async (element)=> {
//     const response = await fetch(`http://localhost:3000/api/teddies/${element}`);
//     console.log(response);
//     const teddy = await response.json();
//     return teddy;
// }

// choosenTeddies.forEach(logTeddies);

const displayProduct = async () => {

    
    try {
        const template = document.querySelector("#basketTemplate");
        for (let teddy of choosenTeddies) {
            const basketList = document.querySelector(".basketList");
            const clone = document.importNode(template.content, true);

            const teddyName = clone.querySelector(".teddy-name");
            teddyName.innerHTML = teddy.name;

            const teddyImg = clone.querySelector(".teddy-img");
            teddyImg.src = teddy.img;

            const teddyQuantity = clone.querySelector(".teddy-count");
            teddyQuantity.innerHTML = teddy.quantity;

            const teddyPrice = clone.querySelector(".teddy-price");
            teddyPrice.innerHTML = new Intl.NumberFormat("fr-FR", {style: "currency", currency:"EUR"}).format(teddy.price/100);

            const teddyTotalPrice = clone.querySelector(".teddy-total-price");
            teddyTotalPrice.innerHTML = new Intl.NumberFormat("fr-FR", {style: "currency", currency:"EUR"}).format(teddy.price*teddy.quantity/100);

            basketList.appendChild(clone);
        }

    } catch (error) {
        console.log(error);
    }

}

const totalPrice = async () => {
    const calculPrice = [];
    
    console.log(calculPrice);
    for (let teddy of choosenTeddies) {
        let itemPrice = teddy.price * teddy.quantity;
        calculPrice.push(itemPrice);
    }
    console.log(calculPrice);
    // Récupère le prix total des produits du localStorage 
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = calculPrice.reduce(reducer, 0) / 100;
    console.log(totalPrice);

    // Ajout du prix total au localStorage
    localStorage.setItem("basketPrice", totalPrice);
    
    const basketTotalPrice = document.querySelector(".basket--total-price")
    basketTotalPrice.innerHTML = new Intl.NumberFormat("fr-FR", {style: "currency", currency:"EUR"}).format(totalPrice);

}
totalPrice();

displayProduct();