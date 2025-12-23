export const SNAKE_CONFIG = {
  GRID_SIZE: 20,
  CELL_SIZE: 20,
  INITIAL_SPEED: 150,
  SPEED_INCREMENT: 2,
  MIN_SPEED: 50,
  CANVAS_SIZE: 400,
};

export const PONG_CONFIG = {
  CANVAS_WIDTH: 600,
  CANVAS_HEIGHT: 400,
  PADDLE_WIDTH: 10,
  PADDLE_HEIGHT: 80,
  BALL_SIZE: 10,
  INITIAL_BALL_SPEED: 5,
  AI_SPEED: 4,
  PLAYER_SPEED: 6,
};

export type GameState = "START" | "PLAYING" | "GAME_OVER";
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Point = { x: number; y: number };
