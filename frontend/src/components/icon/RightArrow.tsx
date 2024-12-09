interface RightArrowProps {
  className?: string;
  props?: React.ComponentProps<'svg'>;
}

export default function RightArrow({ className, ...props }: RightArrowProps) {
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
      <polygon points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 " />
    </svg>
  );
}
