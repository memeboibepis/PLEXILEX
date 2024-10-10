const selectionBox = document.getElementById('selectionBox');
const shortcutContainer = document.getElementById('shortcut-container');
const shortcuts = document.querySelectorAll('.shortcut');

let isSelecting = false;
let isDragging = false;
let startX, startY, draggedShortcut;

shortcutContainer.addEventListener('mousedown', (e) => {
    if (e.button === 0) { 
        if (isDragging) {
            e.preventDefault();
            return;
        }

        isSelecting = true;
        startX = e.pageX;
        startY = e.pageY;

        // Corrected to properly set styles with quotes for string literals
        selectionBox.style.left = `${startX}px`;
        selectionBox.style.top = `${startY}px`;
        selectionBox.style.width = '0px';
        selectionBox.style.height = '0px';
        selectionBox.style.display = 'block';
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

            // Detect overlap and apply the border
            if (rect.left < selectionRect.right &&
                rect.right > selectionRect.left &&
                rect.top < selectionRect.bottom &&
                rect.bottom > selectionRect.top) {
                shortcut.style.borderColor = '#C93131'; // Highlight border when selected
            } else {
                shortcut.style.borderColor = 'transparent'; // Remove border if not selected
            }
        });
    } else if (isDragging && draggedShortcut) {
        // Drag the shortcut element
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        draggedShortcut.style.left = `${draggedShortcut.offsetLeft + deltaX}px`;
        draggedShortcut.style.top = `${draggedShortcut.offsetTop + deltaY}px`;

        // Update the startX and startY so dragging stays smooth
        startX = e.clientX;
        startY = e.clientY;
    }
});

document.addEventListener('mouseup', () => {
    if (isSelecting) {
        isSelecting = false;
        selectionBox.style.display = 'none';

        // Clear the border after selection is done
        shortcuts.forEach(shortcut => {
            shortcut.style.borderColor = 'transparent'; 
        });
    }

    if (isDragging && draggedShortcut) {
        isDragging = false;
        draggedShortcut.classList.remove('dragging');
        draggedShortcut = null;
    }
});

// This allows dragging the shortcuts
document.querySelectorAll('.tab-box-header').forEach(header => {
    header.addEventListener('mousedown', (e) => {
        if (!isSelecting) {
            e.preventDefault();
            isDragging = true;

            draggedShortcut = header.closest('.tab-box');
            startX = e.clientX;
            startY = e.clientY;
            draggedShortcut.classList.add('dragging');
        }
    });
});
