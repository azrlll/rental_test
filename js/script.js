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
        accountTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); 
            
            accountDropdown.classList.toggle('show');
            accountTrigger.classList.toggle('active');
            
            const chevron = accountTrigger.querySelector('.chevron-icon');
            if (chevron) {
                if (chevron.classList.contains('fa-chevron-down')) {
                    chevron.classList.replace('fa-chevron-down', 'fa-chevron-up');
                } else {
                    chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            }
        });

        if (closeDropdown) {
            closeDropdown.addEventListener('click', (e) => {
                e.preventDefault();
                accountDropdown.classList.remove('show');
                accountTrigger.classList.remove('active');
                
                const chevron = accountTrigger.querySelector('.chevron-icon');
                if (chevron) chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
            });
        }

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
                
                if (item.classList.contains('active') || item.classList.contains('open')) {
                    item.classList.remove('active', 'open');
                    const body = item.querySelector('.accordion-body');
                    if (body) body.style.display = 'none';
                    if (icon) icon.classList.replace('fa-minus', 'fa-plus');
                } else {
                    item.classList.add('active', 'open');
                    const body = item.querySelector('.accordion-body');
                    if (body) body.style.display = 'block';
                    if (icon) icon.classList.replace('fa-plus', 'fa-minus');
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

    /* =======================================================
                        7. CUSTOMER LOGIN PAGE LOGIC
       ======================================================= */
    const customerLoginForm = document.querySelector('.login-main .login-form:not(#adminLoginForm)');

    if (customerLoginForm) {
        customerLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = customerLoginForm.querySelector('input[type="email"]');
            const pwInput = customerLoginForm.querySelector('#passwordInput');

            if ((pwInput && pwInput.value.length < 6) || (emailInput && emailInput.value.includes('fail'))) {
                window.location.href = 'invalid-input.html';
            } else {
                window.location.href = 'login-confirm.html';
            }
        });
    }

    /* =======================================================
                        8. ADMIN LOGIN PAGE LOGIC
       ======================================================= */
    const adminLoginForm = document.getElementById('adminLoginForm') || document.querySelector('.admin-main .login-form');

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const adminEmail = adminLoginForm.querySelector('input[type="email"]');
            const adminPw = adminLoginForm.querySelector('#adminPasswordInput');

            if ((adminEmail && !adminEmail.value.endsWith('@drivesphere.ph')) || (adminPw && adminPw.value.length < 6)) {
                window.location.href = 'invalid-input.html';
            } else {
                window.location.href = 'admin-confirm.html';
            }
        });
    }
    
    /* =======================================================
            9. UNIVERSAL AUTHENTICATION & VALIDATION LOGIC
       ======================================================= */

    // A. Universal Password Visibility Toggle
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('toggle-pw')) {
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

    // B. Customer Registration Form
    const registerForm = document.getElementById('registerForm'); 
    const regPw = document.getElementById('regPassword');
    const regConfirmPw = document.getElementById('regConfirmPassword');

    if (registerForm && regPw && regConfirmPw) {
        registerForm.addEventListener('submit', (e) => {
            if (regPw.value !== regConfirmPw.value) {
                e.preventDefault(); 
                alert('Passwords do not match. Please check your spelling and try again.');
                regConfirmPw.value = '';
                regConfirmPw.focus();
            } else {
                e.preventDefault(); 
                window.location.href = 'register-confirm.html';
            }
        });
    }

    // C. Admin Registration Form
    const adminRegisterForm = document.getElementById('adminRegisterForm');
    const adminRegPw = document.getElementById('adminRegPassword');
    const adminRegConfirmPw = document.getElementById('adminRegConfirmPassword');

    if (adminRegisterForm && adminRegPw && adminRegConfirmPw) {
        adminRegisterForm.addEventListener('submit', (e) => {
            if (adminRegPw.value !== adminRegConfirmPw.value) {
                e.preventDefault(); 
                alert('Passwords do not match. Please check your spelling and try again.');
                adminRegConfirmPw.value = '';
                adminRegConfirmPw.focus();
            } else {
                e.preventDefault();
                window.location.href = 'admin-confirm.html';
            }
        });
    }

    // D. Universal "Show Password" Checkbox Toggle
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('universal-show-pw')) {
            const passFields = [
                document.getElementById('regPassword'),
                document.getElementById('regConfirmPassword'),
                document.getElementById('passwordInput'),
                document.getElementById('adminPasswordInput'),
                document.getElementById('adminRegPassword'),
                document.getElementById('adminRegConfirmPassword')
            ];

            const newType = e.target.checked ? 'text' : 'password';

            passFields.forEach(field => {
                if (field) field.type = newType;
            });
        }
    });

    /* =======================================================
        10. AUTOMATIC ACTIVE PAGE NAVIGATION HIGHLIGHTER
       ======================================================= */

    // Route login confirmation directly to Customer Portal
    if (window.location.pathname.includes('login-confirm.html')) {
        const confirmBtn = document.querySelector('.confirm-card-wrapper a.btn-dark-full');
        if (confirmBtn) {
            confirmBtn.setAttribute('href', 'customer-rent.html');
            confirmBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'customer-rent.html';
            });
        }
    }

    // Auto-Active Navigation Tab Switcher
    const updateActivePortalTab = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'customer-rent.html';
        const currentHash = window.location.hash;
        const navLinks = document.querySelectorAll('.customer-nav a');

        if (navLinks.length === 0) return;

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            const targetPage = href.split('/').pop().split('#')[0];

            link.classList.remove('active', 'c-nav-pill');
            link.classList.add('c-nav-link');

            if (currentPath === 'customer-about.html' && targetPage === 'customer-about.html') {
                link.classList.add('active');
            } else if (currentPath === 'customer-help.html' && targetPage === 'customer-help.html') {
                link.classList.add('active');
            } else if ((currentPath === 'rental.html' || currentHash === '#vehicleSearchInput') && (targetPage === 'rental.html' || href.includes('#vehicleSearchInput'))) {
                link.classList.add('active');
            } else if ((currentPath === 'customer-rent.html' || currentPath === '') && currentHash !== '#vehicleSearchInput' && targetPage === 'customer-rent.html') {
                link.classList.add('active');
            }
        });
    };

    updateActivePortalTab();
    window.addEventListener('hashchange', updateActivePortalTab);

    /* =======================================================
        11. VEHICLE FILTERING & FAVORITES LOGIC
       ======================================================= */

    const portalCategoryPills = document.querySelectorAll('.pfs-pills-row .c-pill');
    const portalVehicleCards = document.querySelectorAll('.portal-vehicle-card');

    if (portalCategoryPills.length > 0 && portalVehicleCards.length > 0) {
        portalCategoryPills.forEach(pill => {
            pill.addEventListener('click', () => {
                portalCategoryPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const selectedCategory = pill.getAttribute('data-category');

                portalVehicleCards.forEach(card => {
                    const cardCategory = card.querySelector('.v-category')?.innerText.toLowerCase() || '';
                    
                    if (selectedCategory === 'all') {
                        card.style.display = 'block';
                    } else if (selectedCategory === 'suv' && cardCategory.includes('suv')) {
                        card.style.display = 'block';
                    } else if (selectedCategory === 'sedan' && cardCategory.includes('sedan')) {
                        card.style.display = 'block';
                    } else if (selectedCategory === 'van' && cardCategory.includes('van')) {
                        card.style.display = 'block';
                    } else if (selectedCategory === 'electric' && (cardCategory.includes('electric') || cardCategory.includes('hatch'))) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    const vehicleSearchInput = document.getElementById('vehicleSearchInput');
    if (vehicleSearchInput && portalVehicleCards.length > 0) {
        vehicleSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            portalVehicleCards.forEach(card => {
                const title = card.querySelector('.v-title')?.innerText.toLowerCase() || '';
                const category = card.querySelector('.v-category')?.innerText.toLowerCase() || '';
                const status = card.querySelector('.status-tag')?.innerText.toLowerCase() || '';

                if (title.includes(query) || category.includes(query) || status.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    const favHearts = document.querySelectorAll('.btn-fav-heart');
    if (favHearts.length > 0) {
        favHearts.forEach(heart => {
            heart.addEventListener('click', () => {
                const icon = heart.querySelector('i');
                heart.classList.toggle('active');
                if (icon.classList.contains('fa-regular')) {
                    icon.classList.replace('fa-regular', 'fa-solid');
                } else {
                    icon.classList.replace('fa-solid', 'fa-regular');
                }
            });
        });
    }

}); // End of DOMContentLoaded