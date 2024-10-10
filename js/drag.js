const container = document.getElementById('shortcut-container');
let draggingShortcut = null;

// Ensure shortcuts are positioned in a grid and dragged correctly
document.querySelectorAll('.shortcut').forEach(shortcut => {
    shortcut.addEventListener('dragstart', (e) => {
        draggingShortcut = shortcut;
        shortcut.classList.add('dragging');
        setTimeout(() => {
            shortcut.style.display = 'none'; 
        }, 0);
    });

    shortcut.addEventListener('dragend', () => {
        shortcut.classList.remove('dragging');
        setTimeout(() => {
            shortcut.style.display = 'flex';
            draggingShortcut = null;
        }, 0);
    });
});

// Prevent default behavior to allow for drop
container.addEventListener('dragover', (e) => {
    e.preventDefault(); 
});

container.addEventListener('drop', (e) => {
    e.preventDefault(); 
    if (draggingShortcut) {
        const { clientX, clientY } = e;

        const shortcutSize = 80;  // Assuming the grid is 90px

        // Get the new X and Y coordinates aligned to the grid
        const newX = Math.floor(clientX / shortcutSize) * shortcutSize; 
        const newY = Math.floor(clientY / shortcutSize) * shortcutSize; 

        // Ensure shortcuts do not overlap
        const existingShortcuts = Array.from(container.children).filter(child => child !== draggingShortcut);
        const overlapping = existingShortcuts.some(existing => {
            const rect = existing.getBoundingClientRect();
            return (
                newX < rect.right &&
                newX + shortcutSize > rect.left &&
                newY < rect.bottom &&
                newY + shortcutSize > rect.top
            );
        });

        // If not overlapping, update position
        if (!overlapping) {
            draggingShortcut.style.position = 'absolute'; 
            draggingShortcut.style.left = `${newX}px`; 
            draggingShortcut.style.top = `${newY}px`; 

            container.appendChild(draggingShortcut);  // Update container

            saveShortcutsOrder(); // Save new order
        }
    }
});

// Function to save the shortcuts' positions in localStorage
function saveShortcutsOrder() {
    const shortcuts = Array.from(container.children).map(shortcut => {
        return {
            id: shortcut.id,
            left: shortcut.style.left,
            top: shortcut.style.top
        };
    });
    localStorage.setItem('shortcutOrder', JSON.stringify(shortcuts)); 
}

// Function to load saved shortcut positions on page load
function loadShortcutsOrder() {
    const savedShortcuts = JSON.parse(localStorage.getItem('shortcutOrder'));
    if (savedShortcuts) {
        savedShortcuts.forEach(data => {
            const shortcut = document.getElementById(data.id);
            if (shortcut) {
                shortcut.style.position = 'absolute';
                shortcut.style.left = data.left;
                shortcut.style.top = data.top;
                container.appendChild(shortcut);  // Append to container
            }
        });
    }
}

// Load positions when the page is loaded
window.onload = loadShortcutsOrder;

// Ensure click events don't open shortcuts while dragging
document.querySelectorAll('.shortcut').forEach(shortcut => {
    shortcut.addEventListener('click', (e) => {
        // Prevent the click from opening the shortcut if it's being dragged
        if (draggingShortcut) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
});
