document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Before/After Slider (Input Range based)
    const initSlider = () => {
        const container = document.querySelector('.slider-container');
        if (!container) return;
        
        const overlay = document.querySelector('.img-comp-overlay');
        const sliderInput = document.createElement('input');
        sliderInput.type = 'range';
        sliderInput.min = '0';
        sliderInput.max = '100';
        sliderInput.value = '50';
        
        container.appendChild(sliderInput);

        const updateSlider = (val) => {
            overlay.style.width = val + '%';
        };

        sliderInput.addEventListener('input', (e) => {
            updateSlider(e.target.value);
        });
    };
    initSlider();

    // Enquiry Form Submission (WhatsApp Integration)
    const enquiryForm = document.getElementById('enquiryForm');
    const formError = document.getElementById('formError');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formError.style.display = 'none';

            const name = document.getElementById('customerName').value.trim();
            const phone = document.getElementById('contactNumber').value.trim();
            const service = document.getElementById('serviceRequired').value;
            const location = document.getElementById('location').value.trim();

            // Simple validation
            if (!name || !phone || !service || !location) {
                formError.textContent = 'Please fill all required fields.';
                formError.style.display = 'block';
                return;
            }

            // Location Validation for Bodinayakanur
            const locationLower = location.toLowerCase();
            if (!locationLower.includes('bodi') && !locationLower.includes('bodinayakanur')) {
                formError.textContent = 'Sorry, our painting services are currently available only in Bodinayakanur.';
                formError.style.display = 'block';
                return;
            }

            // WhatsApp Message Generation
            const businessNumber = '919150416608';
            
            const message = `Hello SOWDUMUTHU & THIRUPATHI,

*New Painting Enquiry*

Customer Name: ${name}
Contact Number: ${phone}
Service Required: ${service}
Location: ${location}

Please contact me regarding this enquiry.

Thank you.`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Optional: reset form
            // enquiryForm.reset();
        });
    }
});
