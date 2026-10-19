import React, { useState } from 'react';
import { CartItem } from '../data/garments';
import { X, CheckCircle, CreditCard, Smartphone, Building, QrCode } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discountAmount: number;
  promoCode: string;
  onCompleteOrder: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  discountAmount,
  promoCode,
  onCompleteOrder,
}) => {
  const [customerName, setCustomerName] = useState<string>('Nguyễn Khoa');
  const [phoneNumber, setPhoneNumber] = useState<string>('0912 345 678');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Quận 1, TP. Hồ Chí Minh');
  const [rentalDate, setRentalDate] = useState<string>('2026-10-25');
  const [paymentMethod, setPaymentMethod] = useState<'vnpay' | 'momo' | 'bank' | 'cod'>('vnpay');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [orderCode, setOrderCode] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => {
    const unitPrice = item.orderType === 'rent' ? item.rentPrice * (item.days || 1) : item.buyPrice;
    return sum + unitPrice * item.quantity;
  }, 0);

  const finalAmount = Math.max(0, subtotal - discountAmount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'VS-' + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(randomCode);
    setIsSuccess(true);
  };

  const handleFinish = () => {
    onCompleteOrder();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FDFBF7] max-w-lg w-full rounded-2xl border-2 border-amber-500/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="bg-[#800000] text-white px-5 py-4 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                  Thanh toán O2O Cung Đình
                </span>
                <h3 className="font-serif text-lg font-bold text-white">Xác nhận Thuê / May Đo Cổ Phục</h3>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitOrder} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Họ tên người nhận:</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#800000] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Số điện thoại:</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#800000] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Địa chỉ nhận đồ / Thử trực tiếp:</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#800000] bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Ngày bắt đầu mặc / nhận đồ:</label>
                <input
                  type="date"
                  required
                  value={rentalDate}
                  onChange={(e) => setRentalDate(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#800000] bg-white"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-stone-700 font-semibold mb-1.5">Phương thức thanh toán:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vnpay')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                      paymentMethod === 'vnpay'
                        ? 'border-[#800000] bg-red-50 text-[#800000] font-bold'
                        : 'border-stone-200 bg-white text-stone-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 shrink-0 text-[#800000]" />
                    <span>VNPay QR / ATM</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                      paymentMethod === 'momo'
                        ? 'border-[#800000] bg-red-50 text-[#800000] font-bold'
                        : 'border-stone-200 bg-white text-stone-600'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 shrink-0 text-pink-600" />
                    <span>Ví MoMo / ZaloPay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                      paymentMethod === 'bank'
                        ? 'border-[#800000] bg-red-50 text-[#800000] font-bold'
                        : 'border-stone-200 bg-white text-stone-600'
                    }`}
                  >
                    <Building className="w-4 h-4 shrink-0 text-amber-700" />
                    <span>Chuyển khoản VietQR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                      paymentMethod === 'cod'
                        ? 'border-[#800000] bg-red-50 text-[#800000] font-bold'
                        : 'border-stone-200 bg-white text-stone-600'
                    }`}
                  >
                    <QrCode className="w-4 h-4 shrink-0 text-emerald-700" />
                    <span>Thanh toán khi thử đồ</span>
                  </button>
                </div>
              </div>

              {/* Summary box */}
              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-300 text-stone-700 space-y-1">
                <div className="flex justify-between">
                  <span>Số lượng trang phục:</span>
                  <span className="font-bold">{cart.length} bộ</span>
                </div>
                {promoCode && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Mã {promoCode}:</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm font-bold text-[#800000] pt-1 border-t border-amber-200">
                  <span>Tổng cần thanh toán:</span>
                  <span>{finalAmount.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#800000] to-[#5a0000] text-white font-bold text-xs tracking-wider shadow hover:opacity-95 transition"
              >
                XÁC NHẬN ĐẶT HÀNG NGAY
              </button>
            </form>
          </div>
        ) : (
          /* Order Success State */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Đặt đơn thành công
              </span>
              <h3 className="font-serif text-xl font-bold text-[#800000] mt-2">
                Cảm ơn bạn đã đồng hành cùng Cổ Phục Việt!
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Mã đơn hàng O2O của bạn: <strong className="text-stone-900 font-mono text-sm">{orderCode}</strong>
              </p>
            </div>

            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-left text-xs text-stone-700 space-y-1">
              <p>👤 <strong>Khách hàng:</strong> {customerName} - {phoneNumber}</p>
              <p>📍 <strong>Giao tới:</strong> {deliveryAddress}</p>
              <p>🗓 <strong>Thời gian:</strong> {rentalDate}</p>
              <p>💰 <strong>Tổng tiền:</strong> {finalAmount.toLocaleString('vi-VN')}đ ({paymentMethod.toUpperCase()})</p>
              <p className="text-emerald-700 font-semibold pt-1">
                ✓ Nhân viên Việt Sắc sẽ liên hệ trong 15 phút để lấy số đo và chuẩn bị phụ kiện khăn vành / trâm cài.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-2.5 rounded-xl bg-[#800000] text-white font-bold text-xs hover:bg-[#5a0000] transition"
            >
              Tiếp tục khám phá cổ phục
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
