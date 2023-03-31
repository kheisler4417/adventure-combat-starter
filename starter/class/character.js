//test

class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.health = 100;
    this.strength = 10; // Add strength attribute
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0; // Ensure health doesn't go below 0
      this.die();
    }
  }

  die() {
    // Drop all held items in the current room
    this.currentRoom.items.push(...this.items);
    this.items = [];

    // Set currentRoom to null
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};

///////////////////
