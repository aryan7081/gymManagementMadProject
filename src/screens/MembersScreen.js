import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useGym } from '../context/GymContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';

const MembersScreen = () => {
  const { state, dispatch } = useGym();
  const navigation = useNavigation();

  const deleteMember = (id, name) => {
    Alert.alert(
      'Delete Member',
      `Are you sure you want to delete ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'DELETE_MEMBER', payload: id });
            Alert.alert('Success', 'Member deleted successfully');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Members</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddMember')}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {state.members.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Ionicons name="people-outline" size={48} color="#CCC" />
            <Text style={styles.emptyText}>No members found</Text>
            <Text style={styles.emptySubtext}>Tap + to add a new member</Text>
          </Card>
        ) : (
          state.members.map((member) => (
            <Card key={member.id} style={styles.memberCard}>
              <View style={styles.memberHeader}>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <View style={styles.memberDetails}>
                    <Ionicons name="mail-outline" size={14} color="#666" />
                    <Text style={styles.memberEmail}>{member.email}</Text>
                  </View>
                  <View style={styles.memberDetails}>
                    <Ionicons name="call-outline" size={14} color="#666" />
                    <Text style={styles.memberPhone}>{member.phone}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteMember(member.id, member.name)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>

              <View style={styles.memberFooter}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Membership:</Text>
                  <Text style={styles.detailValue}>{member.membershipType}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Join Date:</Text>
                  <Text style={styles.detailValue}>{member.joinDate}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status:</Text>
                  <View style={[styles.statusBadge, { backgroundColor: member.status === 'Active' ? '#34C759' : '#FF3B30' }]}>
                    <Text style={styles.statusText}>{member.status}</Text>
                  </View>
                </View>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  scrollView: {
    flex: 1,
  },
  memberCard: {
    marginVertical: 8,
    marginHorizontal: 0,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  memberDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  memberEmail: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  memberPhone: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  deleteButton: {
    padding: 8,
  },
  memberFooter: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    paddingVertical: 2,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBB',
  },
});

export default MembersScreen;

