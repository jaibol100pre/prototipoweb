document.addEventListener("DOMContentLoaded", function() {
    const filters = document.querySelectorAll('.filter-dot');
    const products = document.querySelectorAll('.product-item');

    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            const selectedFinish = this.getAttribute('data-filter');

            products.forEach(product => {
                // Si seleccionamos "all", mostramos todos
                if (selectedFinish === 'all') {
                    product.style.display = 'block';
                    setTimeout(() => product.style.opacity = '1', 10);
                } 
                // Si el producto coincide con el filtro
                else if (product.getAttribute('data-finish') === selectedFinish) {
                    product.style.display = 'block';
                    setTimeout(() => product.style.opacity = '1', 10);
                } 
                // Si no coincide, lo ocultamos
                else {
                    product.style.opacity = '0';
                    setTimeout(() => product.style.display = 'none', 300);
                }
            });
        });
    });
});

function openQuickView(brand, title, price, imgUrl) {
    document.getElementById('qv-brand').innerText = brand;
    document.getElementById('qv-title').innerText = title;
    document.getElementById('qv-price').innerText = price;
    document.getElementById('qv-image').src = imgUrl;
}