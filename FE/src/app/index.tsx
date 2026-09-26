import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
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

const heroImage = require('../../assets/images/trangchu1.jpg');
const bannerImage2 = require('../../assets/images/trangchu2.png');
const bannerImage3 = require('../../assets/images/trangchu3.webp');

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 760;
  const isTablet = width < 1040;
  const [loginVisible, setLoginVisible] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const displayName = useMemo(
    () => userName?.split(' ').filter(Boolean).pop() ?? '',
    [userName],
  );

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
                {navItems.map((item) => (
                  item.key === 'booking' || item.key === 'trends' || item.key === 'stores' || item.key === 'contact' ? (
                    <Pressable key={item.key} onPress={() => router.push(item.key === 'booking' ? '/booking' : item.key === 'trends' ? '/trends' : item.key === 'stores' ? '/stores' : '/contact')} style={styles.navItem}>
                      <Text style={styles.navText}>{item.label}</Text>
                    </Pressable>
                  ) : (
                    <View key={item.key} style={styles.navItem}>
                      <Text style={[styles.navText, item.key === 'home' && styles.navTextActive]}>{item.label}</Text>
                      {item.key === 'home' && <View style={styles.navUnderline} />}
                    </View>
                  )
                ))}
              </View>
            )}

            <Pressable
              onPress={() => !userName && setLoginVisible(true)}
              style={({ pressed }) => [styles.loginButton, pressed && styles.pressed]}
            >
              <Text numberOfLines={1} style={styles.loginText}>
                {userName ? displayName : 'Đăng nhập'}
              </Text>
              {userName && <Ionicons name="chevron-down" size={15} color="#123B5D" />}
            </Pressable>
          </View>

          {isTablet && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.mobileNav}>
              {navItems.map((item) => (
                item.key === 'booking' || item.key === 'trends' || item.key === 'stores' || item.key === 'contact' ? (
                  <Pressable key={item.key} onPress={() => router.push(item.key === 'booking' ? '/booking' : item.key === 'trends' ? '/trends' : item.key === 'stores' ? '/stores' : '/contact')} style={styles.mobileNavItem}>
                    <Text style={styles.mobileNavText}>{item.label}</Text>
                  </Pressable>
                ) : (
                  <View key={item.key} style={[styles.mobileNavItem, item.key === 'home' && styles.mobileNavItemActive]}>
                    <Text style={[styles.mobileNavText, item.key === 'home' && styles.mobileNavTextActive]}>{item.label}</Text>
                  </View>
                )
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.heroSection}>
          <View style={[styles.bannerGrid, isMobile && styles.bannerGridMobile]}>
            <ImageBackground
              source={heroImage}
              resizeMode="cover"
              style={[styles.hero, isMobile && styles.heroMobile, isMobile && { height: width - 40 }]}
              imageStyle={styles.heroImage}
            >
              <View style={styles.heroShade} />
              <View style={[styles.heroContent, isMobile && styles.heroContentMobile]}>
                <Text style={[styles.heroCopy, isMobile && styles.heroCopyMobile]}>
                  Trải nghiệm dịch vụ tóc nam chuyên nghiệp trong không gian hiện đại và thư giãn.
                </Text>
                <Pressable onPress={() => router.push('/booking')} style={styles.bookingButton}>
                  <Text style={styles.bookingButtonText}>ĐẶT LỊCH NGAY</Text>
                  <Ionicons name="arrow-forward" size={18} color="#102A43" />
                </Pressable>
              </View>
            </ImageBackground>

            <View style={[styles.secondaryColumn, isMobile && styles.secondaryColumnMobile]}>
              <View style={styles.secondaryBanner}>
                <Image source={bannerImage2} resizeMode="cover" style={styles.secondaryPhoto} />
              </View>
              <View style={styles.secondaryBanner}>
                <Image source={bannerImage3} resizeMode="cover" style={styles.secondaryPhoto} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerTitle}>TÓC NAM ĐẸP NAM DƯƠNG SALON</Text>
            <Text style={styles.footerCommitment}>
              NAM DƯƠNG SALON CAM KẾT BẢO HÀNH 10 NGÀY VÀ HOÀN TIỀN 300%
            </Text>
            <FooterLine icon="location" text="16C phố Hoàng Diệu, Ba Đình, Hà Nội" />
            <FooterLine icon="call" text="0123456789" />
            <View style={styles.socialRow}>
              {['logo-facebook', 'logo-youtube', 'logo-tiktok', 'mail-outline', 'chatbubble-ellipses-outline'].map((icon) => (
                <View key={icon} style={styles.socialButton}>
                  <Ionicons name={icon as never} size={20} color="#FFFFFF" />
                </View>
              ))}
            </View>
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

function FooterLine({ icon, text }: { icon: 'location' | 'call'; text: string }) {
  return (
    <View style={styles.footerLine}>
      <Ionicons name={icon} size={24} color="#F2B84B" />
      <Text style={styles.footerLineText}>{text}</Text>
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
  heroSection: { padding: 20, paddingTop: 18, backgroundColor: '#F2F4F5' },
  bannerGrid: { maxWidth: 1500, width: '100%', alignSelf: 'center', flexDirection: 'row', gap: 14 },
  bannerGridMobile: { flexDirection: 'column' },
  hero: { flex: 2, minHeight: 360, overflow: 'hidden', justifyContent: 'center' },
  heroMobile: { width: '100%', minHeight: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto' },
  heroImage: { borderRadius: 25 },
  heroShade: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 25, backgroundColor: 'rgba(255, 255, 255, 0.12)' },
  heroContent: { maxWidth: 590, paddingHorizontal: 52, paddingVertical: 42, transform: [{ translateY: 78 }] },
  heroContentMobile: { position: 'absolute', left: 25, right: 25, top: '60%', paddingHorizontal: 0, paddingVertical: 0, maxWidth: 590, transform: [{ translateY: 0 }] },
  heroCopy: { color: '#1A1A1A', maxWidth: 470, fontSize: 15, lineHeight: 23, marginTop: 15 },
  heroCopyMobile: { fontSize: 15, lineHeight: 23 },
  bookingButton: { alignSelf: 'flex-start', minHeight: 47, borderRadius: 12, backgroundColor: '#F2B84B', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 9 },
  bookingButtonText: { color: '#102A43', fontSize: 13, fontWeight: '900', letterSpacing: 0.4 },
  secondaryColumn: { flex: 1, gap: 14 },
  secondaryColumnMobile: { flexDirection: 'row', width: '100%' },
  secondaryBanner: { flex: 1, minHeight: 173, overflow: 'hidden', borderRadius: 20 },
  secondaryPhoto: { width: '100%', height: '100%' },
  footer: { backgroundColor: '#111316', minHeight: 270, paddingHorizontal: '8%', paddingVertical: 42, alignItems: 'center' },
  socialRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 14 },
  socialButton: { width: 34, height: 34, borderRadius: 9, backgroundColor: '#233143', alignItems: 'center', justifyContent: 'center' },
  footerContent: { width: '100%', maxWidth: 720 },
  footerTitle: { color: '#F2B84B', fontSize: 14, fontWeight: '900' },
  footerCommitment: { color: '#FFFFFF', fontSize: 11, lineHeight: 15, fontWeight: '800', marginTop: 10, marginBottom: 5 },
  footerLine: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  footerLineText: { color: '#FFFFFF', fontSize: 11, lineHeight: 16 },
  pressed: { opacity: 0.82 },
});
