import React, { useEffect, useRef } from 'react';
import { InfoCard } from './components/InfoCard';
import './App.css';

// Función para generar enlace de Google Calendar
const createGoogleCalendarLink = () => {
  // Evento: Inauguración JDG
  // Fecha: 4 de diciembre
  // Hora: 19:00 HS Argentina (UTC-3) = 22:00 UTC
  // Duración: 2 horas (hasta 21:00 HS = 00:00 UTC del día siguiente)
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 0-11 -> 1-12
  const currentDay = now.getDate();
  
  // Si ya pasó el 4 de diciembre este año, usar el año siguiente
  let year = currentYear;
  if (currentMonth > 12 || (currentMonth === 12 && currentDay > 4)) {
    year = currentYear + 1;
  }
  
  // Formato: YYYYMMDDTHHMMSSZ
  const startDate = `${year}1204T220000Z`; // 4 de diciembre, 19:00 ART = 22:00 UTC
  const endDate = `${year}1205T000000Z`; // 5 de diciembre, 21:00 ART = 00:00 UTC (día siguiente)
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Inauguración JDG',
    dates: `${startDate}/${endDate}`,
    details: 'Inauguración de JDG Neumáticos',
    location: 'JDG Neumáticos'
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

function App() {
  const dateCardRef = useRef(null);
  const timeCardRef = useRef(null);
  const mainTitleRef = useRef(null);
  const wheelLoadingRef = useRef(null);
  const dateTimeSectionRef = useRef(null);
  const actionButtonsRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    if (typeof window.gsap !== 'undefined') {
      const gsap = window.gsap;
      
      // Title animations
      const titleLines = document.querySelectorAll('.main-title .title-line');
      if (titleLines.length > 0) {
        const titleTL = gsap.timeline({ defaults: { ease: 'sine.out' } });
        
        titleLines.forEach((line, index) => {
          gsap.set(line, {
            opacity: 0,
            y: 20,
            scale: 0.9,
            filter: 'blur(5px)',
            rotationX: -15
          });
          
          titleTL.to(line, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            rotationX: 0,
            duration: 0.8,
            ease: 'power3.out'
          }, index * 0.1);
        });
        
        // Continuous subtle float animation
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) {
          gsap.to(mainTitle, {
            y: -3,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.5
          });
        }
        
        // Sin efectos de glow para las líneas highlight - solo color amarillo
      }
      
      // ===== ANIMACIÓN COMPLEJA DE RUEDA CARGANDO =====
      
      // Referencias a elementos
      const wheelLoading = wheelLoadingRef.current;
      const dateTimeSection = dateTimeSectionRef.current;
      const dateCard = dateCardRef.current;
      const timeCard = timeCardRef.current;
      
      if (wheelLoading && dateTimeSection && dateCard && timeCard) {
        // Referencia al SVG de la rueda para la rotación
        const wheelSvg = wheelLoading.querySelector('.wheel-svg');
        
        // Obtener el ancho del contenedor para calcular la posición
        const sectionWidth = dateTimeSection.offsetWidth || window.innerWidth;
        const wheelWidth = 140; // Ancho de la rueda
        
        // Estado inicial: rueda fuera del borde izquierdo, tarjetas ocultas
        gsap.set(wheelLoading, {
          opacity: 1,
          scale: 1,
          x: -(sectionWidth / 2 + wheelWidth), // Fuera del borde izquierdo
          y: 0,
          visibility: 'visible'
        });
        
        if (wheelSvg) {
          gsap.set(wheelSvg, {
            rotation: 0,
            transformOrigin: 'center center'
          });
        }
        
        gsap.set([dateCard, timeCard], {
          opacity: 0,
          scale: 0.9,
          y: 20,
          filter: 'blur(10px)',
          visibility: 'hidden'
        });
        
        gsap.set(dateTimeSection, {
          overflow: 'hidden'
        });
        
        // Crear contenedor de huellas
        const tracksContainer = dateTimeSection.querySelector('.tire-tracks-container');
        
        // Función para crear una huella de neumático
        const createTireTrack = (x, y) => {
          if (!tracksContainer) return null;
          
          const track = document.createElement('div');
          track.className = 'tire-track';
          track.style.left = `${x}px`;
          track.style.top = `${y}px`;
          tracksContainer.appendChild(track);
          
          return track;
        };
        
        // Timeline principal de la animación
        const wheelAnimationTL = gsap.timeline();
        
        // Función para crear huellas en tiempo real siguiendo a la rueda - optimizado para móviles
        const createTracksFollowingWheel = (startX, endX, startTime, duration, trackY) => {
          // Reducir pasos en móviles para mejor rendimiento
          const isMobile = window.innerWidth <= 768;
          const steps = isMobile ? 10 : 15;
          const interval = duration / steps;
          
          for (let i = 0; i < steps; i++) {
            const progress = i / (steps - 1);
            // Calcular posición exacta de la rueda en este momento
            const wheelX = startX + (endX - startX) * progress;
            // La huella aparece justo detrás de la rueda (ligeramente atrás)
            const trackX = wheelX - (wheelWidth * 0.15); // 15% del ancho de la rueda atrás
            const delay = startTime + (progress * duration);
            
            setTimeout(() => {
              const track = createTireTrack(trackX, trackY);
              if (track) {
                // Aparecer rápidamente justo detrás de la rueda
                gsap.fromTo(track, 
                  { 
                    opacity: 0, 
                    scale: 0.7,
                    rotation: Math.random() * 4 - 2 // Menos rotación
                  },
                  { 
                    opacity: 0.75, // Opacidad ajustada
                    scale: 1,
                    duration: 0.15,
                    ease: 'power2.out'
                  }
                );
                
                // Desvanecer gradualmente
                gsap.to(track, {
                  opacity: 0,
                  scale: 1.2,
                  duration: 1,
                  delay: 0.15,
                  ease: 'power2.out',
                  onComplete: () => {
                    if (track.parentNode) {
                      track.parentNode.removeChild(track);
                    }
                  }
                });
              }
            }, delay * 1000);
          }
        };
        
        const trackY = dateTimeSection.offsetHeight / 2;
        const startX = -(sectionWidth / 2 + wheelWidth);
        const midX = 0;
        const endX = sectionWidth / 2 + wheelWidth;
        
        // FASE 1: Rueda entra desde el borde izquierdo girando (más rápida)
        wheelAnimationTL
          .to(wheelLoading, {
            x: 0, // Centro del contenedor
            duration: 1.2,
            ease: 'power1.out'
          })
          .to(wheelSvg, {
            rotation: 720, // 2 vueltas completas mientras cruza
            duration: 1.2,
            ease: 'none',
            force3D: true
          }, '-=1.2')
          // Crear huellas que acompañan a la rueda en tiempo real
          .call(() => {
            createTracksFollowingWheel(startX, midX, 0, 1.2, trackY);
          }, null, 0)
          // FASE 2: Rueda continúa hacia el borde derecho y desaparece (más rápida)
          .to(wheelLoading, {
            x: sectionWidth / 2 + wheelWidth, // Fuera del borde derecho
            scale: 0.85,
            opacity: 0,
            duration: 1,
            ease: 'power1.in'
          })
          .to(wheelSvg, {
            rotation: '+=540', // 1.5 vueltas más mientras sale
            duration: 1,
            ease: 'none',
            force3D: true
          }, '-=1')
          // Crear más huellas que acompañan a la rueda
          .call(() => {
            createTracksFollowingWheel(midX, endX, 1.2, 1, trackY);
          }, null, 1.2)
          // FASE 3: Ocultar completamente la rueda
          .set(wheelLoading, {
            visibility: 'hidden'
          }, '-=0.5')
          // FASE 4: Revelar las tarjetas desde atrás del humo (después de que se desvanezca)
          .set([dateCard, timeCard], {
            visibility: 'visible',
            zIndex: 9 // Por encima del humo cuando aparezcan
          }, '+=0.3') // Esperar un poco para que el humo se desvanezca
          .to([dateCard, timeCard], {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            force3D: true
          }, '-=0.1')
          .call(() => {
            // Agregar clase de resaltado a la tarjeta de fecha después de que aparezca
            if (dateCard) {
              dateCard.classList.add('date-card-highlighted');
            }
          }, null, '+=0.2');
      }
      
      // ===== ANIMACIÓN DE BOTONES DE ACCIÓN =====
      const actionButtons = actionButtonsRef.current;
      if (actionButtons) {
        const buttons = actionButtons.querySelectorAll('.btn');
        
        // Estado inicial: botones ocultos
        gsap.set(buttons, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          visibility: 'hidden'
        });
        
        // Revelar botones después de las tarjetas (con delay)
        gsap.to(buttons, {
          opacity: 1,
          y: 0,
          scale: 1,
          visibility: 'visible',
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.4, // Aparecer después de las tarjetas
          force3D: true
        });
      }
    }
  }, []);

  return (
    <div className="app">
      {/* Background */}
      <div className="background-animation">
        <div className="gradient-overlay"></div>
        <div className="wheel-decoration wheel-1"></div>
        <div className="wheel-decoration wheel-2"></div>
        <div className="wheel-decoration wheel-3"></div>
      </div>

      {/* Main Container */}
      <div className="container">
        <main className="invitation-content">
          {/* Header */}
          <header className="main-header">
            <h1 className="main-title">
              <span className="title-line">CRECEMOS</span>
              <span className="title-line">PARA ESTAR</span>
              <span className="title-line highlight">MÁS CERCA DE VOS.</span>
            </h1>
          </header>

          {/* Subtitle */}
          <section className="subtitle-section">
            <p className="subtitle">
              Te invitamos a la inauguración de nuestra <strong>NUEVA SUCURSAL</strong>.
            </p>
            <p className="subtitle-text">
              Para continuar brindando el servicio, la calidad y la confianza que nos distinguen.
            </p>
          </section>

          {/* Date and Time Section */}
          <section ref={dateTimeSectionRef} className="date-time-section">
            {/* Contenedor de huellas de neumático */}
            <div className="tire-tracks-container">
              {/* Las huellas se generarán dinámicamente con GSAP */}
            </div>
            
            {/* Rueda de carga animada - SVG profesional */}
            <div ref={wheelLoadingRef} className="wheel-loading">
              <svg 
                className="wheel-svg" 
                viewBox="0 0 200 200" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Aro exterior de la rueda - más robusto */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="90" 
                  fill="none" 
                  stroke="rgba(255, 215, 0, 0.85)" 
                  strokeWidth="24"
                  className="wheel-outer-ring"
                />
                
                {/* Segundo aro interior - más robusto */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="76" 
                  fill="none" 
                  stroke="rgba(255, 184, 0, 0.7)" 
                  strokeWidth="12"
                  className="wheel-inner-ring"
                />
                
                {/* Aro intermedio para profundidad */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="68" 
                  fill="none" 
                  stroke="rgba(255, 215, 0, 0.5)" 
                  strokeWidth="4"
                  strokeDasharray="5 5"
                />
                
                {/* Patrón de neumático - rayos más robustos y menos cantidad */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 360) / 8;
                  const radian = (angle * Math.PI) / 180;
                  const x1 = 100 + 35 * Math.cos(radian);
                  const y1 = 100 + 35 * Math.sin(radian);
                  const x2 = 100 + 68 * Math.cos(radian);
                  const y2 = 100 + 68 * Math.sin(radian);
                  
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(255, 215, 0, 0.75)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      className="wheel-spoke"
                    />
                  );
                })}
                
                {/* Patrón de textura del neumático - más sutil */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="65" 
                  fill="none" 
                  stroke="rgba(255, 215, 0, 0.2)" 
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
                
                {/* Centro de la rueda - hub más robusto y grande */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="42" 
                  fill="url(#wheelCenterGradient)" 
                  className="wheel-hub"
                />
                
                {/* Círculo interior del hub para más definición */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="32" 
                  fill="rgba(255, 215, 0, 0.35)" 
                  stroke="rgba(255, 215, 0, 0.6)"
                  strokeWidth="2"
                />
                
                {/* Agujeros del hub - más grandes y robustos */}
                {[...Array(5)].map((_, i) => {
                  const angle = (i * 360) / 5;
                  const radian = (angle * Math.PI) / 180;
                  const x = 100 + 24 * Math.cos(radian);
                  const y = 100 + 24 * Math.sin(radian);
                  
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="rgba(0, 31, 63, 0.95)"
                      stroke="rgba(255, 215, 0, 0.4)"
                      strokeWidth="1"
                      className="wheel-bolt"
                    />
                  );
                })}
                
                {/* Punto central - más grande */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="5" 
                  fill="rgba(0, 31, 63, 0.98)"
                  stroke="rgba(255, 215, 0, 0.5)"
                  strokeWidth="1.5"
                />
                
                {/* Gradientes SVG */}
                <defs>
                  <radialGradient id="wheelCenterGradient" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="rgba(255, 215, 0, 0.85)" stopOpacity="1" />
                    <stop offset="30%" stopColor="rgba(255, 184, 0, 0.7)" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="rgba(255, 215, 0, 0.5)" stopOpacity="0.8" />
                    <stop offset="85%" stopColor="rgba(0, 51, 102, 0.6)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="rgba(0, 31, 63, 0.8)" stopOpacity="0.9" />
                  </radialGradient>
                  
                  {/* Filtro de resplandor más suave */}
                  <filter id="wheelGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  
                  {/* Filtro para suavizar el contraste */}
                  <filter id="wheelSoft">
                    <feGaussianBlur stdDeviation="0.5" result="soft"/>
                    <feMerge>
                      <feMergeNode in="soft"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
            
            {/* Info Cards */}
            <a 
              href={createGoogleCalendarLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <InfoCard ref={dateCardRef} className="date-card">
                <span className="emoji-white">📅</span> JUEVES 4 DE DICIEMBRE
              </InfoCard>
            </a>
            <a 
              href={createGoogleCalendarLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <InfoCard ref={timeCardRef} className="time-card">
                <span className="emoji-white">🕒</span> 19:00 HS
              </InfoCard>
            </a>
          </section>

          {/* Action Buttons */}
          <section ref={actionButtonsRef} className="action-buttons">
            <a 
              href="https://www.google.com/maps/place/27%C2%B022'06.3%22S+65%C2%B034'22.4%22W/@-27.3684129,-65.5754654,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-27.3684129!4d-65.5728905?entry=tts&g_ep=EgoyMDI1MTEwMi4wIPu8ASoASAFQAw%3D%3D&skid=452e6a84-d0e9-4db0-898d-3358513773ab" 
              target="_blank" 
              className="btn btn-location"
            >
              <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="btn-text">Tocar para ver ubicación</span>
            </a>
            <a 
              href="https://docs.google.com/forms/d/1llA_nhIqJKaJL9xOvp5rLFv-ZRnTSFdoeHD_g4a98Zg/viewform?edit_requested=true" 
              target="_blank" 
              className="btn btn-confirm"
            >
              <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="btn-text">Confirmar asistencia acá</span>
            </a>
          </section>

          {/* Logo */}
          <footer className="logo-section">
            <a 
              href="https://www.instagram.com/jdgneumaticos.sa/?hl=es" 
              target="_blank" 
              rel="noopener noreferrer"
              className="logo-link"
            >
              <div className="logo">
                <img 
                  src="/assets/images/logo-jdg.png" 
                  alt="JDG Neumáticos" 
                  className="logo-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextElementSibling) {
                      e.target.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="logo-text-fallback" style={{ display: 'none', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                  <span className="logo-text">JDG</span>
                  <span className="logo-subtitle">NEUMÁTICOS</span>
                </div>
              </div>
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;

