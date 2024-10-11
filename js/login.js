function updateTime() {
    const now = new Date();
   
    document.getElementById('time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}
setInterval(updateTime, 1000);
updateTime();

    document.body.addEventListener('click', () => {
        const loginContainer = document.getElementById('loginContainer');
        const datetime = document.getElementById('datetime');
        loginContainer.classList.add('active');
        datetime.style.display = 'none';
    });

    document.getElementById('loginButton').addEventListener('click', () => {
        const passwordInput = document.getElementById('passwordInput').value;
        const correctPassword = 'Guest'; 

        if (passwordInput === correctPassword) {
            
            window.location.href = '/main.html';
        } else {
            alert('Incorrect password. Please try again.');
        }
    });
