# MemoryCard Game

Welcome to the MemoryCard game, a color-matching memory challenge built as a technical interview test project. This repository contains both the frontend (React-based) and backend (.NET Core API) components, designed to work together to provide an interactive gaming experience.

## Project Overview
- **Frontend**: A React application where players flip cards to match colors, track scores, and view game results.
- **Backend**: A .NET Core API (`colourmemoryapi`) that manages game state, handles card flips, and stores game data.
- **Deployment**:Fly.io use as a backend for deploy and Netlify use for frontend.
## Tools and Dependencies

### Frontend (`frontend` Directory)
- **Framework**: React (with TypeScript)
- **Build Tool**: Create React App (via `react-scripts`)
- **CSS**: Custom CSS (in `index.css`)
- **Dependencies**:
  - `react`: For building the UI
  - `react-dom`: For rendering React components
  - `axios`: For making API calls to the backend
  - `typescript`: For type safety
- **Development Tools**:
  - Node.js (v18 or later recommended)
  - npm (for package management)
- **Deployment Tool**: Fly.io use as a backend for deploy and Netlify use for frontend.

### Backend (`backend/ColourMemoryApi` Directory)
- **Framework**: .NET Core (ASP.NET Core)
- **Language**: C#
- **Dependencies**:
  - `Microsoft.AspNetCore.App`: Core ASP.NET framework
  - (Additional NuGet packages may be present; verify `csproj` file)
- **Development Tools**:
  - .NET SDK (v6 or later recommended)
  - VS Code 
- **Deployment Tool**: Fly.io

## How to Run the Project
    cd frontend
    npm install
    npm start
    cd ../backend/ColourMemoryApi
    dotnet restore
    dotnet run

** Notes
    Ensure the backend is running before the frontend
  

 **Clone the Repository**
   ```bash
   git clone https://github.com/Lilikh/ColourMemory-Card.git
 
