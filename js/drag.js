const selectionBox = document.getElementById('selectionBox');
const shortcuts = document.querySelectorAll('.shortcut'); // Select all shortcut elements

let startX, startY, isDragging = false;
let isSelecting = false;  // To track if the selection box is being dragged

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
        // If we click on a shortcut, don't show the selection box
        if (!e.target.classList.contains('shortcut')) {
            isDragging = true;
            isSelecting = true;  // We're now in selection mode
            startX = e.pageX;
            startY = e.pageY;

            selectionBox.style.left = `${startX}px`;
            selectionBox.style.top = `${startY}px`;
            selectionBox.style.width = '0px';
            selectionBox.style.height = '0px';
            selectionBox.style.display = 'block';

            // Clear previously selected shortcuts
            shortcuts.forEach(shortcut => shortcut.classList.remove('selected'));
        }
    }
});

// Event listener to handle moving the selection box and detecting selection area
document.addEventListener('mousemove', (e) => {
    if (isDragging && isSelecting) {
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
        isSelecting = false;  // Stop selection mode
    }
});

// Allow shortcuts to be clicked normally (open tab or trigger action)
shortcuts.forEach(shortcut => {
    shortcut.addEventListener('click', (e) => {
        if (!isSelecting) {
            // If not in selection mode, proceed with normal click behavior
            // You can add the tab-opening or other shortcut behavior here
            console.log(`Shortcut ${e.target.id} clicked!`);
        } else {
            // If selection mode is active, ignore the click
            e.preventDefault();
            e.stopPropagation();
        }
    });
});
