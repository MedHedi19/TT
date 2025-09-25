import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { FileText } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';

export default function FactureScreen() {
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [factureStatus, setFactureStatus] = useState<string | null>(null);

  const handleCheckFacture = () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    // Mock response for testing: facture is always paid
    setFactureStatus('Paid');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        {/* <LinearGradient
          colors={isDark ? ['#232526', '#414345', '#0f2027'] : ['#e0eafc', '#cfdef3', '#f7faff']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        /> */}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>Check Facture</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Verify the payment status of your facture
          </Text>
        </View>

        <Card style={{
          ...styles.phoneCard,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderWidth: 1,
        }}>
          <View style={styles.cardHeader}>
            <FileText size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Phone Number</Text>
          </View>
          <Input
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Number"
            keyboardType="phone-pad"
          />
        </Card>

        {factureStatus && (
          <Card style={{
            ...styles.resultCard,
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.success,
            borderWidth: 1,
          }}>
            <Text style={[styles.resultTitle, { color: theme.colors.primary }]}>Facture Status</Text>
            <Text style={[styles.resultValue, { color: theme.colors.success }]}>{factureStatus}</Text>
          </Card>
        )}

        <Button
          title="Check Status"
          onPress={handleCheckFacture}
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 6,
    letterSpacing: 0.5,
    color: '#3B82F6',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 2,
  },
  phoneCard: {
    marginBottom: 18,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  resultCard: {
    marginBottom: 18,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#3B82F6',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});