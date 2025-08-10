function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

themeToggleButton.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.removeItem('theme');
        themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            icon.click();
        }
    });
});