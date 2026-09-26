import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { Brand } from '@/components/Brand';

type BookingStatus = 'waiting' | 'no-show' | 'completed';

type BookingTicket = {
  id: string;
  customer: string;
  phone: string;
  service: string;
  store: string;
  time: string;
  barber: string;
  status: BookingStatus;
};

const demoTickets: BookingTicket[] = [
  {
    id: 'booking-01',
    customer: 'Nguyễn Văn Nam',
    phone: '0123456789',
    service: 'Cắt tóc thông thường',
    store: 'Cơ sở Hoàng Diệu',
    time: '08:00',
    barber: 'Nhân viên A',
    status: 'waiting',
  },
  {
    id: 'booking-02',
    customer: 'Trần Minh Anh',
    phone: '0123456789',
    service: 'Nhuộm',
    store: 'Cơ sở Hoàng Diệu',
    time: '09:30',
    barber: 'Nhân viên A',
    status: 'waiting',
  },
  {
    id: 'booking-03',
    customer: 'Lê Hoàng Long',
    phone: '0123456789',
    service: 'COMBO 3 trong 1 cắt, gội, tạo kiểu',
    store: 'Cơ sở Hoàng Diệu',
    time: '11:00',
    barber: 'Nhân viên A',
    status: 'waiting',
  },
];

export default function EmployeeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 760;
  const [tickets, setTickets] = useState(demoTickets);

  const updateStatus = (id: string, status: BookingStatus) => {
    setTickets((current) => current.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket)));
  };

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.brandBar, isMobile && styles.brandBarMobile]}>
          <Brand compact={isMobile} />
        </View>

        <View style={[styles.employeeHeader, isMobile && styles.employeeHeaderMobile]}>
          <View>
            <Text style={[styles.pageTitle, isMobile && styles.pageTitleMobile]}>Phiếu khách đặt</Text>
            <Text style={styles.pageSubtitle}>Màn hình dành cho nhân viên</Text>
          </View>
          <Pressable onPress={() => router.replace('/')} style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}>
            <Ionicons name="log-out-outline" size={19} color="#123B5D" />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </Pressable>
        </View>

        <View style={[styles.ticketSection, isMobile && styles.ticketSectionMobile]}>
          {tickets.map((ticket) => {
            const isWaiting = ticket.status === 'waiting';
            return (
              <View key={ticket.id} style={styles.ticketCard}>
                <View style={styles.ticketTopRow}>
                  <View style={styles.customerBox}>
                    <View style={styles.customerIcon}>
                      <Ionicons name="person" size={19} color="#FFFFFF" />
                    </View>
                    <View style={styles.customerTextBox}>
                      <Text style={styles.customerName}>{ticket.customer}</Text>
                      <Text style={styles.phone}>{ticket.phone}</Text>
                    </View>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    ticket.status === 'no-show' && styles.noShowBadge,
                    ticket.status === 'completed' && styles.completedBadge,
                  ]}>
                    <Text style={styles.statusText}>
                      {ticket.status === 'waiting' ? 'Chờ phục vụ' : ticket.status === 'no-show' ? 'Không đến' : 'Hoàn thành'}
                    </Text>
                  </View>
                </View>

                <View style={styles.ticketDetails}>
                  <DetailLine icon="cut-outline" label="Dịch vụ" value={ticket.service} />
                  <DetailLine icon="location-outline" label="Cơ sở" value={ticket.store} />
                  <DetailLine icon="time-outline" label="Khung giờ" value={ticket.time} />
                  <DetailLine icon="person-outline" label="Barber" value={ticket.barber} />
                </View>

                <View style={styles.actionRow}>
                  <Pressable
                    disabled={!isWaiting}
                    onPress={() => updateStatus(ticket.id, 'no-show')}
                    style={({ pressed }) => [styles.noShowButton, !isWaiting && styles.actionDisabled, pressed && isWaiting && styles.pressed]}
                  >
                    <Ionicons name="close-circle-outline" size={19} color="#FFFFFF" />
                    <Text style={styles.actionText}>Không đến</Text>
                  </Pressable>
                  <Pressable
                    disabled={!isWaiting}
                    onPress={() => updateStatus(ticket.id, 'completed')}
                    style={({ pressed }) => [styles.completeButton, !isWaiting && styles.actionDisabled, pressed && isWaiting && styles.pressed]}
                  >
                    <Ionicons name="checkmark-circle-outline" size={19} color="#FFFFFF" />
                    <Text style={styles.actionText}>Hoàn thành</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function DetailLine({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.detailLine}>
      <Ionicons name={icon} size={18} color="#F2B84B" />
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3F4F5' },
  brandBar: { minHeight: 112, backgroundColor: '#F2B84B', alignItems: 'center', justifyContent: 'center', paddingVertical: 9 },
  brandBarMobile: { minHeight: 100, paddingVertical: 8 },
  employeeHeader: { width: '100%', maxWidth: 1080, alignSelf: 'center', paddingHorizontal: 26, paddingVertical: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 },
  employeeHeaderMobile: { paddingHorizontal: 15, paddingVertical: 20 },
  pageTitle: { color: '#123B5D', fontSize: 28, lineHeight: 35, fontWeight: '900' },
  pageTitleMobile: { fontSize: 21, lineHeight: 27 },
  pageSubtitle: { color: '#698096', fontSize: 13, marginTop: 3 },
  logoutButton: { minHeight: 42, borderWidth: 1.5, borderColor: '#123B5D', borderRadius: 13, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: '#FFFFFF' },
  logoutText: { color: '#123B5D', fontSize: 13, fontWeight: '800' },
  ticketSection: { width: '100%', maxWidth: 1080, alignSelf: 'center', paddingHorizontal: 26, paddingBottom: 42, gap: 18 },
  ticketSectionMobile: { paddingHorizontal: 14, paddingBottom: 28, gap: 14 },
  ticketCard: { borderRadius: 20, backgroundColor: '#FFFFFF', padding: 21, borderWidth: 1, borderColor: '#E4E9ED', shadowColor: '#0A2033', shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  ticketTopRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  customerBox: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 11 },
  customerIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: '#123B5D', alignItems: 'center', justifyContent: 'center' },
  customerTextBox: { flex: 1 },
  customerName: { color: '#102A43', fontSize: 17, lineHeight: 22, fontWeight: '900' },
  phone: { color: '#698096', fontSize: 12, marginTop: 2 },
  statusBadge: { borderRadius: 999, paddingHorizontal: 11, paddingVertical: 6, backgroundColor: '#D99000' },
  noShowBadge: { backgroundColor: '#D83B3B' },
  completedBadge: { backgroundColor: '#258A4A' },
  statusText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  ticketDetails: { marginTop: 17, paddingTop: 13, borderTopWidth: 1, borderTopColor: '#EDF1F4', gap: 9 },
  detailLine: { flexDirection: 'row', alignItems: 'flex-start', gap: 7 },
  detailLabel: { width: 70, color: '#526A7F', fontSize: 13, lineHeight: 19, fontWeight: '700' },
  detailValue: { flex: 1, color: '#263D52', fontSize: 13, lineHeight: 19, fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: 11, marginTop: 19 },
  noShowButton: { flex: 1, minHeight: 47, borderRadius: 13, backgroundColor: '#D83B3B', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  completeButton: { flex: 1, minHeight: 47, borderRadius: 13, backgroundColor: '#258A4A', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  actionDisabled: { opacity: 0.42 },
  actionText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  pressed: { opacity: 0.82 },
});
