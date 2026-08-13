let cart = [];

// Добавить в корзину
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

// Обновить корзину
function updateCart() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartItems = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">😔 Корзина пуста</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} BYN × ${item.quantity}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="decreaseQty(${item.id})">-</button>
                    <span style="color: #fff; font-weight: bold; min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
                </div>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total;
}

function increaseQty(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

function decreaseQty(id) {
    const item = cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    } else if (item && item.quantity === 1) {
        cart = cart.filter(i => i.id !== id);
        updateCart();
    }
}