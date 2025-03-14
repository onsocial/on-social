// src/@assets/icons/MoonIcon.tsx
import React, { useContext } from 'react';
import Svg, { Path } from 'react-native-svg';
import { ThemeContext } from '@contexts/ThemeContext';

interface MoonIconProps {
  size?: number;
  color?: string; // Optional override
  className?: string;
}

export const MoonIcon: React.FC<MoonIconProps> = ({
  size = 24,
  color,
  className,
}) => {
  const { theme } = useContext(ThemeContext);

  // Default color: light in dark mode, dark in light mode (for toggle intent)
  const defaultColor = theme === 'dark' ? '#ffffff' : '#20252b';

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <Path
        d="M21.8801 15.1466C21.0128 17.6066 19.2384 19.6423 16.92 20.8376C14.6016 22.0329 11.9142 22.2974 9.40722 21.5771C6.90025 20.8569 4.76309 19.2062 3.43274 16.9625C2.10238 14.7189 1.6794 12.0518 2.25012 9.50662C2.64435 7.81886 3.45889 6.25816 4.61804 4.96963C5.77719 3.6811 7.24333 2.70658 8.88012 2.13662C9.19975 2.01741 9.54701 1.9931 9.88012 2.06662C10.2133 2.1298 10.5217 2.28577 10.77 2.5166C11.0128 2.74858 11.1863 3.04355 11.2711 3.3685C11.3559 3.69345 11.3487 4.03559 11.2501 4.35663C10.792 5.71849 10.764 7.18833 11.17 8.56662C11.4617 9.59113 12.0095 10.5245 12.7618 11.2786C13.5142 12.0327 14.4463 12.5826 15.4701 12.8766C16.8446 13.2858 18.3122 13.2578 19.67 12.7966C19.9969 12.7038 20.3432 12.7038 20.67 12.7966C20.995 12.8837 21.289 13.0601 21.5188 13.3058C21.7486 13.5514 21.9049 13.8566 21.9701 14.1866C22.0269 14.5089 21.9959 14.8405 21.8801 15.1466Z"
        fill={color || defaultColor}
      />
    </Svg>
  );
};
