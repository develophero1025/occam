import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitorComponent } from './exhibitor.component';

describe('ExhibitorComponent', () => {
  let component: ExhibitorComponent;
  let fixture: ComponentFixture<ExhibitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
