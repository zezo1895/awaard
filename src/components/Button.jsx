import React from 'react';

const Button = ({title,id,leftIcon,rightIcon,containerClass }) => {
  return (
    <button style={{ display:'flex',alignItems:'center' }} id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full ${containerClass}  px-7 py-3 text-black`}>
      {leftIcon}<span className='relative incline-flex overflow-hidden font-general text-xs uppercase'>{title}</span> {rightIcon}
    </button>
  );
}

export default Button;
