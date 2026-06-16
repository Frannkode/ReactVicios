const Stars = () => (
  <svg width="152" height="28" viewBox="0 0 152 28">
    {[0, 1, 2].map(i => (
      <polygon
        key={i}
        points="14,2 17.5,10 26,10 19.5,16 22,24 14,19 6,24 8.5,16 2,10 10.5,10"
        fill="#F6C700" stroke="#F6C700" strokeWidth="1"
        transform={`translate(${i * 40}, 0)`}
      />
    ))}
    <polygon
      points="14,2 17.5,10 26,10 19.5,16 22,24 14,19 6,24 8.5,16 2,10 10.5,10"
      fill="none" stroke="#F6C700" strokeWidth="1.5"
      transform="translate(120, 0)"
    />
    <text x="134" y="18" textAnchor="middle" fill="#F6C700"
      fontSize="11" fontWeight="900" fontFamily="Montserrat, sans-serif">?</text>
  </svg>
);

export default Stars;
