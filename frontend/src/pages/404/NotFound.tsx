export const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start gap-8 px-8 mt-16 lg:px-0">
        <img
          className="w-72 sm:w-96"
          src="/404-Error.svg" 
          alt="Error 404 not found" />
        <h2 className="text-xl text-black dark:text-neutral-100">The page what you are looking for does not exists, you mean <a className="text-red-500 underline" href="/">Home</a> ?</h2>
      </div>
    </>
  )
}
