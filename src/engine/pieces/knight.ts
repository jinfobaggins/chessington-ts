import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableSpacesArray = new Array();
        this.addViableMove(board, availableSpacesArray, 1, 2)
        this.addViableMove(board, availableSpacesArray, 1, -2)
        this.addViableMove(board, availableSpacesArray, -1, 2)
        this.addViableMove(board, availableSpacesArray, -1, -2)
        this.addViableMove(board, availableSpacesArray, 2, 1)
        this.addViableMove(board, availableSpacesArray, 2, -1)
        this.addViableMove(board, availableSpacesArray, -2, 1)
        this.addViableMove(board, availableSpacesArray, -2, -1)

        return availableSpacesArray;
    }

    public addViableMove(board: Board, availableSpacesArray: Square[], numberOfRowsToMove: number, numberOfColumnsToMove: number) {
        let currentSquare = board.findPiece(this);
        let squareToMoveTo = Square.at(currentSquare.row + numberOfRowsToMove, currentSquare.col + numberOfColumnsToMove);
        this.addAvailableMoveIfSquareEmpty(board, availableSpacesArray, squareToMoveTo);
        if (board.checkIfOpposingPieceOnSquare(squareToMoveTo, this.player) && !board.checkIfKingOnSquare(squareToMoveTo)) {
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, numberOfRowsToMove, numberOfColumnsToMove);
        }
    }

}
