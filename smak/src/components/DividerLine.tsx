interface DividerLineProps {
  className?: string;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
}

export default function DividerLine({ className = "", variant = "dark" }: DividerLineProps) {
  return (
    <div
      className={className}
      style={{
        height: "1px",
        backgroundColor: `var(--bs-${variant})`,
        width: "100%",
      }}
    />
  );
}
