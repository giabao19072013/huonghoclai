import React, { useState } from 'react';
import { ShieldCheck, Lock, Unlock, Database, Key, HelpCircle, Phone, Facebook, User, Check } from 'lucide-react';
import { FirebaseConfig } from '../types';

interface SettingsProps {
  isAdmin: boolean;
  onUnlock: (pin: string) => boolean;
  onLock: () => void;
  onSaveFirebaseConfig: (config: FirebaseConfig) => void;
  onResetFirebaseConfig: () => void;
  onClearAllData: () => Promise<void>;
}

export default function Settings({
  isAdmin,
  onUnlock,
  onLock,
  onSaveFirebaseConfig,
  onResetFirebaseConfig,
  onClearAllData
}: SettingsProps) {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [pinSuccess, setPinSuccess] = useState(false);

  // Firebase configurations states
  const [apiKey, setApiKey] = useState('');
  const [authDomain, setAuthDomain] = useState('');
  const [projectId, setProjectId] = useState('');
  const [storageBucket, setStorageBucket] = useState('');
  const [messagingSenderId, setMessagingSenderId] = useState('');
  const [appId, setAppId] = useState('');
  const [firestoreDatabaseId, setFirestoreDatabaseId] = useState('(default)');
  const [configSuccess, setConfigSuccess] = useState(false);

  // Load existing configuration on mounting
  React.useEffect(() => {
    const local = localStorage.getItem('HUONG_FIREBASE_CONFIG');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        setApiKey(parsed.apiKey || '');
        setAuthDomain(parsed.authDomain || '');
        setProjectId(parsed.projectId || '');
        setStorageBucket(parsed.storageBucket || '');
        setMessagingSenderId(parsed.messagingSenderId || '');
        setAppId(parsed.appId || '');
        setFirestoreDatabaseId(parsed.firestoreDatabaseId || '(default)');
      } catch (e) {
        console.warn('Unable to load stored firebase config from LocalStorage', e);
      }
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(false);
    setPinSuccess(false);

    const success = onUnlock(pinInput);
    if (success) {
      setPinSuccess(true);
      setPinInput('');
      setTimeout(() => setPinSuccess(false), 3000);
    } else {
      setPinError(true);
    }
  };

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config: FirebaseConfig = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim(),
      projectId: projectId.trim(),
      storageBucket: storageBucket.trim(),
      messagingSenderId: messagingSenderId.trim(),
      appId: appId.trim(),
      firestoreDatabaseId: firestoreDatabaseId.trim() !== '' ? firestoreDatabaseId.trim() : undefined,
    };

    onSaveFirebaseConfig(config);
    setConfigSuccess(true);
    setTimeout(() => {
      setConfigSuccess(false);
      // Reload page to apply new firebase configuration immediately!
      window.location.reload();
    }, 1500);
  };

  const handleResetConfig = () => {
    if (confirm('Bạn có muốn xóa cấu hình Firebase đã lưu và quay lại dùng LocalStorage?')) {
      onResetFirebaseConfig();
      setApiKey('');
      setAuthDomain('');
      setProjectId('');
      setStorageBucket('');
      setMessagingSenderId('');
      setAppId('');
      setFirestoreDatabaseId('(default)');
      alert('Đã xóa cấu hình Firebase. Ứng dụng sẽ tự chuyển sang lưu trữ trên LocalStorage!');
      window.location.reload();
    }
  };

  return (
    <div id="settings-view" className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT PANEL: ADMIN SIGN IN / PIN CODE CONTROL (5 Columns) */}
        <div id="settings-pin-control" className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#FFE1E5] flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-[#800F2F] pb-3 border-b border-[#FFF0F2] mb-5">
              <ShieldCheck size={18} />
              <h3 className="font-serif font-black text-sm">Phân quyền Hệ thống</h3>
            </div>

            {isAdmin ? (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider">Đã mở Khóa Quyền Admin</h4>
                  <p className="text-[11px] text-emerald-600 mt-1">Chào buổi học tốt, Hương! Bạn có toàn quyền thêm bài học, chỉnh sửa lộ trình, tải lên tài liệu và ghi chú nhật ký học tập.</p>
                </div>
                <button
                  id="lock-admin-btn-settings"
                  onClick={onLock}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-[#800F2F] text-white hover:bg-[#A71E40] transition-colors cursor-pointer"
                >
                  Khóa lại (Thoát Admin)
                </button>

                {/* Clear Mock Data tools block */}
                <div className="pt-4 border-t border-emerald-200 mt-2 space-y-2 text-left">
                  <h5 className="text-[10px] uppercase font-mono tracking-wider text-rose-800 font-bold flex items-center gap-1">
                    🧹 Dọn dẹp Không gian học tập
                  </h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Xóa sạch các ghi chú, tài liệu tải lên nháp cũ và lịch học thử nghiệm khỏi cơ sở dữ liệu để bắt đầu ghi chép học tập sạch sẽ.
                  </p>
                  <button
                    id="clear-all-data-btn"
                    type="button"
                    onClick={async () => {
                      if (confirm('Khẩn cấp: Bạn có chắc chắn muốn XÓA TOÀN BỘ lịch học, tài liệu của chính bạn khỏi Database? Mọi dữ liệu sẽ biến mất vĩnh viễn!')) {
                        try {
                          await onClearAllData();
                          alert('Đã dọn dẹp toàn bộ dữ liệu mẫu thành công. Hiện tại website đã sạch 100%!');
                        } catch (err) {
                          alert('Lỗi khi thực hiện dọn dẹp dữ liệu.');
                        }
                      }
                    }}
                    className="w-full py-2 rounded-xl text-xs font-bold border border-rose-200 bg-[#FFF0F2] text-[#800F2F] hover:bg-[#FFE1E5] transition-all cursor-pointer"
                  >
                    Xóa sạch dữ liệu mẫu & nháp
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePinSubmit} className="space-y-4">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Mặc định, ứng dụng chạy ở chế độ <strong>Người xem (Chỉ xem - Read-only)</strong>. Mọi thay đổi bài học hoặc tài liệu yêu cầu nhập chính xác mã PIN bí mật của bạn.
                </p>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Nhập mã PIN mật</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="password"
                      placeholder="Nhập mã PIN bảo mật của bạn..."
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      required
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#FFE1E5] focus:outline-none focus:border-[#800F2F] bg-white text-slate-800"
                    />
                  </div>
                </div>

                <button
                  id="unlock-admin-btn-settings"
                  type="submit"
                  className="w-full py-2 px-4 rounded-xl text-xs font-bold bg-[#800F2F] text-white hover:bg-[#A71E40] transition-all cursor-pointer shadow-sm shadow-[#800f2f]/10"
                >
                  Kích hoạt Quyền Admin
                </button>

                {pinError && (
                  <p className="text-[10px] font-bold text-red-500 text-center">
                    ❌ Sai mã PIN! Vui lòng kiểm tra lại.
                  </p>
                )}
                {pinSuccess && (
                  <p className="text-[10px] font-bold text-emerald-600 text-center">
                    ✓ Đăng nhập Admin thành công!
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Slogan */}
          <div className="mt-8 pt-4 border-t border-slate-50 text-center">
            <span className="text-[10px] font-mono text-slate-400 block tracking-wide">
              Mục tiêu học tập: <strong>Độ đại học Y dược</strong>
            </span>
          </div>
        </div>

        {/* RIGHT PANEL: DYNAMIC FIREBASE CONFIG REGISTRY (7 Columns) */}
        <div id="settings-firebase-config" className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#FFE1E5] shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#FFF0F2] mb-5">
            <div className="flex items-center gap-2 text-[#800F2F]">
              <Database size={18} />
              <h3 className="font-serif font-black text-sm">Cấu hình Firebase</h3>
            </div>
            <span className="text-[9px] font-mono tracking-widest bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold">
              {apiKey ? 'CONNECTED' : 'LOCAL ENGINE'}
            </span>
          </div>

          <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
            Dán thông tin <strong>Firebase Web App SDK Configuration</strong> của bạn vào đây để đồng bộ thực tế dữ liệu tiến độ và tài liệu trực tiếp lên đám mây Firestore, sẵn sàng triển khai bền bỉ lên Vercel.
          </p>

          <form onSubmit={handleConfigSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">API Key</label>
                <input
                  type="text"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#FFE1E5] focus:outline-none focus:border-[#800F2F] text-slate-800 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Auth Domain</label>
                <input
                  type="text"
                  placeholder="huonghoclai.firebaseapp.com"
                  value={authDomain}
                  onChange={(e) => setAuthDomain(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#FFE1E5] focus:outline-none focus:border-[#800F2F] text-slate-800 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Project ID</label>
                <input
                  type="text"
                  placeholder="huonghoclai"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#FFE1E5] focus:outline-none focus:border-[#800F2F] text-slate-800 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Storage Bucket</label>
                <input
                  type="text"
                  placeholder="huonghoclai.appspot.com"
                  value={storageBucket}
                  onChange={(e) => setStorageBucket(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#FFE1E5] focus:outline-none focus:border-[#800F2F] text-slate-800 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Messaging Sender ID</label>
                <input
                  type="text"
                  placeholder="1234567890"
                  value={messagingSenderId}
                  onChange={(e) => setMessagingSenderId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#FFE1E5] focus:outline-none focus:border-[#800F2F] text-slate-800 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">App ID</label>
                <input
                  type="text"
                  placeholder="1:1234567890:web:abcdef..."
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#FFE1E5] focus:outline-none focus:border-[#800F2F] text-slate-800 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Firestore Database ID (Tùy chọn)</label>
                <input
                  type="text"
                  placeholder="(default)"
                  value={firestoreDatabaseId}
                  onChange={(e) => setFirestoreDatabaseId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#FFE1E5] focus:outline-none focus:border-[#800F2F] text-slate-800 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              {apiKey && (
                <button
                  id="reset-firebase-btn"
                  type="button"
                  onClick={handleResetConfig}
                  className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-105 border border-rose-200 rounded-xl transition-all cursor-pointer"
                >
                  Xóa cấu hình
                </button>
              )}
              
              <button
                id="save-firebase-btn"
                type="submit"
                className="px-6 py-2 rounded-xl text-xs font-bold bg-[#800F2F] text-white hover:bg-[#A71E40] transition-colors shadow-sm cursor-pointer"
              >
                {configSuccess ? 'Đang lưu & Nạp lại' : 'Lưu & Đồng bộ đám mây'}
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* FOOTER AUTHOR DETAIL AT VERY BOTTOM COMPONENT INSTEAD OF EXTRA CLUTTER */}
      <div id="author-full-card" className="bg-[#FFF5F7] border border-[#FFE1E5] p-6 rounded-3xl shadow-sm">
        <h3 className="font-serif text-[#800F2F] font-bold text-base mb-4.5">Thông tin Tác giả</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-[#800F2F] border border-[#FFE1E5] flex items-center justify-center">
              <User size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400">Tác giả biên soạn</span>
              <h4 className="text-sm font-bold text-slate-800">Phạm Thúy Kiều Hương</h4>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-emerald-600 border border-[#FFE1E5] flex items-center justify-center">
              <Phone size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400">Số điện thoại liên lạc</span>
              <h4 className="text-sm font-bold text-slate-800 font-mono">0961476872</h4>
            </div>
          </div>

          <a 
            id="facebook-external-link"
            href="https://www.facebook.com/kieuhuong0606/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:translate-x-0.5 transition-transform group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-white text-blue-600 border border-[#FFE1E5] flex items-center justify-center group-hover:bg-blue-50/50">
              <Facebook size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#A71E40]">Facebook cá nhân</span>
              <h4 className="text-sm font-bold text-blue-700 underline decoration-dotted group-hover:text-blue-800">kieuhuong0606 ✦</h4>
            </div>
          </a>
        </div>
      </div>

    </div>
  );
}
