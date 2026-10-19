export interface GarmentVariant {
  label: string;
  img: string;
  description: string;
  backdrop: string;
}

export interface Garment {
  id: string;
  name: string;
  dynasty: string;
  region: 'bac' | 'trung' | 'nam';
  regionBadge: string;
  regionName: string;
  century: string;
  shortDesc: string;
  structure: string;
  material: string;
  accessories: string;
  audioScript: string;
  rentPrice: number;
  buyPrice: number;
  image: string;
  primaryColorHex: string;
  variants: GarmentVariant[];
  etiquette: string;
  wikipediaUrl: string;
}

export interface RegionHeritageInfo {
  id: 'bac' | 'trung' | 'nam';
  name: string;
  subtitle: string;
  landmark: string;
  image: string;
  description: string;
  typicalCostumes: string;
}

export const REGIONAL_HERITAGE: Record<'bac' | 'trung' | 'nam', RegionHeritageInfo> = {
  bac: {
    id: 'bac',
    name: 'Miền Bắc',
    subtitle: 'Hồ Gươm · Thăng Long',
    landmark: 'Hồ Gươm (Tháp Rùa)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Thap_Rua.jpg/800px-Thap_Rua.jpg',
    description: 'Thủ đô ngàn năm văn hiến bên thắng cảnh Hồ Gươm (Hồ Hoàn Kiếm) và Tháp Rùa cổ kính rêu phong. Trang phục cổ miền Bắc mang nét đoan trang, thoát tục và trầm mặc.',
    typicalCostumes: 'Áo Giao Lĩnh, Áo Tứ Thân'
  },
  trung: {
    id: 'trung',
    name: 'Miền Trung',
    subtitle: 'Cố Đô Huế · Triều Nguyễn',
    landmark: 'Cố Đô Huế (Ngọ Môn)',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800',
    description: 'Quần thể di tích Cố Đô Huế - trung tâm y phục cung đình triều Nguyễn với Ngọ Môn và Đại Nội uy nghiêm. Nổi tiếng với kỹ nghệ thêu kim tuyến và sắc màu ngũ hành.',
    typicalCostumes: 'Áo Nhật Bình, Áo Tấc Cung Đình'
  },
  nam: {
    id: 'nam',
    name: 'Miền Nam',
    subtitle: 'Gia Định · Sài Gòn Xưa',
    landmark: 'Chợ Bến Thành (Sài Gòn)',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800',
    description: 'Miền đất trù phú, hào sảng và phóng khoáng với Chợ Bến Thành và Gia Định xưa. Cổ phục Nam Bộ kế thừa áo ngũ thân với tay chẽn hiện đại trên nền lụa Lãnh Mỹ A trứ danh.',
    typicalCostumes: 'Áo Ngũ Thân Tay Chẽn'
  }
};

export const SAMPLE_PORTRAITS = [
  {
    id: 'p1',
    name: 'Nữ truyền thống',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=700',
    gender: 'female',
    desc: 'Nét mặt thuần hậu Á Đông, rất hợp Áo Nhật Bình & Áo Tấc'
  },
  {
    id: 'p2',
    name: 'Nữ thanh tú',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=700',
    gender: 'female',
    desc: 'Nét đẹp trong trẻo, hợp Giao Lĩnh & Tứ Thân Kinh Bắc'
  },
  {
    id: 'p3',
    name: 'Nam nho nhã',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=700',
    gender: 'male',
    desc: 'Phong thái văn nhân nho nhã, chuẩn Áo Tấc & Ngũ Thân nam'
  },
  {
    id: 'p4',
    name: 'Nam khí phách',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=700',
    gender: 'male',
    desc: 'Đĩnh đạc oai nghiêm, hợp lễ phục quan chức triều đình'
  }
];

