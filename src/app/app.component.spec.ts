import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from '../utility/HttpHeaderInterceptor';
import { UserService } from './user.service';
import { of } from "rxjs";

describe('AppComponent', () => {
  let usersvc:UserService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        UserService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpHeaderInterceptor,
          multi: true,
        }
      ]
    }).compileComponents();
  }));

  it('should create AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-test');
  });

  it('should render No data found if search list is empty', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isSearchClicked=true;    
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('No data found');
  });

  it('should render user search list if users exist', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.userList=[{name:"test user1"},{name:"test user2"}];    
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').textContent).toContain('The following Search Result are');
  });

  it('should userlist lenght greater than zero', () => {
    const component = TestBed.createComponent(AppComponent).componentInstance;
    usersvc = TestBed.get(UserService);
    const userList=[{name:"test user1"},{name:"test user2"}]; 
    spyOn(usersvc, 'getUsers').and.returnValue(of(userList));
    component.searchUser();
    const userCount=component.userList.length;;
    expect(component.userList.length).toBeGreaterThan(0);
  });

});
