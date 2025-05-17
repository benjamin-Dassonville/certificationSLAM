import React from 'react'

interface Props {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  onClick: () => void;
}

function Button({children, onClick, color="primary"}: Props) {
  return (
    <button className={"btn btn-" + color} onClick={onClick} >{children}</button>
  )
}

export default Button