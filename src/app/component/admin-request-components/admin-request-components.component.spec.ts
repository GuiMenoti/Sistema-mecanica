import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestComponentsComponent } from './admin-request-components.component';

describe('AdminRequestComponentsComponent', () => {
  let component: AdminRequestComponentsComponent;
  let fixture: ComponentFixture<AdminRequestComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRequestComponentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRequestComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
