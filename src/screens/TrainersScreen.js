import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useGym } from '../context/GymContext';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';

const TrainersScreen = () => {
  const { state, dispatch } = useGym();

  const deleteTrainer = (id, name) => {
    Alert.alert(
      'Delete Trainer',
      `Are you sure you want to delete ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'DELETE_TRAINER', payload: id });
            Alert.alert('Success', 'Trainer deleted successfully');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trainers</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {state.trainers.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Ionicons name="fitness-outline" size={48} color="#CCC" />
            <Text style={styles.emptyText}>No trainers found</Text>
          </Card>
        ) : (
          state.trainers.map((trainer) => (
            <Card key={trainer.id} style={styles.trainerCard}>
              <View style={styles.trainerHeader}>
                <View style={styles.trainerInfo}>
                  <Text style={styles.trainerName}>{trainer.name}</Text>
                  <View style={styles.trainerDetails}>
                    <Ionicons name="mail-outline" size={14} color="#666" />
                    <Text style={styles.trainerEmail}>{trainer.email}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteTrainer(trainer.id, trainer.name)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>

              <View style={styles.trainerFooter}>
                <View style={styles.detailRow}>
                  <Ionicons name="fitness-outline" size={16} color="#007AFF" />
                  <Text style={styles.detailLabel}>Specialization:</Text>
                  <Text style={styles.detailValue}>{trainer.specialization}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#007AFF" />
                  <Text style={styles.detailLabel}>Experience:</Text>
                  <Text style={styles.detailValue}>{trainer.experience}</Text>
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
  scrollView: {
    flex: 1,
  },
  trainerCard: {
    marginVertical: 8,
    marginHorizontal: 0,
  },
  trainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  trainerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trainerEmail: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  deleteButton: {
    padding: 8,
  },
  trainerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginLeft: 8,
    marginRight: 8,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 16,
  },
});

export default TrainersScreen;

