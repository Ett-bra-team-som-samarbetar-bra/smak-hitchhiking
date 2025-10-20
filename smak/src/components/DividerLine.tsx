interface DividerLineProps {
  className?: string;
}

export default function DividerLine({ className = "" }: DividerLineProps) {
  return (
    <div
      className={className}
      style={{
        height: "1px",
        backgroundColor: "black",
        width: "100%",
      }}
    />
  );
}
