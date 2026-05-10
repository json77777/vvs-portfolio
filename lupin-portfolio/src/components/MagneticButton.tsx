"use client";

import { useRef } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as: Component = "button",
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const props = {
    ref: ref as React.RefObject<HTMLElement>,
    className: `magnetic-wrap ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    ...(href && { href }),
  };

  return (
    // @ts-expect-error - dynamic component type
    <Component {...props}>
      {children}
    </Component>
  );
}
