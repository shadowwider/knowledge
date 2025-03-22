// 初始化轮播图
document.addEventListener('DOMContentLoaded', function() {
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