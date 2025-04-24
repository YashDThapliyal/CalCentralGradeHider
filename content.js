function blurGrades() {
    document.querySelectorAll('[data-testid="semester-class-section-row-grade"]').forEach(el => {
        el.classList.add('blurred-grades');
    });
}

function toggleGrades() {
    const grades = document.querySelectorAll('[data-testid="semester-class-section-row-grade"]');
    const isBlurred = Array.from(grades).some(el => el.classList.contains('blurred-grades'));

    grades.forEach(el => {
        el.classList.toggle('blurred-grades', !isBlurred);
    });

    const button = document.getElementById('grade-toggle-button');
    if (button) {
        button.innerText = isBlurred ? '👁' : '🙈';
    }
}

function addToggleButton() {
    const button = document.createElement('button');
    button.id = 'grade-toggle-button';
    button.innerText = '👁';
    button.onclick = toggleGrades;
    document.body.appendChild(button);
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
        toggleGrades();
    }
});

