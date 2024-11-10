import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { I18nService } from '../services/i18n.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule]
})
export class GameComponent {
  handImages = [
    { id: 1, name: "ROCK", imageName: 'hand_rock.png' },
    { id: 2, name: "PAPER", imageName: 'hand_paper.png' },
    { id: 3, name: "SCISSORS", imageName: 'hand_scissors.png' }
  ];

  funnyImages = [
    { id: 1, name: "ROCK", imageName: 'funny_rock.png' },
    { id: 2, name: "PAPER", imageName: 'funny_paper.jpg' },
    { id: 3, name: "SCISSORS", imageName: 'funny_scissors.png' }
  ];

  currentImages = this.handImages;

  choice: string | null = null;
  computerMove: string = '';
  resultMessage: string = '';
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

  constructor(private apiService: ApiService, public i18nService: I18nService) {}

  play() {
    if (this.choice) {
      this.apiService.playMatch(this.choice).subscribe(
        (response) => {
          this.computerMove = response.computerMove;
          this.resultMessage = response.result.message;
          
          this.winner = response.result.winner;
          this.winner != null && this.winner === 'player' ? this.sPlayerWins++ : this.sCpuWins++;
        },
        (error) => {
          console.error('Error:', error);
          this.resultMessage = 'Error occurred while playing the game.';
        }
      );
    } else {
      this.resultMessage = 'Please select an option.';
    }
  }
}
