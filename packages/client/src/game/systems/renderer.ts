import type { World } from "@hagokia/game";
import { Color, ComponentMask, Depth, Dimension, Position, Shape } from "@hagokia/game/compoennts";
import type { Entity } from "@hagokia/game/entities";
import { System } from "@hagokia/game/systems";

export class Renderer extends System {
  constructor(private ctx: CanvasRenderingContext2D) {
    super();
  }

  public get requiredComponents() {
    return ComponentMask.Position | ComponentMask.Dimension | ComponentMask.Color | ComponentMask.Depth;
  }

  public execute(entity: Entity, world: World) {
    const position = world.getComponent<Position>(entity.id, Position);
    const dimension = world.getComponent<Dimension>(entity.id, Dimension);
    const color = world.getComponent<Color>(entity.id, Color);
    const shape = world.getComponent<Shape>(entity.id, Shape);
    const depth = world.getComponent<Depth>(entity.id, Depth);

    if (!position || !dimension || !color) return;

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.beginPath();

    const shadowWidth = dimension.width * 1.4; 
    const shadowHeight = dimension.height * 0.3; 

    this.ctx.ellipse(
      position.x + dimension.width / 2, 
      position.y + dimension.height + 1,    
      shadowWidth / 2,                                  
      shadowHeight / 2,                                 
      0, 0, Math.PI * 2
    );

    this.ctx.fill();

    if (shape) {
      this.ctx.translate(position.x, position.y);
      for (const polygon of shape.data) {
        this.ctx.beginPath();
        const { coordinates, fillStyle, strokeStyle, lineWidth } = polygon;
        
        this.ctx.moveTo(coordinates[0].x, coordinates[0].y);
      
        for (const point of coordinates) {
          this.ctx.lineTo(point.x, point.y);
        }
    
        this.ctx.closePath();
    
        this.ctx.fillStyle = fillStyle === 'componentColor' ? color?.value ?? 'pink' : fillStyle;

        
        this.ctx.fill();
        if (lineWidth) {
          this.ctx.strokeStyle = strokeStyle ?? 'black';
          this.ctx.lineWidth = lineWidth;
          this.ctx.stroke();
        }
      }
      this.ctx.translate(-position.x, -position.y);
      return;
    }

    this.ctx.fillStyle = color.value;
    this.ctx.fillRect(position.x, position.y, dimension.width, dimension.height);
  }
}
