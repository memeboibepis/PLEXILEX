        setTimeout(() => {
            document.getElementById("loading-screen").style.display = "none"; 
            document.getElementById("login-screen").style.display = "flex"; 
        }, 3000); 

        function login() {
           
            const username = document.querySelector('input[type="text"]').value;
            const password = document.querySelector('input[type="password"]').value;

            if (username && password) {
                
                document.getElementById("login-screen").style.display = "none";
                document.getElementById("main-content").style.display = "block";
            } else {
                alert("Please enter both username and password!");
            }
        }

        function updateTime() {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById("time").textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById("date").textContent = now.toLocaleDateString('en-US', options);
        }

        setInterval(updateTime, 1000); 
        updateTime(); 
