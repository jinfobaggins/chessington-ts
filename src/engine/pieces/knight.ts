import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from "../gameSettings";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableSpacesArray = new Array();
        this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 1, 2)
        this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 1, -2)
        this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -1, 2)
        this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -1, -2)
        this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 2, 1)
        this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 2, -1)
        this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -2, 1)
        this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -2, -1)

        return availableSpacesArray;
    }
}
