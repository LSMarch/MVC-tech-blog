const res = require("express/lib/response");

const loginForm = async (event) => {
    event.preventDefault();
    const username_login = $('#login-username').val().trim();
    const password_login = $('#login-pass').val().trim();
    if (username_login && password_login) {
        const res = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({username_login, password_login}),
            headers: {'Content-Type': 'application/json'}
        });
        if(res.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Invalid username or password')
        }
    }
    console.log(`I'm in`)
}
$("#loginForm").on('submit', loginForm)
$("#toSignup").on('click', () => {
    document.location.replace('/signup')
})

