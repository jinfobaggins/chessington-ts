import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let current_square = board.findPiece(this);
        let move_square = new Square(current_square.row, current_square.col)
        if (this.player == 0){
            move_square.row = current_square.row + 1;
        }
        else{
            move_square.row = current_square.row - 1;
        }

        let out_array = new Array();
        out_array.push(move_square);
        return out_array;
    }
}
