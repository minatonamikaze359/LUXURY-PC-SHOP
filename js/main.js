let cartCount = 0;

function addToCart(quantity = 1) {
    cartCount += quantity;
    document.getElementById('cartCount').textContent = cartCount;
    alert('Item added to your shopping cart!');
}
