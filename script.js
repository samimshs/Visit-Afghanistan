// Set the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Carousel functionality
let carouselIndex = 1;
showCarouselSlides(carouselIndex);

function plusCarouselSlides(n) {
    showCarouselSlides(carouselIndex += n);
}

function currentCarouselSlide(n) {
    showCarouselSlides(carouselIndex = n);
}

function showCarouselSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {carouselIndex = 1}
    if (n < 1) {carouselIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[carouselIndex - 1].style.display = "block";  
    dots[carouselIndex - 1].className += " active";
}

// Lightbox functionality
let lightboxIndex = 1;
showSlides(lightboxIndex);

function plusSlides(n) {
    showSlides(lightboxIndex += n);
}

function currentSlide(n) {
    showSlides(lightboxIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("lightbox-slide");
    if (n > slides.length) {lightboxIndex = 1}
    if (n < 1) {lightboxIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[lightboxIndex - 1].style.display = "block";
}

function openLightbox() {
    document.getElementById('lightboxModal').style.display = 'block';
}

function closeLightbox() {
    document.getElementById('lightboxModal').style.display = 'none';
}

document.querySelectorAll('a[href]:not([href^="#"])').forEach(function(link) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// FAB toggle functionality
function toggleFab() {
    var options = document.querySelector('.fab-options');
    options.style.display = (options.style.display === 'none' || options.style.display === '') ? 'flex' : 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    // Typewriter effect
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    function typeText(element, text) {
        let index = 0;
        const speed = 100;
        
        function typeChar() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeChar, speed);
            }
        }
        typeChar();
    }

    function checkInView() {
        typewriterElements.forEach(function(element) {
            const rect = element.getBoundingClientRect();
            const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;

            if (inView && !element.dataset.typed) {
                element.dataset.typed = "true";
                const text = element.textContent.trim();
                element.innerHTML = '';
                typeText(element, text);
            }
        });
    }

    window.addEventListener('scroll', checkInView);
    checkInView();

    // Initialize map
    var map = L.map('map').setView([33.93911, 67.709953], 6);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);
    L.marker([34.5553, 69.2075]).addTo(map)
        .bindPopup('Kabul, Afghanistan')
        .openPopup();
    map.invalidateSize();

    // Attach click event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault(); // Prevent default behavior
            event.stopPropagation(); // Stop event bubbling

            const productItem = event.target.closest('.product-item');
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = parseFloat(productItem.querySelector('p').textContent.replace('$', ''));
            const quantityInput = productItem.querySelector('input[type="number"]');
            const quantity = parseInt(quantityInput.value);

            // Add to cart functionality
            addToCart(productName, productPrice, quantity);

            // Visual feedback
            button.classList.add('added');
            button.textContent = 'Added!';
            setTimeout(() => {
                button.classList.remove('added');
                button.textContent = 'Add to Cart';
            }, 2000); // Reset after 2 seconds

            // Optional: Reset the quantity input to 1 after adding to cart
            quantityInput.value = 1;
        });
    });
});


// Update quantity function
function updateQuantity(change, id) {
    const qtyInput = document.getElementById(id);
    let currentQty = parseInt(qtyInput.value);
    if (!isNaN(currentQty) && currentQty + change >= 1) {
        qtyInput.value = currentQty + change;
    }
}

