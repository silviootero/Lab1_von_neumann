import React from 'react';

const Arrow = ({ x1, y1, x2, y2, color = 'black', strokeWidth = 2 }) => {
  return (
    <svg
      style={{ position: 'absolute', pointerEvents: 'none' }}
      width="100%"
      height="100%"
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="3"
          orient="auto"
          fill={color}
        >
          <polygon points="0 0, 10 3, 0 6" />
        </marker>
      </defs>
    </svg>
  );
};

export default Arrow;
