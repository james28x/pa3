import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GridWorld, { GridCell } from './GridWorld';
import '../styles/AlgorithmPage.css';

const QLearning: React.FC = () => {
  // Initialize a 4x3 grid with default values
  const initializeGrid = (): GridCell[][] => {
    return [
      [{ value: 0, direction: null, row: 0, col: 0, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 0, col: 1, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 0, col: 2, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, row: 0, col: 3, direction: null, isExit: true, exitValue: 1 }],
      [{ value: 0, direction: null, row: 1, col: 0, showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { isWall: true, value: 0, direction: null, row: 1, col: 1, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 1, col: 2,showQuadrants: true, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, row: 1, col: 3,isExit: true, exitValue: -1 }],
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
  }, [agentPosition, grid]);

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

export default QLearning;
