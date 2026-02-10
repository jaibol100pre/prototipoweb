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



/** Carousel */

$(function() {

	if ( $('.owl-2').length > 0 ) {
        $('.owl-2').owlCarousel({
            center: false,
            items: 1,
            loop: true,
            stagePadding: 0,
            margin: 20,
            smartSpeed: 1000,
            autoplay: true,
            nav: true,
            dots: true,
            pauseOnHover: false,
            responsive:{
                600:{
                    margin: 20,
                    nav: true,
                  items: 2
                },
                1000:{
                    margin: 20,
                    stagePadding: 0,
                    nav: true,
                  items: 3
                }
            }
        });            
    }

})