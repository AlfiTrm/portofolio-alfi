import Image from "next/image";

export default function BrandLogo({
  tone = "light",
  className = "h-6",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Image
      src={tone === "dark" ? "/logo/logo-black.svg" : "/logo/logo.svg"}
      alt=""
      aria-hidden="true"
      width={512}
      height={463}
      className={`block w-auto shrink-0 object-contain pt-1 ${className}`}
    />
  );
}
