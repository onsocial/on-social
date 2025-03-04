import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import clsx from 'clsx';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  textClassName?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  className = '',
  textClassName = '',
  type = 'button',
}) => {
  const baseStyles = 'rounded-full font-bold flex items-center justify-center';

  const variants = {
    primary: 'bg-[#20252b] text-white dark:bg-white dark:text-[#20252b]',
    secondary: 'bg-[#D7D7DE] text-[#20252b] dark:bg-[#58606F] dark:text-white',
    danger: 'bg-[#FF0013] text-white dark:bg-[#FF0013] dark:text-white',
    'outline-primary':
      'border border-[#D7D7DE] text-[#20252b] dark:border-[#58606F] dark:text-white',
    'outline-secondary':
      'border border-[#D7D7DE] text-[#58606F] dark:border-[#58606F] dark:text-[#D7D7DE]',
    'outline-danger':
      'border border-[#FF0013] text-[#FF0013] dark:border-[#FF0013] dark:text-[#FF0013]',
  };

  const sizes = {
    sm: 'px-3 py-1',
    md: 'px-4 py-2',
    lg: 'px-5 py-3',
  };

  // Define text sizes explicitly
  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Map button size to spinner size
  const spinnerSizes = {
    sm: 'small',
    md: 'small',
    lg: 'large',
  };

  const hoverStyle = Platform.OS === 'web' ? 'hover:opacity-80' : '';

  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled || loading}
      activeOpacity={0.9}
      accessibilityRole="button"
      className={clsx(baseStyles, variants[variant], sizes[size], hoverStyle, className, {
        'opacity-50': disabled || loading,
      })}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <ActivityIndicator 
            size={spinnerSizes[size]} 
            color="grey" 
            className="mr-2" 
          />
        ) : icon ? (
          <View className="mr-2">{icon}</View>
        ) : null}
        {children && (
          <Text className={clsx('text-inherit', textSizes[size], textClassName)}>
            {children}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;