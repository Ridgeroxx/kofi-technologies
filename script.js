// Product data for Odisika Mall
const products = [
  {
    id: 1,
    name: "Garage Doors",
    price: 2500,
    image: "images/garage doors.png",
    description: "Secure and automated garage doors.",
    details: {
      features: ["Remote control", "Durable", "Weather resistant"],
      warranty: "2-year installation warranty"
    }
  },
  {
    id: 2,
    name: "Automated Gates",
    price: 4500,
    image: "images/automated gate.jpeg",
    description: "Convenient entry with smart automation.",
    details: {
      features: ["Motion sensors", "Keypad access", "Remote opening"],
      warranty: "3-year warranty"
    }
  },
  {
    id: 3,
    name: "Electric Fences",
    price: 3200,
    image: "images/electric fence.jpg",
    description: "Robust electric fencing for your property.",
    details: {
      features: ["High voltage", "Alarm system", "Durable wiring"],
      warranty: "5-year warranty"
    }
  },
  {
    id: 4,
    name: "CCTV Surveillance",
    price: 1500,
    image: "images/cctv.jpeg",
    description: "24/7 monitoring with HD cameras.",
    details: {
      features: ["HD quality", "Mobile access", "Night vision"],
      warranty: "2-year warranty"
    }
  },
  {
    id: 5,
    name: "Intercom Systems",
    price: 1000,
    image: "images/intercom.jpg",
    description: "Safe audio and video communication.",
    details: {
      features: ["Video call", "Indoor & outdoor units", "Clear audio"],
      warranty: "1-year warranty"
    }
  },
  {
    id: 6,
    name: "Security Shutters",
    price: 3000,
    image: "images/shutter.jpeg",
    description: "Strong roller shutters for protection.",
    details: {
      features: ["Remote controlled", "Anti-rust", "Heavy-duty"],
      warranty: "3-year warranty"
    }
  }
];


const config = {
  whatsappNumber: '+233241588134',
  currency: 'GH₵',
  storeName: 'Kofi N. Technologies'
};

// Rendering and modal logic same as your original script.js
// Use your existing event listeners, modal handlers, and functions
// Just make sure to call renderProducts() on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

function renderProducts() {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = products.map(p => `
    <div class="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition cursor-pointer">
      <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover rounded-lg mb-4">
      <h3 class="text-lg font-bold text-gray-800 mb-1">${p.name}</h3>
      <p class="text-gray-600 mb-2">${p.description}</p>
      <p class="text-primary-600 font-bold">${config.currency}${p.price}</p>
    </div>
  `).join('');
}


// DOM Elements
const productsGrid = document.getElementById('products-grid');
const paymentModal = document.getElementById('payment-modal');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal');
const whatsappButton = document.getElementById('whatsapp-button');
const loadingSpinner = document.getElementById('loading-spinner');

// Modal elements
const modalProductImage = document.getElementById('modal-product-image');
const modalProductName = document.getElementById('modal-product-name');
const modalProductPrice = document.getElementById('modal-product-price');
const modalProductDescription = document.getElementById('modal-product-description');
const featuresList = document.getElementById('features-list');
const colorsSection = document.getElementById('colors-section');
const colorsList = document.getElementById('colors-list');
const sizesSection = document.getElementById('sizes-section');
const sizesList = document.getElementById('sizes-list');
const compatibilitySection = document.getElementById('compatibility-section');
const compatibilityList = document.getElementById('compatibility-list');
const warrantySection = document.getElementById('warranty-section');
const warrantyInfo = document.getElementById('warranty-info');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    setupIntersectionObserver();
    updateFooterWhatsApp();
});

