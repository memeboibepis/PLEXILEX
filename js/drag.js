const container = document.getElementById('shortcut-container');
const selectionBox = document.getElementById('selectionBox');
const shortcuts = document.querySelectorAll('.shortcut');

let startX, startY, isDragging = false, isSelecting = false, draggingShortcut = null;

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
container.addEventListener('mousedown', (e) => {
    if (e.button === 0) { // Left mouse button
        const clickedShortcut = e.target.closest('.shortcut');  // Find the clicked shortcut, if any

        if (!clickedShortcut) {
            // If we clicked outside of a shortcut, start selecting (dragging the selection box)
            isSelecting = true;
            isDragging = true;
            draggingShortcut = null;  // Ensure no shortcut is being dragged

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
            // If a shortcut is clicked, mark it as being dragged
            isSelecting = false;
            isDragging = true;
            draggingShortcut = clickedShortcut;  // Store the dragged shortcut

            const rect = draggingShortcut.getBoundingClientRect();
            let offsetX = e.pageX - rect.left;
            let offsetY = e.pageY - rect.top;

            // Move the shortcut with mouse drag
            function onMouseMove(event) {
                const x = event.pageX - offsetX;
                const y = event.pageY - offsetY;

                // Clamp the shortcut within the bounds of the container
                const containerRect = container.getBoundingClientRect();
                const maxX = containerRect.width - rect.width;
                const maxY = containerRect.height - rect.height;

                draggingShortcut.style.position = 'absolute';
                draggingShortcut.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
                draggingShortcut.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
            }

            // Stop dragging when mouse is released
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                draggingShortcut = null;  // Reset dragging when mouse is up
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            e.preventDefault(); // Prevent default behavior (selection box)
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
    if (isDragging && isSelecting) {
        isDragging = false;
        selectionBox.style.display = 'none'; // Hide the selection box when mouse is released
    }
    if (draggingShortcut) {
        draggingShortcut = null; // Reset the dragging flag
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
container.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'DIV') {
        e.preventDefault();
    }
});
