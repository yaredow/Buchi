export default function Chat() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4 border-r border-gray-300 bg-white">
        {/* Sidebar Header */}
        <header className="flex items-center justify-between border-b border-gray-300 bg-indigo-600 p-4 text-white">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
          <div className="relative">
            <button id="menuButton" className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
              </svg>
            </button>
            {/* Menu Dropdown */}
            <div
              id="menuDropdown"
              className="absolute right-0 mt-2 hidden w-48 rounded-md border border-gray-300 bg-white shadow-lg"
            >
              <ul className="px-3 py-2">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                  >
                    Option 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                  >
                    Option 2
                  </a>
                </li>
                {/* Add more menu options here */}
              </ul>
            </div>
          </div>
        </header>
        {/* Contact List */}
        <div className="mb-9 h-screen overflow-y-auto p-3 pb-20">
          <div className="mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Alice</h2>
              <p className="text-gray-600">Hoorayy!!</p>
            </div>
          </div>

          <div className="mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
              <img
                src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Martin</h2>
              <p className="text-gray-600">
                That pizza place was amazing! We should go again sometime. 🍕
              </p>
            </div>
          </div>

          <div className="mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
              <img
                src="https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Charlie</h2>
              <p className="text-gray-600">
                Hey, do you have any recommendations for a good movie to watch?
              </p>
            </div>
          </div>

          <div className="mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
              <img
                src="https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">David</h2>
              <p className="text-gray-600">
                I just finished reading a great book! It was so captivating.
              </p>
            </div>
          </div>

          <div className="mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
              <img
                src="https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Ella</h2>
              <p className="text-gray-600">
                What&apos;s the plan for this weekend? Anything fun?
              </p>
            </div>
          </div>

          <div className="mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
              <img
                src="https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Fiona</h2>
              <p className="text-gray-600">
                I heard there&apos;s a new exhibit at the art museum.
                Interested?
              </p>
            </div>
          </div>

          <div className="mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
              <img
                src="https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">George</h2>
              <p className="text-gray-600">
                I tried that new cafe downtown. The coffee was fantastic!
              </p>
            </div>
          </div>

          <div className="mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
              <img
                src="https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Hannah</h2>
              <p className="text-gray-600">
                I&apos;m planning a hiking trip next month. Want to join?
              </p>
            </div>
          </div>

          <div className="mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
              <img
                src="https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Isabella</h2>
              <p className="text-gray-600">
                Have you seen the latest episode of our favorite show?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-3/4 bg-gray-100">
        <div className="flex h-full flex-col">
          {/* Chat Header */}
          <header className="border-b border-gray-300 bg-white p-4">
            <h2 className="text-xl font-semibold">Chat with Alice</h2>
          </header>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="mr-3 h-10 w-10 rounded-full"
                />
                <div className="rounded-lg bg-white p-3 shadow-md">
                  <p className="text-gray-800">
                    Hey there! How&apos;s your day going?
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-end">
                <div className="rounded-lg bg-indigo-600 p-3 text-white shadow-md">
                  <p>It&apos;s going well, thanks! How about you?</p>
                </div>
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="ml-3 h-10 w-10 rounded-full"
                />
              </div>
              {/* Add more chat bubbles here */}
            </div>
          </div>
          {/* Chat Input */}
          <div className="border-t border-gray-300 bg-white p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
