// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <Image src={'/logo.png'} alt="FlowSpace" width={50} height={50} className="bg-gray-50" />
            <h1 className="text-2xl font-bold text-gray-600">FlowSpace</h1>
          </div>
          {/* <div> */}
          {/*   <Link */}
          {/*     href="/login" */}
          {/*     className="px-4 py-2 rounded text-gray-700 hover:text-gray-900" */}
          {/*   > */}
          {/*     Login */}
          {/*   </Link> */}
          {/*   <Link */}
          {/*     href="/login" */}
          {/*     className="ml-4 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300" */}
          {/*   > */}
          {/*     Sign Up */}
          {/*   </Link> */}
          {/* </div> */}
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Your workspace, organized.
            </h2>
            <p className="text-xl mb-8 text-gray-700">
              All your notes, tasks, and ideas in one place. Simple, powerful, and designed for how you work.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 rounded bg-gray-600 text-white hover:bg-gray-700"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="relative w-full h-80 md:h-96">
              <Image
                src="/hero_banner.jpg"
                alt="NoteSpace App Screenshot"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
        </div>

        <div className="mt-32">
          <h3 className="text-2xl font-bold text-center mb-16 text-gray-600">
            Everything you need for your best work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-600">Notes & Documents</h4>
              <p className="text-gray-500">Create rich documents with formatting, images, and more. Organize them your way.</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-600">Tasks & Projects</h4>
              <p className="text-gray-500">Track your tasks, set deadlines, and collaborate on projects with your team.</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl text-gray-600 font-semibold mb-2">Fast & Efficient</h4>
              <p className="text-gray-500">Lightning fast search and navigation. Find what you need when you need it.</p>
            </div>
          </div>
        </div>

        <footer className="mt-32 py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">© 2025 FlowSpace. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700">Terms</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
