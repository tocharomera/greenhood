import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors, Validators } from "@angular/forms";
import { Directive, OnChanges, SimpleChanges, Input, forwardRef, Attribute } from "@angular/core";

export function NIFValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
      const err = { invalidNif: true };
      if (!control.value) { return null; }
      if (/^\d{1,8}\w$/.test(control.value)) {
          const letterValue = control.value.substr(control.value.length - 1);
          const numberValue = control.value.substr(0, control.value.length - 1);
          return letterValue.toUpperCase() === 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numberValue % 23)
              ? null : err;
      } else { return err; }
  };
}

@Directive({
  selector: '[val-nif][formControlName],[val-nif][formControl],[val-nif][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NIFValidatorDirective, multi: true }]
})
export class NIFValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } {
      if (control.value) {
          return NIFValidator()(control);
      }
      return null;
  }
}

@Directive({
  selector: '[upperCase]',
  providers: [{provide: NG_VALIDATORS, useExisting: UpperCaseValidatorDirective, multi: true}]
})
export class UpperCaseValidatorDirective implements Validator {
  validate(control: AbstractControl): {[key: string]: any} {
    const valor = control.value;
    if (valor) {
      return valor !== valor.toUpperCase() ? {'upperCase': {valor}} : null;
    } else {
      return null;
    }
  }
}

@Directive({
  selector: '[val-equal]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective), multi: true }]
})
export class EqualValidatorDirective implements Validator {
  constructor( @Attribute('val-equal') public validateEqual: string) { }
  validate(control: AbstractControl): { [key: string]: any } {
      let valor = control.value;
      let cntrlBind = control.root.get(this.validateEqual);

      if (valor) {
          return (!cntrlBind || valor !== cntrlBind.value) ? { 'validateEqual': `${valor} <> ${cntrlBind.value}` } : null;
      }
      return null;
  }
}

export const MIN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidator),
  multi: true
};

@Directive({
  selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [MIN_VALIDATOR],
  host: {'[attr.min]': 'min ? min : null'}
})
export class MinValidator implements Validator,
    OnChanges {
  private _validator: ValidatorFn;
  private _onChange: () => void;

  @Input() min: string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('min' in changes) {
      this._createValidator();
      if (this._onChange) { this._onChange(); }
    }
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return this.min == null ? null : this._validator(c);
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = Validators.min(parseInt(this.min, 10));
  }
}

export const MAX_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidator),
  multi: true
};

@Directive({
  selector: '[max][formControlName],[max][formControl],[max][ngModel]',
  providers: [MAX_VALIDATOR],
  host: {'[attr.max]': 'max ? max : null'}
})
export class MaxValidator implements Validator,
    OnChanges {
  private _validator: ValidatorFn;
  private _onChange: () => void;

  @Input() max: string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('max' in changes) {
      this._createValidator();
      if (this._onChange) { this._onChange(); }
    }
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return this.max == null ? null : this._validator(c);
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = Validators.max(parseInt(this.max, 10));
  }
}

export const VALIDACIONES_DIRECTIVAS = [UpperCaseValidatorDirective, NIFValidatorDirective,
  EqualValidatorDirective, MinValidator, MaxValidator];
