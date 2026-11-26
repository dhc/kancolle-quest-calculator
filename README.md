# 艦これ 定期任務 収支計算器

今月から12か月間の定期任務の獲得・直接消費・純収支を見積もるブラウザアプリです。[公開ページ](https://dhc.github.io/kancolle-quest-calculator/) または index.html を直接開いて使用できます。

## 使い方
- 任務をONにし、実施頻度・実施月・選択報酬を設定します。全任務の初期状態はOFFです。
- デイリーは週0～7日（代表曜日）、ウィークリーは毎週または月あたりの週数、マンスリーは毎月、クォータリーは期内の月、イヤーリーは開始月を基準に実施月を指定します。
- 周期・分類・検索で絞り込み、まとめてチェックできます。登録された前提任務はAND条件で、前提OFF時は後続もOFFになります。
- 主要資材カードと詳細集計で獲得・消費・純収支を確認できます。条件比較は純収支の差です。
- 比較条件は同一タブ内に最大8件一時保存できます。JSONで任務・設定のバックアップも可能です。

## マスター
2026-11-26版。公開データ2系統でゲームIDとWikiコードが一致した143件（D24/W20/M14/Q28/Y57）を収録。日付限定デイリー2件（Bd4/Bd6）は出現日数×実施割合（25/50/75/100%、初期100%）で期待値を計算します。OFFなら0。通常デイリーの曜日・一括設定・頻度連動から除外し、前提のON/OFFは維持します。端数は保持します。

正本は data/quests.json。ゲーム内の数値IDを文字列として使用し、wikiIdは表示・検索に利用します。
- rewards / choiceGroups: 固定・選択報酬
- costs: 直接消費（資源、資材、転換・供出装備等）
- discard: 廃棄
- requirements: 非消費の所持条件
- prerequisites: 計算に用いる定期任務の前提ID
- untrackedPrerequisites: 計算外の前提
- costStatus / rewardStatus / prerequisiteStatus: 確認状況。前提は網羅検証未完了。

マスターはHTMLに埋め込まれます。編集後は node scripts/sync-master.cjs を実行し、node scripts/sync-master.cjs --check と node --test tests/master.test.cjs で検査してください。

## 保存形式
マスターとユーザー設定は分離され、通常保存ではON/OFF、頻度、選択報酬、前提編集等の設定差分、手動追加任務、明示的なマスター編集差分のみ保持します。比較条件はマスター版が変わると初期化されます。旧試作版の独自ID・保存形式とは互換性がなく初期化されます。

## 計算の限界
純収支＝獲得－直接消費－廃棄。開発・建造・改修のレシピ費用、出撃等の変動費用、廃棄時の資源回収、複数任務での廃棄共用は対象外です。任意装備カテゴリは特定装備と相殺しません。所持条件は消費に加えません。任務出現フラグや実行順序を厳密に再現するものではなく、前提任務の周期内実施を近似します。全報酬・前提関係の独立した照合は未完了です。

## 資料
- [艦これ攻略Wiki・任務](https://wikiwiki.jp/kancolle/任務)
- [kcanotify-gamedata](https://github.com/antest1/kcanotify-gamedata)（任務データ版2026111401）
- [KC3Kai/kc3-translations](https://github.com/KC3Kai/kc3-translations)（ID・コード照合）
- 上流のMITライセンスは data/THIRD-PARTY-LICENSES.txt に収録。
