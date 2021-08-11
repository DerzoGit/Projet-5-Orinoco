const params = (new URL(document.location)).searchParams;
const id = params.get("id");
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

            for (i = 0; i < teddy.colors.length; i++) {
                const teddyColors = clone.querySelector(".teddy-color");
                teddyColors.innerHTML = teddy.colors;
            }

            const teddyLink = clone.querySelector(".card-link");
            teddyLink.href = `/frontend/html/product.html?id=${teddy._id}`;

            productCard.appendChild(clone);
        
        
    } catch (error) {
        console.log(error);
    }
    
    
}

displayProduct();