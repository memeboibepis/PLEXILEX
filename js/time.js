function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    const month = now.getMonth() + 1; 
    const day = now.getDate();
    const year = now.getFullYear();

    const dateString = `${month}/${day}/${year}`;

    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

setInterval(updateClock, 1000);
updateClock();
