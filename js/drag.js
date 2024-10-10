const selectionBox = document.getElementById('selectionBox');
const shortcutContainer = document.getElementById('shortcut-container');
const shortcuts = document.querySelectorAll('.shortcut');

let isSelecting = false;
let isDragging = false; 
let startX, startY, draggedShortcut;

shortcutContainer.addEventListener('mousedown', (e) => {
    if (e.button === 0) { 
        startX = e.pageX;
        startY = e.pageY;

        if (!e.target.closest('.shortcut')) {
            isSelecting = true; 
            selectionBox.style.left = `${startX}px`;
            selectionBox.style.top = `${startY}px`;
            selectionBox.style.width = `0px`;
            selectionBox.style.height = `0px`;
            selectionBox.style.display = 'block'; 
        }
    }
});

document.addEventListener('mousemove', (e) => {
    if (isSelecting) {
        const currentX = e.pageX;
        const currentY = e.pageY;

        const width = currentX - startX;
        const height = currentY - startY;

        selectionBox.style.width = `${Math.abs(width)}px`;
        selectionBox.style.height = `${Math.abs(height)}px`;
        selectionBox.style.left = `${width < 0 ? currentX : startX}px`;
        selectionBox.style.top = `${height < 0 ? currentY : startY}px`;

        shortcuts.forEach(shortcut => {
            const rect = shortcut.getBoundingClientRect();
            const selectionRect = selectionBox.getBoundingClientRect();

            if (rect.left < selectionRect.right &&
                rect.right > selectionRect.left &&
                rect.top < selectionRect.bottom &&
                rect.bottom > selectionRect.top) {
                shortcut.classList.add('selected'); 
            } else {
                shortcut.classList.remove('selected'); 
            }
        });
    } else if (isDragging && draggedShortcut) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        draggedShortcut.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
});

document.addEventListener('mouseup', () => {
    if (isSelecting) {
        isSelecting = false;
        selectionBox.style.display = 'none'; 

        shortcuts.forEach(shortcut => {
            shortcut.classList.remove('selected'); 
        });
    }

    if (isDragging && draggedShortcut) {
        isDragging = false; 
        draggedShortcut.classList.remove('dragging');
        draggedShortcut.style.transform = ''; 
        draggedShortcut = null; 
    }
});

shortcuts.forEach(shortcut => {
    shortcut.addEventListener('mousedown', (e) => {
        e.preventDefault(); 
        isDragging = true; 
        draggedShortcut = e.currentTarget;
        startX = e.clientX;
        startY = e.clientY;
        draggedShortcut.classList.add('dragging');
    });
});
