import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProdcutComponent } from './view-prodcut.component';

describe('ViewProdcutComponent', () => {
  let component: ViewProdcutComponent;
  let fixture: ComponentFixture<ViewProdcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProdcutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewProdcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
