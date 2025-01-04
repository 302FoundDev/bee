import confetti from "canvas-confetti";

export const showConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { x: 0.5, y: 0.6 },
  });
}
