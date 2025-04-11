import { Link } from 'react-router-dom';
import '../styles/Menu.css';

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

export default Menu;
