import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableSpacesArray = new Array();
        this.addLateralMoves(board, availableSpacesArray, 1);
        this.addDiagonalMoves(board, availableSpacesArray, 1);

        return availableSpacesArray;
    }
}
