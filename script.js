// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect - change when scrolling past hero section
window.addEventListener('scroll', function() {
    const header = document.querySelector('header.navbar');
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Change header when scrolling past the hero section
        if (scrollPosition > heroHeight - 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    } else {
        // Fallback: change after 50px scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section background only (removed transform on section)
// The parallax is now handled via CSS background-attachment: fixed

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe placeholder sections for future animations
document.querySelectorAll('.section-placeholder').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add fade-in animation for About Me section
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target.querySelector('.id-card-container');
                const content = entry.target.querySelector('.about-content');
                
                if (image) {
                    setTimeout(() => {
                        image.style.opacity = '1';
                        image.style.transform = 'translateY(0)';
                        image.style.transition = 'opacity 0.8s ease, transform 0.5s ease';
                        image.classList.add('animated-in');
                    }, 200);
                }
                if (content) {
                    setTimeout(() => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 400);
                }
            }
        });
    }, observerOptions);
    
    aboutObserver.observe(aboutSection);
}

// ID Card Flip Functionality
const idCard = document.getElementById('idCard');
if (idCard) {
    idCard.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
}

// Add fade-in animation for Services section
const servicesSection = document.querySelector('.services-section');
if (servicesSection) {
    const servicesObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const serviceCards = entry.target.querySelectorAll('.service-card');
                const softwareIcons = entry.target.querySelectorAll('.software-icon-item');
                
                // Animate service cards with staggered delay
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Animate software icons with staggered delay
                softwareIcons.forEach((icon, index) => {
                    setTimeout(() => {
                        icon.style.opacity = '1';
                        icon.style.transform = 'translateY(0)';
                    }, 400 + (index * 100));
                });
            }
        });
    }, observerOptions);
    
    servicesObserver.observe(servicesSection);
}

// Add fade-in animation for Portfolio section
const portfolioSection = document.querySelector('.portfolio-section');
if (portfolioSection) {
    const portfolioObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const portfolioItems = entry.target.querySelectorAll('.portfolio-item');
                
                // Animate portfolio items with staggered delay
                portfolioItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    portfolioObserver.observe(portfolioSection);
}

// Portfolio filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Mobile menu close on link click
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinksMobile = document.querySelectorAll('.navbar-nav .nav-link');

navLinksMobile.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth < 992) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Gallery Lightbox Functionality
(function() {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;

    const mainImage = document.getElementById('galleryMainImage');
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const closeBtn = document.getElementById('galleryClose');
    const zoomBtn = document.getElementById('galleryZoom');
    const fullscreenBtn = document.getElementById('galleryFullscreen');

    let currentIndex = 0;
    let images = [];
    let thumbnails = [];

    // Initialize gallery from work-gallery items
    function initGallery() {
        const galleryItems = document.querySelectorAll('.work-gallery-item img');
        if (galleryItems.length === 0) return;

        images = Array.from(galleryItems).map(img => img.src);
        thumbnails = Array.from(galleryItems).map(img => img.src);

        // Create thumbnails
        thumbnailsContainer.innerHTML = '';
        thumbnails.forEach((thumb, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = thumb;
            thumbnail.className = 'gallery-lightbox-thumbnail';
            thumbnail.dataset.index = index;
            thumbnail.addEventListener('click', () => goToImage(index));
            thumbnailsContainer.appendChild(thumbnail);
        });

        // Add click handlers to gallery items
        galleryItems.forEach((img, index) => {
            const galleryItem = img.parentElement;
            galleryItem.style.cursor = 'pointer';
            galleryItem.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openGallery(index);
            });
        });
    }

    function openGallery(index) {
        currentIndex = index;
        updateGallery();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateGallery() {
        if (images.length === 0) return;

        mainImage.src = images[currentIndex];
        
        // Reset zoom when changing images
        mainImage.style.transform = 'scale(1)';

        // Update active thumbnail
        const thumbnails = thumbnailsContainer.querySelectorAll('.gallery-lightbox-thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === currentIndex) {
                thumb.classList.add('active');
                // Scroll thumbnail into view
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    function goToImage(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentIndex = index;
        updateGallery();
    }

    function nextImage() {
        goToImage(currentIndex + 1);
    }

    function prevImage() {
        goToImage(currentIndex - 1);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (closeBtn) closeBtn.addEventListener('click', closeGallery);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeGallery();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeGallery();
        }
    });

    // Fullscreen functionality
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                mainImage.requestFullscreen().catch(err => {
                    console.log('Error attempting to enable fullscreen:', err);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }

    // Zoom functionality (simple toggle)
    if (zoomBtn) {
        zoomBtn.addEventListener('click', function() {
            if (mainImage.style.transform === 'scale(2)') {
                mainImage.style.transform = 'scale(1)';
            } else {
                mainImage.style.transform = 'scale(2)';
            }
            mainImage.style.transition = 'transform 0.3s ease';
        });
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }
})();

