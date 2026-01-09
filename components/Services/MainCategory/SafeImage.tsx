import Image from "next/image";

// Helper component to handle both internal and external images
export const SafeImage = ({ src, alt, fill, className, ...props }: { src: string; alt: string; fill?: boolean; className?: string; [key: string]: any }) => {
  const isExternal = src.startsWith('http://') || src.startsWith('https://');
  
  if (isExternal) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={fill ? { 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%', 
          height: '100%', 
          objectFit: 'cover' 
        } : undefined}
        {...props}
      />
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      {...props}
    />
  );
};

