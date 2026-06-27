const userAvatar = document.querySelector('.user-avatar');
const profileDropdown = document.querySelector('.profile-dropdown');
const dateDropdown = document.querySelector('.date-dropdown');
const calendarInput = document.getElementById('calendarInput');
const mainPage = document.getElementById('mainPage');
const transactionPage = document.getElementById('transactionPage');
// Profile dropdown toggle - NO HIDING OF MAIN PAGE userAvatar.addEventListener('click', function(event) { 
// Stop the click from bubbling up    event.stopPropagation();     // Toggle the dropdown visibility    profileDropdown.classList.toggle('show'); 
});
// Close dropdown when clicking outside document.addEventListener('click', function(event) {     const isClickInside = userAvatar.contains(event.target) || profileDropdown.contains(event.target); 
if (!isClickInside) {
    profileDropdown.classList.remove('show');
}
});
// Date picker dateDropdown.addEventListener('click', () => {     calendarInput.showPicker(); 
});
calendarInput.addEventListener('change', () => {
    const selectedDate = new Date(calendarInput.value);
    const formattedDate = selectedDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    dateDropdown.querySelector('span').textContent = formattedDate;
});
//Open Add Transaction function openaddnew() {     mainPage.style.display = 'none';     transactionPage.style.display = 'flex';     transactionPage.style.justifyContent = 'center';     transactionPage.style.alignItems = 'center';     transactionPage.style.height = '100%';     transactionPage.style.minHeight = '100vh';     // Close profile dropdown if open     profileDropdown.classList.remove('show'); 
}
// Close Add Transaction function closebtn() {     mainPage.style.display = 'block';     transactionPage.style.display = 'none'; // Reset any potential layout issues    const webContainer = document.querySelector('.web-container'); 
webContainer.style.display = 'flex';
webContainer.style.flexDirection = 'column'; // Ensure center-hub is properly centered     const centerHub = document.querySelector('.center-hub');     centerHub.style.display = 'flex';     centerHub.style.justifyContent = 'center';     centerHub.style.alignItems = 'center';     centerHub.style.margin = '0 auto 20px auto'; 
}