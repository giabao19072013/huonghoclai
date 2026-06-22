export interface QuizQuestion {
  id: string;
  subject: 'Toán' | 'Hóa' | 'Sinh' | 'Lý';
  grade: '11' | '12';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const CURATED_QUESTIONS: QuizQuestion[] = [
  // ================= TOÁN 11 =================
  {
    id: 'q-math-11-1',
    subject: 'Toán',
    grade: '11',
    question: 'Chu kỳ tuần hoàn của hàm số y = cos(3x) là:',
    options: ['2π', '2π/3', 'π/3', '2π/5'],
    correctIndex: 1,
    explanation: 'Hàm số y = cos(ax) tuần hoàn với chu kỳ T = 2π/|a|. Với a = 3, chu kỳ là T = 2π/3.'
  },
  {
    id: 'q-math-11-2',
    subject: 'Toán',
    grade: '11',
    question: 'Cho cấp số nhân lùi vô hạn có số hạng đầu u1 = 2 và công bội q = 1/2. Tổng S của cấp số nhân này là:',
    options: ['S = 4', 'S = 3', 'S = 2', 'S = 1'],
    correctIndex: 0,
    explanation: 'Tổng của cấp số nhân lùi vô hạn tính bằng công thức S = u1 / (1 - q). Ở đây S = 2 / (1 - 1/2) = 2 / (1/2) = 4.'
  },
  {
    id: 'q-math-11-3',
    subject: 'Toán',
    grade: '11',
    question: 'Phương trình lượng giác cơ bản sin(x) = 1 có nghiệm là:',
    options: ['x = π/2 + k*π', 'x = π/2 + k*2π', 'x = k*2π', 'x = -π/2 + k*2π'],
    correctIndex: 1,
    explanation: 'Điểm biểu diễn sin(x) = 1 trên đường tròn lượng giác là điểm cực bắc, tương ứng với cung x = π/2 + k*2π (k thuộc Z).'
  },
  {
    id: 'q-math-11-4',
    subject: 'Toán',
    grade: '11',
    question: 'Trong không gian, hai đường thẳng không có điểm chung và cùng nằm trên một mặt phẳng gọi là:',
    options: ['Hai đường thẳng song song', 'Hai đường thẳng chéo nhau', 'Hai đường thẳng trùng nhau', 'Hai đường thẳng vuông góc'],
    correctIndex: 0,
    explanation: 'Theo định nghĩa, hai đường thẳng song song là hai đường thẳng đồng phẳng (cùng nằm trong một mặt phẳng) và không có điểm chung.'
  },
  {
    id: 'q-math-11-5',
    subject: 'Toán',
    grade: '11',
    question: 'Đạo hàm của hàm số y = x^4 + sin(x) là:',
    options: ['y\' = 4x^3 - cos(x)', 'y\' = 4x^3 + cos(x)', 'y\' = 4x^4 + cos(x)', 'y\' = 3x^3 + cos(x)'],
    correctIndex: 1,
    explanation: 'Theo quy tắc tính đạo hàm: (x^4)\' = 4x^3 và (sin x)\' = cos x. Suy ra y\' = 4x^3 + cos x.'
  },

  // ================= TOÁN 12 =================
  {
    id: 'q-math-12-1',
    subject: 'Toán',
    grade: '12',
    question: 'Hàm số y = x^3 - 3x^2 + 2 đồng biến trên những khoảng nào?',
    options: ['(0; 2)', '(-∞; 0) và (2; +∞)', '(-∞; 2)', '(0; +∞)'],
    correctIndex: 1,
    explanation: 'Tính đạo hàm y\' = 3x^2 - 6x = 3x(x - 2). Xét dấu y\': y\' > 0 khi x < 0 hoặc x > 2. Do đó hàm số đồng biến trên (-∞; 0) và (2; +∞).'
  },
  {
    id: 'q-math-12-2',
    subject: 'Toán',
    grade: '12',
    question: 'Đường tiệm cận ngang của đồ thị hàm số y = (2x + 1) / (x - 1) là:',
    options: ['y = 2', 'x = 1', 'y = -1', 'x = 2'],
    correctIndex: 0,
    explanation: 'Giới hạn của y khi x tiến ra vô cùng là lim (2x+1)/(x-1) = 2. Do đó y = 2 là đường tiệm cận ngang.'
  },
  {
    id: 'q-math-12-3',
    subject: 'Toán',
    grade: '12',
    question: 'Tích phân I = \u222B(từ 0 đến 1) x dx có giá trị bằng:',
    options: ['1', '1/2', '2', '0'],
    correctIndex: 1,
    explanation: 'Nguyên hàm của x là x^2/2. Thế giới hạn từ 0 đến 1: (1^2)/2 - (0^2)/2 = 1/2.'
  },
  {
    id: 'q-math-12-4',
    subject: 'Toán',
    grade: '12',
    question: 'Trong không gian Oxyz, tọa độ trung điểm I của đoạn thẳng AB nối liền A(1; 2; 3) và B(3; 4; 5) là:',
    options: ['I(2; 3; 4)', 'I(4; 6; 8)', 'I(1.5; 2.5; 3.5)', 'I(2; 2; 2)'],
    correctIndex: 0,
    explanation: 'Tọa độ trung điểm I tính theo công thức: xI = (xA+xB)/2, yI = (yA+yB)/2, zI = (zA+zB)/2. Ta được xI=(1+3)/2=2, yI=(2+4)/2=3, zI=(3+5)/2=4. Vậy I(2; 3; 4).'
  },
  {
    id: 'q-math-12-5',
    subject: 'Toán',
    grade: '12',
    question: 'Môđun của số phức z = 3 - 4i là:',
    options: ['|z| = 7', '|z| = 5', '|z| = 1', '|z| = 25'],
    correctIndex: 1,
    explanation: 'Môđun của số phức z = a + bi là |z| = căn(a^2 + b^2). Với z = 3 - 4i, |z| = căn(3^2 + (-4)^2) = căn(9 + 16) = căn(25) = 5.'
  },

  // ================= HÓA 11 =================
  {
    id: 'q-chem-11-1',
    subject: 'Hóa',
    grade: '11',
    question: 'Khí amoniac (NH3) có cấu trúc hình học là gì và có tính chất gì tiêu biểu?',
    options: [
      'Cấu trúc phẳng, là axit mạnh',
      'Cấu trúc hình chóp tam giác, là bazơ yếu',
      'Cấu trúc đường thẳng, trung tính',
      'Cấu trúc tứ diện, là chất oxi hóa mạnh'
    ],
    correctIndex: 1,
    explanation: 'Amoniac (NH3) có cấu trúc hình chóp khuyết một đỉnh (hình chóp tam giác) với cặp electron tự do trên nguyên tử N. Nó thể hiện tính bazơ yếu đặc trưng trong dung dịch.'
  },
  {
    id: 'q-chem-11-2',
    subject: 'Hóa',
    grade: '11',
    question: 'Axit nitric (HNO3) tác dụng với kim loại Đồng (Cu) loãng sinh ra sản phẩm khử khí nào không màu và hóa nâu trong không khí?',
    options: ['NO2', 'NO', 'N2O', 'H2'],
    correctIndex: 1,
    explanation: 'Phản ứng 3Cu + 8HNO3(loãng) -> 3Cu(NO3)2 + 2NO + 4H2O sinh ra khí NO (nitơ monoxit) không màu, hóa nâu trong không khí do phản ứng cực nhanh với oxi tạo thành NO2 nâu đỏ.'
  },
  {
    id: 'q-chem-11-3',
    subject: 'Hóa',
    grade: '11',
    question: 'Trong các hydrocarbon sau, chất nào thuộc dãy đồng đẳng Ankan?',
    options: ['C2H4', 'C3H8', 'C2H2', 'C6H6'],
    correctIndex: 1,
    explanation: 'Công thức chung của Ankan là CnH2n+2 (n >= 1). Với n = 3, ta có C3H8 (Propan) là ankan.'
  },
  {
    id: 'q-chem-11-4',
    subject: 'Hóa',
    grade: '11',
    question: 'Chất chỉ thị quỳ tím sẽ chuyển sang màu gì khi tiếp xúc với dung dịch axit strong có pH < 4?',
    options: ['Màu hồng / đỏ', 'Màu xanh', 'Màu vàng', 'Không đổi màu'],
    correctIndex: 0,
    explanation: 'Trong môi trường axit (pH < 7), quỳ tím chuyển sang màu đỏ hoặc hồng tùy theo nồng độ.'
  },
  {
    id: 'q-chem-11-5',
    subject: 'Hóa',
    grade: '11',
    question: 'Anol etylic (ethanol) có công thức phân tử là:',
    options: ['CH3OH', 'C2H5OH', 'C3H7OH', 'CH3COOH'],
    correctIndex: 1,
    explanation: 'Ancol etylic (rượu uống thường) có công thức hóa học là C2H5OH.'
  },

  // ================= HÓA 12 =================
  {
    id: 'q-chem-12-1',
    subject: 'Hóa',
    grade: '12',
    question: 'Este nào sau đây có mùi chuối chín đặc trưng thường dùng trong công nghiệp thực phẩm?',
    options: ['Etyl axetat', 'Isoamyl axetat', 'Metyl fomat', 'Benzyl axetat'],
    correctIndex: 1,
    explanation: 'Isoamyl axetat (CH3COOCH2CH2CH(CH3)2) là este có mùi thơm ngọt đặc biệt giống như quả chuối chín.'
  },
  {
    id: 'q-chem-12-2',
    subject: 'Hóa',
    grade: '12',
    question: 'Khi thủy phân hoàn toàn tinh bột hoặc xenlulozơ rong môi trường axit, nông phẩm duy nhất thu được là:',
    options: ['Glucozơ', 'Fructozơ', 'Saccarozơ', 'Mantozơ'],
    correctIndex: 0,
    explanation: 'Cả tinh bột và xenlulozơ là polisaccarit được cấu tạo hoàn toàn từ các mắt xích glucozơ. Khi thủy phân hoàn toàn trong axit sẽ tạo ra đường đơn Glucozơ.'
  },
  {
    id: 'q-chem-12-3',
    subject: 'Hóa',
    grade: '12',
    question: 'Kim loại nào sau đây có khả năng dẫn điện tốt nhất ở điều kiện thường?',
    options: ['Đồng (Cu)', 'Bạc (Ag)', 'Vàng (Au)', 'Nhôm (Al)'],
    correctIndex: 1,
    explanation: 'Đặc trưng dẫn điện của các kim loại phổ biến giảm dần theo thứ tự: Ag > Cu > Au > Al > Fe. Bạc là nguyên tố dẫn điện tốt nhất.'
  },
  {
    id: 'q-chem-12-4',
    subject: 'Hóa',
    grade: '12',
    question: 'Chất nào dưới đây tham gia phản ứng màu biure với dung dịch Cu(OH)2 trong môi trường kiềm cho màu tím đặc trưng?',
    options: ['Glucozơ', 'Lòng trắng trứng (Protein)', 'Etyl axetat', 'Saccarozơ'],
    correctIndex: 1,
    explanation: 'Protein (lòng trắng trứng) chứa nhiều liên kết peptit (-CO-NH-) phản ứng với ion Đồng tạo phức chất đồng phối trí màu tím đặc trưng gọi là phản ứng màu biure.'
  },
  {
    id: 'q-chem-12-5',
    subject: 'Hóa',
    grade: '12',
    question: 'Phương pháp bảo vệ vỏ tàu đi biển bằng thép bằng cách gắn vào vỏ ngoài mảnh Kẽm (Zn) dựa trên cơ chế nào?',
    options: [
      'Bảo vệ bề mặt cơ học',
      'Ăn mòn điện hóa (Zn là kim loại hy sinh làm cực âm Anot)',
      'Bảo vệ hóa học trực tiếp',
      'Tạo ra chất kết tủa chống gỉ'
    ],
    correctIndex: 1,
    explanation: 'Zn có tính khử mạnh hơn Sắt (Fe) trong thép của tàu biển. Khi gắn chúng vào nhau và đặt trong môi trường nước biển điện li, kẽm trở thành Anot bị ăn mòn điện hóa hy sinh trước, sắt đóng vai trò Katot được bảo vệ an toàn.'
  },

  // ================= SINH 11 =================
  {
    id: 'q-bio-11-1',
    subject: 'Sinh',
    grade: '11',
    question: 'Cơ quan hấp thụ nước và ion khoáng chủ yếu ở thực vật trên cạn là:',
    options: ['Lá cây', 'Rễ cây (đặc biệt tế bào lông hút)', 'Thân cây', 'Hoa và quả'],
    correctIndex: 1,
    explanation: 'Rễ cây là cơ quan hút nước khoáng chủ yếu, trong đó các tế bào lông hút có diện tích tiếp xúc khổng lồ với đất thực hiện tốt vai trò hấp thụ chủ động và thụ động nhờ áp suất thẩm thấu.'
  },
  {
    id: 'q-bio-11-2',
    subject: 'Sinh',
    grade: '11',
    question: 'Pha sáng của quá trình quang hợp ở thực vật diễn ra tại cấu trúc nào trong lục lạp?',
    options: ['Chất nền (Stroma)', 'Màng thilacoit (Thylakoid)', 'Màng ngoài lục lạp', 'Không bào'],
    correctIndex: 1,
    explanation: 'Pha sáng là pha chuyển hóa năng lượng ánh sáng thành hóa năng ATP và NADPH, xảy ra trực tiếp tại màng thilacoit nơi chứa các hệ sắc tố diệp lục.'
  },
  {
    id: 'q-bio-11-3',
    subject: 'Sinh',
    grade: '11',
    question: 'Ở động vật đơn bào (ví dụ Amip, trùng giày), quá trình tiêu hóa thức ăn diễn ra theo hình thức nào?',
    options: ['Tiêu hóa ngoại bào trong dịch ruột', 'Tiêu hóa nội bào nhờ enzim từ lysosome', 'Tiêu hóa trong túi mật', 'Không có tiêu hóa'],
    correctIndex: 1,
    explanation: 'Vì cơ thể chỉ gồm một tế bào, động vật đơn bào thực bào thức ăn vào một túi không bào tiêu hóa, sau đó hòa nhập lysosome giải phóng enzim để tiêu hóa các chất hữu cơ ngay bên trong tế bào (tiêu hóa nội bào).'
  },
  {
    id: 'q-bio-11-4',
    subject: 'Sinh',
    grade: '11',
    question: 'Hệ tuần hoàn của côn trùng là hệ tuần hoàn gì và có đặc điểm gì?',
    options: [
      'Hệ tuần hoàn kín, áp lực máu đi nhanh',
      'Hệ tuần hoàn hở, máu chảy vào khoang cơ thể chứa dịch mô',
      'Hệ đơn, tim chỉ có 1 ngăn',
      'Không có hệ tuần hoàn, chỉ có hệ tuần hoàn nước'
    ],
    correctIndex: 1,
    explanation: 'Côn trùng có hệ tuần hoàn hở, máu từ tim bơm ra động mạch rồi chảy tràn vào các khoang cơ thể hòa lẫn dịch mô thành hỗn hợp để trao đổi chất trực tiếp với tế bào, sau đó được hút ngược về tim qua các lỗ tim.'
  },
  {
    id: 'q-bio-11-5',
    subject: 'Sinh',
    grade: '11',
    question: 'Phản ứng cụp lá nhanh chóng của cây Trinh nữ (mắc cỡ) khi chạm tay vào là biểu hiện của loại cảm ứng nào?',
    options: ['Hướng sáng dương', 'Ứng động không sinh trưởng (sức trương nước)', 'Hướng trọng lực âm', 'Ứng động sinh trưởng tuần hoàn'],
    correctIndex: 1,
    explanation: 'Phản ứng cụp lá của cây trin nữ là ứng động không sinh trưởng do biến động sức trương nước tức thì trong tế bào gốc lá kích hoạt khi va chạm.'
  },

  // ================= SINH 12 =================
  {
    id: 'q-bio-12-1',
    subject: 'Sinh',
    grade: '12',
    question: 'Thông tin di truyền được đọc liên tục theo từng bộ ba không gối lên nhau trên mARN là biểu hiện của đặc điểm nào của mã di truyền?',
    options: ['Tính liên tục', 'Tính đặc hiệu', 'Tính thoái hóa', 'Tính phổ biến'],
    correctIndex: 0,
    explanation: 'Mã di truyền có tính liên tục, nghĩa là được đọc từ một điểm xác định theo từng bộ ba liên tục, không chồng gối lên nhau.'
  },
  {
    id: 'q-bio-12-2',
    subject: 'Sinh',
    grade: '12',
    question: 'Quá trình nhân đôi ADN (tự sao) tuân theo hai nguyên tắc cốt lõi nào?',
    options: [
      'Nguyên tắc bổ sung và nguyên tắc bán bảo tồn',
      'Nguyên tắc bảo toàn và nguyên tắc phân ly',
      'Nguyên tắc bổ sung và nguyên tắc một chiều',
      'Nguyên tắc tự do và nguyên tắc thụ động'
    ],
    correctIndex: 0,
    explanation: 'Quá trình nhân đôi ADN diễn ra dựa trên nguyên tắc bổ sung (A liên kết T, G liên kết X) và nguyên tắc bán bảo tồn (mỗi phân tử ADN con giữ lại một mạch cũ làm khuôn và tổng hợp một mạch mới).'
  },
  {
    id: 'q-bio-12-3',
    subject: 'Sinh',
    grade: '12',
    question: 'Dạng đột biến cấu trúc nhiễm sắc thể nào có vai trò quan trọng trong việc tăng số lượng sản phẩm của một loài gen nhất định?',
    options: ['Mất đoạn', 'Lặp đoạn', 'Đảo đoạn', 'Chuyển đoạn'],
    correctIndex: 1,
    explanation: 'Lặp đoạn nhiễm sắc thể làm tăng số lượng bản sao của gen, giúp tăng cường sản sinh loại prôtêin cấu tạo nên chất lượng hoặc hoạt chất đặc thù.'
  },
  {
    id: 'q-bio-12-4',
    subject: 'Sinh',
    grade: '12',
    question: 'Mendel cho lai tự thụ đời F1 dị hợp Aa, tỉ lệ kiểu hình trội : lặn lý thuyết ở thế hệ F2 là:',
    options: ['1 : 1', '3 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1'],
    correctIndex: 1,
    explanation: 'Lai Aa x Aa cho đời con kiểu gen tỷ lệ: 1AA : 2Aa : 1aa. Với tính trội hoàn toàn, kiểu gen AA và Aa biểu hiện kiểu hình trội (tổng 3/4), aa biểu hiện kiểu hình lặn (1/4). Vậy tỷ lệ là 3 : 1.'
  },
  {
    id: 'q-bio-12-5',
    subject: 'Sinh',
    grade: '12',
    question: 'Bằng chứng tiến hóa nào được xem là trực tiếp và tin cậy nhất để chứng minh nguồn gốc của sinh giới?',
    options: [
      'Bằng chứng giải phẫu so sánh',
      'Bằng chứng sinh học phân tử (tương đồng ADN và protein)',
      'Bằng chứng cổ sinh vật học (các hóa thạch)',
      'Bằng chứng địa lí sinh vật học'
    ],
    correctIndex: 2,
    explanation: 'Hóa thạch (bằng chứng cổ sinh vật học) là di tích thực tế của sinh vật cổ đại còn lưu giữ lại trong lòng đất, cung cấp bằng chứng trực tiếp và xác thực nhất về sự phát triển tiến hóa lịch sử của sinh giới.'
  },

  // ================= VẬT LÝ 11 =================
  {
    id: 'q-phy-11-1',
    subject: 'Lý',
    grade: '11',
    question: 'Một vật dao động điều hòa với phương trình x = 5*cos(4πt) (cm). Biên độ A và tần số f của dao động là bao nhiêu?',
    options: [
      'A = 5 cm, f = 4 Hz',
      'A = 5 cm, f = 2 Hz',
      'A = 10 cm, f = 2 Hz',
      'A = 5 cm, f = 4π Hz'
    ],
    correctIndex: 1,
    explanation: 'Từ phương trình, biên độ A = 5 cm. Tần số góc omega = 4π rad/s. Tần số f = omega / (2π) = 4π / 2π = 2 Hz. Tận cùng ta có A = 5 cm, f = 2 Hz.'
  },
  {
    id: 'q-phy-11-2',
    subject: 'Lý',
    grade: '11',
    question: 'Định luật Cu-lông (Coulomb) mô tả lực tương tác tĩnh điện giữa hai điện tích điểm đặt trong môi trường chân không tỉ lệ nghịch với:',
    options: [
      'Tích độ lớn của hai điện tích',
      'Bình phương khoảng cách giữa hai điện tích',
      'Khoảng cách giữa hai điện tích',
      'Hằng số điện môi'
    ],
    correctIndex: 1,
    explanation: 'Công thức định luật Cu-lông: F = k * |q1 * q2| / r^2. Lực F tỉ lệ nghịch với bình phương khoảng cách r^2 giữa chúng.'
  },
  {
    id: 'q-phy-11-3',
    subject: 'Lý',
    grade: '11',
    question: 'Khi có hiện tượng giao thoa sóng nước từ hai nguồn kết hợp đồng pha, khoảng cách ngắn nhất giữa hai điểm cực đại giao thoa nằm trên đoạn nối hai nguồn là:',
    options: ['lambda', 'lambda/2', 'lambda/4', '2*lambda'],
    correctIndex: 1,
    explanation: 'Hai cực đại giao thoa kề nhau trên đoạn nối hai nguồn kết hợp cách nhau một khoảng bằng nửa bước sóng (λ/2).'
  },
  {
    id: 'q-phy-11-4',
    subject: 'Lý',
    grade: '11',
    question: 'Một sóng cơ học truyền dọc theo trục Ox có bước sóng lambda = 20 cm. Khoảng cách ngắn nhất giữa hai phần tử môi trường dao động ngược pha trên Ox là:',
    options: ['20 cm', '10 cm', '5 cm', '40 cm'],
    correctIndex: 1,
    explanation: 'Hai phần tử dao động ngược pha nhau gần nhất trên cùng một phương truyền sóng cách nhau một khoảng bằng nửa bước sóng λ/2 = 20 / 2 = 10 cm.'
  },
  {
    id: 'q-phy-11-5',
    subject: 'Lý',
    grade: '11',
    question: 'Suất điện động của một nguồn điện (pin, ắc quy) là đại lượng đặc trưng cho khả năng gì của nguồn điện?',
    options: [
      'Khả năng tích lũy điện tích',
      'Khả năng thực hiện công thúc đẩy điện tích dịch chuyển (nhờ lực lạ)',
      'Khả năng tỏa nhiệt tỏa sức nóng',
      'Khả năng ngăn cản dòng điện'
    ],
    correctIndex: 1,
    explanation: 'Suất điện động (ký hiệu E hoặc \u2130) là đại lượng đặc trưng cho khả năng thực hiện công của các lực lạ bên trong nguồn điện thúc đẩy các điện tích di chuyển tuần hoàn.'
  },

  // ================= VẬT LÝ 12 =================
  {
    id: 'q-phy-12-1',
    subject: 'Lý',
    grade: '12',
    question: 'Biên độ của dao động cưỡng bức đạt giá trị cực đại khi xảy ra hiện tượng gì?',
    options: ['Hiện tượng tự dao động', 'Hiện tượng cộng hưởng', 'Hiện tượng tắt dần', 'Hiện tượng sóng dừng'],
    correctIndex: 1,
    explanation: 'Khi tần số ngoại lực cưỡng bức tiệm cận bằng tần số dao động riêng của hệ, biên độ dao động vọt lên đạt giá trị cực đại gọi là hiện tượng cộng hưởng.'
  },
  {
    id: 'q-phy-12-2',
    subject: 'Lý',
    grade: '12',
    question: 'Mạch dao động điện từ lý tưởng LC đang thực hiện dao động tự do có chu kỳ riêng T tính bằng công thức:',
    options: ['T = 2π * căn(LC)', 'T = 2π / căn(LC)', 'T = căn(LC)', 'T = 1 / (2π * căn(LC))'],
    correctIndex: 0,
    explanation: 'Tần số góc riêng là omega = 1/căn(LC) suy ra chu kỳ riêng T = 2π/omega = 2π * căn(LC).'
  },
  {
    id: 'q-phy-12-3',
    subject: 'Lý',
    grade: '12',
    question: 'Trong hiện tượng giao thoa ánh sáng (thí nghiệm Y-âng), khoảng vân i được tính bằng công thức nào?',
    options: ['i = a * D / lambda', 'i = lambda * D / a', 'i = lambda * a / D', 'i = a * d / D'],
    correctIndex: 1,
    explanation: 'Khoảng vân i là khoảng cách giữa hai vân sáng kề nhau, được tính bằng công thức i = λ * D / a.'
  },
  {
    id: 'q-phy-12-4',
    subject: 'Lý',
    grade: '12',
    question: 'Hiện tượng quang điện ngoài xảy ra khi ánh sáng kích thích chiếu vào kim loại đáp ứng điều kiện nào?',
    options: [
      'Cường độ ánh sáng cực mạnh',
      'Bước sóng của ánh sáng kích thích lambda ngắn hơn hoặc bằng giới hạn quang điện lambda0 của kim loại',
      'Nhiệt độ tấm kim loại rất cao',
      'Tập trung chiếu trong thời gian rất lâu'
    ],
    correctIndex: 1,
    explanation: 'Theo định luật giới hạn quang điện, hiện tượng quang điện ngoài xảy ra khi bước sóng ánh sáng kích thích λ nhỏ hơn hoặc bằng giới hạn quang điện λ0 đặc trưng của kim loại đó (λ <= λ0).'
  },
  {
    id: 'q-phy-12-5',
    subject: 'Lý',
    grade: '12',
    question: 'Hạt nhân nguyên tử đại lượng nào sau đây quyết định tính bền vững của hạt nhân?',
    options: ['Số prôtôn', 'Năng lượng liên kết riêng (năng lượng liên kết chia cho số khối)', 'Năng lượng liên kết toàn phần', 'Độ hụt khối lượng'],
    correctIndex: 1,
    explanation: 'Năng lượng liên kết riêng (Wlkr = Wlk / A) đặc trưng cho độ bền vững của hạt nhân. Năng lượng liên kết riêng càng cao thì hạt nhân càng bền vững (bền nhất là các hạt nhân sắt, coban, niken... có số khối A từ 50 đến 95).'
  }
];

/**
 * Procedural variation function to create up to 100 questions.
 * It selects matching curated questions first, and if more are needed, 
 * it programmatically clones and extends them with varied variables 
 * to provide a high-quality endless custom quiz without throwing index errors.
 */
export function generateQuizQuestions(
  subject: string,
  grade: string,
  count: number
): QuizQuestion[] {
  // Filter base curated questions
  let pool = CURATED_QUESTIONS.filter((q) => {
    const matchSubject = subject === 'Tất cả' || q.subject === subject;
    const matchGrade = grade === 'Tất cả' || q.grade === grade;
    return matchSubject && matchGrade;
  });

  // If the pool is empty, fall back to all curated questions
  if (pool.length === 0) {
    pool = [...CURATED_QUESTIONS];
  }

  // Shuffle pool
  let result: QuizQuestion[] = [...pool].sort(() => 0.5 - Math.random());

  // If requested count is less than pool size, trim it
  if (count <= result.length) {
    return result.slice(0, count);
  }

  // If requested count is larger, we programmatically duplicate with variations
  const iterationsNeeded = Math.ceil(count / result.length);
  const extendedResult: QuizQuestion[] = [];

  for (let i = 0; i < iterationsNeeded; i++) {
    const run = result.map((q, idx) => {
      if (i === 0) return { ...q }; // Keep original on first run

      // Otherwise we introduce variables variation based on index and iteration
      const newId = `${q.id}-var-${i}`;
      let question = q.question;
      let options = [...q.options];
      let explanation = q.explanation;
      const correctIndex = q.correctIndex;

      // Programmatic math variations
      if (q.id === 'q-math-11-1') {
        const factor = 1 + i;
        question = `Chu kỳ tuần hoàn của hàm số y = cos(${factor * 3}x) là:`;
        options = [`2π`, `2π/${factor * 3}`, `π/${factor * 3}`, `2π/5`];
        explanation = `Hàm số y = cos(ax) tuần hoàn với chu kỳ T = 2π/|a|. Với a = ${factor * 3}, chu kỳ là T = 2π/${factor * 3}.`;
      } else if (q.id === 'q-math-11-2') {
        const first = 2 * (i + 1);
        question = `Cho cấp số nhân lùi vô hạn có số hạng đầu u1 = ${first} và công bội q = 1/2. Tổng S của cấp số nhân này là:`;
        options = [`S = ${first * 2}`, `S = ${first + 1}`, `S = ${first}`, `S = 1`];
        explanation = `Tổng của cấp số nhân lùi vô hạn tính bằng công thức S = u1 / (1 - q). Ở đây S = ${first} / (1 - 1/2) = ${first * 2}.`;
      } else if (q.id === 'q-math-12-2') {
        const factor = 3 + i;
        question = `Đường tiệm cận ngang của đồ thị hàm số y = (${factor}x + 1) / (x - 1) là:`;
        options = [`y = ${factor}`, `x = 1`, `y = -1`, `x = ${factor}`];
        explanation = `Giới hạn của y khi x tiến ra vô cùng là lim (${factor}x+1)/(x-1) = ${factor}. Do đó y = ${factor} là đường tiệm cận ngang.`;
      } else if (q.id === 'q-math-12-5') {
        const a = 3 + i;
        const b = 4;
        const mod = Math.sqrt(a * a + b * b);
        if (Number.isInteger(mod)) {
          question = `Môđun của số phức z = ${a} - ${b}i là:`;
          options = [`|z| = ${a + b}`, `|z| = ${mod}`, `|z| = 1`, `|z| = ${mod * mod}`];
          explanation = `Môđun của số phức z = a + bi là |z| = căn(a^2 + b^2). Với z = ${a} - ${b}i, |z| = căn(${a}^2 + (-${b})^2) = ${mod}.`;
        }
      } else if (q.id === 'q-chem-11-4') {
        const ph = 1 + i;
        question = `Chất chỉ thị quỳ tím sẽ chuyển sang màu gì khi tiếp xúc với dung dịch axit strong có pH = ${ph}?`;
        options = ['Màu hồng / đỏ', 'Màu xanh', 'Màu vàng', 'Không đổi màu'];
        explanation = `Trong môi trường axit (pH = ${ph} < 7), quỳ tím chuyển sang màu đỏ hoặc hồng đặc trưng.`;
      } else if (q.id === 'q-phy-11-1') {
        const amp = 5 + i;
        question = `Một vật dao động điều hòa với phương trình x = ${amp}*cos(4πt) (cm). Biên độ A và tần số f của dao động là bao nhiêu?`;
        options = [
          `A = ${amp} cm, f = 4 Hz`,
          `A = ${amp} cm, f = 2 Hz`,
          `A = ${amp * 2} cm, f = 2 Hz`,
          `A = ${amp} cm, f = 4π Hz`
        ];
        explanation = `Từ phương trình, biên độ A = ${amp} cm. Tần số góc omega = 4π rad/s. Tần số f = omega / (2π) = 4π / 2π = 2 Hz.`;
      } else {
        // General variation banner to ensure uniqueness
        question = `[Bộ đề số ${i + 1}] ${q.question}`;
      }

      return {
        id: newId,
        subject: q.subject,
        grade: q.grade,
        question,
        options,
        correctIndex,
        explanation
      };
    });
    extendedResult.push(...run);
  }

  return extendedResult.slice(0, count);
}
