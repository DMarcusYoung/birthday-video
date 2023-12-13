// Give me a landing page with a button labeled Get Started and a button labeled Find Existing, the color scheme should be a gradient between blue and pink. Add a header that says Welcome to BirthdayBox and a description that says Create a birthday video compilation. Use Nextjs 13, with typescript and tailwind css.


import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
      <header className="text-white text-4xl font-semibold mb-4">Welcome to BirthdayBox</header>
      <p className="text-white text-lg mb-8">Create a Birthday Video Compilation.</p>
      <div className="flex space-x-4">
        <Link className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded" href='/create'>
          Get Started
        </Link>
        <Link className="bg-pink-600 hover:bg-pink-800 text-white font-semibold py-3 px-6 rounded" href='/join'>
          Find Existing
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
