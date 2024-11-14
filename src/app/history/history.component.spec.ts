import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { ApiService } from '../services/api.service';
import { I18nService } from '../services/i18n.service';
import { of, throwError } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  const mockGames = [
    { result: { winner: 'Player' } },
    { result: { winner: 'CPU' } },
    { result: { winner: null } }
  ];

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['getGames']);
    const i18nServiceSpy = jasmine.createSpyObj('I18nService', ['switchLanguage']);
    
    await TestBed.configureTestingModule({
      imports: [CommonModule, TableModule, ChartModule, HistoryComponent],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: I18nService, useValue: i18nServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch game history on initialization', () => {
    apiServiceSpy.getGames.and.returnValue(of(mockGames));

    component.ngOnInit();

    expect(apiServiceSpy.getGames).toHaveBeenCalled();
    expect(component.gamesHistory).toEqual(mockGames);
  });

  it('should handle error when fetching game history', () => {
    apiServiceSpy.getGames.and.returnValue(throwError(() => new Error('Error fetching games')));

    component.ngOnInit();

    expect(apiServiceSpy.getGames).toHaveBeenCalled();
    expect(component.gamesHistory).toEqual([]);
  });

  it('should correctly update chart data based on game history', () => {
    component.gamesHistory = [...mockGames, { result: { winner: 'Player' }}];

    component.updateChartData();

    expect(component.data.datasets[0].data).toEqual([2, 1, 1]);
  });
});
