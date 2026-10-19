import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  originalImage: string;
  resultImage: string;
  garmentName: string;
  modeLabel: string;
  onFullscreen?: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  originalImage,
  resultImage,
  garmentName,
  modeLabel,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      className="relative w-full h-72 sm:h-84 md:h-96 rounded-2xl overflow-hidden bg-stone-900 border-2 border-amber-500/60 shadow-lg select-none cursor-ew-resize group"
    >
      {/* Result Image (Full background) */}
      <img
        src={resultImage}
        alt={`Kết quả AI ${garmentName}`}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Original Image (Clipped by slider percentage) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none transition-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={originalImage}
          alt="Ảnh gốc người dùng"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current?.clientWidth || '100%' }}
        />
        {/* Tint overlay for contrast */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-stone-200 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
          Ảnh mộc ban đầu
        </div>
      </div>

      {/* Badges on Result Side */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 pointer-events-none">
        <span className="bg-[#800000]/90 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/40 shadow">
          4K Ultra HD
        </span>
        <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full">
          {modeLabel}
        </span>
      </div>

      {/* Slider Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-amber-400 cursor-ew-resize transition-none pointer-events-none shadow-[0_0_10px_rgba(218,165,32,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Center Draggable Knob */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-bold pointer-events-auto">
          ↔
        </div>
      </div>

      {/* Bottom Information Ribbon */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3.5 text-white flex justify-between items-end pointer-events-none">
        <div>
          <p className="text-xs font-bold text-amber-200">{garmentName}</p>
          <p className="text-[10px] text-stone-300">Kéo thanh trượt để so sánh hiệu ứng ướm cổ phục</p>
        </div>
        <span className="text-[10px] text-stone-300 bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
          {Math.round(sliderPosition)}% Ảnh gốc
        </span>
      </div>
    </div>
  );
};
