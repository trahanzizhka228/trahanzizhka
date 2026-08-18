let currentCategory = 'all';
let openCardId = null;

function getFilteredProducts() {
    return products.filter(product => {
        const categoryMatch = currentCategory === 'all' || product.category === currentCategory;
        return categoryMatch;
    });
}

function renderCatalog() {
    const filtered = getFilteredProducts();
    const catalog = document.getElementById('catalog');
    
    if (filtered.length === 0) {
        catalog.innerHTML = '<div class="no-products">😕 Нет товаров в выбранной категории</div>';
        return;
    }
    
    const categoryNames = {
        'liquid': 'Жидкость',
        'pod': 'Одноразка',
        'consumables': 'Расходник',
        'cigarettes': 'Сигареты',
        'snus': 'Снюс'
    };
    
    catalog.innerHTML = filtered.map(product => {
        const imageId = product.id;
        const imagePath = `images/product${imageId}.jpg`;
        const hasFlavors = product.flavors && product.flavors.length > 0;
        const isOpen = openCardId === product.id;
        
        let flavorsHtml = '';
        if (hasFlavors && isOpen) {
            flavorsHtml = `
                <div class="flavors-dropdown">
                    <label class="flavor-select">
                        <input type="radio" name="flavor-${product.id}" value="" checked>
                        <span>Выберите вкус...</span>
                    </label>
                    ${product.flavors.map((flavor, index) => `
                        <label class="flavor-select">
                            <input type="radio" name="flavor-${product.id}" value="${index}">
                            <span>${flavor}</span>
                        </label>
                    `).join('')}
                </div>
            `;
        }
        
        return `
            <div class="product-card ${hasFlavors ? 'has-flavors' : ''} ${isOpen ? 'open' : ''}">
                <div class="product-header" onclick="${hasFlavors ? `toggleCard(${product.id})` : ''}">
                    <div class="product-image" data-product-name="${product.name}">
                        <img src="${imagePath}" alt="${product.name}" onerror="this.style.display='none'">
                    </div>
                    <div class="product-info">
                        <span class="category-badge">${categoryNames[product.category]}</span>
                        ${hasFlavors ? `<span class="flavors-count">🍬 ${product.flavors.length} вкусов ${isOpen ? '▲' : '▼'}</span>` : ''}
                        <h3>${product.name}</h3>
                        <p class="description">${product.description}</p>
                        <p class="price">${product.price} BYN</p>
                    </div>
                </div>
                ${flavorsHtml}
                <button class="add-btn" onclick="addToCartWithFlavor(${product.id})">
                    💜 ${hasFlavors ? (isOpen ? 'Добавить' : 'Выбрать вкус') : 'Добавить в корзину'}
                </button>
            </div>
        `;
    }).join('');
}

function toggleCard(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.flavors || product.flavors.length === 0) return;
    
    if (openCardId === productId) {
        openCardId = null;
    } else {
        openCardId = productId;
    }
    renderCatalog();
}

function addToCartWithFlavor(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (!product.flavors || product.flavors.length === 0) {
        addToCart(productId);
        return;
    }
    
    const flavorSelect = document.querySelector(`input[name="flavor-${productId}"]:checked`);
    if (!flavorSelect || flavorSelect.value === '') {
        alert('⛔ Выбери вкус!');
        return;
    }
    
    const flavorIndex = parseInt(flavorSelect.value);
    const flavorName = product.flavors[flavorIndex];
    const uniqueId = `${productId}_${flavorIndex}`;
    
    const cartItem = {
        id: uniqueId,
        name: `${product.name} — ${flavorName}`,
        price: product.price,
        quantity: 1
    };
    
    const existing = cart.find(item => item.id === uniqueId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push(cartItem);
    }
    
    updateCart();
    alert(`✅ Добавлено: ${cartItem.name}`);
}

function filterProducts() {
    const categoryRadio = document.querySelector('input[name="category"]:checked');
    currentCategory = categoryRadio ? categoryRadio.value : 'all';
    openCardId = null;
    renderCatalog();
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    if (modal.style.display === 'flex') {
        renderCartWithEdit();
    }
}

function renderCartWithEdit() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartItems = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">😔 Корзина пуста</p>';
        document.getElementById('cart-total').textContent = 0;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price} BYN × 
                    <input type="number" class="qty-input" data-id="${item.id}" value="${item.quantity}" min="1" max="99" onchange="updateQtyDirect('${item.id}', this.value)" style="width: 60px; padding: 5px; border-radius: 8px; border: 2px solid #ff6edb; background: #2d1b4e; color: #fff; font-weight: bold; text-align: center; margin-left: 8px;">
                </div>
                <div style="color: #c48bff; font-size: 0.9em; margin-top: 5px;">Итого: <span class="item-total" data-id="${item.id}">${item.price * item.quantity}</span> BYN</div>
            </div>
            <div class="cart-item-quantity">
                <button class="qty-btn" onclick="decreaseQtyFromId('${item.id}')">-</button>
                <span style="color: #fff; font-weight: bold; min-width: 30px; text-align: center;">${item.quantity}</span>
                <button class="qty-btn" onclick="increaseQtyFromId('${item.id}')">+</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total;
}

function updateQtyDirect(id, newQty) {
    const numQty = parseInt(newQty);
    if (isNaN(numQty) || numQty < 1) {
        alert('⛔ Количество должно быть больше 0');
        renderCartWithEdit();
        return;
    }
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity = numQty;
        const itemTotal = document.querySelector(`.item-total[data-id="${id}"]`);
        if (itemTotal) itemTotal.textContent = item.price * item.quantity;
        const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        document.getElementById('cart-total').textContent = total;
    }
}

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

function updateCart() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function increaseQtyFromId(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity++;
        updateCart();
        if (document.getElementById('cart-modal').style.display === 'flex') renderCartWithEdit();
    }
}

function decreaseQtyFromId(id) {
    const item = cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
        if (document.getElementById('cart-modal').style.display === 'flex') renderCartWithEdit();
    } else if (item && item.quantity === 1) {
        cart = cart.filter(i => i.id !== id);
        updateCart();
        if (document.getElementById('cart-modal').style.display === 'flex') renderCartWithEdit();
    }
}

function checkoutToTelegram() {
    if (cart.length === 0) {
        alert('📦 Корзина пуста!');
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let message = '🛒 ЗАКАЗ TRAHAN ZIZHKA%0A%0A📋 Товары:%0A';
    cart.forEach(item => {
        message += `▪️ ${item.name} × ${item.quantity} = ${item.price * item.quantity} BYN%0A`;
    });
    message += `%0A💰 ИТОГО: ${total} BYN%0A%0A✅ Подтвержаю!`;
    window.open(`https://t.me/TrahanZizhka?text=${message}`, '_blank');
    alert('✅ Заказ отправлен!');
    cart = [];
    updateCart();
    toggleCart();
}

document.getElementById('cart-modal').addEventListener('click', function(e) {
    if (e.target === this) toggleCart();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        toggleCart();
        if (document.getElementById('sidebar').classList.contains('active')) toggleMenu();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    renderCatalog();
    updateCart();
});
