let products = JSON.parse(localStorage.getItem("Product List")) || [];
let cart = JSON.parse(localStorage.getItem("Cart List")) || [];

function saveProducts() {
    localStorage.setItem("Product List", JSON.stringify(products));
}
function saveCart() {
    localStorage.setItem("Cart List", JSON.stringify(cart));
}

function addProducts() {
    const form = document.getElementById("productForm");
    if(!form){
        return
    }
    form.addEventListener("submit", function(e){
        e.preventDefault();
        const id = parseInt(document.getElementById("productId").value);
        const productName = document.getElementById("productName").value;
        const price = parseInt(document.getElementById("price").value);
        const image = document.getElementById("image").value;
        const productDesc = document.getElementById("productDesc").value;

        if(id === "" || productName === "" || price === "" || image === "" || productDesc === "") {
            alert("Please fill all fields...");
            return;
        }

        products.push({id : id, productName, price, image, productDesc});
        form.reset();
        saveProducts();
        viewProduct();
    })
}

function viewProduct() {
    const productTable = document.getElementById("productTable");
    if(!productTable) {
        return
    }

    if(products.length === 0) {
        products = [
            {
                id: 1001,
                productName: "Classic Gold Earrings",
                price: 19999,
                image: "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg",
                productDesc: "Elegant 22K golden earrings, perfect for traditional and modern outfits."   
            },
            {
                id: 1002,
                productName: "Diamond Ring",
                price: 15000,
                image: "https://cdn.pixabay.com/photo/2022/02/15/15/57/ring-7015206_1280.jpg",
                productDesc: "A beautifully crafted diamond ring featuring a brilliant-cut stone on a polished band. Elegant, timeless, and perfect for engagements, weddings, or as a special gift."   
            }
        ];
        saveProducts();
    }
    productTable.innerHTML = "";
    products.forEach((p, index) => {
        productTable.innerHTML +=  `
            <tr>
                <td>${index + 1}</td>
                <td>${p.productName}</td>
                <td>${p.price}</td>
                <td>
                    <img src = "${p.image}" alt="Product Image" class="img-thumbnail p-0" width="150px">
                </td>
                <td>
                    <button class="btn-warning" onclick = "editProduct(${p.id})">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn-danger" onclick = "editProduct(${p.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `
    })   
}

function showProductAtHome() {
    const productList = document.getElementById("productList");
    if(!productList) {
        return;
    }
    if(products.length === 0) {
        viewProduct();
    }
    productList.innerHTML = "";
    products.map((p) => {
        productList.innerHTML +=  `
            <div class="col-3">
                <div class="card">
                    <img src="${p.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${p.productName}</h5>
                        <p class="card-text">${p.productDesc}</p>
                        <a href="#" class="btn btn-primary" onclick = "addToCart(${p.id})">Add to Cart</a>
                        <a href="#" class="btn btn-primary">View Product</a>
                    </div>
                </div>
            </div>
        `
    })
}

function addToCart(id) {
    const cartProduct = products.find((item) => item.id === id);
    if (!cartProduct) {
        return;
    }

    const existInCart = cart.find((c) => c.id === id);
    if (!existInCart) {
        cart.push(cartProduct);
        alert(`${cartProduct.productName} added to cart.`);
    } else {
        alert(`${cartProduct.productName} is already in cart.`);
    }

    saveCart();
}