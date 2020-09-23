// Variable Declarations


// Prepare variables
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const jobRoleInput = document.getElementById('title');
const otherInput = document.getElementById('other-title');


const colorSelectDefault = document.createElement('option');
colorSelectDefault.value = "default";
colorSelectDefault.text = 'Please select a T-shirt theme';
colorSelectDefault.style.display = "block";
const colorSelect = document.getElementById('color');
colorSelect.insertAdjacentElement("afterbegin",colorSelectDefault);
colorSelect.value = "default";
const shirtColorDiv = document.getElementById('shirt-colors');
shirtColorDiv.style.display = 'none';

const designSelect = document.getElementById('design');
designSelect.firstElementChild.disabled = true;

const activitiesList = document.querySelector('fieldset.activities');
activitiesList.style.border = '2px solid #173e43';
const activities = activitiesList.children;
let costText = document.createElement('p');
costText.id = 'cost-text';
activitiesList.appendChild(costText);
costText = document.getElementById('cost-text');

const paymentSelect = document.getElementById('payment');

const cardDiv = document.querySelector('div.credit-card');
const cardNumInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

const paypalDiv = document.querySelector('div.paypal');
const bitcoinDiv = document.querySelector('div.bitcoin');

let isNameValid = true;
let isEmailValid = true;
let isActivityValid = true;
let isCardValid = true;
let isZipValid = true;
let isCvvValid = true;

const submitBtn = document.querySelector('button');


// Call functions and set up page.


// Sets the focus on the nameInput
nameInput.focus();

// Hide select and input fields
hideItem(otherInput);

// Hide default colorSelect options.
for (let i = 0; i < colorSelect.length; i++) {
    hideItem(colorSelect[i]);
}

// Set 'credit card' as the default value of the selector.
paymentSelect.value = 'credit card';
paymentSelect.firstElementChild.disabled = true;
// hide the paypal and bitcoin divs.
hideItem(paypalDiv);
hideItem(bitcoinDiv);

// Functions


// Creates function to display elements
function displayItem(itemToDisplay) {
    itemToDisplay.style.display = 'block';
}

// Creates function to hide elements
function hideItem(itemToDisplay) {
    itemToDisplay.style.display = 'none';
}

// Visually display an error on the element
function isInvalid (element) {
    element.style.borderColor = "red";
}

// Clear any visual error displays
function isValid (element) {
    element.style.borderColor = '#173e43';
}

// Determines if the username is valid and then displays the appropriate warnings if not.
function validateName () {
    let username = nameInput.value;

    if (username.length > 0) {
        isValid(nameInput);
        isNameValid = true;
    } else {
        isInvalid(nameInput);
        isNameValid = false;
    }
}

// Determines if the email address is valid and then displays the appropriate warnings if not.
function validateEmail () {
    let emailAddress = emailInput.value;

    if (/[^@]+@[^@.]+\.[a-z]/i.test(emailAddress)) {
        isValid(emailInput);
        isEmailValid = true;
    } else {
        isInvalid(emailInput);
        isEmailValid = false;
    }
}

// Determines if there is at least one activity checked and then displays the appropriate warnings if not.
function validateActivities () {
    let boxesChecked = 0;

    for (let i = 0; i < activities.length; i++) {
        if (activities[i].firstElementChild !== null) {
            if (activities[i].firstElementChild.checked) {
                boxesChecked++;
            }
        }
    }

    if (boxesChecked > 0) {
        isValid(activitiesList, 'rgba(8, 63, 87, 0.6)');
        isActivityValid = true;
    } else {
        isInvalid(activitiesList);
        isActivityValid = false;
        costText.textContent = `You must select at least one.`;
        costText.style.color = 'red';
    }
}

//
function validateCard () {

    if (paymentSelect.value === 'credit card') {
        if (/^\d{13,16}$/.test(cardNumInput.value)) {
            isValid(cardNumInput);
            isCardValid = true;
        } else {
            isInvalid(cardNumInput);
            isCardValid = false;
        }
    }
}

function validateZip () {

    if (paymentSelect.value === 'credit card') {
        if (/^\d{5}$/.test(zipInput.value)) {
            isValid(zipInput);
            isZipValid= true;
        } else {
            isInvalid(zipInput);
            isZipValid = false;
        }
    }
}

function validateCVV () {

    if (paymentSelect.value === 'credit card') {
        if (/^\d{3}$/.test(cvvInput.value)) {
            isValid(cvvInput);
            isCvvValid = true;
        } else {
            isInvalid(cvvInput);
            isCvvValid = false;
        }
    }
}


// Event Listeners


// Create event listener for the jobRoleInput and reveal the otherInput field when 'other' is selected.
jobRoleInput.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        displayItem(otherInput);
    }
});

designSelect.addEventListener('change', (e) => {
    shirtColorDiv.style.display = 'block';
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
    costText.style.color = '#000';
    validateActivities();
});

// Displays the correct div element based on the payment selection
paymentSelect.addEventListener('change', (e) => {
    if (paymentSelect.value === 'bitcoin') {
        hideItem(paypalDiv);
        hideItem(cardDiv);
        displayItem(bitcoinDiv)
    } else if (paymentSelect.value === 'paypal') {
        hideItem(bitcoinDiv);
        hideItem(cardDiv);
        displayItem(paypalDiv)
    } else if (paymentSelect.value === 'credit card') {
        hideItem(bitcoinDiv);
        hideItem(paypalDiv);
        displayItem(cardDiv)
    }
})

nameInput.addEventListener('keyup', (e) => {validateName()});
nameInput.addEventListener('focusout', (e) => {validateName()});
emailInput.addEventListener('keyup', (e) => {validateEmail()});
emailInput.addEventListener('focusout', (e) => {validateEmail()});
activitiesList.addEventListener('change', (e) => {validateActivities()});
cardNumInput.addEventListener('keyup', (e) => {validateCard()});
cardNumInput.addEventListener('focusout', (e) => {validateCard()});
zipInput.addEventListener('keyup', (e) => {validateZip()});
zipInput.addEventListener('focusout', (e) => {validateZip()});
cvvInput.addEventListener('keyup', (e) => {validateCVV()});
cvvInput.addEventListener('focusout', (e) => {validateCVV()});

submitBtn.addEventListener('click', (e) => {
    console.log('submitted');
    validateName();
    validateEmail();
    validateActivities();
    validateCard();
    validateZip();
    validateCVV();

    if (!isNameValid || !isEmailValid || !isActivityValid || !isCardValid || !isZipValid || !isCvvValid) {
        console.log('prevented');
        e.preventDefault();
    }
})