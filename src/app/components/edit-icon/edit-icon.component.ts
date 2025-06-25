import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-icon.component.html',
  styleUrl: './edit-icon.component.css'
})
export class EditIconComponent {


  @Input()
  color : string = "#FFF";
}
