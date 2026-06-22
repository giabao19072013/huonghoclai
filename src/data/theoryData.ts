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
  + Định luật Ohm: I = U / ZC.`,

  // === THÊM CHI TIẾT LÝ THUYẾT CHO TẤT CẢ CÁC BÀI CÒN LẠI ===

  // === TOÁN LỚP 11 ===
  'math-11-ch3-b1': `### 1. Định nghĩa Giới hạn dãy số
- Ta nói dãy số (un) có giới hạn là 0 (khi n tiến tới vô cùng) nếu khoảng cách từ un đến 0 trở nên nhỏ tùy ý khi n đủ lớn. Ký hiệu: lim un = 0.
- Dãy số (un) có giới hạn là số thực L nếu lim (un - L) = 0. Ký hiệu: lim un = L.

### 2. Một số Giới hạn Đặc biệt
- lim 1/n^k = 0 với mọi k nguyên dương.
- lim q^n = 0 nếu |q| < 1.
- lim C = C (với C là hằng số).

### 3. Định lý về giới hạn hữu hạn
Nếu lim un = a và lim vn = b:
- lim (un + vn) = a + b
- lim (un - vn) = a - b
- lim (un * vn) = a * b
- lim (un/vn) = a/b (nếu b khác 0).

### 4. Tổng của cấp số nhân lùi vô hạn
Cấp số nhân lùi vô hạn có số hạng đầu u1 và công bội q thỏa mãn |q| < 1 có tổng là:
S = u1 / (1 - q)`,

  'math-11-ch3-b2': `### 1. Hàm số Liên tục tại một điểm
Cho hàm số y = f(x) xác định trên khoảng K và x0 thuộc K.
Hàm số y = f(x) được gọi là liên tục tại điểm x0 nếu:
lim f(x) khi x tiến về x0 = f(x0)

*Để xét tính liên tục tại điểm x0, cần đủ 3 bước:*
1. Tính f(x0).
2. Tìm lim f(x) khi x tiến về x0.
3. So sánh giới hạn tìm được với f(x0).

### 2. Hàm số Liên tục trên một khoảng / đoạn
- Hàm số liên tục trên khoảng nếu nó liên tục tại mọi điểm thuộc khoảng đó.
- Hàm số liên tục trên đoạn [a; b] nếu nó liên tục trên khoảng (a; b) và lim f(x) khi x tiến đến a+ = f(a), lim f(x) khi x tiến đến b- = f(b).

### 3. Định lý Giá trị Trung bình (Ứng dụng chứng minh nghiệm)
Nếu hàm số y = f(x) liên tục trên đoạn [a; b] và f(a) * f(b) < 0 thì tồn tại ít nhất một số c thuộc (a; b) sao cho f(c) = 0.
*(Ý nghĩa: Phương trình f(x) = 0 có ít nhất một nghiệm nằm trong khoảng (a; b))*.`,

  'math-11-ch4-b1': `### 1. Khái niệm Đường thẳng và Mặt phẳng
- Điểm, đường thẳng và mặt phẳng là các khái niệm cơ bản của hình học không gian.
- Để xác định một mặt phẳng, ta cần:
  + Qua 3 điểm không thẳng hàng.
  + Qua một đường thẳng và một điểm không thuộc đường thẳng đó.
  + Qua hai đường thẳng cắt nhau.
  + Qua hai đường thẳng song song.

### 2. Các Quy tắc Vẽ hình và Biểu diễn
- Đường thẳng song song vẽ song song, đường cắt vẽ cắt.
- Nét liền biểu diễn cho đường nhìn thấy, nét đứt biểu diễn cho đường bị che khuất.

### 3. Giao tuyến của hai mặt phẳng
Để tìm giao tuyến của hai mặt phẳng (P) và (Q), ta tìm hai điểm chung phân biệt A, B của chúng. Giao tuyến chính là đường thẳng AB.`,

  'math-11-ch4-b2': `### 1. Vị trí Tương đối của Hai đường thẳng
Trong không gian, hai đường thẳng a và b có thể thuộc một trong bốn trường hợp:
- **Cắt nhau:** Có 1 điểm chung duy nhất, đồng phẳng.
- **Song song:** Đồng phẳng và không có điểm chung.
- **Trùng nhau:** Có vô số điểm chung.
- **Chéo nhau:** Không đồng phẳng và không có điểm chung.

### 2. Tính chất Đường thẳng Song song
- Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì song song với nhau: a // c, b // c => a // b.
- **Định lý về giao tuyến song song (Định lý 3 đường song song):** Nếu ba mặt phẳng cắt nhau từng đôi một theo ba giao tuyến phân biệt thì ba giao tuyến đó hoặc đồng quy, hoặc đôi một song song.`,

  // === HÓA LỚP 11 ===
  'chem-11-ch2-b1': `### 1. Nguyên tố Nitơ (N, Z=7)
- Cấu hình electron: 1s^2 2s^2 2p^3. Trong tự nhiên, Nitơ tồn tại chủ yếu dạng khí N2 chiếm 78% thể tích không khí.
- Liên kết ba bền vững N=N khiến khí Nitơ cực kỳ trơ về mặt hóa học ở nhiệt độ thường. Ở nhiệt độ cao, Nitơ hoạt động hơn và thể hiện cả tính oxi hóa (tác dụng với kim loại, hiđro) và tính khử (tác dụng với oxi tạo NO).

### 2. Amoniac (NH3)
- Cấu trúc hình chóp tam giác, cực kỳ tan nhiều trong nước tạo dung dịch có tính bazơ yếu (làm quỳ hóa xanh, phenolphtalein hóa hồng).
- Có tính khử mạnh do Nitơ có số oxi hóa cực tiểu -3:
  4NH3 + 3O2 --(t°)--> 2N2 + 6H2O

### 3. Axit Nitric (HNO3)
- Là axit mạnh và là chất oxi hóa cực mạnh. Nó oxi hóa hầu hết kim loại (trừ Au, Pt) lên hóa trị cao nhất, không giải phóng H2 mà tạo sản phẩm khử như NO, NO2, N2O, NH4NO3.
- Ví dụ:
  3Cu + 8HNO3(loãng) -> 3Cu(NO3)2 + 2NO + 4H2O
  Cu + 4HNO3(đặc) -> Cu(NO3)2 + 2NO2 + 2H2O
- Hỗn hợp cường toan (1 thể tích HNO3 đặc và 3 thể tích HCl đặc) hòa tan được vàng.`,

  'chem-11-ch2-b2': `### 1. Nguyên tố Photpho (P, Z=15)
- Thù hình: Photpho trắng (rất độc, tự bốc cháy trong không khí ở 30 độ C) và Photpho đỏ (bền, không độc, phát quang khi đun nóng).
- Có độ hoạt động hóa học mạnh hơn Nitơ ở nhiệt độ thường.

### 2. Axit Photphoric (H3PO4)
- Là axit trung bình, ba nấc phân li trong nước:
  H3PO4 <=> H+ + H2PO4-
  H2PO4- <=> H+ + HPO4(2-)
  HPO4(2-) <=> H+ + PO4(3-)
- Không có tính oxi hóa mạnh như axit nitric. Tác dụng với dung dịch kiềm tùy tỷ lệ mol sinh ra 3 loại muối: muối đihiđrophotphat, hiđrophotphat, và photphat.

### 3. Phân bón hóa học quan trọng
- **Phân đạm:** Cung cấp dinh dưỡng Nitơ giúp cây sinh trưởng nhanh. Độ dinh dưỡng tính bằng %N.
- **Phân lân:** Cung cấp Photpho giúp rễ phát triển. Độ dinh dưỡng tính bằng %P2O5.
- **Phân kali:** Cung cấp Kali giúp chống rét, chống sâu bệnh. Độ dinh dưỡng tính bằng %K2O.`,

  'chem-11-ch3-b1': `### 1. Khái niệm Hợp chất Hữu cơ
