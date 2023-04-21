import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharvizulizerComponent } from './charvizulizer.component';

describe('CharvizulizerComponent', () => {
  let component: CharvizulizerComponent;
  let fixture: ComponentFixture<CharvizulizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharvizulizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharvizulizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
