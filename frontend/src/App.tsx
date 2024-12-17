import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { Hero } from "./pages/Hero"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Footer } from "./components/Footer"
import { NotFound } from "./pages/404/NotFound"
import { DashboardLayout } from "./dashboard/DashboardLayout"
import { Links } from "./components/ShortenedBox"
import { UserProfileUpdate } from "./components/ProfileData"
import { ProtectedRoute } from "./middleware/routes"

const App = () => {
  return (
    <div
      className="flex flex-col min-h-screen max-w-screen"
    >
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white dark:bg-neutral-950/50 text-black dark:text-neutral-100 transition-all ease-in-out duration-150"></div>
      <main className="flex-grow">
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Hero />} />

          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />

          {/* Protected routes with shared layout */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Links />} />
              <Route path="settings" element={<UserProfileUpdate />} />
            </Route>
          </Route>

          {/* Not found pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