- Hợp chất hữu cơ là hợp chất của Cacbon (trừ các oxit của cacbon, muối cacbonat, xianua, cacbua...).
- Cacbon luôn có hóa trị IV trong các hợp chất hữu cơ.

### 2. Phân loại hợp chất hữu cơ
- **Hiđrocacbon:** Chỉ chứa C và H (Ankan, Anken, Ankin, Hiđrocacbon thơm).
- **Dẫn xuất của hiđrocacbon:** Ngoài C, H còn có O, N, S, Cl... (Ancol, Axit, Este, Amin...).

### 3. Độ bất bão hòa (Chỉ số liên kết pi + vòng)
Đối với hợp chất có công thức CxHyOzNt:
k = (2x + 2 - y + t) / 2
- k = 0: Hợp chất no, mạch hở.
- k = 1: Có 1 liên kết đôi hoặc 1 vòng.
- k = 4: Có thể chứa vòng benzen.`,

  'chem-11-ch4-b2': `### 1. Anken (Olefin)
- Công thức chung: CnH2n (n >= 2), cấu trúc chứa 1 liên kết đôi C=C (gồm 1 liên kết sigma bền và 1 liên kết pi kém bền).
- Phản ứng đặc trưng:
  + **Phản ứng cộng:** Cộng H2, halogen (làm mất màu nước Brom), cộng HX (tuân theo quy tắc Markovnikov: H vào C có nhiều H hơn).
  + **Phản ứng trùng hợp:** Tạo polime (Ví dụ: Trùng hợp etilen tạo nhựa PE).
  + **Phản ứng oxi hóa:** Làm mất màu dung dịch thuốc tím KMnO4 ở nhiệt độ thường.

### 2. Ankin
- Công thức chung: CnH2n-2 (n >= 2), chứa 1 liên kết ba C=-C (gồm 1 liên kết sigma và 2 liên kết pi).
- Phản ứng hóa học tương tự anken ở tính chất không no.
- **Phản ứng thế kim loại (đặc trưng của Ank-1-in):** Có nguyên tử H linh động ở liên kết ba đầu mạch, phản ứng với AgNO3/NH3 tạo kết tủa vàng nhạt:
  CH=-CH + 2AgNO3 + 2NH3 -> CAg=-CAg + 2NH4NO3`,

  'chem-11-ch5-b1': `### 1. Ancol (Rượu)
- Là hợp chất hữu cơ có nhóm hiđroxyl (-OH) liên kết trực tiếp với nguyên tử cacbon no.
- **Ancol liên kết hiđro:** Có nhiệt độ sôi cao hơn hiđrocacbon và este tương đương do có liên kết hiđro liên phân tử. Tan vô hạn trong nước nếu mạch C ngắn.
- **Tính chất hóa học:**
  + Tác dụng với kim loại kiềm (Na, K) giải phóng H2.
  + Ancol đa chức có từ 2 nhóm -OH liền kề (glixerol, etilen glicol) hòa tan được Cu(OH)2 tạo dung dịch xanh lam thẫm.
  + Phản ứng tách nước: Tách nước ở 140 độ C tạo ete, tách ở 170 độ C (xúc tác H2SO4 đặc) tạo anken.

### 2. Phenol (C6H5OH)
- Hợp chất hữu cơ có nhóm -OH liên kết trực tiếp vào vòng benzen.
- Có tính axit rất yếu (yếu hơn H2CO3), không làm đổi màu quỳ tím nhưng tác dụng được với NaOH.
- Phản ứng thế vào vòng thơm cực dễ: Tác dụng nước Brom tạo kết tủa trắng 2,4,6-tribromphenol.`,

  // === SINH LỚP 11 ===
  'bio-11-ch1-b1': `### 1. Hấp thụ Nước và Khoáng ở Thực vật
- Rễ cây là cơ quan hấp thụ nước và khoáng chủ yếu. Tế bào lông hút ở rễ là nơi trực tiếp thực hiện quá trình này nhờ sự chênh lệch áp suất thẩm thấu (môi trường đất nhược trương, dịch tế bào lông hút ưu trương).
- Nước di chuyển theo cơ chế thu động (thầm thấu từ đất vào rễ), các ion khoáng di chuyển theo hai cơ chế: thụ động và chủ động (tiêu tốn ATP khi đi ngược chiều nồng độ).

### 2. Vận chuyển các chất trong cây
- **Dòng mạch gỗ (Xilem):** Vận chuyển nước và ion khoáng từ rễ lên lá. Động lực gồm: lực đẩy của rễ (áp suất rễ), lực kéo của thoát hơi nước ở lá (động lực chủ yếu), và lực liên kết giữa các phân tử nước.
- **Dòng mạch rây (Phloem):** Vận chuyển chất hữu cơ sản phẩm quang hợp từ lá xuống các cơ quan lưu trữ. Động lực là sự chênh lệch áp suất thẩm thấu giữa cơ quan nguồn và cơ quan chứa.

### 3. thoát hơi nước ở lá
- Diễn ra qua hai con đường: Qua khí khổng (con đường chủ yếu, có thể điều tiết nhanh qua độ mở khí khổng) và qua lớp cutin (không điều tiết được, phụ thuộc độ dày lớp cutin).`,

  'bio-11-ch1-b2': `### 1. Quang hợp ở Thực vật
- Quang hợp là quá trình lá cây hấp thụ ánh sáng mặt trời để tổng hợp chất hữu cơ (C6H12O6) từ CO2 và H2O, giải phóng oxi.
- Phương trình tổng quát:
  6CO2 + 12H2O --(Ánh sáng, Diệp lục)--> C6H12O6 + 6O2 + 6H2O
- Gồm hai pha:
  + **Pha sáng (ở màng thilacoit):** Chuyển năng lượng ánh sáng thành hóa năng trong ATP và NADPH, giải phóng O2 từ quá trình quang phân ly nước.
  + **Pha tối (ở chất nền stroma):** Sử dụng ATP, NADPH để cố định CO2 thành cacbohiđrat (chu trình Calvin).

### 2. Hô hấp ở Thực vật
- Là quá trình phân giải chất hữu cơ giải phóng năng lượng ATP cung cấp cho các hoạt động sống của cây.
- Xảy ra chủ yếu ở ti thể. Gồm 3 giai đoạn: Đường phân (tế bào chất), Chu trình Krebs (chất nền ti thể), và Chuỗi truyền electron hô hấp (màng trong ti thể).`,

  'bio-11-ch1-b3': `### 1. Dinh dưỡng ở Động vật
- Động vật là sinh vật dị dưỡng, thu nhận chất dinh dưỡng từ thức ăn bên ngoài.
- Chất dinh dưỡng gồm nhóm đa lượng (cacbohiđrat, lipit, prôtêin...) và vi lượng (vitamin, khoáng chất).

### 2. Các hình thức tiêu hóa ở Động vật
- **Chưa có cơ quan tiêu hóa (động vật đơn bào):** Tiêu hóa nội bào bằng không bào tiêu hóa chứa enzim.
- **Có túi tiêu hóa (ruột khoang, giun dẹp):** Tiêu hóa ngoại bào trong lòng túi kết hợp nội bào.
- **Có ống tiêu hóa (động vật có xương sống và nhiều loài không xương sống):** Tiêu hóa ngoại bào qua các cơ quan chuyên hóa cao: miệng, thực quản, dạ dày, ruột non, ruột già. Tiêu hóa cơ học kết hợp tiêu hóa hóa học bằng dịch tiêu hóa chứa enzim.`,

  'bio-11-ch1-b4': `### 1. Hệ Tuần hoàn ở Động vật
