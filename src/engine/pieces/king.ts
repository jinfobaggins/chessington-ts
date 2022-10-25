import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableSpacesArray = new Array();
        this.addLateralMoves(board, availableSpacesArray, 1);
        this.addDiagonalMoves(board, availableSpacesArray, 1);

        //castling
        this.addCastlingIfViable(board, availableSpacesArray, this.player)

        return availableSpacesArray;
    }



    private addCastlingIfViable(board: Board, availableSpacesArray: Square[], player: Player){
        let currentSquare = board.findPiece(this);
        let startRow: number;
        let blockingPiecePresent = false;

        if (player == Player.WHITE) {
            startRow = 0
        }
        else{
            startRow = GameSettings.BOARD_SIZE - 1
        }

        for (let rookStartColumn of [0, GameSettings.BOARD_SIZE - 1] ) {

            let kingMoveDirection;
            let columnIterationStart;
            let columnIterationEnd;
            if (rookStartColumn < currentSquare.col) {
                kingMoveDirection = -1;
                columnIterationStart = rookStartColumn;
                columnIterationEnd = currentSquare.col;
            } else {
                kingMoveDirection = 1;
                columnIterationStart = currentSquare.col;
                columnIterationEnd = rookStartColumn;
            }


            if (this.hasMoved == false) {
                if (board.checkIfRookOnStartingSquare(Square.at(startRow, rookStartColumn))) {
                    for (let col = columnIterationStart + 1; col < columnIterationEnd; col++) {
                        if (!board.checkIfSquareEmpty(Square.at(startRow, col))){
                            blockingPiecePresent = true;
                            break;
                        }
                    }
                    if (!blockingPiecePresent) {
                        this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 0, kingMoveDirection * 2);
                    }
                }
            }
        }
    }
}
