import { createAction, props } from "@ngrx/store";

export const changeInputValue = createAction(
  '[INPUT] Change value',
  props<{newValue: number}>(),
)

export const setInputValueIsDisabled = createAction(
  '[INPUT] Set is disabled',
  props<{inputValueIsDisabled: boolean}>(),
)