- Chức năng: Vận chuyển các chất dinh dưỡng, khí O2, CO2 và các sản phẩm bài tiết đi khắp cơ thể.
- Phân loại:
  + **Hệ tuần hoàn hở (thân mềm, chân khớp):** Máu chảy vào khoang cơ thể trộn lẫn dịch mô tạo thành hỗn hợp máu - dịch mô lưu thông chậm.
  + **Hệ tuần hoàn kín (giun đốt, mực ống, động vật có xương sống):** Máu chảy hoàn toàn trong lòng mạch kín với áp lực cao và lưu thông nhanh.
    * Hệ tuần hoàn đơn (cá, 1 vòng tuần hoàn, tim 2 ngăn).
    * Hệ tuần hoàn kép (lưỡng cư, bò sát, chim, thú; 2 vòng tuần hoàn, tim 3 hoặc 4 ngăn).

### 2. Hệ Hô hấp ở Động vật
- **Qua bề mặt cơ thể (giun đất):** Da ẩm ướt giúp khuếch tán khí trực tiếp.
- **Bằng hệ thống ống khí (côn trùng):** Các ống khí nhỏ chia nhánh trực tiếp tới từng tế bào.
- **Bằng mang (cá, tôm):** Các lá mang có diện tích tiếp xúc lớn, dòng nước chảy ngược chiều dòng máu giúp tối ưu trao đổi khí.
- **Bằng phổi (lưỡng cư, bò sát, chim, thú):** Phổi thú có vô số phế nang tăng diện tích bề mặt. Phổi chim có thêm hệ thống túi khí giúp hô hấp kép.`
,

  'bio-11-ch2-b1': `### 1. Khái niệm Cảm ứng ở Thực vật
Cảm ứng là phản ứng của thực vật đối với các kích thích từ môi trường nhằm thích nghi và tồn tại.

### 2. Hướng động (Vận động hướng động)
Là hình thức phản ứng của cơ quan thực vật đối với tác nhân kích thích từ một hướng xác định.
- **Hướng sáng:** Thân hướng sáng dương (uốn cong về phía ánh sáng), rễ hướng sáng âm. Do auxin phân bố không đều (nhiều ở phía tối làm tế bào phía tối sinh trưởng nhanh hơn).
- **Hướng trọng lực (Hướng đất):** Rễ hướng đất dương, thân hướng đất âm.
- **Hướng hóa, Hướng nước, Hướng tiếp xúc.**

### 3. Ứng động (Vận động cảm ứng)
Là phản ứng của cây trước các kích thích không có hướng xác định.
- **Ứng động sinh trưởng:** Do tốc độ sinh trưởng không đều của các tế bào ở hai phía cơ quan (vận động nở hoa, thức ngủ của lá).
- **Ứng động không sinh trưởng:** Do sự biến động sức trương nước của tế bào (vận động tự vệ của cây trinh nữ, vận động bắt mồi).`,

  'bio-11-ch2-b2': `### 1. Khái niệm Cảm ứng ở Động vật
Cảm ứng ở động vật là phản ứng trả lời kích thích từ môi trường thông qua sự điều khiển của hệ thần kinh, diễn ra nhanh và rõ rệt dưới dạng các phản xạ.

### 2. Sự Tiến hóa của Hệ Thần kinh ở các nhóm Động vật
- **Hệ thần kinh dạng lưới (Ruột khoang):** Các tế bào thần kinh phân bố rải rác liên kết mạng lưới. Phản ứng co toàn thân, tiêu tốn nhiều năng lượng.
- **Hệ thần kinh dạng chuỗi hạch (Giun, Chân khớp):** Các tế bào tập trung thành các hạch thần kinh dọc cơ thể. Phản ứng cục bộ theo từng phân đoạn.
- **Hệ thần kinh dạng ống (Động vật có xương sống):** Tập trung cao độ ở đầu làm não bộ. Chia thành thần kinh trung ương (não, tủy sống) và thần kinh ngoại biên. Phản ứng chính xác, đa dạng, tiết kiệm năng lượng.

### 3. Cung phản xạ
Bộ phận thực hiện phản xạ gồm 5 khâu:
1. Thụ thể tiếp nhận kích thích.
2. Đường truyền vào (thần kinh hướng tâm).
3. Bộ phận trung ương (não, tủy sống).
4. Đường truyền ra (thần kinh ly tâm).
5. Cơ quan thực hiện (cơ, tuyến).`,

  'bio-11-ch3-b1': `### 1. Khái niệm Sinh trưởng và Phát triển
- **Sinh trưởng:** Sự tăng lên về kích thước, khối lượng cơ thể do sự tăng số lượng và kích thước tế bào.
- **Phát triển:** Quá trình biến đổi bao gồm sinh trưởng, phân hóa tế bào và phát sinh hình thái cơ quan cơ thể.

### 2. Sinh trưởng ở Thực vật
- Diễn ra tại các **mô phân sinh** (mô phân sinh đỉnh, mô phân sinh bên, mô phân sinh lóng).
- **Sinh trưởng sơ cấp:** Làm tăng chiều dài do hoạt động của mô phân sinh đỉnh.
- **Sinh trưởng thứ cấp:** Làm tăng bề ngang do hoạt động của mô phân sinh bên (chỉ có ở cây hai lá mầm).

### 3. Phát triển ở Động vật
- **Phát triển không qua biến thái:** Con non sinh ra có hình dạng cấu tạo tương tự con trưởng thành (người, thú).
- **Phát triển qua biến thái hoàn toàn:** Con non (ấu trùng) có cấu tạo và lối sống cực kỳ khác con trưởng thành, trải qua giai đoạn nhộng trung gian (bướm, ếch).
- **Phát triển qua biến thái không hoàn toàn:** Con non có hình dạng gần giống con trưởng thành nhưng trải qua nhiều lần lột xác để lớn lên (châu chấu, gián).`,

  'bio-11-ch4-b1': `### 1. Sinh sản vô tính ở Sinh vật
- Tạo ra thế hệ con di truyền hoàn toàn giống mẹ, dựa trên quá trình nguyên phân.
- **Ở thực vật:** Sinh sản bằng bào tử hoặc sinh sản sinh dưỡng (ghép cành, chiết cành, giâm cành, nuôi cấy mô).
- **Ở động vật:** Phân đôi, nảy chồi, tái sinh, trinh sản (ong, kiến).

### 2. Sinh sản hữu tính ở Sinh vật
- Có sự kết hợp giữa giao tử đực (n) và giao tử cái (n) qua thụ tinh tạo hợp tử (2n). Tạo ra nhiều biến dị tổ hợp giúp sinh vật thích nghi tốt hơn.
- **Ở thực vật có hoa:** Diễn ra sự thụ tinh kép (chỉ có ở thực vật hạt kín):
  + Tinh tử 1 + trứng -> Hợp tử (2n) phát triển thành phôi.
  + Tinh tử 2 + nhân cực (2n) -> Tế bào tam bội (3n) phát triển thành nội nhũ nuôi phôi.
- **Ở động vật:** Thụ tinh ngoài (ở nước, hiệu suất thấp) và thụ tinh trong (ở cạn, hiệu suất cao).`,

  // === VẬT LÝ LỚP 11 ===
  'phy-11-ch1-b1': `### 1. Khái niệm Dao động cơ
- Dao động cơ là chuyển động lặp đi lặp lại quanh một vị trí xác định gọi là vị trí cân bằng.
- Dao động tuần hoàn là dao động mà sau những khoảng thời gian bằng nhau xác định vật trở lại vị trí cũ theo hướng cũ.

