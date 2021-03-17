import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState, InputState } from './app.state';


export const selectInputState = createFeatureSelector<AppState, InputState>('input');

export const selectInputValue = createSelector(
  selectInputState,
  state => state.inputValue,
)

export const selectInputValueIsDisabled = createSelector(
  selectInputState,
  state => state.inputValueIsDisabled
)