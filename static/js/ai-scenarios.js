// 初始化轮播图
document.addEventListener('DOMContentLoaded', function() {
    // 确保页面中有lightbox元素（针对单独页面）
    if (!document.getElementById('image-lightbox') && window.self === window.top) {
        // 创建lightbox元素
        const lightboxHTML = `
            <div id="image-lightbox" class="lightbox">
                <div class="lightbox-close"><i class="fas fa-times"></i></div>
                <img id="lightbox-img" src="" alt="大图预览">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        // 添加关闭事件
        const lightbox = document.getElementById('image-lightbox');
        const lightboxClose = document.querySelector('.lightbox-close');
        
        // 点击关闭按钮
        lightboxClose.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = ''; // 恢复滚动
        });
        
        // 点击背景关闭
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = ''; // 恢复滚动
            }
        });
        
        // ESC键关闭图片查看器
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.style.overflow = ''; // 恢复滚动
            }
        });
    }

    // 初始化所有轮播组件
    const swipers = document.querySelectorAll('.image-gallery');
    swipers.forEach(function(swiperContainer) {
        new Swiper(swiperContainer, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: swiperContainer.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: swiperContainer.querySelector('.swiper-button-next'),
                prevEl: swiperContainer.querySelector('.swiper-button-prev'),
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });
    });

    // 添加图片点击事件处理
    document.querySelectorAll('.image-gallery .swiper-slide img').forEach(img => {
        img.addEventListener('click', function() {
            // 判断是否在iframe内
            if (window.self !== window.top) {
                // 向父页面发送消息，请求打开lightbox
                window.parent.postMessage({
                    action: 'openLightbox',
                    imgSrc: this.src
                }, '*');
            } else {
                // 如果不在iframe内（单独页面），使用本地lightbox
                const lightbox = document.getElementById('image-lightbox');
                if (lightbox) {
                    const lightboxImg = document.getElementById('lightbox-img');
                    lightboxImg.src = this.src;
                    lightbox.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // 防止背景滚动
                }
            }
        });
    });

    // 初始化复制按钮功能
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const prompt = this.getAttribute('data-prompt');
            navigator.clipboard.writeText(prompt).then(function() {
                // 修改按钮文字，显示复制成功
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> 已复制';
                
                // 2秒后恢复原始文字
                setTimeout(function() {
                    button.innerHTML = originalText;
                }, 2000);
            });
        });
    });

    // 任务清单功能
    const checkboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
    
    // 加载已保存的进度
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem('task_' + checkbox.id);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        // 监听变化并保存
        checkbox.addEventListener('change', function() {
            localStorage.setItem('task_' + this.id, this.checked);
            updateProgress();
        });
    });
    
    // 初始更新进度
    updateProgress();
    
    // 更新总体进度
    function updateProgress() {
        const total = checkboxes.length;
        const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
        const progressPercent = Math.round((completed / total) * 100);
        
        // 这里可以添加进度显示的逻辑
        console.log(`任务进度: ${completed}/${total} (${progressPercent}%)`);
    }
}); 