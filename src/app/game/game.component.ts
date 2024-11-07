import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class GameComponent {
  handImages = [
    { id: 1, name: "rock", imageName: 'hand_rock.png' },
    { id: 2, name: "paper", imageName: 'hand_paper.png' },
    { id: 3, name: "scissors", imageName: 'hand_scissors.png' }
  ];

  funnyImages = [
    { id: 1, name: "rock", imageName: 'funny_rock.png' },
    { id: 2, name: "paper", imageName: 'funny_paper.jpg' },
    { id: 3, name: "scissors", imageName: 'funny_scissors.png' }
  ];

  currentImages = this.handImages;

  choice: string | null = null;
  computerMove: string = '';
  result: string = '';
  winner: string = '';

  // Session win counter
  sPlayerWins: number = 0;
  sCpuWins: number = 0;

  toggleArray() {
    this.currentImages = this.currentImages === this.handImages ? this.funnyImages : this.handImages;
  }

  // Method to set the choice when a button is clicked
  selectChoice(choice: string) {
    this.choice = choice;
  }

  constructor(private apiService: ApiService) {}

  play() {
    if (this.choice) {
      this.apiService.playMatch(this.choice).subscribe(
        (response) => {
          this.computerMove = response.computerMove;
          this.result = response.result.message;
          
          this.winner = response.result.winner;
          this.winner != null && this.winner === 'Player' ? this.sPlayerWins++ : this.sCpuWins++;
        },
        (error) => {
          console.error('Error:', error);
          this.result = 'Error occurred while playing the game.';
        }
      );
    } else {
      this.result = 'Please select an option.';
    }
  }
}
