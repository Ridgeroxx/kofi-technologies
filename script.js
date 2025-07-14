// Modal DOM references
const paymentModal = document.getElementById('payment-modal');
const modalProductName = document.getElementById('modal-product-name');
const modalProductDescription = document.getElementById('modal-product-description');
const modalProductImage = document.getElementById('modal-product-image');
const featuresList = document.getElementById('features-list');
const warrantyInfo = document.getElementById('warranty-info');
const modalGallery = document.getElementById('modal-gallery');
const whatsappButton = document.getElementById('whatsapp-button');

// Product data for Kofi N. Technologies
const products = [
  {
    id: 1,
    name: "Garage Doors",
    image: "images/garage doors.png",
    description: "Secure and automated garage doors.",
    details: {
      features: ["Remote control", "Durable", "Weather resistant"],
      warranty: "2-year installation warranty",
      gallery: ["images/garage doors.png", "images/gallery/garage1.jpg", "images/gallery/garage2.jpg"]
    }
  },
  {
    id: 2,
    name: "Automated Gates",
    image: "images/automated gate.jpeg",
    description: "Convenient entry with smart automation.",
    details: {
      features: ["Motion sensors", "Keypad access", "Remote opening"],
      warranty: "3-year warranty",
      gallery: ["images/automated gate.jpeg", "images/gallery/gate1.jpg", "images/gallery/gate2.jpg"]
    }
  },
  {
    id: 3,
    name: "Electric Fences",
    image: "images/electric fence.jpg",
    description: "Robust electric fencing for your property.",
    details: {
      features: ["High voltage", "Alarm system", "Durable wiring"],
      warranty: "5-year warranty",
      gallery: ["images/electric fence.jpg", "images/gallery/fence1.jpg", "images/gallery/fence2.jpg"]
    }
  },
  {
    id: 4,
    name: "CCTV Surveillance",
    image: "images/cctv.jpeg",
    description: "24/7 monitoring with HD cameras.",
    details: {
      features: ["HD quality", "Mobile access", "Night vision"],
      warranty: "2-year warranty",
      gallery: ["images/cctv.jpeg", "images/gallery/cctv1.jpg"]
    }
  },
  {
    id: 5,
    name: "Intercom Systems",
    image: "images/intercom.jpg",
    description: "Safe audio and video communication.",
    details: {
      features: ["Video call", "Indoor & outdoor units", "Clear audio"],
      warranty: "1-year warranty",
      gallery: ["images/intercom.jpg", "images/gallery/intercom1.jpg"]
    }
  },
  {
    id: 6,
    name: "Security Shutters",
    image: "images/shutter.jpeg",
    description: "Strong roller shutters for protection.",
    details: {
      features: ["Remote controlled", "Anti-rust", "Heavy-duty"],
      warranty: "3-year warranty",
      gallery: ["images/shutter.jpeg", "images/gallery/shutter1.jpg"]
    }
  },
  {
    id: 7,
    name: "Automated Gates",
    image: "images/automated gate.jpeg",
    description: "Convenient entry with smart automation.",
    details: {
      features: ["Motion sensors", "Keypad access", "Remote opening"],
      warranty: "3-year warranty",
      gallery: ["images/automated gate.jpeg", "images/gallery/gate1.jpg", "images/gallery/gate2.jpg"]
    }
  },
  {
    id: 8,
    name: "Automated Gates",
    image: "images/automated gate.jpeg",
    description: "Convenient entry with smart automation.",
    details: {
      features: ["Motion sensors", "Keypad access", "Remote opening"],
      warranty: "3-year warranty",
      gallery: ["images/automated gate.jpeg", "images/gallery/gate1.jpg", "images/gallery/gate2.jpg"]
    }
  }
];

const config = {
  whatsappNumber: '+233241588134',
  currency: 'GH₵',
  storeName: 'Kofi N. Technologies'
};

