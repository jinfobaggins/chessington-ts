import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let current_square = board.findPiece(this);
        let availableSpacesArray = new Array();

        if (this.player == 0){
            if (current_square.row == 1){
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray,2, 0)
            }
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray,1, 0)
        }
        else{
            if (current_square.row == GameSettings.BOARD_SIZE - 2){
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -2, 0);
            }
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -1, 0);
        }

        return availableSpacesArray;
    }
}
