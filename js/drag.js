const selectionBox = document.getElementById('selectionBox');
const shortcuts = document.querySelectorAll('.shortcut'); // Select all shortcut elements

let startX, startY, isDragging = false;
let draggingShortcut = false;  // Flag to check if a shortcut is being dragged

// Function to check if a shortcut is within the selection box
function isShortcutSelected(shortcut, box) {
    const boxRect = box.getBoundingClientRect();
    const shortcutRect = shortcut.getBoundingClientRect();

    return !(shortcutRect.right < boxRect.left || 
             shortcutRect.left > boxRect.right || 
             shortcutRect.bottom < boxRect.top || 
             shortcutRect.top > boxRect.bottom);
}

// Event listener for mousedown on the container to start dragging the selection box
document.getElementById('shortcut-container').addEventListener('mousedown', (e) => {
    if (e.button === 0) { // Left mouse button
        // Check if the click was not on a shortcut
        if (!e.target.classList.contains('shortcut')) {
            isDragging = true;
            draggingShortcut = false;  // Not dragging a shortcut
            startX = e.pageX;
            startY = e.pageY;

            selectionBox.style.left = `${startX}px`;
            selectionBox.style.top = `${startY}px`;
            selectionBox.style.width = '0px';
            selectionBox.style.height = '0px';
            selectionBox.style.display = 'block';

            // Clear previously selected shortcuts
            shortcuts.forEach(shortcut => shortcut.classList.remove('selected'));
        } else {
            // The user clicked on a shortcut, so we are dragging it
            draggingShortcut = true;
        }
    }
});

// Event listener to handle moving the selection box and detecting selection area
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const currentX = e.pageX;
        const currentY = e.pageY;

        selectionBox.style.width = `${Math.abs(currentX - startX)}px`;
        selectionBox.style.height = `${Math.abs(currentY - startY)}px`;

        selectionBox.style.left = `${Math.min(currentX, startX)}px`;
        selectionBox.style.top = `${Math.min(currentY, startY)}px`;

        // Check each shortcut to see if it's within the selection box
        shortcuts.forEach(shortcut => {
            if (isShortcutSelected(shortcut, selectionBox)) {
                shortcut.classList.add('selected');
            } else {
                shortcut.classList.remove('selected');
            }
        });
    }
});

// Event listener for mouse up to stop the dragging process
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        selectionBox.style.display = 'none'; // Hide the selection box after mouse is released
    }
    if (draggingShortcut) {
        draggingShortcut = false;  // Reset dragging flag
    }
});

// Allow the shortcuts to be dragged (using HTML5 drag-and-drop API)
shortcuts.forEach(shortcut => {
    shortcut.setAttribute('draggable', 'true');

    shortcut.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id); // Store the id of the dragged shortcut
    });
    
    shortcut.addEventListener('dragover', (e) => {
        e.preventDefault(); // Necessary to allow dropping
    });

    shortcut.addEventListener('drop', (e) => {
        e.preventDefault();

        // Get the dragged shortcut ID
        const draggedId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(draggedId);

        // Move the dragged shortcut to the new location (simple example: appending to container)
        e.target.appendChild(draggedElement);
    });
});

