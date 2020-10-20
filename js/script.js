
/*
Variable Declarations
*/


// Access input fields and store them in variables.
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const jobRoleInput = document.getElementById('title');
const otherInput = document.getElementById('other-title');
const cardNumInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

// Set up the color select's default text option.
const colorSelectDefault = document.createElement('option');
colorSelectDefault.value = "default";
colorSelectDefault.text = 'Please select a T-shirt theme';
colorSelectDefault.style.display = "block";

// Declare and set the color selection.
const colorSelect = document.getElementById('color');
colorSelect.insertAdjacentElement("afterbegin",colorSelectDefault);
colorSelect.value = "default";

// Hide the color options and label until a design is selected.
const shirtColorDiv = document.getElementById('shirt-colors');
shirtColorDiv.style.display = 'none';

// Declare and set up the design select element
const designSelect = document.getElementById('design');
designSelect.firstElementChild.disabled = true;

// Create the activitiesList variable to hold the fieldset containing the
//activites checkboxes, labels, and costText element.
const activitiesList = document.querySelector('fieldset.activities');
activitiesList.style.border = '2px solid #173e43';

// The activies contained in the fieldset (as well as the legend and costText element).
const activities = activitiesList.children;

// Create the costText element.
// This will display the total cost of the chosen activies, or the error message if none are chosen.
let costText = document.createElement('p');
costText.id = 'cost-text';
activitiesList.appendChild(costText);

// Create the paymentSelect variable to hold the payment options selector.
const paymentSelect = document.getElementById('payment');

// The div containing the input elements for the credit card info.
const cardDiv = document.querySelector('div.credit-card');

//
const paypalDiv = document.querySelector('div.paypal');
const bitcoinDiv = document.querySelector('div.bitcoin');

// Booleans that signify whether the input options contain satisfactory answers.
let isNameValid = true;
let isEmailValid = true;
let isActivityValid = true;
let isCardValid = true;
let isZipValid = true;
let isCvvValid = true;

// The submit button for the form.
const submitBtn = document.querySelector('button');

// Create email error message.
const emailError = document.createElement('p');
emailError.id = 'email-error';
emailError.style.color = 'red';

// Add the email error message to the form.
emailInput.parentElement.insertBefore(emailError, emailInput);



/*
Set up page.
*/


// Sets the focus on the nameInput.
nameInput.focus();

// Hide select and input fields.
hideItem(otherInput);

// Hide default colorSelect options.
for (let i = 0; i < colorSelect.length; i++) {
    hideItem(colorSelect[i]);
}

// Set 'credit card' as the default value of the selector.
paymentSelect.value = 'credit card';
paymentSelect.firstElementChild.disabled = true;

// Hide the paypal and bitcoin divs.
hideItem(paypalDiv);
hideItem(bitcoinDiv);


/*
Functions
*/


// Displays an element.
function displayItem(itemToDisplay) {
    itemToDisplay.style.display = 'block';
}

// Hides an element.
function hideItem(itemToDisplay) {
    itemToDisplay.style.display = 'none';
}

// Visually displays an error on the element.
function isInvalid (element) {
    element.style.borderColor = "red";
}

// Clear any visual error displays.
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
// I learned how to do this email validation from https://emailregex.com/
// The regex will not determine if the email is valid. It just makes sure that it follows a valid format.
function validateEmail () {
    let emailAddress = emailInput.value;

    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(emailAddress)) {
        isValid(emailInput);
        isEmailValid = true;
        emailError.textContent = '';
    }  else if (!(emailAddress.length > 0)) {
        isInvalid(emailInput);
        isEmailValid = false;
        emailError.textContent = 'Field is empty.';
    } else {
        isInvalid(emailInput);
        isEmailValid = false;
        emailError.textContent = 'Email is not a valid format.';
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

// Determines if the card number is valid and then displays the appropriate warnings if not.
function validateCard () {

    isValid(cardNumInput);
    isCardValid = true;

    if (paymentSelect.value === 'credit card') {
        if (!/^\d{13,16}$/.test(cardNumInput.value)) {
            isInvalid(cardNumInput);
            isCardValid = false;
        }
    }
}

// Determines if the zip code is valid and then displays the appropriate warnings if not.
function validateZip () {

    isValid(zipInput);
    isZipValid= true;

    if (paymentSelect.value === 'credit card') {
        if (!/^\d{5}$/.test(zipInput.value)) {
            isInvalid(zipInput);
            isZipValid = false;
        }
    }
}

// Determines if the cvv is valid and then displays the appropriate warnings if not.
function validateCVV () {

        isValid(cvvInput);
        isCvvValid = true;
    
    if (paymentSelect.value === 'credit card') {
        if (!/^\d{3}$/.test(cvvInput.value)){
            isInvalid(cvvInput);
            isCvvValid = false;
        }
    }
}

// Generates a repeated section of code that only had two differences. It carries out the greying of items.
function createGreyOut (dateTime, bool, opaqueVal) {
    for (let i = 0; i < activities.length; i++) {
        if (activities[i].firstElementChild !== null) {
            let choice = activities[i].firstElementChild;
            if (dateTime === choice.getAttribute('data-day-and-time')) {
                choice.disabled = bool;
                choice.parentElement.style.opacity = opaqueVal;
            }
        }
    }
}


/*
Event Listeners
*/


// An event listener for the jobRoleInput - Reveals the otherInput field when 'other' is selected.
jobRoleInput.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        displayItem(otherInput);
    }
});

// An event listener for the designSelect - Displays the color options corresponding to the chosen design.
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
// An event listener for activitiesList - Grey out activities that interfere with the currently selected ones.
// It also displays the total cost of the conference.
activitiesList.addEventListener('change', (e) => {
    let selectedTime = e.target.getAttribute('data-day-and-time');
    let totalCost = 0;

    if (e.target.checked) {
        createGreyOut(selectedTime, true, .6);
    } else {
        createGreyOut(selectedTime, false, 1);
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

// An event listener for the paymentSelect - Displays the correct div element based on the payment selection.
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

// The event listeners that add the error validation functions as result of change to the inputs.
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

// An event listener for the submitBtn - Prevents submission if one of the inputs is incorrectly completed.
submitBtn.addEventListener('click', (e) => {
    validateName();
    validateEmail();
    validateActivities();
    validateCard();
    validateZip();
    validateCVV();

    if (!isNameValid || !isEmailValid || !isActivityValid || !isCardValid || !isZipValid || !isCvvValid) {
        e.preventDefault();
    }
})