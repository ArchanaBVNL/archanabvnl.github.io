import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AlertsSportsComponent } from './alerts-sports.component'

describe('AlertsSportsComponent', () => {
  let component: AlertsSportsComponent
  let fixture: ComponentFixture<AlertsSportsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertsSportsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsSportsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
