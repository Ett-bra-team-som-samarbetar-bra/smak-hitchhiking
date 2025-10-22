
export default function IconButton({
    icon,
    onClick,
    className = "",
    size = "fs-4",
    color = "text-black",
    bg = "bg-white",
    variant = "shadow"
}: {
    icon: string;
    onClick?: () => void;
    className?: string;
    size?: string;
    color?: string;
    bg?: string;
    variant?: "flat" | "shadow";
}) {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`bi ${icon} ${size} ${color} ${bg} rounded-circle border-0 ${variant} d-flex justify-content-center align-items-center ${className}`}
        />

    );
}