const selectionBox = document.getElementById('selectionBox');
const shortcuts = document.querySelectorAll('.shortcut'); // Select all shortcut elements

let startX, startY, isDragging = false, isSelecting = false;  // Flags to track dragging and selecting

// Function to check if a shortcut is inside the selection box
function isShortcutSelected(shortcut, box) {
    const boxRect = box.getBoundingClientRect();
    const shortcutRect = shortcut.getBoundingClientRect();

    return !(shortcutRect.right < boxRect.left || 
             shortcutRect.left > boxRect.right || 
             shortcutRect.bottom < boxRect.top || 
             shortcutRect.top > boxRect.bottom);
}

// Event listener for mouse down to start selection or drag
document.getElementById('shortcut-container').addEventListener('mousedown', (e) => {
    if (e.button === 0) { // Left mouse button
        if (!e.target.classList.contains('shortcut')) {
            // If we click outside of a shortcut, start dragging the selection box
            isSelecting = true;
            isDragging = true;
            startX = e.pageX;
            startY = e.pageY;

            selectionBox.style.left = `${startX}px`;
            selectionBox.style.top = `${startY}px`;
            selectionBox.style.width = '0px';
            selectionBox.style.height = '0px';
            selectionBox.style.display = 'block';

            // Clear any previous selection
            shortcuts.forEach(shortcut => shortcut.classList.remove('selected'));
        } else {
            // If a shortcut is clicked, open the tab or trigger the shortcut behavior
            isSelecting = false;
        }
    }
});

// Event listener for mouse move to update selection box dimensions and detect selected shortcuts
document.addEventListener('mousemove', (e) => {
    if (isDragging && isSelecting) {
        const currentX = e.pageX;
        const currentY = e.pageY;

        selectionBox.style.width = `${Math.abs(currentX - startX)}px`;
        selectionBox.style.height = `${Math.abs(currentY - startY)}px`;

        selectionBox.style.left = `${Math.min(currentX, startX)}px`;
        selectionBox.style.top = `${Math.min(currentY, startY)}px`;

        // Check each shortcut to see if it's inside the selection box
        shortcuts.forEach(shortcut => {
            if (isShortcutSelected(shortcut, selectionBox)) {
                shortcut.classList.add('selected');
            } else {
                shortcut.classList.remove('selected');
            }
        });
    }
});

// Event listener for mouse up to stop dragging and hide the selection box
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        selectionBox.style.display = 'none'; // Hide the selection box when mouse is released
    }
});

// Prevent selection box from triggering when clicking on a shortcut
shortcuts.forEach(shortcut => {
    shortcut.addEventListener('click', (e) => {
        if (!isSelecting) {
            // Shortcut clicked, trigger the normal behavior
            console.log(`Shortcut ${e.target.id} clicked!`);
            // Add your shortcut-specific action here (e.g., opening a tab)
        } else {
            // If the selection box is being dragged, prevent the click from triggering the shortcut action
            e.preventDefault();
            e.stopPropagation();
        }
    });
});

// Optionally, prevent default text selection behavior if any
document.getElementById('shortcut-container').addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'DIV') {
        e.preventDefault();
    }
});
