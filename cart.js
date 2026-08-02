let cart = [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

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

    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

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
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = total;
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

function handlePaymentChange() {
    const method = document.querySelector('input[name="payment-method"]:checked')?.value;
    const cashBlock = document.getElementById('cash-amount-block');
    const cashInput = document.getElementById('cash-amount');

    if (!cashBlock || !cashInput) return;

    if (method === 'cash') {
        cashBlock.style.display = 'block';
        cashInput.required = true;
    } else {
        cashBlock.style.display = 'none';
        cashInput.required = false;
        cashInput.value = '';
    }
}

function getPaymentMethodData() {
    const selected = document.querySelector('input[name="payment-method"]:checked');
    return selected ? selected.value : null;
}

function checkoutToTelegram() {
    if (cart.length === 0) {
        alert('📦 Корзина пуста!');
        return;
    }

    const username = document.getElementById('customer-username')?.value.trim();
    if (!username) {
        alert('⛔ Введи свой юзернейм Telegram!');
        return;
    }

    const paymentMethod = getPaymentMethodData();
    if (!paymentMethod) {
        alert('⛔ Выбери способ оплаты!');
        return;
    }

    let cashAmount = '';
    if (paymentMethod === 'cash') {
        cashAmount = document.getElementById('cash-amount')?.value.trim();
        if (!cashAmount || Number(cashAmount) <= 0) {
            alert('⛔ Для оплаты наличными нужно указать сумму!');
            return;
        }
    }

    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const dateString = `${day}.${month}.${year}`;
    const timeString = `${hours}:${minutes}`;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let message = '🛒 ЗАКАЗ TRAHAN ZIZHKA%0A%0A';
    message += `📅 Дата: ${dateString}%0A`;
    message += `⏰ Время: ${timeString}%0A`;
    message += `👤 Юзернейм: ${username}%0A`;
    message += `💳 Оплата: ${paymentMethod === 'card' ? 'Картой' : 'Наличными'}%0A`;

    if (paymentMethod === 'cash') {
        message += `💵 Сумма наличными: ${cashAmount} BYN%0A`;
    }

    message += '%0A📋 Товары:%0A';
    cart.forEach(item => {
        message += `▪️ ${item.name} × ${item.quantity} = ${item.price * item.quantity} BYN%0A`;
    });

    message += `%0A💰 ИТОГО: ${total} BYN%0A%0A✅ Подтверждаю!`;

    window.open(`https://t.me/TrahanZizhka?text=${message}`, '_blank');

    alert('✅ Заказ отправлен!');
    cart = [];
    updateCart();
    toggleCart();
}

document.getElementById('cart-modal')?.addEventListener('click', function(e) {
    if (e.target === this) toggleCart();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('cart-modal');
        const sidebar = document.getElementById('sidebar');

        if (modal && modal.style.display === 'flex') toggleCart();
        if (sidebar && sidebar.classList.contains('active')) toggleMenu();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    updateCart();
    handlePaymentChange();
});
