import { Github, Bug, Sparkles } from "lucide-react"
import { DropDownProfile } from "./DropDownProfile"
import { ToggleTheme } from "./ToggleTheme"
import { Link } from "react-router-dom"

export const Header = () => {

  return (
    <header className="text-white border-b bg-neutral-900 border-zinc-300 dark:border-zinc-800">
      <nav className="h-16 px-4 m-auto max-w-screen-2xl">
        <ul className="flex items-center justify-between h-full">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 transition-all duration-300 ease-in-out hover:opacity-70"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="hidden lg:flex md:flex" />
                <span className="flex text-2xl font-semibold">Bee</span>
              </div>
              <span className="text-sm px-2.5 font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-lg">beta</span>
            </Link>
          </li>

          <div className="flex items-center gap-1">

            <div className="flex items-center">
              <li className="mr-2">
                <a
                  className="flex items-center gap-1 transition ease-in-out hover:scale-105"
                  href="https://github.com/302FoundDev/bee/issues/new"
                  target="_blank"
                  rel="noopener"
                >
                  <Bug className="size-5" />
                  Bugs
                </a>
              </li>

              <li>
                <a
                  className="flex transition ease-in-out rounded-full hover:scale-105 p-1.5 hover:bg-zinc-800"
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/302FoundDev"
                >
                  <Github className="flex size-5" />
                </a>
              </li>

              <li>
                <ToggleTheme />
              </li>
            </div>

            <li className="ml-2 aspect-w-7 aspect-h-7">
              <DropDownProfile />
            </li>

          </div>

        </ul>
      </nav>
    </header>
  )
}
