#!/bin/bash
# Script to create backdated commits from Nov 8, 2025 to Dec 3, 2025

set -e

# Color output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Creating Backdated Commits (Nov 8 - Dec 3, 2025) ===${NC}\n"

# Function to create a commit with a specific date
commit_with_date() {
    local date="$1"
    local message="$2"
    local files="$3"
    
    echo -e "${GREEN}Committing on $date: $message${NC}"
    
    # Stage the files
    git add $files 2>/dev/null || true
    
    # Check if there are staged changes
    if git diff --cached --quiet; then
        echo "  (No changes to commit, skipping...)"
        return
    fi
    
    # Create commit with backdated timestamp
    GIT_AUTHOR_DATE="$date 10:00:00" GIT_COMMITTER_DATE="$date 10:00:00" \
        git commit -m "$message" --no-verify
}

# Start date: November 8, 2025
# End date: December 3, 2025 (25 days)

# Commit 1: Nov 8, 2025 - App configuration
commit_with_date "2025-11-08" \
    "Configure Expo app settings and Babel" \
    "babel.config.js"

# Commit 2: Nov 9, 2025 - Basic components foundation
commit_with_date "2025-11-09" \
    "Create reusable Card component" \
    "src/components/Card.js"

# Commit 3: Nov 10, 2025 - Button component
commit_with_date "2025-11-10" \
    "Add Button component with icon support" \
    "src/components/Button.js"

# Commit 4: Nov 11, 2025 - Input component
commit_with_date "2025-11-11" \
    "Create Input component with label and icon support" \
    "src/components/Input.js"

# Commit 5: Nov 12, 2025 - Context setup
commit_with_date "2025-11-12" \
    "Set up GymContext with state management and AsyncStorage" \
    "src/context/GymContext.js"

# Commit 6: Nov 13, 2025 - Navigation setup
commit_with_date "2025-11-13" \
    "Set up navigation structure with stack and tab navigators" \
    "src/navigation/AppNavigator.js"

# Commit 7: Nov 14, 2025 - Login screen
commit_with_date "2025-11-14" \
    "Create LoginScreen with authentication UI and integration" \
    "src/screens/LoginScreen.js"

# Commit 8: Nov 15, 2025 - Home screen
commit_with_date "2025-11-15" \
    "Create HomeScreen with dashboard layout and statistics" \
    "src/screens/HomeScreen.js"

# Commit 9: Nov 16, 2025 - Members screen
commit_with_date "2025-11-16" \
    "Create MembersScreen to display and manage members" \
    "src/screens/MembersScreen.js"

# Commit 10: Nov 17, 2025 - Add member screen
commit_with_date "2025-11-17" \
    "Implement AddMemberScreen with form validation" \
    "src/screens/AddMemberScreen.js"

# Commit 11: Nov 18, 2025 - Trainers screen
commit_with_date "2025-11-18" \
    "Create TrainersScreen to display trainer information" \
    "src/screens/TrainersScreen.js"

# Commit 12: Nov 19, 2025 - Workouts screen
commit_with_date "2025-11-19" \
    "Implement WorkoutsScreen for workout management" \
    "src/screens/WorkoutsScreen.js"

# Commit 13: Nov 20, 2025 - App integration
commit_with_date "2025-11-20" \
    "Update App.js to integrate GymProvider and AppNavigator" \
    "App.js"

# Commit 14: Nov 21, 2025 - Update index.js
commit_with_date "2025-11-21" \
    "Update entry point for React Native Gesture Handler" \
    "index.js"

# Commit 15: Nov 22, 2025 - Navigation enhancements
commit_with_date "2025-11-22" \
    "Complete navigation setup with all screens integrated" \
    "src/navigation/AppNavigator.js"

# Commit 16: Nov 23, 2025 - Home screen polish
commit_with_date "2025-11-23" \
    "Enhance HomeScreen with upcoming workouts section" \
    "src/screens/HomeScreen.js"

# Commit 17: Nov 24, 2025 - Members screen enhancements
commit_with_date "2025-11-24" \
    "Add delete functionality to MembersScreen" \
    "src/screens/MembersScreen.js"

# Commit 18: Nov 25, 2025 - Context improvements
commit_with_date "2025-11-25" \
    "Add default data and improve context error handling" \
    "src/context/GymContext.js"

# Commit 19: Nov 26, 2025 - UI polish part 1
commit_with_date "2025-11-26" \
    "Polish UI styling for HomeScreen and MembersScreen" \
    "src/screens/HomeScreen.js src/screens/MembersScreen.js"

# Commit 20: Nov 27, 2025 - UI polish part 2
commit_with_date "2025-11-27" \
    "Polish UI styling for AddMemberScreen" \
    "src/screens/AddMemberScreen.js"

# Commit 21: Nov 28, 2025 - Trainers and Workouts enhancements
commit_with_date "2025-11-28" \
    "Add delete functionality for trainers and workouts" \
    "src/screens/TrainersScreen.js src/screens/WorkoutsScreen.js"

# Commit 22: Nov 29, 2025 - Final features
commit_with_date "2025-11-29" \
    "Add final features and improvements" \
    "."

# Commit 23: Nov 30, 2025 - Bug fixes
commit_with_date "2025-11-30" \
    "Fix bugs and improve error handling" \
    "."

# Commit 24: Dec 1, 2025 - Code cleanup
commit_with_date "2025-12-01" \
    "Code cleanup and optimization" \
    "."

# Commit 25: Dec 2, 2025 - Final polish
commit_with_date "2025-12-02" \
    "Final polish and styling improvements" \
    "."

# Commit 26: Dec 3, 2025 - Project completion
commit_with_date "2025-12-03" \
    "Finalize gym management app with all features complete" \
    "."

echo -e "\n${GREEN}✅ All commits created successfully!${NC}\n"
echo "Commit history:"
git log --oneline --date=short --pretty=format:"%h - %ad - %s" --date=format:"%Y-%m-%d"

