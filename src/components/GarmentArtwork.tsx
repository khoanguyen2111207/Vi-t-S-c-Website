import React from 'react';

interface GarmentArtworkProps {
  garmentId: string;
  className?: string;
  showDetails?: boolean;
  id?: string;
  userImage?: string | null;
}

/**
 * Museum-grade vector artwork representing the precise historical anatomy,
 * embroidered collars, sleeves, and accessories of Vietnamese cổ phục.
 */
export const GarmentArtwork: React.FC<GarmentArtworkProps> = ({
  garmentId,
  className = 'w-full h-full',
  showDetails = true,
  id,
  userImage,
}) => {
  switch (garmentId) {
    case 'nhat-binh':
      return (
        <svg id={id} viewBox="0 0 400 500" className={className} aria-label="Hình minh họa Áo Nhật Bình Cung Đình Huế">
          <defs>
            <linearGradient id="nbCrimson" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="50%" stopColor="#800000" />
              <stop offset="100%" stopColor="#4A0404" />
            </linearGradient>
            <linearGradient id="nbGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="50%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
            <linearGradient id="bgHue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A0808" />
              <stop offset="100%" stopColor="#140202" />
            </linearGradient>
            {userImage && (
              <clipPath id="nbUserFaceClip">
                <ellipse cx="200" cy="115" rx="22" ry="26" />
              </clipPath>
            )}
          </defs>

          {/* Background */}
          <rect width="400" height="500" fill="url(#bgHue)" rx="16" />

          {/* Hue Palace Arch Silhouette */}
          <path d="M 50,500 L 50,160 Q 200,60 350,160 L 350,500 Z" fill="#380909" opacity="0.6" />

          {/* Khăn vành dây quấn nhiều vòng trên đầu */}
          <g transform="translate(200, 75)">
            <ellipse cx="0" cy="0" rx="46" ry="16" fill="url(#nbGold)" stroke="#996515" strokeWidth="2" />
            <ellipse cx="0" cy="-4" rx="44" ry="14" fill="#DAA520" stroke="#7A4E0B" strokeWidth="1" />
            <ellipse cx="0" cy="-8" rx="41" ry="13" fill="url(#nbGold)" />
            <ellipse cx="0" cy="-12" rx="38" ry="12" fill="#DAA520" />
            <ellipse cx="0" cy="-16" rx="34" ry="11" fill="url(#nbGold)" />
            {/* Trâm ngọc cài đầu */}
            <circle cx="0" cy="-22" r="5" fill="#E0F2FE" stroke="#DAA520" strokeWidth="1.5" />
          </g>

          {/* Cổ và gương mặt */}
          {userImage ? (
            <image
              href={userImage}
              x="176"
              y="87"
              width="48"
              height="56"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#nbUserFaceClip)"
            />
          ) : (
            <ellipse cx="200" cy="115" rx="22" ry="26" fill="#FDF4EA" />
          )}
          <path d="M 190,135 L 190,160 L 210,160 L 210,135 Z" fill="#FCEAD4" />

          {/* Thân Áo Nhật Bình (Đỏ đô hoàng gia) */}
          <path
            d="M 160,165 
               C 130,175 80,210 20,290 
               L 45,340 
               C 90,290 125,270 145,265 
               L 145,490 
               L 255,490 
               L 255,265 
               C 275,270 310,290 355,340 
               L 380,290 
               C 320,210 270,175 240,165 
               Z"
            fill="url(#nbCrimson)"
            stroke="#DAA520"
            strokeWidth="1.5"
          />

          {/* Dải Ngũ Hành ở tay áo (Lục, Hoàng, Lam, Bạch, Xích) */}
          <g>
            {/* Tay trái */}
            <path d="M 20,290 L 45,340 L 60,325 L 35,275 Z" fill="#15803D" />
            <path d="M 35,275 L 60,325 L 75,310 L 50,260 Z" fill="#EAB308" />
            <path d="M 50,260 L 75,310 L 90,295 L 65,245 Z" fill="#2563EB" />
            <path d="M 65,245 L 90,295 L 105,280 L 80,230 Z" fill="#F8FAFC" />
            <path d="M 80,230 L 105,280 L 120,265 L 95,215 Z" fill="#DC2626" />

            {/* Tay phải */}
            <path d="M 380,290 L 355,340 L 340,325 L 365,275 Z" fill="#15803D" />
            <path d="M 365,275 L 340,325 L 325,310 L 350,260 Z" fill="#EAB308" />
            <path d="M 350,260 L 325,310 L 310,295 L 335,245 Z" fill="#2563EB" />
            <path d="M 335,245 L 310,295 L 295,280 L 320,230 Z" fill="#F8FAFC" />
            <path d="M 320,230 L 295,280 L 280,265 L 305,215 Z" fill="#DC2626" />
          </g>

          {/* NẸP CỔ CHỮ NHẬT ĐỐI XỨNG ĐẶC TRƯNG CỦA NHẬT BÌNH */}
          <g>
            <path
              d="M 160,165 
                 L 160,330 
                 L 240,330 
                 L 240,165 
                 L 218,165 
                 L 218,310 
                 L 182,310 
                 L 182,165 
                 Z"
              fill="url(#nbGold)"
              stroke="#7A4E0B"
              strokeWidth="1.5"
            />
            {/* Hoa văn loan phượng & sóng thủy ba trên nẹp cổ */}
            <line x1="200" y1="170" x2="200" y2="490" stroke="#DAA520" strokeWidth="2" strokeDasharray="6,4" />
            <circle cx="200" cy="190" r="5" fill="#DAA520" stroke="#FFF" strokeWidth="1" />
            <circle cx="200" cy="230" r="5" fill="#DAA520" stroke="#FFF" strokeWidth="1" />
            <circle cx="200" cy="270" r="5" fill="#DAA520" stroke="#FFF" strokeWidth="1" />
            <circle cx="200" cy="310" r="5" fill="#DAA520" stroke="#FFF" strokeWidth="1" />
          </g>

          {/* Dải Bội Ngọc Cung Đình buông dài */}
          <path d="M 195,330 L 195,460 L 205,460 L 205,330 Z" fill="#34D399" opacity="0.85" />
          <circle cx="200" cy="465" r="8" fill="#FCD34D" stroke="#7A4E0B" strokeWidth="1.5" />

          {/* Nhãn đặc trưng nếu bật showDetails */}
          {showDetails && (
            <g transform="translate(20, 30)">
              <rect width="130" height="24" rx="6" fill="rgba(218, 165, 32, 0.9)" />
              <text x="65" y="16" fill="#4A0404" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                NẸP CỔ CHỮ NHẬT
              </text>
            </g>
          )}
        </svg>
      );

    case 'ao-tac':
      return (
        <svg id={id} viewBox="0 0 400 500" className={className} aria-label="Hình minh họa Áo Tấc Ngũ Thân Tay Thụng">
          <defs>
            <linearGradient id="tacPlum" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6B1D28" />
              <stop offset="60%" stopColor="#4A0E17" />
              <stop offset="100%" stopColor="#25050A" />
            </linearGradient>
            <linearGradient id="tacGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            {userImage && (
              <clipPath id="tacUserFaceClip">
                <ellipse cx="200" cy="120" rx="20" ry="24" />
              </clipPath>
            )}
          </defs>

          {/* Nền cổ kính */}
          <rect width="400" height="500" fill="#1C0A0E" rx="16" />

          {/* Khăn Đóng (Khăn xếp) truyền thống */}
          <g transform="translate(200, 85)">
            <ellipse cx="0" cy="0" rx="36" ry="14" fill="#0A0A0A" stroke="#DAA520" strokeWidth="1.5" />
            <ellipse cx="0" cy="-6" rx="34" ry="12" fill="#262626" />
            <path d="M -8,-2 L 0,-12 L 8,-2" stroke="#DAA520" strokeWidth="1.5" fill="none" />
          </g>

          {/* Khuôn mặt */}
          {userImage ? (
            <image
              href={userImage}
              x="178"
              y="94"
              width="44"
              height="52"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#tacUserFaceClip)"
            />
          ) : (
            <ellipse cx="200" cy="120" rx="20" ry="24" fill="#FDF4EA" />
          )}

          {/* Cổ Lập Lĩnh (Cổ đứng cao 2cm trang nghiêm) */}
          <path d="M 188,144 C 188,138 212,138 212,144 L 214,162 L 186,162 Z" fill="#FDFBF7" stroke="#DAA520" strokeWidth="1.2" />

          {/* Thân Áo Tấc (Tay Thụng Rộng 1 Tấc buông rủ bề thế) */}
          <path
            d="M 175,162 
               C 130,170 70,210 15,260 
               L 15,440 
               C 75,410 115,350 135,300 
               L 135,490 
               L 265,490 
               L 265,300 
               C 285,350 325,410 385,440 
               L 385,260 
               C 330,210 270,170 225,162 
               Z"
            fill="url(#tacPlum)"
            stroke="#DAA520"
            strokeWidth="1.8"
          />

          {/* Đường cài vạt áo bên sườn phải với 5 cúc vàng (Ngũ thường) */}
          <path d="M 212,162 C 225,175 235,195 238,225 L 240,490" stroke="#DAA520" strokeWidth="1.5" strokeDasharray="5,4" fill="none" />
          <circle cx="212" cy="164" r="3.5" fill="url(#tacGold)" stroke="#78350F" strokeWidth="1" />
          <circle cx="225" cy="180" r="3.5" fill="url(#tacGold)" stroke="#78350F" strokeWidth="1" />
          <circle cx="232" cy="200" r="3.5" fill="url(#tacGold)" stroke="#78350F" strokeWidth="1" />
          <circle cx="236" cy="225" r="3.5" fill="url(#tacGold)" stroke="#78350F" strokeWidth="1" />
          <circle cx="238" cy="255" r="3.5" fill="url(#tacGold)" stroke="#78350F" strokeWidth="1" />

          {/* Hoa văn dệt gấm chữ Thọ hoặc Hoa Mai chìm */}
          <circle cx="200" cy="240" r="18" stroke="#DAA520" strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="200" cy="340" r="22" stroke="#DAA520" strokeWidth="1" fill="none" opacity="0.4" />

          {/* Quạt giấy trầm trên tay */}
          <path d="M 180,310 Q 200,280 220,310 Z" fill="#FDE68A" stroke="#78350F" strokeWidth="1" />

          {showDetails && (
            <g transform="translate(20, 30)">
              <rect width="130" height="24" rx="6" fill="rgba(218, 165, 32, 0.9)" />
              <text x="65" y="16" fill="#4A0E17" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                TAY THỤNG 1 TẤC
              </text>
            </g>
          )}
        </svg>
      );

    case 'giao-linh':
      return (
        <svg id={id} viewBox="0 0 400 500" className={className} aria-label="Hình minh họa Áo Giao Lĩnh Thăng Long">
          <defs>
            <linearGradient id="glJade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E3A2F" />
              <stop offset="60%" stopColor="#132A22" />
              <stop offset="100%" stopColor="#0A1813" />
            </linearGradient>
            <linearGradient id="silkIvory" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5F5F0" />
              <stop offset="100%" stopColor="#E5E5DC" />
            </linearGradient>
            {userImage && (
              <clipPath id="glUserFaceClip">
                <ellipse cx="200" cy="115" rx="20" ry="24" />
              </clipPath>
            )}
          </defs>

          {/* Nền phong cảnh Thăng Long cổ kính */}
          <rect width="400" height="500" fill="#0C1B15" rx="16" />

          {/* Tóc vấn trần hoặc búi củ hành cài trâm ngọc bích */}
          <g transform="translate(200, 80)">
            <ellipse cx="0" cy="0" rx="30" ry="16" fill="#171717" />
            {/* Trâm ngọc bích */}
            <line x1="-35" y1="-4" x2="35" y2="4" stroke="#6EE7B7" strokeWidth="3" />
            <circle cx="35" cy="4" r="4.5" fill="#34D399" stroke="#DAA520" strokeWidth="1" />
          </g>

          {/* Khuôn mặt */}
          {userImage ? (
            <image
              href={userImage}
              x="178"
              y="90"
              width="44"
              height="50"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#glUserFaceClip)"
            />
          ) : (
            <ellipse cx="200" cy="115" rx="20" ry="24" fill="#FDF4EA" />
          )}

          {/* Lớp áo trong màu trắng ngà */}
          <path d="M 180,140 L 220,180 L 180,220 Z" fill="url(#silkIvory)" />

          {/* CỔ ÁO GIAO LĨNH TẢ NHẪM (Vạt trái đè lên vạt phải) */}
          <path
            d="M 160,145 
               L 80,240 
               L 110,290 
               L 145,260 
               L 145,490 
               L 255,490 
               L 255,260 
               L 290,290 
               L 320,240 
               L 240,145 
               Z"
            fill="url(#glJade)"
            stroke="#DAA520"
            strokeWidth="1.5"
          />

          {/* Vạt áo chéo giao nhau trước ngực */}
          {/* Vạt phải chìm bên dưới */}
          <line x1="230" y1="150" x2="175" y2="235" stroke="#E5E7EB" strokeWidth="4" />
          {/* Vạt trái đè lên trên (Tả nhẫm) */}
          <path d="M 170,150 L 235,235 L 240,490" stroke="#DAA520" strokeWidth="4" fill="none" />

          {/* Đai lưng lụa thêu hoa sen */}
          <rect x="150" y="255" width="100" height="20" rx="3" fill="#D97706" stroke="#DAA520" strokeWidth="1.5" />
          {/* Dải đai buông thướt tha */}
          <path d="M 185,275 L 185,420 L 195,420 L 195,275 Z" fill="#D97706" />
          <path d="M 205,275 L 205,440 L 215,440 L 215,275 Z" fill="#B45309" />

          {showDetails && (
            <g transform="translate(20, 30)">
              <rect width="130" height="24" rx="6" fill="rgba(218, 165, 32, 0.9)" />
              <text x="65" y="16" fill="#1E3A2F" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                CỔ CHÉO TẢ NHẪM
              </text>
            </g>
          )}
        </svg>
      );

    case 'ngu-than':
      return (
        <svg id={id} viewBox="0 0 400 500" className={className} aria-label="Hình minh họa Áo Ngũ Thân Tay Chẽn Nam Bộ">
          <defs>
            <linearGradient id="silkObsidian" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="silverTorque" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            {userImage && (
              <clipPath id="ntUserFaceClip">
                <ellipse cx="200" cy="120" rx="19" ry="23" />
              </clipPath>
            )}
          </defs>

          {/* Nền phong cảnh Nam Bộ xưa */}
          <rect width="400" height="500" fill="#090D16" rx="16" />

          {/* Tóc búi gọn sau gáy kiểu Nam Bộ */}
          <ellipse cx="200" cy="85" rx="32" ry="14" fill="#0A0A0A" />

          {/* Khuôn mặt */}
          {userImage ? (
            <image
              href={userImage}
              x="179"
              y="95"
              width="42"
              height="50"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#ntUserFaceClip)"
            />
          ) : (
            <ellipse cx="200" cy="120" rx="19" ry="23" fill="#FDF4EA" />
          )}

          {/* Cổ Lập Lĩnh cao 2-3cm */}
          <path d="M 190,146 C 190,140 210,140 210,146 L 212,160 L 188,160 Z" fill="#1E293B" stroke="#DAA520" strokeWidth="1" />

          {/* Kiềng Bạc Chạm Hoa Mai Quanh Cổ */}
          <ellipse cx="200" cy="162" rx="26" ry="12" fill="none" stroke="url(#silverTorque)" strokeWidth="3" />

          {/* Thân Áo Ngũ Thân Tay Chẽn (Ôm sát cánh tay gọn gàng) */}
          <path
            d="M 180,160 
               C 145,170 110,210 65,310 
               L 85,325 
               C 120,240 140,215 155,205 
               L 155,490 
               L 245,490 
               L 245,205 
               C 260,215 280,240 315,325 
               L 335,310 
               C 290,210 255,170 220,160 
               Z"
            fill="url(#silkObsidian)"
            stroke="#DAA520"
            strokeWidth="1.2"
          />

          {/* 5 Cúc Đồng cài bên sườn phải */}
          <circle cx="210" cy="165" r="3" fill="#DAA520" />
          <circle cx="218" cy="180" r="3" fill="#DAA520" />
          <circle cx="224" cy="198" r="3" fill="#DAA520" />
          <circle cx="228" cy="220" r="3" fill="#DAA520" />
          <circle cx="230" cy="245" r="3" fill="#DAA520" />

          {/* Chuỗi ngọc trai hoặc cẩm thạch Nam Bộ */}
          <path d="M 185,170 Q 200,230 215,170" stroke="#FDE047" strokeWidth="1.8" strokeDasharray="3,3" fill="none" />

          {showDetails && (
            <g transform="translate(20, 30)">
              <rect width="130" height="24" rx="6" fill="rgba(218, 165, 32, 0.9)" />
              <text x="65" y="16" fill="#0F172A" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                TAY CHẼN ÔM GỌN
              </text>
            </g>
          )}
        </svg>
      );

    case 'ao-tu-than':
    default:
      return (
        <svg id={id} viewBox="0 0 400 500" className={className} aria-label="Hình minh họa Áo Tứ Thân Kinh Bắc">
          <defs>
            <linearGradient id="ttBrown" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="70%" stopColor="#451A03" />
              <stop offset="100%" stopColor="#250E02" />
            </linearGradient>
            {userImage && (
              <clipPath id="ttUserFaceClip">
                <ellipse cx="200" cy="115" rx="18" ry="22" />
              </clipPath>
            )}
          </defs>

          {/* Nền phong cảnh Kinh Bắc */}
          <rect width="400" height="500" fill="#1C1005" rx="16" />

          {/* Nón quai thao (Nón ba tầm tròn xòe) */}
          <g transform="translate(200, 75)">
            <ellipse cx="0" cy="0" rx="58" ry="14" fill="#FDE68A" stroke="#78350F" strokeWidth="1.5" />
            {/* Quai thao tơ tằm buông dài */}
            <path d="M -30,6 C -35,50 -25,120 -20,180" stroke="#E5E7EB" strokeWidth="2.5" fill="none" />
            <path d="M 30,6 C 35,50 25,120 20,180" stroke="#E5E7EB" strokeWidth="2.5" fill="none" />
          </g>

          {/* Khuôn mặt */}
          {userImage ? (
            <image
              href={userImage}
              x="180"
              y="91"
              width="40"
              height="48"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#ttUserFaceClip)"
            />
          ) : (
            <ellipse cx="200" cy="115" rx="18" ry="22" fill="#FDF4EA" />
          )}

          {/* Yếm đào màu cánh sen / đỏ thắm */}
          <polygon points="185,150 215,150 200,195" fill="#E11D48" stroke="#FDA4AF" strokeWidth="1" />

          {/* Thân Áo Tứ Thân xẻ tà */}
          <path
            d="M 175,155 
               C 135,170 85,220 30,290 
               L 50,320 
               C 95,260 130,225 150,215 
               L 150,490 
               L 250,490 
               L 250,215 
               C 270,225 305,260 350,320 
               L 370,290 
               C 315,220 265,170 225,155 
               Z"
            fill="url(#ttBrown)"
            stroke="#DAA520"
            strokeWidth="1.5"
          />

          {/* Váy Đụp Đen Dân Gian bên dưới */}
          <path d="M 160,300 L 160,490 L 240,490 L 240,300 Z" fill="#0A0A0A" />

          {/* Hai Vạt Áo Trước Buộc Thắt Nút Duyên Dáng Trước Bụng */}
          <g transform="translate(200, 260)">
            <circle cx="0" cy="0" r="8" fill="#B45309" stroke="#DAA520" strokeWidth="1.5" />
            {/* Vạt thắt buông rủ */}
            <path d="M -6,6 C -15,40 -20,80 -15,110 L -6,110 C -10,80 -8,40 0,6 Z" fill="#78350F" />
            <path d="M 6,6 C 15,40 20,80 15,110 L 6,110 C 10,80 8,40 0,6 Z" fill="#92400E" />
          </g>

          {/* Thắt lưng / Dải bao màu xanh lục nổi bật */}
          <rect x="155" y="240" width="90" height="12" rx="2" fill="#16A34A" stroke="#DAA520" strokeWidth="1" />

          {showDetails && (
            <g transform="translate(20, 30)">
              <rect width="130" height="24" rx="6" fill="rgba(218, 165, 32, 0.9)" />
              <text x="65" y="16" fill="#451A03" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                NÓN QUAI THAO & YẾM ĐÀO
              </text>
            </g>
          )}
        </svg>
      );
  }
};
