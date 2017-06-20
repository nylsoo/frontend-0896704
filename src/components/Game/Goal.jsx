import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.scss';
import Game from '../../Game/Game';
import Drawer from '../../Game/Drawer';
import GameStore from '../../stores/GameStore';

@observer
class Goal extends Component {
  componentDidMount() {
    if(this.canvas) {
      this.drawer = new Drawer(this.canvas);
      Game.setupGrid(this.canvas, this.drawer, 75);
      this.drawGoals();
      this.drawer.draw();
    }
  }

  drawGoals() {
    if(this.drawer) {
      GameStore.targets.forEach((target) => {
        this.drawer.addFunction((drawer) => {
          // I use the grid index to find the correct tile to draw the goal on.
          const tile = GameStore.grid[target];
          const tileWidth = tile.rightBottomCorner.x - tile.leftUpperCorner.x;
          drawer.context.beginPath();
          // Little bit of context about those random variables in this calculation. I forgot that the canvas has
          // padding. So for now i hardcoded the integers in the code.
          // TODO: Remove hardcoded integers.
          drawer.context.arc((tile.leftUpperCorner.x + 50) + (tileWidth / 2),
            (tile.leftUpperCorner.y + 50) + (tileWidth / 2),
            tileWidth / 2,
            2 * Math.PI,
            false);
          drawer.context.fillStyle = 'red';
          drawer.context.fill();
        });
      });
    }
  }

  render() {
    this.drawGoals();
    return (
      <div className={styles.goal}>
        <canvas ref={c => this.canvas = c} id='canvas' width='400' height='400' />
      </div>
    );
  }
}

export default Goal;