### 2. Dao động Điều hòa
Là dao động mà li độ được biểu diễn bằng một hàm cosin hoặc sin theo thời gian:
x = A*cos(omega * t + phi)
- x: Li độ (cm, m).
- A: Biên độ dao động (A > 0).
- omega: Tần số góc (rad/s), omega = (2 * pi) / T.
- (omega * t + phi): Pha dao động tại thời điểm t.
- phi: Pha ban đầu (rad).

### 3. Vận tốc và Gia tốc trong dao động điều hòa
- Vận tốc: v = x' = -omega * A*sin(omega * t + phi). Vận tốc sớm pha pi/2 so với li độ.
- Gia tốc: a = v' = -omega^2 * x. Gia tốc ngược pha với li độ. Vectơ gia tốc luôn hướng về vị trí cân bằng.`,

  'phy-11-ch1-b2': `### 1. Động năng (Wđ)
Động năng của vật dao động điều hòa biến thiên tuần hoàn với chu kỳ bằng T/2 và tần số bằng 2f:
Wđ = 1/2 * m * v^2 = 1/2 * m * omega^2 * A^2 * sin^2(omega * t + phi)

### 2. Thế năng (Wt)
Thế năng của vật biến thiên tuần hoàn ngược pha với động năng:
Wt = 1/2 * k * x^2 = 1/2 * m * omega^2 * x^2 = 1/2 * m * omega^2 * A^2 * cos^2(omega * t + phi)

### 3. Cơ năng (W)
Cơ năng bằng tổng động năng và thế năng của vật tại cùng một thời điểm:
W = Wđ + Wt = 1/2 * m * omega^2 * A^2 = Hằng số
- Cơ năng tỷ lệ thuận với bình phương biên độ dao động.
- Trong quá trình dao động không có ma sát, có sự chuyển hóa qua lại giữa động năng và thế năng nhưng cơ năng luôn được bảo toàn.`,

  'phy-11-ch2-b1': `### 1. Khái niệm Sóng cơ học
Sóng cơ là sự lan truyền dao động cơ (các biến dạng cơ học) trong một môi trường vật chất đàn hồi theo thời gian.
*Lưu ý: Sóng cơ không truyền được trong chân không.*

### 2. Phân loại Sóng cơ
- **Sóng ngang:** Các phần tử môi trường dao động theo phương vuông góc với phương truyền sóng (truyền được trong chất rắn và bề mặt chất lỏng).
- **Sóng dọc:** Các phần tử môi trường dao động theo phương trùng với phương truyền sóng (truyền được trong tất cả môi trường rắn, lỏng, khí).

### 3. Các đặc trưng vật lý của sóng
- **Chu kỳ / Tần số sóng:** Bằng chu kỳ / tần số dao động của nguồn sóng.
- **Bước sóng (lambda):** Khả năng lan truyền của sóng trong một chu kỳ:
  lambda = v * T = v / f

### 4. Phương trình Sóng chính xác
Nếu tại nguồn O có phương trình uO = A*cos(omega * t) thì tại điểm M cách O một khoảng d trên phương truyền sóng có phương trình:
uM = A*cos(omega * t - (2 * pi * d / lambda))`,

  'phy-11-ch2-b2': `### 1. Hiện tượng Giao thoa Sóng
- Là hiện tượng hai sóng kết hợp gặp nhau tạo nên các cực đại giao thoa và cực tiểu giao thoa xen kẽ ổn định.
- **Điều kiện sóng kết hợp:** Hai nguồn sóng cùng tần số, cùng phương dao động và có hiệu số pha không đổi theo thời gian.
  + Cực đại giao thoa: d2 - d1 = k * lambda
  + Cực tiểu giao thoa: d2 - d1 = (k + 0.5) * lambda

### 2. Sóng dừng
- Là sóng truyền trên một sợi dây có các điểm dao động với biên độ cực đại gọi là **Bụng sóng** và các điểm không dao động gọi là **Nút sóng**.
- Khoảng cách giữa hai nút sóng kề nhau hoặc hai bụng kề nhau là lambda/2. Khoảng cách từ nút đến bụng kề nhất là lambda/4.
- **Điều kiện sóng dừng trên dây dài L:**
  + Hai đầu cố định (hai đầu là nút): L = k * (lambda / 2)
  + Một đầu cố định một đầu tự do (một đầu nút một đầu bụng): L = (2k + 1) * (lambda / 4).`,

  'phy-11-ch3-b1': `### 1. Điện tích và Tương tác Điện
- Có hai loại điện tích: Điện tích dương (+) và Điện tích âm (-). Các điện tích cùng dấu đẩy nhau, trái dấu hút nhau.
- Thuyết êlectron: Nguyên tử trung hòa mất êlectron hóa thành ion dương, nhận thêm êlectron hóa thành ion âm. Điện tích êlectron là qe = -1.6 * 10^(-19) C.

### 2. Định luật Cu-lông (Coulomb)
Lực tương tác giữa hai điện tích điểm q1, q2 đứng yên trong chân không tỷ lệ thuận với tích độ lớn của hai điện tích và tỷ lệ nghịch với bình phương khoảng cách giữa chúng:
F = k * |q1 * q2| / (r^2)
- Trong đó k = 9 * 10^9 N.m^2/C^2.
- Nếu đặt trong môi trường điện môi đồng tính có hằng số điện môi epsilon:
  F = k * |q1 * q2| / (epsilon * r^2)`,

  'phy-11-ch3-b2': `### 1. Khái niệm Điện trường
- Điện trường là môi trường vật chất bao quanh các điện tích và tác dụng lực điện lên điện tích khác đặt trong nó.
- Vectơ cường độ điện trường E đặc trưng cho điện trường về phương diện tác dụng lực điện: E = F / q.
- Cường độ điện trường của điện tích điểm Q tại một điểm cách nó khoảng r:
  E = k * |Q| / (epsilon * r^2)

### 2. Công của lực điện trường
A = q * E * d
- d: Hình chiếu của quỹ đạo di chuyển lên phương song song với đường sức điện. Công lực điện không phụ thuộc hình dạng đường đi, chỉ phụ thuộc điểm đầu và điểm cuối (điện trường là trường thế).

### 3. Điện thế và Thế năng điện
- Thế năng điện của điện tích q tại một điểm: WM = q * VM.
- Điện thế đặc trưng cho khả năng sinh công của điện trường: VM = AM_vo_cung / q.
- Hiệu điện thế giữa hai điểm: UMN = VM - VN = AMN / q = E * d.`,

  'phy-11-ch4-b1': `### 1. Dòng điện không đổi
- Dòng điện là dòng chuyển động có hướng của các hạt mang điện tự do.
- Dòng điện không đổi là dòng điện có cả chiều và cường độ không đổi theo thời gian.
- Cường độ dòng điện đặc trưng cho tác dụng mạnh-yếu của dòng điện:
  I = q / t

### 2. Nguồn điện (Pin, Ắc quy)
- Là thiết bị duy trì hiệu điện thế ổn định giữa hai cực để duy trì dòng điện chạy trong mạch.
- Suất điện động E đặc trưng cho khả năng thực hiện công của nguồn điện:
  E = A / q

### 3. Định luật Ôm (Ohm) toàn mạch
Cường độ dòng điện trong mạch kín tỷ lệ thuận với suất điện động của nguồn điện và tỷ lệ nghịch với tổng điện trở toàn mạch (điện trở ngoài R cộng điện trở trong r):
I = E / (R + r)`,


  // === TOÁN LỚP 12 BỔ SUNG ===
  'math-12-ch1-b3': `### 1. Đường Tiệm cận của Đồ thị Hàm số
- **Tiệm cận đứng:** Đường thẳng x = x0 là tiệm cận đứng của đồ thị hàm số y = f(x) nếu ít nhất một trong các điều kiện sau thỏa mãn:
  lim f(x) khi x tiến về x0 = vô cùng
- **Tiệm cận ngang:** Đường thẳng y = y0 là tiệm cận ngang của đồ thị hàm số y = f(x) nếu:
  lim f(x) khi x tiến về vô cùng = y0

### 2. Sơ đồ Khảo sát sự Biến thiên và Vẽ đồ thị Hàm số
1. Tìm tập xác định.
2. Khảo sát sự biến thiên (đạo hàm, cực trị, giới hạn, tiệm cận, bảng biến thiên).
3. Vẽ đồ thị (Tìm giao điểm với các trục tọa độ, tìm tâm đối xứng / trục đối xứng).

### 3. Các dạng Đồ thị hàm số phổ biến
- Hàm bậc ba: y = ax^3+bx^2+cx+d (a khác 0).
- Hàm trùng phương: y = ax^4+bx^2+c (a khác 0).
- Hàm phân thức: y = (ax+b)/(cx+d) (c khác 0).`,

  'math-12-ch2-b2': `### 1. Định nghĩa Tích phân
Cho F(x) là một nguyên hàm của hàm số f(x) liên tục trên đoạn [a; b]. Hiệu số F(b) - F(a) được gọi là tích phân của f(x) từ a đến b:
Tích_phân(a đến b) f(x) dx = F(b) - F(a)

### 2. Tính chất cốt lõi của Tích phân
- Tích_phân(a đến b) f(x)dx = - Tích_phân(b đến a) f(x)dx
- Tích_phân(a đến b) f(x)dx = Tích_phân(a đến c) f(x)dx + Tích_phân(c đến b) f(x)dx

### 3. Ứng dụng Hình học của Tích phân
- **Tính diện tích hình phẳng:** Diện tích S của hình phẳng giới hạn bởi đồ thị y=f(x), trục hoành y=0 và x=a, x=b:
  S = Tích_phân(a đến b) |f(x)| dx
- **Tính thể tích khối tròn xoay:** Thể tích V sinh ra khi quay hình phẳng giới hạn bởi đồ thị y=f(x), trục hoành và x=a, x=b quanh trục hoành Ox:
  V = pi * Tích_phân(a đến b) f^2(x) dx`,

  'math-12-ch3-b1': `### 1. Hệ tọa độ Oxyz trong không gian
Gồm ba trục tọa độ vuông góc từng đôi một tại gốc tọa độ O: trục hoành Ox, trục tung Oy, trục cao Oz ứng với các vectơ đơn vị i, j, k.

### 2. Biểu thức Tọa độ của các Vectơ
Nếu u = x*i + y*j + z*k thì u = (x; y; z).
- Tích vô hướng của hai vectơ a = (x1; y1; z1) và b = (x2; y2; z2):
  a . b = x1*x2 + y1*y2 + z1*z2
- Độ dài vectơ a: |a| = căn(x1^2 + y1^2 + z1^2).
- Góc giữa hai vectơ:
  cos theta = (a . b) / (|a| * |b|)

### 3. Tích có hướng của hai vectơ
Là một vectơ vuông góc với cả hai vectơ a và b. Ứng dụng tính diện tích tam giác, thể tích khối chóp, kiểm tra tính đồng phẳng của các vectơ.`,

  'math-12-ch3-b2': `### 1. Phương trình Mặt phẳng
- Một mặt phẳng hoàn toàn xác định khi biết một điểm M(x0; y0; z0) và một vectơ pháp tuyến n = (A; B; C).
- **Phương trình tổng quát:**
  A(x - x0) + B(y - y0) + C(z - z0) = 0 <=> Ax + By + Cz + D = 0
- Khoảng cách từ điểm M(x1; y1; z1) đến mặt phẳng:
  d = |A*x1 + B*y1 + C*z1 + D| / căn(A^2 + B^2 + C^2)

### 2. Phương trình Đường thẳng
Đường thẳng d đi qua điểm M(x0; y0; z0) và có vectơ chỉ phương u = (a; b; c).
- **Phương trình tham số:**
  x = x0 + a*t, y = y0 + b*t, z = z0 + c*t
- **Phương trình chính tắc (khi a, b, c khác 0):**
  (x - x0)/a = (y - y0)/b = (z - z0)/c`,

  'math-12-ch4-b1': `### 1. Định nghĩa Số phức
- Số phức z là một biểu thức có dạng:
  z = a + b*i  (a, b thuộc R)
  Trong đó i là đơn vị ảo thỏa mãn i^2 = -1.
  + a được gọi là **Phần thực**.
  + b được gọi là **Phần ảo**.

### 2. Các đại lượng đặc trưng của số phức
- **Số phức liên hợp:** z_gach = a - b*i.
- **Môđun của số phức z:** |z| = căn(a^2 + b^2). 
- Hai số phức bằng nhau khi phần thực bằng phần thực và phần ảo bằng phần ảo.

### 3. Phép toán số phức cơ bản
- Cộng / Trừ: Cộng thực với thực, ảo với ảo.
- Nhân: Nhân phân phối và thay thế i^2 = -1.
- Chia: Nhân cả tử và mẫu với số phức liên hợp của mẫu.`,


  // === HÓA LỚP 12 BỔ SUNG ===
  'chem-12-ch2-b2': `### 1. Tinh bột [C6H10O5]n
- Tinh bột là polisaccarit, cấu trúc phân tử gồm hai dạng:
  + **Amilozơ:** Mạch không phân nhánh, liên kết alpha-1,4-glicozit, xoắn cuộn.
  + **Amilopeptin:** Mạch phân nhánh phức tạp, chứa cả liên kết alpha-1,4-glicozit và alpha-1,6-glicozit.
- **Tính chất hóa học đặc trưng:**
  + Phản ứng màu với dung dịch Iốt: Tạo hợp chất màu sẫm xanh tím đặc trưng (ở nhiệt độ thường), khi đun nóng sẽ mất màu và khi để nguội màu xuất hiện lại.
  + Phản ứng thủy phân hoàn toàn trong dịch axit sinh ra Glucozơ.

### 2. Xenlulozơ [C6H10O5]n
- Là thành phần chính cấu tạo nên màng tế bào thực vật (xơ gỗ, bông nõn). Mạch thẳng dài không phân nhánh gồm các mắt xích beta-glucozơ.
- **Tính chất đặc trưng:**
  + Tác dụng với axit nitric xúc tác H2SO4 đặc tạo thành xenlulozơ trinitrat dùng làm thuốc súng không khói:
    [C6H7O2(OH)3]n + 3n HNO3 -> [C6H7O2(ONO2)3]n + 3n H2O
  + Không tan trong nước tốt nhưng tan trong nước Schweitzer (phức đồng-amoniac).`,

  'chem-12-ch4-b1': `### 1. Khái niệm về Polime (Polymer)
- Polime là những hợp chất có phân tử khối rất lớn do nhiều mắt xích (monome) liên kết lại với nhau tạo thành.
- Phân loại: Polime thiên nhiên (bông, len, tơ tằm), polime nhân tạo (bán tổng hợp như tơ visco, axetat) và polime tổng hợp (nhựa PE, PVC, tơ nilon).

### 2. Các phương pháp điều chế polime
- **Phản ứng trùng hợp:** Cộng hợp liên tiếp nhiều monome có liên kết kép hoặc vòng không bền để tạo polime. (Ví dụ: trùng hợp nhựa PE, tơ capron, cao su buna).
- **Phản ứng trùng ngưng:** Kết hợp nhiều monome có ít nhất 2 nhóm chức hoạt động tạo polime đồng thời giải phóng các phân tử nhỏ khác (như H2O). (Ví dụ: điều chế tơ nilon-6,6: axit adipic + hexametylendiamin).

### 3. Vật liệu Polime quan trọng
- **Chất dẻo:** PE, PVC (nhựa cách điện, ống dẫn nước), PS, PP, poli(metyl metacrylat) (thủy tinh hữu cơ plexiglas bền đẹp).
- **Cao su:** Cao su buna, cao su thiên nhiên (isopren).
- **Tơ:** Tơ nilon-6,6 (tơ poliamit kém bền với nhiệt và môi trường kiềm/axit), tơ lapsan (tơ polieste bền hơn).`,

  'chem-12-ch5-b1': `### 1. Vị trí và Cấu tạo Kim loại
- Hầu hết các nguyên tố kim loại nằm ở nhóm IA, IIA, IIIA và các phân nhóm phụ nhóm B trong bảng tuần hoàn.
- Liên kết kim loại: Được hình thành bởi lực hút tĩnh điện giữa các cation kim loại ở nút mạng tinh thể và các electron tự do.

### 2. Tính chất Vật lý chung (Do Electron Tự Do quyết định)
Kim loại có 4 tính chất vật lý chung tiêu biểu:
- **Tính dẻo** (Vàng dẻo nhất).
- **Tính dẫn điện** (Ag > Cu > Au > Al > Fe).
- **Tính dẫn nhiệt** (Thường tỷ lệ thuận với tính dẫn điện).
- **Ánh kim** (electron tự do phản xạ ánh sáng tốt).

### 3. Dãy Điện hóa của Kim loại
Thứ tự cặp oxi hóa / khử sắp xếp theo chiều tăng tính oxi hóa của cation và giảm tính khử của kim loại:
K+/K, Na+/Na, Mg(2+)/Mg, Al(3+)/Al, Zn(2+)/Zn, Fe(2+)/Fe, H+/H, Cu(2+)/Cu, Fe(3+)/Fe(2+), Ag+/Ag, Au(3+)/Au.
- **Quy tắc alpha:** Chất oxi hóa mạnh hơn cộng chất khử mạnh hơn tạo chất oxi hóa yếu hơn và chất khử yếu hơn:
  Fe + Cu(2+) -> Fe(2+) + Cu
- Kim loại đứng trước H phản ứng với dung dịch axit loãng (HCl, H2SO4) giải phóng khí H2.`,

  'chem-12-ch5-b2': `### 1. Khái niệm Ăn mòn Kim loại
Ăn mòn kim loại là sự phá hủy kim loại hoặc hợp alloy do tác dụng của các chất trong môi trường xung quanh. Bản chất là quá trình oxi hóa khử: M -> M(n+) + ne.

### 2. Phân loại Ăn mòn
- **Ăn mòn hóa học:** Electron của kim loại chuyển trực tiếp cho các chất ở môi trường tiếp xúc. Không phát sinh dòng điện.
- **Ăn mòn điện hóa (Trọng tâm đề thi):** Kim loại bị phá hủy do phát sinh dòng điện cực nhỏ giữa hai điện cực chênh lệch thế hoạt động tiếp xúc với nhau cùng đặt trong dung dịch điện li.
  + *Điều kiện xảy ra ăn mòn điện hóa:*
    1. Gồm 2 cực khác nhau về bản chất (kim loại-kim loại hoặc kim loại-phi kim).
    2. Hai điện cực tiếp xúc trực tiếp hoặc gián tiếp qua dây dẫn.
    3. Cùng tiếp xúc với dung dịch điện li (không khí ẩm, nước muối).
  + Cực hoạt động mạnh hơn (Anot) bị ăn mòn trước. Cực yếu hơn (Katot) được bảo vệ.

### 3. Phương pháp Bảo vệ Kim loại khỏi ăn mòn
- Phương pháp bảo vệ bề mặt: Sơn, mạ, phun dầu mỡ để cô lập bề mặt kim loại.
- Phương pháp điện hóa (Bảo vệ bằng kim loại hy sinh): Gắn kim loại hoạt động mạnh hơn lên vật cần bảo vệ. (Ví dụ: gắn khối kẽm Zn vào vỏ tàu bằng thép để kẽm bị ăn mòn trước, thép được bảo vệ).`,


  // === SINH LỚP 12 THÊM ===
  'bio-12-ch1-b3': `### 1. Đột biến Gen
- Là những biến đổi nhỏ trong cấu trúc của gen, liên quan đến một hoặc một vài cặp nuclêôtit. Đột biến điểm là đột biến liên quan tới 1 cặp nuclêôtit.
- Các dạng đột biến điểm:
  + **Mất 1 cặp nuclêôtit:** Làm dịch khung dịch mã từ điểm bị đột biến trở về sau, làm thay đổi nhiều axit amin.
  + **Thêm 1 cặp nuclêôtit:** Cũng làm dịch khung dịch mã.
  + **Thay thế 1 cặp nuclêôtit:** Thường chỉ ảnh hưởng đến một codon tại điểm đột biến.
- Ý nghĩa: Là nguồn nguyên liệu sơ cấp của quá trình tiến hóa.

### 2. Đột biến Nhiễm sắc thể (NST)
- **Đột biến cấu trúc NST:** Mất đoạn, Lặp đoạn, Đảo đoạn, Chuyển đoạn NST.
- **Đột biến số lượng NST:**
  + Lệch bội: Biến đổi số lượng ở một hoặc vài cặp NST tương đồng (2n+1: thể ba, 2n-1: thể một).
  + Đa bội: Tăng số lượng toàn bộ nhiễm sắc thể lên bội số của n (3n, 4n: tự đa bội; dị đa bội hình thành do lai xa kèm đa bội hóa).`,

  'bio-12-ch2-b1': `### 1. Thí nghiệm Men-đen về Phân ly (1 cặp tính trạng)
- Bố mẹ thuần chủng hoa đỏ (AA) * hoa trắng (aa) -> F1: 100% hoa đỏ (Aa). Cho F1 tự thụ phấn -> F2: 3 đỏ : 1 trắng.
- **Quy luật phân ly:** Mỗi tính trạng được quy định bởi một cặp alen. Trong quá trình giảm phân, các thành viên của cặp alen phân ly đồng đều về các giao tử.

### 2. Quy luật Phân ly Độc lập (2 tính trạng)
- Bố mẹ thuần chủng hạt vàng, trơn (AABB) * hạt xanh, nhăn (aabb) -> F1: 100% vàng, trơn (AaBb). Cho F1 tự thụ phấn -> F2 thu được tỷ lệ kiểu hình: 9 vàng, trơn : 3 vàng, nhăn : 3 xanh, trơn : 1 xanh, nhăn.
- **Cơ sở tế bào học:** Các cặp alen nằm trên các cặp NST tương đồng khác nhau phân ly độc lập và tổ hợp tự do khi phát sinh giao tử và thụ tinh.
- **Công thức tổng quát với n cặp dị hợp phân ly độc lập:**
  + Số loại giao tử: 2^n.
  + Số tổ hợp ở F2: 4^n.
  + Số loại kiểu gen: 3^n.
  + Số loại kiểu hình: 2^n.`,

  'bio-12-ch2-b2': `### 1. Tương tác Gen không alen
- Là sự tương tác qua lại giữa các gen không cùng một cặp định vị trên các lôcut khác nhau trong quá trình biểu hiện kiểu hình.
- Các kiểu tương tác: Tương tác bổ trợ (tỷ lệ F2 điển hình: 9:7, 9:6:1, 9:3:3:1) và Tương tác át chế (12:3:1, 13:3, 9:3:4), tương tác cộng gộp (tính trạng số lượng).

### 2. Di truyền liên kết gen (Thomas Morgan)
- **Liên kết gen hoàn toàn:** Hai gen nằm sát nhau trên cùng một nhiễm sắc thể, luôn di truyền cùng nhau trong giảm phân. Làm hạn chế xuất hiện biến dị tổ hợp, duy trì sự ổn định của loài.
- **Liên kết gen không hoàn toàn (Hoán vị gen):** Các gen nằm cách nhau xa trên cùng một NST tương đồng xảy ra sự trao đổi đoạn chéo nhau giữa các crômatit tại kì đầu giảm phân I.
  + Tần số hoán vị gen f <= 50%, tỷ lệ nghịch với khoảng cách giữa các gen trên NST.
  + Tần số hoán vị 1% = 1 cM.`,

  'bio-12-ch3-b1': `### 1. Khái niệm Quần thể di truyền
Quần thể là một tổ chức sinh học gồm các cá thể cùng loài, cùng sinh sống trong một phạm vi giới hạn nhất định, giao phối tự do sinh sản thực hiện trao đổi vốn gen.

### 2. Cấu trúc di truyền của Quần thể tự phối và giao phối gần
Tần số kiểu gen đồng hợp tử tăng dần và tần số kiểu gen dị hợp tử giảm dần một nửa qua mỗi thế hệ tự phối:
Hn = (1/2)^n * H0
- Gây ra hiện tượng thoái hóa giống do các gen lặn có hại được đưa về trạng thái đồng hợp tử biểu lộ kiểu hình.

### 3. Quần thể Giao phối Ngẫu nhiên và Định luật Hardy-Weinberg
Quần thể ngẫu phối có thành phần kiểu gen duy trì ổn định qua các thế hệ.
- Trạng thái cân bằng Hardy-Weinberg đối với gen có 2 alen (p: tần số alen A, q: tần số alen a):
  p^2 AA + 2pq Aa + q^2 aa = 1 (với p + q = 1)
- **Điều kiện nghiệm đúng:** Số lượng cá thể lớn, giao phối hoàn toàn tự do, không có chọn lọc tự nhiên, không xảy ra đột biến và không có di-nhập gen đột xuất.`,

  'bio-12-ch4-b1': `### 1. Tạo giống bằng nguồn Biến dị Tổ hợp
Đưa các gen tốt từ các dòng thuần khác nhau vào một dòng lai tích lũy ưu thế. Chọn lọc qua nhiều thế hệ để thu được dòng có đặc tính mong muốn bền vững.

### 2. Ưu thế lai (Hybrid vigor)
Là hiện tượng con lai F1 có sức sống, tốc độ lớn, khả năng chống chịu và năng suất cao hơn hẳn bố mẹ.
- Thuyết siêu trội: Kiểu gen dị hợp tử tốt hơn kiểu gen đồng hợp tử (Aa > AA, aa).
- Ưu thế lai biểu hiện mạnh nhất ở thế hệ F1, sau đó giảm dần qua các thế hệ tự phối nên con lai F1 chỉ dùng để sản xuất kinh tế, không dùng để làm giống.

### 3. Tạo giống bằng Phương pháp Đột biến
- Sử dụng tác nhân vật lý (tia phóng xạ, nhiệt độ) hoặc tác nhân hóa học (Cônsixin gây đa bội hóa cố định tế bào) để tạo ra các giống cây trồng hữu ích, quả không hạt (dưa hấu tam bội 3n, chuối 3n).`,

  'bio-12-ch5-b1': `### 1. Bằng chứng Tiến hóa
- **Bằng chứng giải phẫu so sánh:**
  + Cơ quan tương đồng: Có cùng nguồn gốc cấu tạo nhưng khác biệt về chức năng (ví dụ: cánh dơi và tay người). Chứng minh tiến hóa phân ly.
  + Cơ quan thoái hóa: Phát triển kém, mất chức năng ban đầu (ruột thừa, xương cụt).
  + Cơ quan tương tự: Khác xa nguồn gốc nhưng có chức năng giống hệt (cánh bướm và cánh chim). Chứng minh tiến hóa đồng quy.
- **Bằng chứng tế bào học và sinh học phân tử:** Tất cả các loài đều có cấu tạo từ tế bào, sử dụng chung mã di truyền và có chung cấu trúc prôtêin/ADN. Là bằng chứng thuyết phục nhất chỉ ra nguồn gốc chung của sinh giới.

### 2. Các Học thuyết Tiến hóa tiêu biểu
- **Huyết thuyết Đác-uyn (Darwin):** Chọn lọc tự nhiên là động lực chính duy trì các cá thể mang biến dị thích nghi, đào thải các cá thể không thích nghi.
- **Thuyết tiến hóa tổng hợp hiện đại:** Nhân tố tiến hóa gồm: Đột biến (nguồn nguyên liệu), Giao phối ngẫu nhiên (phát tán biến dị), Chọn lọc tự nhiên (định hướng tiến hóa), Các yếu tố ngẫu nhiên và Di-nhập gen.`,

  'bio-12-ch6-b1': `### 1. Môi trường sống và Nhân tố sinh thái
Môi trường sống của sinh vật bao gồm tất cả các yếu tố cơ bản bao quanh sinh vật tác động trực tiếp hoặc gián tiếp.
- **Giới hạn sinh thái:** Là khoảng giá trị của một nhân tố sinh thái mà sinh vật có thể tồn tại và phát triển bình thường. Gồm khoảng thuận lợi và khoảng chống chịu.

### 2. Quần thể Sinh vật và Đặc trưng Cơ bản
Quần thể là tập hợp các cá thể cùng loài sinh sống trong một thời gian và không gian xác định.
- **Các đặc trưng cơ bản của quần thể:**
  + *Tỷ lệ giới tính:* Tỷ lệ giữa số lượng cá thể đực và cái.
  + *Nhóm tuổi:* Tuổi trước sinh sản, tuổi sinh sản, tuổi sau sinh sản.
  + *Sự phân bố cá thể:* Phân bố theo nhóm (phổ biến nhất), phân bố đồng đều, phân bố ngẫu nhiên.
  + *Mật độ cá thể:* Số cá thể trên một đơn vị diện tích hoặc thể tích.`,


  // === VẬT LÝ LỚP 12 THÊM ===
  'phy-12-ch1-b2': `### 1. Dao động tắt dần
- Là dao động có biên độ và năng lượng giảm dần theo thời gian do tác dụng của lực cản, lực ma sát của môi trường.
- Ma sát càng lớn, sự tắt dần xảy ra càng nhanh. Tránh dao động tắt dần bằng cách bổ sung năng lượng qua mỗi chu kỳ (dao động duy trì).

### 2. Dao động cưỡng bức
- Là dao động của hệ dưới tác dụng của một ngoại lực biến thiên tuần hoàn: F = F0 * cos(Omega * t).
- Biên độ của dao động cưỡng bức không đổi, phụ thuộc vào biên độ ngoại lực F0 và độ chênh lệch giữa tần số ngoại lực và tần số dao động riêng của hệ.

### 3. Hiện tượng Cộng hưởng (Resonance)
- Là hiện tượng biên độ của dao động cưỡng bức tăng lên đến giá trị cực đại khi tần số của ngoại lực cưỡng bức tiệm cận bằng tần số dao động riêng của hệ.
- Ứng dụng: Thiết bị lên dây đàn, các mạch chọn sóng radio; Tác hại: Phá hủy kết cấu cầu đường, nhà cửa nếu tần số rung động khớp tần số cộng hưởng riêng.`,

  'phy-12-ch2-b1': `### 1. Khái niệm Sóng cơ học và Sóng âm
Sóng âm là những sóng cơ lan truyền trong các môi trường rắn, lỏng, khí có tần số từ 16 Hz đến 20000 Hz tai người nghe thấy được.
- Hạ âm: f < 16 Hz.
- Siêu âm: f > 20000 Hz.

### 2. Giao thoa Sóng cơ học trên mặt nước
Khi hai nguồn sóng kết hợp S1, S2 cách nhau một khoảng dao động cùng pha:
- Hiệu đường truyền tại điểm M bất kỳ: d2 - d1.
- Điểm M dao động với biên độ cực đại khi: d2 - d1 = k * lambda.
- Điểm M dao động với biên độ cực tiểu khi: d2 - d1 = (k + 0.5) * lambda.

### 3. Đặc tính vật lý và sinh lý của âm
- **Đặc tính vật lý:** Tần số âm, Cường độ âm (I), Mức cường độ âm, Đồ thị dao động âm.
- **Đặc tính sinh lý:** Độ cao (gắn với tần số), Độ to (gắn với mức cường độ), Âm sắc.`,

  'phy-12-ch3-b2': `### 1. Mạch RLC nối tiếp
Đoạn mạch xoay chiều gồm điện trở thuần R, cuộn cảm thuần L và tụ điện C mắc nối tiếp.
- Tổng trở của đoạn mạch:
  Z = căn(R^2 + (ZL - ZC)^2)
  Trong đó: ZL = omega * L (cảm kháng), ZC = 1 / (omega * C) (dung kháng).
- Cường độ dòng điện hiệu dụng: I = U/Z.
- Độ lệch pha giữa điện áp u và dòng điện i:
  tan phi = (ZL - ZC)/R
  + Nếu ZL > ZC: mạch có tính cảm kháng, u sớm pha hơn i.
  + Nếu ZL < ZC: mạch có tính dung kháng, u trễ pha hơn i.

### 2. Công suất tiêu thụ của mạch xoay chiều
P = U * I * cos phi = I^2 * R
- Hệ số công suất: cos phi = R/Z.

### 3. Hiện tượng Cộng hưởng điện trong mạch RLC
Xảy ra khi ZL = ZC <=> omega^2 * L * C = 1. Khi đó:
- Tổng trở đạt cực tiểu Zmin = R.
- Cường độ dòng điện đạt cực đại Imax = U/R.
- Hệ số công suất đạt tối đa cos phi = 1, u và i cùng pha.`,

  'phy-12-ch4-b1': `### 1. Mạch dao động LC
- Gồm một tụ điện có điện dung C đấu nối tiếp với một cuộn cảm có độ tự cảm L thành một mạch kín. Điện trở của mạch coi như bằng không.
- Hoạt động của mạch: Tụ điện phóng điện qua cuộn cảm sinh dòng điện tự cảm chạy ngược lại nạp điện cho tụ, tạo thành dao động điện từ tự do biến thiên tuần hoàn.

### 2. Các đại lượng trong mạch LC
- Tần số góc riêng: omega = 1/căn(LC).
- Chu kỳ riêng: T = 2 * pi * căn(LC).
- Phương trình điện tích trên tụ: q = q0*cos(omega * t + phi).
- Phương trình cường độ dòng điện tức thời: i = q' = I0*cos(omega * t + phi + pi/2).

### 3. Điện từ trường và Sóng điện từ
- Điện trường biến thiên theo thời gian sinh ra từ trường xoáy biến thiên, từ trường biến thiên sinh ra điện trường xoáy. Hai trường này liên kết tạo thành điện từ trường thống nhất.
- Sóng điện từ là điện từ trường lan truyền trong không gian. Tốc độ truyền trong chân không bằng vận tốc ánh sáng c = 3 * 10^8 m/s. Sóng điện từ là sóng ngang, truyền được trong chân không.`,

  'phy-12-ch5-b1': `### 1. Hiện tượng Tán sắc ánh sáng (Isaac Newton)
- Tán sắc ánh sáng là hiện tượng phân tách một chùm ánh sáng phức tạp thành các chùm ánh sáng đơn sắc khác nhau khi đi qua lăng kính.
- Ánh sáng trắng là hỗn hợp của vô số ánh sáng đơn sắc biến thiên liên tục từ đỏ đến tím. Chiết suất của môi trường tăng dần từ đỏ đến tím, nên ánh sáng tím bị lệch nhiều nhất, đỏ lệch ít nhất.

### 2. Giao thoa Ánh sáng Đơn sắc (Khe Y-âng)
- Thí nghiệm giao thoa khe Young chứng minh ánh sáng có **tính chất sóng**.
- Khoảng vân i: Khoảng cách giữa hai vân sáng hoặc hai vân tối liên tiếp:
  i = lambda * D / a
- Vị trí các vân giao thoa trên màn:
  + Vị trí vân sáng: xs = k * i.
  + Vị trí vân tối: xt = (k + 0.5) * i.`,

  'phy-12-ch6-b1': `### 1. Hiện tượng Quang điện Ngoài
- Là hiện tượng ánh sáng thích hợp làm bật các êlectron ra khỏi bề mặt của tấm kim loại khi chiếu vào.

### 2. Định luật giới hạn quang điện và Thuyết lượng tử
- **Điều kiện quang điện:** Bước sóng của ánh sáng kích thích lambda phải ngắn hơn hoặc bằng một giới hạn quang điện lambda0 của kim loại đó:
  lambda <= lambda0
- **Thuyết lượng tử ánh sáng:** Chùm ánh sáng gồm vô số các hạt gọi là **Phôtôn**. Mỗi phôtôn mang năng lượng xác định:
  epsilon = h * f = h * c / lambda
  Trong đó h = 6.625 * 10^(-34) J.s (Hằng số Planck).
- Công thức Anh-xtanh về giới hạn quang điện: lambda0 = h * c / A (A là công thoát).

### 3. Hiện tượng Quang điện Trong
- Là hiện tượng ánh sáng thích hợp giải phóng các electron liên kết thành electron dẫn chuyển động tự do bên trong chất bán dẫn. Ứng dụng trong quang điện trở và pin mặt trời.`,

  'phy-12-ch7-b1': `### 1. Cấu tạo Hạt nhân Nguyên tử
- Hạt nhân nằm ở tâm nguyên tử, gồm các nucleon: **Prôtôn** (p, tích điện +e) và **Nơtrôn** (n, không tích điện).
- Ký hiệu hạt nhân của nguyên tố X: Z^A X.
  + Z: Nguyên tử số (số prôtôn).
  + A: Số khối (tổng số prôtôn và nơtrôn).

### 2. Độ hụt khối và Năng lượng liên kết hạt nhân
- Khối lượng của hạt nhân luôn nhỏ hơn tổng khối lượng các nucleon tạo thành đứng riêng rẽ một lượng d_m gọi là **Độ hụt khối**:
  d_m = Z * mp + (A - Z) * mn - mX
- Năng lượng liên kết hạt nhân:
  Wlk = d_m * c^2
- Năng lượng liên kết riêng (Wlkr = Wlk / A) đặc trưng cho **mức độ bền vững** của hạt nhân. Hạt nhân có số khối trung bình như Fe bền vững nhất.

### 3. Hiện tượng Phóng xạ
Quá trình phân rã tự phát của một hạt nhân không bền vững để biến đổi thành hạt nhân khác, đồng thời phát ra các tia phóng xạ (alpha, beta+, beta-, gamma).`
};
