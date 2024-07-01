import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() id!: number;
  @Input() code!: string;
  @Input() enterDate!: string;
  @Input() validateDate!: string;
  @Input() description!: string;
}
