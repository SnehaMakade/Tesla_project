import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModelInterface, OptionsInterface } from './interfaces/model.interface';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private readonly url: string = '/models';
  private readonly configUrl: string = '/options'
  private readonly imageUrl: string = 'https://interstate21.com/tesla-app/images';

  constructor(private http: HttpClient) { }


  public getModels(): Observable<ModelInterface[]> {
    return this.http.get<ModelInterface[]>(`${this.url}`)
  }

  public getModelConfigs(modelCode: string): Observable<OptionsInterface> {
    return this.http.get<OptionsInterface>(`${this.configUrl}/${modelCode}`)
  }

  private selectedModel = new BehaviorSubject<string>('');
  private selectedColor = new BehaviorSubject<string>('');
  private selectedImageUrl = new BehaviorSubject<string>('');
  private selectedConfigId = new BehaviorSubject<number>(0);

  selectedModel$ = this.selectedModel.asObservable();
  selectedColor$ = this.selectedColor.asObservable();
  selectedImageUrl$ = this.selectedImageUrl.asObservable();
  selectedConfigId$ = this.selectedConfigId.asObservable();

  setSelectedModel(model: string) {
    this.selectedModel.next(model);
  }

  setSelectedColor(color: string) {
    this.selectedColor.next(color);
  }

  setImageUrl(modelCode: string, colorCode: string) {
    let generatedImageUrl: string = `${this.imageUrl}/${modelCode}/${colorCode}.jpg`;
    this.selectedImageUrl.next(generatedImageUrl);
  }
  setSelectedConfigId(configId: number) {
    this.selectedConfigId.next(configId);
  }

  getSelectedImageUrl(): string {
    return this.selectedImageUrl.value;
  }

  // //For Summary
  private selectedConfigDesc = new BehaviorSubject<string>('');
  private selectedConfigRangeSpeedPrice = new BehaviorSubject<string>('');
  private selectedColorPrice = new BehaviorSubject<string>('');
  private selectedConfigTowHitch = new BehaviorSubject<string>('');
  private selectedConfigYoke = new BehaviorSubject<string>('');
  private selectedColorDesc = new BehaviorSubject<string>('');
  private selectedColorCodeDesc = new BehaviorSubject<string>('');

  selectedConfigDesc$ = this.selectedConfigDesc.asObservable();
  selectedConfigRangeSpeedPrice$ = this.selectedConfigRangeSpeedPrice.asObservable();
  selectedColorPrice$ = this.selectedColorPrice.asObservable();
  selectedConfigTowHitch$ = this.selectedConfigTowHitch.asObservable();
  selectedConfigYoke$ = this.selectedConfigYoke.asObservable();
  selectedColorDesc$ = this.selectedColorDesc.asObservable();
  selectedColorCodeDesc$ = this.selectedColorCodeDesc.asObservable();

  setSelectedConfigDesc(selectedConfigDesc: string) {
    this.selectedConfigDesc.next(selectedConfigDesc);
  }

  setSelectedConfigRangeSpeedPrice(selectedConfigRangeSpeedPrice: string) {
    this.selectedConfigRangeSpeedPrice.next(selectedConfigRangeSpeedPrice);
  }

  setSelectedColorPrice(selectedColorPrice: string) {
    this.selectedColorPrice.next(selectedColorPrice);
  }

  setSelectedConfigTowHitch(selectedConfigTowHitch: string) {
    this.selectedConfigTowHitch.next(selectedConfigTowHitch);
  }

  setSelectedConfigYoke(selectedConfigYoke: string) {
    this.selectedConfigYoke.next(selectedConfigYoke);
  }

  setSelectedColorDesc(selectedColorDesc: string) {
    this.selectedColorDesc.next(selectedColorDesc);
  }

  setSelectedColorCodeDesc(selectedColorCodeDesc: string) {
    this.selectedColorCodeDesc.next(selectedColorCodeDesc);
  }

  //Summary End

}

