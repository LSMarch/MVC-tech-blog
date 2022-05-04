const signupHandler = async (event) => {
    event.preventDefault();

    const username = $("#signup-username").value.trim();
    const email = $("#signup-email").value.trim();
    const pass = $("#signup-pass").value.trim();

    if(username && email && pass) {
        const res = await fetch('signUpPage', {
            method: 'POST',
            body: JSON.stringify({ username, email, pass }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace('/')
        } else {
            alert('GET RIDE OF ALERT "unable to signup"')
        }
    }
};

document
    $("#signup-form")
    .on('submit', signupHandler)