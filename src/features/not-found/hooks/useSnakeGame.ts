import { useEffect, useRef, useState, useCallback } from "react";
import { SNAKE_CONFIG, GameState, Direction, Point } from "../constants/gameConfig";

const { CELL_SIZE, INITIAL_SPEED, SPEED_INCREMENT, MIN_SPEED } = SNAKE_CONFIG;

export function useSnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("START");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }]);
  const foodRef = useRef<Point>({ x: 15, y: 15 });
  const directionRef = useRef<Direction>("RIGHT");
  const nextDirectionRef = useRef<Direction>("RIGHT");
  const speedRef = useRef(INITIAL_SPEED);
  const lastRenderTimeRef = useRef(0);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("snake_high_score");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const spawnFood = useCallback(() => {
    if (!canvasRef.current) return;
    let newFood: Point;
    let isOnSnake: boolean;
    
    do {
      newFood = {
        x: Math.floor(Math.random() * (canvasRef.current.width / CELL_SIZE)),
        y: Math.floor(Math.random() * (canvasRef.current.height / CELL_SIZE)),
      };
      isOnSnake = snakeRef.current.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
    } while (isOnSnake);
    
    foodRef.current = newFood;
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    ctx.fillStyle = "#F472B6";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#F472B6";
    ctx.beginPath();
    ctx.arc(
      foodRef.current.x * CELL_SIZE + CELL_SIZE / 2,
      foodRef.current.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.fillStyle = "#22D3EE";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#22D3EE";
    snakeRef.current.forEach((segment, i) => {
      if (i === 0) {
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = "#FFFFFF";
      } else {
        ctx.fillStyle = "#22D3EE";
        ctx.shadowColor = "#22D3EE";
      }
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });

    ctx.shadowBlur = 0;
  }, []);

  const resetGame = useCallback(() => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    directionRef.current = "RIGHT";
    nextDirectionRef.current = "RIGHT";
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snake_high_score", score.toString());
    }
    setScore(0);
    speedRef.current = INITIAL_SPEED;
    setGameState("PLAYING");
    if (canvasRef.current) spawnFood();
  }, [score, highScore, spawnFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current !== "DOWN") nextDirectionRef.current = "UP";
          break;
        case "ArrowDown":
          if (directionRef.current !== "UP") nextDirectionRef.current = "DOWN";
          break;
        case "ArrowLeft":
          if (directionRef.current !== "RIGHT") nextDirectionRef.current = "LEFT";
          break;
        case "ArrowRight":
          if (directionRef.current !== "LEFT") nextDirectionRef.current = "RIGHT";
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameState !== "PLAYING") return;

    const update = (timestamp: number) => {
      const secondsSinceLastRender = (timestamp - lastRenderTimeRef.current) / 1000;
      if (secondsSinceLastRender < speedRef.current / 1000) {
        animationFrameRef.current = requestAnimationFrame(update);
        return;
      }

      lastRenderTimeRef.current = timestamp;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      directionRef.current = nextDirectionRef.current;
      const head = { ...snakeRef.current[0] };

      switch (directionRef.current) {
        case "UP": head.y -= 1; break;
        case "DOWN": head.y += 1; break;
        case "LEFT": head.x -= 1; break;
        case "RIGHT": head.x += 1; break;
      }

      const gridW = canvas.width / CELL_SIZE;
      const gridH = canvas.height / CELL_SIZE;

      if (head.x < 0 || head.x >= gridW || head.y < 0 || head.y >= gridH) {
        setGameState("GAME_OVER");
        return;
      }

      if (snakeRef.current.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameState("GAME_OVER");
        return;
      }

      snakeRef.current.unshift(head);

      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore((prev) => prev + 10);
        speedRef.current = Math.max(MIN_SPEED, speedRef.current - SPEED_INCREMENT);
        spawnFood();
      } else {
        snakeRef.current.pop();
      }

      draw(ctx, canvas);
      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameState, draw, spawnFood]);

  const handleControl = useCallback((dir: Direction) => {
    if (gameState !== "PLAYING") return;
    if (dir === "UP" && directionRef.current !== "DOWN") nextDirectionRef.current = "UP";
    if (dir === "DOWN" && directionRef.current !== "UP") nextDirectionRef.current = "DOWN";
    if (dir === "LEFT" && directionRef.current !== "RIGHT") nextDirectionRef.current = "LEFT";
    if (dir === "RIGHT" && directionRef.current !== "LEFT") nextDirectionRef.current = "RIGHT";
  }, [gameState]);

  return {
    canvasRef,
    gameState,
    score,
    highScore,
    resetGame,
    handleControl,
  };
}
