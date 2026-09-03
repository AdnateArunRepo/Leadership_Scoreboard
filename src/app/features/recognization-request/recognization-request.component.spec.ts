import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognizationRequestComponent } from './recognization-request.component';

describe('RecognizationRequestComponent', () => {
  let component: RecognizationRequestComponent;
  let fixture: ComponentFixture<RecognizationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecognizationRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecognizationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
