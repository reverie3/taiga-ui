import type {Signal, WritableSignal} from '@angular/core';
import {effect, signal} from '@angular/core';

import {tuiInjectElement} from './inject-element';

export function tuiValueBinding(value?: WritableSignal<string>): WritableSignal<string>;
export function tuiValueBinding(value?: Signal<string>): Signal<string>;

/**
 * Host binding `host: {'[value]': 'yourSignal()'}` is not an option for our textfields –
 * they use {@link TuiTextfieldDirective} as a host directive.
 * `TuiTextfieldDirective` has host binding which depends on native input's value.
 * Host bindings of the host directives are re-calculated BEFORE component's ones –
 * native input's value should be updated SYNCHRONOUSLY before next change detection iteration.
 */
export function tuiValueBinding(
    value: Signal<string> = signal(tuiInjectElement<HTMLInputElement>().value || ''),
): Signal<string> {
    const el = tuiInjectElement<HTMLInputElement>();

    effect(() => {
        el.value = value();
    });

    return value;
}
