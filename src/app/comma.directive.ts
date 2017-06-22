import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

const padding = '000000';

@Directive({ selector: '[pzComma]' })
export class CommaDirective implements OnInit {
  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;
  private elem: HTMLInputElement;

  //----------------------------------------------
  // Listener: onFocus - Undo the comma formatter
  //----------------------------------------------
  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    this.elem.value = this.unformatValue(value);
  }

  //---------------------------------------------------------
  // Listener: onBlur - Transform value with comma formatter
  //---------------------------------------------------------
  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    this.elem.value = this.formatValue(value);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    let decPoint = this.elem.value.indexOf('.') > -1;
    return (event.ctrlKey || event.altKey 
      || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false)
      || (event.keyCode==110 && !decPoint)
      || (event.keyCode==190 && event.shiftKey==false && !decPoint)
      || (95<event.keyCode && event.keyCode<106)
      || (event.keyCode==8) || (event.keyCode==9) 
      || (event.keyCode>34 && event.keyCode<40) 
      || (event.keyCode==46))
  }

  //-------------------
  // Class constructor
  //-------------------
  constructor(private elementRef: ElementRef) {
    this.elem = this.elementRef.nativeElement;
    this.DECIMAL_SEPARATOR = '.';
    this.THOUSANDS_SEPARATOR = ',';
  }

  //-------------------------------------
  // Method: ngOnInit - Initialize class
  //-------------------------------------
  ngOnInit() {
    this.elem.value = this.formatValue(this.elem.value);
  }

  //-----------------------------------------------
  // Method: formatValue - Format value with comma
  //-----------------------------------------------
  formatValue(value: number | string, fractionSize: number = 2): string {
    let [ integer, fraction = '' ] = (value || '').toString().split(this.DECIMAL_SEPARATOR);

    fraction = fractionSize > 0 ? this.DECIMAL_SEPARATOR + (fraction + padding).substring(0, fractionSize) : '';
    integer = integer.replace(/\b0+(?=\d)/, '');
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
    return integer + fraction;
  }

  //-------------------------------------------------
  // Method: unformatValue - Reverse formatted value
  //-------------------------------------------------
  unformatValue(value: string, fractionSize: number = 2): string {
    let [ integer, fraction = '' ] = (value || '').split(this.DECIMAL_SEPARATOR);

    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, 'g'), '');
    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0 ? this.DECIMAL_SEPARATOR + (fraction + padding).substring(0, fractionSize) : '';
    return integer + fraction;
  }

}