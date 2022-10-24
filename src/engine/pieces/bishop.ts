import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let current_square = board.findPiece(this);
        let out_array = new Array();

        for(let i = 1; i <=7; i++){
            this.addAvailableMoveByNumberOfSpaces(board, i, i, out_array)
            this.addAvailableMoveByNumberOfSpaces(board, i, -i, out_array)
            this.addAvailableMoveByNumberOfSpaces(board, -i, i, out_array)
            this.addAvailableMoveByNumberOfSpaces(board, -i, -i, out_array)
        }

        return out_array;
    }
}
