document.addEventListener('DOMContentLoaded', function() {
    ['.seo-table__load', '.seo-table__settings-button'].forEach(toggleActive);

    document.querySelectorAll('.seo-table__settings-menu, .seo-table__load-dropdown').forEach(function(menu) {
        menu.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });

    document.querySelectorAll('.seo-table__arrow-icon').forEach(function(header) {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});

function toggleActive(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener('click', function(event) {
            this.classList.toggle('active');
            event.stopPropagation();
        });

        document.addEventListener('click', function(event) {
            if (!element.contains(event.target)) {
                element.classList.remove('active');
            }
        });
    }
}