// Render products in the grid
function renderProducts() {
    if (!productsGrid) return;
    
    const productHTML = products.map((product, index) => `
        <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl animate-fade-in group cursor-pointer" 
             style="animation-delay: ${index * 0.1}s"
             onclick="openPaymentModal(${product.id})">
            <div class="product-image-container relative h-64 overflow-hidden">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="product-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/400x400/3b82f6/ffffff?text=Product+Image'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute top-4 right-4">
                    <span class="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-float">
                        ${config.currency}${product.price}
                    </span>
                </div>
                <div class="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                    <span class="bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                        ✨ Premium
                    </span>
                </div>
                <!-- Hover overlay -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-110 group-hover:scale-100">
                    <div class="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl animate-bounce-gentle">
                        <i class="fas fa-eye text-primary-500 text-xl"></i>
                    </div>
                </div>
            </div>
            <div class="p-6">
                <h3 class="font-bold text-xl text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">${product.name}</h3>
                <p class="text-gray-600 mb-4 text-sm line-clamp-2">${product.description}</p>
                ${product.details && product.details.colors ? `
                <div class="mb-3">
                    <div class="flex gap-1">
                        ${product.details.colors.slice(0, 3).map(color => `
                            <div class="w-4 h-4 rounded-full border-2 border-white shadow-sm" 
                                 style="background: ${getColorHex(color)}"
                                 title="${color}"></div>
                        `).join('')}
                        ${product.details.colors.length > 3 ? `<span class="text-xs text-gray-500 ml-1">+${product.details.colors.length - 3}</span>` : ''}
                    </div>
                </div>
                ` : ''}
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-primary-500 group-hover:text-accent-500 transition-colors duration-300">
                        ${config.currency}${product.price}
                    </span>
                    <button onclick="event.stopPropagation(); openPaymentModal(${product.id})" 
                            class="btn-primary bg-accent-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 animate-glow">
                        <i class="fas fa-shopping-cart mr-2 animate-wiggle"></i>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    productsGrid.innerHTML = productHTML;
}

// Open payment modal
function openPaymentModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Update basic product info
    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;
    modalProductName.textContent = product.name;
    modalProductDescription.textContent = product.description;
    modalProductPrice.textContent = `${config.currency}${product.price}`;
    
    // Populate features
    if (product.details && product.details.features) {
        featuresList.innerHTML = product.details.features.map(feature => 
            `<li class="flex items-center"><i class="fas fa-check text-accent-500 mr-2"></i>${feature}</li>`
        ).join('');
    }
    
    // Show/hide and populate colors
    if (product.details && product.details.colors && product.details.colors.length > 0) {
        colorsSection.classList.remove('hidden');
        colorsList.innerHTML = product.details.colors.map(color => 
            `<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">${color}</span>`
        ).join('');
    } else {
        colorsSection.classList.add('hidden');
    }
    
    // Show/hide and populate sizes
    if (product.details && product.details.sizes && product.details.sizes.length > 0) {
        sizesSection.classList.remove('hidden');
        sizesList.innerHTML = product.details.sizes.map(size => 
            `<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">${size}</span>`
        ).join('');
    } else {
        sizesSection.classList.add('hidden');
    }
    
    // Show/hide and populate compatibility
    if (product.details && product.details.compatibility && product.details.compatibility.length > 0) {
        compatibilitySection.classList.remove('hidden');
        compatibilityList.innerHTML = product.details.compatibility.map(device => 
            `<span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">${device}</span>`
        ).join('');
    } else {
        compatibilitySection.classList.add('hidden');
    }
    
    // Show/hide and populate warranty
    if (product.details && product.details.warranty) {
        warrantySection.classList.remove('hidden');
        warrantyInfo.textContent = product.details.warranty;
    } else {
        warrantySection.classList.add('hidden');
    }
    
    // Generate WhatsApp message and update button
const whatsappMessage = generateWhatsAppMessage(product);
const whatsappNumber = '233241588134'; // Use the configured WhatsApp number
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
document.getElementById('whatsapp-button').href = whatsappUrl;

// Show modal with animation
paymentModal.classList.remove('hidden');
paymentModal.classList.add('modal-show');

    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    setTimeout(() => {
        closeModalBtn.focus();
    }, 300);
}

