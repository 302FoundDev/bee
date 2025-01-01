import { motion } from "framer-motion"
import { Button } from "../components/ui/Button"
import { Github } from 'lucide-react';

export const Hero = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="flex flex-col gap-2 px-4 text-white">

      <motion.div
        variants={containerVariants}
        className="flex flex-col items-center justify-center mt-20 lg:mt-40"
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-4xl p-2 font-bold tracking-tighter text-center text-transparent bg-gradient-to-r from-blue-500 via-pink-700 to-purple-600 bg-clip-text sm:text-5xl md:text-6xl lg:text-7xl">
          Streamline Your URL Management with Bee
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-[800px] text-center text-muted-foreground sm:text-lg dark:text-neutral-100 text-neutral-950">
          Bee is an open-source tool designed to simplify the creation, organization, and tracking of URLs.
          With an intuitive interface and powerful features, Bee allows you to manage links efficiently,
          saving time and enhancing the analysis of your URLs' performance. Streamline your URL management
          with Bee and take control of your links to the next level.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 mt-8"
        >
          <Button
            variant="ghost"
            size="lg"
            className="w-full border rounded-full dark:border-neutral-100 border-neutral-800 text-neutral-950 dark:text-neutral-100 sm:w-auto py-1.5 hover:scale-105 transition ease-linear"
          >
            <a
              href="https://github.com/302FoundDev/bee"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </Button>
        </motion.div>
      </motion.div>

    </section>
  )
}
