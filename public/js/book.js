// 简单的内容加载器
document.addEventListener('DOMContentLoaded', function () {
    const tocLinks = document.querySelectorAll('.toc-link');
    // 获取书籍主页中的章容器
    const chapterContainer = document.getElementById('chapter-container');
    const bookIntro = document.getElementById('book-intro');

    // 为每个目录链接添加点击事件
    tocLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const url = this.getAttribute('data-url');
            const type = this.getAttribute('data-type');

            // 移除所有active类
            tocLinks.forEach(l => l.classList.remove('active'));
            // 添加当前active类
            this.classList.add('active');

            if (type === 'book') {
                // 显示书籍简介
                bookIntro.style.display = 'block';
                chapterContainer.innerHTML = '';
            } else {
                // 加载章节内容
                bookIntro.style.display = 'none';
                loadChapter(url);
            }
        });
    });

    // 加载章节内容的函数
    function loadChapter(url) {
        // 显示加载中状态
        chapterContainer.innerHTML = `
                        <div style="text-align: center; padding: 50px;">
                            <div style="margin-bottom: 20px;">📖 正在加载章节...</div>
                            <div style="width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid #007bff; border-radius: 50%; margin: 0 auto; animation: spin 1s linear infinite;"></div>
                        </div>
                `;

        // 添加旋转动画样式
        const style = document.createElement('style');
        style.textContent = `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
        document.head.appendChild(style);

        // 使用fetch加载章节
        fetch(url)
            .then(response => response.text())
            .then(html => {
                // 从完整的HTML中提取章节内容
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // 提取章节内容（章节放在book-content类中）
                let chapterContent = doc.querySelector('.book-content')

                // 清理并插入到容器中
                chapterContainer.innerHTML = `
                                ${chapterContent.innerHTML}
                        `;
            })
            .catch(error => {
                console.error('加载章节失败:', error);
                chapterContainer.innerHTML = `
                            <div class="chapter-content">
                                <h2>加载失败</h2>
                                <p>抱歉，无法加载该章节内容。请检查网络连接或刷新页面重试。</p>
                            </div>
                        `;
            });
    }

    // 初始状态：激活第一个链接
    if (tocLinks.length > 0) {
        tocLinks[0].classList.add('active');
    }
});