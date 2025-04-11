import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// This file combines all components and styles from the project
// We'll add the components and styles in sections

// CSS Styles Section
const styles = {
  // App styles
  app: `
    :root {
      --primary-color: #4a90e2;
      --primary-hover: #357abd;
      --secondary-color: #757575;
      --secondary-hover: #616161;
      --text-color: #333;
      --background-color: #f5f5f5;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      background-color: var(--background-color);
    }
    
    h1, h2, h3 {
      margin-bottom: 1rem;
    }
    
    button {
      cursor: pointer;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    #root {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
  `,
  
  // Index styles
  index: `
    :root {
      font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      font-weight: 400;
    
      color-scheme: light dark;
      color: rgba(255, 255, 255, 0.87);
      background-color: #242424;
    
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }
    
    body {
      margin: 0;
      display: flex;
      place-items: center;
      min-width: 320px;
      min-height: 100vh;
    }
    
    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }
    
    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
    
    @media (prefers-color-scheme: light) {
      :root {
        color: #213547;
        background-color: #ffffff;
      }
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `,
  
  // Algorithm Page styles
  algorithmPage: `
    .algorithm-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .controls {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 20px;
      width: 100%;
    }
    
    .parameters {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: center;
      margin-bottom: 10px;
      background-color: #f0f0f0;
      padding: 15px;
      border-radius: 5px;
    }
    
    .parameter {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 5px 10px;
    }
    
    .parameter label {
      font-weight: bold;
      min-width: 140px;
    }
    
    .parameter input,
    .parameter select {
      padding: 8px;
      width: 100px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .parameter select {
      background-color: white;
      cursor: pointer;
    }
    
    .buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    button {
      padding: 10px 20px;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    
    button:hover {
      background-color: #357abd;
    }
    
    .back-link {
      display: inline-block;
      padding: 10px 20px;
      background-color: #757575;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    
    .back-link:hover {
      background-color: #616161;
    }
  `,
  
  // GridWorld styles
  gridWorld: `
    :root {
      --positive-reward: #00c853; /* Green for value 1 */
      --negative-reward: #d50000; /* Red for value -1 */
      --neutral-reward: #212121; /* Black for value 0 */
      --wall-color: #757575; /* Grey for walls */
    }
    
    .grid-world-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
    
    .grid {
      display: flex;
      flex-direction: column;
      border: 2px solid #333;
      margin-bottom: 15px;
    }
    
    .grid-row {
      display: flex;
    }
    
    .grid-cell {
      width: 100px;
      height: 100px;
      border: 1px solid #555;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      color: white;
      font-weight: bold;
    }
    
    .cell-value {
      font-size: 18px;
      margin-bottom: 5px;
    }
    
    .arrow {
      font-size: 24px;
      font-weight: bold;
    }
    
    /* Wall styling */
    .grid-cell.wall {
      background-color: var(--wall-color) !important;
    }
    
    /* Exit styling */
    .grid-cell.exit {
      border: 2px solid yellow;
    }
    
    /* Quadrants styling */
    .quadrants {
      position: relative;
      width: 100%;
      height: 100%;
    }
    
    .quadrant {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: white;
      width: 100%;
      height: 100%;
      clip-path: polygon(0 0, 0 0, 0 0);
    }
    
    .quadrant.north {
      clip-path: polygon(0 0, 100% 0, 50% 50%);
      justify-content: center;
      align-items: flex-start;
      padding-top: 10px;
    }
    
    .quadrant.south {
      clip-path: polygon(0 100%, 100% 100%, 50% 50%);
      justify-content: center;
      align-items: flex-end;
      padding-bottom: 10px;
    }
    
    .quadrant.east {
      clip-path: polygon(100% 0, 100% 100%, 50% 50%);
      justify-content: flex-end;
      align-items: center;
      padding-right: 10px;
    }
    
    .quadrant.west {
      clip-path: polygon(0 0, 0 100%, 50% 50%);
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
    }
    
    /* Agent dot styling */
    .agent-dot {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: rgba(0, 100, 255, 0.7); /* Semi-transparent blue */
      z-index: 10; /* Ensure it's above other elements */
    }
    
    /* Iterations label styling */
    .iterations-label {
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
      color: #333;
      text-align: center;
    }
    
    .iterations-count {
      color: #4a90e2;
      font-size: 18px;
    }
  `,
  
  // Menu styles
  menu: `
    .menu-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      padding: 20px;
      text-align: center;
    }
    
    .menu-links {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 30px;
    }
    
    .menu-link {
      display: block;
      padding: 15px 30px;
      background-color: #4a90e2;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-size: 18px;
      font-weight: bold;
      transition: background-color 0.3s;
      min-width: 250px;
      text-align: center;
    }
    
    .menu-link:hover {
      background-color: #357abd;
    }
  `
};

