import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, X, ZoomIn, Heart, SlidersHorizontal } from 'lucide-react';

import gallery1 from '../assets/images/Gallery-1.jpg';
import gallery2 from '../assets/images/Gallery-2.jpg';
import gallery3 from '../assets/images/Gallery-3.jpg';
import gallery4 from '../assets/images/Gallery-4.jpg';

interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  description: string;
  date: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-1",
    src: gallery1,
    title: "The Beginning",
    description: "The met for the first time and felt like they’ve known each other since ages",
    date: "First Meeting"
  },
  {
    id: "photo-2",
    src: gallery2,
    title: "She Said Yes",
    description: "This is a dramatic recreation of the moment but IYKYK :P",
    date: "The Proposal"
  },
  {
    id: "photo-3",
    src: gallery3,
    title: "Rings Exchanged",
    description: "Engaged on March 14th, dreamed of living together forever",
    date: "March 14"
  },
  {
    id: "photo-4",
    src: gallery4,
    title: "Love is Blossoming",
    description: "Chasing flowers and clouds. Calm, content and holding hands till eternity",
    date: "Blossoming Love"
  }
];

export const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-between pt-2 pb-1 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-2.5 shrink-0">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c7e6d] font-bold">Captured Moments</span>
        <h2 className="font-cinzel text-lg text-[#4a443a]/90 tracking-widest mt-0.5">OUR STORY</h2>
        <div className="h-[1.5px] w-12 bg-[#8c7e6d] mx-auto mt-2" />
      </div>

      {/* Photo Grid Grid */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 select-none">
        <div className="grid grid-cols-2 gap-3 pb-2">
          <AnimatePresence mode="popLayout">
            {GALLERY_PHOTOS.map((photo) => {
              const isLiked = !!likes[photo.id];
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="bg-white p-2 border border-[#eeebe3] rounded-[2px] shadow-sm flex flex-col group cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
                >
                  {/* Polaroid Frame Image Wrapper */}
                  <div className="aspect-[4/3] w-full overflow-hidden relative rounded-[1px] bg-[#f5f2eb]">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-[#faf9f6]/95 text-[#4a443a] p-1.5 rounded-full shadow-md">
                        <Eye className="w-4 h-4 text-[#8c7e6d]" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="mt-1.5 flex flex-col justify-between flex-1">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-serif-lux font-bold text-[11px] leading-snug text-[#4a443a] truncate">
                        {photo.title}
                      </h4>
                      <button
                        onClick={(e) => toggleLike(e, photo.id)}
                        className={`p-0.5 -mt-0.5 hover:scale-110 transition-transform cursor-pointer ${
                          isLiked ? 'text-rose-500' : 'text-[#8c7e6d]/45 hover:text-rose-400'
                        }`}
                        title="Love this photograph"
                      >
                        <Heart className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                    <span className="text-[8px] font-mono opacity-50 block mt-0.5">
                      {photo.date}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer navigation/caption clue */}
      <div className="text-center pt-2 border-t border-[#eeebe3] mt-2 select-none flex flex-col items-center gap-1.5">
        <span className="text-[10px] text-[#8c7e6d]/65 font-mono tracking-widest">— III —</span>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/95 backdrop-blur-sm z-[100] flex flex-col justify-between p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close Button & Header */}
            <div className="flex justify-between items-center w-full text-white/80 z-10 p-2">
              <span className="font-cinzel tracking-[0.15em] text-xs font-semibold text-amber-200">
                Our Love Story
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Immersive Photo Display */}
            <div className="flex-1 flex items-center justify-center p-2 relative">
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="max-w-md w-full bg-[#faf9f6] p-3 shadow-2xl rounded-[3px] border border-stone-200 flex flex-col gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image */}
                <div className="w-full relative aspect-[4/3] rounded-[1px] overflow-hidden bg-neutral-100">
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>

                {/* Polaroid Caption Style */}
                <div className="px-1 pb-1">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2 mb-2">
                    <div>
                      <h3 className="font-serif-lux font-bold text-sm text-[#4a443a]">
                        {selectedPhoto.title}
                      </h3>
                      <p className="text-[9px] font-mono text-[#8c7e6d]">
                        {selectedPhoto.date}
                      </p>
                    </div>
                    
                    <button
                      onClick={(e) => toggleLike(e, selectedPhoto.id)}
                      className={`p-1.5 border border-stone-200 rounded-full transition-colors cursor-pointer ${
                        likes[selectedPhoto.id] 
                          ? 'bg-rose-50 border-rose-200 text-rose-500' 
                          : 'bg-stone-50 border-stone-200 text-[#8c7e6d]/60 hover:text-rose-500 hover:bg-rose-50/50'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <p className="font-serif-lux text-xs leading-relaxed text-[#4a443a]/90 italic">
                    "{selectedPhoto.description}"
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Lightbox Footer */}
            <div className="text-center p-2 text-white/50 text-[10px] select-none tracking-widest font-mono">
              TAP OUTSIDE TO CLOSE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
