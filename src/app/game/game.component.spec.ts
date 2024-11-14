import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { ApiService } from '../services/api.service';
import { I18nService } from '../services/i18n.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['playMatch']);
    const i18nServiceSpy = jasmine.createSpyObj('I18nService', ['switchLanguage']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, TranslateModule.forRoot(), GameComponent],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: I18nService, useValue: i18nServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle currentImages between handImages and funnyImages', () => {
    component.toggleArray();
    expect(component.currentImages).toEqual(component.funnyImages);
    component.toggleArray();
    expect(component.currentImages).toEqual(component.handImages);
  });

  it('should select the choice ROCK', () => {
    component.selectChoice('ROCK');
    expect(component.choice).toBe('ROCK');
  });

  it('should select the choice PAPER', () => {
    component.selectChoice('PAPER');
    expect(component.choice).toBe('PAPER');
  });

  it('should select the choice SCISSORS', () => {
    component.selectChoice('SCISSORS');
    expect(component.choice).toBe('SCISSORS');
  });

  it('should display an error if no choice is selected', () => {
    component.play();
    expect(component.resultMessage).toBe('Please select an option.');
  });

  it('should call playMatch and handle the response correctly', () => {
    const mockResponse = {
      id: '1',
      title: 'Game 1',
      playerMove: 'ROCK',
      computerMove: 'PAPER',
      result: {
        message: 'CPU Wins!',
        winner: 'CPU'
      }
    };
    apiServiceSpy.playMatch.and.returnValue(of(mockResponse));
  
    component.choice = 'ROCK';
    component.play();
  
    expect(apiServiceSpy.playMatch).toHaveBeenCalledWith('ROCK');
    expect(component.computerMove).toBe('PAPER');
    expect(component.resultMessage).toBe('CPU Wins!');
    expect(component.winner).toBe('CPU');
    expect(component.sCpuWins).toBe(1);
  });  

  it('should handle errors from playMatch', (done: DoneFn) => {
    apiServiceSpy.playMatch.and.returnValue(throwError(() => new Error('error')));

    component.choice = 'ROCK';
    component.play();

    expect(component.resultMessage).toBe('Error occurred while playing the game.');
    done();
  });
});
