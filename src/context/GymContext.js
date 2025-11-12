import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GymContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  members: [],
  trainers: [],
  workouts: [],
  loading: true,
};

const gymReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'LOAD_DATA':
      return {
        ...state,
        members: action.payload.members || [],
        trainers: action.payload.trainers || [],
        workouts: action.payload.workouts || [],
        loading: false,
      };
    case 'ADD_MEMBER':
      return {
        ...state,
        members: [...state.members, action.payload],
      };
    case 'UPDATE_MEMBER':
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === action.payload.id ? action.payload : member
        ),
      };
    case 'DELETE_MEMBER':
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.payload),
      };
    case 'ADD_TRAINER':
      return {
        ...state,
        trainers: [...state.trainers, action.payload],
      };
    case 'UPDATE_TRAINER':
      return {
        ...state,
        trainers: state.trainers.map((trainer) =>
          trainer.id === action.payload.id ? action.payload : trainer
        ),
      };
    case 'DELETE_TRAINER':
      return {
        ...state,
        trainers: state.trainers.filter((trainer) => trainer.id !== action.payload),
      };
    case 'ADD_WORKOUT':
      return {
        ...state,
        workouts: [...state.workouts, action.payload],
      };
    case 'UPDATE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout.id === action.payload.id ? action.payload : workout
        ),
      };
    case 'DELETE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter((workout) => workout.id !== action.payload),
      };
    default:
      return state;
  }
};

export const GymProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gymReducer, initialState);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
    checkAuth();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    if (!state.loading) {
      saveData();
    }
  }, [state.members, state.trainers, state.workouts]);

  const checkAuth = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadData = async () => {
    try {
      const membersData = await AsyncStorage.getItem('members');
      const trainersData = await AsyncStorage.getItem('trainers');
      const workoutsData = await AsyncStorage.getItem('workouts');

      // Load default data if none exists
      const defaultMembers = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          membershipType: 'Premium',
          joinDate: '2024-01-15',
          status: 'Active',
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '123-456-7891',
          membershipType: 'Basic',
          joinDate: '2024-02-01',
          status: 'Active',
        },
      ];

      const defaultTrainers = [
        {
          id: '1',
          name: 'Mike Johnson',
          specialization: 'Strength Training',
          experience: '5 years',
          email: 'mike@example.com',
        },
        {
          id: '2',
          name: 'Sarah Williams',
          specialization: 'Yoga & Pilates',
          experience: '3 years',
          email: 'sarah@example.com',
        },
      ];

      const defaultWorkouts = [
        {
          id: '1',
          memberId: '1',
          trainerId: '1',
          workoutType: 'Strength Training',
          date: '2024-03-15',
          duration: '60 minutes',
          notes: 'Focus on compound movements',
        },
      ];

      dispatch({
        type: 'LOAD_DATA',
        payload: {
          members: membersData ? JSON.parse(membersData) : defaultMembers,
          trainers: trainersData ? JSON.parse(trainersData) : defaultTrainers,
          workouts: workoutsData ? JSON.parse(workoutsData) : defaultWorkouts,
        },
      });

      // Save defaults if they don't exist
      if (!membersData) {
        await AsyncStorage.setItem('members', JSON.stringify(defaultMembers));
      }
      if (!trainersData) {
        await AsyncStorage.setItem('trainers', JSON.stringify(defaultTrainers));
      }
      if (!workoutsData) {
        await AsyncStorage.setItem('workouts', JSON.stringify(defaultWorkouts));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('members', JSON.stringify(state.members));
      await AsyncStorage.setItem('trainers', JSON.stringify(state.trainers));
      await AsyncStorage.setItem('workouts', JSON.stringify(state.workouts));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const login = async (username, password) => {
    if (username && password) {
      const user = { username, name: username };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return true;
    }
    return false;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <GymContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};

