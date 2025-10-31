import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeForm} from './backoffice-form';

describe('BackofficeAddproduct', () => {
  let component: BackofficeForm;
  let fixture: ComponentFixture<BackofficeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackofficeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackofficeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
