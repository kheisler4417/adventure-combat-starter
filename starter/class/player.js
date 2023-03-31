const { Character } = require('./character');
const { Enemy } = require('./enemy');
const { Food } = require('./food');
const { Room } = require('./room');


class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {

    // Fill this in

  }

  dropItem(itemName) {

    // Fill this in

  }

  eatItem(itemName) {

    // Fill this in

  }

  getItemByName(name) {

    // Fill this in

  }

  hit(targetName) {
    const enemy = this.currentRoom.getEnemyByName(targetName);
    if (enemy) {
      const damage = 10; // Define the damage amount as needed.
      enemy.applyDamage(damage);
      enemy.attackTarget = this; // Set the enemy's attackTarget to the player who hit it.

      console.log(`${this.name} hits ${enemy.name} for ${damage} damage.`);
    } else {
      console.log(`There is no ${targetName} here.`);
    }
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
