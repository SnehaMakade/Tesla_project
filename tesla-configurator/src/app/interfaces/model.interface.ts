export type ModelCode = 'S' | 'X' | 'C' | '3' | 'Y';
export type ColorCode = 'white' | 'black' | 'blue' | 'grey' | 'red';

export interface ColorInterface {
  code: ColorCode;
  description: string;
  price: number;
}

export interface ModelInterface {
  code: ModelCode;
  description: string;
  colors: ColorInterface[];
}

export interface ConfigInterface {
  id: number;
  description: string;
  range: string;
  speed: number;
  price: number;
}

export interface OptionsInterface {
  configs: ConfigInterface[];
  towHitch: boolean;
  yoke: boolean;
}

export interface ColorArrayInterface {
  code: string;
  colors: ColorInterface[];
}
