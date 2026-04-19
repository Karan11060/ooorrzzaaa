import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  category?: string;
  servingSize?: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrev = () =>
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () =>
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3">
      {/* Thumbnail strip — left on desktop, bottom on mobile */}
      <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[520px] pb-2 sm:pb-0 sm:pr-1">
        {images.map((img, i) => (
          <button
            key={i}
            onMouseEnter={() => setSelectedIndex(i)}
            onClick={() => setSelectedIndex(i)}
            className={`flex-shrink-0 w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-lg overflow-hidden border-2 transition-all duration-200 bg-white ${
              selectedIndex === i
                ? 'border-[#007185] shadow-md'
                : 'border-gray-200 hover:border-[#007185]/50'
            }`}
          >
            <img
              src={img}
              alt={`${productName} view ${i + 1}`}
              className="w-full h-full object-contain p-1"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 relative group">
        <div
          className="relative rounded-xl overflow-hidden bg-white border border-gray-200 cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full aspect-square flex items-center justify-center p-6"
            >
              <img
                src={images[selectedIndex]}
                alt={`${productName} - Image ${selectedIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4" />
          </div>

          {/* Counter */}
          <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Fullscreen zoom modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
            onClick={() => setIsZoomed(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Zoomed image */}
            <motion.img
              key={`zoom-${selectedIndex}`}
              src={images[selectedIndex]}
              alt={productName}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Zoom nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}

            {/* Bottom thumbnails in zoom mode */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all bg-white ${
                    selectedIndex === i
                      ? 'border-[#007185] shadow-lg'
                      : 'border-gray-300 hover:border-[#007185]/50'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-0.5" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
