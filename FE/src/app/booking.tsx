import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { Brand } from '@/components/Brand';
import { LoginModal } from '@/components/LoginModal';
import { navItems } from '@/data/home';

const services = [
  {
    id: 'haircut',
    name: 'Cắt tóc thông thường',
    price: '50.000 VNĐ',
    image: require('../../assets/images/datlich1.jpg'),
  },
  {
    id: 'color',
    name: 'Nhuộm',
    price: '299.000 VNĐ',
    image: require('../../assets/images/datlich2.webp'),
  },
  {
    id: 'perm',
    name: 'Uốn',
    price: '199.000 VNĐ',
    image: require('../../assets/images/datlich3.webp'),
  },
  {
    id: 'combo',
    name: 'COMBO 3 trong 1 cắt, gội, tạo kiểu',
    price: '69.000 VNĐ',
    image: require('../../assets/images/datlich4.webp'),
  },
];

const storeOptions = [
  'Cơ sở Hoàng Diệu',
  'Cơ sở Cầu Giấy',
  'Cơ sở Hai Bà Trưng',
  'Cơ sở Hà Đông',
];

const timeOptions = Array.from({ length: 25 }, (_, index) => {
  const totalMinutes = 8 * 60 + index * 30;
  const hour = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const minute = (totalMinutes % 60).toString().padStart(2, '0');
  return `${hour}:${minute}`;
});

