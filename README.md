# 🐍 Snake Game

A modern, sleek Snake game built with React and Vite. Features smooth animations, gradient backgrounds, and an intuitive user interface.

![Snake Game Start](https://github.com/user-attachments/assets/adf5217b-1d07-4a76-ac95-06e019137cdf)

## ✨ Features

- 🎮 **Classic Snake Gameplay** - Control the snake with arrow keys or WASD
- 🎨 **Modern UI Design** - Beautiful gradient backgrounds and smooth animations
- 📊 **Score Tracking** - Real-time score display with persistent high score
- ⏸️ **Pause Functionality** - Pause/resume game with spacebar
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎯 **Collision Detection** - Accurate wall and self-collision detection
- 💾 **Local Storage** - High score persists between sessions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Stevefrdnt/POC-Snake-Game.git
cd POC-Snake-Game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 How to Play

1. Click **"Start Game"** to begin
2. Use **Arrow Keys** or **WASD** to control the snake direction:
   - ⬆️ Up: `↑` or `W`
   - ⬇️ Down: `↓` or `S`
   - ⬅️ Left: `←` or `A`
   - ➡️ Right: `→` or `D`
3. Press **Space** to pause/resume the game
4. Eat the red food to grow and increase your score
5. Avoid hitting walls or your own tail!

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## 🛠️ Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and animations
- **JavaScript (ES6+)** - Game logic

## 📦 Project Structure

```
POC-Snake-Game/
├── src/
│   ├── App.jsx          # Main game component with logic
│   ├── App.css          # Game styling
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🎯 Game Features

### Score System
- Earn **10 points** for each food item eaten
- High score is automatically saved to local storage
- Score resets when starting a new game

### Game States
- **Idle** - Initial state before game starts
- **Playing** - Active gameplay
- **Paused** - Game paused by player
- **Game Over** - Snake collided with wall or itself

## 🎨 Design Highlights

- **Gradient Backgrounds** - Purple gradient theme throughout
- **Smooth Animations** - Food pulsing effect and snake movement
- **Modern UI Elements** - Rounded corners, shadows, and hover effects
- **Visual Feedback** - Different colors for snake head, body, and food
- **Responsive Layout** - Adapts to different screen sizes

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Stevefrdnt**

---

Enjoy playing the Snake Game! 🐍🎮
