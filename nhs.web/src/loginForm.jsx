import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5157', { username, password });
            localStorage.setItem('token', response.data.token);
            setErrorMessage('');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data);
            } else if (error.request) {
                setErrorMessage('No response from server');
            } else {
                setErrorMessage('Error: ' + error.message);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

export default LoginForm;
