# Kinda-ok JSON viewer

My own JSON viewer! It's gonna be kinda ok someday.

`npm start` / `npm test` / `npm run build`

There is probably a deployed version available at https://suspicious.website/ok

## Filter Syntax

Filter syntax will be important. For now, the following magic is available.

```
| Syntax    | Definition                                         |
| ----------|----------------------------------------------------|
| <string>  | Searchword to look for. Uses smartcase by default. |
| \c        | force ignore case                                  |
| \C        | force match case                                   |
```

## Todo

```
[ ] Show siblings for filtered objects/arrays
[ ] Support array/string/etc for root
[ ] Support for more magic in the filter
[ ] Pick keys
[ ] Different view modes for filter (split / merge / hidden / closed)
[ ] Filter with path syntax
[ ] Open/close nodes logic (depth/all/etc)
[ ] Copy value / part of the tree to clipboard
[ ] Make it fast
[ ] Sell the product to BigCorp (for 1.000.000 euros or more)
[ ] Retire in Southern France
```
