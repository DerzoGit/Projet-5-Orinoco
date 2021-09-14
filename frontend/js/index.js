const getProducts = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/teddies");
        const teddies = await response.json();
        console.log(teddies);
        return teddies;
    } catch (error) {
        console.error("L'erreur est :", error);
    }
};



const displayProducts = async () => {
    let teddies = [];
    try {
        teddies = await getProducts();
        // console.log(teddies);
        const template = document.querySelector("#teddyList");
        for (let teddy of teddies) {
            // console.log(teddy);
            const productCard = document.querySelector(".productCard");
            const clone = document.importNode(template.content, true);
            const teddyName = clone.querySelector(".card-title");
            teddyName.innerHTML = teddy.name;
            const teddyImg = clone.querySelector(".card-img-top");
            teddyImg.src = teddy.imageUrl;
            const teddyPrice = clone.querySelector(".card-text");
            teddyPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR"
            }).format(teddy.price / 100);
            const teddyLink = clone.querySelector(".card-link");
            teddyLink.href = `/frontend/html/product.html?id=${teddy._id}`;
            productCard.appendChild(clone);
        }
    } catch (error) {
        console.error("L'erreur est :", error);
    }
}

displayProducts();