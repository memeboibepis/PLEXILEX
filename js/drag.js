const selectionBox = document.getElementById('selectionBox');
const shortcuts = document.querySelectorAll('.shortcut'); 

let startX, startY, isDragging = false, isSelecting = false;  
function isShortcutSelected(shortcut, box) {
    const boxRect = box.getBoundingClientRect();
    const shortcutRect = shortcut.getBoundingClientRect();

    return !(shortcutRect.right < boxRect.left || 
             shortcutRect.left > boxRect.right || 
             shortcutRect.bottom < boxRect.top || 
             shortcutRect.top > boxRect.bottom);
}

document.getElementById('shortcut-container').addEventListener('mousedown', (e) => {
    if (e.button === 0) { 
        if (!e.target.classList.contains('shortcut')) {
           
            isSelecting = true;
            isDragging = true;
            startX = e.pageX;
            startY = e.pageY;

            selectionBox.style.left = `${startX}px`;
            selectionBox.style.top = `${startY}px`;
            selectionBox.style.width = '0px';
            selectionBox.style.height = '0px';
            selectionBox.style.display = 'block';

            shortcuts.forEach(shortcut => shortcut.classList.remove('selected'));
        } else {
            
            isSelecting = false;

            const shortcutElement = e.target;
            const rect = shortcutElement.getBoundingClientRect();

            let offsetX = e.pageX - rect.left;
            let offsetY = e.pageY - rect.top;

            function onMouseMove(event) {
                const x = event.pageX - offsetX;
                const y = event.pageY - offsetY;
                shortcutElement.style.position = 'absolute';
                shortcutElement.style.left = `${x}px`;
                shortcutElement.style.top = `${y}px`;
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            e.preventDefault();
        }
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging && isSelecting) {
        const currentX = e.pageX;
        const currentY = e.pageY;

        selectionBox.style.width = `${Math.abs(currentX - startX)}px`;
        selectionBox.style.height = `${Math.abs(currentY - startY)}px`;

        selectionBox.style.left = `${Math.min(currentX, startX)}px`;
        selectionBox.style.top = `${Math.min(currentY, startY)}px`;

        shortcuts.forEach(shortcut => {
            if (isShortcutSelected(shortcut, selectionBox)) {
                shortcut.classList.add('selected');
            } else {
                shortcut.classList.remove('selected');
            }
        });
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        selectionBox.style.display = 'none'; 
    }
});

shortcuts.forEach(shortcut => {
    shortcut.addEventListener('click', (e) => {
        if (!isSelecting) {
            
            console.log(`Shortcut ${e.target.id} clicked!`);
       
        } else {
          
            e.preventDefault();
            e.stopPropagation();
        }
    });
});

document.getElementById('shortcut-container').addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'DIV') {
        e.preventDefault();
    }
});
