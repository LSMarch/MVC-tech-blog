let errorMessage = $('#error-msg')

const signUpHandler = async (event) => {
    event.preventDefault();
    const username = $('#signup-username').val().trim();
    const email = $('#signup-email').val().trim();
    const password = $('#signup-password').val().trim();    
  
    // if first name, lastname, username, email, and password entered   
    if(username && email && password) {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        const signData = await response.json();
        if(response.status === 401 || response.status === 404) { 
            errorMessage.text(signData.message)
           return $('error-div').append(errorMessage)
            }
        if(response.ok){
            //replaces current page with home page
            document.location.replace('/');
        } else {
            errorMessage.text('Email or username already exist in our database. Try another email and username.')
            return $('error-div').append(errorMessage)
        }
    }
};
$('#signup-form').on('submit', signUpHandler)

$('#loginBtn').on('click', () => {
    document.location.replace('/login')
});