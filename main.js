const SUPABASE_URL = 'https://jqrjybptkhspfgbhvalo.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_RDMAZ6lxzNWSShrdgDs0ug_d9nTPAcD';

const supabaseClient = window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
    : null;

let products = [];
let activePromo = null;
let currentCategory = 'all';
let currentBrand = 'all';
let openCardId = null;
let promoRequestInProgress = false;
let isCatalogLoading = false;

document.addEventListener('DOMContentLoaded', async () => {
    initNavigation();
    initFilters();
    initCatalogClicks();
    initPromo();

    await loadProducts();
});

// ========== ЗАГРУЗКА ТОВАРОВ ==========

async function loadProducts() {
    const catalog = document.getElementById('catalog');

    try {
        isCatalogLoading = true;

        if (catalog) {
            catalog.innerHTML = `
                <div class="catalog-message">
                    Загружаем ассортимент...
                </div>
            `;
        }

        if (!supabaseClient) {
            console.error('Supabase client не создан. Проверь подключение supabase-js в HTML.');
            products = [];
            renderCatalog();
            return;
        }

        const { data, error } = await supabaseClient
            .from('products')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Ошибка загрузки товаров из Supabase:', error);
            products = [];
            renderCatalog('Не удалось загрузить ассортимент. Попробуйте обновить страницу.');
            return;
        }

        products = Array.isArray(data) ? data : [];

        renderCatalog();
        renderBrandFilters();

    } catch (error) {
        console.error('Критическая ошибка при загрузке товаров:', error);
        products = [];
        renderCatalog('Произошла ошибка при загрузке ассортимента.');
    } finally {
        isCatalogLoading = false;
    }
}

// ========== НАВИГАЦИЯ ==========

function initNavigation() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.id || tab.dataset.tab;

            if (tabId) {
                setActiveTab(tabId);
            }

            const target = tab.dataset.target;

            if (target) {
                scrollToSection(target);
            }
        });
    });
}

function setActiveTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    const activeTab = document.getElementById(tabId);

    if (activeTab) {
        activeTab.classList.add('active');
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========== ФИЛЬТРЫ ==========

function initFilters() {
    document.addEventListener('click', event => {
        const categoryButton = event.target.closest('[data-category]');
        const brandButton = event.target.closest('[data-brand]');

        if (categoryButton) {
            currentCategory = categoryButton.dataset.category || 'all';
            setActiveFilter('[data-category]', categoryButton);
            renderCatalog();
        }

        if (brandButton) {
            currentBrand = brandButton.dataset.brand || 'all';
            setActiveFilter('[data-brand]', brandButton);
            renderCatalog();
        }
    });
}

function setActiveFilter(selector, activeButton) {
    document.querySelectorAll(selector).forEach(button => {
        button.classList.remove('active');
    });

    activeButton.classList.add('active');
}

function getFilteredProducts() {
    const safeProducts = Array.isArray(products) ? products : [];

    const effectiveCategory = currentCategory === 'pod'
        ? 'disposable'
        : currentCategory;

    return safeProducts.filter(product => {
        if (!product) return false;

        const productCategory = String(product.category || '').toLowerCase();
        const productBrand = String(product.brand || '').toLowerCase();

        const categoryMatch =
            effectiveCategory === 'all' ||
            productCategory === String(effectiveCategory).toLowerCase();

        const brandMatch =
            currentBrand === 'all' ||
            productBrand.includes(String(currentBrand).toLowerCase());

        return categoryMatch && brandMatch;
    });
}

function renderBrandFilters() {
    const brandContainer = document.getElementById('brandFilters');

    if (!brandContainer) return;

    const brands = [...new Set(
        products
            .map(product => product.brand)
            .filter(Boolean)
    )];

    brandContainer.innerHTML = `
        <button class="filter-btn active" data-brand="all">
            Все бренды
        </button>
        ${brands.map(brand => `
            <button class="filter-btn" data-brand="${escapeHtml(brand)}">
                ${escapeHtml(brand)}
            </button>
        `).join('')}
    `;
}

// ========== КАТАЛОГ ==========

function renderCatalog(customMessage = '') {
    const catalog = document.getElementById('catalog');

    if (!catalog) {
        console.warn('Контейнер #catalog не найден в HTML.');
        return;
    }

    if (customMessage) {
        catalog.innerHTML = `
            <div class="catalog-message">
                ${escapeHtml(customMessage)}
            </div>
        `;
        return;
    }

    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
        catalog.innerHTML = `
            <div class="catalog-message">
                Товары не найдены.
            </div>
        `;
        return;
    }

    catalog.innerHTML = filtered.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const id = product.id ?? '';
    const title = product.name || product.title || 'Без названия';
    const brand = product.brand || '';
    const category = product.category || '';
    const description = product.description || '';
    const price = product.price ?? '';
    const oldPrice = product.old_price ?? product.oldPrice ?? '';
    const image = product.image_url || product.image || product.photo || '';
    const inStock = product.in_stock !== false && product.stock !== 0;
    const isOpen = String(openCardId) === String(id);

    return `
        <div class="product-card ${isOpen ? 'open' : ''}" data-product-id="${escapeHtml(id)}">
            <div class="product-image-wrap">
                ${image
                    ? `<img class="product-image" src="${escapeAttribute(image)}" alt="${escapeAttribute(title)}" loading="lazy">`
                    : `<div class="product-image product-image-placeholder">Нет фото</div>`
                }
            </div>

            <div class="product-info">
                ${brand ? `<div class="product-brand">${escapeHtml(brand)}</div>` : ''}

                <h3 class="product-title">
                    ${escapeHtml(title)}
                </h3>

                ${category ? `
                    <div class="product-category">
                        ${escapeHtml(getCategoryTitle(category))}
                    </div>
                ` : ''}

                ${description ? `
                    <div class="product-description ${isOpen ? 'visible' : ''}">
                        ${escapeHtml(description)}
                    </div>
                ` : ''}

                <div class="product-bottom">
                    <div class="product-price-wrap">
                        ${oldPrice ? `
                            <span class="product-old-price">
                                ${formatPrice(oldPrice)}
                            </span>
                        ` : ''}

                        <span class="product-price">
                            ${formatPrice(price)}
                        </span>
                    </div>

                    <div class="product-actions">
                        ${description ? `
                            <button class="details-btn" type="button" data-id="${escapeAttribute(id)}">
                                ${isOpen ? 'Скрыть' : 'Подробнее'}
                            </button>
                        ` : ''}

                        <button 
                            class="buy-btn" 
                            type="button" 
                            data-id="${escapeAttribute(id)}"
                            ${inStock ? '' : 'disabled'}
                        >
                            ${inStock ? 'Купить' : 'Нет в наличии'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initCatalogClicks() {
    document.addEventListener('click', event => {
        const detailsButton = event.target.closest('.details-btn');
        const buyButton = event.target.closest('.buy-btn');

        if (detailsButton) {
            const productId = detailsButton.dataset.id;

            openCardId = String(openCardId) === String(productId)
                ? null
                : productId;

            renderCatalog();
            return;
        }

        if (buyButton) {
            const productId = buyButton.dataset.id;
            const product = products.find(item => String(item.id) === String(productId));

            if (!product) {
                console.warn('Товар не найден:', productId);
                return;
            }

            handleBuyProduct(product);
        }
    });
}

function handleBuyProduct(product) {
    const title = product.name || product.title || 'товар';
    const price = product.price ? formatPrice(product.price) : '';

    console.log('Выбран товар:', product);

    const message = price
        ? `Вы выбрали: ${title}, цена ${price}`
        : `Вы выбрали: ${title}`;

    showToast(message);

    const orderInput = document.getElementById('orderProduct');

    if (orderInput) {
        orderInput.value = title;
    }

    const orderSection = document.getElementById('order');

    if (orderSection) {
        orderSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========== ПРОМО ==========

function initPromo() {
    const promoButtons = document.querySelectorAll('[data-promo]');

    promoButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const promoCode = button.dataset.promo;

            if (!promoCode) return;

            await activatePromo(promoCode);
        });
    });
}

async function activatePromo(promoCode) {
    if (promoRequestInProgress) return;

    try {
        promoRequestInProgress = true;

        activePromo = promoCode;

        document.querySelectorAll('[data-promo]').forEach(button => {
            button.classList.remove('active');

            if (button.dataset.promo === promoCode) {
                button.classList.add('active');
            }
        });

        showToast(`Промокод ${promoCode} активирован`);

    } catch (error) {
        console.error('Ошибка активации промокода:', error);
        showToast('Не удалось активировать промокод');
    } finally {
        promoRequestInProgress = false;
    }
}

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========

function getCategoryTitle(category) {
    const map = {
        all: 'Все',
        disposable: 'Одноразовые',
        pod: 'POD-системы',
        liquid: 'Жидкости',
        liquids: 'Жидкости',
        accessories: 'Аксессуары',
        device: 'Устройства',
        devices: 'Устройства'
    };

    return map[category] || category;
}

function formatPrice(value) {
    if (value === null || value === undefined || value === '') {
        return 'Цена не указана';
    }

    const number = Number(value);

    if (Number.isNaN(number)) {
        return String(value);
    }

    return `${number.toLocaleString('ru-RU')} ₽`;
}

function showToast(message) {
    let toast = document.getElementById('toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
    return escapeHtml(value);
}
