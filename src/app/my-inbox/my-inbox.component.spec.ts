import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInboxComponent } from './my-inbox.component';

describe('MyInboxComponent', () => {
  let component: MyInboxComponent;
  let fixture: ComponentFixture<MyInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyInboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
