document.addEventListener('DOMContentLoaded', function() {
    // Countdown timer
    const weddingDate = new Date('December 08, 2025 11:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown').innerHTML = "<h3>È arrivato il grande giorno!</h3>";
        }
    }
    
    updateCountdown(); // Run once immediately
    const countdownTimer = setInterval(updateCountdown, 1000);
    
    // Sticky Navigation
    const nav = document.getElementById('main-nav');
    const navOffset = nav.offsetTop;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > navOffset) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
    
    // Map links
    const mapLinks = document.querySelectorAll('.map-link');
    const googleMap = document.getElementById('google-map');
    
    mapLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const mapUrl = link.getAttribute('data-map');
            googleMap.src = mapUrl;
            document.getElementById('map-container').scrollIntoView({ behavior: 'smooth' });
        });
    });
    

    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all items
            faqItems.forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Guestbook form submission
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookMessages = document.getElementById('guestbook-messages');
    
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('guestbook-name').value;
            const message = document.getElementById('guestbook-message').value;
            const date = new Date().toLocaleDateString('it-IT');
            
            // Create new message element
            const messageElement = document.createElement('div');
            messageElement.classList.add('guestbook-message');
            messageElement.innerHTML = `
                <div class="guestbook-message-header">
                    <span class="guestbook-message-name">${name}</span>
                    <span class="guestbook-message-date">${date}</span>
                </div>
                <div class="guestbook-message-content">
                    <p>${message}</p>
                </div>
            `;
            
            // Add to the messages container
            guestbookMessages.prepend(messageElement);
            
            // Reset form
            guestbookForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                menu.classList.remove('active');
            }
        });
    });

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});