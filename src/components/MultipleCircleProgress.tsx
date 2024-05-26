import React, { useEffect, useState } from 'react';

interface MultipleCircleProgressProps {
  progressSegments: number[];
  colors: string[];
  text: string;
  size?: number;
  strokeWidth?: number;
}

const MultipleCircleProgress: React.FC<MultipleCircleProgressProps> = ({
  progressSegments,
  colors,
  text,
  size = 150,
  strokeWidth = 15,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [offsets, setOffsets] = useState<number[]>([]);

  useEffect(() => {
    let cumulativeOffset = 0;
    const newOffsets = progressSegments.map((progress) => {
      const offset = circumference - (progress / 100) * circumference;
      const segmentOffset = cumulativeOffset;
      cumulativeOffset += (progress / 100) * circumference;
      return segmentOffset;
    });
    setOffsets(newOffsets);
  }, [progressSegments, circumference]);

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="rotate-[-90deg]">
        {progressSegments.map((progress, index) => {
          const offset = circumference - (progress / 100) * circumference;
          return (
            <circle
              key={index}
              className="text-gray-300"
              strokeWidth={strokeWidth}
              stroke={colors[index]}
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
              strokeDasharray={circumference}
              strokeDashoffset={offsets[index]}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          );
        })}
      </svg>
      <span className="absolute text-xl top-[40%] font-semibold text-gray-700">{text}</span>
    </div>
  );
};

export default MultipleCircleProgress;
