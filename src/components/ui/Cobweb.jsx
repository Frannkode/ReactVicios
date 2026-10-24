// Telaraña de esquina. Por defecto va arriba a la izquierda; `flip` la pasa a la derecha.
const Cobweb = ({ size = 90, flip = false, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    aria-hidden="true"
    className={`absolute top-0 pointer-events-none text-white/35 ${flip ? 'right-0 -scale-x-100' : 'left-0'} ${className}`}
  >
    <path d="M0 0 L100 0 M0 0 L92 38 M0 0 L70 70 M0 0 L38 92 M0 0 L0 100" />
    <path d="M24 0 Q20 18 0 24" />
    <path d="M48 0 Q40 38 0 48" />
    <path d="M72 0 Q60 58 0 72" />
    <path d="M96 0 Q80 80 0 96" />
  </svg>
);

export default Cobweb;
