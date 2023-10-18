import gameStart from "./mainGame";
import Player from "./player";

export default function Randomize(name){
    let human = new Player(name , false);
    human.random();

    let computer = new Player('Computer' , true);
    computer.aiBoardShip();

    gameStart(human , computer)
}