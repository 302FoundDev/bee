import { MessageCircleHeart } from "lucide-react";


export const Footer = () => {

  return (
    <footer className="w-full mt-20 lg:mt-0 md:mt-0 py-6 border-t border-neutral-400 dark:border-neutral-800 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 mx-auto md:h-14 md:flex-row">
        <p className="text-md text-muted-foreground">
          © 2024 302foundev. Almost all rights reserved
        </p>
        <a
          href="https://bluesky.com/302foundev"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1 transition ease-linear hover:opacity-90"
        >
          <MessageCircleHeart className="w-5 h-5 text-sky-400" />
          <span className="text-md text-muted-foreground">BlueSky</span>
        </a>
      </div>
    </footer>
  )
}
