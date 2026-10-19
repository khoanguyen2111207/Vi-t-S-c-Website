import React, { useState } from 'react';
import { CartItem } from '../data/garments';
import { X, Trash2, ShoppingBag, Tag, ShieldCheck, ChevronRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateCartItem: (index: number, updated: CartItem) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (discountAmount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateCartItem,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => {
    const unitPrice = item.orderType === 'rent' ? item.rentPrice * (item.days || 1) : item.buyPrice;
    return sum + unitPrice * item.quantity;
  }, 0);

  const finalTotal = Math.max(0, subtotal - promoDiscount);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'VIETSAC10' || code === 'DISAN2026') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedPromo(code);
      setPromoDiscount(discount);
    } else {
      setPromoError('Mã ưu đãi không hợp lệ. Hãy thử: VIETSAC10');
    }
  };

  const formatVND = (amount: number) => {
    return amount.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FDFBF7] w-full max-w-md h-full shadow-2xl border-l-2 border-amber-500/70 flex flex-col justify-between p-5 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-amber-200/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
                  Shopify Storefront API Connected
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#800000] mt-1">
                GIỎ HÀNG CỔ PHỤC O2O
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Đóng giỏ hàng"
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="mt-4 space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-xs">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                <p className="font-semibold text-stone-700">Giỏ hàng của bạn đang trống</p>
                <p className="mt-1 text-stone-500">
                  Hãy thử cổ phục bằng AI và bấm &quot;Thuê / Mua đồ thật&quot; để trải nghiệm trang phục may đo thực tế!
                </p>
              </div>
            ) : (
              cart.map((cItem, idx) => (
                <div
                  key={`${cItem.id}-${idx}`}
                  className="bg-white p-3.5 rounded-xl border border-amber-200/90 shadow-sm flex gap-3 items-start"
                >
                  <img
                    src={cItem.image}
                    alt={cItem.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 rounded-lg object-cover border border-amber-400 shrink-0 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <p className="text-xs font-bold text-[#800000] truncate">{cItem.name}</p>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-stone-400 hover:text-red-600 transition"
                        title="Xóa món này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-stone-500 truncate mt-0.5">{cItem.modeLabel}</p>

                    {/* Rent vs Buy Switch */}
                    <div className="flex gap-1.5 mt-2">
                      <button
                        onClick={() => onUpdateCartItem(idx, { ...cItem, orderType: 'rent' })}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                          cItem.orderType === 'rent'
                            ? 'bg-[#800000] text-white shadow-sm'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        Thuê: {formatVND(cItem.rentPrice)}/ngày
                      </button>
                      <button
                        onClick={() => onUpdateCartItem(idx, { ...cItem, orderType: 'buy' })}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                          cItem.orderType === 'buy'
                            ? 'bg-[#800000] text-white shadow-sm'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        Mua: {formatVND(cItem.buyPrice)}
                      </button>
                    </div>

                    {/* Size and Quantity options */}
                    <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-stone-100 text-[10px]">
                      <div className="flex items-center gap-1">
                        <span className="text-stone-500">Size:</span>
                        <select
                          value={cItem.size || 'M'}
                          onChange={(e) =>
                            onUpdateCartItem(idx, {
                              ...cItem,
                              size: e.target.value as CartItem['size'],
                            })
                          }
                          className="bg-stone-50 border border-stone-200 rounded px-1.5 py-0.5 text-stone-700 font-semibold text-[10px]"
                        >
                          <option value="S">S (1m50 - 1m58)</option>
                          <option value="M">M (1m58 - 1m68)</option>
                          <option value="L">L (1m68 - 1m75)</option>
                          <option value="XL">XL (1m75+)</option>
                          <option value="Custom">May đo riêng</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5 font-bold text-stone-700">
                        <span>Số lượng:</span>
                        <button
                          onClick={() =>
                            onUpdateCartItem(idx, {
                              ...cItem,
                              quantity: Math.max(1, cItem.quantity - 1),
                            })
                          }
                          className="w-5 h-5 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs"
                        >
                          -
                        </button>
                        <span>{cItem.quantity}</span>
                        <button
                          onClick={() =>
                            onUpdateCartItem(idx, {
                              ...cItem,
                              quantity: cItem.quantity + 1,
                            })
                          }
                          className="w-5 h-5 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Checkout & Voucher Section */}
        <div className="pt-4 border-t border-amber-200 space-y-3">
          {/* Promo code input */}
          {cart.length > 0 && (
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Mã ưu đãi (VD: VIETSAC10)"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:outline-none focus:border-[#800000]"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition"
                >
                  Áp dụng
                </button>
              </div>
              {appliedPromo && (
                <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                  ✓ Đã áp dụng mã {appliedPromo} (-10% tổng hóa đơn)
                </p>
              )}
              {promoError && (
                <p className="text-[10px] text-red-600 font-semibold mt-1">{promoError}</p>
              )}
            </div>
          )}

          {/* O2O Policy Callout */}
          <div className="bg-amber-50/90 p-3 rounded-xl border border-amber-300/60 text-[11px] text-stone-700 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#800000] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#800000]">Đặc quyền O2O Việt Sắc:</p>
              <p className="leading-snug">
                Miễn phí xuất ảnh 4K không watermark, hướng dẫn mặc chuẩn cung đình tận nhà & miễn cọc khi đặt qua app.
              </p>
            </div>
          </div>

          {/* Price Calculation */}
          <div className="space-y-1 text-xs">
            {promoDiscount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Giảm giá khuyến mại:</span>
                <span>-{formatVND(promoDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm font-bold pt-1 border-t border-stone-200">
              <span className="text-stone-700">Tổng thanh toán tạm tính:</span>
              <span className="text-lg text-[#800000]">{formatVND(finalTotal)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            type="button"
            onClick={() => onProceedToCheckout(promoDiscount, appliedPromo || '')}
            disabled={cart.length === 0}
            className={`w-full py-3.5 rounded-xl bg-gradient-to-r from-[#800000] to-[#5a0000] text-white font-bold text-xs tracking-wide shadow-lg border border-amber-400 transition flex items-center justify-center gap-2 ${
              cart.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-95'
            }`}
          >
            <span>ĐẶT LỊCH THỬ / MAY ĐO QUA SHOPIFY</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
