<p align="center">
  <a href="https://appllama.io">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./docs/images/appllama-logo-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="./docs/images/appllama-logo-light.png">
      <img src="./docs/images/appllama-logo-light.png" width="270" alt="Appllama">
    </picture>
  </a>
</p>

<p align="center">
  <a href="./README.md">English</a> · <strong>日本語</strong>
</p>

<h1 align="center">SwiftUI版 Top Welcome Screens</h1>

<p align="center">
  スプラッシュ、ローディング、ウェルカム、オンボーディングを題材にした10種類のiOS UIを、完全にSwiftUIで実装しています。
</p>

<p align="center">
  <img alt="Swift 6" src="https://img.shields.io/badge/Swift-6-F05138?logo=swift&logoColor=white">
  <img alt="SwiftUI" src="https://img.shields.io/badge/UI-SwiftUI-0A84FF">
  <img alt="iOS 16.4以上" src="https://img.shields.io/badge/iOS-16.4%2B-111111?logo=apple">
  <a href="./LICENSE"><img alt="GPL-3.0 License" src="https://img.shields.io/badge/Code-GPL--3.0-F2C94C"></a>
</p>

![Duolingo、Strava、MyFitnessPal、Perplexity、Yazioを参考にしたネイティブSwiftUIウェルカム画面](./docs/images/welcome-screens-showcase-01.png)

![onX Hunt、Speak and Learn、Hallow、SCRL、Speak Languageを参考にしたネイティブSwiftUIウェルカム画面](./docs/images/welcome-screens-showcase-02.png)

> [!IMPORTANT]
> **教育・研究目的の参考実装です。** この独立したプロジェクトは、参照先の企業との提携や承認を受けたものではありません。これらの画面を変更せずに製品へ組み込まないでください。一般公開または商用利用の前に、第三者の名称、ロゴ、マスコット、文言、画像、ブランドカラーを、使用許諾を得た独自素材へすべて置き換えてください。詳しくは[NOTICE.md](./NOTICE.md)と[アセットの出典情報](./docs/ASSET_PROVENANCE.md)を参照してください。

## 完全ネイティブ設計

このリポジトリには、React Nativeランタイム、Expo Router、JavaScriptブリッジ、Reanimated、CocoaPods、サードパーティ製Swift Packageのいずれも含まれていません。レイアウト、タイミング、イージング、マスク、操作の有効化、視差効果を減らす設定、画像、フォントは、すべてSwiftUIとApple純正フレームワークで処理します。

解析したレイアウト値とモーションのキーフレームを読みやすい状態で保持するため、基準となる640×1385の座標空間を維持しています。`ReferenceCanvas`が現在のiPhone画面へ座標空間を均等に拡大・縮小し、`MotionTimeline`が各画面へ決定的な経過時間をミリ秒単位で渡します。

## 動作要件

- Xcode 26.4以降
- 使用するXcodeに対応したiOS Simulatorランタイム
- Deployment Target: iOS 16.4以上

## ギャラリーを実行する

[WelcomeScreenGallery.xcodeproj](./WelcomeScreenGallery.xcodeproj)を開き、共有スキーム`WelcomeScreenGallery`を実行してください。

コマンドラインからビルドする場合:

```bash
xcodebuild \
  -project WelcomeScreenGallery.xcodeproj \
  -scheme WelcomeScreenGallery \
  -destination 'generic/platform=iOS Simulator' \
  CODE_SIGNING_ALLOWED=NO \
  build
```

利用可能なSimulatorでテストを実行する場合:

```bash
xcodebuild \
  -project WelcomeScreenGallery.xcodeproj \
  -scheme WelcomeScreenGallery \
  -destination 'platform=iOS Simulator,name=iPhone 16 Pro' \
  CODE_SIGNING_ALLOWED=NO \
  test
```

利用可能な実行先がないとXcodeに表示された場合は、Xcode Settings → Componentsから対応するランタイムをインストールするか、インストール済みランタイムとSDKが一致するXcodeを選択してください。

## 表示する画面を選ぶ

ギャラリーは、再現性のある起動引数に対応しています。Scheme → Run → Argumentsへ追加するか、`simctl launch`で渡してください。

| 引数 | 値 | 説明 |
| --- | --- | --- |
| `-welcome-screen` | 下表の画面ID | 表示する画面を選択 |
| `-welcome-motion` | `1`または`0` | アニメーションを再生するか、正確な最終状態を表示 |
| `-welcome-replay` | 任意の整数 | 値を変更するとタイムラインを再開 |

例:

```bash
xcrun simctl launch booted dev.appllama.welcomescreens \
  -welcome-screen scrl \
  -welcome-motion 1 \
  -welcome-replay 1
```

アプリの実行中は、同じ状態をURLから変更できます。

```bash
xcrun simctl openurl booted 'welcome-showcase://speak-learn?motion=1&replay=1'
```

## 10種類の画面

