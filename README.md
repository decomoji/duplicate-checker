# decomoji-duplicate-checker

デコモジ DB からダウンロードした CSV とデコモジ本体の全体リストを突合し、重複があるかないかをチェックするスクリプト。

```
npm ci
node main.js[ <path-to-csv>[ <path-to-exists-json>]]
```

| label               | example                           | default                                       |
| :------------------ | :-------------------------------- | :-------------------------------------------- |
| path-to-csv         | `~/Downloads/my-collection.csv`   | `./src/candidate.csv`                         |
| path-to-exists-json | `~/Downloads/his-collection.json` | `./node_modules/decomoji/configs/v5_all.json` |

## ライセンス

Copyright (c) oti. Under the [MIT License](LICENSE).
