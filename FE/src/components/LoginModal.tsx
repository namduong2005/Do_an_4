import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type LoginModalProps = {
  visible: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
};

export function LoginModal({ visible, onClose, onLogin }: LoginModalProps) {
  const [name, setName] = useState('Nguyễn Văn Nam');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  const submit = () => {
    const normalizedName = name.trim();
    if (!normalizedName || !password.trim()) return;
    onLogin(normalizedName);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.backdrop} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.card}>
          <Pressable accessibilityLabel="Đóng" onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={22} color="#60758A" />
          </Pressable>

          <View style={styles.iconWrap}>
            <Ionicons name="person-outline" size={27} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Chào mừng trở lại</Text>
          <Text style={styles.subtitle}>Đăng nhập bản demo Nam Dương Salon</Text>

          <Text style={styles.label}>Tên người dùng</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="person-outline" size={19} color="#8093A6" />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Nhập tên của bạn"
              placeholderTextColor="#9AABBA"
              style={styles.input}
              returnKeyType="next"
            />
          </View>

          <Text style={styles.label}>Mật khẩu</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={19} color="#8093A6" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#9AABBA"
              secureTextEntry={!showPassword}
              style={styles.input}
              onSubmitEditing={submit}
            />
            <Pressable onPress={() => setShowPassword((current) => !current)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#8093A6" />
            </Pressable>
          </View>

          <Pressable onPress={submit} style={({ pressed }) => [styles.submit, pressed && styles.pressed]}>
            <Text style={styles.submitText}>Đăng nhập</Text>
            <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.hint}>Demo giao diện — chưa kết nối cơ sở dữ liệu.</Text>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(5, 19, 32, 0.64)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 440, backgroundColor: '#FFFFFF', borderRadius: 28, padding: 28, shadowColor: '#071929', shadowOpacity: 0.2, shadowRadius: 28, shadowOffset: { width: 0, height: 14 }, elevation: 8 },
  closeButton: { position: 'absolute', right: 20, top: 20, width: 38, height: 38, borderRadius: 19, backgroundColor: '#F2F5F7', alignItems: 'center', justifyContent: 'center' },
  iconWrap: { width: 54, height: 54, borderRadius: 18, backgroundColor: '#123B5D', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  title: { color: '#102A43', fontSize: 26, fontWeight: '900' },
  subtitle: { color: '#698096', fontSize: 14, marginTop: 6, marginBottom: 24 },
  label: { color: '#314B63', fontSize: 13, fontWeight: '700', marginBottom: 8 },
  inputWrap: { height: 52, borderRadius: 14, borderWidth: 1, borderColor: '#DCE4EA', backgroundColor: '#FAFCFD', flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 15, marginBottom: 17 },
  input: { flex: 1, color: '#102A43', fontSize: 15, outlineStyle: 'none' } as never,
  submit: { height: 54, borderRadius: 15, backgroundColor: '#123B5D', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  submitText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  hint: { color: '#8A9BAA', textAlign: 'center', fontSize: 11, marginTop: 14 },
  pressed: { opacity: 0.86 },
});
