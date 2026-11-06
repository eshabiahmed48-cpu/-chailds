document.addEventListener('DOMContentLoaded', () => {
    
    // 1. التبديل بين تبويبات (إن وجدت)
    const tabs = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('loginForm');
    const registerFormTab = document.getElementById('registerFormTab');

    if (tabs.length > 0 && loginForm && registerFormTab) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                if (tab.dataset.tab === 'login') {
                    loginForm.classList.remove('hidden');
                    registerFormTab.classList.add('hidden');
                } else {
                    loginForm.classList.add('hidden');
                    registerFormTab.classList.remove('hidden');
                }
            });
        });
    }

    // 2. القائمة المنسدلة للهواتف
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // 3. التحقق من تطابق كلمة المرور في صفحة إنشاء الحساب
    const regForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordError = document.getElementById('passwordError');

    if (regForm && passwordInput && confirmPasswordInput && passwordError) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            if (passwordInput.value !== confirmPasswordInput.value) {
                passwordError.style.display = 'block';
                confirmPasswordInput.focus();
            } else {
                passwordError.style.display = 'none';
                showNotification('تم إنشاء الحساب بنجاح! جاري تحويلك...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        });
    }

    // 4. التعامل مع نموذج تسجيل الدخول
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('تم تسجيل الدخول بنجاح! جاري تحويلك...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // 5. التعامل مع نموذج تواصل معنا
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            contactForm.reset();
        });
    }

    // دالة إظهار الإشعارات
    window.showNotification = function(message, type = 'success') {
        const notif = document.createElement('div');
        notif.textContent = message;
        notif.style.cssText = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background: ${type === 'success' ? '#2e7d32' : '#c62828'}; 
            color: white; padding: 15px 30px; border-radius: 30px; 
            z-index: 9999; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            font-family: 'Segoe UI', Tahoma, sans-serif;
            text-align: center; min-width: 300px;
        `;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }
});

// دالة إضافة للسلة (تعمل من صفحة المنتجات)
function addToCart() {
    let cartCount = document.getElementById('cartCount');
    if (cartCount) {
        let currentCount = parseInt(cartCount.innerText) || 0;
        cartCount.innerText = currentCount + 1;
        // إظهار إشعار
        if(window.showNotification) {
            window.showNotification('تمت إضافة المنتج إلى السلة!', 'success');
        } else {
            alert('تمت إضافة المنتج إلى السلة!');
        }
    }
}
