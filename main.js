const SUPABASE_URL = 'https://jqrjybptkhspfgbhvalo.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_RDMAZ6lxzNWSShrdgDs0ug_d9nTPAcD';

const supabaseClient = window.supabase?.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

let activePromo = null;
let currentCategory = 'all';
let currentBrand = 'all';
let openCardId = null;

// ========== НАВИГАЦИЯ ==========

function setActiveTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId)?.classList.add('active');
}

// ========== КАТАЛОГ И ФИЛЬТРЫ ==========

function getFilteredProducts() {
    const effectiveCategory = currentCategory === 'pod' ? 'disposable' : currentCategory;

    return products.filter(product => {
        const categoryMatch =
            effectiveCategory === 'all' || product.category === effectiveCategory;

        const brandMatch =
            currentBrand === 'all' ||
            String(product.brand || '').toLowerCase().includes(currentBrand.toLowerCase());

        return categoryMatch && brandMatch;
    });
}

function renderCatalog() {
    const catalog = document.getElementById('catalog');
    if (!catalog) return;

    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
        catalog.innerHTML = `<div class="no-products">😕 Нет товаров по выбранным фильтрам</div>`;
        return;
    }

    const categoryNames = {
        liquid: 'Жидкость',
        disposable: 'Одноразка',
        consumables: 'Расходник',
        cigarettes: 'Сигареты',
        snus: 'Снюс'
    };

    catalog.innerHTML = filtered.map(product => {
        const imagePath = `images/product${product.id}.jpg`;
        const hasFlavors = Array.isArray(product.flavors) && product.flavors.length > 0;
        const isOpen = openCardId === product.id;

        const flavorsHtml = hasFlavors && isOpen
            ? `
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
            `
            : '';

        return `
            <div class="product-card ${hasFlavors ? 'has-flavors' : ''} ${isOpen ? 'open' : ''}">
                <div class="product-header" onclick="${hasFlavors ? `toggleCard(${product.id})` : ''}">
                    <div class="product-image" data-product-name="${product.name}">
                        <img src="${imagePath}" alt="${product.name}" onerror="this.style.display='none'">
                    </div>
                    <div class="product-info">
                        <span class="category-badge">${categoryNames[product.category] || 'Товар'}</span>
                        ${hasFlavors
                            ? `<span class="flavors-count">🍬 ${product.flavors.length} вкусов ${isOpen ? '▲' : '▼'}</span>`
                            : ''}
                        <h3>${product.name}</h3>
                        <p class="description">${product.description || ''}</p>
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
    const product = products.find(item => item.id === productId);
    if (!product || !product.flavors?.length) return;
    openCardId = openCardId === productId ? null : productId;
    renderCatalog();
}

function filterProducts() {
    const categoryRadio = document.querySelector('input[name="category"]:checked');
    const brandRadio = document.querySelector('input[name="brand"]:checked');
    currentCategory = categoryRadio?.value || 'all';
    currentBrand = brandRadio?.value || 'all';
    openCardId = null;
    renderCatalog();
}

function toggleMenu() {
    setActiveTab('catalog-tab');
    document.getElementById('sidebar')?.classList.toggle('active');
    document.getElementById('overlay')?.classList.toggle('active');
}

// ========== КОРЗИНА ==========

function addToCartWithFlavor(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) return;

    if (!product.flavors?.length) {
        addToCart(productId);
        alert(`✅ Добавлено: ${product.name}`);
        return;
    }

    if (openCardId !== productId) {
        toggleCard(productId);
        return;
    }

    const flavorSelect = document.querySelector(`input[name="flavor-${productId}"]:checked`);

    if (!flavorSelect || flavorSelect.value === '') {
        alert('⛔ Выбери вкус!');
        return;
    }

    const flavorIndex = Number(flavorSelect.value);
    const flavorName = product.flavors[flavorIndex];
    const uniqueId = `${productId}_${flavorIndex}`;
    const existing = cart.find(item => item.id === uniqueId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: uniqueId,
            name: `${product.name} — ${flavorName}`,
            price: product.price,
            quantity: 1
        });
    }

    updateCart();
    alert(`✅ Добавлено: ${product.name} — ${flavorName}`);
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function toggleCart() {
    setActiveTab('cart-tab');
    const modal = document.getElementById('cart-modal');
    if (!modal) return;

    const isOpen = modal.style.display === 'flex';
    modal.style.display = isOpen ? 'none' : 'flex';

    if (!isOpen) renderCartWithEdit();
}

function getCartTotals() {
    const subtotal = cart.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
    );
    const discountPercent = Number(activePromo?.discountPercent || 0);
    const discountAmount = Math.round(subtotal * discountPercent) / 100;
    const total = Math.max(0, subtotal - discountAmount);
    return { subtotal, discountPercent, discountAmount, total };
}

function renderCartWithEdit() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">😔 Корзина пуста</p>';
        cartTotal.textContent = '0';
        document.getElementById('cart-discount-line')?.remove();
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">
                    ${item.price} BYN ×
                    <input type="number" class="qty-input" value="${item.quantity}" min="1" max="99"
                        onchange="updateQtyDirect('${item.id}', this.value)"
                        style="width:60px;padding:5px;border-radius:8px;border:2px solid #ff6edb;background:#2d1b4e;color:#fff;font-weight:bold;text-align:center;margin-left:8px;">
                </div>
                <div style="color:#c48bff;font-size:0.9em;margin-top:5px;">
                    Итого: ${Number(item.price) * Number(item.quantity)} BYN
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="qty-btn" onclick="decreaseQtyFromId('${item.id}')">-</button>
                <span style="color:#fff;font-weight:bold;min-width:30px;text-align:center;">${item.quantity}</span>
                <button class="qty-btn" onclick="increaseQtyFromId('${item.id}')">+</button>
            </div>
        </div>
    `).join('');

    const totals = getCartTotals();
    cartTotal.textContent = totals.total.toFixed(2);

    let discountLine = document.getElementById('cart-discount-line');

    if (!discountLine) {
        discountLine = document.createElement('div');
        discountLine.id = 'cart-discount-line';
        discountLine.style.cssText = 'color:#63e6be;margin-top:8px;font-weight:bold;text-align:center;';
        cartTotal.parentElement.after(discountLine);
    }

    discountLine.textContent = totals.discountPercent > 0
        ? `🎟 ${activePromo.code}: −${totals.discountAmount.toFixed(2)} BYN (${totals.discountPercent}%)`
        : '';
}

