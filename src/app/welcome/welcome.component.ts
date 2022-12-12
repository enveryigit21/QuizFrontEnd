import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

 @ViewChild('name') nameKey ! : ElementRef

  ngOnInit(): void {

  }

  startQuiz() {
    localStorage.setItem('name',this.nameKey.nativeElement.value)
  }



}
