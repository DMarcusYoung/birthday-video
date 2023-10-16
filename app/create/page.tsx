// pages/birthday-form.tsx

import React from "react";

const BirthdayForm = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-gray-600">
        <h1 className="text-2xl font-semibold mb-4">Create Birthdaybox</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="recipientName" className="block text-gray-600 text-sm font-semibold">
              Birthday Recipient's Name
            </label>
            <input
              type="text"
              id="recipientName"
              name="recipientName"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateTime" className="block text-gray-600 text-sm font-semibold">
              Date and Time to Receive the Video
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="friendsEmail" className="block text-gray-600 text-sm font-semibold">
              Friends' Email Addresses (comma-separated)
            </label>
            <textarea
              id="friendsEmail"
              name="friendsEmail"
              rows={3}
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
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
