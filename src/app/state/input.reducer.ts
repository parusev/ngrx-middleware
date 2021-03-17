import { createReducer, on } from "@ngrx/store";
import { changeInputValue, setInputValueIsDisabled } from './input.actions';
import { InputState } from './app.state';

const initialState = {
  inputValue: 0,
  inputValueIsDisabled: false
};

export const inputReducer = createReducer<InputState>(
  initialState,
  on(changeInputValue, (state, {newValue}) => {
    return {
      ...state,
      inputValue: newValue
    };
  }),
  on(setInputValueIsDisabled, (state, {inputValueIsDisabled}) => {
    return {
      ...state,
      inputValueIsDisabled
    }
  })
)