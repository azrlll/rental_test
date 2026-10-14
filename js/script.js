document.addEventListener('DOMContentLoaded', () => {
    
    /* =======================================================
                1. GLOBAL SCROLL ANIMATIONS & EFFECTS
       ======================================================= */
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const animatedSelectors = [
        '.hero-content h1', '.hero-content p', '.hero-buttons', '.hero-widget',
        '.section-title', '.section-subtitle', '.section-header',
        '.fleet-card', '.stat-card', '.a-stat-card', '.value-box', 
        '.split-row', '.pillar-card', '.eco-card', '.support-card', 
        '.action-card', '.info-card', '.timeline-row', '.t-feature-card',
        '.p-item', '.p-grid-item', '.policy-intro-banner', 
        '.review-card', '.aggregate-dashboard'
    ];

    const elementsToReveal = document.querySelectorAll(animatedSelectors.join(', '));
    elementsToReveal.forEach(el => el.classList.add('reveal-up'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);
        intersectingEntries.forEach((entry, index) => {
            setTimeout(() => {
                entry.target.classList.add('is-visible');
            }, index * 100); 
            observer.unobserve(entry.target);
        });
    }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    elementsToReveal.forEach(el => revealObserver.observe(el));

    /* =======================================================
            2. HEADER ACCOUNT DROPDOWN LOGIC (ALL PAGES)
       ======================================================= */
    const accountTrigger = document.getElementById('accountTrigger');
    const accountDropdown = document.getElementById('accountDropdown');
    const closeDropdown = document.getElementById('closeDropdown');

    if (accountTrigger && accountDropdown) {
        
        // Toggle dropdown on click
        accountTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); 
            
            accountDropdown.classList.toggle('show');
            accountTrigger.classList.toggle('active');
            
            // Flip the arrow icon up/down
            const chevron = accountTrigger.querySelector('.chevron-icon');
            if (chevron) {
                if (chevron.classList.contains('fa-chevron-down')) {
                    chevron.classList.replace('fa-chevron-down', 'fa-chevron-up');
                } else {
                    chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            }
        });

        // Close when clicking the 'X' button
        if (closeDropdown) {
            closeDropdown.addEventListener('click', (e) => {
                e.preventDefault();
                accountDropdown.classList.remove('show');
                accountTrigger.classList.remove('active');
                
                const chevron = accountTrigger.querySelector('.chevron-icon');
                if (chevron) chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
            });
        }

        // Close when clicking anywhere else on the page
        document.addEventListener('click', (e) => {
            if (!accountTrigger.contains(e.target) && !accountDropdown.contains(e.target)) {
                if (accountDropdown.classList.contains('show')) {
                    accountDropdown.classList.remove('show');
                    accountTrigger.classList.remove('active');
                    
                    const chevron = accountTrigger.querySelector('.chevron-icon');
                    if (chevron) chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            }
        });

        // Prevent clicks inside the dropdown from closing it
        accountDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    /* =======================================================
                        3. HOME PAGE LOGIC
       ======================================================= */
    const copyBtn = document.getElementById('copyBtn');
    const promoText = document.getElementById('promoText');

    if (copyBtn && promoText) {
        copyBtn.addEventListener('click', () => {
            const codeToCopy = promoText.innerText;
            navigator.clipboard.writeText(codeToCopy).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'COPIED';
                copyBtn.style.backgroundColor = 'var(--light-blue)';
                copyBtn.style.color = 'var(--white)';
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.backgroundColor = '';
                    copyBtn.style.color = '';
                }, 2000);
            }).catch(err => console.error('Failed to copy code: ', err));
        });
    }

    const homeReserveForm = document.getElementById('reserveForm');
    if (homeReserveForm) {
        homeReserveForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'rental.html';
        });
    }

    /* =======================================================
                    4. RENTAL PAGE LOGIC
       ======================================================= */
    const searchForm = document.getElementById('rentalSearchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Updating search results based on selected parameters.');
        });
    }

    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            const formattedValue = new Intl.NumberFormat('en-PH').format(value);
            const labelSpan = e.target.previousElementSibling.querySelector('span');
            if (labelSpan) labelSpan.innerText = `Up to ₱${formattedValue} / day`;
        });
    }

    const filterPills = document.querySelectorAll('.filter-pills .pill');
    if (filterPills.length > 0) {
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
        });
    }

    const viewBtns = document.querySelectorAll('.view-btn');
    if (viewBtns.length > 0) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    /* =======================================================
                    5. HELP PAGE & ACCORDION LOGIC
       ======================================================= */
    const accordions = document.querySelectorAll('.accordion-header');
    if (accordions.length > 0) {
        accordions.forEach(acc => {
            acc.addEventListener('click', () => {
                const item = acc.parentElement;
                const icon = acc.querySelector('.toggle-icon i');
                
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                    icon.classList.replace('fa-minus', 'fa-plus');
                } else {
                    item.classList.add('active');
                    icon.classList.replace('fa-plus', 'fa-minus');
                }
            });
        });
    }

    /* =======================================================
                    6. POLICIES PAGE LOGIC
       ======================================================= */
    const tocLinks = document.querySelectorAll('.toc-menu a');
    const articles = document.querySelectorAll('.policy-article');

    if (tocLinks.length > 0 && articles.length > 0) {
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const y = targetElement.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            });
        });

        const articleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tocLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.toc-menu a[href="#${entry.target.id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, { root: null, rootMargin: '-120px 0px -60% 0px', threshold: 0 });

        articles.forEach(article => articleObserver.observe(article));
    }
});

