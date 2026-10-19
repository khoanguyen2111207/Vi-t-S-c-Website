/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  GARMENTS_DATA,
  REGIONAL_HERITAGE,
  Garment,
  CartItem,
} from './data/garments';
import { VietnamMap } from './components/VietnamMap';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { EncyclopediaModal } from './components/EncyclopediaModal';
import { QrModal } from './components/QrModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CulturalAdvisorModal } from './components/CulturalAdvisorModal';
import { GarmentArtwork } from './components/GarmentArtwork';
import {
  Sparkles,
  BookOpen,
  QrCode,
  ShoppingBag,
  Upload,
  RefreshCw,
  Download,
  Volume2,
  VolumeX,
  Shield,
  Check,
  ChevronRight,
  Sliders,
  HelpCircle,
  Eye,
  Palette,
} from 'lucide-react';

export default function App() {
  // Navigation & Step state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [activeRegion, setActiveRegion] = useState<'all' | 'bac' | 'trung' | 'nam'>('all');
  const [selectedGarment, setSelectedGarment] = useState<Garment>(GARMENTS_DATA[0]);

  // AI Configuration state
  const [experienceMode, setExperienceMode] = useState<'baoton' | 'sangtao'>('baoton');
  const [aiMakeup, setAiMakeup] = useState<boolean>(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeVariantIndex, setActiveVariantIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'artwork' | 'slider' | 'single'>('artwork');

  // Simulation Progress state
  const [progress, setProgress] = useState<number>(0);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio Guide state
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  // Modals & Drawers state
  const [encyclopediaModalOpen, setEncyclopediaModalOpen] = useState<boolean>(false);
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [advisorModalOpen, setAdvisorModalOpen] = useState<boolean>(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [checkoutPromo, setCheckoutPromo] = useState<string>('');

  // Toast state
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cart State (Initialized with 1 demo item)
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: `${GARMENTS_DATA[0].id}-init`,
      garmentId: GARMENTS_DATA[0].id,
      name: GARMENTS_DATA[0].name,
      image: GARMENTS_DATA[0].image,
      modeLabel: 'Chế độ Bảo tồn · Kèm phụ kiện khăn vành',
      variantLabel: 'Chính diện Cung đình Huế',
      orderType: 'rent',
      size: 'M',
      days: 1,
      rentPrice: GARMENTS_DATA[0].rentPrice,
      buyPrice: GARMENTS_DATA[0].buyPrice,
      quantity: 1,
    },
  ]);

  // Toast Notification Helper
  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ show: true, message });
    toastTimerRef.current = setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3500);
  }, []);

  // Filtered Garment List
  const filteredGarments = useMemo(() => {
    if (activeRegion === 'all') return GARMENTS_DATA;
    return GARMENTS_DATA.filter((g) => g.region === activeRegion);
  }, [activeRegion]);

  // Audio Guide Controller
  const stopAudio = useCallback(() => {
    setAudioPlaying(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const toggleAudioGuide = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ phát giọng nói tự động. Vui lòng đọc phụ đề.');
      return;
    }

    if (audioPlaying) {
      stopAudio();
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(selectedGarment.audioScript);
      utterance.lang = 'vi-VN';
      utterance.rate = speechRate;
      utterance.onend = () => setAudioPlaying(false);
      utterance.onerror = () => setAudioPlaying(false);
      window.speechSynthesis.speak(utterance);
      setAudioPlaying(true);
      showToast('Đang phát thuyết minh di sản lịch sử...');
    }
  }, [audioPlaying, selectedGarment.audioScript, speechRate, stopAudio, showToast]);

  // Clean up audio on unmount or beforeunload
  useEffect(() => {
    const handleUnload = () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
    window.addEventListener('beforeunload', handleUnload);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEncyclopediaModalOpen(false);
        setQrModalOpen(false);
        setCartOpen(false);
        setAdvisorModalOpen(false);
        setCheckoutModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('keydown', handleKeyDown);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  // Select Garment Handler
  const handleSelectGarment = (item: Garment) => {
    stopAudio();
    setSelectedGarment(item);
    setActiveVariantIndex(0);
  };

  // Region Selection Handler
  const handleSelectRegion = (reg: 'all' | 'bac' | 'trung' | 'nam') => {
    setActiveRegion(reg);
    const list = reg === 'all' ? GARMENTS_DATA : GARMENTS_DATA.filter((g) => g.region === reg);
    if (list.length > 0) {
      handleSelectGarment(list[0]);
    }
  };

  // File Upload Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Vui lòng chọn định dạng hình ảnh hợp lệ (JPG, PNG, WEBP)!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      showToast('Đã tải ảnh lên bộ nhớ tạm (RAM) an toàn!');
    };
    reader.readAsDataURL(file);
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showToast('Đã xóa ảnh khỏi bộ nhớ tạm.');
  };

  // AI Processing Simulation - Vector Artwork Reconstruction
  const startAiProcessing = () => {
    stopAudio();
    if (!uploadedImage) {
      fileInputRef.current?.click();
      showToast('Vui lòng chọn ảnh chân dung để bắt đầu vẽ lại phục dựng vector cổ phục!');
      return;
    }
    setStep(2);
    setProgress(0);
    setActiveVariantIndex(0);
    setViewMode('artwork'); // Primary view is the vector illustration of the costume!

    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (progressTimerRef.current) clearInterval(progressTimerRef.current);
          setStep(3);
          showToast(`Đã hoàn tất bản vẽ Vector phục dựng chuẩn xác cho ${selectedGarment.name}!`);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  };

  const cancelProcessing = () => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    setProgress(0);
    setStep(1);
    showToast('Đã hủy tiến trình xử lý & làm sạch bộ nhớ tạm.');
  };

  const downloadSvgArtwork = () => {
    const svgEl = document.querySelector('#current-garment-svg');
    if (svgEl) {
      const svgData = new XMLSerializer().serializeToString(svgEl);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `ban-ve-vector-${selectedGarment.id}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
      showToast(`Đã tải xuống bản vẽ Vector SVG chuẩn của ${selectedGarment.name}!`);
    } else {
      showToast('Đang tạo tệp vector SVG...');
    }
  };

  const currentVariantImage = () => {
    return selectedGarment.variants[activeVariantIndex]?.img || selectedGarment.image;
  };

  // Save 4K Image via Canvas with Cultural Frame & Watermark
  const handleDownload4K = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 2000;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentVariantImage();

    img.onload = () => {
      // Draw background image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw elegant vignette
      const gradient = ctx.createLinearGradient(0, canvas.height - 400, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(40,10,10,0.88)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvas.height - 400, canvas.width, 400);

      // Gold border
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 14;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      // Inner hairline
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

      // Typography
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 54px "Playfair Display", serif';
      ctx.fillText(selectedGarment.name, 70, canvas.height - 180);

      ctx.fillStyle = '#F3E5AB';
      ctx.font = '32px "Be Vietnam Pro", sans-serif';
      ctx.fillText(
        `${selectedGarment.dynasty} · ${experienceMode === 'baoton' ? 'Chế độ Bảo tồn 100%' : 'Chế độ Sáng tạo'}`,
        70,
        canvas.height - 120
      );

      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = '24px "Be Vietnam Pro", sans-serif';
      ctx.fillText('Việt Sắc · Phòng Thử Đồ Văn Hóa Ảo AI 4K', 70, canvas.height - 70);

      // Trigger download
      const link = document.createElement('a');
      link.download = `VietSac-4K-${selectedGarment.id}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
      showToast('Đã tải tác phẩm 4K độ phân giải cao về thiết bị!');
    };

    img.onerror = () => {
      // Fallback direct link
      const fallbackLink = document.createElement('a');
      fallbackLink.href = currentVariantImage();
      fallbackLink.target = '_blank';
      fallbackLink.download = `VietSac-4K-${selectedGarment.id}.jpg`;
      fallbackLink.click();
      showToast('Đã mở ảnh 4K!');
    };
  };

  // Add to Shopify Cart
  const handleAddToCart = () => {
    const modeText = experienceMode === 'baoton' ? 'Chế độ Bảo tồn' : 'Chế độ Sáng tạo';
    const variant = selectedGarment.variants[activeVariantIndex]?.label || 'Nguyên bản';

    const newItem: CartItem = {
      id: `${selectedGarment.id}-${Date.now()}`,
      garmentId: selectedGarment.id,
      name: `${selectedGarment.name} (${selectedGarment.dynasty})`,
      image: currentVariantImage(),
      modeLabel: `${modeText} · ${aiMakeup ? 'Kèm Tóc mây & Khăn' : 'Cổ phục đơn'}`,
      variantLabel: variant,
      orderType: 'rent',
      size: 'M',
      days: 1,
      rentPrice: selectedGarment.rentPrice,
      buyPrice: selectedGarment.buyPrice,
      quantity: 1,
    };

    setCart((prev) => [newItem, ...prev]);
    setCartOpen(true);
    showToast('Đã thêm cổ phục vào Giỏ hàng Shopify!');
  };

  const handleUpdateCartItem = (index: number, updated: CartItem) => {
    setCart((prev) => {
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Đã xóa món khỏi giỏ hàng.');
  };

  const handleProceedToCheckout = (discount: number, promo: string) => {
    setCheckoutDiscount(discount);
    setCheckoutPromo(promo);
    setCartOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleCompleteOrder = () => {
    setCart([]);
    showToast('🎉 Đơn hàng đã được đồng bộ với hệ thống cửa hàng O2O!');
  };

  // Status text for Queue Simulation - Vector Artwork Drawing
  const queueStatusText = () => {
    if (progress < 30) return 'Hàng đợi: Phân tích nhân trắc học ảnh & cấu trúc phom dáng...';
    if (progress < 75) return `Đang vẽ lại bản vector chuẩn xác: ${selectedGarment.name}...`;
    return 'Hoàn thiện nẹp cổ, hoa văn bát bửu & xuất bản vẽ vector...';
  };

  const processingStepDetail = () => {
    if (progress < 30) return 'Bóc tách đường nét khuôn mặt & tỷ lệ vai áo từ ảnh chân dung của bạn...';
    if (progress < 70)
      return `Vẽ lại vector chuẩn triều đại: ${selectedGarment.name} (${experienceMode === 'baoton' ? 'Bảo tồn 100% quy chuẩn' : 'Sáng tạo cổ phong'})`;
    if (progress < 90)
      return aiMakeup
        ? 'Phối dải hoa văn, dải ngũ hành & layout tóc mây / khăn vành chuẩn triều đại...'
        : 'Khớp nếp gấp, nẹp cổ đối khâm & hoàn thiện đường nét vector...';
    return 'Hoàn tất bản vẽ vector sắc nét & giải phóng dữ liệu bộ nhớ tạm RAM...';
  };

  const regionLabel = () => {
    const map = {
      all: '3 Miền: Bắc · Trung · Nam',
      bac: 'Miền Bắc (Thăng Long - Kinh Bắc)',
      trung: 'Miền Trung (Cố đô Huế)',
      nam: 'Miền Nam (Gia Định)',
    };
    return map[activeRegion];
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 p-3 sm:p-5 flex flex-col justify-between">
      {/* Toast Notification */}
      {toast.show && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-[70] bg-[#800000] text-white px-5 py-3 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-3 text-xs font-semibold max-w-sm animate-in slide-in-from-bottom duration-300"
        >
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Grid Container (1440px max width baseline) */}
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1">
        {/* ================= LEFT SIDEBAR (DESKTOP) ================= */}
        <aside className="xl:col-span-2 bento-card p-5 flex flex-col justify-between hidden xl:flex">
          <div>
            {/* Brand Wordmark */}
            <div className="text-center border-b border-amber-200/70 pb-4 mb-5">
              <h1
                className="text-2xl text-[#800000] font-black tracking-wide"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                VIỆT SẮC
              </h1>
              <p className="text-[10px] text-amber-800 font-semibold uppercase tracking-widest mt-0.5">
                Di Sản Số & AI Cổ Phục
              </p>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1.5 text-xs font-semibold">
              <button
                onClick={() => setStep(1)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${
                  step === 1
                    ? 'bg-[#800000] text-white shadow-md'
                    : 'text-[#800000] hover:bg-red-50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Phòng Thử Đồ AI</span>
              </button>

              <button
                onClick={() => setEncyclopediaModalOpen(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-[#800000] hover:bg-red-50 transition"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Bách Khoa 3 Miền</span>
              </button>

              <button
                onClick={() => setAdvisorModalOpen(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-[#800000] hover:bg-red-50 transition"
              >
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Cố Vấn Lịch Sử</span>
              </button>

              <button
                onClick={() => setQrModalOpen(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-[#800000] hover:bg-red-50 transition"
              >
                <QrCode className="w-4 h-4 text-amber-600" />
                <span>QR Storytelling</span>
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="w-full flex items-center justify-between p-3 rounded-xl text-[#800000] hover:bg-red-50 transition"
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                  <span>Cửa Hàng O2O</span>
                </span>
                <span className="bg-amber-100 text-[#800000] px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {cart.length}
                </span>
              </button>
            </nav>

            {/* Zero-Retention Security Pledge */}
            <div className="mt-6 p-3.5 rounded-xl bg-gradient-to-br from-red-50 via-amber-50/40 to-white border border-amber-300/60 shadow-xs">
              <div className="flex items-center gap-2 text-[#800000] font-bold text-[11px] mb-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Bảo Mật Zero-Retention</span>
              </div>
              <p className="text-[10px] text-stone-600 leading-relaxed">
                Ảnh tải lên chỉ xử lý tạm thời trên bộ nhớ RAM qua kết nối mã hóa HTTPS. Tự động xóa vĩnh viễn ngay sau khi kết xuất.
              </p>
            </div>
          </div>

          {/* User profile / System Readiness */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-red-100 border-2 border-amber-400 flex items-center justify-center text-[#800000] font-bold text-xs">
                VS
              </div>
              <div>
                <p className="text-xs font-bold text-[#800000]">Khách Trải Nghiệm</p>
                <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Cloud GPU: Sẵn sàng
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="xl:col-span-10 flex flex-col gap-5">
          {/* TOP BAR / HEADER */}
          <header className="bento-card px-5 py-3.5 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="xl:hidden text-xl font-black text-[#800000] mr-2"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                VIỆT SẮC
              </span>

              {/* 3-Region Filter Tabs */}
              <div className="flex flex-wrap bg-amber-50/90 rounded-full p-1 border border-amber-300/40">
                <button
                  onClick={() => handleSelectRegion('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                    activeRegion === 'all'
                      ? 'bg-[#800000] text-white shadow-xs'
                      : 'text-stone-600 hover:text-[#800000]'
                  }`}
                >
                  Tất cả (3 Miền)
                </button>
                <button
                  onClick={() => handleSelectRegion('bac')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                    activeRegion === 'bac'
                      ? 'bg-[#800000] text-white shadow-xs'
                      : 'text-stone-600 hover:text-[#800000]'
                  }`}
                >
                  Miền Bắc (Hồ Gươm)
                </button>
                <button
                  onClick={() => handleSelectRegion('trung')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                    activeRegion === 'trung'
                      ? 'bg-[#800000] text-white shadow-xs'
                      : 'text-stone-600 hover:text-[#800000]'
                  }`}
                >
                  Miền Trung (Huế)
                </button>
                <button
                  onClick={() => handleSelectRegion('nam')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                    activeRegion === 'nam'
                      ? 'bg-[#800000] text-white shadow-xs'
                      : 'text-stone-600 hover:text-[#800000]'
                  }`}
                >
                  Miền Nam (Gia Định)
                </button>
              </div>
            </div>

            {/* 3 Step Indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold">
              <button
                onClick={() => {
                  if (step !== 2) setStep(1);
                }}
                className={`px-3 py-1 rounded-full transition whitespace-nowrap ${
                  step === 1 ? 'bg-[#800000] text-white shadow-xs' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                1. Thiết lập & Tải ảnh
              </button>
              <span className="text-amber-500 font-bold">→</span>
              <span
                className={`px-3 py-1 rounded-full transition whitespace-nowrap ${
                  step === 2 ? 'bg-[#800000] text-white shadow-xs' : 'bg-stone-100 text-stone-600'
                }`}
              >
                2. Cloud AI Xử lý
              </span>
              <span className="text-amber-500 font-bold">→</span>
              <span
                className={`px-3 py-1 rounded-full transition whitespace-nowrap ${
                  step === 3 ? 'bg-[#800000] text-white shadow-xs' : 'bg-stone-100 text-stone-600'
                }`}
              >
                3. Kết quả 4K & O2O
              </span>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAdvisorModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-amber-50 text-[#800000] font-bold text-xs border border-amber-300 hover:bg-amber-100 transition flex items-center gap-1.5"
                title="Hỏi Cố Vấn Văn Hóa"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">Cố Vấn</span>
              </button>

              <button
                onClick={() => setQrModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-amber-50 text-[#800000] font-bold text-xs border border-amber-300 hover:bg-amber-100 transition flex items-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">Quét QR Di Sản</span>
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#800000] text-white font-bold text-xs shadow hover:bg-[#5a0000] transition flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                <span>Giỏ Hàng</span>
                <span className="bg-amber-400 text-stone-900 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold">
                  {cart.length}
                </span>
              </button>
            </div>
          </header>

          {/* TWO MAIN COLUMNS: ENCYCLOPEDIA (5 cols) & TRY-ON STUDIO (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">
            {/* ================= LEFT COLUMN: BÁCH KHOA 3 MIỀN ================= */}
            <section className="lg:col-span-5 bento-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2
                      className="text-xl font-bold text-[#800000]"
                      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                      BÁCH KHOA CỔ PHỤC 3 MIỀN
                    </h2>
                    <p className="text-xs text-stone-500">
                      Chạm vùng miền hoặc thẻ trang phục để khám phá tư liệu lịch sử
                    </p>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-[#800000] border border-red-200 shrink-0">
                    {regionLabel()}
                  </span>
                </div>

                {/* HÌNH ẢNH ĐẶC TRƯNG 3 MIỀN (BẮC, TRUNG, NAM) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Hình ảnh di sản đặc trưng 3 miền:
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium">
                      Nhấp để chọn vùng
                    </span>
                  </div>

                  {/* 3 Thẻ Hình Ảnh Đặc Trưng 3 Miền */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {(['bac', 'trung', 'nam'] as const).map((rKey) => {
                      const rData = REGIONAL_HERITAGE[rKey];
                      const isRActive =
                        activeRegion === rKey || (activeRegion === 'all' && selectedGarment.region === rKey);
                      return (
                        <button
                          key={rKey}
                          type="button"
                          onClick={() => handleSelectRegion(rKey)}
                          className={`relative h-24 rounded-xl overflow-hidden border text-left transition-all group ${
                            isRActive
                              ? 'border-2 border-[#800000] ring-2 ring-[#800000]/25 shadow-md scale-[1.02]'
                              : 'border-stone-200 opacity-80 hover:opacity-100 hover:border-amber-400'
                          }`}
                        >
                          <img
                            src={rData.image}
                            alt={rData.landmark}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.dataset.failed) {
                                target.dataset.failed = 'true';
                                target.src =
                                  rKey === 'bac'
                                    ? 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800'
                                    : rKey === 'trung'
                                    ? 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800'
                                    : 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800';
                              }
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 flex flex-col justify-end text-white">
                            <span className="text-[11px] font-bold text-amber-200 leading-tight">
                              {rData.name}
                            </span>
                            <span className="text-[9px] text-amber-100 truncate mt-0.5 font-medium">
                              {rData.landmark}
                            </span>
                          </div>
                          {isRActive && (
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white shadow-xs"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Thẻ tóm tắt thông tin văn hóa vùng miền đang chọn */}
                  {(() => {
                    const currentRegionKey =
                      activeRegion === 'all' ? selectedGarment.region : activeRegion;
                    const rData = REGIONAL_HERITAGE[currentRegionKey];
                    return (
                      <div className="bg-gradient-to-b from-red-50/70 via-amber-50/40 to-white rounded-2xl border border-amber-300/80 p-3.5 shadow-xs">
                        <div className="flex items-center justify-between mb-1 gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#800000] text-amber-200 px-2.5 py-0.5 rounded-full truncate">
                            {rData.name} · {rData.landmark}
                          </span>
                          <span className="text-[10px] font-semibold text-stone-600 bg-amber-100/90 px-2 py-0.5 rounded shrink-0">
                            {selectedGarment.dynasty}
                          </span>
                        </div>

                        <h3
                          className="font-bold text-sm text-[#800000] mt-1"
                          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                        >
                          {selectedGarment.name}
                        </h3>
                        <p className="text-[11px] text-stone-600 mt-1 leading-relaxed line-clamp-2">
                          {selectedGarment.shortDesc}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-stone-200/80 flex items-center justify-between">
                          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Tiêu biểu: {rData.typicalCostumes}
                          </span>
                          <button
                            onClick={() => setEncyclopediaModalOpen(true)}
                            className="text-[11px] font-bold text-[#800000] hover:text-amber-700 underline"
                          >
                            Xem bách khoa →
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Garment Selector Grid */}
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Danh mục cổ phục tiêu biểu:
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {filteredGarments.length} mẫu trang phục
                  </span>
                </div>

                {/* Danh sách cổ phục: Các ô ngang không có hình */}
                <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto custom-scrollbar pr-1">
                  {filteredGarments.map((item) => {
                    const isSelected = selectedGarment.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectGarment(item)}
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 border ${
                          isSelected
                            ? 'border-2 border-[#800000] bg-red-50/70 shadow-sm'
                            : 'border-stone-200 bg-white hover:border-amber-400 hover:bg-amber-50/40'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className="text-xs font-bold text-[#800000] truncate"
                              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                            >
                              {item.name}
                            </h4>
                            {isSelected && (
                              <span className="bg-[#800000] text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 shadow-xs">
                                Đang chọn
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 truncate mt-0.5">
                            {item.dynasty} · {item.century}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-300/60 block">
                            {item.regionBadge}
                          </span>
                          <span className="text-[10px] font-semibold text-[#800000] mt-1 block">
                            {item.rentPrice.toLocaleString('vi-VN')}đ/ngày
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Museum QR Storytelling Callout linking directly to Wikipedia */}
              <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 border border-amber-300/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&color=800000&data=${encodeURIComponent(
                      selectedGarment.wikipediaUrl
                    )}`}
                    alt={`QR Wikipedia ${selectedGarment.name}`}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg border border-amber-300 bg-white p-1 shrink-0 cursor-pointer hover:scale-105 transition"
                    onClick={() => setQrModalOpen(true)}
                  />
                  <div className="text-[11px] min-w-0">
                    <p className="font-bold text-[#800000] flex items-center gap-1">
                      <span>📲</span> MÃ QR WIKIPEDIA STORYTELLING
                    </p>
                    <p className="text-stone-600 leading-snug mt-0.5 line-clamp-2">
                      Quét mã để mở trực tiếp bài viết Wikipedia về{' '}
                      <strong className="text-[#800000]">{selectedGarment.name}</strong>.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setQrModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#800000] hover:bg-[#5a0000] text-white text-[10px] font-bold shrink-0 transition shadow-xs"
                >
                  Mở QR ↗
                </button>
              </div>
            </section>

            {/* ================= RIGHT COLUMN: PHÒNG THỬ ĐỒ VĂN HÓA ẢO AI ================= */}
            <section className="lg:col-span-7 bento-card p-5 flex flex-col justify-between relative overflow-hidden">
              {/* ================= STEP 1: THIẾT LẬP & TẢI ẢNH ================= */}
              {step === 1 && (
                <div className="flex flex-col h-full justify-between animate-in fade-in duration-200">
                  <div>
                    {/* Header Step 1 */}
                    <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-stone-100">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                          Bước 1 / 3 · Thiết lập 1 chạm
                        </span>
                        <h2
                          className="text-xl font-bold text-[#800000] mt-1"
                          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                        >
                          PHÒNG THỬ ĐỒ VĂN HÓA ẢO AI
                        </h2>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-stone-500 block">Trang phục đang chọn:</span>
                        <span className="text-xs font-bold text-[#800000] bg-red-50 px-3 py-1 rounded-lg border border-red-200 inline-block">
                          {selectedGarment.name} ({selectedGarment.dynasty})
                        </span>
                      </div>
                    </div>

                    {/* 1. Toggle Experience Mode */}
                    <div className="mt-4">
                      <label className="block text-xs font-bold text-stone-700 mb-2">
                        1. Chọn Chế độ Trải nghiệm AI:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setExperienceMode('baoton')}
                          className={`p-3.5 rounded-xl text-left transition flex items-start gap-3 ${
                            experienceMode === 'baoton'
                              ? 'border-2 border-[#800000] bg-red-50/70 shadow-xs'
                              : 'border border-stone-200 bg-white hover:border-amber-400'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 ${
                              experienceMode === 'baoton'
                                ? 'bg-[#800000] text-white'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            🏛️
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-xs font-bold text-[#800000]">Chế độ Bảo tồn</p>
                              <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                                Chuẩn lịch sử 100%
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                              Giữ nguyên 100% phom dáng, nẹp cổ, dải ngũ hành và hoa văn cung đình phục vụ nghiên cứu, học tập.
                            </p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setExperienceMode('sangtao')}
                          className={`p-3.5 rounded-xl text-left transition flex items-start gap-3 ${
                            experienceMode === 'sangtao'
                              ? 'border-2 border-[#800000] bg-red-50/70 shadow-xs'
                              : 'border border-stone-200 bg-white hover:border-amber-400'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 ${
                              experienceMode === 'sangtao'
                                ? 'bg-[#800000] text-white'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            ✨
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-xs font-bold text-[#800000]">
                                Chế độ Trải nghiệm Sáng tạo
                              </p>
                              <span className="text-[9px] font-bold bg-red-100 text-[#800000] px-1.5 py-0.5 rounded">
                                Hợp trend Gen Z
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                              Cách điệu nhẹ nhàng, tôn dáng, tinh chỉnh ánh sáng studio để bạn trẻ tự tin &quot;Flex di sản&quot; lên MXH.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* 2. AI Makeup & Hair Switch */}
                    <div className="mt-3.5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-300/60 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💄</span>
                        <div>
                          <p className="text-xs font-bold text-[#800000]">
                            Tích hợp AI Makeup & Tóc mây chuẩn triều đại
                          </p>
                          <p className="text-[11px] text-stone-600">
                            Tự động phối layout trang điểm cổ phong, tạo kiểu vấn khăn vành / búi tóc mây nhưng vẫn giữ nét mặt tự nhiên.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={aiMakeup}
                        onClick={() => setAiMakeup(!aiMakeup)}
                        className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                          aiMakeup ? 'bg-[#800000]' : 'bg-stone-300'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow transition duration-200 ease-in-out ${
                            aiMakeup ? 'translate-x-6 bg-amber-400' : 'translate-x-0 bg-white'
                          }`}
                        />
                      </button>
                    </div>

                    {/* 3. Image Upload Section */}
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-stone-700">
                          2. Tải ảnh cá nhân (Chân dung / Bán thân):
                        </label>
                        <span className="text-[11px] text-[#800000] font-bold bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300">
                          🎨 Vẽ lại bản vector chuẩn di sản
                        </span>
                      </div>

                      <label className="relative flex flex-col items-center justify-center w-full h-52 rounded-2xl border-2 border-dashed border-amber-400/80 bg-gradient-to-b from-amber-50/30 to-white hover:bg-amber-50/60 transition cursor-pointer overflow-hidden shadow-xs">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />

                        {!uploadedImage ? (
                          <div className="text-center p-6">
                            <div className="w-14 h-14 rounded-full bg-red-50 border-2 border-amber-400 text-[#800000] flex items-center justify-center text-xl mx-auto mb-3 shadow-xs">
                              <Upload className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-bold text-[#800000]">
                              Nhấn để chọn hoặc kéo thả ảnh chân dung của bạn
                            </p>
                            <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                              Hệ thống sẽ đối chiếu tỷ lệ khuôn mặt và phục dựng thành <strong>bản vẽ Vector chuẩn mực</strong> theo từng nếp áo, nẹp cổ của <strong>{selectedGarment.name}</strong>.
                            </p>
                            <span className="inline-block mt-2.5 px-3 py-1 bg-amber-100 text-[#800000] text-[10px] font-bold rounded-full border border-amber-300">
                              Hỗ trợ JPG, PNG, WEBP · Bảo mật RAM 100%
                            </span>
                          </div>
                        ) : (
                          <div className="relative w-full h-full flex items-center justify-center bg-stone-900/5 p-3">
                            <img
                              src={uploadedImage}
                              alt="Ảnh xem trước"
                              referrerPolicy="no-referrer"
                              className="max-h-full max-w-full object-contain rounded-xl shadow"
                            />
                            <div className="absolute top-2.5 right-2.5 flex gap-2">
                              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                                ✓ Đã tải ảnh lên
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  clearUploadedImage();
                                }}
                                className="bg-[#800000] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow hover:bg-red-800 transition"
                              >
                                Đổi ảnh khác
                              </button>
                            </div>
                          </div>
                        )}
                      </label>

                      {/* HTTPS & RAM Privacy Pledge */}
                      <div className="mt-2.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-[11px] text-emerald-900 font-medium">
                        <Shield className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>
                          <strong>Bảo mật HTTPS & RAM:</strong> Ảnh chỉ lưu trên bộ nhớ đệm tạm thời và tự động xóa ngay sau khi tạo kết quả.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={startAiProcessing}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#800000] via-red-800 to-[#520000] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:opacity-95 transition flex items-center justify-center gap-2.5 border border-amber-400"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>TẠO ẢNH CỔ PHỤC NGAY</span>
                      <span className="text-xs font-normal text-amber-200">
                        ({experienceMode === 'baoton' ? 'Chế độ Bảo tồn' : 'Chế độ Sáng tạo'})
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 2: CLOUD AI PROCESSING ================= */}
              {step === 2 && (
                <div className="flex flex-col items-center justify-center h-full min-h-[480px] rounded-2xl bg-gradient-to-b from-[#2b0505] via-[#4a0808] to-[#240303] text-white p-6 relative overflow-hidden animate-in fade-in duration-300">
                  {/* Blurred Backdrop */}
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Background"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl scale-110 pointer-events-none"
                    />
                  )}

                  {/* Central Spinner & Progress */}
                  <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/50 text-amber-200 text-xs font-semibold mb-6">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                      <span>{queueStatusText()}</span>
                    </div>

                    {/* Golden Lotus SVG Animation */}
                    <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                      <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-xl lotus-glow" />
                      <svg viewBox="0 0 120 120" className="w-28 h-28 lotus-spin">
                        <g fill="none" stroke="#DAA520" strokeWidth="2">
                          <path
                            d="M60 10 C72 32, 72 52, 60 60 C48 52, 48 32, 60 10 Z"
                            fill="rgba(218,165,32,0.22)"
                          />
                          <path
                            d="M60 110 C72 88, 72 68, 60 60 C48 68, 48 88, 60 110 Z"
                            fill="rgba(218,165,32,0.22)"
                          />
                          <path
                            d="M10 60 C32 48, 52 48, 60 60 C52 72, 32 72, 10 60 Z"
                            fill="rgba(218,165,32,0.22)"
                          />
                          <path
                            d="M110 60 C88 48, 68 48, 60 60 C68 72, 88 72, 110 60 Z"
                            fill="rgba(218,165,32,0.22)"
                          />
                          <path
                            d="M24 24 C45 32, 55 48, 60 60 C48 55, 32 45, 24 24 Z"
                            fill="rgba(218,165,32,0.35)"
                          />
                          <path
                            d="M96 24 C75 32, 65 48, 60 60 C72 55, 88 45, 96 24 Z"
                            fill="rgba(218,165,32,0.35)"
                          />
                          <path
                            d="M24 96 C45 88, 55 72, 60 60 C48 65, 32 75, 24 96 Z"
                            fill="rgba(218,165,32,0.35)"
                          />
                          <path
                            d="M96 96 C75 88, 65 72, 60 60 C72 65, 88 75, 96 96 Z"
                            fill="rgba(218,165,32,0.35)"
                          />
                          <circle cx="60" cy="60" r="9" fill="#DAA520" />
                        </g>
                      </svg>
                      <span className="absolute font-serif font-bold text-sm text-white drop-shadow">
                        {progress}%
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold text-amber-200 mb-1"
                      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                      Đang ướm thử {selectedGarment.name}...
                    </h3>
                    <p className="text-xs text-stone-200 mb-4">{processingStepDetail()}</p>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/15 h-3 rounded-full overflow-hidden border border-amber-400/40 p-0.5 mb-3">
                      <div
                        className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 h-full rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-emerald-300 font-medium mb-6">
                      🔒 Đang xử lý In-Memory (RAM) · Tự động giải phóng dữ liệu sau khi kết xuất
                    </p>

                    <button
                      type="button"
                      onClick={cancelProcessing}
                      className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/30 transition"
                    >
                      ✕ Hủy bỏ & Quay lại Bước 1
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 3: KẾT QUẢ 4K & AUDIO GUIDE & O2O ================= */}
              {step === 3 && (
                <div className="flex flex-col h-full justify-between animate-in fade-in duration-300">
                  <div>
                    {/* Header Step 3 */}
                    <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-stone-100">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          ✓ Bản Vẽ Vector Chuẩn
                        </span>
                        <h3
                          className="text-lg font-bold text-[#800000]"
                          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                        >
                          {selectedGarment.name} · Bản Vẽ Vector Cổ Phục
                        </h3>
                      </div>

                      {/* View Switcher: Vector Artwork vs Slider vs Single Image */}
                      <div className="flex items-center gap-2">
                        <div className="flex bg-stone-100 rounded-lg p-0.5 text-[11px]">
                          <button
                            onClick={() => setViewMode('artwork')}
                            className={`px-2.5 py-1 rounded-md font-semibold transition flex items-center gap-1 ${
                              viewMode === 'artwork'
                                ? 'bg-white text-[#800000] shadow-xs'
                                : 'text-stone-600'
                            }`}
                          >
                            <Palette className="w-3 h-3 text-amber-600" />
                            <span>Bản Vẽ Vector (Chuẩn Di Sản)</span>
                          </button>
                          <button
                            onClick={() => setViewMode('slider')}
                            className={`px-2.5 py-1 rounded-md font-semibold transition flex items-center gap-1 ${
                              viewMode === 'slider'
                                ? 'bg-white text-[#800000] shadow-xs'
                                : 'text-stone-600'
                            }`}
                          >
                            <Sliders className="w-3 h-3" />
                            <span>So sánh Trước/Sau</span>
                          </button>
                          <button
                            onClick={() => setViewMode('single')}
                            className={`px-2.5 py-1 rounded-md font-semibold transition flex items-center gap-1 ${
                              viewMode === 'single'
                                ? 'bg-white text-[#800000] shadow-xs'
                                : 'text-stone-600'
                            }`}
                          >
                            <Eye className="w-3 h-3" />
                            <span>Ảnh Tư Liệu Phục Chế</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Result Display Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 mt-3">
                      {/* Interactive Visual Window */}
                      <div className="md:col-span-8">
                        {viewMode === 'artwork' ? (
                          <div className="relative h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden bg-[#140404] border-2 border-amber-400 shadow-xl flex flex-col justify-between p-3.5">
                            {/* Top Bar inside Vector Stage */}
                            <div className="flex flex-wrap items-center justify-between gap-2 z-10">
                              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/50">
                                {uploadedImage && (
                                  <img
                                    src={uploadedImage}
                                    alt="Ảnh của bạn"
                                    className="w-5 h-5 rounded-full object-cover border border-amber-300"
                                  />
                                )}
                                <span className="text-[10px] font-bold text-amber-200">
                                  Bản vẽ Vector phục dựng: {selectedGarment.name}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={downloadSvgArtwork}
                                  className="bg-amber-400 hover:bg-amber-300 text-stone-900 text-[10px] font-extrabold px-3 py-1 rounded-lg shadow flex items-center gap-1.5 transition"
                                  title="Tải về tệp Vector SVG chuẩn"
                                >
                                  <Download className="w-3.5 h-3.5 text-stone-900" />
                                  <span>Tải Vector SVG</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEncyclopediaModalOpen(true)}
                                  className="bg-white/90 hover:bg-white text-[#800000] text-[10px] font-bold px-2.5 py-1 rounded-lg shadow transition flex items-center gap-1"
                                >
                                  <BookOpen className="w-3 h-3" />
                                  <span>Chi tiết Cổ phục →</span>
                                </button>
                              </div>
                            </div>

                            {/* Centered Vector Artwork with User's Face */}
                            <div className="flex-1 flex items-center justify-center p-2 min-h-0">
                              <GarmentArtwork
                                id="current-garment-svg"
                                garmentId={selectedGarment.id}
                                userImage={uploadedImage}
                                className="max-h-full max-w-full drop-shadow-2xl"
                                showDetails={true}
                              />
                            </div>

                            {/* Bottom Details Footer */}
                            <div className="z-10 flex flex-wrap items-center justify-between gap-2 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 text-white">
                              <div className="text-[10px]">
                                <span className="text-amber-300 font-bold uppercase">{selectedGarment.dynasty}</span>
                                <span className="mx-1 text-stone-400">·</span>
                                <span className="text-stone-300">{selectedGarment.century}</span>
                                <span className="mx-1 text-stone-400">·</span>
                                <span className="text-emerald-300 font-semibold">Tỷ lệ nẹp cổ & nếp gấp chuẩn 100% di sản</span>
                              </div>
                              <span className="text-[10px] font-mono text-amber-200/90">
                                Vector SVG · Chuẩn Lịch Sử
                              </span>
                            </div>
                          </div>
                        ) : viewMode === 'slider' && uploadedImage ? (
                          <BeforeAfterSlider
                            originalImage={uploadedImage}
                            resultImage={currentVariantImage()}
                            garmentName={selectedGarment.name}
                            modeLabel={
                              experienceMode === 'baoton' ? 'Bản Bảo Tồn' : 'Bản Sáng Tạo'
                            }
                          />
                        ) : (
                          <div className="relative h-72 sm:h-84 md:h-96 rounded-2xl overflow-hidden bg-stone-900 border-2 border-amber-400 shadow-md group">
                            <img
                              src={currentVariantImage()}
                              alt="Kết quả 4K"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition duration-500"
                            />
                            <div className="absolute top-3 left-3 flex gap-1.5">
                              <span className="bg-[#800000]/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/40">
                                4K Ultra HD
                              </span>
                              {aiMakeup && (
                                <span className="bg-black/70 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                                  💄 AI Makeup & Tóc mây
                                </span>
                              )}
                            </div>
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3 text-white flex justify-between items-end">
                              <div>
                                <p className="text-xs font-bold text-amber-200">
                                  {selectedGarment.variants[activeVariantIndex]?.label}
                                </p>
                                <p className="text-[10px] text-stone-300">
                                  {selectedGarment.dynasty} · Tỷ lệ nếp gấp chuẩn cung đình
                                </p>
                              </div>
                              <button
                                onClick={() => setQrModalOpen(true)}
                                className="bg-white/90 text-[#800000] text-[10px] font-bold px-2.5 py-1 rounded-lg shadow hover:bg-white transition"
                              >
                                📲 Mã QR Di Sản
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Control Strip: 3 Variants + Audio Guide */}
                      <div className="md:col-span-4 flex flex-col justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-bold text-stone-700 mb-1.5 uppercase">
                            Chọn biến thể bối cảnh:
                          </p>
                          <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
                            {selectedGarment.variants.map((v, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => setActiveVariantIndex(index)}
                                className={`p-1.5 rounded-xl flex items-center gap-2.5 text-left transition ${
                                  activeVariantIndex === index
                                    ? 'border-2 border-[#800000] bg-red-50 shadow-xs'
                                    : 'border border-stone-200 bg-white opacity-80 hover:opacity-100 hover:border-amber-300'
                                }`}
                              >
                                <img
                                  src={v.img}
                                  alt={v.label}
                                  referrerPolicy="no-referrer"
                                  className="w-11 h-11 rounded-lg object-cover shrink-0 border border-amber-300"
                                />
                                <div className="overflow-hidden">
                                  <p className="text-[11px] font-bold text-[#800000] truncate">
                                    Biến thể {index + 1}
                                  </p>
                                  <p className="text-[10px] text-stone-500 truncate">{v.label}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Audio Guide Player */}
                        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#800000] to-[#520000] text-white border border-amber-400 shadow">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                              <Volume2 className="w-3 h-3" />
                              Audio Guide Lịch Sử
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] text-amber-200">
                              <button
                                onClick={() =>
                                  setSpeechRate((r) => (r === 1.0 ? 1.25 : 1.0))
                                }
                                className="bg-white/10 hover:bg-white/20 px-1.5 py-0.5 rounded text-[9px] font-mono"
                              >
                                {speechRate}x
                              </button>
                              <span>{audioPlaying ? 'Đang đọc...' : '01:45'}</span>
                            </div>
                          </div>

                          <p className="text-[11px] text-amber-50/90 leading-snug line-clamp-2 mb-3">
                            {selectedGarment.audioScript}
                          </p>

                          <div className="flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={toggleAudioGuide}
                              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-[11px] transition flex items-center gap-1.5 shadow"
                            >
                              {audioPlaying ? (
                                <>
                                  <VolumeX className="w-3.5 h-3.5" />
                                  <span>Tạm dừng</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>Nghe thuyết minh</span>
                                </>
                              )}
                            </button>

                            {/* Soundwave Bars */}
                            <div className="flex items-center gap-1 h-5 pr-1">
                              <span
                                className={`w-1 bg-amber-400 rounded-full transition-all ${
                                  audioPlaying ? 'wave-bar' : 'h-1.5'
                                }`}
                              />
                              <span
                                className={`w-1 bg-amber-400 rounded-full transition-all ${
                                  audioPlaying ? 'wave-bar' : 'h-2.5'
                                }`}
                                style={{ animationDelay: '0.15s' }}
                              />
                              <span
                                className={`w-1 bg-amber-400 rounded-full transition-all ${
                                  audioPlaying ? 'wave-bar' : 'h-1'
                                }`}
                                style={{ animationDelay: '0.3s' }}
                              />
                              <span
                                className={`w-1 bg-amber-400 rounded-full transition-all ${
                                  audioPlaying ? 'wave-bar' : 'h-3'
                                }`}
                                style={{ animationDelay: '0.45s' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3 Step 3 Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                    {/* Action 1: Save 4K Image */}
                    <button
                      type="button"
                      onClick={handleDownload4K}
                      className="sm:col-span-4 py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#800000] font-bold text-xs border border-amber-400 transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Lưu ảnh 4K / Chia sẻ MXH</span>
                    </button>

                    {/* Action 2: Change Costume / Retry */}
                    <button
                      type="button"
                      onClick={() => {
                        stopAudio();
                        setStep(1);
                      }}
                      className="sm:col-span-3 py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Đổi trang phục</span>
                    </button>

                    {/* Action 3: Rent / Buy on Shopify O2O */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="sm:col-span-5 py-3 px-4 rounded-xl bg-gradient-to-r from-[#800000] to-[#520000] hover:opacity-95 text-white font-bold text-xs shadow-lg border border-amber-400 transition flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4 text-amber-300" />
                      <span>Thuê / Mua đồ thật (Shopify API)</span>
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="mt-6 pt-4 border-t border-stone-200 text-stone-500 text-xs flex flex-wrap justify-between items-center gap-3">
        <p>
          © 2026 Việt Sắc · Dự án Bảo Tồn & Số Hóa Cổ Phục Việt Nam qua Trí Tuệ Nhân Tạo & O2O Commerce.
        </p>
        <div className="flex items-center gap-4 text-[11px]">
          <button
            onClick={() => setAdvisorModalOpen(true)}
            className="hover:text-[#800000] transition"
          >
            Quy chế trang phục
          </button>
          <span>·</span>
          <button
            onClick={() => setEncyclopediaModalOpen(true)}
            className="hover:text-[#800000] transition"
          >
            Tư liệu lịch sử
          </button>
          <span>·</span>
          <span className="text-emerald-700 font-semibold">Storefront O2O Sẵn sàng</span>
        </div>
      </footer>

      {/* ================= MODALS & DRAWERS ================= */}
      <EncyclopediaModal
        garment={selectedGarment}
        isOpen={encyclopediaModalOpen}
        onClose={() => setEncyclopediaModalOpen(false)}
        onSelectForTryOn={(g) => {
          handleSelectGarment(g);
          setStep(1);
        }}
      />

      <QrModal
        garment={selectedGarment}
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        onToast={showToast}
      />

      <CulturalAdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
        selectedGarment={selectedGarment}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateCartItem={handleUpdateCartItem}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cart={cart}
        discountAmount={checkoutDiscount}
        promoCode={checkoutPromo}
        onCompleteOrder={handleCompleteOrder}
      />
    </div>
  );
}
