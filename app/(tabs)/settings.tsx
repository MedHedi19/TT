import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, Alert } from 'react-native';
import { Moon, Sun, LogOut, User, Bell, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/');
          },
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, hasSwitch = false, switchValue = false }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    hasSwitch?: boolean;
    switchValue?: boolean;
  }) => (
    <Card style={styles.settingItem}>
      <View style={styles.settingContent}>
        <View style={styles.settingIcon}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: theme.colors.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
        {hasSwitch && (
          <Switch
            value={switchValue}
            onValueChange={onPress}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={switchValue ? '#FFFFFF' : theme.colors.textSecondary}
          />
        )}
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <LinearGradient
          colors={isDark ? ['#232526', '#414345', '#0f2027'] : ['#e0eafc', '#cfdef3', '#f7faff']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Settings
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Manage your account and preferences
          </Text>
        </View>
        {user && (
          <Card style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={[styles.profileAvatar, { backgroundColor: theme.colors.primary, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.18, shadowRadius: 12, elevation: 8 }] }>
                <User size={32} color="#FFFFFF" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, { color: theme.colors.text }]}>
                  {user.name}
                </Text>
                <Text style={[styles.profilePhone, { color: theme.colors.textSecondary }]}>
                  {user.phoneNumber}
                </Text>
              </View>
            </View>
          </Card>
        )}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Appearance
          </Text>
          <SettingItem
            icon={isDark ? <Moon size={20} color={theme.colors.textSecondary} /> : <Sun size={20} color={theme.colors.textSecondary} />}
            title="Dark Mode"
            subtitle={isDark ? "Dark theme is enabled" : "Light theme is enabled"}
            hasSwitch
            switchValue={isDark}
            onPress={toggleTheme}
          />
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Notifications
          </Text>
          <SettingItem
            icon={<Bell size={20} color={theme.colors.textSecondary} />}
            title="Push Notifications"
            subtitle="Receive notifications about account updates"
            hasSwitch
            switchValue={true}
          />
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Security
          </Text>
          <SettingItem
            icon={<Shield size={20} color={theme.colors.textSecondary} />}
            title="Security Settings"
            subtitle="Manage your account security"
            onPress={() => Alert.alert('Info', 'Security settings would be implemented here')}
          />
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Support
          </Text>
          <SettingItem
            icon={<HelpCircle size={20} color={theme.colors.textSecondary} />}
            title="Help & Support"
            subtitle="Get help with your account"
            onPress={() => Alert.alert('Info', 'Help & Support would be implemented here')}
          />
        </View>
        <View style={styles.logoutSection}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            fullWidth
          />
        </View>
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
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 2,
  },
  profileCard: {
    marginBottom: 28,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 15,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  settingItem: {
    marginBottom: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    marginRight: 14,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
  },
  logoutSection: {
    marginTop: 32,
    marginBottom: 16,
  },
});