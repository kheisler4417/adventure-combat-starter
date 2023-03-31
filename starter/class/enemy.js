const { Character } = require('./character');

class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000; // Set a cooldown value in milliseconds.
    this.lastActionTime = Date.now(); // Store the last action's timestamp.
    this.attackTarget = null; // Add this line to set attackTarget to null initially
  }

  setPlayer(player) {
    this.player = player;
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = () => {
      this.cooldown = 3000; // Reset the cooldown to 3 seconds
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown * 1000);
  }

  reactToHit() {
    this.alert(`${this.name} is hit and becomes angry!`);
    this.attack();
  }

  die() {
    this.alert(`${this.name} is dead!`);
  }

  attack() {
    if (this.player) {
      this.player.applyDamage(10); // Apply 5 damage to the player
      this.alert(`${this.name} attacks you for 5 damage!`);
      this.cooldown += 3000; // Increase the cooldown timer
    }
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      if (this.player && this.player.currentRoom === this.currentRoom) {
        this.attack();
      } else {
        this.randomMove();
      }
      this.rest();
    }
  }

  performAction() {
    if (Math.random() < 0.5) {
      this.scratchNose();
    } else {
      this.randomMove();
    }
  }

  scratchNose() {
    this.alert(`${this.name} scratches its nose`);
  }

  randomMove() {
    if (this.cooldown > 0) {
      return;
    }

    const direction = 'w';
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    if (nextRoom) {
      this.currentRoom = nextRoom;
      this.cooldown += 5; // Adjust the cooldown time as needed.
    }
  }

}

module.exports = {
  Enemy,
};
