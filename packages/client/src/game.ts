import { Renderer } from "./systems/renderer";
import { WorldClient } from "./world";

export class Game {
  public world: WorldClient;

  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.world = new WorldClient();

    this.world.addSystem(new Renderer(this.ctx));
  }

  public render() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.world.executeSystems();

    window.requestAnimationFrame(this.render.bind(this));
  }
}
