import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
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

const stores = [
  { id: 'hoang-dieu', name: 'Cơ sở Ba Đình', address: '16C phố Hoàng Diệu - Ba Đình - Hà Nội' },
  { id: 'cau-giay', name: 'Cơ sở 2 Cầu Giấy', address: '128 Trần Thái Tông - Cầu Giấy - Hà Nội' },
  { id: 'ha-dong', name: 'Cơ sở 3 Hà Đông', address: '86 Nguyễn Trãi - Hà Đông - Hà Nội' },
  { id: 'hung-yen', name: 'Cơ sở 4 Hưng Yên', address: '35 Đỗ Thế Diên - Mỹ Hào - Hưng Yên' },
];

export default function StoresScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 760;
  const isTablet = width < 1040;
  const [loginVisible, setLoginVisible] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const displayName = useMemo(() => userName?.split(' ').filter(Boolean).pop() ?? '', [userName]);

  const goTo = (key: string) => {
    if (key === 'home') router.push('/');
    if (key === 'booking') router.push('/booking');
    if (key === 'trends') router.push('/trends');
    if (key === 'contact') router.push('/contact');
  };

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
                      <Text style={[styles.navText, item.key === 'stores' && styles.navTextActive]}>{item.label}</Text>
                      {item.key === 'stores' && <View style={styles.navUnderline} />}
                    </>
                  );
                  return item.key === 'home' || item.key === 'booking' || item.key === 'trends' || item.key === 'contact' ? (
                    <Pressable key={item.key} onPress={() => goTo(item.key)} style={styles.navItem}>{content}</Pressable>
                  ) : (
                    <View key={item.key} style={styles.navItem}>{content}</View>
                  );
                })}
              </View>
            )}

            <Pressable onPress={() => !userName && setLoginVisible(true)} style={({ pressed }) => [styles.loginButton, pressed && styles.pressed]}>
              <Text numberOfLines={1} style={styles.loginText}>{userName ? displayName : 'Đăng nhập'}</Text>
              {userName && <Ionicons name="chevron-down" size={15} color="#123B5D" />}
            </Pressable>
          </View>

          {isTablet && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.mobileNav}>
              {navItems.map((item) => {
                const content = <Text style={[styles.mobileNavText, item.key === 'stores' && styles.mobileNavTextActive]}>{item.label}</Text>;
                return item.key === 'home' || item.key === 'booking' || item.key === 'trends' || item.key === 'contact' ? (
                  <Pressable key={item.key} onPress={() => goTo(item.key)} style={styles.mobileNavItem}>{content}</Pressable>
                ) : (
                  <View key={item.key} style={[styles.mobileNavItem, item.key === 'stores' && styles.mobileNavItemActive]}>{content}</View>
                );
              })}
            </ScrollView>
          )}
        </View>

        <View style={[styles.storeSection, isMobile && styles.storeSectionMobile]}>
          <View style={[styles.storeGrid, isMobile && styles.storeGridMobile]}>
            {stores.map((store) => (
              <View key={store.id} style={[styles.storeCard, isMobile && styles.storeCardMobile]}>
                <Text style={[styles.storeName, isMobile && styles.storeNameMobile]}>{store.name}</Text>
                <View style={styles.infoRow}>
                  <Ionicons name="location" size={20} color="#D94C4C" />
                  <Text style={[styles.infoText, isMobile && styles.infoTextMobile]}>{store.address}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="call" size={19} color="#1677D2" />
                  <Text style={[styles.infoText, isMobile && styles.infoTextMobile]}>0123456789</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

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
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
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
  storeSection: { paddingHorizontal: 28, paddingVertical: 42 },
  storeSectionMobile: { paddingHorizontal: 14, paddingVertical: 24 },
  storeGrid: { width: '100%', maxWidth: 1180, alignSelf: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 22 },
  storeGridMobile: { gap: 14 },
  storeCard: { width: '48%', minHeight: 165, paddingHorizontal: 26, paddingVertical: 24, justifyContent: 'center', borderWidth: 1.5, borderColor: '#F2B84B', borderRadius: 18, backgroundColor: '#FFF8E8', shadowColor: '#8D6A27', shadowOpacity: 0.1, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  storeCardMobile: { width: '100%', minHeight: 150, paddingHorizontal: 20, paddingVertical: 20 },
  storeName: { color: '#123B5D', fontSize: 23, lineHeight: 30, fontWeight: '900', marginBottom: 14 },
  storeNameMobile: { fontSize: 18, lineHeight: 24, marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, marginTop: 8 },
  infoText: { flex: 1, color: '#263D52', fontSize: 16, lineHeight: 22 },
  infoTextMobile: { fontSize: 14, lineHeight: 20 },
  pressed: { opacity: 0.82 },
});
