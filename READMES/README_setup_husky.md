# Setup husky
- pnpm i
- git init 
- pnpm prepare
> This creates .husky/_/* including .husky/_/*commit-msg
- Create an extra commit-msg file at the root of .husky
**.husky/commit-msg**
```
pnpm commitlint --edit $1
```
- git add .
- git commit -m"my message"
- EXPECT warning message

