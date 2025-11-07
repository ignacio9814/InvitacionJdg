import React, { useState, useRef } from 'react';
import './InfoCard.css';

export const InfoCard = React.forwardRef(({
  className = '',
  children,
  interactive = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  ...props
}, ref) => {
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
    if (typeof onClick === 'function') {
      onClick(e);
    }
    if (!interactive) {
      return;
    }

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

  const handleMouseEnter = (e) => {
    if (typeof onMouseEnter === 'function') {
      onMouseEnter(e);
    }
    if (!interactive) return;
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    if (typeof onMouseLeave === 'function') {
      onMouseLeave(e);
    }
    if (!interactive) return;
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = (e) => {
    if (typeof onMouseDown === 'function') {
      onMouseDown(e);
    }
    if (!interactive) return;
    setIsPressed(true);
  };

  const handleMouseUp = (e) => {
    if (typeof onMouseUp === 'function') {
      onMouseUp(e);
    }
    if (!interactive) return;
    setIsPressed(false);
  };

  const handleTouchStart = (e) => {
    if (typeof onTouchStart === 'function') {
      onTouchStart(e);
    }
    if (!interactive) return;
    setIsHovered(true);
  };

  const handleTouchEnd = (e) => {
    if (typeof onTouchEnd === 'function') {
      onTouchEnd(e);
    }
    if (!interactive) return;
    setIsHovered(false);
    setIsPressed(false);
  };

  return (
    <div
      ref={combinedRef}
      className={`info-card-modern ${!interactive ? 'info-card-non-interactive' : ''} ${isHovered ? 'info-card-hover' : ''} ${isPressed ? 'info-card-pressed' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
