import React, { useEffect, useState, useRef } from "react";
import { cn } from "../lib/utils";
import "../index.css";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: string[]; // Array of image URLs
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
    // Add resize observer to handle container size changes
    const observer = new ResizeObserver((entries) => {
      addAnimation();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      // Reset content before adding clones
      const originalItems = items.length;
      while (scrollerRef.current.children.length > originalItems) {
        scrollerRef.current.removeChild(scrollerRef.current.lastChild!);
      }

      // Calculate how many clones we need to fill the space
      const containerWidth = containerRef.current.offsetWidth;
      const scrollerWidth = scrollerRef.current.scrollWidth;
      const neededClones = Math.ceil(containerWidth / scrollerWidth) + 1;

      // Clone items to ensure smooth infinite scroll
      for (let i = 0; i < neededClones; i++) {
        items.forEach((_, idx) => {
          const originalItem = scrollerRef.current!.children[idx];
          const duplicatedItem = originalItem.cloneNode(true);
          scrollerRef.current?.appendChild(duplicatedItem);
        });
      }

      setDirection();
      setSpeed();
      setStart(true);
    }
  };

  const setDirection = () => {
    if (containerRef.current) {
      const animationDirection = direction === "left" ? "forwards" : "reverse";
      containerRef.current.style.setProperty("--animation-direction", animationDirection);
    }
  };

  const setSpeed = () => {
    if (containerRef.current) {
      const animationDuration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", animationDuration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex w-[200px] items-center justify-center flex-shrink-0"
          >
            <img
              src={item}
              alt={`logo-${idx}`}
              className="w-full h-[60px] object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};