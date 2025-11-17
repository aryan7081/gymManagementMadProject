import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useGym } from '../context/GymContext';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const AddMemberScreen = () => {
  const { dispatch } = useGym();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'Basic',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Active',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newMember = {
      id: Date.now().toString(),
      ...formData,
    };

    dispatch({ type: 'ADD_MEMBER', payload: newMember });
    Alert.alert('Success', 'Member added successfully', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Add New Member</Text>

        <Input
          label="Full Name *"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
          placeholder="Enter member name"
          icon="person-outline"
        />

        <Input
          label="Email *"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Enter email address"
          keyboardType="email-address"
          icon="mail-outline"
        />

        <Input
          label="Phone *"
          value={formData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          icon="call-outline"
        />

        <Input
          label="Membership Type"
          value={formData.membershipType}
          onChangeText={(value) => handleInputChange('membershipType', value)}
          placeholder="Basic, Premium, VIP"
          icon="card-outline"
        />

        <Input
          label="Join Date"
          value={formData.joinDate}
          onChangeText={(value) => handleInputChange('joinDate', value)}
          placeholder="YYYY-MM-DD"
          icon="calendar-outline"
        />

        <Input
          label="Status"
          value={formData.status}
          onChangeText={(value) => handleInputChange('status', value)}
          placeholder="Active, Inactive"
          icon="checkmark-circle-outline"
        />

        <Button title="Add Member" onPress={handleSubmit} icon="person-add" />
        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
          textStyle={styles.cancelButtonText}
          icon="close"
          iconColor="#333"
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  cancelButtonText: {
    color: '#333',
  },
});

export default AddMemberScreen;

