  const selectionBox = document.getElementById('selectionBox');
    const shortcutContainer = document.getElementById('shortcut-container');
    const shortcuts = document.querySelectorAll('.shortcut');

    let isSelecting = false;
    let startX, startY;

    shortcutContainer.addEventListener('mousedown', (e) => {
        if (e.button === 0) { 
            isSelecting = true;
            startX = e.pageX;
            startY = e.pageY;

            selectionBox.style.left = `${startX}px`;
            selectionBox.style.top = `${startY}px`;
            selectionBox.style.width = `0px`;
            selectionBox.style.height = `0px`;
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

                if (rect.left < selectionRect.right &&
                    rect.right > selectionRect.left &&
                    rect.top < selectionRect.bottom &&
                    rect.bottom > selectionRect.top) {
                    shortcut.style.borderColor = '#C93131'; 
                } else {
                    shortcut.style.borderColor = 'transparent'; 
                }
            });
        }
    });

    document.addEventListener('mouseup', () => {
        isSelecting = false;
        selectionBox.style.display = 'none'; 

        shortcuts.forEach(shortcut => {
            shortcut.style.borderColor = 'transparent'; 
        });
    });
