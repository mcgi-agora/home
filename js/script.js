// Add event listener to the form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get the input values
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var message = document.querySelector('#message').value;
  
    // Validate the input values
    if (name === '' || email === '' || message === '') {
      alert('Please fill out all the fields');
    } else {
      // Submit the form data to Google Sheets
      submitToGoogleSheets(name, email, message);
    }
  });
  
  function submitToGoogleSheets(name, email, message) {
    // Replace YOUR_SHEET_ID with the actual sheet ID
    var url = "https://script.google.com/macros/s/13gUe7gdPRvd6wBobbilOMYupEA0c_t1fMYyH53LTq2U/exec";
  
    // Get the API key from the Script properties
    var apiKey = PropertiesService.getScriptProperties().getProperty("api_key");
  
    // Create an object with the form data
    var data = {
      "name": name,
      "email": email,
      "message": message,
      "api_key": apiKey
    };
  
    // Send a POST request to the Google Sheet
    fetch(url, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
      // Check if the data was successfully submitted
      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        alert('An error occurred while submitting the form. Please try again later.');
      }
    })
    .catch(error => {
      console.log(error);
      alert('An error occurred while submitting the form. Please try again later.');
    });
  }
  