function injectProductSchemas() {
  const schema = products.map(product => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.details.gallery,
    "description": product.description,
    "brand": {
      "@type": "Organization",
      "name": config.storeName
    }
  }));

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
}

function viewFull(image) {
  const win = window.open();
  win.document.write(`<img src="${image}" style="width:100%">`);
}

function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = products.map((product, index) => `
    <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl animate-fade-in group cursor-pointer" 
         style="animation-delay: ${index * 0.1}s">
      <div class="product-image-container relative h-64 overflow-hidden" onclick="openPaymentModal(${product.id})">
        <img src="${product.image}" 
             alt="${product.name}" 
             class="product-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
             loading="lazy"
             onerror="this.src='https://via.placeholder.com/400x400/3b82f6/ffffff?text=Product+Image'">
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
          <span class="bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
            ✨ Premium
          </span>
        </div>
      </div>
      <div class="p-6">
        <h3 class="font-bold text-xl text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">${product.name}</h3>
        <p class="text-gray-600 mb-4 text-sm line-clamp-2">${product.description}</p>
        <div class="flex justify-end items-center">
          <button onclick="event.stopPropagation(); openPaymentModal(${product.id})" 
                  class="btn-primary bg-accent-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 animate-glow">
            <i class="fas fa-shopping-cart mr-2 animate-wiggle"></i>
            View More
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  injectProductSchemas();
  renderProducts();
});


// Open payment modal
function openPaymentModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Show modal
  document.getElementById("payment-modal").classList.remove("hidden");

  // Fill modal
  document.getElementById("modal-product-name").textContent = product.name;
  document.getElementById("modal-product-description").textContent = product.description;
  document.getElementById("modal-product-image").src = product.image;

  // Features
  const featuresList = document.getElementById("features-list");
  if (featuresList) {
    featuresList.innerHTML = product.details.features.map(f => `<li>✅ ${f}</li>`).join('');
  }

  // Warranty
  const warranty = product.details.warranty || "None";
  document.getElementById("warranty-info").textContent = warranty;

  // Gallery thumbnails
  const gallery = product.details.gallery || [];
  const modalGallery = document.getElementById("modal-gallery");
  if (modalGallery) {
    modalGallery.innerHTML = gallery.map(img =>
      `<img src="${img}" class="h-16 w-16 rounded object-cover border hover:scale-105 transition cursor-pointer" onclick="viewFull('${img}')">`
    ).join('');
  }

  // WhatsApp Button
  const msg = generateWhatsAppMessage(product);
  const url = `https://wa.me/${config.whatsappNumber.replace("+", "")}?text=${encodeURIComponent(msg)}`;
  document.getElementById("whatsapp-button").href = url;
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
  document.getElementById("payment-modal").classList.add("hidden");
}
function viewFull(image) {
  const win = window.open();
  win.document.write(`<img src="${image}" style="width:100%;border-radius:8px">`);
}

    // Hide modal after animation
    setTimeout(() => {
        paymentModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Generate WhatsApp message
function generateWhatsAppMessage(product) {
    let message = `Hello, I’m interested in purchasing & Installing the following product from *Kofi N. Technologies*:

🛍️ *Product:* ${product.name}
💰 *Price:* ${config.currency}${product.price}`;

    // Add optional details
    if (product.details) {
        if (product.details.colors?.length) {
            message += `\n🎨 *Available Colors:* ${product.details.colors.join(', ')}`;
        }

        if (product.details.sizes?.length) {
            message += `\n📐 *Available Types/Sizes:* ${product.details.sizes.join(', ')}`;
        }

        if (product.details.compatibility?.length) {
            message += `\n📱 *Compatibility:* ${product.details.compatibility.join(', ')}`;
        }
    }

    message += `

Kindly assist with the following:
1. Confirm availability
2. Provide any current offers or bundles
3. Share delivery options to my location
4. Let me know the total cost (including delivery)
5. Payment methods (MoMo, Bank Transfer, Cash, etc.)

Looking forward to your response. Thank you!`;

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
