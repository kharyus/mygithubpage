
inputs = ["name", "phone", "email", "comments"];

/* Hides or Shows all error paragraphs. */
function hideErrors()
{
    var errors = document.getElementsByClassName("error");
    for (var i = 0; i < errors.length; i++)
	errors[i].style.display = "none";
}

/* Returns whether a control is empty or not */
function isEmpty(string)
{
    if (string == "" || string == null)
	return true;
    return false;
}

/* Checks whether the form is valid */
function isFormValid()
{
    var valid = true;

    for (var i = 0; i < inputs.length; i++)
    {
	var ele = document.getElementById(inputs[i]);

	if (isEmpty(ele.value))
	{
	    // If is the first error, select the field
	    if (valid)
		ele.select();

	    valid = false;

	    var error = document.getElementById(inputs[i] + "Error");
	    error.style.display = "initial";
	}
	// Verification for phone number
	else if (inputs[i] == "phone")
	{
	    var pattern = /^\d{10}$/;

	    if (!pattern.test(ele.value))
	    {
		// If is the first error, select the field
		if (valid)
		    ele.select();

		valid = false;

		error = document.getElementById(inputs[i] + "RegexpError");
		error.style.display = "initial";
	    }
	}
	else if (inputs[i] == "email")
	{
	    var pattern = /^.+@.+\..+$/;

	    if (!pattern.test(ele.value))
	    {
		// If is the first error, select the field
		if (valid)
		    ele.select();

		valid = false;

		error = document.getElementById(inputs[i] + "RegexpError");
		error.style.display = "initial";
	    }
	}
    }

    return valid;
}

/* Validates the form */
function validate(e)
{
    try {
	hideErrors();

        if(!isFormValid()){
	    e.preventDefault();
	   return false;
        }
    }
    catch (error) {
	e.preventDefault();
	throw new Error(error.message);
    }
    return true;
}

/* Clears the form */
function resetForm(e)
{
    // Confirm that the user wants to clear the form
    if (confirm('Are you sure?'))
    {
    	hideErrors();

    	// Set focus to the first field
    	document.getElementById("name").focus();
    	
    	return true;
    }

    // Prevents the form from clearing
    e.preventDefault();

    return false;
}

/* Function for when page is loaded */
function onLoad()
{
    // Hides all errors
    hideErrors();

    // Add validate function to submit button
    document.getElementById("submit").addEventListener("click", validate, false);

    // Add clear function to Clear button
    document.getElementById("clear").addEventListener("click", resetForm, false);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", onLoad, false);
