import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e3f2fd',
      // Додайте інші відтінки та значення кольорів за необхідності
    },
    // Додайте інші кольори, шрифти та інші властивості теми тут
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
    // Додайте інші шрифти за необхідності
  },
  // Додайте інші налаштування теми тут
});

export default theme;