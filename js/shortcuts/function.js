function openChromeTab() {
    document.getElementById("chrome").click();  
}

function openPVZTab() {
    document.getElementById("pvz").click();  
}

function openGeometryDashTab() {
    document.getElementById("geometrydash").click();  
}

document.getElementById("shortcutchrome").addEventListener("click", openChromeTab);
document.getElementById("shortcutpvz").addEventListener("click", openPVZTab);
document.getElementById("shortcutgeometrydash").addEventListener("click", openGeometryDashTab);
