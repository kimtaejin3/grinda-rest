interface LeftArrowProps {
  className?: string;
  props?: React.ComponentProps<'svg'>;
}

export default function LeftArrow({ className, ...props }: LeftArrowProps) {
  return (
    <svg
      height="20px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
    </svg>
  );
}
