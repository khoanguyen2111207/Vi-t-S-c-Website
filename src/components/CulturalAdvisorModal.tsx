import React, { useState } from 'react';
import { X, Send, Sparkles, Compass } from 'lucide-react';
import { Garment } from '../data/garments';

interface CulturalAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGarment: Garment;
}

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

const PRESET_QUESTIONS = [
  'Điểm khác biệt mấu chốt giữa Áo Nhật Bình và Áo Tấc?',
  'Khăn vành dây quấn bao nhiêu vòng là chuẩn cung đình Huế?',
  'Áo Giao Lĩnh vạt trái hay vạt phải đè lên nhau?',
  'Nam giới thời Nguyễn mặc Áo Tấc trong dịp nào?',
  'Chất liệu Lãnh Mỹ A của áo Ngũ Thân Nam Bộ có gì đặc biệt?'
];

const KNOWLEDGE_BASE: Record<string, string> = {
  nhatbinh_aotac:
    'Áo Nhật Bình là dạng áo đối khâm (xẻ giữa), có nẹp cổ hình chữ nhật to bản trước ngực, là trang phục của nữ giới quý tộc (Hoàng hậu, phi tần, công chúa). Trong khi đó, Áo Tấc là dạng áo ngũ thân lập lĩnh (cổ đứng cài 5 cúc bên phải), có tay áo thụng rộng một tấc, dùng làm đại lễ phục cho cả nam và nữ.',
  khanvanh:
    'Theo quy chế triều Nguyễn, khăn vành dây quấn từ trong ra ngoài. Đối với Hoàng hậu là khăn vành bằng lụa vàng kim quấn nhiều vòng (khoảng 30-50 vòng tạo thành hình nón cụt đều đặn). Công chúa dùng khăn màu lam hoặc lục quấn ít vòng hơn (khoảng 20-30 vòng). Nếp khăn phải phẳng phiu, mép sau cao hơn mép trước.',
  giaolinh:
    'Theo quy chuẩn truyền thống Thăng Long Đại Việt, Áo Giao Lĩnh luôn có vạt bên trái đè lên vạt bên phải (gọi là "Tả nhẫm"), cài dây buộc bên sườn phải. Điều này thể hiện tư duy dương khí thuận thiên, khác biệt hoàn toàn với cách cài vạt ngược của người phương Bắc thời xưa.',
  aotac_nam:
    'Nam giới thời Nguyễn mặc Áo Tấc trong tất cả các đại lễ: tế Nam Giao, bái yết tổ tiên, lễ Tịch điền, đám cưới rước dâu và khi thi đỗ cử nhân, tiến sĩ. Áo Tấc nam thường đi kèm khăn đóng chữ Nhân (人) hoặc chữ Nhất (一), tạo phong thái mực thước, đoan chính.',
  lanh_my_a:
    'Lãnh Mỹ A là "nữ hoàng của các loại lụa", đặc sản độc nhất vô nhị của xứ Tân Châu - An Giang. Vải được dệt từ 100% tơ tằm thượng hạng, sau đó nhuộm bằng mủ trái mặc nưa tự nhiên suốt hàng trăm lần, phơi nắng phơi sương tạo nên màu đen tuyền bóng mượt như da thuộc, mùa hè mát lạnh, mùa đông ấm áp và càng giặt càng óng ả.'
};

export const CulturalAdvisorModal: React.FC<CulturalAdvisorModalProps> = ({
  isOpen,
  onClose,
  selectedGarment,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: `Chào bạn! Tôi là Cố Vấn Di Sản Số Việt Sắc. Bạn có thể hỏi bất kỳ câu hỏi nào về quy chuẩn trang phục, hoa văn, hoặc bối cảnh lịch sử của ${selectedGarment.name} và các triều đại Việt Nam.`
    }
  ]);
  const [inputVal, setInputVal] = useState<string>('');

  if (!isOpen) return null;

  const handleAsk = (query: string) => {
    const q = query.trim();
    if (!q) return;

    const newMessages: Message[] = [...messages, { role: 'user', text: q }];
    setMessages(newMessages);
    setInputVal('');

    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('nhật bình') && lower.includes('áo tấc')) {
        reply = KNOWLEDGE_BASE.nhatbinh_aotac;
      } else if (lower.includes('khăn vành')) {
        reply = KNOWLEDGE_BASE.khanvanh;
      } else if (lower.includes('giao lĩnh') || lower.includes('vạt')) {
        reply = KNOWLEDGE_BASE.giaolinh;
      } else if (lower.includes('nam') && (lower.includes('áo tấc') || lower.includes('ngũ thân'))) {
        reply = KNOWLEDGE_BASE.aotac_nam;
      } else if (lower.includes('lãnh mỹ a') || lower.includes('tân châu') || lower.includes('nam bộ')) {
        reply = KNOWLEDGE_BASE.lanh_my_a;
      } else {
        reply = `Về thắc mắc "${q}": Trang phục ${selectedGarment.name} thuộc ${selectedGarment.dynasty} (${selectedGarment.century}), mang đậm tính dân tộc với ${selectedGarment.structure}. Để mặc chuẩn chỉnh nhất, quý khách nên phối cùng ${selectedGarment.accessories}. Cố vấn văn hóa Việt Sắc luôn sẵn sàng giải đáp thêm các câu hỏi chuyên sâu!`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FDFBF7] max-w-lg w-full rounded-2xl border-2 border-amber-500/80 shadow-2xl overflow-hidden flex flex-col h-[520px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#800000] text-white px-5 py-3.5 flex justify-between items-center border-b border-amber-400/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300 flex items-center justify-center text-amber-300">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white leading-tight">
                CỐ VẤN DI SẢN SỐ VIỆT SẮC
              </h3>
              <p className="text-[10px] text-amber-200">
                Hỏi đáp chuẩn xác về lịch sử & quy chế trang phục Việt
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset suggestions */}
        <div className="p-3 bg-amber-50/60 border-b border-stone-200 overflow-x-auto custom-scrollbar flex gap-1.5 whitespace-nowrap">
          {PRESET_QUESTIONS.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(pq)}
              className="text-[11px] bg-white border border-amber-300 hover:border-[#800000] text-stone-700 px-2.5 py-1 rounded-full shadow-xs transition"
            >
              {pq}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-3 text-xs leading-relaxed">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                  m.role === 'user'
                    ? 'bg-[#800000] text-white shadow-sm'
                    : 'bg-white text-stone-800 border border-stone-200 shadow-sm'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Cố Vấn Di Sản</span>
                  </div>
                )}
                <p>{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-stone-200 flex gap-2">
          <input
            type="text"
            placeholder="Hỏi về nếp áo, hoa văn, quy chế..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk(inputVal)}
            className="flex-1 px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#800000]"
          />
          <button
            onClick={() => handleAsk(inputVal)}
            className="px-4 py-2 bg-[#800000] hover:bg-[#5a0000] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Gửi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
