import { FaSquareXTwitter, FaLink } from "react-icons/fa6"

export const Footer = () => {

  return (
    <footer className="flex max-w-screen-2xl items-center sm:flex-row gap-1 flex-col w-full sm:justify-between px-4 py-4 text-white mx-auto border-zinc-800">
      <div className="flex gap-1.5">
        © 2024
        <a
          href="https://302foundev.es"
          className="hover:underline hover:opacity-85"
          rel="noopener"
          target="_blank"
        >
          302foundev.
        </a>
        Almost all rights reserved
      </div>
      <div>
        <a
          className="flex w-24"
          href="https://x.com/302founddev"
          rel="noopener"
          target="_blank"
        >
          <span className="flex items-center gap-1 hover:opacity-75">
            <FaSquareXTwitter />
            Twitter
            <FaLink />
          </span>
        </a>
      </div>
    </footer>
  )
}