export default function BookingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 760;
  const isTablet = width < 1040;
  const [loginVisible, setLoginVisible] = useState(false);
  const [authPromptVisible, setAuthPromptVisible] = useState(false);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('');
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [barberDropdownOpen, setBarberDropdownOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const displayName = useMemo(() => userName?.split(' ').filter(Boolean).pop() ?? '', [userName]);
  const barberOptions = selectedStore === 'Cơ sở Hoàng Diệu' ? ['Nhân viên A', 'Nhân viên B'] : [];

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerShell}>
          <View style={[styles.brandBar, isMobile && styles.brandBarMobile]}>
            <Brand compact={isMobile} />
          </View>

          <View style={[styles.header, isTablet && styles.headerTablet]}>
            <View style={styles.headerSpacer} />

            {!isTablet && (
              <View style={styles.desktopNav}>
                {navItems.map((item) => {
                  const content = (
                    <>
                      <Text style={[styles.navText, item.key === 'booking' && styles.navTextActive]}>{item.label}</Text>
                      {item.key === 'booking' && <View style={styles.navUnderline} />}
                    </>
                  );

                  if (item.key === 'home' || item.key === 'trends' || item.key === 'stores' || item.key === 'contact') {
                    return <Pressable key={item.key} onPress={() => router.push(item.key === 'home' ? '/' : item.key === 'trends' ? '/trends' : item.key === 'stores' ? '/stores' : '/contact')} style={styles.navItem}>{content}</Pressable>;
                  }

                  return <View key={item.key} style={styles.navItem}>{content}</View>;
                })}
              </View>
            )}

            <Pressable
              onPress={() => !userName && setLoginVisible(true)}
              style={({ pressed }) => [styles.loginButton, pressed && styles.pressed]}
            >
              <Text numberOfLines={1} style={styles.loginText}>{userName ? displayName : 'Đăng nhập'}</Text>
              {userName && <Ionicons name="chevron-down" size={15} color="#123B5D" />}
            </Pressable>
          </View>

          {isTablet && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.mobileNav}>
              {navItems.map((item) => {
                const itemContent = (
                  <Text style={[styles.mobileNavText, item.key === 'booking' && styles.mobileNavTextActive]}>{item.label}</Text>
                );

                if (item.key === 'home' || item.key === 'trends' || item.key === 'stores' || item.key === 'contact') {
                  return <Pressable key={item.key} onPress={() => router.push(item.key === 'home' ? '/' : item.key === 'trends' ? '/trends' : item.key === 'stores' ? '/stores' : '/contact')} style={styles.mobileNavItem}>{itemContent}</Pressable>;
                }

                return (
                  <View key={item.key} style={[styles.mobileNavItem, item.key === 'booking' && styles.mobileNavItemActive]}>
                    {itemContent}
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>

        <View style={[styles.serviceSection, isMobile && styles.serviceSectionMobile]}>
          <View style={[styles.serviceGrid, isMobile && styles.serviceGridMobile]}>
            {services.map((service) => (
              <Pressable
                key={service.id}
                onPress={() => {
                  setSelectedService(service.name);
                  if (!userName) {
                    setAuthPromptVisible(true);
                  } else {
                    setBookingFormVisible(true);
                  }
                }}
                style={({ pressed }) => [
                  styles.serviceCard,
                  { width: isMobile ? Math.floor((width - 40) / 2) : '48%' },
                  pressed && styles.serviceCardPressed,
                ]}
              >
                <Image source={service.image} resizeMode="cover" style={[styles.serviceImage, isMobile && styles.serviceImageMobile]} />
                <View style={[styles.serviceContent, isMobile && styles.serviceContentMobile]}>
                  <Text style={[styles.serviceName, isMobile && styles.serviceNameMobile]}>{service.name}</Text>
                  <Text style={[styles.servicePrice, isMobile && styles.servicePriceMobile]}>
                    Giá từ: {service.price}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={authPromptVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAuthPromptVisible(false)}
      >
        <View style={styles.authBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setAuthPromptVisible(false)} />
          <View style={styles.authCard}>
            <View style={styles.authIcon}>
              <Ionicons name="lock-closed-outline" size={26} color="#FFFFFF" />
            </View>
            <Text style={styles.authTitle}>Bạn chưa đăng nhập</Text>
            <Text style={styles.authMessage}>Vui lòng đăng nhập để tiếp tục đặt lịch.</Text>
            <View style={styles.authActions}>
              <Pressable
                onPress={() => setAuthPromptVisible(false)}
                style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setAuthPromptVisible(false);
                  setLoginVisible(true);
                }}
                style={({ pressed }) => [styles.loginNowButton, pressed && styles.pressed]}
              >
                <Text style={styles.loginNowButtonText}>Đăng nhập ngay</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={bookingFormVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setBookingFormVisible(false)}
      >
        <View style={styles.bookingBackdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              setBookingFormVisible(false);
              setStoreDropdownOpen(false);
              setTimeDropdownOpen(false);
              setBarberDropdownOpen(false);
            }}
          />
          <View style={styles.bookingCard}>
            <Pressable
              accessibilityLabel="Đóng"
              onPress={() => {
                setBookingFormVisible(false);
                setStoreDropdownOpen(false);
                setTimeDropdownOpen(false);
                setBarberDropdownOpen(false);
              }}
              style={styles.bookingCloseButton}
            >
              <Ionicons name="close" size={21} color="#60758A" />
            </Pressable>

            <Text style={styles.bookingTitle}>Đặt lịch dịch vụ</Text>
            <Text style={styles.selectedServiceText}>{selectedService}</Text>

            <Text style={styles.fieldLabel}>1. Chọn cơ sở</Text>
            <Pressable
              onPress={() => {
                setStoreDropdownOpen((current) => !current);
                setTimeDropdownOpen(false);
                setBarberDropdownOpen(false);
              }}
              style={[styles.selectBox, storeDropdownOpen && styles.selectBoxOpen]}
            >
              <Text style={[styles.selectText, !selectedStore && styles.placeholderText]}>
                {selectedStore || 'Chọn cơ sở'}
              </Text>
              <Ionicons name={storeDropdownOpen ? 'chevron-up' : 'chevron-down'} size={19} color="#526A7F" />
            </Pressable>
            {storeDropdownOpen && (
              <View style={styles.dropdownList}>
                {storeOptions.map((store) => (
                  <Pressable
                    key={store}
                    onPress={() => {
                      setSelectedStore(store);
                      setSelectedBarber('');
                      setStoreDropdownOpen(false);
                    }}
                    style={({ pressed }) => [styles.dropdownOption, pressed && styles.dropdownOptionPressed]}
                  >
                    <Text style={styles.dropdownOptionText}>{store}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            <Text style={styles.fieldLabel}>2. Chọn khung giờ</Text>
            <Pressable
              onPress={() => {
                setTimeDropdownOpen((current) => !current);
                setStoreDropdownOpen(false);
                setBarberDropdownOpen(false);
              }}
              style={[styles.selectBox, timeDropdownOpen && styles.selectBoxOpen]}
            >
              <Text style={[styles.selectText, !selectedTime && styles.placeholderText]}>
                {selectedTime || 'Chọn khung giờ'}
              </Text>
              <Ionicons name={timeDropdownOpen ? 'chevron-up' : 'chevron-down'} size={19} color="#526A7F" />
            </Pressable>
            {timeDropdownOpen && (
              <ScrollView style={styles.timeDropdownList} nestedScrollEnabled>
                {timeOptions.map((time) => (
                  <Pressable
                    key={time}
                    onPress={() => {
                      setSelectedTime(time);
                      setTimeDropdownOpen(false);
                    }}
                    style={({ pressed }) => [styles.dropdownOption, pressed && styles.dropdownOptionPressed]}
                  >
                    <Text style={styles.dropdownOptionText}>{time}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}

            <Text style={styles.fieldLabel}>3. Chọn barber</Text>
            <Pressable
              disabled={!selectedStore || barberOptions.length === 0}
              onPress={() => {
                setBarberDropdownOpen((current) => !current);
                setStoreDropdownOpen(false);
                setTimeDropdownOpen(false);
              }}
              style={[
                styles.selectBox,
                barberDropdownOpen && styles.selectBoxOpen,
                (!selectedStore || barberOptions.length === 0) && styles.selectBoxDisabled,
              ]}
            >
              <Text style={[styles.selectText, !selectedBarber && styles.placeholderText]}>
                {selectedBarber || (!selectedStore ? 'Chọn cơ sở trước' : 'Chọn barber')}
              </Text>
              <Ionicons name={barberDropdownOpen ? 'chevron-up' : 'chevron-down'} size={19} color="#526A7F" />
            </Pressable>
            {barberDropdownOpen && (
              <View style={styles.dropdownList}>
                {barberOptions.map((barber) => (
                  <Pressable
                    key={barber}
                    onPress={() => {
                      setSelectedBarber(barber);
                      setBarberDropdownOpen(false);
                    }}
                    style={({ pressed }) => [styles.dropdownOption, pressed && styles.dropdownOptionPressed]}
                  >
                    <Text style={styles.dropdownOptionText}>{barber}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            <Pressable
              disabled={!selectedStore || !selectedTime || !selectedBarber}
              onPress={() => {
                setBookingFormVisible(false);
                setStoreDropdownOpen(false);
                setTimeDropdownOpen(false);
                setBarberDropdownOpen(false);
              }}
              style={({ pressed }) => [
                styles.confirmButton,
                (!selectedStore || !selectedTime || !selectedBarber) && styles.confirmButtonDisabled,
                pressed && selectedStore && selectedTime && selectedBarber ? styles.pressed : null,
              ]}
            >
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <LoginModal
        visible={loginVisible}
        onClose={() => setLoginVisible(false)}
        onLogin={(name, role) => {
          setLoginVisible(false);
          if (role === 'employee') {
            router.replace('/employee');
            return;
          }
          setUserName(name);
          if (selectedService) setBookingFormVisible(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3F4F5' },
  headerShell: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#EDF0F2' },
  brandBar: { minHeight: 112, backgroundColor: '#F2B84B', alignItems: 'center', justifyContent: 'center', paddingVertical: 9 },
  brandBarMobile: { minHeight: 100, paddingVertical: 8 },
  header: { minHeight: 68, width: '100%', maxWidth: 1500, alignSelf: 'center', paddingHorizontal: 36, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTablet: { paddingHorizontal: 18, minHeight: 60 },
  headerSpacer: { width: 116 },
  desktopNav: { flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', gap: 29 },
  navItem: { height: '100%', justifyContent: 'center', position: 'relative' },
  navText: { color: '#263D52', fontSize: 15, fontWeight: '600' },
  navTextActive: { color: '#123B5D', fontWeight: '800' },
  navUnderline: { position: 'absolute', bottom: 13, left: 0, right: 0, height: 2, borderRadius: 2, backgroundColor: '#F2B84B' },
  mobileNav: { paddingHorizontal: 14, paddingBottom: 10, gap: 8 },
  mobileNavItem: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: '#F3F6F8' },
  mobileNavItemActive: { backgroundColor: '#123B5D' },
  mobileNavText: { color: '#526A7F', fontSize: 13, fontWeight: '700' },
  mobileNavTextActive: { color: '#FFFFFF' },
  loginButton: { minWidth: 116, height: 42, borderWidth: 1.5, borderColor: '#123B5D', borderRadius: 14, paddingHorizontal: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#FFFFFF' },
  loginText: { color: '#123B5D', fontSize: 14, fontWeight: '800', maxWidth: 110 },
  serviceSection: { paddingHorizontal: 28, paddingVertical: 42 },
  serviceSectionMobile: { paddingHorizontal: 14, paddingVertical: 24 },
  serviceGrid: { width: '100%', maxWidth: 1120, alignSelf: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 22 },
  serviceGridMobile: { gap: 12 },
  serviceCard: { maxWidth: 549, overflow: 'hidden', borderRadius: 22, backgroundColor: '#FFFFFF', shadowColor: '#0A2033', shadowOpacity: 0.1, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 4 },
  serviceCardPressed: { opacity: 0.86 },
  serviceImage: { width: '100%', height: 250 },
  serviceImageMobile: { height: 130 },
  serviceContent: { minHeight: 108, paddingHorizontal: 24, paddingVertical: 19, justifyContent: 'center' },
  serviceContentMobile: { minHeight: 104, paddingHorizontal: 13, paddingVertical: 13, justifyContent: 'flex-start' },
  serviceName: { color: '#123B5D', fontSize: 24, lineHeight: 31, fontWeight: '800' },
  serviceNameMobile: { fontSize: 15, lineHeight: 20 },
  servicePrice: { color: '#6C5B4C', fontSize: 16, marginTop: 8 },
  servicePriceMobile: { fontSize: 11, lineHeight: 15, marginTop: 6 },
  authBackdrop: { flex: 1, backgroundColor: 'rgba(5, 19, 32, 0.64)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  authCard: { width: '100%', maxWidth: 410, borderRadius: 24, backgroundColor: '#FFFFFF', padding: 26, alignItems: 'center', shadowColor: '#071929', shadowOpacity: 0.2, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 8 },
  authIcon: { width: 52, height: 52, borderRadius: 17, backgroundColor: '#123B5D', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  authTitle: { color: '#102A43', fontSize: 23, fontWeight: '900', textAlign: 'center' },
  authMessage: { color: '#698096', fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 7 },
  authActions: { width: '100%', flexDirection: 'row', gap: 12, marginTop: 24 },
  cancelButton: { flex: 1, height: 48, borderRadius: 14, borderWidth: 1.5, borderColor: '#CCD7E0', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  cancelButtonText: { color: '#526A7F', fontSize: 14, fontWeight: '800' },
  loginNowButton: { flex: 1.4, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2B84B' },
  loginNowButtonText: { color: '#102A43', fontSize: 14, fontWeight: '900' },
  bookingBackdrop: { flex: 1, backgroundColor: 'rgba(5, 19, 32, 0.64)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  bookingCard: { width: '100%', maxWidth: 470, maxHeight: '88%', borderRadius: 24, backgroundColor: '#FFFFFF', padding: 26, shadowColor: '#071929', shadowOpacity: 0.2, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 8 },
  bookingCloseButton: { position: 'absolute', right: 16, top: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: '#F2F5F7', alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  bookingTitle: { color: '#102A43', fontSize: 23, fontWeight: '900', paddingRight: 38 },
  selectedServiceText: { color: '#6C5B4C', fontSize: 14, lineHeight: 20, marginTop: 5, marginBottom: 21 },
  fieldLabel: { color: '#263D52', fontSize: 14, fontWeight: '800', marginTop: 13, marginBottom: 8 },
  selectBox: { minHeight: 50, borderWidth: 1.5, borderColor: '#CBD7E1', borderRadius: 12, backgroundColor: '#FAFCFD', paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  selectBoxOpen: { borderColor: '#3694E7' },
  selectBoxDisabled: { backgroundColor: '#EEF2F4', opacity: 0.72 },
  selectText: { flex: 1, color: '#102A43', fontSize: 15, fontWeight: '600' },
  placeholderText: { color: '#8093A6', fontWeight: '500' },
  dropdownList: { borderWidth: 1, borderColor: '#CBD7E1', borderTopWidth: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, overflow: 'hidden', backgroundColor: '#FFFFFF' },
  timeDropdownList: { maxHeight: 180, borderWidth: 1, borderColor: '#CBD7E1', borderTopWidth: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, backgroundColor: '#FFFFFF' },
  dropdownOption: { minHeight: 43, justifyContent: 'center', paddingHorizontal: 15, borderTopWidth: 1, borderTopColor: '#EDF1F4', backgroundColor: '#FFFFFF' },
  dropdownOptionPressed: { backgroundColor: '#E9F3FF' },
  dropdownOptionText: { color: '#263D52', fontSize: 14, fontWeight: '600' },
  confirmButton: { height: 50, borderRadius: 14, backgroundColor: '#F2B84B', alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  confirmButtonDisabled: { backgroundColor: '#D8DEE3' },
  confirmButtonText: { color: '#102A43', fontSize: 15, fontWeight: '900' },
  pressed: { opacity: 0.82 },
});
