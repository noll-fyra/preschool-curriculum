import Image from "next/image";

interface SectionImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "video" | "square" | "portrait";
  className?: string;
  priority?: boolean;
}

const aspectRatios = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
};

export function SectionImage({
  src,
  alt,
  caption,
  aspect = "video",
  className = "",
  priority = false,
}: SectionImageProps) {
  return (
    <figure className={className}>
      <div
        className={`relative w-full overflow-hidden rounded-2xl ${aspectRatios[aspect]}`}
        style={{ boxShadow: "0 4px 24px rgba(74, 155, 111, 0.12)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption
          className="mt-3 text-sm text-center"
          style={{ color: "#5C6B5D" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
