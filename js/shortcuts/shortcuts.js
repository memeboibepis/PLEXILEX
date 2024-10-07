const container = document.getElementById('shortcut-container');
let draggingShortcut = null;

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

container.addEventListener('dragover', (e) => {
    e.preventDefault(); 
});

container.addEventListener('drop', (e) => {
    e.preventDefault(); 
    if (draggingShortcut) {
        const { clientX, clientY } = e;

        const shortcutSize = 90; 

        const newX = Math.floor(clientX / shortcutSize) * shortcutSize; 
        const newY = Math.floor(clientY / shortcutSize) * shortcutSize; 

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

        if (!overlapping) {
            draggingShortcut.style.position = 'absolute'; 
            draggingShortcut.style.left = `${newX}px`; 
            draggingShortcut.style.top = `${newY}px`; 

            container.appendChild(draggingShortcut);

            saveShortcutsOrder(); 
        }
    }
});

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

function loadShortcutsOrder() {
    const savedShortcuts = JSON.parse(localStorage.getItem('shortcutOrder'));
    if (savedShortcuts) {
        savedShortcuts.forEach(data => {
            const shortcut = document.getElementById(data.id);
            if (shortcut) {
                
                shortcut.style.position = 'absolute';
                shortcut.style.left = data.left;
                shortcut.style.top = data.top;
                container.appendChild(shortcut);
            }
        });
    }
}

window.onload = loadShortcutsOrder;