// Component Definitions Section
// We'll add each component here

// GridCell interface
export interface GridCell {
  row?: number;
  col?: number;
  value: number;
  direction: 'north' | 'south' | 'west' | 'east' | null;
  isWall?: boolean;
  isExit?: boolean;
  exitValue?: number;
  showQuadrants?: boolean;
  qValues?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

// GridWorld Component
interface GridWorldProps {
  grid: GridCell[][];
  title: string;
  iterationsRun?: number;
  agentPosition?: { row: number, col: number };
}

const GridWorld: React.FC<GridWorldProps> = ({ grid, title, iterationsRun = 0, agentPosition }) => {
  // Function to determine the background color based on the value
  const getBackgroundColor = (value: number) => {
    if (value === 1) return 'var(--positive-reward)';
    if (value === -1) return 'var(--negative-reward)';
    if (value === 0) return 'var(--neutral-reward)';
    
    // For values between -1 and 1
    if (value > 0 && value < 1) {
      // Green gradient for values between 0 and 1
      const intensity = Math.floor(value * 255);
      return `rgb(0, ${intensity}, 0)`;
    } else if (value < 0 && value > -1) {
      // Red gradient for values between -1 and 0
      const intensity = Math.floor(Math.abs(value) * 255);
      return `rgb(${intensity}, 0, 0)`;
    }
    
    return 'var(--neutral-reward)';
  };

  // Function to render the direction arrow
  const renderArrow = (direction: 'north' | 'south' | 'west' | 'east' | null) => {
    if (!direction) return null;
    
    const arrows = {
      north: '↑',
      south: '↓',
      west: '←',
      east: '→'
    };
    
    return <div className="arrow">{arrows[direction]}</div>;
  };

  // Function to render quadrants for a cell
  const renderQuadrants = (qValues: { north: number; south: number; east: number; west: number }) => {
    return (
      <div className="quadrants">
        <div 
          className="quadrant north" 
          style={{ backgroundColor: getBackgroundColor(qValues.north) }}
        >
          {qValues.north.toFixed(2)}
        </div>
        <div 
          className="quadrant east" 
          style={{ backgroundColor: getBackgroundColor(qValues.east) }}
        >
          {qValues.east.toFixed(2)}
        </div>
        <div 
          className="quadrant south" 
          style={{ backgroundColor: getBackgroundColor(qValues.south) }}
        >
          {qValues.south.toFixed(2)}
        </div>
        <div 
          className="quadrant west" 
          style={{ backgroundColor: getBackgroundColor(qValues.west) }}
        >
          {qValues.west.toFixed(2)}
        </div>
      </div>
    );
  };

  // Function to render the agent (blue dot)
  const renderAgent = (rowIndex: number, colIndex: number) => {
    if (agentPosition && agentPosition.row === rowIndex && agentPosition.col === colIndex) {
      return <div className="agent-dot"></div>;
    }
    return null;
  };

  return (
    <div className="grid-world-container">
      <h2>{title}</h2>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`grid-cell ${cell.isWall ? 'wall' : ''} ${cell.isExit ? 'exit' : ''}`}
                style={{ 
                  backgroundColor: cell.isWall 
                    ? 'var(--wall-color)' 
                    : cell.showQuadrants 
                      ? 'transparent' 
                      : getBackgroundColor(cell.value),
                  position: 'relative' // For absolute positioning of the agent dot
                }}
              >
                {cell.isWall ? (
                  null
                ) : cell.showQuadrants && cell.qValues ? (
                  renderQuadrants(cell.qValues)
                ) : (
                  <>
                    <div className="cell-value">{cell.value.toFixed(2)}</div>
                    {renderArrow(cell.direction)}
                  </>
                )}
                {renderAgent(rowIndex, colIndex)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="iterations-label">
        Iterations run: <span className="iterations-count">{iterationsRun}</span>
      </div>
    </div>
  );
};

// Menu Component
const Menu = () => {
  return (
    <div className="menu-container">
      <h1>Grid World MDP & Reinforcement Learning</h1>
      <div className="menu-links">
        <Link to="/value-iteration" className="menu-link">Value Iteration</Link>
        <Link to="/policy-iteration" className="menu-link">Policy Iteration</Link>
        <Link to="/q-learning" className="menu-link">Q-Learning</Link>
      </div>
    </div>
  );
};

// QLearning Component
const QLearning: React.FC = () => {
  // Initialize a 4x3 grid with default values
  const initializeGrid = (): GridCell[][] => {
    return [
      [{ value: 0, direction: null, row: 0, col: 0, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 0, col: 1, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 0, col: 2, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, row: 0, col: 3, direction: null, isExit: true, exitValue: 1 }],
      [{ value: 0, direction: null, row: 1, col: 0, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { isWall: true, value: 0, direction: null, row: 1, col: 1, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 1, col: 2, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 1, col: 3, isExit: true, exitValue: -1 }],
      [{ value: 0, direction: null, row: 2, col: 0, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 2, col: 1, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 2, col: 2, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 2, col: 3, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }],
    ];
  };

  const [grid, setGrid] = useState<GridCell[][]>(initializeGrid());
  const [learningRate, setLearningRate] = useState<number>(0.5);
  const [discountFactor, setDiscountFactor] = useState<number>(0.9);
  const [reward, setReward] = useState<number>(0);
  const [iterationsRun, setIterationsRun] = useState<number>(0);
  const [agentPosition, setAgentPosition] = useState<{ row: number, col: number }>({ row: 2, col: 0 }); // Start at bottom left
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let currentRow = agentPosition.row;
      let currentCol = agentPosition.col;
      let nextRow = agentPosition.row;
      let nextCol = agentPosition.col;
      let sample = 0;
      // Check if the key pressed is an arrow key
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        return; // Exit if not an arrow key
      }
      const tempGrid = structuredClone(grid);
      const direction = e.key.replace('Arrow', '').toLowerCase() as 'up' | 'down' | 'left' | 'right';
      const ordinalDirection = direction === 'up' ? 'north' : direction === 'down' ? 'south' : direction === 'left' ? 'west' : 'east';
      // Get the current cell
      const currentCell = tempGrid[currentRow][currentCol];
      if (currentCell.isExit) {
        nextRow = 2;
        nextCol = 0;
        sample = currentCell.exitValue || 0;
        currentCell.value = (1 - learningRate) * currentCell.value + learningRate * sample;
      } else {
        // Get the qvalue corresponding to the direction
        const qValue = currentCell.qValues?.[ordinalDirection];
        const nextCell = getNextCell(currentRow, currentCol, ordinalDirection, tempGrid);
        // get the maximum qvalue from the next cell
        const maxQValue = nextCell.isExit ? nextCell.value : Math.max(...Object.values(nextCell.qValues || {}));
        sample = reward + discountFactor * maxQValue;
        // Update the current cell's qvalue based on the learning rate and discount factor
        if (currentCell.qValues) {
          currentCell.qValues[ordinalDirection] = (1 - learningRate) * qValue! + learningRate * (sample);
        }
        nextRow = nextCell.row || 0;
        nextCol = nextCell.col || 0;
      }
      setGrid(tempGrid);
      setAgentPosition({ row: nextRow || 0, col: nextCol || 0 });
      setIterationsRun(prev => prev + 1); // Increment iterations on movement
    };
    
    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [agentPosition, grid, learningRate, discountFactor, reward]);

  const getNextCell = (row: number, col: number, direction: string, oldGrid: GridCell[][]) => {
    const cell = oldGrid[row][col];
    let nextCell = null;
    switch (direction) {
      case 'north':
        if (row > 0) {
          nextCell = oldGrid[row - 1][col];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
      case 'south':
        if (row < oldGrid.length - 1) {
          nextCell = oldGrid[row + 1][col];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
      case 'west':
        if (col > 0) {
          nextCell = oldGrid[row][col - 1];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
      case 'east':
        if (col < oldGrid[row].length - 1) {
          nextCell = oldGrid[row][col + 1];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
    }
    return cell;
  };

  const resetGrid = () => {
    setGrid(initializeGrid());
    setIterationsRun(0); // Reset the iterations run count
    setAgentPosition({ row: 2, col: 0 }); // Reset agent position to bottom left
  };

  return (
    <div className="algorithm-container">
      <h1>Q-Learning</h1>
      <div className="controls">
        <div className="parameters">
          <div className="parameter">
            <label>Learning Rate (α):</label>
            <input 
              type="number" 
              value={learningRate} 
              onChange={(e) => setLearningRate(Number(e.target.value))} 
              min="0.01" 
              max="1" 
              step="0.01"
            />
          </div>
          <div className="parameter">
            <label>Discount Factor (γ):</label>
            <select 
              value={discountFactor} 
              onChange={(e) => setDiscountFactor(Number(e.target.value))}
            >
              <option value={1}>1.0</option>
              <option value={0.99}>0.99</option>
              <option value={0.95}>0.95</option>
              <option value={0.9}>0.9</option>
              <option value={0.8}>0.8</option>
            </select>
          </div>
          <div className="parameter">
            <label>Reward:</label>
            <select 
              value={reward} 
              onChange={(e) => setReward(Number(e.target.value))}
            >
              <option value={0}>0</option>
              <option value={-0.01}>-0.01</option>
              <option value={-0.05}>-0.05</option>
              <option value={-0.1}>-0.1</option>
              <option value={-0.15}>-0.15</option>
              <option value={-0.2}>-0.2</option>
              <option value={-0.3}>-0.3</option>
              <option value={-0.4}>-0.4</option>
            </select>
          </div>
        </div>
        <div className="buttons">
          <button onClick={resetGrid}>Reset Grid</button>
          <Link to="/" className="back-link">Back to Menu</Link>
        </div>
      </div>
      <GridWorld 
        grid={grid} 
        title="Q-Learning Grid World" 
        iterationsRun={iterationsRun} 
        agentPosition={agentPosition} 
      />
      <div className="instructions">
        <p>Use arrow keys to move the blue dot. Each move increases the iteration count.</p>
      </div>
    </div>
  );
};

// ValueIteration Component
const ValueIteration: React.FC = () => {
  // Initialize a 4x3 grid with default values
  const initializeGrid = (): GridCell[][] => {
    return [
      [{ value: 0, direction: null, row: 0, col: 0, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 0, col: 1, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 0, col: 2, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 0, col: 3, isExit: true, exitValue: 1 }],
      [{ value: 0, direction: null, row: 1, col: 0, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { isWall: true, value: 0, direction: null, row: 1, col: 1, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 1, col: 2, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 1, col: 3, isExit: true, exitValue: -1 }],
      [{ value: 0, direction: null, row: 2, col: 0, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 2, col: 1, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 2, col: 2, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 2, col: 3, qValues: { north: 0, south: 0, east: 0, west: 0 } }],
    ];
  };

  const [grid, setGrid] = useState<GridCell[][]>(initializeGrid());
  const [showQuadrants, setShowQuadrants] = useState<boolean>(false);
  const [noiseFactor, setNoiseFactor] = useState<number>(20);
  const [reward, setReward] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0.90);
  const [iterations, setIterations] = useState<number>(1);
  const [iterationsRun, setIterationsRun] = useState<number>(0);
  
  const setCellValue = (row: number, col: number, newGrid: GridCell[][], oldGrid: GridCell[][]) => {
    const cell = newGrid[row][col];
    if (cell.isExit) {
      cell.value = cell.exitValue ?? 0;
      return;
    }
    const qValueKeys = Object.keys(cell.qValues || {});
    qValueKeys.forEach((key) => {
      // reset the qValue for the cell
      if (cell.qValues) {
        cell.qValues[key as keyof typeof cell.qValues] = 0;
      }
      const directions = getDirections(key);    
      directions.forEach((direction) => {
        const nextCell = getNextCell(row, col, direction, oldGrid);
        const discountedValue = nextCell.value * discount + reward;
        if (cell.qValues && key in cell.qValues) {
          cell.qValues[key as keyof typeof cell.qValues] += direction == key ? (1 - noiseFactor / 100) * discountedValue : (noiseFactor / 200) * discountedValue;
        }
      })
    })
    const qValues: Record<string, number> = cell.qValues || {};
    // Find the maximum Q-value and its corresponding direction
    const [bestDirection, maxValue] = Object.entries(qValues).reduce<[string, number]>((max, [key, val]) => 
        (val as number) > max[1] ? [key, val as number] : max, 
        [Object.keys(qValues)[0], qValues[Object.keys(qValues)[0]] as number]);

    cell.value = maxValue;
    cell.direction = bestDirection as 'north' | 'south' | 'west' | 'east';
  };

  const getDirections = (intendedDirection: string) => {
    if (intendedDirection == 'north') {
      return ['west', 'north', 'east'];
    }
    if (intendedDirection == 'south') {
      return ['west', 'south', 'east'];
    }
    if (intendedDirection == 'east') {
      return ['north', 'east', 'south'];
    }
    if (intendedDirection == 'west') {
      return ['north', 'west', 'south'];
    }
    return [];
  };

  const getNextCell = (row: number, col: number, direction: string, oldGrid: GridCell[][]) => {
    const cell = oldGrid[row][col];
    let nextCell = null;
    switch (direction) {
      case 'north':
        if (row > 0) {
          nextCell = oldGrid[row - 1][col];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
      case 'south':
        if (row < oldGrid.length - 1) {
          nextCell = oldGrid[row + 1][col];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
      case 'west':
        if (col > 0) {
          nextCell = oldGrid[row][col - 1];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
      case 'east':
        if (col < oldGrid[row].length - 1) {
          nextCell = oldGrid[row][col + 1];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
    }
    return cell;
  };

  const runValueIteration = () => {
    let oldGrid = structuredClone(grid);
    for (let i = 0; i < iterations; i++) {
      let newGrid = structuredClone(oldGrid);
      for (let j = 0; j < newGrid.length; j++) {
        for (let k = 0; k < newGrid[j].length; k++) {
          if (!newGrid[j][k].isWall) {
            setCellValue(j, k, newGrid, oldGrid);
          } 
        }
      }
      oldGrid = structuredClone(newGrid);
      setIterationsRun(prevIterations => prevIterations + 1);
    }
    setGrid(oldGrid);
  };

  const resetGrid = () => {
    setGrid(initializeGrid());
    setIterationsRun(0); // Reset the iterations run count
    setShowQuadrants(false); // Reset the quadrants display
  };

  const toggleQuadrants = () => {
    setShowQuadrants(!showQuadrants);
    
    // Update the grid to reflect the new quadrant display setting
    const updatedGrid = grid.map(row => 
      row.map(cell => {
        if (cell.isWall || cell.isExit) return cell;
        return { ...cell, showQuadrants: !showQuadrants };
      })
    );
    
    setGrid(updatedGrid);
  };

  return (
    <div className="algorithm-container">
      <h1>Value Iteration</h1>
      <div className="controls">
        <div className="parameters">
          <div className="parameter">
            <label>Iterations:</label>
            <input 
              type="number" 
              value={iterations} 
              onChange={(e) => setIterations(Number(e.target.value))} 
              min="1"
            />
          </div>
          <div className="parameter">
            <label>Noise Factor (%):</label>
            <select 
              value={noiseFactor} 
              onChange={(e) => setNoiseFactor(Number(e.target.value))}
            >
              <option value={20}>20</option>
              <option value={15}>15</option>
              <option value={10}>10</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="parameter">
            <label>Reward:</label>
            <select 
              value={reward} 
              onChange={(e) => setReward(Number(e.target.value))}
            >
              <option value={0}>0</option>
              <option value={-0.01}>-0.01</option>
              <option value={-0.05}>-0.05</option>
              <option value={-0.1}>-0.1</option>
              <option value={-0.15}>-0.15</option>
              <option value={-0.2}>-0.2</option>
              <option value={-0.3}>-0.3</option>
              <option value={-0.4}>-0.4</option>
            </select>
          </div>
          <div className="parameter">
            <label>Discount:</label>
            <select 
              value={discount} 
              onChange={(e) => setDiscount(Number(e.target.value))}
            >
              <option value={1}>1.0</option>
              <option value={0.99}>0.99</option>
              <option value={0.95}>0.95</option>
              <option value={0.9}>0.9</option>
              <option value={0.8}>0.8</option>
            </select>
          </div>
        </div>
        <div className="buttons">
          <button onClick={runValueIteration}>Run Value Iteration</button>
          <button onClick={resetGrid}>Reset Grid</button>
          <button onClick={toggleQuadrants}>
            {showQuadrants ? 'Hide Quadrants' : 'Show Quadrants'}
          </button>
          <Link to="/" className="back-link">Back to Menu</Link>
        </div>
      </div>
      <GridWorld grid={grid} title="Value Iteration Grid World" iterationsRun={iterationsRun} />
    </div>
  );
};

// PolicyIteration Component
const PolicyIteration: React.FC = () => {
  // Initialize a 4x3 grid with default values
  const initializeGrid = (): GridCell[][] => {
    return [
      [{ value: 0, direction: 'north', row: 0, col: 0, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: 'north', row: 0, col: 1, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: 'north', row: 0, col: 2, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 0, col: 3, isExit: true, exitValue: 1 }],
      [{ value: 0, direction: 'north', row: 1, col: 0, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { isWall: true, value: 0, direction: 'north', row: 1, col: 1, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: 'north', row: 1, col: 2, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 1, col: 3, isExit: true, exitValue: -1 }],
      [{ value: 0, direction: 'north', row: 2, col: 0, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: 'north', row: 2, col: 1, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: 'north', row: 2, col: 2, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: 'north', row: 2, col: 3, qValues: { north: 0, south: 0, east: 0, west: 0 } }],
    ];
  };

  const [grid, setGrid] = useState<GridCell[][]>(initializeGrid());
  const [showQuadrants, setShowQuadrants] = useState<boolean>(false);
  const [noiseFactor, setNoiseFactor] = useState<number>(20);
  const [reward, setReward] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0.90);
  const [iterations, setIterations] = useState<number>(1);
  const [overAllIterations, setOverallIterations] = useState<number>(1);
  const [iterationsRun, setIterationsRun] = useState<number>(0);
  
  const runPolicyIteration = () => {
    let oldGrid = structuredClone(grid);
    for (let i = 0; i < overAllIterations; i++) {
      let newGrid = runPolicyEvaluations(oldGrid);
      oldGrid = runPolicyExtraction(newGrid);
      setIterationsRun(prevIterations => prevIterations + 1);
    }
    setGrid(oldGrid);
  };

  const runPolicyExtraction = (newGrid: GridCell[][]) => {
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        const cell = newGrid[i][j];
        if (cell.isWall || cell.isExit) continue;
        const qValueKeys = Object.keys(cell.qValues || {});
        qValueKeys.forEach((key) => {
          // reset the qValue for the cell
          if (cell.qValues) {
            cell.qValues[key as keyof typeof cell.qValues] = 0;
          }
          const directions = getDirections(key);    
          directions.forEach((direction) => {
            const nextCell = getNextCell(i, j, direction, newGrid);
            const discountedValue = nextCell.value * discount + reward;
            if (cell.qValues && key in cell.qValues) {
              cell.qValues[key as keyof typeof cell.qValues] += direction == key ? (1 - noiseFactor / 100) * discountedValue : (noiseFactor / 200) * discountedValue;
            }
          })
        })
        // Get the direction corresponding to the maximum Q-value
        const qValues: Record<string, number> = cell.qValues || {};
        const [bestDirection, maxValue] = Object.entries(qValues).reduce<[string, number]>((max, [key, val]) => 
            (val as number) > max[1] ? [key, val as number] : max, 
            [Object.keys(qValues)[0], qValues[Object.keys(qValues)[0]] as number]);
        cell.direction = bestDirection as 'north' | 'south' | 'west' | 'east';
      }
    }
    return newGrid;
  };

  const getNextCell = (row: number, col: number, direction: string, oldGrid: GridCell[][]) => {
    const cell = oldGrid[row][col];
    let nextCell = null;
    switch (direction) {
      case 'north':
        if (row > 0) {
          nextCell = oldGrid[row - 1][col];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
      case 'south':
        if (row < oldGrid.length - 1) {
          nextCell = oldGrid[row + 1][col];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
      case 'west':
        if (col > 0) {
          nextCell = oldGrid[row][col - 1];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
      case 'east':
        if (col < oldGrid[row].length - 1) {
          nextCell = oldGrid[row][col + 1];
          if (nextCell.isWall) {
            return cell;
          }
          else {
            return nextCell;
          }
        }
        return cell;
    }
    return cell;
  };

  const getDirections = (intendedDirection: string) => {
    if (intendedDirection == 'north') {
      return ['west', 'north', 'east'];
    }
    if (intendedDirection == 'south') {
      return ['west', 'south', 'east'];
    }
    if (intendedDirection == 'east') {
      return ['north', 'east', 'south'];
    }
    if (intendedDirection == 'west') {
      return ['north', 'west', 'south'];
    }
    return [];
  };

  const setCellValue = (row: number, col: number, newGrid: GridCell[][], oldGrid: GridCell[][]) => {
    const cell = newGrid[row][col];
    if (cell.isExit) {
      cell.value = cell.exitValue ?? 0;
      return;
    }
    
    // Get the current policy (direction)
    const direction = cell.direction;
    if (!direction) return;
    
    // Get the next state based on the policy
    const directions = getDirections(direction);
    let newValue = 0;
    
    directions.forEach((dir) => {
      const nextCell = getNextCell(row, col, dir, oldGrid);
      const prob = dir === direction ? (1 - noiseFactor / 100) : (noiseFactor / 200);
      newValue += prob * (reward + discount * nextCell.value);
    });
    
    cell.value = newValue;
  };

  const runPolicyEvaluations = (oldGrid: GridCell[][]) => {
    for (let i = 0; i < iterations; i++) {
      let newGrid = structuredClone(oldGrid);
      for (let j = 0; j < newGrid.length; j++) {
        for (let k = 0; k < newGrid[j].length; k++) {
          if (!newGrid[j][k].isWall) {
            setCellValue(j, k, newGrid, oldGrid);
          }
        }
      }
      oldGrid = structuredClone(newGrid);
    }
    return oldGrid;
  };

  const prettyPrintGrid = (grid: GridCell[][]) => {
    console.log('Grid:');
    console.log('------------------');
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isWall) {
          console.log('W ');
        } else if (cell.isExit) {
          console.log('E ');
        } else {
          console.log(`${cell.value.toFixed(2)} `);
        }
      });
      console.log('\n');
    });
  };

  const resetGrid = () => {
    setGrid(initializeGrid());
    setIterationsRun(0); // Reset the iterations run count
    setShowQuadrants(false); // Reset the quadrants display
  };

  const toggleQuadrants = () => {
    setShowQuadrants(!showQuadrants);
    
    // Update the grid to reflect the new quadrant display setting
    const updatedGrid = grid.map(row => 
      row.map(cell => {
        if (cell.isWall || cell.isExit) return cell;
        return { ...cell, showQuadrants: !showQuadrants };
      })
    );
    
    setGrid(updatedGrid);
  };

  return (
    <div className="algorithm-container">
      <h1>Policy Iteration</h1>
      <div className="controls">
        <div className="parameters">
          <div className="parameter">
            <label>Evaluation Iterations:</label>
            <input 
              type="number" 
              value={iterations} 
              onChange={(e) => setIterations(Number(e.target.value))} 
              min="1"
            />
          </div>
          <div className="parameter">
            <label>Overall Iterations:</label>
            <input 
              type="number" 
              value={overAllIterations} 
              onChange={(e) => setOverallIterations(Number(e.target.value))} 
              min="1"
            />
          </div>
          <div className="parameter">
            <label>Noise Factor (%):</label>
            <select 
              value={noiseFactor} 
              onChange={(e) => setNoiseFactor(Number(e.target.value))}
            >
              <option value={80}>80</option>
              <option value={85}>85</option>
              <option value={90}>90</option>
              <option value={95}>95</option>
            </select>
          </div>
          <div className="parameter">
            <label>Reward:</label>
            <select 
              value={reward} 
              onChange={(e) => setReward(Number(e.target.value))}
            >
              <option value={0}>0</option>
              <option value={-0.01}>-0.01</option>
              <option value={-0.05}>-0.05</option>
              <option value={-0.1}>-0.1</option>
              <option value={-0.15}>-0.15</option>
              <option value={-0.2}>-0.2</option>
              <option value={-0.3}>-0.3</option>
              <option value={-0.4}>-0.4</option>
            </select>
          </div>
          <div className="parameter">
            <label>Discount:</label>
            <select 
              value={discount} 
              onChange={(e) => setDiscount(Number(e.target.value))}
            >
              <option value={1}>1.0</option>
              <option value={0.99}>0.99</option>
              <option value={0.95}>0.95</option>
              <option value={0.9}>0.9</option>
              <option value={0.8}>0.8</option>
            </select>
          </div>
        </div>
        <div className="buttons">
          <button onClick={runPolicyIteration}>Run Policy Iteration</button>
          <button onClick={resetGrid}>Reset Grid</button>
          <button onClick={toggleQuadrants}>
            {showQuadrants ? 'Hide Quadrants' : 'Show Quadrants'}
          </button>
          <Link to="/" className="back-link">Back to Menu</Link>
        </div>
      </div>
      <GridWorld grid={grid} title="Policy Iteration Grid World" iterationsRun={iterationsRun} />
    </div>
  );
};

// Main Howard Component
const Howard: React.FC = () => {
  return (
    <Router>
      <style>
        {styles.app}
        {styles.index}
        {styles.algorithmPage}
        {styles.gridWorld}
        {styles.menu}
      </style>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/q-learning" element={<QLearning />} />
        <Route path="/value-iteration" element={<ValueIteration />} />
        <Route path="/policy-iteration" element={<PolicyIteration />} />
      </Routes>
    </Router>
  );
};

export default Howard;
