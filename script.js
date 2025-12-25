document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('nav-menu-mobile');
    const mobileLinks = mobileNav.querySelectorAll('a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('open');
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            mobileNav.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });

    // Projects Data
    const projects = [
        {
            imageSrc: 'https://raw.githubusercontent.com/Labib778/delivery-frontend/106ccd7187097882f4cbf89d10257a4819269971/images/W1.png',
            title: 'Loom Apparel: A Classy Minimalistic Post Design',
            description: 'Designed a clean and classy poster that grabs viewers attention.',
            imageRight: false
        },
        {
            imageSrc: 'https://raw.githubusercontent.com/Labib778/delivery-frontend/106ccd7187097882f4cbf89d10257a4819269971/images/W2.png',
            title: 'COSMIC NOVA: Speeker Design',
            description: 'Energetic red color palette with contrasting white fonts.',
            imageRight: true
        }
        // ... Add more projects as needed
    ];

    const createProjectHtml = (project) => {
        const imageDesktopOrder = project.imageRight ? 'md:order-2' : 'md:order-1';
        const textDesktopOrder = project.imageRight ? 'md:order-1' : 'md:order-2';
        const loadAttribute = project.loadStage ? `data-load-stage="${project.loadStage}"` : '';

        return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col md:flex-row items-center project-item relative dark:bg-gray-800" ${loadAttribute}>
            <div class="w-full md:w-1/2 ${imageDesktopOrder}">
                <img src="${project.imageSrc}" alt="${project.title}" class="w-full h-auto object-cover">
            </div>
            <div class="p-8 w-full md:w-1/2 ${textDesktopOrder}">
                <h3 class="text-dark-text text-lg font-semibold mb-4 dark:text-off-white">${project.title}</h3>
                <p class="text-subtle-gray text-base leading-relaxed dark:text-gray-300">${project.description}</p>
            </div>
        </div>`;
    };

    const renderProjects = () => {
        const container = document.getElementById('projects-container');
        if(container) container.innerHTML = projects.map(createProjectHtml).join('');
    };

    renderProjects();

    // Dark Mode Logic
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const htmlElement = document.documentElement;

    function updateIcon() {
        const isDark = htmlElement.classList.contains('dark');
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            const text = btn.querySelector('.theme-toggle-text');
            if (isDark) {
                icon.className = 'fas fa-sun';
                text.textContent = 'Light';
            } else {
                icon.className = 'fas fa-moon';
                text.textContent = 'Dark';
            }
        });
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
            updateIcon();
        });
    });

    // Initial check
    if (localStorage.getItem('theme') === 'dark') {
        htmlElement.classList.add('dark');
        updateIcon();
    }
});