export const GARMENTS_DATA: Garment[] = [
  {
    id: 'nhat-binh',
    name: 'Áo Nhật Bình',
    dynasty: 'Triều Nguyễn',
    region: 'trung',
    regionBadge: 'Miền Trung',
    regionName: 'Cố đô Huế · Miền Trung',
    century: 'Thế kỷ XIX - XX',
    shortDesc: 'Thường phục bậc cao dành cho Hoàng hậu, Công chúa và phi tần triều Nguyễn. Điểm nhận diện độc nhất vô nhị là phần nẹp cổ to bản ghép lại trước ngực thành hình chữ nhật ngay ngắn, tay áo thêu dải ngũ hành rực rỡ.',
    structure: 'Áo đối khâm (xẻ giữa), nẹp cổ hình chữ nhật to bản viền chỉ vàng thêu loan phượng bát bửu. Tay áo thụng rộng rực rỡ dải màu ngũ hành (lục, hoàng, lam, bạch, xích) tượng trưng cho ngũ hành tương sinh.',
    material: 'Lụa sa, gấm vóc dệt hoa chìm thượng hạng từ làng lụa Vạn Phúc, thêu kim tuyến chỉ vàng ròng các đồ án cát tường, mây ngũ sắc và sóng nước thủy ba.',
    accessories: 'Khăn vành dây quấn nhiều vòng vàng kim cung đình, trâm hoa cài tóc, chuỗi bội ngọc trai hoặc san hô đỏ, hài phượng mũi cong sơn son.',
    audioScript: 'Kính chào quý khách! Áo Nhật Bình là biểu tượng đỉnh cao của mỹ thuật y phục cung đình triều Nguyễn. Bắt nguồn từ chiếc áo Phi Phong thời Minh, các nghệ nhân Đại Nam đã sáng tạo nên phần cổ chữ nhật đối xứng mang ý nghĩa ngay thẳng, quang minh chính đại. Tay áo có dải viền ngũ hành đại diện cho vũ trụ hòa hợp. Khi quý khách ướm thử, hệ thống AI sẽ chuẩn hóa nếp xếp khăn vành và giữ trọn thần thái thanh tao.',
    rentPrice: 350000,
    buyPrice: 2800000,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=900',
    primaryColorHex: '#800000',
    etiquette: 'Thường dùng trong các buổi tiếp kiến thân mật, lễ tết cung đình và cưới hỏi truyền thống bậc vương giả.',
    wikipediaUrl: 'https://vi.wikipedia.org/wiki/%C3%81o_Nh%E1%BA%ADt_B%C3%ACnh',
    variants: [
      {
        label: 'Chính diện Cung đình Huế (Đỏ son hoàng gia)',
        img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=900',
        description: 'Phối khăn vành vàng kim, nền điện Thái Hòa sơn son thếp vàng uy nghiêm.',
        backdrop: 'Điện Thái Hòa'
      },
      {
        label: 'Góc nghiêng Nàng thơ Tóc mây (Xanh lục bảo cung đình)',
        img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=900',
        description: 'Tôn dáng thanh tú, dải ngũ sắc tung bay trước gió bên bờ sông Hương xứ Huế.',
        backdrop: 'Hồ Tịnh Tâm'
      },
      {
        label: 'Bối cảnh Ngọ Môn Hoàng thành (Vàng hoàng yến vương giả)',
        img: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=900',
        description: 'Ánh hoàng hôn ngả bóng trên tường thành gạch cổ kính rêu phong di sản.',
        backdrop: 'Lầu Ngũ Phụng'
      }
    ]
  },
  {
    id: 'ao-tac',
    name: 'Áo Tấc (Ngũ Thân Tay Thụng)',
    dynasty: 'Thời Chúa Nguyễn - Triều Nguyễn',
    region: 'trung',
    regionBadge: 'Miền Trung',
    regionName: 'Cố đô Huế · Toàn quốc',
    century: 'Thế kỷ XVIII - XX',
    shortDesc: 'Đại lễ phục truyền thống quốc hồn quốc túy của người Việt dùng trong các dịp trọng đại. Tên gọi "Áo Tấc" xuất phát từ phần viền tà và ống tay áo thụng rộng đúng một tấc cổ truyền (khoảng 40cm).',
    structure: 'Thiết kế ngũ thân (5 mảnh vải ghép lại) tượng trưng cho đạo lý làm người: Tứ thân phụ mẫu bao bọc lấy bản thân người mặc. Cổ áo đứng lập lĩnh cao 2-3cm trang nghiêm, cài 5 cúc đại diện cho Ngũ Thường (Nhân - Nghĩa - Lễ - Trí - Tín).',
    material: 'Gấm, sa, lương hoặc lụa tơ tằm dệt hoa cúc, hoa mai, rồng mây tinh giản; vải buông mềm nhưng giữ phom đứng đắn, trang nghiêm.',
    accessories: 'Khăn đóng (khăn xếp) truyền thống, quạt giấy lụa viết chữ thư pháp, chuỗi kiềng bạc hoặc thẻ bài ngọc chạm khắc tinh vi.',
    audioScript: 'Áo Tấc là biểu trưng cho cốt cách mực thước, lễ nghĩa của người Việt từ thời chúa Nguyễn Phúc Khoát định chế y phục. Chiếc áo mang 5 thân vải tượng trưng cho tình mẫu tử, phụ tử và đạo cương thường. Tay áo thụng rộng buông dài khi chắp tay hành lễ tạo nên phong thái khiêm nhường, đĩnh đạc.',
    rentPrice: 290000,
    buyPrice: 2200000,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=900',
    primaryColorHex: '#4A0E17',
    etiquette: 'Mặc trong đại lễ đình làng, tế giao, dâng hương tiên tổ, lễ vu quy và tốt nghiệp tú tài.',
    wikipediaUrl: 'https://vi.wikipedia.org/wiki/%C3%81o_t%E1%BA%AFc',
    variants: [
      {
        label: 'Dáng đứng Nghi lễ Cung đình (Màu mận chín truyền thống)',
        img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=900',
        description: 'Ống tay thụng buông rủ thanh tú, khăn đóng xếp nếp chuẩn mực đạo cương thường.',
        backdrop: 'Văn Miếu Huế'
      },
      {
        label: 'Phối Quạt Trầm & Khăn Đóng (Màu lam khói nho nhã)',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=900',
        description: 'Vẻ đẹp nho nhã của trí thức văn nhân thời kinh kỳ phong kiến Việt Nam.',
        backdrop: 'Điện Kiến Trung'
      },
      {
        label: 'Nét Cổ Phong Cổ Kính (Màu mộc sương nhà rường)',
        img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=900',
        description: 'Phong vị hoài niệm bên hàng hiên nhà rường xứ Huế trầm mặc và thanh tịnh.',
        backdrop: 'Nhà Rường An Hiên'
      }
    ]
  },
  {
    id: 'giao-linh',
    name: 'Áo Giao Lĩnh',
    dynasty: 'Triều Lý - Trần - Lê Trung Hưng',
    region: 'bac',
    regionBadge: 'Miền Bắc',
    regionName: 'Thăng Long · Miền Bắc',
    century: 'Thế kỷ XI - XVIII',
    shortDesc: 'Dạng cổ phục lâu đời bậc nhất của người Việt trải qua nghìn năm văn hiến Thăng Long, đặc trưng bởi vạt áo chéo giao nhau trước ngực theo quy chuẩn Tả Nhẫm (vạt trái đè lên vạt phải) thể hiện lòng tôn kính tự nhiên.',
    structure: 'Cổ chéo giao lĩnh khoáng đạt, vạt áo buông rủ phủ ngoài váy đụp (thường) bên dưới, thắt đai lưng lụa thêu dệt tao nhã. Tay áo có thể may thụng rộng hoặc vừa vặn.',
    material: 'Lụa tơ tằm dệt thủ công, đũi tơ tự nhiên nhuộm củ nâu, chàm, vỏ cây rừng tạo nên bảng màu tự nhiên, thuần khiết.',
    accessories: 'Tóc vấn trần hoặc búi cao cài trâm ngọc bích, kiềng vàng lá, chuỗi hạt cườm ngọc thạch.',
    audioScript: 'Áo Giao Lĩnh gắn liền với thời kỳ thịnh vượng Lý - Trần - Lê tại kinh thành Thăng Long. Cổ áo giao nhau trước ngực thể hiện sự hài hòa giữa âm và dương, đất và trời. Khác với trang phục cung đình thời sau, áo Giao Lĩnh mang vẻ đẹp thanh tao, thoát tục như những bức tượng ngọc cổ truyền.',
    rentPrice: 320000,
    buyPrice: 2500000,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=900',
    primaryColorHex: '#1B4D3E',
    etiquette: 'Trang phục thịnh hành của giới quý tộc, học sĩ và quan lại trong các dịp hội hè xuân thu Thăng Long.',
    wikipediaUrl: 'https://vi.wikipedia.org/wiki/%C3%81o_giao_l%C4%A9nh',
    variants: [
      {
        label: 'Thăng Long Cổ Phong (Lục ngọc thanh thoát)',
        img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=900',
        description: 'Dáng áo thướt tha bên mái ngói cong chùa Thầy và Văn Miếu ngàn năm tuổi.',
        backdrop: 'Chùa Thầy'
      },
      {
        label: 'Tóc Vấn Trần & Trâm Ngọc (Trắng ngà tinh khôi)',
        img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=900',
        description: 'Nét đẹp kiêu sa thoát tục của thiếu nữ quý tộc thời Hậu Lê.',
        backdrop: 'Hồ Hoàn Kiếm'
      },
      {
        label: 'Họa Tiết Sen Thời Lý (Đỏ gạch trầm tích Hoàng thành)',
        img: 'https://images.unsplash.com/photo-1610056968846-9d0458df864f?auto=format&fit=crop&q=80&w=900',
        description: 'Điểm xuyết hoa văn sen chạm khắc tinh vi lấy cảm hứng bảo vật quốc gia Đại Việt.',
        backdrop: 'Hoàng Thành Thăng Long'
      }
    ]
  },
  {
    id: 'ngu-than',
    name: 'Áo Ngũ Thân Tay Chẽn',
    dynasty: 'Triều Nguyễn - Đầu TK XX',
    region: 'nam',
    regionBadge: 'Miền Nam',
    regionName: 'Gia Định · Nam Bộ',
    century: 'Thế kỷ XIX - XX',
    shortDesc: 'Tiền thân trực tiếp của Áo dài hiện đại, được ưa chuộng khắp cả nước nhưng nở rộ rực rỡ nhất tại vùng đất phương Nam hào sảng, năng động nhờ ống tay chẽn gọn gàng, thanh lịch.',
    structure: 'Năm thân áo kín đáo, cổ đứng cao 2cm trang nhã, điểm đặc sắc nhất là tay áo chẽn (ôm sát từ khuỷu tay đến cổ tay) giúp vận động nhanh nhẹn mà vẫn đoan trang lịch sự.',
    material: 'Lụa Lãnh Mỹ A đen huyền thoại trứ danh xứ lụa Tân Châu, dệt từ tơ tằm nhuộm mủ mặc nưa óng ả bóng bẩy như da thuộc cao cấp.',
    accessories: 'Kiềng bạc chạm hoa mai, chuỗi hạt cẩm thạch xanh ngọc, nón lá hoặc dù che thời Pháp thuộc, guốc mộc quai nhung.',
    audioScript: 'Từ mảnh đất Gia Định đến Tây Đô trù phú, áo Ngũ thân tay chẽn gắn liền với hình tượng những cô Ba Sài Gòn quý phái và những ông chủ điền trượng nghĩa. Tay chẽn gọn gàng tôn lên đường nét thanh thoát của cổ tay, là bước chuyển tuyệt diệu giữa cổ phục xưa và chiếc áo dài ngày nay.',
    rentPrice: 250000,
    buyPrice: 1950000,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900',
    primaryColorHex: '#1F2937',
    etiquette: 'Thích hợp du xuân, dạo phố cổ, chụp ảnh kỷ yếu di sản và tiệc cưới truyền thống Nam Bộ.',
    wikipediaUrl: 'https://vi.wikipedia.org/wiki/%C3%81o_ng%C5%A9_th%C3%A2n',
    variants: [
      {
        label: 'Cô Ba Gia Định Cổ Điển (Đen huyền Lãnh Mỹ A Tân Châu)',
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900',
        description: 'Nét đẹp kiêu sa của đất Sài Gòn hoa lệ đầu thế kỷ trước với kiềng bạc sáng rực rỡ.',
        backdrop: 'Dinh Thượng Thơ Sài Gòn'
      },
      {
        label: 'Phối Chuỗi Ngọc & Guốc Mộc (Hồng phấn nhung Nam Bộ)',
        img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=900',
        description: 'Tươi tắn ngọt ngào, vẻ đẹp thiếu nữ phương Nam đi lễ chùa đầu năm đón Tết.',
        backdrop: 'Chợ Bến Thành xưa'
      },
      {
        label: 'Sắc Đỏ Lễ Hội Nam Bộ (Đỏ chu sa may mắn miệt vườn)',
        img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=900',
        description: 'Sắc thắm may mắn rạng rỡ cho những dịp hỷ sự và lễ hội miệt vườn sông nước.',
        backdrop: 'Nhà Cổ Bình Thủy Cần Thơ'
      }
    ]
  },
  {
    id: 'ao-tu-than',
    name: 'Áo Tứ Thân & Nón Quai Thao',
    dynasty: 'Thời Lê - Nguyễn',
    region: 'bac',
    regionBadge: 'Miền Bắc',
    regionName: 'Kinh Bắc · Đồng bằng Bắc Bộ',
    century: 'Thế kỷ XVII - XX',
    shortDesc: 'Y phục dân gian tiêu biểu của phụ nữ Bắc Bộ, tượng trưng cho đức tính tảo tần, dịu dàng của người phụ nữ Việt Nam qua các làn điệu Quan họ Kinh Bắc mượt mà.',
    structure: 'Gồm 4 thân áo (2 thân sau may ghép lại, 2 thân trước buông dài để thắt mối trước bụng), mặc bên ngoài yếm hoa đào và váy đụp đen huyền bí, thắt bao lụa xanh.',
    material: 'Vải đũi tơ tằm, sồi, the nhuộm củ nâu dân dã mà bền chắc, viền tà áo mềm mại.',
    accessories: 'Nón quai thao (nón ba tầm) đan từ lá cọ phơi sương, quai thao bằng tơ tằm buông dài, ruột tượng và yếm thắm.',
    audioScript: 'Về với miền Quan họ Kinh Bắc, chiếc áo Tứ thân cùng chiếc nón quai thao là hiện thân trọn vẹn của nét duyên đằm thắm. Bốn vạt áo tượng trưng cho tứ thân phụ mẫu luôn chở che, hai vạt trước thắt mối tượng trưng cho nghĩa vợ tình chồng son sắt bền lâu.',
    rentPrice: 220000,
    buyPrice: 1750000,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=900',
    primaryColorHex: '#7C2D12',
    etiquette: 'Rất được yêu thích trong các lễ hội làng, hát quan họ, chụp ảnh đồng quê và biểu diễn văn nghệ.',
    wikipediaUrl: 'https://vi.wikipedia.org/wiki/%C3%81o_t%E1%BB%A9_th%C3%A2n',
    variants: [
      {
        label: 'Liền Chị Kinh Bắc (Nâu non & Yếm đào)',
        img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=900',
        description: 'Vạt áo buộc vạt trước eo thon, e ấp sau chiếc nón ba tầm râm mát.',
        backdrop: 'Đình Bảng Bắc Ninh'
      },
      {
        label: 'Duyên Dáng Trẩy Hội Xuân (Vàng mỡ gà & Bao xanh)',
        img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=900',
        description: 'Phối màu tinh tế giữa các lớp vải tự nhiên của người con gái đất Bắc.',
        backdrop: 'Làng Cổ Đường Lâm'
      },
      {
        label: 'Thanh Bình Cố Hương (Xanh rêu cổ điển)',
        img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=900',
        description: 'Hình ảnh quen thuộc bên giếng nước sân đình cây đa ngút ngàn.',
        backdrop: 'Chùa Bút Tháp'
      }
    ]
  }
];

export interface CartItem {
  id: string;
  garmentId: string;
  name: string;
  image: string;
  modeLabel: string;
  variantLabel: string;
  orderType: 'rent' | 'buy';
  size: 'S' | 'M' | 'L' | 'XL' | 'Custom';
  days: number;
  rentPrice: number;
  buyPrice: number;
  quantity: number;
}
