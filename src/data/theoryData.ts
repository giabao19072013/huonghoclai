export const THEORY_DATA: Record<string, string> = {
  // === TOÁN 11 ===
  'math-11-ch1-b1': `### 1. Khái Niệm Hàm Số lượng Giác
- **Hàm số tuần hoàn:** Hàm số y = f(x) xác định trên tập hợp D được gọi là tuần hoàn nếu tồn tại một số T khác 0 sao cho với mọi x thuộc D:
  + x + T thuộc D và x - T thuộc D
  + f(x+T) = f(x)
- **Chu kỳ tuần hoàn T nhỏ nhất:**
  + Hàm số y = sin(ax+b) và y = cos(ax+b) tuần hoàn với chu kỳ T = 2*pi/|a|.
  + Hàm số y = tan(ax+b) và y = cot(ax+b) tuần hoàn với chu kỳ T = pi/|a|.

### 2. Định Nghĩa Và Tập Xác Định
- **Hàm số y = sin x:** Tập xác định D = R, tập giá trị T = [-1; 1]. Là hàm số lẻ, đồ thị nhận gốc tọa độ O làm tâm đối xứng.
- **Hàm số y = cos x:** Tập xác định D = R, tập giá trị T = [-1; 1]. Là hàm số chẵn, đồ thị đối xứng qua trục tung Oy.
- **Hàm số y = tan x:** Tập xác định D = R \\ {pi/2 + k*pi, k thuộc Z}. Là hàm số lẻ.
- **Hàm số y = cot x:** Tập xác định D = R \\ {k*pi, k thuộc Z}. Là hàm số lẻ.

### 3. Công Thức lượng Giác Trọng Tâm Ôn Thi
- **Các đẳng thức cơ bản:**
  + sin^2(x) + cos^2(x) = 1
  + 1 + tan^2(x) = 1 / cos^2(x) (x khác pi/2 + k*pi)
  + 1 + cot^2(x) = 1 / sin^2(x) (x khác k*pi)
  + tan x * cot x = 1
- **Công thức cộng:**
  + sin(a +- b) = sin a * cos b +- cos a * sin b
  + cos(a +- b) = cos a * cos b -+ sin a * sin b
  + tan(a +- b) = (tan a +- tan b) / (1 -+ tan a * tan b)`,

  'math-11-ch1-b2': `### 1. Phương Trình Lượng Giác Cơ Bản
- **Phương trình sin x = m:**
  + Nếu |m| > 1: Phương trình vô nghiệm.
  + Nếu |m| <= 1: sin x = sin alpha <=> x = alpha + k*2*pi hoặc x = pi - alpha + k*2*pi (k thuộc Z)
  + Trường hợp đặc biệt:
    * sin x = 0 <=> x = k*pi
    * sin x = 1 <=> x = pi/2 + k*2*pi
    * sin x = -1 <=> x = -pi/2 + k*2*pi

- **Phương trình cos x = m:**
  + Nếu |m| > 1: Phương trình vô nghiệm.
  + Nếu |m| <= 1: cos x = cos alpha <=> x = +-alpha + k*2*pi (k thuộc Z)
  + Trường hợp đặc biệt:
    * cos x = 0 <=> x = pi/2 + k*pi
    * cos x = 1 <=> x = k*2*pi
    * cos x = -1 <=> x = pi + k*2*pi

- **Phương trình tan x = m <=> x = arctan m + k*pi (k thuộc Z)**
- **Phương trình cot x = m <=> x = arccot m + k*pi (k thuộc Z)**

### 2. Phương Trình Bậc Nhất Đối Với sin x và cos x (Dạng a*sin x + b*cos x = c)
- **Điều kiện có nghiệm:** a^2 + b^2 >= c^2.
- **Phương pháp giải:** Chia hai vế cho căn(a^2 + b^2). Đưa về dạng sin(x + alpha) = c / căn(a^2 + b^2) (với cos alpha = a/căn(a^2 + b^2) và sin alpha = b/căn(a^2 + b^2)).`,

  'math-11-ch2-b1': `### 1. Khái Niệm Dãy Số
- Mỗi hàm số u: n* -> R được gọi là một dãy số vô hạn. Ký hiệu (un).
- Dãy số tăng: u(n+1) > un với mọi n thuộc N*.
- Dãy số giảm: u(n+1) < un với mọi n thuộc N*.
- Dãy số bị chặn: Tồn tại số M và m sao cho m <= un <= M với mọi n thuộc N*.

### 2. Cấp Số Cộng (CSC)
- **Định nghĩa:** u(n+1) = un + d (trong đó d là công sai).
- **Số hạng tổng quát:** un = u1 + (n-1)*d (với n >= 2).
- **Tính chất đối xứng:** uk = (u(k-1) + u(k+1)) / 2 (với k >= 2).
- **Tổng n số hạng đầu tiên:** Sn = n*(u1 + un)/2 = n*(2*u1 + (n-1)*d)/2.

### 3. Cấp Số Nhân (CSN)
- **Định nghĩa:** u(n+1) = un * q (trong đó q là công bội).
- **Số hạng tổng quát:** un = u1 * q^(n-1) (với n >= 2).
- **Tính chất đối xứng:** uk^2 = u(k-1) * u(k+1) (với k >= 2).
- **Tổng n số hạng đầu tiên (q khác 1):** Sn = u1 * (1 - q^n) / (1 - q).
- **Cấp số nhân lùi vô hạn (|q| < 1):** S = u1 / (1 - q).`,

  'math-11-ch5-b1': `### 1. Định Nghĩa Đạo Hàm
- Cho hàm số y = f(x) xác định trên khoảng (a;b). Đạo hàm tại x0 thuộc (a;b) là:
  f'(x0) = lim (f(x0 + Dx) - f(x0)) / Dx khi Dx tiến về 0.

### 2. Ý Nghĩa Hình Học Của Đạo Hàm
- Đạo hàm f'(x0) là hệ số góc k của tiếp tuyến với đồ thị (C) của hàm số tại điểm M0(x0; f(x0)).
- **Phương trình tiếp tuyến tại điểm M0(x0; y0):**
  y - y0 = f'(x0) * (x - x0)

### 3. Các Quy Tắc Tính Đạo Hàm Cơ Bản
- (u +- v)' = u' +- v'
- (u * v)' = u'*v + u*v'
- (u / v)' = (u'*v - u*v') / v^2 (v khác 0)
- Đạo hàm của hàm hợp: y'_x = y'_u * u'_x

### 4. Đạo Hàm Của Một Số Hàm Số Thường Gặp
- (x^n)' = n * x^(n-1)
- (căn x)' = 1 / (2 * căn x)
- (sin x)' = cos x; (cos x)' = -sin x
- (tan x)' = 1 / cos^2(x) = 1 + tan^2(x)
- (cot x)' = -1 / sin^2(x) = -(1 + cot^2(x))`,

  // === HÓA 11 ===
  'chem-11-ch1-b1': `### 1. Khái Niệm Phản Ứng Thuận Nghịch
- **Phản ứng một chiều:** Phản ứng chỉ xảy ra theo một chiều từ chất tham gia thành sản phẩm.
- **Phản ứng thuận nghịch:** Phản ứng xảy ra đồng thời theo cả hai chiều trái ngược nhau trong cùng một điều kiện thiết lập. Ký hiệu bằng mũi tên hai chiều <=> (hoặc mũi tên hai chiều cân bằng).

### 2. Trạng Thái Cân Bằng Hóa Học
- Cân bằng hóa học là trạng thái của phản ứng thuận nghịch khi tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch (vt = vn).
- Cân bằng hóa học là một **cân bằng động**. Các chất vẫn phản ứng nhưng nồng độ không thay đổi.

### 3. Hằng Số Cân Bằng Kc
- Cho phản ứng: aA + bB <=> cC + dD
- Biểu thức hằng số cân bằng: Kc = ([C]^c * [D]^d) / ([A]^a * [B]^b) (Chỉ áp dụng cho các chất khí hoặc chất tan trong dung dịch, không tính chất rắn chiếm pha riêng biệt).
- Ý nghĩa: Kc lớn chứng tỏ hiệu suất phản ứng thuận cao. Kc chỉ phụ thuộc vào bản chất chất phản ứng và nhiệt độ.

### 4. Nguyên Lý Chuyển Dịch Cân Bằng Le Chatelier
- Một phản ứng đang ở trạng thái cân bằng nếu chịu một tác động từ bên ngoài như thay đổi nhiệt độ, nồng độ, áp suất, thì cân bằng sẽ dịch chuyển theo chiều làm giảm tác động bên ngoài đó.
  + **Nồng độ:** Thêm một chất, cân bằng dịch về phía tiêu thụ bớt chất đó.
  + **Áp suất (chỉ với hệ khí có thay đổi tổng số mol hơi):** Tăng áp suất chung, cân bằng dịch theo chiều làm giảm số mol khí (chiều giảm thể tích).
  + **Nhiệt độ:** 
    * Phản ứng thu nhiệt (Dr H > 0): tăng nhiệt độ, cân bằng dịch theo chiều thuận.
    * Phản ứng tỏa nhiệt (Dr H < 0): tăng nhiệt độ, cân bằng dịch theo chiều nghịch.
  + **Chất xúc tác:** Không làm dịch chuyển hằng số cân bằng, chỉ làm hệ nhanh đạt trạng thái cân bằng.`,

  'chem-11-ch1-b2': `### 1. Thuyết Điện Li Arenius
- **Chất điện li:** Chất khi tan trong nước phân li ra các ion dương và ion âm (ví dụ: axit, bazơ, muối).
- **Chất điện li mạnh:** Phân li hoàn toàn thành ion khi tan trong nước (axit mạnh: HCl, HNO3, H2SO4; bazơ mạnh: NaOH, KOH, Ba(OH)2; và hầu hết các muối tan). Biểu diễn bằng mũi tên một chiều ->.
- **Chất điện li yếu:** Chỉ phân li một phần rất nhỏ trong nước thành ion (axit yếu: CH3COOH, H2S, H2CO3; bazơ yếu: NH3; nước H2O). Biểu diễn bằng mũi tên hai chiều <=>.

### 2. Khái Niệm pH của Dung Dịch
- Tích số ion của nước ở 25 độ C: Kw = [H+] * [OH-] = 10^(-14).
- Công thức tính pH: 
  pH = -log[H+] => [H+] = 10^(-pH)
- Thang đo pH:
  + Môi trường axit: [H+] > 10^(-7) M <=> pH < 7.
  + Môi trường trung tính: [H+] = 10^(-7) M <=> pH = 7.
  + Môi trường kiềm: [H+] < 10^(-7) M <=> pH > 7.
- Giá trị liên hệ: pH + pOH = 14 (với pOH = -log[OH-]).

### 3. Chất Chỉ Thị Axit - Bazơ Thường Dùng
- Quỳ tím: Axit hóa đỏ, Bazơ hóa xanh.
- Phenolphtalein: Không màu gặp dung dịch bazơ thì chuyển sang màu hồng đậm / đỏ.`,

  'chem-11-ch4-b1': `### 1. Khái Niệm Khái Quát về Ankan
- Công thức chung: CnH(2n+2) (n >= 1).
- Là các hydrocarbon no, mạch hở. Trong phân tử chỉ có các liên kết đơn C-C và C-H bền vững (sigma).
- Các đồng phân: Chỉ có đồng phân mạch cacbon (tính từ C4H10 trở đi).

### 2. Tính Chất Hóa Học Đặc Trưng: Phản Ứng Thế Halogen
- Ankan phản ứng trực tiếp với Cl2 hoặc Br2 dưới điều kiện ánh sáng khuếch tán hoặc đun nóng.
- Cơ chế phản ứng thế: Thế gốc tự do (gồm 3 giai đoạn: Khơi mào khơi mạch, Phát triển mạch, Tắt mạch).
- **Quy tắc thế sế thế:** Halogen ưu tiên thế vào nguyên tử hydro ở cacbon bậc cao hơn (tạo ra sản phẩm thế chính có độ bền cao hơn).
  + Ví dụ: CH3-CH2-CH3 + Cl2 --(as)--> CH3-CHCl-CH3 (Sản phẩm chính) + CH3-CH2-CH2Cl (Sản phẩm phụ).

### 3. Phản Ứng Khác của Ankan
- Phản ứng Cracking (bẻ gãy mạch cacbon tạo hydrocarbon ngắn hơn).
- Phản ứng Đốt cháy hoàn toàn: 
  CnH(2n+2) + (3n+1)/2 O2 -> n CO2 + (n+1) H2O
  Đặc điểm: n H2O > n CO2 và số mol ankan phản ứng là n_ankan = n H2O - n CO2.`,

  // === TOÁN 12 ===
  'math-12-ch1-b1': `### 1. Tính Đơn Điệu Của Hàm Số
- Cho hàm số y = f(x) có đạo hàm trên khoảng K.
  + Nếu f'(x) >= 0 với mọi x thuộc K (và f'(x) = 0 tại một số hữu hạn điểm) thì hàm số đồng biến trên K.
  + Nếu f'(x) <= 0 với mọi x thuộc K (và f'(x) = 0 tại một số hữu hạn điểm) thì hàm số nghịch biến trên K.

### 2. Các Bước Xét Tính Đơn Điệu
1. Tìm tập xác định của hàm số.
2. Tính đạo hàm f'(x). Tìm các nghiệm của f'(x) = 0 hoặc tại đó không xác định.
3. Sắp xếp các nghiệm và lập bảng biến thiên.
4. Kết luận khoảng đồng biến, nghịch biến.

### 3. Cực Trị Của Hàm Số
- **Điều kiện cần để đạt cực trị:** Nếu đạt cực trị tại x0 và có đạo hàm tại đó thì f'(x0) = 0.
- **Điều kiện đủ để đạt cực trị (Quy tắc xét dấu đạo hàm):**
  + Nếu f'(x) đổi dấu từ dương sang âm khi qua điểm x0 thì x0 là điểm cực đại.
  + Nếu f'(x) đổi dấu từ âm sang dương khi qua điểm x0 thì x0 là điểm cực tiểu.
- **Quy tắc 2 (Sử dụng đạo hàm cấp 2):**
  + Nếu f'(x0) = 0 và f''(x0) < 0 -> x0 là điểm cực đại.
  + Nếu f'(x0) = 0 and f''(x0) > 0 -> x0 là điểm cực tiểu.`,

  'math-12-ch1-b2': `### 1. Định Nghĩa Giá Trị Lớn Nhất (GTLN) và Nhỏ Nhất (GTNN)
Cho hàm số y=f(x) xác định trên tập hợp D.
- Số M là GTLN của f(x) trên D nếu:
  + f(x) <= M với mọi x thuộc D.
  + Tồn tại ít nhất một điểm x0 thuộc D sao cho f(x0) = M.
- Số m là GTNN của f(x) trên D nếu:
  + f(x) >= m với mọi x thuộc D.
  + Tồn tại ít nhất một điểm x0 thuộc D sao cho f(x0) = m.

### 2. Phương PháP Tìm Trên Khoảng/Đoạn [a;b]
- Khi hàm số liên tục trên đoạn [a;b], nó chắc chắn đạt GTLN và GTNN.
- **Quy trình tính nhanh không cần lập bảng biến thiên:**
  1. Tính đạo hàm f'(x).
  2. Tìm các nghiệm x1, x2, ... thuộc [a;b] của f'(x)=0 hoặc không xác định.
  3. Tính các giá trị f(a), f(b), f(x1), f(x2), ...
  4. Số lớn nhất thu được là GTLN, số nhỏ nhất thu được là GTNN.`,

  // === HÓA 12 ===
  'chem-12-ch1-b1': `### 1. Định Nghĩa Este
- Khi thế nhóm -OH ở nhóm cacboxyl của axit cacboxylic bằng nhóm -OR' của ancol thì ta thu được hợp chất este.
- Công thức cấu tạo tổng quát của este đơn chức: R-COO-R' (với R' khác H, là gốc hydrocacbon).
- Este no, đơn chức, mạch hở: CnH(2n)O2 (n >= 2).

### 2. Đồng Phân Và Danh Pháp
- **Tên este** = Tên gốc ankyl R' + Tên gốc axit R-COO- (đuôi "at").
  + Ví dụ: CH3-COO-C2H5: Etyl axetat.
  + Ví dụ: H-COO-CH3: Metyl fomat.
  + Ví dụ: CH2=CH-COO-CH3: Metyl acrylat.
- **Đồng phân cấu tạo:** Cùng công thức phân tử este có thể có đồng phân của axit cacboxylic tương ứng.

### 3. Tính Chất Vật Lý
- Nhiệt độ sôi rất thấp so với axit và ancol tương ứng vì este không tạo được liên kết hydro giữa các phân tử.
- Thường nhẹ hơn nước, rất kém tan trong nước, hòa tan tốt nhiều chất hữu cơ khác.
- Có mùi thơm đặc trưng dễ chịu:
  + Isoamyl axetat (mùi chuối chín).
  + Etyl isovalerat (mùi táo).
  + Geranyl axetat (mùi hoa hồng).

### 4. Tính Chất Hóa Học Trọng Tâm
- **Phản ứng thủy phân trong môi trường axit (Thuận nghịch):**
  R-COO-R' + H2O <=> R-COOH + R'-OH (đúc nóng, axit xúc tác)
- **Phản ứng thủy phân trong môi trường kiềm (Xà phòng hóa - Một chiều):**
  R-COO-R' + NaOH -> R-COONa + R'-OH (đun nóng)
- **Phản ứng khử:** Este bị khử bởi LiAlH4 tạo ra ancol bậc 1.
- **Phản ứng trùng hợp:** Các este có liên kết đôi bất đối (C=C) có khả năng trùng hợp tạo polime.`,

  'chem-12-ch1-b2': `### 1. Định Nghĩa Chất Béo (Lipit)
- Chất béo là trieste của glixerol với các axit béo (các axit cacboxylic mạch thẳng, có số nguyên tử cacbon chẵn, từ 12 đến 24 cacbon). Gọi chung là triglixerit hoặc triaxylglixerol.
- Công thức chung: (R-COO)3 C3H5.

### 2. Axit Béo Thường Gặp Trong Đề Thi THPT Quốc Gia
- **Axit béo no (Mạch thẳng bền, chất béo dạng rắn như mỡ động vật):**
  + Axit Panmitic: C15H31COOH (M = 256). Triglyxerit: Tripalmitin (C15H31COO)3 C3H5.
  + Axit Stearic: C17H35COOH (M = 284). Triglyxerit: Tristearin (C17H35COO)3 C3H5.
- **Axit béo không no (Có liên kết đôi C=C, chất béo lỏng như dầu thực vật):**
  + Axit Oleic: C17H33COOH (M = 282, có 1 liên kết C=C). Triglyxerit: Triolein (C17H33COO)3 C3H5.
  + Axit Linoleic: C17H31COOH (M = 280, có 2 liên kết C=C).

### 3. Tính Chất Hóa Học Của Chất Béo
- **Thủy phân trong môi trường axit:** Tạo glixerol và axit béo tự do.
- **Thủy phân trong kiềm (Phản ứng xà phòng hóa - Một chiều):**
  (R-COO)3 C3H5 + 3 NaOH -> 3 R-COONa + C3H5(OH)3
  Sản phẩm muối natri của axit béo chính là xà phòng dùng trong cuộc sống.
- **Phản ứng cộng H2 vào gốc không no của chất béo lỏng:** Chuyển hóa dầu lỏng thành mỡ rắn (quá trình hydro hóa bơ nhân tạo).`,

  // === SINH 12 ===
  'bio-12-ch1-b1': `### 1. Cấu Trúc Của Gen
- Gen là một đoạn phân tử ADN mang thông tin mã hóa cho một sản phẩm nhất định (chuỗi pôlipeptit hoặc tARN, rARN).
- Cấu trúc chung của gen cấu trúc gồm 3 vùng định hình:
  + **Vùng điều hòa (đầu 3' của mạch mã gốc):** Mang tín hiệu khởi động quá trình phiên mã và điều hòa lượng sản phẩm của gen.
  + **Vùng mã hóa (ở giữa):** Mang thông tin mã hóa các axit amin. Ở sinh vật nhân sơ có vùng mã hóa liên tục (gen không phân mảnh). Ở sinh vật nhân thực có vùng mã hóa không liên tục (gen phân mảnh gồm các đoạn exon xen kẽ đoạn intron).
  + **Vùng kết thúc (đầu 5' của mạch mã gốc):** Mang tín hiệu chấm dứt quá trình phiên mã.

### 2. Mã Di Truyền
- Mã di truyền là mã bộ ba (đọc từ đầu 5' đến 3' của mARN). Có 4^3 = 64 bộ ba.
- Đặc điểm của mã di truyền:
  + **Tính liên tục:** Được đọc từ một điểm xác định, từng bộ ba một, không gối lên nhau.
  + **Tính đặc hiệu:** Một bộ ba chỉ mã hóa cho một loại axit amin duy nhất.
  + **Tính thoái hóa:** Nhiều bộ ba cùng mã hóa cho một loại axit amin (trừ hai bộ ba 5'AUG3' và 5'UGG3').
  + **Tính phổ biến:** Tất cả các loài sinh vật chung bảng mã di truyền.
- Các codon đặc biệt:
  + Codon mở đầu: 5'AUG3' (mã hóa cho Metionin ở nhân thực, Foocmin metionin ở nhân sơ).
  + Codon kết thúc: 5'UAA3', 5'UAG3', 5'UGA3' (không mã hóa axit amin).

### 3. Quá Trình Nhân Đôi ADN (Tự Sao)
- Diễn ra tại pha S của kỳ trung gian trong chu kỳ tế bào.
- Nguyên tắc nhân đôi: **Nguyên tắc bổ sung** (A-T, G-X) và **Nguyên tắc bán bảo tồn** (giữ lại một nửa mạch cũ).
- Các enzyme tham gia chính:
  + Helicase: Tháo xoắn phân tử ADN.
  + ARN pôlimerase (Primase): Tổng hợp đoạn mồi ARN.
  + ADN pôlimerase III: Lắp ráp các nuclêôtit tự do theo chiều sinh tổng hợp 5' -> 3'. Mạch mã gốc 3' -> 5' tổng hợp mạch mới liên tục. Mạch mã gốc 5' -> 3' tổng hợp mạch mới gián đoạn tạo ra các đoạn ngắn Okazaki, sau đó được enzyme ligase nối lại.`,

  // === LÝ 12 ===
  'phy-12-ch1-b1': `### 1. Phương Trình Dao Động Điều Hòa
- Định nghĩa: Dao động điều hòa là dao động trong đó li độ của vật là một hàm hình sin hoặc cosin theo thời gian.
- Phương trình li độ: 
  x = A * cos(omega * t + phi)
  Trong đó:
  + x: li độ của vật tại thời điểm t (cm, m).
  + A: Biên độ dao động (A > 0). Quỹ đạo chuyển động là một đoạn thẳng dài L = 2A.
  + omega: Tần số góc của dao động (rad/s, omega > 0).
  + omega * t + phi: Pha của dao động tại thời điểm t (rad).
  + phi: Pha ban đầu (rad).

### 2. Phương Trình Vận Tốc và Gia Tốc
- **Vận tốc v:** Là đạo hàm bậc nhất của li độ theo thời gian.
  v = x' = -omega * A * sin(omega * t + phi) = omega * A * cos(omega * t + phi + pi/2)
  + Tốc độ cực đại: vmax = omega * A (khi qua vị trí cân bằng).
  + Vận tốc nhanh pha hơn li độ một góc pi/2.
- **Gia tốc a:** Là đạo hàm bậc nhất của vận tốc, đạo hàm bậc hai của li độ.
  a = v' = x'' = -omega^2 * A * cos(omega * t + phi) = -omega^2 * x = omega^2 * A * cos(omega * t + phi + pi)
  + Gia tốc cực đại: amax = omega^2 * A (khi vật ở biên).
  + Gia tốc ngược pha với li độ và sớm pha hơn vận tốc một góc pi/2. Vectơ gia tốc luôn hướng về vị trí cân bằng.

### 3. Công Thức Độc Lập Với Thời Gian
- Hệ thức liên hệ: 
  A^2 = x^2 + (v^2 / omega^2) = (a^2 / omega^4) + (v^2 / omega^2)

### 4. Con Lắc Lò Xo và Con Lắc Đơn
- **Con lắc lò xo:**
  + Tần số góc: omega = căn(k/m).
  + Chu kỳ: T = 2 * pi * căn(m/k).
- **Con lắc đơn:**
  + Tần số góc: omega = căn(g/l).
  + Chu kỳ: T = 2 * pi * căn(l/g).`,

  // === TOÁN 12 BỔ SUNG ===
  'math-12-ch2-b1': `### 1. Định nghĩa Nguyên hàm
- Cho hàm số f(x) xác định trên khoảng K. Hàm số F(x) được gọi là nguyên hàm của f(x) trên K nếu:
  F'(x) = f(x) với mọi x thuộc K.
- Định lý: Nếu F(x) là một nguyên hàm của f(x) trên K thì mọi nguyên hàm của f(x) trên K đều có dạng G(x) = F(x) + C (với C là một hằng số tùy ý).

### 2. Các tính chất cơ bản
- \`S f'(x) dx = f(x) + C\`
- \`S [f(x) +- g(x)] dx = S f(x) dx +- S g(g) dx\`
- \`S k*f(x) dx = k * S f(x) dx\` (với k là hằng số khác 0).

### 3. Bảng nguyên hàm các hàm số sơ cấp thường gặp
- \`S x^alpha dx = (x^(alpha + 1)) / (alpha + 1) + C\` (với alpha khác -1).
- \`S (1/x) dx = ln|x| + C\`
- \`S e^x dx = e^x + C\`
- \`S a^x dx = a^x / ln a + C\` (với a > 0, a khác 1).
- \`S cos x dx = sin x + C\`
- \`S sin x dx = -cos x + C\`
- \`S (1/cos^2(x)) dx = tan x + C\`
- \`S (1/sin^2(x)) dx = -cot x + C\`

### 4. Phương pháp tính nguyên hàm cốt lõi
- **Phương pháp đổi biến số:** Đặt x = g(t) hoặc t = u(x) nhằm đưa nguyên hàm phức tạp về dạng cơ bản dễ tính hơn.
- **Phương pháp nguyên hàm từng phần:** 
  \`S u dv = u*v - S v du\`
  *Quy tắc ưu tiên đặt u:* "Nhất lốc, nhì đa, tam lượng, tứ mũ" (1. Hàm lôgarit, 2. Hàm đa thức, 3. Hàm lượng giác, 4. Hàm số mũ).`,

  // === HÓA 12 BỔ SUNG ===
  'chem-12-ch2-b1': `### 1. Khái quát về Cacbohiđrat
- Cacbohiđrat (gluxit, saccarit) là những hợp chất hữu cơ tạp chức và thường có công thức chung là Cn(H2O)m.
- Phân loại:
  + **Monosaccarit:** Không bị thủy phân nữa (ví dụ: Glucozơ, Fructozơ). Công thức phân tử: C6H12O6.
  + **Disaccarit:** Thủy phân ra 2 phân tử monosaccarit (ví dụ: Saccarozơ, Mantozơ). Công thức phân tử: C12H22O11.
  + **Polisaccarit:** Thủy phân ra nhiều phân tử monosaccarit (ví dụ: Tinh bột, Xenlulozơ). Công thức phân tử: (C6H10O5)n.

### 2. Glucozơ (C6H12O6)
- **Cấu tạo dạng mạch hở:** Là anđehit đơn chức và rượu 5 chức (pentahyđroxyanđehit). 
  Công thức cấu tạo mạch hở: CH2OH-[CHOH]4-CHO.
- Ở trạng thái tinh thể, glucozơ tồn tại chủ yếu ở hai dạng vòng: alpha-glucozơ và beta-glucozơ.
- **Tính chất hóa học tiêu biểu:**
  + *Tính chất của ancol đa chức (poliandol):* Phản ứng với Cu(OH)2 ở nhiệt độ thường tạo ra dung dịch phức màu xanh lam đặc trưng.
  + *Tính chất của anđehit:* 
    * Phản ứng tráng bạc với dung dịch AgNO3/NH3 dư tạo ra kết tủa Bạc sáng bóng. (1 mol Glucozơ -> 2 mol Ag kết tủa).
    * Phản ứng khử Cu(OH)2 bằng nhiệt độ tạo kết tủa đỏ gạch Cu2O.
    * Phản ứng làm mất màu dung dịch Brom dễ dàng.
  + *Phản ứng lên men rượu sinh học:*
    C6H12O6 --(lên men, 30-35°C)--> 2 C2H5OH + 2 CO2

### 3. Saccarozơ (C12H22O11)
- Là gốc alpha-glucozơ và beta-fructozơ liên kết với nhau qua nguyên tử oxi (không có nhóm chức anđehit -CHO tự do nên saccarozơ **không** có tính chất tráng bạc).
- **Tính chất hóa học:**
  + Phản ứng với Cu(OH)2 tạo dung dịch xanh lam (do có nhiều nhóm -OH kề nhau).
  + Phản ứng thủy phân trong môi trường axit hoặc nhờ enzim sinh học:
    Saccarozơ + H2O --(axit, t°)--> Glucozơ + Fructozơ`,

  'chem-12-ch3-b1': `### 1. Khái niệm và Phân loại Amin
- Khi thay thế một hay nhiều nguyên tử hydro trong phân tử NH3 bằng một hay nhiều gốc hydrocarbon, ta thu được hợp chất amin.
- Phân loại theo bậc amin (bằng số gốc hydrocarbon liên kết với nguyên tử nitơ):
  + Amin bậc 1: R-NH2 (ví dụ: Metylamin CH3NH2, Anilin C6H5NH2).
  + Amin bậc 2: R-NH-R' (ví dụ: Đimetylamin CH3-NH-CH3).
  + Amin bậc 3: R-N(R')-R'' (ví dụ: Trimetylamin (CH3)3N).

### 2. Tính chất vật lý và tính bazơ của Amin
- Các amin đầu dãy (metylamin, đimetylamin, trimetylamin, etylamin) là những chất khí, mùi khai khó chịu, độc hại, dễ tan trong nước.
- **Tính chất bazơ mạnh yếu tương đối:**
  + R-NH2 bền do lực hút electron của cation đẩy mật độ electron về N làm lực bazơ tăng.
  + **So sánh tính bazơ lực hút electron:** 
    Amin béo (CH3NH2) > NH3 > Amin thơm (C6H5NH2 - Anilin).
  + Anilin kém tan trong nước, không làm đổi màu quỳ tím, nhưng phản ứng cực nhạy với nước brom tạo kết tủa trắng đặc trưng:
    C6H5NH2 + 3 Br2 -> C6H2(Br)3NH2 (kết tủa trắng) + 3 HBr.

### 3. Amino Axit (Hợp chất tạp chức)
- Amino axit là loại hợp chất hữu cơ tạp chức, trong phân tử chứa đồng thời nhóm amino (-NH2) có tính bazơ và nhóm cacboxyl (-COOH) có tính axit.
- Công thức tổng quát: (H2N)x - R - (COOH)y.
- Lysin (x > y): Quỳ tím chuyển sang màu xanh.
- Axit Glutamic (x < y): Quỳ tím chuyển sang màu đỏ.
- Glyxin, Alanin, Valin (x = y): Không làm đổi màu quỳ tím.

### 4. Khái quát về Peptit
- Peptit là hợp chất chứa từ 2 đến 50 gốc alpha-amino axit liên kết với nhau bằng các liên kết peptit (-CO-NH-).
- Phản ứng màu biure: Từ tripeptit trở lên tác dụng với Cu(OH)2 trong môi trường kiềm tạo hợp chất màu tím đặc trưng (đipeptit **không** có phản ứng này).`,

  // === SINH 12 BỔ SUNG ===
  'bio-12-ch1-b2': `### 1. Quá trình Phiên mã (Tổng hợp ARN)
- **Nơi diễn ra:** Trong nhân tế bào (nhân thực) hoặc vùng nhân (nhân sơ), tại kì trung gian của chu kỳ tế bào.
- **Nguyên tắc:** Dựa trên mạch mã gốc 3' -> 5' của gen và theo nguyên tắc bổ sung (A gốc - U tự do, T gốc - A tự do, G gốc - X tự do, X gốc - G tự do).
- **Diễn biến chính:**
  1. Enzyme ARN pôlimerase bám vào vùng điều hòa làm gen tháo xoắn để lộ mạch mã gốc 3' -> 5'.
  2. ARN pôlimerase trượt dọc theo mạch mã gốc tổng hợp mạch mARN mới theo chiều 5' -> 3'.
  3. Khi enzyme di chuyển tới tín hiệu kết thúc thì dừng phiên mã, phân tử ARN được giải phóng.
- **Khác biệt nhân thực - nhân sơ:** mARN ở nhân sơ trực tiếp dịch mã. mARN ở nhân thực phải trải qua giai đoạn cắt bỏ các intron (đoạn không mã hóa) và nối các exon (đoạn mã hóa) lại với nhau để tạo mARN trưởng thành.

### 2. Quá trình Dịch mã (Tổng hợp Prôtêin)
- **Thành phần tham gia:** mARN (khuôn), tARN (vận chuyển axit amin), Ribôxôm, axit amin tự do, enzyme và năng lượng ATP.
- **Giai đoạn 1: Hoạt hóa axit amin**
  Axit amin + ATP -> Axit amin hoạt hóa + tARN -> Phức hợp aa-tARN.
- **Giai đoạn 2: Tổng hợp chuỗi pôlipeptit**
  + Tiểu đơn vị bé của ribôxôm gắn với mARN tại vị trí nhận biết đặc hiệu (chứa mã mở đầu 5'AUG3').
  + tARN mang axit amin mở đầu (Met hoặc fMet) có anticodon 3'UAX5' tiến vào bắt đôi bổ sung với codon mở đầu.
  + Tiểu đơn vị lớn của ribôxôm liên kết tạo thành ribôxôm hoàn chỉnh.
  + Các phức hợp aa-tARN tiếp theo tiến vào bắt cặp bổ sung codon-anticodon tạo liên kết peptit giữa các axit amin kề nhau.
  + Ribôxôm dịch chuyển một bộ ba tiếp theo dọc mARN theo chiều 5' -> 3'. Khi ribôxôm tiếp xúc với bộ ba kết thúc (UAA, UAG, UGA), quá trình dịch mã hoàn thành. Chuỗi pôlipeptit được giải phóng và enzyme cắt bỏ axit amin mở đầu để tạo prôtêin hoạt tính hoàn chỉnh.

### 3. Điều hòa Hoạt động Gen (Mô hình Opêron Lac)
- **Opêron Lac ở vi khuẩn E.coli gồm:**
  + **Vùng vận hành (O):** Nơi prôtêin ức chế bám vào để ngăn cản quá trình phiên mã.
  + **Vùng khởi động (P):** Nơi enzyme ARN pôlimerase bám vào để khởi đầu phiên mã.
  + **Nhóm gen cấu trúc (Z, Y, A):** Tổng hợp enzyme phân giải đường lactose.
- **Cơ chế khi không có Lactose:** Gen điều hòa (R) tổng hợp prôtêin ức chế bám vào vùng O ngăn cản phiên mã, nhóm gen cấu trúc không hoạt động.
- **Cơ chế khi có Lactose:** Lactose liên kết làm biến đổi cấu trúc prôtêin ức chế khiến nó không bám vào vùng O được. ARN pôlimerase tiến hành phiên mã tạo enzyme phân giải lactose.`,

  // === LÝ 12 BỔ SUNG ===
  'phy-12-ch3-b1': `### 1. Khái niệm Dòng điện xoay chiều
- Dòng điện xoay chiều là dòng điện có cường độ biến thiên điều hòa theo thời gian theo quy luật hàm số cosin hoặc sin.
- **Cường độ dòng điện tức thời:** 
  i = I0 * cos(omega * t + phi_i)
  Trong đó:
  + I0 > 0: Cường độ dòng điện cực đại.
  + i: Cường độ dòng điện tại thời điểm t (A).
- **Cường độ dòng điện hiệu dụng (Giá trị đo bằng ampe kế):**
  I = I0 / căn(2)
  Tương tự cho các đại lượng hiệu dụng khác: U = U0 / căn(2), E = E0 / căn(2).

### 2. Nguyên tắc tạo ra dòng diện xoay chiều
- Dựa trên hiện tượng **Cảm ứng điện từ**.
- Cho một cuộn dây có N vòng, diện tích S quay đều với tốc độ góc omega xung quanh một trục đối xứng vuông góc với đường sức của một từ trường đều B.
- Từ thông qua cuộn dây biến thiên: Phi = N * B * S * cos(omega * t)
- Suất điện động cảm ứng sinh ra trong cuộn dây: 
  e = -Phi' = N * B * S * omega * sin(omega * t) = E0 * cos(omega * t - pi/2)

### 3. Các loại đoạn mạch xoay chiều cơ bản
- **Đoạn mạch chỉ có điện trở thuần R:** u_R và i **cùng pha** (phi_u = phi_i). Cường độ hiệu dụng I = U/R.
- **Đoạn mạch chỉ có cuộn cảm thuần L:** u_L **sớm pha hơn i một góc pi/2**.
  + Cảm kháng: ZL = omega * L (đơn vị Ohm). ZL cản trở dòng điện xoay chiều, tần số càng cao cản trở càng mạnh.
  + Định luật Ohm: I = U / ZL.
- **Đoạn mạch chỉ có tụ điện C:** u_C **trễ pha hơn i một góc pi/2**.
  + Dung kháng: ZC = 1 / (omega * C) (đơn vị Ohm). ZC cản trở, tần số cao thì cản trở kém (cho dòng điện cao tần đi qua dễ dàng).
  + Định luật Ohm: I = U / ZC.`
};
