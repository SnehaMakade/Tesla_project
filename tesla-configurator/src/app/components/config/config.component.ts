import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EMPTY, concatMap } from 'rxjs';
import { AppService } from '../../app.service';
import { ConfigInterface, OptionsInterface } from '../../interfaces/model.interface';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
  heading: string = "Step 2: Select your Config and options";
  configForm: FormGroup;
  imageUrl: string = '';
  selectedModel: string = '';
  selectedColor: string = '';
  options: OptionsInterface | undefined;
  configArray: ConfigInterface[] = [];
  configDetails: ConfigInterface[] = [];
  detailsView: string = ""

  constructor(private service: AppService, private currencyPipe: CurrencyPipe) {
    this.configForm = new FormGroup({
      configSelect: new FormControl(''),
      includeTow: new FormControl(''),
      includeYoke: new FormControl(''),
    });
  }

  ngOnInit() {

    this.service.selectedModel$.pipe(
      concatMap(model => {
        if (model !== null) {
          this.selectedModel = model;
          return this.service.getModelConfigs(model);
        } else {
          // Handle the null case 
          return EMPTY;
        }
      })
    ).subscribe(data => {
      this.options = data;
      this.options.configs.forEach((item) => {
        this.configArray.push(item);
      });
    });


    // Subscribe to selectedConfigId changes and set default value
    this.service.selectedConfigId$.subscribe(configId => {
      if (configId) {
        this.configForm.get('configSelect')?.setValue(configId);
      }
    });

    // Subscribe to selectedConfigTowHitch changes and set default value
    this.service.selectedConfigTowHitch$.subscribe(value => {
      if (value) {
        this.configForm.get('includeTow')?.setValue(value == "Yes" ? true : false);
      }
    });

    //Subscribe to selectedConfigYoke changes and set default value
    this.service.selectedConfigYoke$.subscribe(value => {
      if (value) {
        this.configForm.get('includeYoke')?.setValue(value == "Yes" ? true : false);
      }
    });

    //Subscribe to selectedConfigYoke changes and set default value
    this.service.selectedConfigRangeSpeedPrice$.subscribe(value => {
      if (value) {
        this.detailsView = value;
      }
    });

    this.service.selectedColor$.subscribe(color => {
      if (color)
        this.selectedColor = color;
    });

    this.service.selectedImageUrl$.subscribe(url => {
      this.imageUrl = url;
    });
  }

  onSelect(event: Event): void {
    let configId = +(event.target as HTMLSelectElement).value;
    this.configDetails = this.configArray.filter(m => m.id == configId)
    this.service.setSelectedConfigId(configId);
    if (this.configDetails.length > 0) {
      this.detailsView = `Range: ${this.configDetails[0].range} miles - Max Speed: ${this.configDetails[0].speed} - Cost: ${this.currencyPipe.transform(this.configDetails[0].price, 'USD') ?? '0'}`
      this.service.setSelectedConfigRangeSpeedPrice(this.detailsView);
      this.service.setSelectedConfigDesc(`${this.configDetails[0].description}`);
    }
    this.service.setSelectedConfigTowHitch("No");
    this.service.setSelectedConfigYoke("No");
  }

  onTowhitchChange(event: Event): void {
    this.service.setSelectedConfigTowHitch((event.target as HTMLInputElement).checked ? "Yes" : "No");
  }

  onYokeChange(event: Event): void {
    this.service.setSelectedConfigYoke((event.target as HTMLInputElement).checked ? "Yes" : "No");
  }
}