function updateCart() {
    const count = cart.reduce((sum, item) => sum + Number(item.quantity), 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = count;
}

function findCartItem(id) {
    return cart.find(cartItem => String(cartItem.id) === String(id));
}

function updateQtyDirect(id, newQty) {
    const quantity = Number.parseInt(newQty, 10);

    if (!Number.isInteger(quantity) || quantity < 1) {
        alert('⛔ Количество должно быть больше 0');
        renderCartWithEdit();
        return;
    }

    const item = findCartItem(id);
    if (!item) return;

    item.quantity = quantity;
    updateCart();
    renderCartWithEdit();
}

function increaseQtyFromId(id) {
    const item = findCartItem(id);
    if (!item) return;
    item.quantity++;
    updateCart();
    renderCartWithEdit();
}

function decreaseQtyFromId(id) {
    const item = findCartItem(id);
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(cartItem => String(cartItem.id) !== String(id));
    }

    updateCart();
    renderCartWithEdit();
}

// ========== ОПЛАТА ==========

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

    const paymentMethod =
        document.querySelector('input[name="payment-method"]:checked')?.value || 'card';

    const totals = getCartTotals();
    const total = totals.total;
    let cashAmount = 0;

    if (paymentMethod === 'cash') {
        cashAmount = Number(document.getElementById('cash-amount')?.value || 0);

        if (!cashAmount || cashAmount <= 0) {
            alert('⛔ Введи сумму наличными!');
            return;
        }

        if (cashAmount < total) {
            alert(`⛔ Не хватает ${(total - cashAmount).toFixed(2)} BYN.`);
            return;
        }
    }

    const now = new Date();
    const dateString = now.toLocaleDateString('ru-RU');
    const timeString = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    let message = '🛒 ЗАКАЗ TRAHAN ZIZHKA\n\n';
    message += `📅 Дата: ${dateString}\n`;
    message += `⏰ Время: ${timeString}\n`;
    message += `👤 Юзернейм: ${username}\n\n`;
    message += '📋 Товары:\n';

    cart.forEach(item => {
        const itemTotal = Number(item.price) * Number(item.quantity);
        message += `▪️ ${item.name} × ${item.quantity} = ${itemTotal} BYN\n`;
    });

    message += `\n💰 Сумма без скидки: ${totals.subtotal.toFixed(2)} BYN\n`;

    if (totals.discountPercent > 0) {
        message += `🎟 Промокод: ${activePromo.code}\n`;
        message += `📉 Скидка: −${totals.discountAmount.toFixed(2)} BYN (${totals.discountPercent}%)\n`;
    }

    message += `💜 К оплате: ${total.toFixed(2)} BYN\n`;

    if (paymentMethod === 'card') {
        message += '\n💳 Оплата: Картой\n';
    } else {
        const change = cashAmount - total;
        message += '\n💵 Оплата: Наличными\n';
        message += `🤲 Клиент даёт: ${cashAmount.toFixed(2)} BYN\n`;
        message += `🔁 Сдача: ${change.toFixed(2)} BYN\n`;
    }

    message += '\n✅ Подтверждаю!';

    const url = `https://t.me/TrahanZizhka?text=${encodeURIComponent(message)}`;

    if (window.Telegram?.WebApp?.openTelegramLink) {
        window.Telegram.WebApp.openTelegramLink(url);
    } else {
        window.open(url, '_blank');
    }
}

