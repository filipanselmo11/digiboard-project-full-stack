import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.css'
})
export class FormLayoutComponent {
  @Input() titulo!: string;
}
