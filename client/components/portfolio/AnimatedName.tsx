import { useState, useEffect } from 'react';

interface AnimatedNameProps {
  name: string;
}

export default function AnimatedName({ name }: AnimatedNameProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate animation progress (0 to 1) based on scroll
  const startAnimation = 50; // Start animation early
  const endAnimation = 300; // Complete animation at 300px
  const progress = Math.min(Math.max((scrollY - startAnimation) / (endAnimation - startAnimation), 0), 1);

  // Calculate positions
  const heroSize = window.innerWidth < 768 ? 48 : 72; // 3rem (48px) on mobile, 4.5rem (72px) on desktop
  const headerSize = 20; // 1.25rem (20px) in header
  const sizeRatio = headerSize / heroSize;

  // Scale animation
  const scale = 1 - (progress * (1 - sizeRatio));

  // Position calculations for smooth movement
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // Start position: center of viewport
  const startX = 0;
  const startY = 0;

  // End position: top-left header position
  // Account for header padding and positioning
  const headerPadding = viewportWidth < 768 ? 24 : 48; // Responsive padding
  const headerHeight = 80; // Approximate header height

  const endX = -(viewportWidth / 2) + headerPadding + 100; // Move to left edge + padding
  const endY = -(viewportHeight / 2) + headerHeight / 2; // Move to header vertical center

  // Adjust initial position to be above the "Full-Stack Developer" subtitle
  const initialOffsetY = -180; // Move up by 180px from center to be above the subtitle

  const translateX = startX + (endX - startX) * progress;
  const translateY = initialOffsetY + (endY - initialOffsetY) * progress;

  // Fade out when animation is complete to let header name take over
  const opacity = progress >= 0.95 ? 0 : 1;

  return (
    <div
      className="fixed z-15 animated-name"
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${scale})`,
        opacity: opacity,
        transition: scrollY === 0 ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        pointerEvents: opacity > 0.1 ? 'auto' : 'none',
      }}
    >
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-slate-100 dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent tracking-tight whitespace-nowrap select-none">
        {name}
      </h1>
    </div>
  );
}
