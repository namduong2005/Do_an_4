import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Image,
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

const hairstyles = [
  { id: 'layer', name: 'Kiểu tóc Layer bung', image: require('../../assets/images/xuhuong1.webp') },
  { id: 'mohican', name: 'Tóc Mohican', image: require('../../assets/images/xuhuong2.webp') },
  { id: 'cement-gray', name: 'Nhuộm xám xi măng', image: require('../../assets/images/xuhuong3.jpg') },
  { id: 'milk-tea', name: 'Nhuộm nâu trà sữa', image: require('../../assets/images/xuhuong4.jpg') },
  { id: 'zigzag', name: 'Uốn Ziczac', image: require('../../assets/images/datlich3.webp') },
  { id: 'premlock', name: 'Uốn Premlock', image: require('../../assets/images/xuhuong6.webp') },
];

export default function TrendsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 760;
  const isTablet = width < 1040;
  const [loginVisible, setLoginVisible] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const displayName = useMemo(() => userName?.split(' ').filter(Boolean).pop() ?? '', [userName]);

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
                      <Text style={[styles.navText, item.key === 'trends' && styles.navTextActive]}>{item.label}</Text>
                      {item.key === 'trends' && <View style={styles.navUnderline} />}
                    </>
                  );

                  if (item.key === 'home' || item.key === 'booking' || item.key === 'stores' || item.key === 'contact') {
                    return (
                      <Pressable
                        key={item.key}
                        onPress={() => router.push(item.key === 'home' ? '/' : item.key === 'booking' ? '/booking' : item.key === 'stores' ? '/stores' : '/contact')}
                        style={styles.navItem}
                      >
                        {content}
                      </Pressable>
                    );
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
                  <Text style={[styles.mobileNavText, item.key === 'trends' && styles.mobileNavTextActive]}>{item.label}</Text>
                );

                if (item.key === 'home' || item.key === 'booking' || item.key === 'stores' || item.key === 'contact') {
                  return (
                    <Pressable
                      key={item.key}
                      onPress={() => router.push(item.key === 'home' ? '/' : item.key === 'booking' ? '/booking' : item.key === 'stores' ? '/stores' : '/contact')}
                      style={styles.mobileNavItem}
                    >
                      {itemContent}
                    </Pressable>
                  );
                }

                return (
                  <View key={item.key} style={[styles.mobileNavItem, item.key === 'trends' && styles.mobileNavItemActive]}>
                    {itemContent}
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>

        <View style={[styles.gallerySection, isMobile && styles.gallerySectionMobile]}>
          <View style={[styles.galleryGrid, isMobile && styles.galleryGridMobile]}>
            {hairstyles.map((hairstyle) => (
              <View
                key={hairstyle.id}
                style={[
                  styles.galleryCard,
                  { width: isMobile ? Math.floor((width - 40) / 2) : '31.5%' },
                ]}
              >
                <Image source={hairstyle.image} resizeMode="cover" style={[styles.galleryImage, isMobile && styles.galleryImageMobile]} />
                <View style={[styles.nameBox, isMobile && styles.nameBoxMobile]}>
                  <Text style={[styles.hairstyleName, isMobile && styles.hairstyleNameMobile]}>{hairstyle.name}</Text>
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
  screen: { flex: 1, backgroundColor: '#101010' },
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
  gallerySection: { paddingHorizontal: 28, paddingVertical: 34, backgroundColor: '#101010' },
  gallerySectionMobile: { paddingHorizontal: 14, paddingVertical: 22 },
  galleryGrid: { width: '100%', maxWidth: 1320, alignSelf: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 22 },
  galleryGridMobile: { gap: 12 },
  galleryCard: { overflow: 'hidden', backgroundColor: '#FFFFFF' },
  galleryImage: { width: '100%', height: 260 },
  galleryImageMobile: { height: 150 },
  nameBox: { minHeight: 58, paddingHorizontal: 14, paddingVertical: 15, justifyContent: 'center' },
  nameBoxMobile: { minHeight: 54, paddingHorizontal: 10, paddingVertical: 10 },
  hairstyleName: { color: '#111111', fontSize: 18, lineHeight: 24, fontWeight: '800' },
  hairstyleNameMobile: { fontSize: 13, lineHeight: 18 },
  pressed: { opacity: 0.82 },
});
