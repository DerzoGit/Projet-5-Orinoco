"use strict";

const id = (new URL(document.location)).searchParams.get("id");

const getProduct = async () => {
    const response = await fetch(`http://localhost:3000/api/teddies/${id}`);
    const teddy = await response.json();
    // console.log(teddy);
    return teddy;
};

const displayProduct = async () => {
    try {
        let teddy = await getProduct();
        // console.log(teddy);
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
        teddyPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR"
        }).format(teddy.price / 100);;

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

const addToLocalStorage = async (product) => {
    // Vérifie si le localStorage existe avec userBasket, créé le tableau avec l'objet sélectionné
    if (!localStorage.getItem("userBasket")) {
        localStorage.setItem("userBasket", JSON.stringify([product]));
    } else {
        // Vérifie si le storage a le produit sélectionné avec son id, si oui incrémente sa quantité, sinon ajoute le produit
        const basketProducts = JSON.parse(localStorage.getItem("userBasket"));
        // console.log(basketProducts);
        const productSelected = basketProducts.filter(prod => prod.id === id);
        if (productSelected.length > 0) {
            productSelected[0].quantity++;
            // console.log("Quantité du produit augmentée de 1");
        } else {
            basketProducts.push(product);
            // console.log("Nouveau produit ajouté");
        }
        localStorage.setItem("userBasket", JSON.stringify(basketProducts));
    }
}

const addToBasket = document.querySelector("#addToBasket");
addToBasket.addEventListener("click", async () => {
    // Création de l'objet à envoyer au localStorage
    const {
        imageUrl,
        _id,
        name,
        price,
    } = await getProduct();
    const ourson = {
        id: _id,
        img: imageUrl,
        name: name,
        price: price,
        quantity: 1,
    };

    addToLocalStorage(ourson);
    alert("Un exemplaire de l'article a bien été ajouté au panier !");
    // console.log("Produit ajouté au panier");

});