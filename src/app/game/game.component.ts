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
  options = ['rock', 'paper', 'scissors'];
  choice: string | null = null;
  computerMove: string = '';
  result: string = '';

  constructor(private apiService: ApiService) {}

  play() {
    if (this.choice) {
      this.apiService.playMatch(this.choice).subscribe(
        (response) => {
          this.computerMove = response.computerMove;
          this.result = response.winner;
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
