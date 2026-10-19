import React, { useState } from 'react';

interface VietnamMapProps {
  activeRegion: 'all' | 'bac' | 'trung' | 'nam';
  onSelectRegion: (region: 'all' | 'bac' | 'trung' | 'nam') => void;
}

export const VietnamMap: React.FC<VietnamMapProps> = ({ activeRegion, onSelectRegion }) => {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center relative select-none w-full">
      {/* SVG 3 ô vùng miền: Bắc Bộ, Trung Bộ, Nam Bộ (Đã bỏ Hoàng Sa & Trường Sa) */}
      <svg
        viewBox="0 0 160 176"
        className="w-full max-w-[160px] h-auto drop-shadow-sm"
        aria-label="Các ô lựa chọn 3 miền văn hóa: Bắc Bộ, Trung Bộ, Nam Bộ"
      >
        <defs>
          <filter id="boxShadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#800000" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* 1. Ô Miền Bắc (Bắc Bộ · Thăng Long) */}
        <g
          onClick={() => onSelectRegion('bac')}
          onMouseEnter={() => setHoveredBox('bac')}
          onMouseLeave={() => setHoveredBox(null)}
          className="cursor-pointer transition-all duration-200"
          aria-label="Ô Miền Bắc"
        >
          <rect
            x="8"
            y="8"
            width="144"
            height="48"
            rx="10"
            fill={
              activeRegion === 'bac' || activeRegion === 'all'
                ? '#800000'
                : hoveredBox === 'bac'
                ? '#991B1B'
                : '#FDFBF7'
            }
            stroke="#DAA520"
            strokeWidth={activeRegion === 'bac' ? '2.5' : '1.2'}
            filter="url(#boxShadow)"
          />
          <text
            x="32"
            y="32"
            fill={activeRegion === 'bac' || activeRegion === 'all' ? '#FFF' : '#800000'}
            fontSize="12"
            fontWeight="bold"
            fontFamily="'Be Vietnam Pro', sans-serif"
          >
            BẮC BỘ
          </text>
          <text
            x="32"
            y="45"
            fill={activeRegion === 'bac' || activeRegion === 'all' ? '#FDE68A' : '#78350F'}
            fontSize="9"
            fontWeight="600"
            fontFamily="'Be Vietnam Pro', sans-serif"
          >
            Thăng Long · Kinh Bắc
          </text>
          {/* Active indicator dot */}
          {(activeRegion === 'bac' || activeRegion === 'all') && (
            <circle cx="136" cy="32" r="4" fill="#DAA520" stroke="#FFF" strokeWidth="1" />
          )}
        </g>

        {/* 2. Ô Miền Trung (Trung Bộ · Cố Đô Huế) */}
        <g
          onClick={() => onSelectRegion('trung')}
          onMouseEnter={() => setHoveredBox('trung')}
          onMouseLeave={() => setHoveredBox(null)}
          className="cursor-pointer transition-all duration-200"
          aria-label="Ô Miền Trung"
        >
          <rect
            x="8"
            y="64"
            width="144"
            height="48"
            rx="10"
            fill={
              activeRegion === 'trung' || activeRegion === 'all'
                ? '#991B1B'
                : hoveredBox === 'trung'
                ? '#B91C1C'
                : '#FDFBF7'
            }
            stroke="#DAA520"
            strokeWidth={activeRegion === 'trung' ? '2.5' : '1.2'}
            filter="url(#boxShadow)"
          />
          <text
            x="32"
            y="88"
            fill={activeRegion === 'trung' || activeRegion === 'all' ? '#FFF' : '#991B1B'}
            fontSize="12"
            fontWeight="bold"
            fontFamily="'Be Vietnam Pro', sans-serif"
          >
            TRUNG BỘ
          </text>
          <text
            x="32"
            y="101"
            fill={activeRegion === 'trung' || activeRegion === 'all' ? '#FDE68A' : '#78350F'}
            fontSize="9"
            fontWeight="600"
            fontFamily="'Be Vietnam Pro', sans-serif"
          >
            Cố Đô Huế · Triều Nguyễn
          </text>
          {(activeRegion === 'trung' || activeRegion === 'all') && (
            <circle cx="136" cy="88" r="4" fill="#DAA520" stroke="#FFF" strokeWidth="1" />
          )}
        </g>

        {/* 3. Ô Miền Nam (Nam Bộ · Gia Định) */}
        <g
          onClick={() => onSelectRegion('nam')}
          onMouseEnter={() => setHoveredBox('nam')}
          onMouseLeave={() => setHoveredBox(null)}
          className="cursor-pointer transition-all duration-200"
          aria-label="Ô Miền Nam"
        >
          <rect
            x="8"
            y="120"
            width="144"
            height="48"
            rx="10"
            fill={
              activeRegion === 'nam' || activeRegion === 'all'
                ? '#B91C1C'
                : hoveredBox === 'nam'
                ? '#DC2626'
                : '#FDFBF7'
            }
            stroke="#DAA520"
            strokeWidth={activeRegion === 'nam' ? '2.5' : '1.2'}
            filter="url(#boxShadow)"
          />
          <text
            x="32"
            y="144"
            fill={activeRegion === 'nam' || activeRegion === 'all' ? '#FFF' : '#B91C1C'}
            fontSize="12"
            fontWeight="bold"
            fontFamily="'Be Vietnam Pro', sans-serif"
          >
            NAM BỘ
          </text>
          <text
            x="32"
            y="157"
            fill={activeRegion === 'nam' || activeRegion === 'all' ? '#FDE68A' : '#78350F'}
            fontSize="9"
            fontWeight="600"
            fontFamily="'Be Vietnam Pro', sans-serif"
          >
            Gia Định · Sài Gòn Xưa
          </text>
          {(activeRegion === 'nam' || activeRegion === 'all') && (
            <circle cx="136" cy="144" r="4" fill="#DAA520" stroke="#FFF" strokeWidth="1" />
          )}
        </g>
      </svg>

      <span
        className="text-[10px] text-amber-900 font-bold mt-2 text-center"
        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
      >
        Chạm ô để lọc vùng miền
      </span>
    </div>
  );
};
