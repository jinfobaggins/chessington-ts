import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';


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

    public addAvailableMoveByNumberOfSpaces(board: Board, availableSpacesArray: Square[], nRows: number, nCols: number) {
        const currentSquare = board.findPiece(this);
        if (currentSquare.row + nRows >= 0 && currentSquare.row + nRows <= GameSettings.BOARD_SIZE - 1 &&  currentSquare.col + nCols >= 0 && currentSquare.col + nCols <= GameSettings.BOARD_SIZE - 1){
            availableSpacesArray.push(Square.at(currentSquare.row + nRows, currentSquare.col + nCols))
        }
    }


    public addLateralMoves(board: Board, availableSpacesArray: Square[], max_spaces: number){
        //horizontal
        for (let i = 1; i<= max_spaces; i++){
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 0, i);
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 0, -i)
        }
        //vertical
        for (let i = 1; i<= max_spaces; i++) {
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, i, 0);
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -i, 0);
        }
    }

    public addDiagonalMoves(board: Board, availableSpacesArray: Square[], max_spaces: number){
        for(let i = 1; i <=max_spaces; i++){
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, i, i)
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, i, -i)
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -i, i)
            this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -i, -i)
        }
    }


}
