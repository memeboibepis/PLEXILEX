const selectionBox = document.getElementById('selectionBox');
const shortcuts = document.querySelectorAll('.shortcut');

let startX, startY, isDragging = false;

function isShortcutSelected(shortcut, box) {
    const boxRect = box.getBoundingClientRect();
    const shortcutRect = shortcut.getBoundingClientRect();

    return !(shortcutRect.right < boxRect.left || 
             shortcutRect.left > boxRect.right || 
             shortcutRect.bottom < boxRect.top || 
             shortcutRect.top > boxRect.bottom);
}

document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        isDragging = true;
        startX = e.pageX;
        startY = e.pageY;

        selectionBox.style.left = `${startX}px`;
        selectionBox.style.top = `${startY}px`;
        selectionBox.style.width = '0px';
        selectionBox.style.height = '0px';
        selectionBox.style.display = 'block';

        shortcuts.forEach(shortcut => shortcut.classList.remove('selected'));
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const currentX = e.pageX;
        const currentY = e.pageY;

        selectionBox.style.width = `${Math.abs(currentX - startX)}px`;
        selectionBox.style.height = `${Math.abs(currentY - startY)}px`;

        selectionBox.style.left = `${Math.min(currentX, startX)}px`;
        selectionBox.style.top = `${Math.min(currentY, startY)}px`;

        shortcuts.forEach(shortcut => {
            if (isShortcutSelected(shortcut, selectionBox)) {
                shortcut.classList.add('selected');
            } else {
                shortcut.classList.remove('selected');
            }
        });
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        selectionBox.style.display = 'none'; 
    }
});

