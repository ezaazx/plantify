'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import CELLS from 'vanta/dist/vanta.cells.min';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Login from '@/login/page';

export default function Home() {
  const { user } = useAuth();
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        CELLS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          color1: 0x1d5b5b,
          color2: 0x41cc3d,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  if (!user) return <Login />;

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Fade-in content */}
      <motion.div
        className="z-10 text-white text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
          Welcome to Plantify
        </h1>
        <p className="text-lg mb-6">{user.email}!</p>
        <h2 className=" md:text-3xl  mb-6 drop-shadow-lg">Your one stop crop companion.</h2>
        

        <div className="flex flex-col items-center space-y-4">
          <Link href="/timeline">
           <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-xl shadow-md hover:bg-white/20 transition">
            Home
           </button>

          </Link>
          <Link href="/profile">
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-xl shadow-md hover:bg-white/20 transition">
              Profile
            </button>
          </Link>
          <Link href="/diagnose">
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-xl shadow-md hover:bg-white/20 transition">
              Diagnose
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
