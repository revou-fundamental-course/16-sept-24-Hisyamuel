// Ini Sambutan //
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        if (window.customNotify) {
            window.customNotify.showConfirm(
                "Halo! Selamat datang. Silahkan masukkan nama Anda :",
                (namaInput) => {
                    const name = namaInput && namaInput.trim() !== "" ? namaInput : "Guest";
                    const userElement = document.getElementById("user");
                    if (userElement) {
                        userElement.innerText = name;
                        window.customNotify.showToast(`Halo ${name}, selamat datang di web portfolio saya`, "info");
                    }
                },
                () => {
                    window.customNotify.showToast("Menjelajah sebagai Tamu", "info");
                },
                {
                    title: "Greetings!",
                    confirmText: "Simpan",
                    cancelText: "Lewati"
                }
            );
        }
    }, 1500);
});

// Dark Mode //
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Cek preferensi tersimpan
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.replace('ph-moon', 'ph-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('ph-moon', 'ph-sun');
    } else {
        localStorage.setItem('theme', 'light');
        icon.classList.replace('ph-sun', 'ph-moon');
    }
});

// Navigasi //
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    // Toggle class 'active' pada hamburger dan nav-menu saat diklik
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Tutup menu saat link diklik (opsional)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// Form submission using Fetch to Formspree
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formspreeEndpoint = 'https://formspree.io/f/mrekpbkl';

    let name = document.getElementById('name').value;
    let birth = document.getElementById('birth').value;
    let gender = document.getElementById('gender').value;
    let message = document.getElementById('message').value;

    if (name === "" || birth === "" || gender === "" || message === "") {
        alert('Pesan Harus Terisi');
        return;
    }

    const formData = new FormData(this);

    fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            window.customNotify.showToast('Your message has been sent successfully!', "success");
            document.getElementById('contact-form').reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    window.customNotify.showToast(data["errors"].map(error => error["message"]).join(", "), "error");
                } else {
                    window.customNotify.showToast('Oops! There was a problem submitting your form', "error");
                }
            })
        }
    }).catch(error => {
        console.error('Error:', error);
        window.customNotify.showToast('Oops! There was a problem submitting your form', "error");
    });
});

// Logic Kembali Ke Atas
const backToTopBtn = document.getElementById("backToTopBtn");

if (backToTopBtn) {
    // Memantau Scroll User
    window.addEventListener("scroll", () => {
        // Jika scroll lebih dari 300px ke bawah, akan memunculkan tombol
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    // Aksi Klik (Scroll ke Atas)
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const revealGroups = [
        // Hero Section
        { selector: '.hero-content .greeting, .hero-content .hero-title, .hero-content .hero-subtitle, .hero-content .hero-desc', type: 'rise', stagger: 110 },
        { selector: '.social-list .icon-content', type: 'square', stagger: 90, baseDelay: 350 },
        { selector: '.hero-image', type: 'frame', stagger: 0, baseDelay: 200 },

        // Judul Tiap Seksi
        { selector: '.section-title', type: 'title', stagger: 0 },

        // About Me
        { selector: '.about-content p', type: 'slide-left', stagger: 0, baseDelay: 100 },
        { selector: '.slider-frame', type: 'frame', stagger: 0, baseDelay: 200 },

        // Kartu Education & Project (Muncul satu-persatu per grid)
        { selector: '.education-grid .education-card', type: 'card', stagger: 150 },
        { selector: '.project-grid .project-card', type: 'card', stagger: 140 },

        // Jalur Marquee Tech Stack & Certifications
        { selector: '.slider-container', type: 'marquee', stagger: 0, baseDelay: 100 },

        // Baris Daftar Experiences (Muncul satu-persatu ke bawah)
        { selector: '.timeline-container .timeline-item', type: 'row', stagger: 90 },

        // Form Message & Input di dalamnya
        { selector: '.form-container', type: 'card', stagger: 0 },
        { selector: '#contact-form > *', type: 'rise', stagger: 100, baseDelay: 150 },

        // Kolom Footer
        { selector: '.footer-container .footer-section', type: 'card', stagger: 130 }
    ];

    const targets = [];

    revealGroups.forEach(({ selector, type, stagger = 0, baseDelay = 0 }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.setAttribute('data-reveal', type);
            el.style.setProperty('--reveal-delay', `${baseDelay + index * stagger}ms`);
            targets.push(el);
        });
    });

    // Aktifkan state siap animasi setelah seluruh target ditandai
    document.documentElement.classList.add('reveal-ready');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    targets.forEach((el) => observer.observe(el));
});


