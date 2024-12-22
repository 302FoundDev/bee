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
    <section
      className="flex flex-col min-h-screen text-black bg-neutral-100 dark:bg-neutral-950/30 dark:text-neutral-100 transition-all ease-in-out duration-150"
    >
      <div className="absolute top-0 z-[-2] min-h-screen min-w-screen transition-all ease-in-out duration-150"></div>
      <main className="flex-1">
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

          {/* Not found page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </section>
  )
}

export default App
