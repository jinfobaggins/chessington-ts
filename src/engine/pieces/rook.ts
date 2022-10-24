import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let current_square = board.findPiece(this);
        let out_array = new Array();
        //horizontal
        for (let i = 0; i<= 7; i++){
            if (i != current_square.col){
                this.addAvailableMoveByGridReference(board, current_square.row, i, out_array);
            }
        }
        //vertical
        for (let i = 0; i<= 7; i++){
            if (i != current_square.row){
                this.addAvailableMoveByGridReference(board, i, current_square.col, out_array);
            }
        }
        return out_array;
    }
}
