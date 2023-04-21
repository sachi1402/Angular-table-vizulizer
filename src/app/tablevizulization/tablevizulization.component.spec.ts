import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablevizulizationComponent } from './tablevizulization.component';

describe('TablevizulizationComponent', () => {
  let component: TablevizulizationComponent;
  let fixture: ComponentFixture<TablevizulizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablevizulizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablevizulizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
