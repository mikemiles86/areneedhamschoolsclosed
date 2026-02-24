
async function checkSchoolStatus() {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Checking status...';
    statusDiv.style.background = '#FFC72C';
    statusDiv.style.color = '#002855';

    try {
        const response = await fetch('https://www.needham.k12.ma.us/', { mode: 'cors' });
        const html = await response.text();
        // Create a DOM parser to search for the banner or element containing "No school:"
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        // Search for any element containing the phrase "No school:"
        const elements = Array.from(doc.querySelectorAll('body *')).filter(el => el.textContent && el.textContent.match(/No School:/));
        if (elements.length > 0) {
            // Found a closure message
            statusDiv.textContent = 'NO';
            statusDiv.style.background = '#002855';
            statusDiv.style.color = '#FFC72C';
        } else {
            statusDiv.textContent = 'YES';
            statusDiv.style.background = '#FFC72C';
            statusDiv.style.color = '#002855';
        }
    } catch (e) {
        statusDiv.textContent = 'Unable to check status.';
        statusDiv.style.background = '#FFC72C';
        statusDiv.style.color = '#d32f2f';
    }
}

document.getElementById('refreshBtn').addEventListener('click', checkSchoolStatus);

// Initial status on page load
checkSchoolStatus();