/*  =======================================================
                    LOGIN PAGE LOGIC
    ======================================================= */
    const togglePw = document.getElementById('togglePw');
    const pwInput = document.getElementById('passwordInput');
    
    if (togglePw && pwInput) {
        togglePw.addEventListener('click', () => {
            if (pwInput.type === 'password') {
                pwInput.type = 'text';
                togglePw.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                pwInput.type = 'password';
                togglePw.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }

    /* =======================================================
                        ADMIN LOGIN PAGE LOGIC
       ======================================================= */
const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            // Redirects to the new admin confirmation screen
            window.location.href = 'admin-confirm.html';
        });
    }

    const toggleAdminPw = document.getElementById('toggleAdminPw');
    const adminPwInput = document.getElementById('adminPasswordInput');
    
    if (toggleAdminPw && adminPwInput) {
        toggleAdminPw.addEventListener('click', () => {
            if (adminPwInput.type === 'password') {
                adminPwInput.type = 'text';
                toggleAdminPw.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                adminPwInput.type = 'password';
                toggleAdminPw.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }
    
    /* =======================================================
            UNIVERSAL AUTHENTICATION & VALIDATION LOGIC
       ======================================================= */

    // 1. Universal Password Visibility Toggle (Works on all pages)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('toggle-pw')) {
            // Find the input field immediately before the clicked eye icon
            const passwordInput = e.target.previousElementSibling;
            
            if (passwordInput && passwordInput.tagName === 'INPUT') {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    e.target.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    e.target.classList.replace('fa-eye-slash', 'fa-eye');
                }
            }
        }
    });

    // 2. Registration Form Data Retention & Validation
    const registerForm = document.getElementById('registerForm'); // Ensure your <form> has id="registerForm"
    const regPw = document.getElementById('regPassword');
    const regConfirmPw = document.getElementById('regConfirmPassword');

    if (registerForm && regPw && regConfirmPw) {
        registerForm.addEventListener('submit', (e) => {
            if (regPw.value !== regConfirmPw.value) {
                // CRITICAL: This stops the page from reloading and deleting the typed name/email
                e.preventDefault(); 
                
                // Alert the user and clear ONLY the confirm password field for them to try again
                alert('Passwords do not match. Please check your spelling and try again.');
                regConfirmPw.value = '';
                regConfirmPw.focus();
                
            } else {
                // If they match, proceed to the confirmation screen
                e.preventDefault(); 
                window.location.href = 'login-confirm.html';
            }
        });
    }

    // Universal "Show Password" Checkbox Toggle (Bulletproof Version)
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('universal-show-pw')) {
            
            // 1. Grab all possible password fields from all 3 pages
            const regPw = document.getElementById('regPassword');
            const regConfirm = document.getElementById('regConfirmPassword');
            const userLogin = document.getElementById('passwordInput');
            const adminLogin = document.getElementById('adminPasswordInput');

            // 2. Decide if we are showing or hiding
            const newType = e.target.checked ? 'text' : 'password';

            // 3. Apply the change to whichever fields are currently on the screen
            if (regPw) regPw.type = newType;
            if (regConfirm) regConfirm.type = newType;
            if (userLogin) userLogin.type = newType;
            if (adminLogin) adminLogin.type = newType;
        }
    });