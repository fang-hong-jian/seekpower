// 将代码放在DOMContentLoaded事件中，确保DOM加载完成后再执行
window.addEventListener('DOMContentLoaded', function () {
    console.log('页面加载完成！开始绑定按钮事件。');

    const subjectButtons = document.querySelectorAll('.subjects');
    console.log('找到的按钮数量：', subjectButtons.length);

    // 为每个按钮添加点击事件
    subjectButtons.forEach(button => {
        button.addEventListener('click', function () {
            // 获取当前按钮的id
            const buttonId = this.id;

            console.log('点击了按钮：', buttonId);

            // 移除所有按钮的active类
            subjectButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // 给当前点击的按钮添加active类
            this.classList.add('active');

            // 隐藏所有书籍列表
            document.querySelectorAll('.books').forEach(bookList => {
                bookList.classList.remove('active');
            });

            // 根据按钮id构建对应的书籍列表id
            // 例如：按钮id="math" -> 书籍列表id="mathbooks"
            const bookListId = buttonId + 'books';
            const targetBookList = document.getElementById(bookListId);

            if (targetBookList) {
                targetBookList.classList.add('active');
                console.log('显示了书籍列表：', bookListId);
            } else {
                console.log('找不到对应的书籍列表：', bookListId);
            }
        });
    });
});