import React, { useState, useRef } from 'react';
import './InfoCard.css';

export const InfoCard = React.forwardRef(({ className = '', children, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cardRef = useRef(null);
  const rippleRef = useRef(null);

  // Combinar refs
  const combinedRef = (node) => {
    cardRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  // Efecto ripple al hacer click
  const handleClick = (e) => {
    if (rippleRef.current && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      rippleRef.current.style.left = `${x}px`;
      rippleRef.current.style.top = `${y}px`;
      rippleRef.current.classList.add('ripple-active');
      
      setTimeout(() => {
        if (rippleRef.current) {
          rippleRef.current.classList.remove('ripple-active');
        }
      }, 600);
    }
  };

  return (
    <div
      ref={combinedRef}
      className={`info-card-modern ${isHovered ? 'info-card-hover' : ''} ${isPressed ? 'info-card-pressed' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple effect */}
      <span ref={rippleRef} className="info-card-ripple"></span>
      
      {/* Shine effect on hover */}
      <div className="info-card-shine"></div>
      
      {/* Content */}
      <span className="info-card-text">
        {children}
      </span>
    </div>
  );
});

InfoCard.displayName = "InfoCard";
