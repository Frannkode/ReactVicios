const CopaSVG = () => (
  <svg
    viewBox="0 0 100 140"
    className="absolute opacity-[0.04] pointer-events-none select-none"
    style={{ width: '320px', bottom: '-20px', right: '-40px', zIndex: 0 }}
  >
    <rect x="35" y="120" width="30" height="8" rx="2" fill="white" />
    <rect x="25" y="128" width="50" height="60" rx="2" fill="white" />
    <rect x="42" y="90" width="16" height="30" fill="white" />
    <ellipse cx="50" cy="55" rx="32" ry="38" fill="none" stroke="white" strokeWidth="6" />
    <path d="M18 30 Q5 30 5 50 Q5 75 18 80" fill="none" stroke="white" strokeWidth="5" />
    <path d="M82 30 Q95 30 95 50 Q95 75 82 80" fill="none" stroke="white" strokeWidth="5" />
  </svg>
);

export default CopaSVG;
