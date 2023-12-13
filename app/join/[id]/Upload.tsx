'use client'

import { useState } from 'react';
import { collection, doc, arrayUnion, updateDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';

import firebase_app from "../../firebase";

export default function Upload({joinCode}: {joinCode: string}){
    
    const [video, setVideo] = useState<File | null>(null);
    
    const handleUploadVideo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (video) {
            const formData = new FormData();
            formData.set('video', video)
            const query = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const res = await query.json();
            const db = getFirestore(firebase_app);

            const docRef = await updateDoc(doc(db, "birthdayboxes", joinCode), {
                videos: arrayUnion(video.name)
            });
        }
    };

    return (
        <div>
            <label className="text-2xl font-bold text-white mb-8">Upload Video</label>
            <form onSubmit={handleUploadVideo} className="flex flex-col items-center">
                <input
                    type="file"
                    id="video"
                    name="video"
                    onChange={(e) => setVideo(e.target.files?.[0] || null)}
                    className="rounded-lg py-2 px-4 border-2 border-white text-xl text-center text-gray-600"
                />
                <button type="submit" className="bg-white text-blue-500 rounded-lg py-2 px-4 mt-4">
                    Upload
                </button>
            </form>
        </div>
    )
}