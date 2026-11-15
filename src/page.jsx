
import { useState } from 'react';

function Page() {

    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');

    return (
        <>
            <input className="border border-gray-300 rounded px-4 py-2 mb-4"
                type="text"
                placeholder="enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <button onClick={() => setDisplayName(username)} className="bg-blue-500 text-white px-4 py-2 rounded-2xl ml-3">
                Submit
            </button>

            <h1>{displayName}</h1>
        </>
    )
}

export default Page;
