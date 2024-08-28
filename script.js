// Fetch products from the JSON file and display them
fetch('products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(products => {
        displayProducts(products); // Call function to display products

        // Add event listeners to filters
        document.getElementById('categoryFilter').addEventListener('change', () => {
            filterAndSortProducts(products);
        });

        document.getElementById('priceSort').addEventListener('change', () => {
            filterAndSortProducts(products);
        });
    })
    .catch(error => console.error('Error fetching the products:', error));

// Function to display products
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');

    if (!productsContainer) {
        console.error('Error: Products container not found');
        return;
    }

    // Clear previous products, if any
    productsContainer.innerHTML = '';

    // Iterate through the products and create HTML for each
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.imageURL}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Rating: ${product.rating}</p>
        `;

        productsContainer.appendChild(productCard);
    });
}

// Function to filter and sort products
function filterAndSortProducts(products) {
    const category = document.getElementById('categoryFilter').value;
    const sortByPrice = document.getElementById('priceSort').value;

    let filteredProducts = products;

    // Filter by category
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }

    // Sort by price
    if (sortByPrice === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === 'desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
}
