import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'cashier';
  BrowserWindow:any;
 
  print(){
    
    window.ipcRenderer.send('close');
  }
}
