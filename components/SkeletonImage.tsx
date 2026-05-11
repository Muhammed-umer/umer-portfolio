import { useState, useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";

interface SkeletonImageProps extends Omit<ImageProps, "onLoad"> {
  skeletonClassName?: string;
}

/** Skeleton wrapper for Next.js <Image> (fill or sized) */
export function SkeletonImage({ className, skeletonClassName, ...props }: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if image is already cached
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className={`absolute inset-0 bg-white/10 overflow-hidden ${skeletonClassName ?? ""}`}>
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      )}
      <Image
        {...props}
        className={`${className ?? ""} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

/** Skeleton wrapper for plain <img> tags */
interface SkeletonImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
  wrapperClassName?: string;
}

export function SkeletonImg({ className, skeletonClassName, wrapperClassName, ...props }: SkeletonImgProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if image is already cached
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [props.src]);

  return (
    <div className={`relative ${wrapperClassName ?? "w-full h-full"}`}>
      {!loaded && (
        <div className={`absolute inset-0 bg-white/10 overflow-hidden ${skeletonClassName ?? ""}`}>
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      )}
      <img
        {...props}
        ref={imgRef}
        className={`${className ?? ""} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
