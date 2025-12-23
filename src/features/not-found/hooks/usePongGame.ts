import { useCallback, useEffect, useRef, useState } from "react";
import { PONG_CONFIG, GameState } from "../constants/gameConfig";

const {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_SIZE,
  INITIAL_BALL_SPEED,
  AI_SPEED,
  PLAYER_SPEED,
} = PONG_CONFIG;

export function usePongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("START");
  const [score, setScore] = useState({ player: 0, ai: 0 });

  const ballRef = useRef({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    dx: INITIAL_BALL_SPEED,
    dy: INITIAL_BALL_SPEED,
  });
  const paddlesRef = useRef({
    playerY: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    aiY: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
  });
  const inputRef = useRef({ up: false, down: false });
  const animationFrameRef = useRef<number>(0);

  const resetBall = useCallback(() => {
    ballRef.current = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      dx: (Math.random() > 0.5 ? 1 : -1) * INITIAL_BALL_SPEED,
      dy: (Math.random() > 0.5 ? 1 : -1) * INITIAL_BALL_SPEED,
    };
  }, []);

  const resetGame = useCallback(() => {
    setScore({ player: 0, ai: 0 });
    resetBall();
    setGameState("PLAYING");
  }, [resetBall]);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#22D3EE";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#22D3EE";
    ctx.fillRect(10, paddlesRef.current.playerY, PADDLE_WIDTH, PADDLE_HEIGHT);

    ctx.fillStyle = "#A855F7";
    ctx.shadowColor = "#A855F7";
    ctx.fillRect(
      CANVAS_WIDTH - PADDLE_WIDTH - 10,
      paddlesRef.current.aiY,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    );

    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "#FFFFFF";
    ctx.fillRect(ballRef.current.x, ballRef.current.y, BALL_SIZE, BALL_SIZE);

    ctx.shadowBlur = 0;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") inputRef.current.up = true;
      if (e.key === "ArrowDown") inputRef.current.down = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") inputRef.current.up = false;
      if (e.key === "ArrowDown") inputRef.current.down = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (gameState === "START") {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) draw(ctx);
      }
      return;
    }

    if (gameState !== "PLAYING") return;

    const update = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (inputRef.current.up) {
        paddlesRef.current.playerY = Math.max(0, paddlesRef.current.playerY - PLAYER_SPEED);
      }
      if (inputRef.current.down) {
        paddlesRef.current.playerY = Math.min(
          CANVAS_HEIGHT - PADDLE_HEIGHT,
          paddlesRef.current.playerY + PLAYER_SPEED
        );
      }

      const aiCenter = paddlesRef.current.aiY + PADDLE_HEIGHT / 2;
      if (aiCenter < ballRef.current.y - 10) {
        paddlesRef.current.aiY = Math.min(
          CANVAS_HEIGHT - PADDLE_HEIGHT,
          paddlesRef.current.aiY + AI_SPEED
        );
      } else if (aiCenter > ballRef.current.y + 10) {
        paddlesRef.current.aiY = Math.max(0, paddlesRef.current.aiY - AI_SPEED);
      }

      ballRef.current.x += ballRef.current.dx;
      ballRef.current.y += ballRef.current.dy;

      if (ballRef.current.y <= 0 || ballRef.current.y + BALL_SIZE >= CANVAS_HEIGHT) {
        ballRef.current.dy *= -1;
      }

      const b = ballRef.current;
      const p = paddlesRef.current;

      if (
        b.x <= PADDLE_WIDTH + 10 &&
        b.x >= 10 &&
        b.y + BALL_SIZE >= p.playerY &&
        b.y <= p.playerY + PADDLE_HEIGHT
      ) {
        ballRef.current.dx = Math.min(Math.abs(ballRef.current.dx) + 0.5, 15);
      }

      if (
        b.x + BALL_SIZE >= CANVAS_WIDTH - PADDLE_WIDTH - 10 &&
        b.x + BALL_SIZE <= CANVAS_WIDTH - 10 &&
        b.y + BALL_SIZE >= p.aiY &&
        b.y <= p.aiY + PADDLE_HEIGHT
      ) {
        ballRef.current.dx = Math.max(-(Math.abs(ballRef.current.dx) + 0.5), -15);
      }

      if (ballRef.current.x < 0) {
        setScore((prev) => ({ ...prev, ai: prev.ai + 1 }));
        resetBall();
      } else if (ballRef.current.x > CANVAS_WIDTH) {
        setScore((prev) => ({ ...prev, player: prev.player + 1 }));
        resetBall();
      }

      draw(ctx);
      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameState, draw, resetBall]);

  const setMobileInput = useCallback((direction: "up" | "down", active: boolean) => {
    inputRef.current[direction] = active;
  }, []);

  return {
    canvasRef,
    gameState,
    score,
    resetGame,
    setMobileInput,
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT,
  };
}
