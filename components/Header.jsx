import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/client";

export default function Header() {
  const [session, loading] = useSession();

  return (
    <>
      <div>
        <nav className="fixed w-full bg-gray-600">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <div>
                  <a
                    href="#"
                    className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                  >
                    <svg
                      className="h-6 w-6 mr-1 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span className="font-bold text-white">NextJS Prisma</span>
                  </a>
                </div>

                <div className="hidden md:flex items-center space-x-1">
                  <Link href="/">
                    <a
                      className="py-5 px-3 text-white hover:text-blue-300"
                    >
                      Feeds
                    </a>
                  </Link>
                  {session ? (
                    <>
                      <Link href="/post/drafts">
                        <a
                          href="#"
                          className="py-5 px-3 text-white hover:text-blue-300"
                        >
                          Drafts
                        </a>
                      </Link>
                    </>
                  ) : (
                    <>
                      <p>{null}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-1">
                {session ? (
                  <>
                    <Link href="/post/create">
                      <a className="py-2 px-5 mx-5 border text-white hover:bg-yellow-300 hover:text-yellow-800 rounded transition duration-300">
                        New Post
                      </a>
                    </Link>
                    <Link href="#">
                      <a
                        onClick={signOut}
                        className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                      >
                        Logout
                      </a>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="#">
                        <a
                          onClick={signIn}
                        className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                      >
                        Login
                      </a>
                    </Link>
                  </>
                )}
              </div>

              <div className="md:hidden flex items-center">
                <button className="mobile-menu-button text-white">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mobile-menu hidden md:hidden">
            <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
              Features
            </a>
            <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
              Pricing
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
