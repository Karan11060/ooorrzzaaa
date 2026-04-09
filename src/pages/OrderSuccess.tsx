import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
  useEffect(() => {
    // Fire confetti
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#1B5E20', '#E65100', '#F9A825'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#1B5E20', '#E65100', '#F9A825'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center section-padding">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Animated checkmark */}
        <div className="mx-auto w-24 h-24 mb-8">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="hsl(var(--deep-green))"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.path
              d="M30 52 L45 67 L72 37"
              fill="none"
              stroke="hsl(var(--deep-green))"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            />
          </svg>
        </div>

        <h1 className="font-heading text-4xl text-foreground mb-4">Order Placed!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for your order. We'll have it shipped to you shortly. 🎉
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard" className="btn-green-outline text-center">
            View Orders
          </Link>
          <Link to="/products" className="btn-saffron text-center">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
