import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapperPage } from './mapper.page';

describe('MapperPage', () => {
  let component: MapperPage;
  let fixture: ComponentFixture<MapperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapperPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
