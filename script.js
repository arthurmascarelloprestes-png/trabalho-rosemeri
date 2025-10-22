// Dados dos produtos (catálogo expandido com 15 itens)
const products = [
    { id: 1, name: 'Sofá Minimalista', category: 'moveis', price: 1200, description: 'Sofá confortável em tons neutros, ideal para salas modernas.', image: 'https://source.unsplash.com/280x200/?sofa', rating: 4.5 },
    { id: 2, name: 'Mesa de Centro', category: 'moveis', price: 400, description: 'Mesa elegante em madeira sustentável.', image: 'https://source.unsplash.com/280x200/?table', rating: 4.2 },
    { id: 3, name: 'Quadro Abstrato', category: 'decoracao', price: 150, description: 'Arte moderna para paredes, adiciona sofisticação.', image: 'https://source.unsplash.com/280x200/?art', rating: 4.8 },
    { id: 4, name: 'Vaso Cerâmico', category: 'decoracao', price: 80, description: 'Vaso simples e sofisticado para plantas.', image: 'https://source.unsplash.com/280x200/?vase', rating: 4.0 },
    { id: 5, name: 'Almofada Geométrica', category: 'acessorios', price: 50, description: 'Almofada com padrões elegantes.', image: 'https://source.unsplash.com/280x200/?pillow', rating: 4.3 },
    { id: 6, name: 'Luminária de Mesa', category: 'iluminacao', price: 200, description: 'Iluminação suave e moderna.', image: 'https://source.unsplash.com/280x200/?lamp', rating: 4.6 },
    { id: 7, name: 'Cadeira Eames', category: 'moveis', price: 800, description: 'Ícone do design minimalista.', image: 'https://source.unsplash.com/280x200/?chair', rating: 4.9 },
    { id: 8, name: 'Tapete Neutro', category: 'decoracao', price: 300, description: 'Tapete para pisos elegantes.', image: 'https://source.unsplash.com/280x200/?rug', rating: 4.4 },
    { id: 9, name: 'Prateleira Flutuante', category: 'moveis', price: 250, description: 'Prateleira moderna para organização.', image: 'https://source.unsplash.com/280x200/?shelf', rating: 4.1 },
    { id: 10, name: 'Cortina Transparente', category: 'decoracao', price: 120, description: 'Cortina leve para janelas.', image: 'https://source.unsplash.com/280x200/?curtain', rating: 4.5 },
    { id: 11, name: 'Relógio de Parede', category: 'acessorios', price: 90, description: 'Relógio minimalista para decoração.', image: 'https://source.unsplash.com/280x200/?clock', rating: 4.2 },
    { id: 12, name: 'Abajur LED', category: 'iluminacao', price: 180, description: 'Abajur eficiente e elegante.', image: 'https://source.unsplash.com/280x200/?floor-lamp', rating: 4.7 },
    { id: 13, name: 'Banco Alto', category: 'moveis', price: 350, description: 'Banco para cozinha ou bar.', image: 'https://source.unsplash.com/280x200/?stool', rating: 4.3 },
    { id: 14, name: 'Espelho Oval', category: 'decoracao', price: 220, description: 'Espelho para banheiro ou sala.', image: 'https://source.unsplash.com/280x200/?mirror', rating: 4.6 },
    { id: 15, name: 'Cesto de Tecido', category: 'acessorios', price: 60, description: 'Cesto organizador elegante.', image: 'https://source.unsplash.com/280x200/?basket', rating: 4.0 }
];

// Carrinho (usando localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Tema (claro/escuro)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', savedTheme === 'dark');
themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    showToast('Tema alterado!');
});

// Menu hambúrguer (mobile)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
});

// Navegação suave para seções
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('active'); // Fecha menu mobile
    });
});

// Renderizar produtos
function renderProducts(filteredProducts = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.1}s`; // Animação escalonada
        const stars = generateStars(product.rating);
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="rating">${stars}</div>
            <p>R$ ${product.price}</p>
            <button onclick="openModal(${product.id})">Ver Detalhes</button>
        `;
        grid.appendChild(card);
    });
}

// Gerar estrelas para rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '★';
    if (halfStar) stars += '☆';
    while (stars.length < 5) stars += '☆';
    return stars;
}

// Carrossel de destaques (produtos aleatórios)
function renderHighlights() {
    const highlights = products.sort(() => 0.5 - Math.random()).slice(0, 5);
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = '';
    highlights.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const stars = generateStars(product.rating);
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="rating">${stars}</div>
            <p>R$ ${product.price}</p>
            <button onclick="openModal(${product.id})">Ver Detalhes</button>
        `;
        carousel.appendChild(card);
    });
}

// Modal de produto
function openModal(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-rating').innerHTML = generateStars(product.rating);
    document.getElementById('modal-price').textContent = `R$ ${product.price}`;
    document.getElementById('add-to-cart-modal').onclick = () => addToCart(product.id);
    document.getElementById('product-modal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Impede scroll
}

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
        document.body.style.overflow = 'auto';
    });
});

// Adicionar ao carrinho
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Produto adicionado ao carrinho!');
}

// Atualizar contador do carrinho
function updateCartCount() {
    document.getElementById('carrinho-count').textContent = cart.length;
}

// Modal do carrinho
document.getElementById('carrinho-link').addEventListener('click', (e) => {
    e.preventDefault();
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} - R$ ${item.price}</span>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartItems.appendChild(div);
    });
    document.getElementById('cart-total').textContent = `Total: R$ ${total}`;
    document.getElementById('cart-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
});

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    document.getElementById('carrinho-link').click(); // Reabre modal
}

// Finalizar compra (simulado)
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Carrinho vazio!');
        return;
    }
    alert('Compra finalizada! (Simulado)');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    document.getElementById('cart-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Barra de pesquisa
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
    showToast(`Encontrados ${filtered.length} produtos.`);
});

// Filtros
document.getElementById('categoria').addEventListener('change', applyFilters);
document.getElementById('preco').addEventListener('change', applyFilters);

function applyFilters() {
    const categoria = document.getElementById('categoria').value;
    const preco = document.getElementById('preco').value;
    let filtered = products;

    if (categoria !== 'todos') {
        filtered = filtered.filter(p => p.category === categoria);
    }

    if (preco === 'baixo') {
        filtered = filtered.filter(p => p.price <= 200);
    } else if (preco === 'medio') {
        filtered = filtered.filter(p => p.price > 200 && p.price <= 500);
    } else if (preco === 'alto') {
        filtered = filtered.filter(p => p.price > 500);
    }

    renderProducts(filtered);
    showToast(`Filtrados ${filtered.length} produtos.`);
}

// Formulário de contato (simulado)
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Mensagem enviada! Entraremos em contato em breve.');
    e.target.reset();
});

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Inicializar
renderProducts();
renderHighlights();
