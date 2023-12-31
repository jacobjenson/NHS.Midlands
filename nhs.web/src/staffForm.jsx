/* eslint-disable react/prop-types */
import { useState } from 'react';

function StaffForm({ onSubmit }) {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name });
        setName(''); // Reset the input after submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <button type="submit">Save</button>
        </form>
    );
}

export default StaffForm;
