document.addEventListener("DOMContentLoaded", () => {

    // Elements
    const logoElement = document.getElementById("server-logo");
    const sidebarNav = document.getElementById("sidebar-nav");
    const sectionTitle = document.getElementById("section-title");
    const dynamicContent = document.getElementById("dynamic-content");

    // Init Config
    if (config.logoUrl) {
        logoElement.src = config.logoUrl;
    } else {
        logoElement.style.display = 'none'; // Hide if no logo
    }

    renderSidebar(config.categories);

    // Render Logic
    function renderSidebar(categories) {
        sidebarNav.innerHTML = "";

        categories.forEach(cat => {

            // 1. Create Main Item Wrapper
            const itemWrapper = document.createElement("div");

            // 2. Create the visible button
            const btn = document.createElement("div");
            btn.className = "menu-item";
            btn.innerHTML = `<i class="${cat.icon}"></i> <span>${cat.title}</span>`;

            itemWrapper.appendChild(btn);

            if (cat.type === "dropdown") {
                // Dropdown Logic
                const submenu = document.createElement("div");
                submenu.className = "submenu-container";

                cat.subCategories.forEach(sub => {
                    const subItem = document.createElement("div");
                    subItem.className = "submenu-item";
                    subItem.textContent = sub.title;

                    subItem.addEventListener("click", (e) => {
                        e.stopPropagation();
                        // Active state for sub-items
                        resetActive();
                        subItem.classList.add("active-sub");
                        btn.classList.add("active"); // Keep parent highlighted? Maybe not, or differently.

                        updateContent(sub.title, sub.content);
                    });
                    submenu.appendChild(subItem);
                });

                itemWrapper.appendChild(submenu);

                // Toggle click
                btn.addEventListener("click", () => {
                    // Close others (Optional, but good for focus)
                    // document.querySelectorAll('.submenu-container').forEach(el => el.classList.remove('open'));

                    submenu.classList.toggle("open");
                    const icon = btn.querySelector("i");
                    // Could rotate icon here
                });

            } else {
                // Direct Content
                btn.addEventListener("click", () => {
                    resetActive();
                    btn.classList.add("active");
                    updateContent(cat.title, cat.content);
                });
            }

            sidebarNav.appendChild(itemWrapper);
        });
    }

    function resetActive() {
        document.querySelectorAll(".menu-item").forEach(el => el.classList.remove("active"));
        document.querySelectorAll(".submenu-item").forEach(el => el.classList.remove("active-sub"));
    }

    function updateContent(title, content) {
        // Fade out effect manually or just snap
        sectionTitle.textContent = title;
        dynamicContent.innerHTML = content.replace(/\n/g, "<br>");

        // Scroll top
        document.querySelector('.content-area').scrollTo({ top: 0, behavior: 'smooth' });
    }

});
