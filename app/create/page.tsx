// pages/birthday-form.tsx
'use client'

import { useState } from "react";
import { setDoc, collection, doc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation'
import Link from "next/link";

import BackButton from "../components/BackButton";
import firebase_app from "../firebase";


// Make a page that has a form with the following entries:
// Birthday recipient name
// the date and time to receive the video
// and entry to add friends’ email addresses
// use next js, typescript and tailwind css
// use a gradient between blue and pink as the color scheme
// Add a back button that returns to the landing page at the top left of the page with nextjs 13

function generateCode(): string {
  const code = Math.floor(Math.random() * 100000000);
  return code.toString().padStart(8, "0");
}

const BirthdayForm = () => {
  const [recipientName, setRecipientName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [friendsEmail, setFriendsEmail] = useState("");
  const [recipientEmail, setrecipientEmail] = useState("");
  const router = useRouter();

  let joinCode: string;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emails: string[] = [];
    friendsEmail.split(',').forEach((email) => {
      emails.push(email.trim());
    });
    joinCode = generateCode();

    // Add to database
    const db = getFirestore(firebase_app);
    const docRef = await setDoc(doc(collection(db, "birthdayboxes"), joinCode), {
      recipientName,
      dateTime,
      emails,
      recipientEmail,
      joinCode,
      videos: []
    });

    // console.log("Document written with ID: ", docRef.id);

    // route to upload page
    router.push(`/join/${joinCode}`);
  };
  
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
      <BackButton />
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-gray-600">
        <h1 className="text-2xl font-semibold mb-4">Create Birthdaybox</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="recipientName" className="block text-gray-600 text-sm font-semibold">
              Birthday Recipient's Name
            </label>
            <input
              type="text"
              id="recipientName"
              name="recipientName"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateTime" className="block text-gray-600 text-sm font-semibold">
              Date/Time to Deliver
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="friendsEmail" className="block text-gray-600 text-sm font-semibold">
              Invitees' Email Addresses (comma-separated)
            </label>
            <input
              id="friendsEmail"
              name="friendsEmail"
              type='email'
              multiple
              required
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={(e) => setFriendsEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="friendsEmail" className="block text-gray-600 text-sm font-semibold">
              Recipient Email Address
            </label>
            <input
              id="recipientEmail"
              name="recipientEmail"
              type='email'
              required
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={(e) => setrecipientEmail(e.target.value)}
            />
          </div>
          {/* <Link
            type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded" href={`/join/${generateCode()}`}>
            Submit
          </Link> */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
  export default BirthdayForm;
  