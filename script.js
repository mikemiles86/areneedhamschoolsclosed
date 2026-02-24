
async function checkSchoolStatus() {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Checking status...';
    statusDiv.style.background = '#FFC72C';
    statusDiv.style.color = '#002855';

    try {
        const response = await fetch('https://www.needham.k12.ma.us/', { mode: 'cors' });
        const html = await response.text();
        // Look for closure message (customize this string as needed)
        const closedRegex = /school(s)? (is|are) closed|no school|schools closed|closed due to/i;
        const isClosed = closedRegex.test(html);
        if (isClosed) {
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
