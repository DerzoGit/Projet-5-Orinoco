"use strict";

const choosenTeddies = JSON.parse(localStorage.getItem("userBasket"));
console.log(choosenTeddies);

const logTeddies = async (element)=> {
    const response = await fetch(`http://localhost:3000/api/teddies/${element}`);
    console.log(response);
    const teddy = await response.json();
    return teddy;
}

choosenTeddies.forEach(logTeddies);

const displayProduct = async () => {

    try {
        let teddy = await logTeddies();
        console.log(teddy);
        const template = document.querySelector("#basketTemplate");
        for (let teddy of choosenTeddies) {
            const basketList = document.querySelector(".basketList");
            const clone = document.importNode(template.content, true);

            const teddyName = clone.querySelector(".teddy-name");
            teddyName.innerHTML = teddy.name;

            const teddyImg = clone.querySelector(".teddy-img");
            teddyImg.src = teddy.imageUrl;

            const teddyPrice = clone.querySelector(".teddy-price");
            teddyPrice.innerHTML = teddy.price / 100 + "€";

            const teddyTotalPrice = clone.querySelector(".teddy-total-price");
            teddyTotalPrice.innerHTML = teddyPrice * 2 + "€";

            basketList.appendChild(clone);
        }

    } catch (error) {
        console.log(error);
    }

}

displayProduct();