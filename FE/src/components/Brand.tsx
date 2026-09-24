import { Image, StyleSheet, Text, View } from 'react-native';

type BrandProps = { compact?: boolean };

export function Brand({ compact = false }: BrandProps) {
  return (
    <View style={styles.brand}>
      <Image
        source={require('../../assets/images/nam-duong-logo.png')}
        resizeMode="contain"
        style={[styles.logo, compact && styles.logoCompact]}
      />
      <Text style={[styles.name, compact && styles.nameCompact]}>NAM DƯƠNG SALON</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: { alignItems: 'center', justifyContent: 'center' },
  logo: { width: 100, height: 78 },
  logoCompact: { width: 82, height: 64 },
  name: { color: '#102A43', fontSize: 14, fontWeight: '900', letterSpacing: 1.2, marginTop: 2 },
  nameCompact: { fontSize: 12, letterSpacing: 0.8 },
});
