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

let currentMaximizedTab = null;

function openTab(tab) {
    tabs[tab].style.display = 'block';
    tabs[tab].classList.add('open');
    document.getElementById(tab).classList.add('active-tab');
}

function closeTab(tab) {
    tabs[tab].style.display = 'none';
    tabs[tab].classList.remove('open');
    document.getElementById(tab).classList.remove('active-tab');
    if (currentMaximizedTab === tab) {
        currentMaximizedTab = null;
    }
}

function minimizeTab(tab) {
    const box = tabs[tab];
    box.style.height = '40px';
    box.style.width = '200px';
    box.style.top = '50px';
    box.style.left = '50px';
    box.classList.remove('active-tab');
}

function maximizeTab(tab) {
    const box = tabs[tab];
    if (currentMaximizedTab !== tab) {
        if (currentMaximizedTab) {
            minimizeTab(currentMaximizedTab);
        }
        box.style.width = '100%';
        box.style.height = '100%';
        box.style.top = '0';
        box.style.left = '0';
        box.style.zIndex = '999'; 
        currentMaximizedTab = tab;
    } else {
        minimizeTab(tab);
    }
}

document.querySelectorAll('.controls i').forEach(control => {
    control.addEventListener('mousedown', (e) => {
        e.stopPropagation(); 
    });

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

document.querySelectorAll('.tab-box-header').forEach(header => {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    header.addEventListener('mousedown', (e) => {
        if (!e.target.closest('.controls')) { 
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const box = header.closest('.tab-box');
            initialX = box.offsetLeft;
            initialY = box.offsetTop;
            box.classList.add('dragging');
            document.body.classList.add('dragging');
        }
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
});