| 参考画面 | 画面ID | ネイティブView | 再生時間 |
| --- | --- | --- | ---: |
| Duolingo | `duolingo` | [`DuolingoWelcome`](./WelcomeScreenGallery/Features/Screens/DuolingoWelcome.swift) | 2.667秒 |
| Strava | `strava` | [`StravaWelcome`](./WelcomeScreenGallery/Features/Screens/StravaWelcome.swift) | 6.600秒 |
| MyFitnessPal | `myfitnesspal` | [`MyFitnessPalWelcome`](./WelcomeScreenGallery/Features/Screens/MyFitnessPalWelcome.swift) | 8.867秒 |
| Perplexity | `perplexity` | [`PerplexityWelcome`](./WelcomeScreenGallery/Features/Screens/PerplexityWelcome.swift) | 静止画のみ |
| Yazio | `yazio` | [`YazioWelcome`](./WelcomeScreenGallery/Features/Screens/YazioWelcome.swift) | 1.733秒 |
| onX Hunt | `onx-hunt` | [`OnxHuntWelcome`](./WelcomeScreenGallery/Features/Screens/OnxHuntWelcome.swift) | 1.467秒 |
| Speak & Learn | `speak-learn` | [`SpeakLearnWelcome`](./WelcomeScreenGallery/Features/Screens/SpeakLearnWelcome.swift) | 4.940秒 |
| Hallow | `hallow` | [`HallowWelcome`](./WelcomeScreenGallery/Features/Screens/HallowWelcome.swift) | 4.500秒 |
| SCRL | `scrl` | [`ScrlWelcome`](./WelcomeScreenGallery/Features/Screens/ScrlWelcome.swift) | 1.999秒 |
| Speak: Language Learning | `speak-language` | [`SpeakLanguageWelcome`](./WelcomeScreenGallery/Features/Screens/SpeakLanguageWelcome.swift) | 5.070秒 |

Perplexityは、調査資料に最終状態の参照画像しか含まれていなかったため、根拠のない開始アニメーションを追加していません。

## 1画面を別のSwiftUIアプリへ組み込む

次の依存ファイルだけをコピーしてください。

1. `WelcomeScreenGallery/Features/Screens/`内の使用する画面ファイル。
2. `ReferenceGeometry.swift`、`ReferenceCanvas.swift`、`MotionTimeline.swift`、`ReplicaAssets.swift`、`ReplicaControls.swift`。
3. 型付きのセマンティックアクションを利用する場合は`WelcomeAction.swift`。
4. `assets/welcome/`内の使用するディレクトリを、`welcome`という名前の青いフォルダ参照として追加。
5. 画面が使用するInter/Nunitoフォントのみを追加し、`UIAppFonts`へ登録。

周囲にSafe Areaの余白や表示中のNavigation Barを置かず、画面を配置します。

```swift
DuolingoWelcome(
    autoplay: true,
    replayKey: replayID,
    onActionPress: { action in
        switch action {
        case .duolingoGetStarted:
            onboarding.start()
        case .duolingoLogIn:
            router.showSignIn()
        default:
            break
        }
    }
)
.frame(maxWidth: .infinity, maxHeight: .infinity)
```

各コントロールは、元のアニメーションが操作可能な状態へ到達するまで無効です。「視差効果を減らす」が有効な場合、`MotionTimeline`は完成状態を直ちに表示します。

## アーキテクチャ

```text
WelcomeScreenGalleryApp
└── WelcomeGallery                  起動引数とディープリンク
    └── WelcomeScreen               型付きの画面切り替え
        └── *Welcome                独立した画面とタイムライン
            ├── MotionTimeline      経過ミリ秒 + 視差効果を減らす設定
            ├── ReferenceCanvas     640×1385のレスポンシブ座標空間
            ├── ReplicaImage        バンドル内リソースの参照
            └── ReplicaButton       操作ゲート + アクセシビリティラベル
```

- [`WelcomeScreenID`](./WelcomeScreenGallery/Domain/WelcomeScreenID.swift)は、IDと再生時間を一元管理します。
- [`WelcomeAction`](./WelcomeScreenGallery/Domain/WelcomeAction.swift)には、33種類の固有なセマンティックアクションを定義しています。
- [`MOTION_SPEC.md`](./docs/MOTION_SPEC.md)は、正確なタイミングを監査するための基準資料です。
- [`SWIFTUI_IMPLEMENTATION_GUIDE.md`](./docs/SWIFTUI_IMPLEMENTATION_GUIDE.md)には、ファイル単位の組み込み仕様と、AIエージェント用のコピー可能なプロンプトを収録しています。

## 検証

- 安定したビジュアルスナップショットを作る場合は、`-welcome-motion 0`を指定します。
- 実装したタイムラインを確認する場合は、`-welcome-motion 1`を指定し、`-welcome-replay`を変更します。
- Simulatorのアクセシビリティ設定で「視差効果を減らす」をテストし、最終状態が直ちに表示されることを確認します。
- Swift Testingターゲットを実行し、レジストリの一意性、画面数、モーション計算を保護します。
- 2枚のショーケース画像に使用したSimulatorキャプチャは、[`render-showcase.swift`](./scripts/render-showcase.swift)で均等に拡大・縮小しています。UIピクセルそのものは再生成していません。

## ライセンスと出典

コードはGPL-3.0です。生成したラスター画像の出典情報は[docs/ASSET_PROVENANCE.md](./docs/ASSET_PROVENANCE.md)に記載しています。ブランドに関する制限と帰属の詳細は[NOTICE.md](./NOTICE.md)を参照してください。
