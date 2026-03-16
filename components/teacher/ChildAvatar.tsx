// Generates a consistent colour for each child name via a simple hash

const AVATAR_COLORS = [
  { bg: "#E8F5EE", text: "#2D7A4F" }, // green
  { bg: "#FEF3D7", text: "#A06010" }, // amber
  { bg: "#FEE9E5", text: "#C0432A" }, // coral
  { bg: "#E8EFF8", text: "#3A5EA0" }, // blue
  { bg: "#F3E8F8", text: "#7A3A9A" }, // purple
  { bg: "#E8F8F3", text: "#3A9A7A" }, // teal
  { bg: "#F8F3E8", text: "#9A7A3A" }, // brown
  { bg: "#F8E8F3", text: "#9A3A7A" }, // pink
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % AVATAR_COLORS.length;
  }
  return hash;
}

interface ChildAvatarProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export function ChildAvatar({ name, size = "md" }: ChildAvatarProps) {
  const colorIdx = hashName(name);
  const { bg, text } = AVATAR_COLORS[colorIdx];
  const initial = name.charAt(0).toUpperCase();

  const sizeClass =
    size === "xs"
      ? "w-5 h-5 text-xs"
      : size === "sm"
      ? "w-8 h-8 text-sm"
      : size === "lg"
      ? "w-14 h-14 text-xl"
      : "w-10 h-10 text-base";

  return (
    <span
      className={`${sizeClass} rounded-full flex items-center justify-center font-bold shrink-0`}
      style={{ background: bg, color: text }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
