<div align="center">
  <img src="assets/icon.png" alt="TaskFlow Logo" width="120"/>
  
  # 📱 TaskFlow
  ### Your Smart Task Management Companion
  
  [![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
</div>

## 🚀 Overview
TaskFlow is a comprehensive task management mobile application built with React Native and Expo. It helps users organize their tasks efficiently with features like categories, priorities, and dark mode support.

## 👨‍💻 Developer
<div align="center">
  <img src="assets/profile.jpg" alt="Dzulfaqor Ali" width="150" style="border-radius: 75px"/>
  
  ### **Dzulfaqor Ali**
</div>

- 🎓 Information Systems and Technology Student at ITB (Class of 2022)
- 📱 Mobile App Developer
- 📍 Bandung, Indonesia

### 🔗 Connect with Me
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/dzzulfaqorr)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dzulfaqor-ali-dipangegara-85bb241a1/)

## ✨ Features
- 📋 Task Management
  - ➕ Create, edit, and delete tasks
  - 🎯 Set task priorities (Low, Medium, High)
  - ⏰ Set deadlines
  - ✅ Mark tasks as completed
  - 🏷️ Task categorization
- 📁 Category Management
  - 🎨 Create custom categories
  - 🎯 Assign colors and icons
  - ✏️ Edit and delete categories
- 🔍 Search Functionality
  - 🔎 Search tasks
  - 📂 Search categories
- 📊 Statistics
  - 📈 Task completion rates
  - 📊 Priority distribution
  - 📉 Category-wise task distribution
- 🎨 Theme Support
  - 🌙 Dark mode
  - ☀️ Light mode
  - 💾 Persistent theme preference
- 💾 Data Management
  - 📤 Export data
  - 📥 Import data
  - 🗄️ Local storage using SQLite

## 🛠️ Tech Stack
- ⚛️ React Native
- 📱 Expo
- 📘 TypeScript
- 🎨 React Native Paper (UI Components)
- 🗄️ SQLite (Local Database)
- 🔄 Zustand (State Management)
- 🧭 React Navigation
- 📅 date-fns (Date Formatting)

## Project Structure```
src/
├── components/         # Reusable UI components
├── context/           # React Context providers
├── navigation/        # Navigation configuration
├── screens/           # App screens
├── store/            # State management
├── types/            # TypeScript type definitions
└── constants/        # App constants
```

## Key Components
- `TaskCard`: Displays individual task with all its details
- `CategoryPicker`: Component for selecting task categories
- `TaskFormModal`: Modal for creating/editing tasks
- `CategoryFormModal`: Modal for managing categories
- `StatisticsScreen`: Shows task analytics
- `SettingsScreen`: App settings and data management

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/taskflow.git
```

2. Install dependencies
```bash
cd taskflow
npm install
```

3. Start the development server
```bash
npm start
```

4. Run on your device or emulator
```bash
# For Android
npm run android

# For iOS
npm run ios
```

## Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  deadline TEXT NOT NULL,
  priority TEXT NOT NULL,
  category_id INTEGER,
  status TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories (id)
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  icon TEXT NOT NULL
);
```

### Contribution Guidelines
I greatly appreciate your contributions to TaskFlow! Here are the steps to contribute:

### Preparation
1. Fork this repository
2. Clone the forked repository to your local machine
```bash
git clone https://github.com/[your-username]/taskflow.git
```
3. Add upstream remote
```bash
git remote add upstream https://github.com/yourusername/taskflow.git
```

### Development Process
1. Make sure your `main` branch is up-to-date
```bash
git checkout main
git pull upstream main
```

2. Create a new branch for your feature/fix
```bash
git checkout -b feature/FeatureName
```

3. Install dependencies
```bash
npm install
```

4. Make your code changes for the feature/fix

5. Ensure your code follows the standards:
   - Use TypeScript
   - Follow ESLint configuration
   - Write clear comments
   - Add unit tests if necessary

6. Commit your changes
```bash
git add .
git commit -m "feat: add xyz feature"
```

### Submitting Pull Requests
1. Push to your repository
```bash
git push origin feature/FeatureName
```

2. Create a Pull Request via GitHub
   - Provide a clear title
   - Describe the changes made
   - Add screenshots for UI changes
   - Reference related issues if any

### Commit Conventions
Use the following formats for commit messages:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code refactoring
- `test:` - Adding or fixing tests
- `chore:` - Updating dependencies or configuration

### Code Review
- I will review your PR
- Changes might be requested
- Once approved, the PR will be merged

### Bug Reporting
If you find a bug:
1. Check if the bug has been reported in Issues
2. If not, create a new Issue with:
   - Clear title
   - Steps to reproduce
   - Expected behavior
   - Screenshots if applicable
   - Device and OS information

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments
- React Native Paper for the beautiful Material Design components
- Expo team for the amazing development tools
- The open-source community for various helpful packages

## Contact
Dzulfaqor Ali - [@dzzulfaqorr](https://instagram.com/dzzulfaqorr)

Project Link: [https://github.com/dzulfaqorali196/taskflow](https://github.com/dzulfaqorali196/taskflow)

---
Made with ❤️ by Dzulfaqor Ali
