export interface Lesson {
  id: string;
  title: string;
  grade: '11' | '12';
  subject: 'Toán' | 'Hóa' | 'Sinh' | 'Lý';
  chapter: string;
}

export const DEFAULT_LESSONS: Lesson[] = [
  // === LỚP 11 ===
  // TOÁN 11
  { id: 'math-11-ch1-b1', title: 'Hàm số lượng giác và phương trình lượng giác', grade: '11', subject: 'Toán', chapter: 'Chương 1: Hàm số lượng giác' },
  { id: 'math-11-ch1-b2', title: 'Phương trình lượng giác cơ bản', grade: '11', subject: 'Toán', chapter: 'Chương 1: Hàm số lượng giác' },
  { id: 'math-11-ch2-b1', title: 'Dãy số, Cấp số cộng và Cấp số nhân', grade: '11', subject: 'Toán', chapter: 'Chương 2: Dãy số & Cấp số' },
  { id: 'math-11-ch3-b1', title: 'Giới hạn của dãy số', grade: '11', subject: 'Toán', chapter: 'Chương 3: Giới hạn & Liên tục' },
  { id: 'math-11-ch3-b2', title: 'Hàm số liên tục', grade: '11', subject: 'Toán', chapter: 'Chương 3: Giới hạn & Liên tục' },
  { id: 'math-11-ch4-b1', title: 'Đường thẳng và mặt phẳng trong không gian', grade: '11', subject: 'Toán', chapter: 'Chương 4: Quan hệ song song' },
  { id: 'math-11-ch4-b2', title: 'Hai đường thẳng chéo nhau và song song', grade: '11', subject: 'Toán', chapter: 'Chương 4: Quan hệ song song' },
  { id: 'math-11-ch5-b1', title: 'Đạo hàm và quy tắc tính đạo hàm', grade: '11', subject: 'Toán', chapter: 'Chương 5: Đạo hàm' },

  // HÓA 11
  { id: 'chem-11-ch1-b1', title: 'Khái niệm về cân bằng hóa học', grade: '11', subject: 'Hóa', chapter: 'Chương 1: Cân bằng hóa học' },
  { id: 'chem-11-ch1-b2', title: 'Sự điện li và pH của dung dịch', grade: '11', subject: 'Hóa', chapter: 'Chương 1: Cân bằng hóa học' },
  { id: 'chem-11-ch2-b1', title: 'Nitơ và hợp chất của nitơ', grade: '11', subject: 'Hóa', chapter: 'Chương 2: Nitơ - Photpho' },
  { id: 'chem-11-ch2-b2', title: 'Photpho và axit photphoric', grade: '11', subject: 'Hóa', chapter: 'Chương 2: Nitơ - Photpho' },
  { id: 'chem-11-ch3-b1', title: 'Đại cương về hóa học hữu cơ', grade: '11', subject: 'Hóa', chapter: 'Chương 3: Hóa học hữu cơ' },
  { id: 'chem-11-ch4-b1', title: 'Ankan và phản ứng halogen hóa', grade: '11', subject: 'Hóa', chapter: 'Chương 4: Hydrocarbon' },
  { id: 'chem-11-ch4-b2', title: 'Anken và Ankin (Hydrocarbon không no)', grade: '11', subject: 'Hóa', chapter: 'Chương 4: Hydrocarbon' },
  { id: 'chem-11-ch5-b1', title: 'Ancol và Phenol', grade: '11', subject: 'Hóa', chapter: 'Chương 5: Dẫn xuất Halogen - Ancol' },

  // SINH 11
  { id: 'bio-11-ch1-b1', title: 'Trao đổi chất và chuyển hóa năng lượng ở thực vật', grade: '11', subject: 'Sinh', chapter: 'Chương 1: Trao đổi chất & Năng lượng' },
  { id: 'bio-11-ch1-b2', title: 'Hô hấp và quang hợp ở thực vật', grade: '11', subject: 'Sinh', chapter: 'Chương 1: Trao đổi chất & Năng lượng' },
  { id: 'bio-11-ch1-b3', title: 'Dinh dưỡng và tiêu hóa ở động vật', grade: '11', subject: 'Sinh', chapter: 'Chương 1: Trao đổi chất & Năng lượng' },
  { id: 'bio-11-ch1-b4', title: 'Hệ tuần hoàn và hô hấp ở động vật', grade: '11', subject: 'Sinh', chapter: 'Chương 1: Trao đổi chất & Năng lượng' },
  { id: 'bio-11-ch2-b1', title: 'Cảm ứng ở thực vật và hướng động', grade: '11', subject: 'Sinh', chapter: 'Chương 2: Cảm ứng' },
  { id: 'bio-11-ch2-b2', title: 'Cảm ứng ở động vật và truyền tin tin', grade: '11', subject: 'Sinh', chapter: 'Chương 2: Cảm ứng' },
  { id: 'bio-11-ch3-b1', title: 'Sinh trưởng và phát triển ở sinh vật', grade: '11', subject: 'Sinh', chapter: 'Chương 3: Sinh trưởng & Phát triển' },
  { id: 'bio-11-ch4-b1', title: 'Sinh sản ở thực vật và động vật', grade: '11', subject: 'Sinh', chapter: 'Chương 4: Sinh sản' },

  // LÝ 11
  { id: 'phy-11-ch1-b1', title: 'Dao động điều hòa và các đặc trưng', grade: '11', subject: 'Lý', chapter: 'Chương 1: Dao động' },
  { id: 'phy-11-ch1-b2', title: 'Năng lượng trong dao động điều hòa', grade: '11', subject: 'Lý', chapter: 'Chương 1: Dao động' },
  { id: 'phy-11-ch2-b1', title: 'Sóng cơ và sự truyền sóng', grade: '11', subject: 'Lý', chapter: 'Chương 2: Sóng' },
  { id: 'phy-11-ch2-b2', title: 'Giao thoa sóng và sóng dừng', grade: '11', subject: 'Lý', chapter: 'Chương 2: Sóng' },
  { id: 'phy-11-ch3-b1', title: 'Lực lượng điện và Thuyết điện tích', grade: '11', subject: 'Lý', chapter: 'Chương 3: Điện trường' },
  { id: 'phy-11-ch3-b2', title: 'Điện thế và Thế năng điện', grade: '11', subject: 'Lý', chapter: 'Chương 3: Điện trường' },
  { id: 'phy-11-ch4-b1', title: 'Dòng điện không đổi và Nguồn điện', grade: '11', subject: 'Lý', chapter: 'Chương 4: Dòng điện không đổi' },


  // === LỚP 12 ===
  // TOÁN 12
  { id: 'math-12-ch1-b1', title: 'Tính đơn điệu và cực trị của hàm số', grade: '12', subject: 'Toán', chapter: 'Chương 1: Khảo sát hàm số' },
  { id: 'math-12-ch1-b2', title: 'Giá trị lớn nhất và lớn nhất của hàm số', grade: '12', subject: 'Toán', chapter: 'Chương 1: Khảo sát hàm số' },
  { id: 'math-12-ch1-b3', title: 'Đường tiệm cận và Khảo sát đồ thị hàm số', grade: '12', subject: 'Toán', chapter: 'Chương 1: Khảo sát hàm số' },
  { id: 'math-12-ch2-b1', title: 'Nguyên hàm và các phương pháp tính', grade: '12', subject: 'Toán', chapter: 'Chương 2: Nguyên hàm & Tích phân' },
  { id: 'math-12-ch2-b2', title: 'Tích phân và ứng dụng diện tích, thể tích', grade: '12', subject: 'Toán', chapter: 'Chương 2: Nguyên hàm & Tích phân' },
  { id: 'math-12-ch3-b1', title: 'Hệ tọa độ trong không gian Oxyz', grade: '12', subject: 'Toán', chapter: 'Chương 3: Hình học Oxyz' },
  { id: 'math-12-ch3-b2', title: 'Phương trình mặt phẳng và đường thẳng', grade: '12', subject: 'Toán', chapter: 'Chương 3: Hình học Oxyz' },
  { id: 'math-12-ch4-b1', title: 'Khái niệm số phức và các phép toán', grade: '12', subject: 'Toán', chapter: 'Chương 4: Số phức' },

  // HÓA 12
  { id: 'chem-12-ch1-b1', title: 'Este - Cấu tạo, tính chất và điều chế', grade: '12', subject: 'Hóa', chapter: 'Chương 1: Este - Lipit' },
  { id: 'chem-12-ch1-b2', title: 'Lipit và chất béo, phản ứng xà phòng hóa', grade: '12', subject: 'Hóa', chapter: 'Chương 1: Este - Lipit' },
  { id: 'chem-12-ch2-b1', title: 'Glucozơ và Saccarozơ', grade: '12', subject: 'Hóa', chapter: 'Chương 2: Cacbohidrat' },
  { id: 'chem-12-ch2-b2', title: 'Tinh bột và Xenlulozơ', grade: '12', subject: 'Hóa', chapter: 'Chương 2: Cacbohidrat' },
  { id: 'chem-12-ch3-b1', title: 'Amin, Amino Axit và Peptit', grade: '12', subject: 'Hóa', chapter: 'Chương 3: Amin - Peptit' },
  { id: 'chem-12-ch4-b1', title: 'Đại cương về Polime và vật liệu Polime', grade: '12', subject: 'Hóa', chapter: 'Chương 4: Polime' },
  { id: 'chem-12-ch5-b1', title: 'Tính chất của kim loại và Dãy điện hóa', grade: '12', subject: 'Hóa', chapter: 'Chương 5: Đại cương kim loại' },
  { id: 'chem-12-ch5-b2', title: 'Ăn mòn kim loại và phương pháp bảo vệ', grade: '12', subject: 'Hóa', chapter: 'Chương 5: Đại cương kim loại' },

  // SINH 12
  { id: 'bio-12-ch1-b1', title: 'Gen, mã di truyền và quá trình nhân đôi ADN', grade: '12', subject: 'Sinh', chapter: 'Chương 1: Cơ chế di truyền & Biến dị' },
  { id: 'bio-12-ch1-b2', title: 'Phiên mã, dịch mã và điều hòa hoạt động gen', grade: '12', subject: 'Sinh', chapter: 'Chương 1: Cơ chế di truyền & Biến dị' },
  { id: 'bio-12-ch1-b3', title: 'Đột biến gen và đột biến nhiễm sắc thể', grade: '12', subject: 'Sinh', chapter: 'Chương 1: Cơ chế di truyền & Biến dị' },
  { id: 'bio-12-ch2-b1', title: 'Quy luật di truyền Men-đen (Phân li và Phân li độc lập)', grade: '12', subject: 'Sinh', chapter: 'Chương 2: Quy luật di truyền' },
  { id: 'bio-12-ch2-b2', title: 'Tương tác gen, tác động đa hiệu và di truyền liên kết', grade: '12', subject: 'Sinh', chapter: 'Chương 2: Quy luật di truyền' },
  { id: 'bio-12-ch3-b1', title: 'Di truyền học quần thể và trạng thái cân bằng Hardy-Weinberg', grade: '12', subject: 'Sinh', chapter: 'Chương 3: Di truyền quần thể' },
  { id: 'bio-12-ch4-b1', title: 'Ứng dụng di truyền học vào chọn giống', grade: '12', subject: 'Sinh', chapter: 'Chương 4: Ứng dụng di truyền' },
  { id: 'bio-12-ch5-b1', title: 'Bằng chứng và học thuyết tiến hóa học', grade: '12', subject: 'Sinh', chapter: 'Chương 5: Tiến hóa' },
  { id: 'bio-12-ch6-b1', title: 'Môi trường sống, nhân tố sinh thái và quần thể', grade: '12', subject: 'Sinh', chapter: 'Chương 6: Sinh thái học' },

  // LÝ 12
  { id: 'phy-12-ch1-b1', title: 'Dao động cơ học: Dao động điều hòa của con lắc', grade: '12', subject: 'Lý', chapter: 'Chương 1: Dao động cơ' },
  { id: 'phy-12-ch1-b2', title: 'Dao động tắt dần, dao động cưỡng bức, cộng hưởng', grade: '12', subject: 'Lý', chapter: 'Chương 1: Dao động cơ' },
  { id: 'phy-12-ch2-b1', title: 'Sóng cơ, phương trình sóng và giao thoa sóng', grade: '12', subject: 'Lý', chapter: 'Chương 2: Sóng cơ & Sóng âm' },
  { id: 'phy-12-ch3-b1', title: 'Đại cương về dòng điện xoay chiều', grade: '12', subject: 'Lý', chapter: 'Chương 3: Dòng điện xoay chiều' },
  { id: 'phy-12-ch3-b2', title: 'Mạch RLC nối tiếp và công suất tiêu thụ', grade: '12', subject: 'Lý', chapter: 'Chương 3: Dòng điện xoay chiều' },
  { id: 'phy-12-ch4-b1', title: 'Mạch dao động LC và sóng điện từ', grade: '12', subject: 'Lý', chapter: 'Chương 4: Dao động điện từ' },
  { id: 'phy-12-ch5-b1', title: 'Tán sắc ánh sáng và hiện tượng giao thoa ánh sáng', grade: '12', subject: 'Lý', chapter: 'Chương 5: Sóng ánh sáng' },
  { id: 'phy-12-ch6-b1', title: 'Hiện tượng quang điện và Thuyết lượng tử ánh sáng', grade: '12', subject: 'Lý', chapter: 'Chương 6: Lượng tử ánh sáng' },
  { id: 'phy-12-ch7-b1', title: 'Tính chất và cấu tạo hạt nhân nguyên tử', grade: '12', subject: 'Lý', chapter: 'Chương 7: Vật lý hạt nhân' }
];
