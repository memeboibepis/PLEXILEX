const selectionBox = document.getElementById('selectionBox');
const shortcutContainer = document.getElementById('shortcut-container');
const shortcuts = document.querySelectorAll('.shortcut');

let isSelecting = false;
let isDragging = false; 
let startX, startY, draggedShortcut;

// Track if we are selecting or dragging
shortcutContainer.addEventListener('mousedown', (e) => {
    if (e.button === 0) { 
        startX = e.pageX;
        startY = e.pageY;

        // Only allow selection if not dragging
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

// Handle both selection and dragging actions
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
                shortcut.style.borderColor = '#C93131'; // Highlight during selection
            } else {
                shortcut.style.borderColor = 'transparent'; // Reset if not selected
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
            shortcut.style.borderColor = 'transparent'; // Reset border after selection
        });
    }

    if (isDragging && draggedShortcut) {
        isDragging = false; 
        draggedShortcut.classList.remove('dragging');
        draggedShortcut.style.transform = ''; // Reset position
        draggedShortcut = null; 
    }
});

// Dragging logic for shortcut elements
shortcuts.forEach(shortcut => {
    shortcut.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevent selection box from starting
        isDragging = true; 
        draggedShortcut = e.currentTarget;
        startX = e.clientX;
        startY = e.clientY;
        draggedShortcut.classList.add('dragging');
    });
});
