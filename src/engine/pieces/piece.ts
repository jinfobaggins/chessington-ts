import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    public addAvailableMoveByNumberOfSpaces(board: Board, nRows: number, nCols: number, availableSpacesArray: Square[]) {
        const currentSquare = board.findPiece(this);
        if (currentSquare.row + nRows >= 0 && currentSquare.row + nRows <= 7 &&  currentSquare.col + nCols >= 0 && currentSquare.col + nCols <= 7){
            availableSpacesArray.push(Square.at(currentSquare.row + nRows, currentSquare.col + nCols))
        }
    }

    public addAvailableMoveByGridReference(board: Board, row: number, col: number, availableSpacesArray: Square[]) {
        const currentSquare = board.findPiece(this);
        if (row >= 0 && row <= 7 &&  col >= 0 && col <= 7){
            availableSpacesArray.push(Square.at(row, col))
        }
    }
}
