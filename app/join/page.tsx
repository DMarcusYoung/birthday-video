// pages/join.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import BackButton from '../components/BackButton';

export default function JoinPage() {
    const [code, setCode] = useState('');
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Check if code exists
        router.push(`/join/${code}`);
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex flex-col justify-center items-center">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <BackButton />
                <h1 className="text-4xl font-bold text-white mb-8">Join Birthdaybox</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <label htmlFor="code" className="text-white text-xl mb-4">
                        Enter code:
                    </label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                        className="rounded-lg py-2 px-4 border-2 border-white text-xl text-center text-gray-600"
                    />
                    <button type="submit" className="bg-white text-blue-500 rounded-lg py-2 px-4 mt-4">
                        Join
                    </button>
                </form>
            </main>
        </div>
    );
}
