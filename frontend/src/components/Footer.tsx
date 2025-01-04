export const Footer = () => {

  return (
    <footer className="w-full mt-20 lg:mt-0 md:mt-0 py-6 border-t border-neutral-400 dark:border-neutral-800 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 mx-auto md:h-14 md:flex-row">
        <p className="text-md text-muted-foreground">
          © 2024 302foundev. Almost all rights reserved
        </p>
        <a
          href="https://bsky.app/profile/302foundev.es"
          target="_blank"
          rel="noreferrer"
          className="transition ease-linear hover:opacity-90"
        >
          <span className="text-md text-muted-foreground flex items-center justify-center text-sky-500">Bluesky Social</span>
        </a>
      </div>
    </footer>
  )
}
