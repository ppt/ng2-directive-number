import { Component, Input, Output, EventEmitter, forwardRef  } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberInputComponent),
    multi: true
};

@Component({
  selector: 'number-input',
  template: '<input pzComma type="text" class="w3-input w3-border-0 pz-input" [(ngModel)]="value" [readonly]="readOnly" (blur)="updateData($event)">',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class NumberInputComponent implements ControlValueAccessor{
  formattedNumber: string;
  readOnly: boolean = false;

  // private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.formattedNumber;
  };

  set value(v: any) {
    if (v !== this.formattedNumber) {
      this.formattedNumber = v;
      this.onChangeCallback(this.formattedNumber);
    }
  }

  writeValue(value: any) {
    if (value !== this.formattedNumber) {
      this.formattedNumber = this.comma(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  //------

  @Output()
  inputChange = new EventEmitter<number>();

  @Input()
  set num(value: number) {
    this.formattedNumber = this.comma(value);
  }

  @Input()
  set rdOnly(value) {
    this.readOnly = value ? true : false;
  }

  

  //------------------------------------------------------------------------
  // Method: updateData - Emit input change event when the input is blurred
  //------------------------------------------------------------------------
  updateData(event) {
    let value = event.target.value.replace(/,/g, '');
    this.inputChange.emit(parseInt(value));
  }

  //------------------------------------------
  // Method: comma - Format number with comma
  //------------------------------------------
  comma(value: number | string, fractionSize: number = 2): string {
    let [ integer, fraction = '' ] = (value || '').toString().split('.');

    fraction = fractionSize > 0 ? '.' + (fraction + '000000').substring(0, fractionSize) : '';
    integer = integer.replace(/\b0+(?=\d)/, '');
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return integer + fraction;
  }  
}