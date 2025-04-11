import React from 'react';
import '../styles/GridWorld.css';

// Define types for our grid cell
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
                  position: 'relative' 
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

export default GridWorld;
