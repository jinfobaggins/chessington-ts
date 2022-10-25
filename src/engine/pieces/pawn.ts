import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentSquare = board.findPiece(this);
        let availableSpacesArray = new Array();
        let directionMultiplier: number;

        //white pawns move up and black down
        if (this.player == Player.WHITE) {
            directionMultiplier = 1
        }
        else{
            directionMultiplier = -1
        }

        if (board.checkIfSquareEmpty(Square.at(currentSquare.row + 1 * directionMultiplier, currentSquare.col)))  {
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 1*directionMultiplier, 0);
            //can move 2 spaces if not already moved
            if (!this.hasMoved){
                if (board.checkIfSquareEmpty(Square.at(currentSquare.row + 2 * directionMultiplier, currentSquare.col))) {
                    this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 2*directionMultiplier, 0);
                }
            }
        }

        //check if diagonally forward has opposing colour piece. If yes, add it as availability (unless king)
        for (let i of [-1, 1]) {
            let squareToMoveTo = Square.at(currentSquare.row + directionMultiplier, currentSquare.col + i)
            if (board.checkIfOpposingPieceOnSquare(squareToMoveTo, this.player) && !board.checkIfKingOnSquare(squareToMoveTo)) {
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, directionMultiplier, i);
            }
        }


        return availableSpacesArray;
    }
}
