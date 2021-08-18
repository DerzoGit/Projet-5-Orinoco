"use strict";

const id = (new URL(document.location)).searchParams.get("id");
console.log(id);

const getProductId = async () => {
    const response = await fetch(`http://localhost:3000/api/teddies/${id}`);
    console.log(response);
    const teddy = await response.json();
    return teddy;
};

const displayProduct = async () => {

    try {
        let teddy = await getProductId();
        console.log(teddy);
        const template = document.querySelector("#teddyProduct");

        const productCard = document.querySelector(".productCard");
        const clone = document.importNode(template.content, true);

        const teddyName = clone.querySelector(".card-title");
        teddyName.innerHTML = teddy.name;

        const teddyImg = clone.querySelector(".card-img-top");
        teddyImg.src = teddy.imageUrl;

        const teddyDescription = clone.querySelector(".teddy-description");
        teddyDescription.innerHTML = teddy.description;

        const teddyPrice = clone.querySelector(".teddy-price");
        teddyPrice.innerHTML = teddy.price / 100 + "€";

        for (let color of teddy.colors) {
            const teddyColors = clone.querySelector(".teddy-color");
            teddyColors.innerHTML += `<option value="${color}">${color}</option>`;
        }

        productCard.appendChild(clone);


    } catch (error) {
        console.log(error);
    }


}

displayProduct();

const addToBasket = document.querySelector("#addToBasket");
console.log(addToBasket);

addToBasket.addEventListener("click", async () => {

    // if (localStorage.getItem("userBasket")) {
    // } else {
    //     let initBasket = [];
    //     localStorage.setItem("userBasket", JSON.stringify(initBasket));
    // };

    // let userBasket = JSON.parse(localStorage.getItem("userBasket"));

    // const products = await getProductId();
    // userBasket.push(products);
    // localStorage.setItem("userBasket", JSON.stringify(userBasket));
    // console.log("product add to basket");

    const basketList = JSON.parse(window.localStorage.getItem("userBasket")) || [];
    const products = `${id}`;
    if(basketList.indexOf(products) > -1){
        console.log("product already added")
    } else if(basketList.indexOf(products) == -1) {
        basketList.push(products);
        window.localStorage.setItem("userBasket", JSON.stringify(basketList));
        console.log("product added to basket");
    }
    // if(basket.indexOf(products) === -1){
    //     basket.push(products);
    //     window.localStorage.setItem("userBasket", JSON.stringify(basket));
    //     console.log("product add to basket");
    // } else if(basket.indexOf(products) != -1){
    //     console.log("product already added");
    // }

});