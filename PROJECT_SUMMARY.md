# Grid World MDP & Reinforcement Learning Project

## Project Overview

This project is a React-based web application that demonstrates three fundamental reinforcement learning algorithms applied to a Grid World environment. It was developed as Programming Assignment 3 (PA3) for CS7375 at Kennesaw State University.

## Core Algorithms Implemented

The application implements three key reinforcement learning algorithms:

1. **Value Iteration** - An algorithm that iteratively computes the optimal value function for each state in the grid world, ultimately deriving an optimal policy.

2. **Policy Iteration** - A two-step algorithm that alternates between policy evaluation (computing the value function for a given policy) and policy improvement (making the policy greedy with respect to the current value function).

3. **Q-Learning** - A model-free reinforcement learning algorithm that learns the value of actions in states by experiencing the environment, without requiring a model of the environment.

## Grid World Environment

The environment is a 3x4 grid world with:
- Terminal states (exits) with positive (+1) and negative (-1) rewards
- Wall obstacles that cannot be traversed
- Stochastic transitions (controlled by a noise factor parameter)
- Four possible actions in each state: north, south, east, west

## Key Features

- **Interactive Grid Visualization** - Visual representation of the grid world with color-coded values and directional arrows showing the current policy
- **Adjustable Parameters** - Users can modify:
  - Number of iterations
  - Noise factor (stochasticity of the environment)
  - Step reward (cost of each move)
  - Discount factor (importance of future rewards)
- **Real-time Updates** - Grid values and policies update as algorithms run
- **Q-Value Visualization** - Option to display directional Q-values in quadrants for each cell
- **Agent Simulation** - For Q-Learning, an agent can be visualized exploring the environment

## Technical Implementation

- Built with React and TypeScript
- Uses React Router for navigation between algorithm demonstrations
- Responsive design with CSS for an intuitive user interface
- Implements mathematical formulations of MDP (Markov Decision Process) algorithms

## Educational Purpose

This application serves as an educational tool to visualize and understand how different reinforcement learning algorithms converge to optimal policies in a controlled environment. It demonstrates key concepts in reinforcement learning such as:

- Value functions and policies
- Exploration vs. exploitation
- The effect of discount factors on long-term planning
- How stochasticity affects learning and convergence

## How to Use

1. Select an algorithm from the main menu
2. Adjust parameters as desired
3. Run the algorithm to see how values and policies evolve
4. Reset the grid to start over or toggle quadrants to see detailed Q-values
