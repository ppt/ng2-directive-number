import { Component, forwardRef, Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {NumberInputComponent} from './number-input.component';

const CUSTOM_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberInputAccessor),
    multi: true
};

@Directive({
  selector: 'number-input',
  host: {'(inputChange)': 'onChange($event)'},
  providers: [CUSTOM_VALUE_ACCESSOR]
})

export class NumberInputAccessor implements ControlValueAccessor {
  onChange = (_) => {};
  onTouched = () => {};

  constructor(private host: NumberInputComponent) { }

  writeValue(value: any): void {
    this.host.value(value);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

}