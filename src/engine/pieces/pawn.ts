import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let current_square = board.findPiece(this);
        let availableSpacesArray = new Array();
        let directionMultiplier: number;

        //white pawns move up and black down
        if (this.player == Player.WHITE) {
            directionMultiplier = 1
        }
        else{
            directionMultiplier = -1
        }

        if (board.getPiece(Square.at(current_square.row + directionMultiplier, current_square.col)) == undefined) {
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 1*directionMultiplier, 0);
            //can move 2 spaces if not already moved
            if (!this.hasMoved){
                if (board.getPiece(Square.at(current_square.row + 2*directionMultiplier, current_square.col)) == undefined) {
                    this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 2*directionMultiplier, 0);
                }
            }
        }

        return availableSpacesArray;
    }
}
