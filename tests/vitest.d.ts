import { type TestingLibraryMatchers } from '@testing-library/jest-dom/matchers.js';

declare module 'vitest' {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type Assertion<T = any> = TestingLibraryMatchers<T, void>;
  type AsymmetricMatchersContaining = TestingLibraryMatchers<T, void>;
}
