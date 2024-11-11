import { World } from "@hagokia/game";
import { Color, Dimension, Position, TargetPosition } from "@hagokia/game/compoennts";
import { Movement } from "@hagokia/game/systems";
import { Depth, FollowEntity, Shape } from "../../../game/src/components/component";
import { DepthCalculation, WanderAround } from "../../../game/src/systems/system";

export class WorldServer extends World {
  constructor() {
    super();

    this.addSystem(new Movement());
    this.addSystem(new WanderAround());
    this.addSystem(new DepthCalculation());

    const redCampfireEntity = this.createEntity('Campfire', {
      components: [
        new Position(235, 238),
        new Dimension(10, 4),
        new Depth(),
        new Color('#de523e'),
        new Shape([
          {
            type: 'polygon',
            coordinates: [
              { x: 0, y: 0 },
              { x: 10, y: 0 },
              { x: 10, y: 4 },
              { x: 0, y: 4 },
            ],
            fillStyle: '#52333f',
            lineWidth: 1
          },
          {
            type: 'polygon',
            coordinates: [
              { x: 0, y: 0 },
              { x: 10, y: 0 },
              { x: 10, y: 3 },
              { x: 0, y: 3 },
            ],
            fillStyle: 'componentColor',
          }
        ])
      ],
    });

    const yellowCampfireEntity = this.createEntity('Campfire', {
      components: [
        new Position(400, 400),
        new Dimension(10, 4),
        new Depth(),
        new Color('#f0b541'),
        new Shape([
          {
            type: 'polygon',
            coordinates: [
              { x: 0, y: 0 },
              { x: 10, y: 0 },
              { x: 10, y: 4 },
              { x: 0, y: 4 },
            ],
            fillStyle: '#52333f',
            lineWidth: 1
          },
          {
            type: 'polygon',
            coordinates: [
              { x: 0, y: 0 },
              { x: 10, y: 0 },
              { x: 10, y: 3 },
              { x: 0, y: 3 },
            ],
            fillStyle: 'componentColor',
          }
        ])
      ],
    });
    
    for (let i=0; i < 50; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 1024;

      this.createEntity('Rock', {
        components: [new Position(rx, ry),  new Dimension(5, 5), new Depth(), new Color('#454a6a')],
      });
    }

    for (let i=0; i < 10; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 1024;

      this.createEntity('Human', {
        components: [
          new Position(rx, ry),
          new Dimension(6, 10),
          new Depth(),
          new Color('#de523e'),
          new TargetPosition(rx, ry),
          new FollowEntity(redCampfireEntity.id, 128),
        ],
      });
    }

    for (let i=0; i < 10; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 1024;

      this.createEntity('Human', {
        components: [
          new Position(rx, ry),
          new Dimension(6, 10),
          new Depth(),
          new Color('#f0b541'),
          new TargetPosition(rx, ry),
          new FollowEntity(yellowCampfireEntity.id, 128),
        ],
      });
    }

    const brx = Math.random() * 1024;
    const bry = Math.random() * 1024;
    const leadBearEntity = this.createEntity('Bear', {
      components: [
        new Position(brx, bry),
        new Dimension(16, 10),
        new Depth(),
        new Color('#52333f'),
        new TargetPosition(brx, bry),
      ],
    });

    for (let i=0; i < 4; i++) {
      this.createEntity('Bear', {
        components: [
          new Position(brx, bry),
          new Dimension(16, 10),
          new Depth(),
          new Color('#52333f'),
          new TargetPosition(brx, bry),
          new FollowEntity(leadBearEntity.id, 64),
        ],
      });
    }

    for (let i=0; i < 10; i++) {
      const srx = Math.random() * 1024;
      const sry = Math.random() * 1024;
      const leadSheepEntity = this.createEntity('Sheep', {
        components: [
          new Position(srx, sry),
          new Dimension(6, 6),
          new Depth(),
          new Color('#ffffff'),
          new TargetPosition(srx, sry),
        ],
      });

      for (let i=0; i < 4; i++) {
        this.createEntity('Sheep', {
          components: [
            new Position(srx, sry),
            new Dimension(6, 6),
            new Depth(),
            new Color('#ffffff'),
            new TargetPosition(srx, sry),
            new FollowEntity(leadSheepEntity.id, 16),
          ],
        });
      }
    }

    for (let i=0; i < 100; i++) {
      const srx = Math.random() * 1024;
      const sry = Math.random() * 1024;

      this.createEntity('Tree', {
        components: [
          new Position(srx, sry),
          new Dimension(10, 14),
          new Depth(),
          new Color('#3b7d4f'),
          new Shape([
            {
              type: 'polygon',
              coordinates: [
                { x: 3 + 0, y: 10 + 0 },
                { x: 3 + 4, y: 10 + 0 },
                { x: 3 + 4, y: 10 + 4 },
                { x: 3 + 0, y: 10 + 4 },
              ],
              fillStyle: '#3d2936',
            },
            {
              type: 'polygon',
              coordinates: [
                { x: 0, y: 0 },
                { x: 10, y: 0 },
                { x: 10, y: 10},
                { x: 0, y: 10 },
              ],
              fillStyle: 'componentColor',
            }
          ])
        ],
      });
    }
  }
}
