import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  selectedModel: string = '';
  selectedColor: string = '';
  imageUrl: string = '';
  selectedConfigDesc: string = '';
  selectedConfigRangeSpeed: string = '';
  selectedConfigPrice: string = '';
  selectedColorPrice: string = '';
  selectedConfigTowHitch: string = '';
  selectedConfigYoke: string = '';
  selectedColorDesc: string = '';
  selectedColorCodeDesc: string = '';
  constructor(private service: AppService, private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    this.service.selectedModel$.subscribe(model => {
      if (model)
        this.selectedModel = model;
    });

    this.service.selectedColor$.subscribe(color => {
      if (color)
        this.selectedColor = color;
    });

    this.service.selectedImageUrl$.subscribe(url => {
      this.imageUrl = url;
    });

    this.service.selectedConfigDesc$.subscribe(selectedConfigDesc => {
      this.selectedConfigDesc = selectedConfigDesc;
    });

    this.service.selectedConfigRangeSpeedPrice$.subscribe(selectedConfigRangeSpeedPrice => {
      const arrayOfStrings = selectedConfigRangeSpeedPrice.split('-');
      if (arrayOfStrings.length == 3) {
        this.selectedConfigRangeSpeed = arrayOfStrings[0] + ' - ' + arrayOfStrings[1]
        this.selectedConfigPrice = arrayOfStrings[2].replace("Cost: ", "");
      }
    });

    this.service.selectedColorPrice$.subscribe(selectedColorPrice => {
      this.selectedColorPrice = selectedColorPrice;
    });

    this.service.selectedConfigTowHitch$.subscribe(selectedConfigTowHitch => {
      this.selectedConfigTowHitch = selectedConfigTowHitch;
    });

    this.service.selectedConfigYoke$.subscribe(selectedConfigYoke => {
      this.selectedConfigYoke = selectedConfigYoke;
    });

    this.service.selectedColorDesc$.subscribe(selectedColorDesc => {
      this.selectedColorDesc = selectedColorDesc;
    });

    this.service.selectedColorCodeDesc$.subscribe(selectedColorCodeDesc => {
      this.selectedColorCodeDesc = selectedColorCodeDesc;
    });
  }

  get formattedCost() {
    let totalCost = parseFloat(this.selectedConfigPrice.replace(/[^\d.-]/g, '')) + parseFloat(this.selectedColorPrice.replace(/[^\d.-]/g, ''));
    if (this.selectedConfigTowHitch == "Yes") {
      totalCost = totalCost + 1000;
    }
    if (this.selectedConfigYoke == "Yes") {
      totalCost = totalCost + 1000;
    }
    return this.currencyPipe.transform(totalCost, 'USD');
  }
}