// Close payment modal
function closePaymentModal() {
    paymentModal.classList.remove('modal-show');
    
    // Hide modal after animation
    setTimeout(() => {
        paymentModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Generate WhatsApp message
function generateWhatsAppMessage(product) {
    let message = `Hi! I'm interested in ordering this product from Odisika Mall:

🛍️ *${product.name}*
💰 Price: ${config.currency}${product.price}`;

    // Add product details if available
    if (product.details) {
        if (product.details.colors && product.details.colors.length > 0) {
            message += `\n🎨 Available Colors: ${product.details.colors.join(', ')}`;
        }
        
        if (product.details.sizes && product.details.sizes.length > 0) {
            message += `\n📏 Available Types: ${product.details.sizes.join(', ')}`;
        }
        
        if (product.details.compatibility && product.details.compatibility.length > 0) {
            message += `\n📱 Compatible with: ${product.details.compatibility.join(', ')}`;
        }
    }

    message += `

Please provide me with:
- Availability confirmation
- My preferred color/size (if applicable)
- Delivery options and timeline to my location in Ghana
- Payment methods accepted
- Final total including delivery costs

Thank you!`;

    return message;
}

// Setup event listeners
function setupEventListeners() {
    // Modal close events
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closePaymentModal);
    }
    
    // Close modal when clicking outside
    if (paymentModal) {
        paymentModal.addEventListener('click', function(e) {
            if (e.target === paymentModal) {
                closePaymentModal();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !paymentModal.classList.contains('hidden')) {
            closePaymentModal();
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add click tracking for analytics (if needed)
    document.querySelectorAll('[data-track]').forEach(element => {
        element.addEventListener('click', function() {
            const action = this.getAttribute('data-track');
            // You can add analytics tracking here
            console.log('Tracked action:', action);
        });
    });
}

// Setup intersection observer for scroll animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}


// Utility functions
function showLoading() {
    if (loadingSpinner) {
        loadingSpinner.classList.remove('hidden');
    }
}

function hideLoading() {
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
    }
}

// Handle image loading errors
function handleImageError(img) {
    img.src = 'https://via.placeholder.com/400x400/3b82f6/ffffff?text=Product+Image';
    img.alt = 'Product image not available';
}

// Add to cart functionality (for future enhancement)
function addToCart(productId) {
    // This can be enhanced to add products to a cart
    console.log('Added product to cart:', productId);
}

// Search functionality (for future enhancement)
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    return filteredProducts;
}

// Sort products functionality (for future enhancement)
function sortProducts(criteria) {
    let sortedProducts = [...products];
    
    switch(criteria) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Keep original order
            break;
    }
    
    return sortedProducts;
}

// Performance optimization: Lazy load images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // You can add error reporting here
});

// Service worker registration (for future PWA enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker can be added here for offline functionality
    });
}

// Analytics tracking (placeholder for future enhancement)
function trackEvent(action, category, label) {
    // Google Analytics or other tracking can be added here
    console.log('Event tracked:', { action, category, label });
}

// Utility function to get color hex codes
function getColorHex(colorName) {
    const colorMap = {
        'Black': '#000000',
        'White': '#FFFFFF',
        'Silver': '#C0C0C0',
        'Gold': '#FFD700',
        'Brown': '#8B4513',
        'Navy': '#000080',
        'Blue': '#0000FF',
        'Red': '#FF0000',
        'Green': '#008000',
        'Pink': '#FFC0CB',
        'Gray': '#808080',
        'Grey': '#808080',
        'Rose Gold': '#E8B4B8',
        'Beige': '#F5F5DC',
        'Tan': '#D2B48C',
        'Yellow': '#FFFF00',
        'Purple': '#800080',
        'Orange': '#FFA500'
    };
    
    // Try to match the color name, fallback to a default color
    const normalizedColor = colorName.split('/')[0].trim(); // Handle "Black/White" format
    return colorMap[normalizedColor] || '#6B7280'; // Default to gray
}

// Make functions globally available
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.handleImageError = handleImageError;
window.getColorHex = getColorHex;

document.addEventListener("DOMContentLoaded", () => {
  const multiTrack = document.getElementById("carousel-track-multi");
  const items = multiTrack.querySelectorAll(".carousel-item");
  const itemWidth = items[0].offsetWidth + 16; // 16px = gap

  let scrollAmount = 0;

  setInterval(() => {
    scrollAmount += itemWidth;

    if (scrollAmount >= multiTrack.scrollWidth - multiTrack.clientWidth) {
      scrollAmount = 0; // reset to start
    }

    multiTrack.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, 3000);
});
