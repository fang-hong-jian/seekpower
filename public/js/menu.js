document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', function() {
            // 切换aria-expanded属性（辅助功能）
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // 切换移动导航菜单的显示状态
            const isVisible = mobileNav.getAttribute('data-visible') === 'true';
            if (isVisible) {
                mobileNav.setAttribute('data-visible', 'false');
                mobileNav.setAttribute('hidden', ''); // 辅助功能隐藏
            } else {
                mobileNav.setAttribute('data-visible', 'true');
                mobileNav.removeAttribute('hidden'); // 辅助功能显示
            }
        });

        // 点击菜单外区域关闭菜单（可选）
        document.addEventListener('click', function(event) {
            if (!hamburgerBtn.contains(event.target) && !mobileNav.contains(event.target)) {
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                mobileNav.setAttribute('data-visible', 'false');
                mobileNav.setAttribute('hidden', '');
            }
        });
    }
});