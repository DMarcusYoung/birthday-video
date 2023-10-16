import Image from 'next/image'

// Chat GPT
// const LandingPage = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-lg text-center">
//         <h1 className="text-3xl text-gray-600 font-semibold mb-4">Welcome to BirthdayBox</h1>
//         <p className="text-gray-600">This is a simple Next.js landing page with TypeScript and Tailwind CSS.</p>
//         <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

const LandingPage = () => {
    return (
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
        <header className="text-white text-4xl font-semibold mb-4">Welcome to BirthdayBox</header>
        <p className="text-white text-lg mb-8">Create a Birthday Video Compilation.</p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded">
            Get Started
          </button>
          <button className="bg-pink-600 hover:bg-pink-800 text-white font-semibold py-3 px-6 rounded">
            Find Existing
          </button>
        </div>
      </div>
    );
  };

export default LandingPage;

// Copilot

// Create a landing page in nextjs with typescript and tailwind css
// const Page = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <Image
//         src="/images/nextjs.svg"
//         alt="Next.js Logo"
//         width={200}
//         height={200}
//       />
//       <h1 className="text-6xl font-bold mt-10">Welcome to Next.js!</h1>
//     </div>
//   )
// }

// export default Page


// const Page = () => {
//     return (
//       <div className="bg-gradient-to-r from-blue-500 to-pink-500">
//         <h1 className="text-4xl text-center">Welcome to BirthdayBox</h1>
//         <p className="text-center">Create a birthday video compilation</p>
//         <div className="flex justify-center">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Get Started
//           </button>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Find Existing
//           </button>
//         </div>
//       </div>
//     );
//   }
  
//   export default Page;