import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideo } from './admin-video';

describe('AdminVideo', () => {
  let component: AdminVideo;
  let fixture: ComponentFixture<AdminVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVideo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
