// Variable Declarations


// Created variables that hold the input fields.
const nameInput = document.getElementById('name');
const jobRoleInput = document.getElementById('title');
const otherInput = document.getElementById('other-title');
const colorSelect = document.getElementById('color');
const colorSelectDefault = document.createElement('option',);
colorSelectDefault.value = "default";
colorSelectDefault.text = 'Please select a T-shirt theme';
colorSelectDefault.style.display = "block";
const designSelect = document.getElementById('design');
const activitiesList = document.querySelector('fieldset.activities');
const activities = activitiesList.children;
let costText =document.createElement('p');
costText.id = 'cost-text';
activitiesList.appendChild(costText);
costText = document.getElementById('cost-text');


// Call functions and set up page.


// Sets the focus on the nameInput
nameInput.focus();

// Hide select and input fields
hideItem(otherInput);

// Set colorSelect's default value
colorSelect.insertAdjacentElement("afterbegin",colorSelectDefault);
colorSelect.value = "default";

// Set Values
for (let i = 0; i < colorSelect.length; i++) {
    hideItem(colorSelect[i]);
}


// Functions


// Creates function to display elements
function displayItem(itemToDisplay) {
    itemToDisplay.style.display = 'block';
}

// Creates function to hide elements
function hideItem(itemToDisplay) {
    itemToDisplay.style.display = 'none';
}


// Event Listeners


// Create event listener for the jobRoleInput and reveal the otherInput field when 'other' is selected.
jobRoleInput.addEventListener('click', (e) => {
    if (e.target.value === 'other') {
        displayItem(otherInput);
    }
});

designSelect.addEventListener('click', (e) => {
    if (e.target.value === 'js puns') {

        for (let i = 0; i < colorSelect.children.length; i++) {
            let val = colorSelect[i].value;
            if (val === 'tomato' || val === 'steelblue' || val === 'dimgrey' || val === 'default') {
                hideItem(colorSelect[i]);
            } else {
                displayItem(colorSelect[i]);
            }

            colorSelect.value = 'default';
        }
    } else if (e.target.value === 'heart js') {
        for (let i = 0; i < colorSelect.children.length; i++) {
            let val = colorSelect[i].value;
            if (val === 'tomato' || val === 'steelblue' || val === 'dimgrey') {
                displayItem(colorSelect[i]);
            } else {
                hideItem(colorSelect[i]);
            }

            colorSelect.value = 'default';
        }
    } else {
        colorSelect.value = 'default';
        for (let i = 0; i < colorSelect.children.length; i++) {
            hideItem(colorSelect[i]);
        }
    }
});


// I learned how to grey out from here: https://stackoverflow.com/questions/5081690/how-to-gray-out-a-html-element
// Create an event listener to grey out activities that interfere with the currently selected ones.
// Display the total cost of the conference.
activitiesList.addEventListener('change', (e) => {
    let selectedTime = e.target.getAttribute('data-day-and-time');
    let totalCost = 0;

    console.log(selectedTime);

    if (e.target.checked) {
        for (let i = 0; i < activities.length; i++) {
            if (activities[i].firstElementChild !== null) {
                let choice = activities[i].firstElementChild;
                if (selectedTime === choice.getAttribute('data-day-and-time')) {
                    choice.disabled = true;
                    choice.parentElement.style.opacity = .6;
                }
            }
        }
    } else {
        for (let i = 0; i < activities.length; i++) {
            if (activities[i].firstElementChild !== null) {
                let choice = activities[i].firstElementChild;
                if (selectedTime === choice.getAttribute('data-day-and-time')) {
                    choice.disabled = false;
                    choice.parentElement.style.opacity = 1;
                }
            }
        }
    }
    e.target.parentElement.style.opacity = 1;
    e.target.disabled = false;

    for (let i = 0; i < activities.length; i++) {
        if (activities[i].firstElementChild !== null) {
            if (activities[i].firstElementChild.checked) {
                totalCost += parseInt(activities[i].firstElementChild.getAttribute('data-cost'));
            }
        }
    }
    
    costText.textContent = `Total: $${totalCost}`;
});