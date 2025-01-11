import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { Hero } from "./pages/Hero"
import { SignIn } from "./pages/signin"
import { SignUp } from "./pages/signup"
import { Footer } from "./components/Footer"
import { NotFound } from "./pages/404/NotFound"
import { DashboardLayout } from "./dashboard/DashboardLayout"
import { BoxLinks } from "./components/BoxLinks"
import { UserProfileUpdate } from "./components/ProfileData"
import { ProtectedRoutes } from "./middleware/protectedRoutes"
import { UnauthenticatedRoute } from "./middleware/unauthenticatedRoutes"

const App = () => {
  return (
    <section
      className="flex flex-col min-h-screen text-black bg-neutral-100 dark:bg-neutral-950 dark:text-neutral-100 transition-all ease-in-out duration-150"
    >
      <div className="absolute top-0 z-[-2] min-h-screen min-w-screen transition-all ease-in-out duration-150"></div>
      <main className="flex-1">
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Hero />} />

          {/* UnauthenticatedRoutes (signin/signup) */}
          <Route element={<UnauthenticatedRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Protected routes with shared layout */}
          <Route element={<ProtectedRoutes />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<BoxLinks />} />
              <Route path="settings" element={<UserProfileUpdate />} />
            </Route>
          </Route>

          {/* Not found page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </section>
  )
}

export default App
