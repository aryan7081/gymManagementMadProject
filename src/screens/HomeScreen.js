import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useGym } from '../context/GymContext';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { state, logout } = useGym();
  const navigation = useNavigation();

  const stats = [
    { label: 'Total Members', value: state.members.length, color: '#007AFF', icon: 'people' },
    { label: 'Active Trainers', value: state.trainers.length, color: '#34C759', icon: 'fitness' },
    { label: 'Workouts Scheduled', value: state.workouts.length, color: '#FF9500', icon: 'barbell' },
    { label: 'Active Memberships', value: state.members.filter(m => m.status === 'Active').length, color: '#AF52DE', icon: 'checkmark-circle' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Gym Dashboard</Text>
          <Text style={styles.subtitle}>Welcome, {state.user?.name || 'Admin'}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Ionicons name={stat.icon} size={32} color={stat.color} />
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Card>
        ))}
      </View>

      <Card style={styles.recentCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Members</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Members')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {state.members.slice(0, 3).map((member) => (
          <View key={member.id} style={styles.memberItem}>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberType}>{member.membershipType}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: member.status === 'Active' ? '#34C759' : '#FF3B30' }]}>
              <Text style={styles.statusText}>{member.status}</Text>
            </View>
          </View>
        ))}
      </Card>

      <Card style={styles.recentCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Workouts</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Workouts')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {state.workouts.slice(0, 3).map((workout) => {
          const member = state.members.find(m => m.id === workout.memberId);
          return (
            <View key={workout.id} style={styles.workoutItem}>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutMember}>{member?.name || 'Unknown'}</Text>
                <Text style={styles.workoutType}>{workout.workoutType}</Text>
                <Text style={styles.workoutDate}>{workout.date}</Text>
              </View>
            </View>
          );
        })}
        {state.workouts.length === 0 && (
          <Text style={styles.emptyText}>No workouts scheduled</Text>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginVertical: 4,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  recentCard: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  memberType: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  workoutItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutMember: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  workoutType: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  workoutDate: {
    fontSize: 12,
    color: '#666',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 12,
  },
});

export default HomeScreen;

