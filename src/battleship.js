
export default function Ship(shipLength) {
  const ships = {
    length: shipLength,
    gotHit: 0,
    sunk: false,

    hit: function () {
      this.gotHit++;
    },

    isSunk: function () {
      this.length === this.gotHit ? this.sunk = true : this.sunk = false
    },
  };

  return { ships };
}