// Filter functionality
function filterProducts() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const checkedCategories = Array.from(checkboxes).map(cb => cb.value);

    const products = document.querySelectorAll('.product-item');

    products.forEach(product => {
        const productCategory = product.classList.contains('living-room')
            ? 'living-room'
            : product.classList.contains('dining-room')
            ? 'dining-room'
            : 'bedroom';

        const productName = product.querySelector('h3').innerText.toLowerCase();

        const matchesCategory = checkedCategories.length === 0 || checkedCategories.includes(productCategory);
        const matchesSearch = productName.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Scroll-to-top button functionality
window.addEventListener('scroll', function() { 
    updateProgressCircle();
    scrollFunction(); 
});

// Function to update the circular progress bar
function updateProgressCircle() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;

    // Calculate stroke-dasharray for circular progress bar
    var circle = document.getElementById("progressCircle");
    var radius = 15.9155;
    var circumference = 2 * Math.PI * radius;
    var dashArrayValue = (circumference * scrolled) / 100;

    circle.style.strokeDasharray = `${dashArrayValue}, ${circumference}`;

    if (scrolled >= 100) {
        document.getElementById('progressCircle').style.stroke = '#00C853';
        document.getElementById('tickMark').style.display = 'block';
    } else {
        document.getElementById('progressCircle').style.stroke = '#db3d44';
        document.getElementById('tickMark').style.display = 'none';
    }
}

function scrollFunction() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Scroll to Top Functionality
const scrollToTopButton = document.getElementById("scrollToTopBtn");

scrollToTopButton.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Global variable to keep track of total item count
let totalItemCount = 0;

// Function to add items to the cart
function addToCart(productName, productPrice, quantity) {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    let currentTotal = parseFloat(totalAmount.textContent);

    // Create a list item for the new product in the cart
    const cartItem = document.createElement('li');

    // Assign a unique ID to the cart item
    const cartItemId = `cart-item-${Date.now()}`;
    cartItem.setAttribute('id', cartItemId);

    // Create a span for the item details
    const itemDetails = document.createElement('span');
    itemDetails.textContent = `${quantity} x ${productName} - $${(productPrice * quantity).toFixed(2)}`;

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-item');

    // Append item details and remove button to cart item
    cartItem.appendChild(itemDetails);
    cartItem.appendChild(removeButton);

    // Append cart item to cart items list
    cartItems.appendChild(cartItem);

    // Update the total amount
    currentTotal += productPrice * quantity;
    totalAmount.textContent = currentTotal.toFixed(2);

    // Update the total item count and badge
    totalItemCount += quantity;
    updateCartCount();

    // Hide the empty cart message
    document.getElementById('empty-cart-message').style.display = 'none';

    // Add event listener for remove button
    removeButton.addEventListener('click', function() {
        removeFromCart(cartItemId, productPrice * quantity, quantity);
    });
}

// Function to update the cart count badge

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = totalItemCount;

    // Hide cart count badge if count is zero
    if (totalItemCount === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'inline';
    }
}

// Function to toggle cart details display
// Function to toggle cart details display
function toggleCartDetails() {
    const cartContainer = document.getElementById('cart-container');
    const overlay = document.getElementById('overlay');
    cartContainer.classList.toggle('show');
    overlay.classList.toggle('show');
}

// Close cart when clicking outside (if you prefer)
document.addEventListener('click', function(event) {
    const cartContainer = document.getElementById('cart-container');
    const cartIcon = document.querySelector('.cart-icon');
    const overlay = document.getElementById('overlay');
    if (
        !cartContainer.contains(event.target) &&
        !cartIcon.contains(event.target) &&
        cartContainer.classList.contains('show')
    ) {
        cartContainer.classList.remove('show');
        overlay.classList.remove('show');
    }
});

// Prevent event propagation when clicking inside the cart
document.getElementById('cart-container').addEventListener('click', function(event) {
    event.stopPropagation();
});

function removeFromCart(cartItemId, itemTotalPrice, itemQuantity) {
    const cartItem = document.getElementById(cartItemId);
    cartItem.remove();

    // Update the total amount
    const totalAmount = document.getElementById('total-amount');
    let currentTotal = parseFloat(totalAmount.textContent);
    currentTotal -= itemTotalPrice;
    totalAmount.textContent = currentTotal.toFixed(2);

    // Update the total item count and badge
    totalItemCount -= itemQuantity;
    updateCartCount();

    // Show the empty cart message if cart is empty
    if (totalItemCount === 0) {
        document.getElementById('empty-cart-message').style.display = 'block';
    }
}