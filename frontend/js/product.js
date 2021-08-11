const params = (new URL(document.location)).searchParams;
const id = params.get("id");
console.log(id);

const getProducts = async () => {
    const response = await fetch(`http://localhost:3000/api/teddies/${id}`);
    console.log(response);
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
            const productCard = document.querySelector(".productCard");
            const clone = document.importNode(template.content, true);
            const teddyName = clone.querySelector(".card-title");
            teddyName.innerHTML = teddy.name;
            const teddyImg = clone.querySelector(".card-img-top");
            teddyImg.src = teddy.imageUrl;
            const teddyLink = clone.querySelector(".card-link");
            teddyLink.href = `/frontend/html/product.html?id=${teddy._id}`;
            productCard.appendChild(clone);
        }
        
    } catch (error) {
        console.log(error);
    }
    
    
}

displayProducts();