document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // Login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = loginForm.querySelector('#username').value;
        const password = loginForm.querySelector('#password').value;

        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                console.log('Login successful:', token);

                // Save token to local storage or session storage for future requests
                localStorage.setItem('token', token);
                sessionStorage.setItem('token', token);

                loginForm.reset();
                window.location.href = '/';
            } else {
                const data = await response.json();
                console.log('Login failed:', data.message);
            }
        } catch (error) {
            console.log('Login failed:', error.message);
        }
    });
});
