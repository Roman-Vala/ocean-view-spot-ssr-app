import React,{ useState, useEffect } from "react";

/**
 * ProductImageGallery with Lightbox / Zoom Modal written by AI
 */
export default function ProductImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const selectedImage = images[selectedIndex];

  const openLightbox = (index) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  if (!images.length) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded">
        <span className="text-gray-400">Loading images..</span>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        {/* Main Image */}
        <div
          className="w-full aspect-square mb-4 overflow-hidden rounded shadow cursor-zoom-in"
          onClick={() => openLightbox(selectedIndex)}
        >
          <img
            src={selectedImage}
            alt={`Product image ${selectedIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition ${
                selectedIndex === index
                  ? "border-stone-500"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            ×
          </button>

          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 text-white text-3xl"
          >
            ‹
          </button>

          {/* Image */}
          <img
            src={selectedImage}
            alt="Zoomed product"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-md"
          />

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 text-white text-3xl"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}

/**
 * Example usage:
 *
 * const images = [
 *   "/images/product1.jpg",
 *   "/images/product2.jpg",
 *   "/images/product3.jpg",
 * ];
 *
 * <ProductImageGallery images={images} />
 */
