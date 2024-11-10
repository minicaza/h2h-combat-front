import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
    { path: 'game', component: GameComponent },
    { path: 'history', component: HistoryComponent },
    { path: '', redirectTo: '/game', pathMatch: 'full' }
];