import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../app.service';
import { ColorArrayInterface, ColorInterface, ModelInterface } from '../../interfaces/model.interface';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss'
})

export class ModelComponent {
  carForm: FormGroup;
  models: ModelInterface[] = [];
  colors: ColorInterface[] = [];
  colorArray: ColorArrayInterface | null = null;
  colorvalue: string = '';
  carModelCode: string = '';
  imageUrl: string = '';

  constructor(private service: AppService, private currencyPipe: CurrencyPipe) {
    this.carForm = new FormGroup({
      modelSelect: new FormControl(''),
      colorSelect: new FormControl('')
    });

  }

  ngOnInit(): void {
    this.service.getModels().subscribe(data => {
      this.models = data;
    });

    // Subscribe to selectedModel changes and set default value
    this.service.selectedModel$.subscribe(selectedModel => {
      if (selectedModel) {
        this.carForm.get('modelSelect')?.setValue(selectedModel);
        // Set colors dropdown when model is selected
        this.getModelColors(selectedModel);
      }
    });

    // this.service.selectedColor$.subscribe(selectedColor => {
    //   if (selectedColor) {
    //     this.carForm.get('colorSelect')?.setValue(selectedColor);
    //   }
    // });

    this.service.selectedImageUrl$.subscribe(url => {
      this.imageUrl = url;
    });

  }

  public getModelColors(modelCode: string) {
    const model = (this.models as ModelInterface[]).find(m => m.code === modelCode);
    if (model) {
      this.colorArray = {
        code: model.code,
        colors: model.colors
      };
      this.colors = model.colors;
    } else {
      this.colorArray = null;
      this.colors = [];
    }
  }

  onSelect(event: Event): void {

    this.carModelCode = (event.target as HTMLSelectElement).value;
    this.getModelColors(this.carModelCode)
    let defaultId = this.colors[0].code;
    this.carForm.get('colorSelect')?.enable();
    this.carForm.get('colorSelect')?.setValue(defaultId);
    const selectedIndex = (event.target as HTMLSelectElement).selectedIndex;
    this.service.setSelectedColorCodeDesc(this.models[selectedIndex - 1].description);
    this.service.setSelectedColor(defaultId);
    this.service.setSelectedColorPrice((this.currencyPipe.transform(this.colors[0].price, 'USD') ?? '0'));
    this.service.setImageUrl(this.carModelCode, defaultId);
    this.imageUrl = this.service.getSelectedImageUrl();
    this.setValuesOnModelSelect();

  }

  setValuesOnModelSelect() {
    this.service.setSelectedModel(this.carModelCode);
    this.service.setSelectedColorDesc(this.colors[0].description);
    //To set to default
    this.service.setSelectedConfigId(0);
    this.service.setSelectedConfigRangeSpeedPrice('');
    this.service.setSelectedConfigTowHitch("No");
    this.service.setSelectedConfigYoke("No");
  }

  onSelectColor(event: Event): void {
    this.colorvalue = (event.target as HTMLSelectElement).value;
    this.service.setSelectedColor(this.colorvalue);
    const selectedIndex = (event.target as HTMLSelectElement).selectedIndex;
    this.service.setSelectedColorDesc(this.colors[selectedIndex].description);
    this.service.setImageUrl(this.carModelCode, this.colorvalue);
    this.imageUrl = this.service.getSelectedImageUrl();
    let colorPrice = (this.colors as ColorInterface[]).find(m => m.code === this.colorvalue);
    if (colorPrice)
      this.service.setSelectedColorPrice(this.currencyPipe.transform(colorPrice.price, 'USD') ?? '0')

  }

}
