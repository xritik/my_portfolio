/* =============================================
   RITIK SINGH — PORTFOLIO SCRIPT
   - Theme Toggle (Dark / Light)
   - Mobile Nav
   - Typed Text Animation
   - Scroll-Based Reveal Animations
   - Active Nav Links on Scroll
   - Contact Form via EmailJS
   - CV Download Handler
============================================= */

// ─── EmailJS Configuration ──────────────────────
// 1. Sign up at https://www.emailjs.com (free plan)
// 2. Create an Email Service (Gmail) → get SERVICE_ID
// 3. Create an Email Template with these variables:
//    {{from_name}}, {{from_email}}, {{phone}}, {{subject}}, {{message}}
//    Set "To Email" as: tech.ritiksingh@gmail.com
// 4. Get your PUBLIC_KEY from Account → API Keys
// 5. Replace the placeholders below:

const EMAILJS_PUBLIC_KEY  = 'ThOPiwsR8Ack3sNDK';    // ← Replace
const EMAILJS_SERVICE_ID  = 'service_hs28v5o';    // ← Replace
const EMAILJS_TEMPLATE_ID = 'templete_onyj93v';   // ← Replace

// ─── Init EmailJS ────────────────────────────────
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
})();

// ─── Theme Toggle ────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ─── Mobile Nav ──────────────────────────────────
const menuIcon = document.getElementById('menu-icon');
const navbar   = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('open');
    menuIcon.classList.toggle('bx-x');
});

// Close nav on link click
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        menuIcon.classList.remove('bx-x');
    });
});

// ─── Active Nav on Scroll ────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => observerNav.observe(sec));

// ─── Typed Text ──────────────────────────────────
const phrases = [
    'Full Stack Apps',
    'Cloud Solutions',
    'Real-time Systems',
    'AI-Powered Tools',
    'DevOps Pipelines'
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typedText');

function type() {
    if (!typedEl) return;
    const current = phrases[phraseIndex];

    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => { isDeleting = true; type(); }, 1800);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const speed = isDeleting ? 60 : 100;
    setTimeout(type, speed);
}
type();

// ─── Scroll Reveal ───────────────────────────────
const revealEls = document.querySelectorAll(
    '.reveal-top, .reveal-bottom, .reveal-left, .reveal-right'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // animate once
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// Also reveal home content immediately (it's above fold)
document.querySelectorAll('.home-content, .home-visual').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
});

// ─── CV Download ─────────────────────────────────
function handleCVDownload(e) {
    e.preventDefault();

    // If you have a real CV file, update the path below:
    const cvPath = 'Ritik_Singh_CV.pdf';

    // Check if file exists by trying to fetch it
    fetch(cvPath, { method: 'HEAD' })
        .then(res => {
            if (res.ok) {
                // File exists — download it
                const a = document.createElement('a');
                a.href = cvPath;
                a.download = 'Ritik_Singh_CV.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                throw new Error('File not found');
            }
        })
        .catch(() => {
            // Fallback: open a mailto to request CV
            showCVModal();
        });
}

function showCVModal() {
    // Create a simple modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        padding: 2rem;
    `;
    modal.innerHTML = `
        <div style="
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 16px; padding: 3.5rem; max-width: 44rem; width: 100%;
            text-align: center;
        ">
            <div style="font-size: 4rem; margin-bottom: 1.5rem;">📄</div>
            <h3 style="font-family: 'Syne',sans-serif; font-size: 2.2rem; margin-bottom: 1rem; color: var(--text);">
                Get My CV
            </h3>
            <p style="color: var(--text-muted); font-size: 1.5rem; margin-bottom: 2.5rem; line-height:1.6;">
                To receive my latest CV, drop me an email and I'll send it right over!
            </p>
            <a href="mailto:tech.ritiksingh@gmail.com?subject=CV Request&body=Hi Ritik, I'd love to receive your CV." 
               style="
                display: inline-flex; align-items: center; gap: 0.8rem;
                background: linear-gradient(135deg, #6ee7b7, #38bdf8);
                color: #0d0f14; padding: 1.2rem 2.8rem; border-radius: 5rem;
                font-family: 'Syne',sans-serif; font-size: 1.5rem; font-weight: 600;
                margin-bottom: 1.5rem;
               ">
               ✉️ Request via Email
            </a>
            <br>
            <button onclick="this.closest('[style]').remove()" style="
                background: none; color: var(--text-muted); font-size: 1.4rem;
                cursor: pointer; margin-top: 1rem; font-family: 'DM Sans',sans-serif;
            ">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

// ─── Contact Form (EmailJS) ───────────────────────
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMsg   = document.getElementById('formMsg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
        showFormMsg('Please fill in all required fields.', 'error');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormMsg('Please enter a valid email address.', 'error');
        return;
    }

    // Check if EmailJS is configured
    if (EMAILJS_PUBLIC_KEY === 'ThOPiwsR8Ack3sNDK') {
        // Demo mode: show success simulation + open mailto fallback
        setLoading(true);
        await delay(1200);
        setLoading(false);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`
        );
        window.location.href = `mailto:tech.ritiksingh@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        showFormMsg('📧 Opening your email client...', 'success');
        return;
    }

    setLoading(true);
    formMsg.className = 'form-message';
    formMsg.style.display = 'none';

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name:    name,
            from_email:   email,
            phone:        phone || 'Not provided',
            subject:      subject,
            message:      message,
            to_email:     'tech.ritiksingh@gmail.com'
        });
        form.reset();
        showFormMsg('✅ Message sent! I\'ll get back to you soon.', 'success');
    } catch (err) {
        console.error('EmailJS error:', err);
        showFormMsg('❌ Failed to send. Please try emailing me directly at tech.ritiksingh@gmail.com', 'error');
    } finally {
        setLoading(false);
    }
});

function setLoading(loading) {
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-loading');
    submitBtn.disabled = loading;
    btnText.style.display    = loading ? 'none' : 'inline-flex';
    btnSpinner.style.display = loading ? 'inline-flex' : 'none';
}

function showFormMsg(text, type) {
    formMsg.textContent  = text;
    formMsg.className    = `form-message ${type}`;
    formMsg.style.display = 'block';
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}