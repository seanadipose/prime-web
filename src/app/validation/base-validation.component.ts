import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ValidationComponent, staticImplements } from './validation-component.interface';

/**
 * An abstract class which all prime validation components should extend from.
 *
 * If you only need a simple regex test, just overwrite `regex` prop. Otherwise,
 * overwrite the validation function in your subclass.
 *
 * Subclasses should also copy the staticImplements decorator as such:
 * `@staticImplements<ValidationComponent>()`
 *
 * Extended classes must have a template showing the validation error, e.g.
 *```
 *  <div role="alert" aria-live="assertive">
 *    <div class="text-danger">{{fieldName} is required</div>
 *  </div>
 * ```
 */
@staticImplements<ValidationComponent>()
export abstract class BaseValidationComponent {
  @Input() public fieldName: string;
  static regex: RegExp;

  public static validate(input: ElementRef): boolean {
    const inputVal = input.nativeElement.value
    if (inputVal == null || inputVal.length < 1) {
      return true;
    }
    return this.regex.test(inputVal);
  }
}
