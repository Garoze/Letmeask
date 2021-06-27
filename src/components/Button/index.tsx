import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export const Button = ({ isOutlined, ...props }: ButtonProps) => (
  <button
    type="button"
    className={`button ${isOutlined ? 'outlined' : ''}`}
    {...props}
  />
);
