import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GridWorld, { GridCell } from './GridWorld';
import '../styles/AlgorithmPage.css';

const ValueIteration: React.FC = () => {
  // Initialize a 4x3 grid with default values
  const initializeGrid = (): GridCell[][] => {
    return [
      [{ value: 0, direction: null, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, isExit: true, exitValue: 1 }],
      [{ value: 0, direction: null, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { isWall: true, value: 0, direction: null, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, isExit: true, exitValue: -1 }],
      [{ value: 0, direction: null, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, qValues: { north: 0, south: 0, east: 0, west: 0 } }, { value: 0, direction: null, qValues: { north: 0, south: 0, east: 0, west: 0 } }],
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

export default ValueIteration;
