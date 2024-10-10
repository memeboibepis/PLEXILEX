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

        if (e.target.closest('.tab-box-header')) {
            e.preventDefault(); 
            isDragging = true; 
            draggedShortcut = e.target.closest('.tab-box'); 
            startX = e.clientX;
            startY = e.clientY;
            draggedShortcut.classList.add('dragging');
        } else {
          
            isSelecting = true; 
            startX = e.pageX;
            startY = e.pageY;
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
                shortcut.style.borderColor = '#C93131'; 
            } else {
                shortcut.style.borderColor = 'transparent'; 
            }
        });
    } else if (isDragging && draggedShortcut) {
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        draggedShortcut.style.left = `${draggedShortcut.offsetLeft + deltaX}px`;
        draggedShortcut.style.top = `${draggedShortcut.offsetTop + deltaY}px`;
        startX = e.clientX;
        startY = e.clientY;
    }
});

document.addEventListener('mouseup', () => {
    if (isSelecting) {
        
        isSelecting = false;
        selectionBox.style.display = 'none'; 

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
