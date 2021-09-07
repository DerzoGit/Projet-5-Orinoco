"use strict";

const choosenTeddies = JSON.parse(localStorage.getItem("userBasket"));
console.log(choosenTeddies);

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
            teddyPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR"
            }).format(teddy.price / 100);

            const teddyTotalPrice = clone.querySelector(".teddy-total-price");
            teddyTotalPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR"
            }).format(teddy.price * teddy.quantity / 100);

            basketList.appendChild(clone);
        }

    } catch (error) {
        console.log(error);
    }

}

const totalPrice = () => {
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
    basketTotalPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR"
    }).format(totalPrice);

}
totalPrice();

displayProduct();


const submitForm = document.querySelector(".submit-button");
submitForm.addEventListener("click", (event) => {
    event.preventDefault();

    let firstName = document.querySelector(".form-input-firstname").value;
    let lastName = document.querySelector(".form-input-lastname").value;
    let address = document.querySelector(".form-input-address").value;
    let city = document.querySelector(".form-input-city").value;
    let email = document.querySelector(".form-input-email").value;

    // Vérification regex des champs du formulaire
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}|(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)){1,10}|(([a-zA-ZÀ-ÿ]+))$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

    // Création de products et contact pour créer l'id de l'order
    const products = [];
    console.log(products);
    for (let teddy of choosenTeddies) {
        products.push(teddy.id);
    };
    console.log(products);

    let contact = {
        firstName,
        lastName,
        address,
        city,
        email
    };
    console.log(contact);

    // Validation des champs du formulaire
    if(
        (regexName.test(contact.firstName) == true) &
        (regexName.test(contact.lastName) == true) &
        (regexAddress.test(contact.address) == true) &
        (regexCity.test(contact.city) == true) &
        (regexEmail.test(contact.email) == true)
    ) {

    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            products,
            contact
        }),
    }

    fetch("http://localhost:3000/api/teddies/order", options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            const order = JSON.stringify(response.orderId);
            localStorage.setItem("order", order);
        });
        console.log("1");
    } else {
        alert("Veuillez remplir correctement les champs demandés")
        console.log("2");
    }

});