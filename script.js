const userAvatar = document.querySelector('.user-avatar');
const profileDropdown = document.querySelector('.profile-dropdown');
const dateDropdown = document.querySelector('.date-dropdown');
const calendarInput = document.getElementById('calendarInput');
const mainPage = document.getElementById('mainPage');
const transactionPage = document.getElementById('transactionPage');
const cancelBtn = document.querySelector('.btn-cancel');

// Profile dropdown toggle
userAvatar.addEventListener('click', function(event) { 
    event.stopPropagation(); 
    profileDropdown.classList.toggle('show'); 
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) { 
    const isClickInside = userAvatar.contains(event.target) || profileDropdown.contains(event.target); 
    if (!isClickInside) {
        profileDropdown.classList.remove('show');
    }
});

// Date picker triggering
dateDropdown.addEventListener('click', () => { 
    if (calendarInput.showPicker) {
        calendarInput.showPicker(); 
    } else {
        calendarInput.focus();
    }
});

calendarInput.addEventListener('change', () => {
    const selectedDate = new Date(calendarInput.value);
    if (!isNaN(selectedDate)) {
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        dateDropdown.querySelector('span').textContent = formattedDate;
    }
});

// Open Add Transaction View
function openaddnew() { 
    mainPage.style.display = 'none'; 
    transactionPage.style.display = 'flex'; 
    transactionPage.style.justifyContent = 'center'; 
    transactionPage.style.alignItems = 'center'; 
    transactionPage.style.height = '100%'; 
    transactionPage.style.minHeight = '100vh'; 
    profileDropdown.classList.remove('show'); 
}

// Close Add Transaction View
function closebtn() { 
    mainPage.style.display = 'block'; 
    transactionPage.style.display = 'none'; 
    
    const webContainer = document.querySelector('.web-container'); 
    webContainer.style.display = 'flex';
    webContainer.style.flexDirection = 'column'; 
    
    const centerHub = document.querySelector('.center-hub'); 
    if (centerHub) {
        centerHub.style.display = 'flex'; 
        centerHub.style.justifyContent = 'center'; 
        centerHub.style.alignItems = 'center'; 
        centerHub.style.margin = '0 auto 20px auto'; 
    }
}

// Attach close functionality to Cancel button
if (cancelBtn) {
    cancelBtn.addEventListener('click', closebtn);
}
