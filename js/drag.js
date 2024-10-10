const selectionBox = document.getElementById('selectionBox');
let startX, startY;

document.addEventListener('mousedown', (e) => {
    
    const isShortcut = e.target.closest('.shortcut');
    
    if (isShortcut) {
        return; 
    }

    startX = e.pageX;
    startY = e.pageY;
    
    selectionBox.style.width = '0px';
    selectionBox.style.height = '0px';
    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;
    selectionBox.style.display = 'block'; 
});

document.addEventListener('mousemove', (e) => {
    if (e.buttons === 1 && selectionBox.style.display === 'block') {
        const width = Math.abs(e.pageX - startX);
        const height = Math.abs(e.pageY - startY);

        selectionBox.style.width = `${width}px`;
        selectionBox.style.height = `${height}px`;

        selectionBox.style.left = `${Math.min(e.pageX, startX)}px`;
        selectionBox.style.top = `${Math.min(e.pageY, startY)}px`;
    }
});

document.addEventListener('mouseup', () => {
    selectionBox.style.display = 'none';
});
