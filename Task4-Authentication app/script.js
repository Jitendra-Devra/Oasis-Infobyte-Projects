function showRegisterForm() {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('securedPage').style.display = 'none';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('securedPage').style.display = 'none';
}

function showSecuredPage() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById('user').innerText = loggedInUser.username;
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('securedPage').style.display = 'block';
    } else {
        showLoginForm();
    }
}

function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (username === "" || password === "") {
        alert("Please enter a valid username and password.");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.username === username)) {
        alert("Username already exists. Please choose another one.");
        return;
    }

    users.push({ username: username, password: password });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registration successful! Please log in.");
    showLoginForm();
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        showSecuredPage();
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    showLoginForm();
}

document.addEventListener('DOMContentLoaded', () => {
    showRegisterForm();
});
