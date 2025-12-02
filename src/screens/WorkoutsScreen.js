import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useGym } from '../context/GymContext';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';

const WorkoutsScreen = () => {
  const { state, dispatch } = useGym();

  const deleteWorkout = (id, memberName) => {
    Alert.alert(
      'Delete Workout',
      `Are you sure you want to delete this workout for ${memberName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'DELETE_WORKOUT', payload: id });
            Alert.alert('Success', 'Workout deleted successfully');
          },
        },
      ]
    );
  };

  const getMemberName = (memberId) => {
    const member = state.members.find(m => m.id === memberId);
    return member ? member.name : 'Unknown';
  };

  const getTrainerName = (trainerId) => {
    const trainer = state.trainers.find(t => t.id === trainerId);
    return trainer ? trainer.name : 'Unknown';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workouts</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {state.workouts.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Ionicons name="barbell-outline" size={48} color="#CCC" />
            <Text style={styles.emptyText}>No workouts scheduled</Text>
            <Text style={styles.emptySubtext}>Workouts will appear here</Text>
          </Card>
        ) : (
          state.workouts.map((workout) => (
            <Card key={workout.id} style={styles.workoutCard}>
              <View style={styles.workoutHeader}>
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutType}>{workout.workoutType}</Text>
                  <View style={styles.workoutDetails}>
                    <Ionicons name="person-outline" size={14} color="#666" />
                    <Text style={styles.workoutMember}>Member: {getMemberName(workout.memberId)}</Text>
                  </View>
                  {workout.trainerId && (
                    <View style={styles.workoutDetails}>
                      <Ionicons name="fitness-outline" size={14} color="#666" />
                      <Text style={styles.workoutTrainer}>Trainer: {getTrainerName(workout.trainerId)}</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteWorkout(workout.id, getMemberName(workout.memberId))}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>

              <View style={styles.workoutFooter}>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={16} color="#007AFF" />
                  <Text style={styles.detailLabel}>Date:</Text>
                  <Text style={styles.detailValue}>{workout.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#007AFF" />
                  <Text style={styles.detailLabel}>Duration:</Text>
                  <Text style={styles.detailValue}>{workout.duration}</Text>
                </View>
                {workout.notes && (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesLabel}>Notes:</Text>
                    <Text style={styles.notesText}>{workout.notes}</Text>
                  </View>
                )}
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
  workoutCard: {
    marginVertical: 8,
    marginHorizontal: 0,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  workoutDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  workoutMember: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
    fontWeight: '600',
  },
  workoutTrainer: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  deleteButton: {
    padding: 8,
  },
  workoutFooter: {
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
  notesContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 60,
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
    marginTop: 4,
  },
});

export default WorkoutsScreen;