// ========== 18+ ==========

function checkAge() {
    const modal = document.getElementById('age-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.classList.add('age-locked');
}

function confirmAge(isAdult) {
    if (isAdult) {
        document.getElementById('age-modal')?.classList.add('hidden');
        document.body.classList.remove('age-locked');
    } else {
        window.location.href = 'https://www.youtube.com/results?search_query=мультфильмы';
    }
}

// ========== ПРОФИЛЬ TELEGRAM ==========

function getTelegramUser() {
    const tg = window.Telegram?.WebApp;
    if (!tg) return null;
    tg.ready();
    return tg.initDataUnsafe?.user || null;
}

function getCurrentTelegramUser() {
    return getTelegramUser();
}

function openProfileTab() {
    setActiveTab('profile-tab');
    const modal = document.getElementById('profile-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    renderProfile();
}

function closeProfileTab() {
    const modal = document.getElementById('profile-modal');
    if (modal) modal.style.display = 'none';
}

function logoutProfile() {
    activePromo = null;
    updatePromoInterface();
    closeProfileTab();
}

function getOrderStats(userId) {
    try {
        const stats = JSON.parse(localStorage.getItem(`order_stats_${userId}`) || '{}');
        return {
            orders: Number(stats.orders) || 0,
            spent: Number(stats.spent) || 0
        };
    } catch {
        return { orders: 0, spent: 0 };
    }
}

function renderProfile() {
    const user = getTelegramUser();
    const loginBlock = document.getElementById('profile-login');
    const userBlock = document.getElementById('profile-user');
    if (!loginBlock || !userBlock) return;

    if (!user) {
        loginBlock.style.display = 'block';
        userBlock.style.display = 'none';
        activePromo = null;
        updatePromoInterface();
        return;
    }

    loginBlock.style.display = 'none';
    userBlock.style.display = 'block';

    const name = [user.first_name, user.last_name].filter(Boolean).join(' ');
    const profileName = document.getElementById('profile-name');
    const profileUsername = document.getElementById('profile-username');
    const profileId = document.getElementById('profile-id');
    const avatar = document.getElementById('profile-avatar');

    if (profileName) profileName.textContent = name || 'Пользователь';
    if (profileUsername) {
        profileUsername.textContent = user.username ? `@${user.username}` : 'Username не указан';
    }
    if (profileId) profileId.textContent = user.id;
    if (avatar) avatar.src = user.photo_url || 'images/default-avatar.png';

    const stats = getOrderStats(user.id);
    const orders = document.getElementById('profile-orders');
    const spent = document.getElementById('profile-spent');

    if (orders) orders.textContent = stats.orders;
    if (spent) spent.textContent = stats.spent;

    loadActivePromo();
}

function refreshProfile() {
    renderProfile();
}

function copyTelegramId() {
    const id = document.getElementById('profile-id')?.textContent;
    if (!id || id === 'Неизвестно') return;

    navigator.clipboard.writeText(id)
        .then(() => alert('✅ Telegram ID скопирован'))
        .catch(() => alert('⛔ Не удалось скопировать Telegram ID'));
}

// ========== ПРОМОКОДЫ ==========

function updatePromoInterface() {
    const status = document.getElementById('promo-status');
    const input = document.getElementById('promo-input');
    const button = document.querySelector('.promo-form button');
    if (!status || !input) return;

    if (activePromo) {
        status.textContent = `✅ ${activePromo.code}: скидка ${activePromo.discountPercent}% активна`;
        status.style.color = '#63e6be';
        input.value = activePromo.code;
        input.disabled = true;
        if (button) {
            button.disabled = true;
            button.textContent = 'Активирован';
        }
    } else {
        status.textContent = 'Введи код, чтобы получить скидку.';
        status.style.color = '';
        input.value = '';
        input.disabled = false;
        if (button) {
            button.disabled = false;
            button.textContent = 'Активировать';
        }
    }
}

async function activatePromoCode() {
    const user = getCurrentTelegramUser();

    if (!user?.id) {
        alert('⛔ Открой магазин через кнопку Mini App в Telegram-боте.');
        return;
    }

    if (!supabaseClient) {
        alert('⛔ Supabase не подключён. Проверь подключение библиотеки в index.html.');
        return;
    }

    const input = document.getElementById('promo-input');
    const code = input?.value.trim().toUpperCase();

    if (!code) {
        alert('⛔ Введи промокод.');
        return;
    }

    const button = document.querySelector('.promo-form button');

    if (button) {
        button.disabled = true;
        button.textContent = 'Проверяем...';
    }

    try {
        const { data, error } = await supabaseClient.rpc('activate_promo_code', {
            p_code: code,
            p_telegram_id: user.id
        });

        if (error) {
            console.error(error);
            alert('⛔ Ошибка при проверке промокода.');
            return;
        }

        if (!data?.ok) {
            alert(`⛔ ${data?.message || 'Промокод не активирован'}`);
            return;
        }

        activePromo = {
            code: data.code,
            discountPercent: Number(data.discount_percent)
        };

        localStorage.setItem(`active_promo_${user.id}`, JSON.stringify(activePromo));

        updatePromoInterface();
        alert(`✅ Промокод активирован: скидка ${activePromo.discountPercent}%`);

        if (document.getElementById('cart-modal')?.style.display === 'flex') {
            renderCartWithEdit();
        }
    } catch (error) {
        console.error(error);
        alert('⛔ Не удалось активировать промокод.');
    } finally {
        if (button && !activePromo) {
            button.disabled = false;
            button.textContent = 'Активировать';
        }
    }
}

function loadActivePromo() {
    const user = getCurrentTelegramUser();

    if (!user?.id) {
        activePromo = null;
        updatePromoInterface();
        return;
    }

    try {
        activePromo = JSON.parse(localStorage.getItem(`active_promo_${user.id}`) || 'null');
    } catch {
        activePromo = null;
    }

    updatePromoInterface();
}

// ========== ЗАКРЫТИЕ ОКОН ==========

document.getElementById('cart-modal')?.addEventListener('click', function (event) {
    if (event.target === this) toggleCart();
});

document.getElementById('profile-modal')?.addEventListener('click', function (event) {
    if (event.target === this) closeProfileTab();
});

document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    const cartModal = document.getElementById('cart-modal');
    if (cartModal?.style.display === 'flex') toggleCart();

    closeProfileTab();

    if (document.getElementById('sidebar')?.classList.contains('active')) toggleMenu();
});

// ========== ЗАГРУЗКА ==========

document.addEventListener('DOMContentLoaded', function () {
    window.Telegram?.WebApp?.ready();

    checkAge();
    renderCatalog();
    updateCart();
    renderProfile();

    setActiveTab('catalog-tab');
});

