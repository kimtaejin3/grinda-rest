export default function Popover({
  isOpen,
  children,
  className,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (!isOpen) {
    return <></>;
  }
  return <div className={className}>{children}</div>;
}
