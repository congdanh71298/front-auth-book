document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    // Register form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = registerForm.querySelector('#username').value;
        const password = registerForm.querySelector('#password').value;

        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                console.log('Registration successful');
                registerForm.reset();
            } else {
                const data = await response.json();
                console.log('Registration failed:', data.message);
            }
        } catch (error) {
            console.log('Registration failed:', error.message);
        }
    });
});
