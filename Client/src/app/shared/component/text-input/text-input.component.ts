import { Component, OnInit, Self, ViewChild, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit,ControlValueAccessor {
  @ViewChild('input' , {static:true}) input:ElementRef
  @Input() type = 'text'
  @Input() label:string
  constructor(@Self() public controlDir:NgControl) { 
    this.controlDir.valueAccessor = this;
  }

  
  ngOnInit(): void {
    const control = this.controlDir.control
    const validators = control?.validator?[control.validator]:[]
    const asyncValidators = control?.asyncValidator? [control.asyncValidator] : []

    control?.setValidators(validators)
    control?.setAsyncValidators(asyncValidators)
    control?.updateValueAndValidity()
  }

  onChanged(event:any){
  }

  onTouched(){
  }

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
