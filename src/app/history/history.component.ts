import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { I18nService } from '../services/i18n.service';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, TableModule, ChartModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  gamesHistory: Array<any> = [];
  data: any;
  options: any;

  constructor(private apiService: ApiService, public i18nService: I18nService) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.apiService.getGames().subscribe(
      (response) => {
        this.gamesHistory = response;
        //console.log('Games History:', this.gamesHistory);
        this.updateChartData();
      },
      (error) => {
        console.error('Error fetching games:', error);
      }
    );
  }

  updateChartData(): void {
    let playerWins = 0;
    let cpuWins = 0;
    let ties = 0;

    this.gamesHistory.forEach((game) => {
      if (game.result.winner === 'Player') {
        playerWins++;
      } else if (game.result.winner === 'CPU') {
        cpuWins++;
      } else if (game.result.winner === null) {
        ties++;
      }
    });

    console.log('Player Wins:', playerWins);
    console.log('CPU Wins:', cpuWins);
    console.log('Ties:', ties);

    this.data = {
      labels: ['Player', 'CPU', 'Tie'],
      datasets: [
        {
          data: [playerWins, cpuWins, ties],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };

    this.options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            color: '#000'
          }
        },
        tooltip: {
          enabled: true
        }
      }
    };
  }
}
