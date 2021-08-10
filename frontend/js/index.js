const getProducts = async () => {
    const response = await fetch("http://localhost:3000/api/teddies");
    const teddies = await response.json();
    return teddies;
};



const displayProducts = async () => {

    let teddies = [];
    try {
        teddies = await getProducts();
        console.log(teddies);
        const template = document.querySelector("#teddyList");
        for (let teddy of teddies) {
            const ficheProduct = document.querySelector(".productCard");
            const clone = document.importNode(template.content, true);
            const teddyName = clone.querySelector(".card-title");
            teddyName.innerHTML = teddy.name;
            const teddyImg = clone.querySelector(".card-img-top");
            teddyImg.src = teddy.imageUrl;
            const teddyLink = clone.querySelector(".card-link");
            teddyLink.href = `product.html?id=${teddy._id}`;
            ficheProduct.appendChild(clone);
        }
        
    } catch (error) {
        console.log(error);
    }
    
    
}

displayProducts();