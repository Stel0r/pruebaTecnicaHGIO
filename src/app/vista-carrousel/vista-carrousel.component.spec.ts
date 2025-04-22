import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCarrouselComponent } from './vista-carrousel.component';

describe('VistaCarrouselComponent', () => {
  let component: VistaCarrouselComponent;
  let fixture: ComponentFixture<VistaCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaCarrouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
