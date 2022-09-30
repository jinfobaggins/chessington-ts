import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentSquare = board.findPiece(this);
        let availableSpacesArray = new Array();
        this.addAvailableMoveIfSquareEmpty(board, availableSpacesArray, Square.at(currentSquare.row + 1, currentSquare.col + 2))
        this.addAvailableMoveIfSquareEmpty(board, availableSpacesArray, Square.at(currentSquare.row + 1, currentSquare.col - 2))
        this.addAvailableMoveIfSquareEmpty(board, availableSpacesArray, Square.at(currentSquare.row - 1, currentSquare.col + 2))
        this.addAvailableMoveIfSquareEmpty(board, availableSpacesArray, Square.at(currentSquare.row - 1, currentSquare.col - 2))
        this.addAvailableMoveIfSquareEmpty(board, availableSpacesArray, Square.at(currentSquare.row + 2, currentSquare.col + 1))
        this.addAvailableMoveIfSquareEmpty(board, availableSpacesArray, Square.at(currentSquare.row + 2, currentSquare.col - 1))
        this.addAvailableMoveIfSquareEmpty(board, availableSpacesArray, Square.at(currentSquare.row - 2, currentSquare.col + 1))
        this.addAvailableMoveIfSquareEmpty(board, availableSpacesArray, Square.at(currentSquare.row - 2, currentSquare.col - 1))

        return availableSpacesArray;
    }
}
