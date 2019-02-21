class RPSgame {

    constructor(p1, p2) {
      this._players = [p1, p2];
      this._turns = [null, null];
  
      this._sendToPlayers('Rock Paper Scissors Starts!');
  
      this._players.forEach((player, idx) => {
        player.on('turn', (turn) => {
          this._onTurn(idx, turn);
        });
      });
      this._score = [0,':',0];
    }
  
    _sendScore(score){
        ////Lucrat
        this._players[1].emit('scor',score)
        this._players[0].emit('scor',score.reverse())
      }

  
    _sendToPlayer(playerIndex, msg) {
      this._players[playerIndex].emit('message', msg);
    }
  
    _sendToPlayers(msg) {
      this._players.forEach((player) => {
        player.emit('message', msg);
      });
    }
    //Top
    _sendtoTheTop(msg){
      this._players.forEach((player) => {
        player.emit('display_left', msg);
      });
    }
    //Next
    _sendToBottom(msg) {
      this._players.forEach((player) => {
        player.emit('disp', msg);
      });
    }

    
  
    _onTurn(playerIndex, turn) {
      this._turns[playerIndex] = turn;
      this._sendToPlayer(playerIndex, `You selected ${turn}`);
  
      this._checkGameOver();
    }
  
    _checkGameOver() {
      const turns = this._turns;
  
      if (turns[0] && turns[1]) {
        this._sendtoTheTop('Game over ' + turns.join(' : ') + '. ');
        this._getGameREsult()
        this._turns = [null, null];
        this._sendToBottom('Next Round!!!!');
        this._sendScore(this._score);
      }
    }
    _getGameREsult(){
        const p0 = this._decodeTurn(this._turns[0])
        const p1 = this._decodeTurn(this._turns[1])
        const distance = (p1-p0+3)%3
        switch (distance){
            case 0 :
            this._sendDrawMessage(this._players[0],this._players[1])
            break
            case 1:
            this._sendWinMessage(this._players[0],this._players[1])
            this._score[2]=this._score[2]+1
            break
            case 2:
            this._sendWinMessage(this._players[1],this._players[0])
            this._score[0]=this._score[0]+1
            break

        }
    }

    //Sa scrie sus win/lost
    _sendWinMessage(winner, loser){
        winner.emit('display_right','You win')
        loser.emit('display_right', 'You lost')
    }
    //Sa scrie sus Draw
    _sendDrawMessage(_players0, _players1){
      _players0.emit('display_right','Draw')
      _players1.emit('display_right', 'Draw')
    }

    _decodeTurn(turn){
        switch(turn){
            case 'rock':
            return 0
            case 'scissors':
            return 1
            case 'paper':
            return 2
            default:
            throw new Error(`Could not decode turn ${turn}`)
        }
    }
    
  }
  module.exports = RPSgame