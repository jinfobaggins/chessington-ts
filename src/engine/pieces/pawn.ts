import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let current_square = board.findPiece(this);
        let out_array = new Array();

        if (this.player == 0){
            if (current_square.row == 1){
                this.addAvailableMoveByNumberOfSpaces(board, 2, 0, out_array)
            }
            this.addAvailableMoveByNumberOfSpaces(board, 1, 0, out_array)
        }
        else{
            if (current_square.row == 6){
                this.addAvailableMoveByNumberOfSpaces(board, -2, 0, out_array);
            }
            this.addAvailableMoveByNumberOfSpaces(board, -1, 0, out_array);
        }


        return out_array;
    }
}
