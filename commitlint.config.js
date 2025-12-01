export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'chore', 'refactor', 'test', 'style'],
    ],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
};
