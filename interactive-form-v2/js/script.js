
// Created variables that hold the input fields.
const nameInput = document.getElementById('name');
const jobRoleInput = document.getElementById('title');
const otherInput = document.getElementById('other-title');

// Sets the focus on the nameInput
nameInput.focus();
// Hide the other title input field
otherInput.type = 'hidden';

// Create event listener for the jobRoleInput and reveal the otherInput field when 'other' is selected.
jobRoleInput.addEventListener('click', (e) => {
    if (e.target.value === 'other') {
        console.log('It works!');
        otherInput.type = 'text';
    }
});