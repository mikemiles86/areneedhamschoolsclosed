async function checkSchoolStatus() {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Checking status...';
    statusDiv.style.background = '#FFC72C';
    statusDiv.style.color = '#002855';

    try {
        const response = await fetch('status.txt');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = (await response.text()).trim().toLowerCase();

        if (text === 'yes') {
            statusDiv.textContent = 'SUPRISINGLY, YES.';
            statusDiv.style.background = '#FFC72C';
            statusDiv.style.color = '#002855';
        } else {
            statusDiv.textContent = 'AS USUAL, NO.';
            statusDiv.style.background = '#002855';
            statusDiv.style.color = '#FFC72C';
        }
    } catch (e) {
        statusDiv.textContent = 'Unable to check status.';
        statusDiv.style.background = '#FFC72C';
        statusDiv.style.color = '#d32f2f';
    }
}

// Initial status on page load
checkSchoolStatus();
