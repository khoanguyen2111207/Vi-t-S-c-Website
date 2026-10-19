import React, { useState } from 'react';
import { Garment } from '../data/garments';
import { GarmentArtwork } from './GarmentArtwork';
import { X, BookOpen, Layers, Sparkles, ShieldCheck, ArrowRight, Image as ImageIcon, Palette } from 'lucide-react';

interface EncyclopediaModalProps {
  garment: Garment;
  isOpen: boolean;
  onClose: () => void;
  onSelectForTryOn: (garment: Garment) => void;
}

export const EncyclopediaModal: React.FC<EncyclopediaModalProps> = ({
  garment,
  isOpen,
  onClose,
  onSelectForTryOn,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'structure' | 'material' | 'etiquette'>('history');
  const [viewArtwork, setViewArtwork] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FDFBF7] max-w-2xl w-full rounded-2xl border-2 border-amber-500/70 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#800000] text-white px-5 py-4 flex justify-between items-center border-b border-amber-400/40">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
              <span>{garment.regionName}</span>
              <span>·</span>
              <span>{garment.dynasty}</span>
              <span>·</span>
              <span>{garment.century}</span>
            </div>
            <h3
              className="text-xl sm:text-2xl font-bold mt-0.5 tracking-wide text-white"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              {garment.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-amber-50/50 px-5 pt-2 gap-2 text-xs font-semibold overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-[#800000] text-[#800000]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Lịch sử & Nguồn gốc
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'structure'
                ? 'border-[#800000] text-[#800000]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Cấu trúc & Nếp gấp
          </button>
          <button
            onClick={() => setActiveTab('material')}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'material'
                ? 'border-[#800000] text-[#800000]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Chất liệu & Hoa văn
          </button>
          <button
            onClick={() => setActiveTab('etiquette')}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'etiquette'
                ? 'border-[#800000] text-[#800000]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Quy chuẩn & Nghi lễ
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto custom-scrollbar space-y-4 text-xs leading-relaxed text-stone-700">
          {/* Main Visual & View Switcher */}
          <div className="relative h-60 rounded-xl overflow-hidden border border-amber-300/80 shadow-inner group bg-stone-900">
            {viewArtwork || imgError ? (
              <div className="w-full h-full flex items-center justify-center p-2 bg-[#1A0505]">
                <GarmentArtwork garmentId={garment.id} className="max-h-full max-w-full" showDetails={true} />
              </div>
            ) : (
              <img
                src={garment.image}
                alt={garment.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
            )}

            {/* Toggle Photo vs Vector Artwork */}
            <div className="absolute top-3 right-3 flex bg-black/60 backdrop-blur-md rounded-lg p-0.5 border border-white/20">
              <button
                type="button"
                onClick={() => setViewArtwork(false)}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition flex items-center gap-1 ${
                  !viewArtwork && !imgError ? 'bg-[#800000] text-amber-200 shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                <span>Ảnh tư liệu</span>
              </button>
              <button
                type="button"
                onClick={() => setViewArtwork(true)}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition flex items-center gap-1 ${
                  viewArtwork || imgError ? 'bg-[#800000] text-amber-200 shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                <Palette className="w-3 h-3" />
                <span>Bản vẽ cấu trúc</span>
              </button>
            </div>

            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 text-white flex justify-between items-end">
              <span className="text-xs font-semibold drop-shadow">
                {viewArtwork || imgError
                  ? 'Bản vẽ giải phẫu cấu trúc nẹp cổ & nếp gấp cung đình'
                  : 'Hình ảnh lưu trữ mẫu di sản chuẩn phục chế'}
              </span>
              <span className="text-[10px] text-amber-300 font-bold bg-black/40 px-2 py-0.5 rounded border border-amber-400/40">
                {garment.century}
              </span>
            </div>
          </div>

          {activeTab === 'history' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <p className="text-stone-800 text-sm font-serif italic border-l-2 border-[#800000] pl-3 py-0.5 leading-relaxed">
                &ldquo;{garment.shortDesc}&rdquo;
              </p>
              <div>
                <h4 className="font-bold text-[#800000] uppercase text-[11px] mb-1">
                  Bối cảnh lịch sử ({garment.century})
                </h4>
                <p>
                  Trang phục phản ánh đậm nét tư duy thẩm mỹ và thể chế văn hóa của người Việt qua từng thời kỳ lịch sử độc lập tự chủ. Được bảo tồn qua thư tịch cổ như <em>Khâm Định Đại Nam Hội Điển Sự Lệ</em> và các hiện vật cung đình còn lưu giữ tại Bảo tàng Lịch sử Quốc gia.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div>
                <h4 className="font-bold text-[#800000] uppercase text-[11px] mb-1">
                  Cấu trúc vạt & Cổ áo
                </h4>
                <p>{garment.structure}</p>
              </div>
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
                <h5 className="font-bold text-stone-800 mb-1">Quy tắc nếp gấp:</h5>
                <p className="text-stone-600">
                  Các đường may can dọc thân được tính toán đối xứng nghiêm ngặt. Độ rủ của tà áo buông tự nhiên, tạo sự mực thước khi di chuyển hay hành lễ.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'material' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div>
                <h4 className="font-bold text-[#800000] uppercase text-[11px] mb-1">
                  Chất liệu vải tơ lụa truyền thống
                </h4>
                <p>{garment.material}</p>
              </div>
              <div>
                <h4 className="font-bold text-[#800000] uppercase text-[11px] mb-1">
                  Phụ kiện phối kèm chuẩn cung đình
                </h4>
                <p>{garment.accessories}</p>
              </div>
            </div>
          )}

          {activeTab === 'etiquette' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div>
                <h4 className="font-bold text-[#800000] uppercase text-[11px] mb-1">
                  Nghi thức & Dịp phục sức
                </h4>
                <p>{garment.etiquette}</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <span className="font-bold">✓ Xác thực dữ liệu lịch sử:</span> Nội dung và phom dáng đã được đối chiếu với tư liệu của các nhà nghiên cứu trang phục cổ Việt Nam (Vietnam Centre, Hoa Văn Đại Việt).
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-200 flex flex-wrap justify-between items-center gap-3">
          <div className="text-[11px] text-stone-500 font-medium">
            Giá thuê tham khảo: <strong className="text-[#800000]">{garment.rentPrice.toLocaleString('vi-VN')}đ / ngày</strong>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={garment.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-300 text-[#800000] font-bold text-xs hover:bg-amber-100 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Đọc trên Wikipedia ↗</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onSelectForTryOn(garment);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#800000] to-[#5a0000] text-white font-bold text-xs shadow hover:opacity-95 transition flex items-center gap-1.5"
            >
              Ướm thử bộ này ngay
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
