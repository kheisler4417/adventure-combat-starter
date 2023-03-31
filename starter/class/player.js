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
    const item = this.currentRoom.getItemByName(itemName);
    if (item) {
      this.items.push(item);
      this.currentRoom.items = this.currentRoom.items.filter(roomItem => roomItem.name.toLowerCase() !== itemName.toLowerCase());
    } else {
      console.log(`There is no ${itemName} here.`);
    }
  }


  dropItem(itemName) {
    const item = this.getItemByName(itemName);
    if (item) {
      this.currentRoom.items.push(item);
      this.items = this.items.filter(playerItem => playerItem.name.toLowerCase() !== itemName.toLowerCase());
    } else {
      console.log(`You are not carrying ${itemName}.`);
    }
  }


  eatItem(itemName) {
    const item = this.getItemByName(itemName);
    if (item) {
      if (item instanceof Food) {
        console.log(`You eat the ${itemName}.`);
        this.items = this.items.filter(playerItem => playerItem.name.toLowerCase() !== itemName.toLowerCase());
      } else {
        console.log(`You cannot eat ${itemName}.`);
      }
    } else {
      console.log(`You are not carrying ${itemName}.`);
    }
  }


  getItemByName(name) {
    for (const item of this.items) {
      if (item.name.toLowerCase() === name.toLowerCase()) {
        return item;
      }
    }
    return undefined;
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
