import {createStitches} from "@stitches/react";

export const { 
  config,
  styled,
  globalCss,
  css,
  keyframes,
  getCssText,
  theme,
  createTheme
} = createStitches({
  theme: {
    colors: {
      white: '#FFF',
      yellow300: '#F6E05E',
      yellow500: '#F3E02E',
      red300: '#E53E3E',
      red500: '#E52E2f',
      gray900: '#121214',
      gray800: '#202024',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',
      gray50: '#f5f5f5',

      green500: '#00875f',
      green300: '#00b37e',
    }
  }
})