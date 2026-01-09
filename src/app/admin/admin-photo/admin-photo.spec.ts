import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPhoto } from './admin-photo';

describe('AdminPhoto', () => {
  let component: AdminPhoto;
  let fixture: ComponentFixture<AdminPhoto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPhoto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPhoto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
