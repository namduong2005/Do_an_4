export type SectionKey = 'home' | 'booking' | 'trends' | 'news' | 'stores' | 'contact';

export const navItems: { key: SectionKey; label: string }[] = [
  { key: 'home', label: 'Trang chủ' },
  { key: 'booking', label: 'Đặt lịch' },
  { key: 'trends', label: 'Xu hướng' },
  { key: 'stores', label: 'Chuỗi cửa hàng' },
  { key: 'contact', label: 'Liên hệ' },
];
