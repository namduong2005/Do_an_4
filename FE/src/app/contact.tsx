import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Linking,
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

const MESSENGER_URL = 'https://www.facebook.com/';

export default function ContactScreen() {
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
    if (key === 'stores') router.push('/stores');
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
                      <Text style={[styles.navText, item.key === 'contact' && styles.navTextActive]}>{item.label}</Text>
                      {item.key === 'contact' && <View style={styles.navUnderline} />}
                    </>
                  );
                  return item.key === 'home' || item.key === 'booking' || item.key === 'trends' || item.key === 'stores' ? (
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
                const content = <Text style={[styles.mobileNavText, item.key === 'contact' && styles.mobileNavTextActive]}>{item.label}</Text>;
                return item.key === 'home' || item.key === 'booking' || item.key === 'trends' || item.key === 'stores' ? (
                  <Pressable key={item.key} onPress={() => goTo(item.key)} style={styles.mobileNavItem}>{content}</Pressable>
                ) : (
                  <View key={item.key} style={[styles.mobileNavItem, styles.mobileNavItemActive]}>{content}</View>
                );
              })}
            </ScrollView>
          )}
        </View>

        <View style={[styles.contactSection, isMobile && styles.contactSectionMobile]}>
          <View style={[styles.contactCard, isMobile && styles.contactCardMobile]}>
            <Text style={[styles.title, isMobile && styles.titleMobile]}>LIÊN HỆ</Text>
            <View style={styles.divider} />
            <View style={styles.contactRow}>
              <View style={styles.iconBox}>
                <Ionicons name="location" size={23} color="#123B5D" />
              </View>
              <View style={styles.contactTextBox}>
                <Text style={styles.label}>Địa chỉ</Text>
                <Text style={[styles.value, isMobile && styles.valueMobile]}>16C phố Hoàng Diệu, Ba Đình, Hà Nội</Text>
              </View>
            </View>
            <View style={styles.contactRow}>
              <View style={[styles.iconBox, styles.phoneIconBox]}>
                <Ionicons name="call" size={22} color="#FFFFFF" />
              </View>
              <View style={styles.contactTextBox}>
                <Text style={styles.label}>Số điện thoại</Text>
                <Text style={[styles.value, isMobile && styles.valueMobile]}>0123456789</Text>
              </View>
            </View>
            <Pressable
              onPress={() => void Linking.openURL(MESSENGER_URL)}
              style={({ pressed }) => [styles.contactRow, pressed && styles.pressed]}
            >
              <View style={[styles.iconBox, styles.messengerIconBox]}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.contactTextBox}>
                <Text style={styles.label}>Messenger</Text>
                <Text style={[styles.value, isMobile && styles.valueMobile]}>Nam Dương Salon</Text>
              </View>
            </Pressable>
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
  contactSection: { paddingHorizontal: 28, paddingVertical: 52, alignItems: 'center' },
  contactSectionMobile: { paddingHorizontal: 16, paddingVertical: 28 },
  contactCard: { width: '100%', maxWidth: 720, paddingHorizontal: 38, paddingVertical: 34, borderWidth: 1.5, borderColor: '#F2B84B', borderRadius: 20, backgroundColor: '#FFF8E8', shadowColor: '#8D6A27', shadowOpacity: 0.1, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  contactCardMobile: { paddingHorizontal: 20, paddingVertical: 25 },
  title: { color: '#123B5D', fontSize: 25, lineHeight: 32, fontWeight: '900', textAlign: 'center' },
  titleMobile: { fontSize: 19, lineHeight: 25 },
  divider: { width: 64, height: 3, borderRadius: 3, backgroundColor: '#F2B84B', alignSelf: 'center', marginTop: 13, marginBottom: 14 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 17 },
  iconBox: { width: 44, height: 44, borderRadius: 13, backgroundColor: '#F2B84B', alignItems: 'center', justifyContent: 'center' },
  phoneIconBox: { backgroundColor: '#E53935' },
  contactTextBox: { flex: 1 },
  label: { color: '#6C5B4C', fontSize: 12, fontWeight: '700', marginBottom: 3 },
  value: { color: '#263D52', fontSize: 17, lineHeight: 23, fontWeight: '700' },
  valueMobile: { fontSize: 14, lineHeight: 20 },
  messengerIconBox: { backgroundColor: '#0084FF' },
  pressed: { opacity: 0.82 },
});
