import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableSpacesArray = new Array();
        this.addLateralMoves(board, availableSpacesArray, GameSettings.BOARD_SIZE - 1)

        return availableSpacesArray;
    }
}
