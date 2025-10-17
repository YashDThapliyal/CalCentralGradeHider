function blurGrades() {
    document.querySelectorAll('[data-testid="semester-class-section-row-grade"]').forEach(el => {
        el.classList.add('blurred-grades');
        // Add smooth transition
        el.style.transition = 'filter 0.3s ease';
    });
}

function toggleGrades() {
    const grades = document.querySelectorAll('[data-testid="semester-class-section-row-grade"]');
    const isBlurred = Array.from(grades).some(el => el.classList.contains('blurred-grades'));

    grades.forEach(el => {
        el.classList.toggle('blurred-grades', !isBlurred);
        // Add smooth transition
        el.style.transition = 'filter 0.3s ease';
    });

    const button = document.getElementById('grade-toggle-button');
    if (button) {
        button.innerText = isBlurred ? '👁' : '🙈';
        button.setAttribute('aria-label', isBlurred ? 'Show grades' : 'Hide grades');
        button.setAttribute('aria-pressed', isBlurred ? 'false' : 'true');
        
        // Add visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
}


function addToggleButton() {
    // Prevent duplicate buttons
    if (document.getElementById('grade-toggle-button')) return;
    
    const button = document.createElement('button');
    button.id = 'grade-toggle-button';
    button.innerText = '👁';
    button.setAttribute('aria-label', 'Hide grades');
    button.setAttribute('aria-pressed', 'true');
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
    button.setAttribute('title', 'Toggle grade visibility (Ctrl+Shift+Y)');
    
    // Simple, clean styling
    button.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
    `;
    
    // Simple hover effects
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
    
    // Focus styles for accessibility
    button.addEventListener('focus', () => {
        button.style.outline = '3px solid #007bff';
        button.style.outlineOffset = '2px';
    });
    
    button.addEventListener('blur', () => {
        button.style.outline = 'none';
    });
    
    // Simple click handler
    button.onclick = toggleGrades;
    
    document.body.appendChild(button);
    
    // Add a subtle entrance animation
    button.style.opacity = '0';
    button.style.transform = 'scale(0.5)';
    setTimeout(() => {
        button.style.transition = 'all 0.5s ease';
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
    }, 100);
}


// Simple notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #28a745;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10001;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.style.opacity = '1', 100);
    
    // Auto remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

const observer = new MutationObserver(() => {
    const gradesExist = document.querySelector('[data-testid="semester-class-section-row-grade"]');
    if (gradesExist) {
        blurGrades();
        addToggleButton();
        observer.disconnect(); 
    }
});

observer.observe(document.body, { childList: true, subtree: true });


document.addEventListener('keydown', (e) => {
    const isMac = navigator.platform.toUpperCase().includes('MAC');
    const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

    if (ctrlOrCmd && e.shiftKey && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        toggleGrades();
    }
});

