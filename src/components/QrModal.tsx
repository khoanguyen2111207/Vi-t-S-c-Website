import React, { useState } from 'react';
import { Garment } from '../data/garments';
import { X, Copy, Check, ExternalLink, Printer, BookOpen } from 'lucide-react';

interface QrModalProps {
  garment: Garment;
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const QrModal: React.FC<QrModalProps> = ({ garment, isOpen, onClose, onToast }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Exact Wikipedia destination for the costume
  const targetWikiUrl = garment.wikipediaUrl || `https://vi.wikipedia.org/wiki/${encodeURIComponent(garment.name)}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&color=800000&bgcolor=FDFBF7&data=${encodeURIComponent(
    targetWikiUrl
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(targetWikiUrl);
    setCopied(true);
    onToast('Đã sao chép liên kết Wikipedia chính thức!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenWiki = () => {
    window.open(targetWikiUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-sm w-full rounded-2xl border-2 border-amber-500/80 p-6 text-center shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Đóng cửa sổ"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
          Mã QR Storytelling Wikipedia
        </span>

        <h3
          className="text-xl font-bold text-[#800000] mt-3"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          {garment.name}
        </h3>
        <p className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
          {garment.dynasty} · {garment.regionBadge}
        </p>

        <p className="text-xs text-stone-600 mt-2 leading-relaxed">
          Quét mã bằng Camera điện thoại để mở <strong>Bách khoa toàn thư mở Wikipedia</strong> tìm hiểu nguồn gốc lịch sử & quy chế trang phục.
        </p>

        {/* QR Code Container linking to Wikipedia */}
        <div className="my-3.5 p-3 rounded-2xl border-2 border-amber-400/70 bg-[#FDFBF7] shadow-inner inline-block">
          <img
            src={qrImageUrl}
            alt={`Mã QR Wikipedia ${garment.name}`}
            className="w-48 h-48 rounded-xl object-contain mx-auto"
            referrerPolicy="no-referrer"
          />
          <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#800000]">
            <BookOpen className="w-3.5 h-3.5 text-stone-700" />
            <span>vi.wikipedia.org/{garment.name.replace(/\s+/g, '_')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Direct link to Wikipedia */}
          <button
            onClick={handleOpenWiki}
            className="w-full py-2.5 px-4 rounded-xl bg-[#800000] hover:bg-[#5a0000] text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
          >
            <ExternalLink className="w-4 h-4 text-amber-300" />
            <span>Mở trực tiếp trên Wikipedia ↗</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full py-2 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-[#800000] font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Đã sao chép link Wikipedia!' : 'Sao chép liên kết Wikipedia'}
          </button>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              In biển trưng bày
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
