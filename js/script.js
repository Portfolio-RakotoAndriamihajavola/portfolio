// This file contains the JavaScript code for the portfolio. 
// It may include functionality such as event handling, animations, or dynamic content updates.

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu after clicking
            const navList = document.querySelector('.nav-list');
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navList = document.querySelector('.nav-list');
    hamburger.addEventListener('click', function() {
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('active');
        }
    });

    // Example: Dynamic content update (if needed)
    const updateButton = document.getElementById('updateContent');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            const contentArea = document.getElementById('content');
            contentArea.innerHTML = '<p>New content has been loaded!</p>';
        });
    }

    // Lightbox image zoom
    const lightboxOverlay = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('imageLightboxContent');
    const pdfLightbox = document.getElementById('pdfLightboxContent');
    const lightboxClose = document.getElementById('imageLightboxClose');


    document.querySelectorAll('.project-images img, .image-group img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            // Si c'est une miniature PDF, ouvrir le PDF dans le lightbox
            if (img.dataset && img.dataset.pdf) {
                lightboxImage.style.display = 'none';
                pdfLightbox.style.display = 'block';
                pdfLightbox.src = img.dataset.pdf;
                lightboxOverlay.classList.add('active');
                return;
            }
            // Sinon, afficher l'image normale
            lightboxImage.style.display = 'block';
            pdfLightbox.style.display = 'none';
            pdfLightbox.src = '';
            lightboxImage.src = img.src;
            lightboxOverlay.classList.add('active');
        });
    });

    // Boutons PDF BIM
    document.querySelectorAll('.bim-pdf-thumb').forEach(btn => {
        btn.addEventListener('click', () => {
            lightboxImage.style.display = 'none';
            pdfLightbox.style.display = 'block';
            pdfLightbox.src = btn.dataset.pdf;
            lightboxOverlay.classList.add('active');
        });
    });

    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        lightboxImage.src = '';
        lightboxImage.style.display = 'block';
        pdfLightbox.style.display = 'none';
        pdfLightbox.src = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
});