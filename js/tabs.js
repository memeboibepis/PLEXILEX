const tabs = {
    chrome: document.getElementById('chrome-tab'),
    files: document.getElementById('files-tab'),
    settings: document.getElementById('settings-tab'),
    pvz: document.getElementById('pvz-tab'),
    doom: document.getElementById('doom-tab'),
    fnaf: document.getElementById('fnaf-tab'),
    fnaf2: document.getElementById('fnaf2-tab'),
    geometrydash: document.getElementById('geometrydash-tab'),
    discord: document.getElementById('discord-tab'),
    roblox: document.getElementById('roblox-tab'),
};

document.querySelectorAll('.icon-box').forEach(icon => {
    icon.addEventListener('click', (e) => {
        const targetId = e.target.closest('.icon-box').id;
        openTab(targetId);
    });
});

function openTab(tab) {
    tabs[tab].classList.add('open'); 
    document.getElementById(tab).classList.add('active-tab');
    makeDraggable(tabs[tab]);  
}

function closeTab(tab) {
    tabs[tab].classList.remove('open');
    document.getElementById(tab).classList.remove('active-tab'); 
}

function minimizeTab(tab) {
    tabs[tab].style.height = '40px'; 
    tabs[tab].classList.remove('active-tab');
}

function maximizeTab(tab) {
    tabs[tab].style.width = '100%'; 
    tabs[tab].style.height = '100%'; 
    tabs[tab].style.left = '0'; 
    tabs[tab].style.top = '0';
}

document.querySelectorAll('.controls i').forEach(control => {
    control.addEventListener('mousedown', (e) => {
        e.stopPropagation(); 
    });
});

document.querySelectorAll('.controls i').forEach(control => {
    control.addEventListener('click', (e) => {
        const tabId = e.target.closest('.tab-box').id;

        if (control.classList.contains('fa-times')) {
            closeTab(tabId);
        } else if (control.classList.contains('bx-minus')) {
            minimizeTab(tabId);
        } else if (control.classList.contains('bx-square')) {
            maximizeTab(tabId);
        }
    });
});

function makeDraggable(element) {
    const header = element.querySelector('.tab-box-header');
    let isDragging = false;
    let startX, startY, initialX, initialY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const box = header.closest('.tab-box');
        initialX = box.offsetLeft;
        initialY = box.offsetTop;
        box.classList.add('dragging');
        document.body.classList.add('dragging');
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        const box = header.closest('.tab-box');
        box.classList.remove('dragging');
        document.body.classList.remove('dragging');
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const box = header.closest('.tab-box');
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            box.style.left = initialX + deltaX + 'px';
            box.style.top = initialY + deltaY + 'px'; 
        }
    });

    header.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        const box = header.closest('.tab-box');
        initialX = box.offsetLeft;
        initialY = box.offsetTop;
        box.classList.add('dragging');
        document.body.classList.add('dragging');
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
        const box = header.closest('.tab-box');
        box.classList.remove('dragging');
        document.body.classList.remove('dragging');
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const box = header.closest('.tab-box');
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            box.style.left = initialX + deltaX + 'px';
            box.style.top = initialY + deltaY + 'px';
        }
    });
}
