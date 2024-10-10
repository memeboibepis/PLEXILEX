const selectionBox = document.getElementById('selectionBox');
const shortcutContainer = document.getElementById('shortcut-container');
const shortcuts = document.querySelectorAll('.shortcut');

let isSelecting = false;
let isDragging = false; 
let startX, startY, draggedShortcut;

// Mousedown event for both selection and dragging
shortcutContainer.addEventListener('mousedown', (e) => {
    if (e.button === 0) { 
        startX = e.pageX;
        startY = e.pageY;

        if (e.target.closest('.shortcut')) {
            // Start dragging
            draggedShortcut = e.target.closest('.shortcut');
            isDragging = true;
            draggedShortcut.classList.add('dragging');
            return;  // Skip selection box
        } else {
            // Start selection box
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
        // Selection logic
        const currentX = e.pageX;
        const currentY = e.pageY;
        const width = currentX - startX;
        const height = currentY - startY;

        selectionBox.style.width = `${Math.abs(width)}px`;
        selectionBox.style.height = `${Math.abs(height)}px`;
        selectionBox.style.left = `${width < 0 ? currentX : startX}px`;
        selectionBox.style.top = `${height < 0 ? currentY : startY}px`;

        // Highlight shortcuts within selection box
        shortcuts.forEach(shortcut => {
            const rect = shortcut.getBoundingClientRect();
            const selectionRect = selectionBox.getBoundingClientRect();

            if (rect.left < selectionRect.right &&
                rect.right > selectionRect.left &&
                rect.top < selectionRect.bottom &&
                rect.bottom > selectionRect.top) {
                shortcut.classList.add('selected'); // Add selected class
            } else {
                shortcut.classList.remove('selected'); // Remove selected class
            }
        });
    } else if (isDragging && draggedShortcut) {
        // Dragging logic
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        draggedShortcut.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
});

document.addEventListener('mouseup', (e) => {
    if (isSelecting) {
        // Stop selecting
        isSelecting = false;
        selectionBox.style.display = 'none'; // Hide selection box

        // Clear selected class after selection is done
        shortcuts.forEach(shortcut => {
            shortcut.classList.remove('selected');
        });
    }

    if (isDragging && draggedShortcut) {
        // Stop dragging
        isDragging = false;
        draggedShortcut.classList.remove('dragging');
        draggedShortcut.style.transform = ''; // Reset position
        draggedShortcut = null; // Clear reference
    }
});
