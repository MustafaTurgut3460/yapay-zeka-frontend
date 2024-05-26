import React, { useEffect, useState } from "react";

interface SingleCircleProgressProps {
  progress: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  text: string;
}

const SingleCircleProgress: React.FC<SingleCircleProgressProps> = ({
  progress,
  color,
  size = 150,
  strokeWidth = 15,
  text,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const offsetValue = circumference - (progress / 100) * circumference;
    setOffset(offsetValue);
  }, [progress, circumference]);

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          className="text-orange-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          strokeWidth={strokeWidth}
          stroke={color}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <span className="absolute text-xl top-[40%] font-semibold text-gray-700">
        {text}
      </span>
    </div>
  );
};

export default SingleCircleProgress;
