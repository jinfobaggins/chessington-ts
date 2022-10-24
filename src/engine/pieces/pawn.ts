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
        let out_array = new Array();

        if (this.player == 0){
            if (current_square.row == 1){
                out_array.push(new Square(current_square.row + 2, current_square.col));
            }
            out_array.push(new Square(current_square.row + 1, current_square.col));
        }
        else{
            if (current_square.row == 6){
                out_array.push(new Square(current_square.row - 2, current_square.col));
            }
            out_array.push(new Square(current_square.row - 1, current_square.col));
        }


        return out_array;
    }
}
