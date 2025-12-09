import React from 'react';
import { useTheme } from '../../config/theme';

type LabelPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface LabelProps {
  text: string;
  jiraRef?: string;
  position?: LabelPosition;
  size?: 'sm' | 'md' | 'lg';
}

export const Label: React.FC<LabelProps> = ({
  text,
  jiraRef,
  position = 'bottom-left',
  size = 'md',
}) => {
  const theme = useTheme();

  const positionStyles: Record<LabelPosition, React.CSSProperties> = {
    'top-left': { top: 24, left: 24 },
    'top-right': { top: 24, right: 24 },
    'bottom-left': { bottom: 48, left: 48 },
    'bottom-right': { bottom: 48, right: 48 },
  };

  const sizeStyles = {
    sm: { fontSize: 24, padding: '12px 20px', jiraSize: 18 },
    md: { fontSize: 32, padding: '16px 32px', jiraSize: 24 },
    lg: { fontSize: 40, padding: '20px 40px', jiraSize: 28 },
  };

  const s = sizeStyles[size];

  return (
    <div
      style={{
        position: 'absolute',
        ...positionStyles[position],
        backgroundColor: theme.colors.bgOverlay,
        color: theme.colors.textDark,
        padding: s.padding,
        borderRadius: theme.borderRadius.md,
        fontFamily: theme.fonts.primary,
        fontSize: s.fontSize,
        fontWeight: 500,
        boxShadow: `0 4px 12px ${theme.colors.shadow}`,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      {text}
      {jiraRef && (
        <span
          style={{
            color: theme.colors.primary,
            fontSize: s.jiraSize,
          }}
        >
          {jiraRef}
        </span>
      )}
    </div>
  );
};
