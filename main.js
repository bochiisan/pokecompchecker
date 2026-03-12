
            // グローバル変数として定義
            let pokemonData = []; 

            // 【重要】JSONを読み込む関数
            async function init() {
                try {
                    // 【追加】URLパラメータから初期モードを決定
                    const urlParams = new URLSearchParams(window.location.search);
                   const targetMode = urlParams.get('mode');
                    const select = document.getElementById('pokedexType');

                    if (targetMode && select.querySelector(`option[value="${targetMode}"]`)) {
                        select.value = targetMode; // プルダウンをURLに合わせる
                        updateSEOAndURL(targetMode, true); // タイトルを書き換え
                    } 
                    else {
                        updateSEOAndURL(select.value, true); // デフォルト（allなど）でセット
                    }
                    // 同じフォルダにある pokemon.json を取得
                    const response = await fetch('pokemon.json');

                    if (!response.ok) {
                        throw new Error('ファイルの読み込みに失敗しました');
                    }

                    // JSONデータを配列として読み込む
                    pokemonData = await response.json();
                    
                    // 読み込みが完了してから描画を開始
                    render(); 

                    select.addEventListener('change', function() {
                        updateSEOAndURL(this.value, false); // URLとタイトルを更新
                        render(); // 再描画
                    });
                    
                } 
                catch (error) {
                    console.error("エラーが発生しました:", error);
                    document.getElementById('pokedex').innerHTML = 
                    `<p style="color:red;">データの読み込みに失敗しました。Live Serverで開いているか、ファイル名が正しいか確認してください。</p>`;
                }
            }

            // ページの読み込みが終わったら実行
            window.onload = init;

            // ① 各図鑑ごとのタイトルと説明文のリスト
            const seoData = {
                'all': {
                    h1: 'ポケモン図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ポケモン図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: '色違い・姿違い・メスのすがた・地方図鑑・Pokémon GO・メガシンカ・キョダイマックス対応の捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'go': {
                    h1: 'ポケモンGO図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ポケモンGO図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'Pokémon GOに実装済みのポケモンや色違いに対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g1': {
                    h1: 'カントー図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】カントー図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: '赤・緑・青・ピカチュウとファイアレッド・リーフグリーン(FRLG)のカントー図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g2': {
                    h1: 'ジョウト図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ジョウト図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: '金・銀・クリスタルのジョウト図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g3': {
                    h1: 'ホウエン図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ホウエン図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ルビー・サファイア・エメラルド(RSE)のホウエン図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g4': {
                    h1: 'シンオウ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】シンオウ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ダイヤモンド・パール(DP)とブリリアントダイヤモンド・シャイニングパール(BDSP)のシンオウ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g4-1': {
                    h1: 'シンオウ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】シンオウ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'プラチナのシンオウ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g4-2': {
                    h1: 'ジョウト図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ジョウト図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ハートゴールド・ソウルシルバー(HGSS)のジョウト図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g5': {
                    h1: 'イッシュ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】イッシュ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ブラック・ホワイト(BW)のイッシュ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g5-1': {
                    h1: 'イッシュ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】イッシュ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ブラック2・ホワイト2(BW2)のイッシュ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g6s': {
                    h1: 'セントラルカロス図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】セントラルカロス図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'X・Yのセントラルカロス図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g6k': {
                    h1: 'コーストカロス図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】コーストカロス図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'X・Yのコーストカロス図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g6m': {
                    h1: 'マウンテンカロス図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】マウンテンカロス図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'X・Yのマウンテンカロス図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g6-1': {
                    h1: 'ホウエン図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ホウエン図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'オメガルビー・アルファサファイア・(ORAS)のホウエン図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g7': {
                    h1: 'アローラ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】アローラ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'サン・ムーン(SM)のアローラ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。 '
                },
                'g7m': {
                    h1: 'メレメレ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】メレメレ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'サン・ムーン(SM)のメレメレ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。 '
                },
                'g7a': {
                    h1: 'アーカラ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】アーカラ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'サン・ムーン(SM)のアーカラ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。 '
                },
                'g7u': {
                    h1: 'ウラウラ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ウラウラ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'サン・ムーン(SM)のウラウラ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。 '
                },
                'g7p': {
                    h1: 'ポニ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ポニ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'サン・ムーン(SM)のポニ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。 '
                },
                'g7-1': {
                    h1: 'アローラ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】アローラ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ウルトラサン・ウルトラムーン(USUM)のアローラ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。 '
                },
                'g7-1m': {
                    h1: 'メレメレ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】メレメレ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ウルトラサン・ウルトラムーン(USUM)のメレメレ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。 '
                },
                'g7-1a': {
                    h1: 'アーカラ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】アーカラ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ウルトラサン・ウルトラムーン(USUM)のアーカラ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。 '
                },
                'g7-1u': {
                    h1: 'ウラウラ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ウラウラ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ウルトラサン・ウルトラムーン(USUM)のウラウラ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。 '
                },
                'g7-1p': {
                    h1: 'ポニ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ポニ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ウルトラサン・ウルトラムーン(USUM)のポニ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。 '
                },
                'g7-2': {
                    h1: 'カントー図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】カントー図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: "Let's Go ピカチュウ・Let's Go イーブイ(ピカブイ)のカントー図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。"
                },
                'g8': {
                    h1: 'ガラル図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ガラル図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ソード・シールド(剣盾)のガラル図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g8y': {
                    h1: 'ヨロイ島図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ヨロイ島図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ソード・シールド エキスパンションパス(鎧の孤島)のヨロイ島図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g8k': {
                    h1: 'カンムリ雪原図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】カンムリ雪原図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'ソード・シールド エキスパンションパス(冠の雪原)のカンムリ雪原図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g8-1': {
                    h1: 'ヒスイ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ヒスイ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'LEGENDS アルセウスのヒスイ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g9': {
                    h1: 'パルデア図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】パルデア図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'スカーレット・バイオレット(SV)のパルデア図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g9k': {
                    h1: 'キタカミ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】キタカミ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'スカーレット・バイオレット ゼロの秘宝(碧の仮面)のキタカミ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g9b': {
                    h1: 'ブルーベリー図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ブルーベリー図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'スカーレット・バイオレット ゼロの秘宝(藍の円盤)のブルーベリー図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g9-1': {
                    h1: 'ミアレ図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】ミアレ図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'Pokémon LEGENDS Z-A(ZA)のミアレ図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                'g9-1i': {
                    h1: '異次元図鑑コンプ率チェッカー',
                    title: '【なぞって簡単】異次元図鑑コンプ率チェッカー | 登録不要・スマホで使える無料の図鑑埋めサポートツール',
                    description: 'Pokémon LEGENDS Z-A M次元ラッシュ(メガ次元ラッシュ)の異次元図鑑に対応した捕獲管理チェッカー。PCでもスマホでも、なぞるだけで簡単一括チェック。'
                },
                
            };

            // ② タイトルとURLを書き換える関数
            function updateSEOAndURL(mode, isInitialLoad = false) {
                if (seoData[mode]) {
                    // 1. ブラウザのタブ名を書き換え
                    document.title = seoData[mode].title;
            
                    // 2. ページ内の大見出し(h1)を書き換え 【★ここを追加】
                    const h1 = document.getElementById('main-title');
                    if (h1) {
                        h1.textContent = seoData[mode].h1; 
                        // ※もし「 | 地方図鑑...」などの後ろの部分を消して
                        // 「パルデア図鑑コンプ率チェッカー」だけにしたい場合は工夫も可能です。
                    }
            
                    // 3. Descriptionの書き換え
                    const metaDesc = document.querySelector('meta[name="description"]');
                    if (metaDesc) metaDesc.setAttribute('content', seoData[mode].description);
                }
            
                // URLの書き換え処理（以下略）
                if (!isInitialLoad) {
                    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?mode=' + mode;
                    window.history.replaceState({ path: newUrl }, '', newUrl);
                }
            }

            const modeSettings = {
                "all": { base: ["all"], origins: [], ranges: []},
                "go": { base: ["all"], origins: [], ranges: [], onlyGo: true, suffix: "（Pokémon GO）"},
                "g1": { base: ["all"], origins: ["1"], ranges: [["all", 1, 151]], suffix: "（赤緑青ピカチュウ、FRLG）"},
                "g2": { base: ["g2"], origins: [], ranges: [], suffix: "（金銀クリスタル）"},
                "g3": { base: ["g3"], origins: [], ranges: [], suffix: "（RSE）"},
                "g4": { base: ["g4"], origins: [], ranges: [], suffix: "（DP、DBSP）"},
                "g4-1": { base: ["g4-1"], origins: [], ranges: [], suffix: "（プラチナ）"},
                "g4-2": { base: ["g4-2"], origins: [], ranges: [], suffix: "（HGSS）"},
                "g5": { base: ["g5"], origins: ["5"], ranges: [], suffix: "（BW）"}, 
                "g5-1": { base: ["g5-1"], origins: [], ranges: [], suffix: "（BW2）"},
                "g6s": { base: ["g6s"], origins: [], ranges: []},
                "g6k": { base: ["g6k"], origins: [], ranges: []},
                "g6m": { base: ["g6m"], origins: [], ranges: []},
                "g6-1": { base: ["g6-1"], origins: [], ranges: [], suffix: "（ORAS）"},
                "g7": { base: ["g7"], origins: [], ranges: [], suffix: "（SM）"},
                "g7m": { base: ["g7m"], origins: [], ranges: [], suffix: "（SM）"},
                "g7a": { base: ["g7a"], origins: [], ranges: [], suffix: "（SM）"},
                "g7u": { base: ["g7u"], origins: [], ranges: [], suffix: "（SM）"},
                "g7p": { base: ["g7p"], origins: [], ranges: [], suffix: "（SM）"},
                "g7-1": { base: ["g7-1"], origins: [], ranges: [], suffix: "（USUM）"},
                "g7-1m": { base: ["g7-1m"], origins: [], ranges: [], suffix: "（USUM）"},
                "g7-1a": { base: ["g7-1a"], origins: [], ranges: [], suffix: "（USUM）"},
                "g7-1u": { base: ["g7-1u"], origins: [], ranges: [], suffix: "（USUM）"},
                "g7-1p": { base: ["g7-1p"], origins: [], ranges: [], suffix: "（USUM）"},
                "g7-2": { base: ["g7-2"], origins: ["1", "2", "3", "4", "5", "6", "7"], ranges: [], suffix: "（ピカブイ）"},
                "g8": { base: ["g8"], origins: [], ranges: []},
                "g8y": { base: ["g8y"], origins: [], ranges: []},
                "g8k": { base: ["g8k"], origins: [], ranges: []},
                "g8-1": { base: ["g8-1"], origins: [], ranges: []},
                "g9": { base: ["g9"], origins: [], ranges: []},
                "g9k": { base: ["g9k"], origins: [], ranges: []},
                "g9b": { base: ["g9b"], origins: [], ranges: []},
                "g9-1": { base: ["g9-1"], origins: [], ranges: []},
                "g9-1i": { base: ["g9-1i"], origins: [], ranges: []},
            };

        	const pokedex = document.getElementById('pokedex');
            pokedex.classList.add('is-loading');
        	const searchInput = document.getElementById('searchInput');
        	const modeSelect = document.getElementById('pokedexType'); 
        	const originsFilter = document.getElementById('originsFilter');
        	const hasFemaleFilter = document.getElementById('hasFemaleFilter');
        	const eventOnlyFilter = document.getElementById('eventOnlyFilter');
        	const noFormFilter = document.getElementById('noFormFilter');
        	const more869Filter = document.getElementById('more869Filter');
        	const MegaFilter = document.getElementById('MegaFilter');
        	const GmaxFilter = document.getElementById('GmaxFilter');


            // 保存用リストの読み込み
            let caughtList = JSON.parse(localStorage.getItem('caughtPokemon')) || [];
            let shinyList = JSON.parse(localStorage.getItem('shinyPokemon')) || [];

        	function render() {
        		pokedex.innerHTML = '';
        		const config = modeSettings[modeSelect.value] || modeSettings["all"];
                const isGoMode = config.onlyGo === true;
                // チェックされている地方の値を配列で取得
                const selectedOrigins = Array.from(document.querySelectorAll('.origin-check:checked'))
                .map(cb => cb.value);
        		let displayData = [...pokemonData];
                const hideCaught = document.getElementById('hideCaughtFilter').checked;
                const hideShinyCaught = document.getElementById('hideShinyCaughtFilter').checked;
                

                // ① フィルタリング & 番号(currentNo)の付与
        		displayData = displayData.filter(p => {
        			const bases = Array.isArray(config.base) ? config.base : [config.base];
                    // 修正後（0 を数値として許可する）
                    const isBaseMatch = (bases.includes("all")) || (p.localNos && bases.some(b => p.localNos[b] !== undefined));
        			const isModeOriginMatch = config.origins.length === 0 || config.origins.includes(p.origins);
                    // 1つもチェックがない場合は「すべて表示」、チェックがある場合はその地方のみ
                    const isSelectOriginMatch = (selectedOrigins.length === 0) || (selectedOrigins.includes(p.origins));

		        	// --- ② 【追加】配布限定の「追加表示」ロジック ---
			        // チェックONなら「すべて許可」、チェックOFFなら「配布限定(true)以外を許可」
            		const matchEvent = eventOnlyFilter.checked || p.isEventOnly !== true;

		        	// --- ② 【追加】メスのすがたの「追加表示」ロジック ---
			        // チェックONなら「すべて許可」、チェックOFFなら「配布限定(true)以外を許可」
            		const matchFemale = hasFemaleFilter.checked || p.hasFemale !== true;

                    
        			// --- ③ 【追加】GO未登場の「除外」ロジック（ONで消える） ---
		        	const matchGo = !isGoMode || p.notInGo !== true;

        			// 【追加】姿違いの除外（ONで非表示）// noForm が true の個体を、チェックONの時に取り除く// 1. 現在のモード（地方図鑑）を取得
        			const currentMode = modeSelect.value;

        			// 2. 判定に使うIDを特定
        			let targetId;
        			if (currentMode === "all") {
        			    targetId = p.id; // 全国図鑑なら id
        			} 
                    else {
        			    // 地方図鑑なら localNos 内の該当する番号を参照、なければ id
        			    targetId = (p.localNos && p.localNos[currentMode] !== undefined) 
        			               ? p.localNos[currentMode] 
        			               : p.id;
        			}
        			
        			// 3. IDを文字列にして「.」が含まれているか判定
        			const isSubForm = targetId.toString().includes('.');
        			
        			// 4. 姿違い除外チェックONの時、小数点あり(isSubForm)なら除外
        			const matchForm = !noFormFilter.checked || !isSubForm;
        			
        			// 【追加】マホイップの全表示（ONで表示）
		        	// チェックONなら「すべて許可」、チェックOFFなら「それ以外を許可」
            		const match869 = more869Filter.checked || p.more869 !== true;

                    // チェックONなら「Megaがtrue」のみ、チェックOFFなら「Megaがtrue以外」のみ表示
                    const matchMega = MegaFilter.checked ? p.Mega === true : p.Mega !== true;

                    // チェックONなら「Gmaxがtrue」のみ、チェックOFFなら「Gmaxがtrue以外」のみ表示
                    const matchGmax = GmaxFilter.checked ? p.Gmax === true : p.Gmax !== true;
                    // 【追加】捕獲済みを非表示にするロジック
                    // 「非表示フィルタがOFF」 または 「捕獲リストに含まれていない（未捕獲）」 なら表示
                    const isNotCaught = !caughtList.some(id => String(id) === String(p.id));
                    const matchHideCaught = !hideCaught || isNotCaught;
                    const isShinyCaught = shinyList.some(id => String(id) === String(p.id));
                    const matchHideShinyCaught = !hideShinyCaught || !isShinyCaught;


        			return isBaseMatch && isModeOriginMatch && isSelectOriginMatch && matchFemale && matchEvent && matchGo && matchForm && match869 && matchGmax && matchMega&& matchHideCaught&& matchHideShinyCaught;
        		})
                .map(p => {
                    const bases = Array.isArray(config.base) ? config.base : [config.base];
                    const foundBase = bases.find(b => b === "all" || (p.localNos && p.localNos[b] !== undefined)); // ここ！
                    let currentNo = p.id;
                    if (foundBase !== "all") {
                        currentNo = (p.localNos && p.localNos[foundBase] !== undefined) ? p.localNos[foundBase] : p.id;
                    }
                    return { ...p, currentNo };
                });


        		// ② 詳細な範囲指定（ranges）での絞り込み
        		if (config.ranges.length > 0) {
        			displayData = displayData.filter(p => {
        				return config.ranges.some(([targetBase, start, end]) => {
        					const num = (targetBase === "all") ? p.id : (p.localNos ? p.localNos[targetBase] : null);
        					const actualEnd = (end === undefined) ? start : end;
        					return num !== null && num >= start && num <= actualEnd;
        				});
        			});
        		}

        		// ③ 並び替え（rangesの掲載順優先 ＋ 同じ範囲内なら番号順）
        		displayData.sort((a, b) => {
        			const getRangeIndex = (pokemon) => {
        				if (config.ranges.length === 0) return 0;
        				return config.ranges.findIndex(([targetBase, start, end]) => {
        					const num = (targetBase === "all") ? pokemon.id : (pokemon.localNos ? pokemon.localNos[targetBase] : null);
        					return num !== null && num >= start && num <= (end || start);
        				});
        			};

        			const indexA = getRangeIndex(a);
        			const indexB = getRangeIndex(b);

        			if (indexA !== indexB) return indexA - indexB; // rangesの順序を優先
        			return a.currentNo - b.currentNo; // 同じ範囲内なら現在の番号順
        		});

        		// ④ 名前検索フィルタ
        		if (searchInput.value) {
        			displayData = displayData.filter(p => p.name.includes(searchInput.value));
        		}
                
                const fragment = document.createDocumentFragment();
        		// ⑤ 描画
        		displayData.forEach((p, index) => {
                    
        			const card = document.createElement('div');

        		    const isCaught = caughtList.some(id => String(id) === String(p.id));
        			const isShiny = shinyList.some(id => String(id) === String(p.id));
        			card.className = 'pokemon' + (isCaught ? ' caught' : '');
        			// 保存や判定には元の p.id (808.1など) を使用
                    
                    // 【重要】スマホ判定用にIDを埋め込む
                    card.setAttribute('data-id', p.id);


        			// --- 表示番号(displayNo)の決定ロジック ---
        			    let displayNo;

                    if (config.startAt === 0 || config.startAt === 1) {
                      // 0番や1番から連番を振るモードの場合
                       displayNo = index + config.startAt;
                    } 
                    else {
                        // p.currentNo が 0 の場合でも Math.floor が動くように明示
                        // undefined や null の時だけフォールバックする
                        const target = (p.currentNo !== undefined && p.currentNo !== null) ? p.currentNo : p.id;
                        displayNo = Math.floor(Number(target)); 
                    }

                    // 名前の中に「(」や「（」があれば、その前で改行しやすくする
                    // また、長いカタカナの間に「wbr（改行候補）」を挟む処理
                    const styledName = p.name
                    .replace(/([（(])/g, '<br>$1') // カッコがあれば強制改行
                    .replace(/(.{6})(?=.)/g, '$1<wbr>'); // 4文字ごとに改行候補を隠し入れる

        			// ① フィルタ条件の判定（チェックボックスがON または GOモードが選択中）
        		    const isNotInGoActive = isGoMode;

        			// ② 判定用のフラグ（現在チェックされているか）
        			const isShinyActive = shinyList.some(id => String(id) === String(p.id));

        			// 「フィルタがON」 または 「JSONのnotInGoShinyがtrue」 なら非表示
        		    const shinyBtnHtml = !(isNotInGoActive && p.notInGoShiny|| p.noShiny) 
        		    ? `<button class="mini-btn shiny-btn ${isShinyActive ? 'shiny-on' : ''}" title="色違い">★</button>` 
        		    : '';

        		    card.innerHTML = `
      			        <!-- 左上：色違いボタン (ここを includes から isShinyActive に変更) -->
      			        ${shinyBtnHtml}
        			
      			        <!-- 中央：番号表示 -->
      			        <div class="container">
      			            <span class="number">No.${displayNo}</span>
      			        </div>

      			        <!-- 名前 -->
      			        <span class="name">${styledName}</span>
    			    `;


                    // ① なぞり（2枚目以降、または1枚目を動かした時）
                    card.onmouseenter = () => {
                        if (isDragging) {
                            hasMoved = true;
                            processDragAction(p.id, card);
                        }
                    };
                    // ボタンのクリックイベント（なぞり後はキャンセル）
                    [ {key: 'shiny', list: shinyList, sKey: 'shinyPokemon', class: 'shiny-on'}].forEach(opt => {
                        const btn = card.querySelector(`.${opt.key}-btn`);
                        if (!btn) return;
    
                        btn.onclick = (e) => {
                            e.stopPropagation();
        
                            // なぞり中、またはスマホの誤作動防止ブロック中なら完全に無視
                            if (hasMoved || (typeof isBlockingClick !== 'undefined' && isBlockingClick)) return; 

                            // 1. 確実に文字列に変換
                            const strId = String(p.id);
        
                            // 2. 現在のリストに存在するかどうかを文字列で比較
                            const isCurrentlyOn = shinyList.some(id => String(id) === strId);
                    
                            // 3. 状態に合わせてリストを更新
                            if (isCurrentlyOn) {
                                // 解除：文字列として一致するものを除外
                                shinyList = shinyList.filter(id => String(id) !== strId);
                            } 
                            else {
                                // 追加
                                shinyList.push(strId);
                            }
                    
                            // 4. 保存して再描画
                            localStorage.setItem('shinyPokemon', JSON.stringify(shinyList));
                            render();
                        };
                    });

                    // ② クリック（ここが1枚目の処理を担当する）
                    card.onclick = (e) => {
                        if (e.target.closest('.mini-btn')) return;
                    
                        // 【最重要】なぞり中、またはなぞり直後（300ms以内）はクリックを完全に無視
                        if (isDragging || hasMoved) {
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                        }
                    
                        // 通常の単発タップ処理
                        const pId = p.id;
                        const isIncluded = caughtList.some(id => String(id) === String(pId));
                        if (isIncluded) {
                            caughtList = caughtList.filter(id => String(id) !== String(pId));
                        } 
                        else {
                            caughtList.push(pId);
                        }
                        localStorage.setItem('caughtPokemon', JSON.stringify(caughtList));
                        render();
                    };

                    card.onmousedown = (e) => {
                        if (e.button !== 0) return;
                        e.preventDefault();
                        startDrag(p.id, 'caught', card); // ドラッグ開始
                    };
                    
                    // 色違いボタンの設定
                    const sBtn = card.querySelector('.shiny-btn');
                    if (sBtn) {
                        sBtn.onmousedown = (e) => {
                            e.stopPropagation(); // 親（カード）にイベントを流さない
                            e.preventDefault();  // ブラウザの標準動作を止める
                            startDrag(p.id, 'shiny', card); // ドラッグ開始
                        };
                    }
                    
                    
        			pokedex.appendChild(card);
                    
                    pokedex.classList.remove('is-loading');
        	    });
                
                pokedex.appendChild(fragment);
                // --- ⑥ 集計処理（ループの外に出す） ---
                const totalVisible = displayData.length;
                
                // 1. 通常の捕獲集計
                const caughtCount = displayData.filter(p => 
                    caughtList.some(id => String(id) === String(p.id))
                ).length;
                const percent = totalVisible > 0 ? Math.round((caughtCount / totalVisible) * 1000) / 10 : 0;
                
                // 2. ★色違いの「表示されている総数」を計算（ここがポイント！）
                // render内のボタン非表示ロジック（!p.noShiny && !(isNotInGoActive && p.notInGoShiny)など）と同じ条件で絞り込む
                const isNotInGoActive = isGoMode; // フィルタの状態を取得
                
                const totalShinyPossible = displayData.filter(p => {
                    // ボタンが表示される条件：(noShinyがtrueでない) かつ (GO未実装フィルタONかつnotInGoShinyがtrue)ではない
                    // つまり render内の shinyBtnHtml が空文字にならない条件
                    return !(p.noShiny || (isNotInGoActive && p.notInGoShiny));
                }).length;
                
                // 3. 色違いの捕獲集計
                const shinyCount = displayData.filter(p => 
                    shinyList.some(id => String(id) === String(p.id))
                ).length;
                
                // 分母を totalShinyPossible に変更
                const shinyPercent = totalShinyPossible > 0 ? Math.round((shinyCount / totalShinyPossible) * 1000) / 10 : 0;
                
                // 画面に反映
                const counterElement = document.getElementById('counter');
                if (counterElement) {
                    counterElement.innerText = `進捗: ${caughtCount} / ${totalVisible} (${percent}%)`;
                }
                
                const shinyCounterElement = document.getElementById('shiny-counter');
                if (shinyCounterElement) {
                    // 分母を totalShinyPossible に差し替え
                    shinyCounterElement.innerText = `★色違い: ${shinyCount} / ${totalShinyPossible} (${shinyPercent}%)`;
                }
            }

            // 表示中のポケモンを一括操作する関数
            function bulkCollectDisplayed(isCaught) {
                const action = isCaught ? "「捕獲済み」" : "「未捕獲」";
                if (!confirm(`現在表示されているポケモンをすべて${action}にしますか？`)) return;

                // 現在のフィルタ条件を再現して、対象のIDリストを作成
                const config = modeSettings[modeSelect.value] || modeSettings["all"];
                const selectedOrigins = Array.from(document.querySelectorAll('.origin-check:checked')).map(cb => cb.value);
                const targets = getCurrentlyDisplayedTargets();
                const targetIds = targets.map(p => String(p.id));

                if (isCaught) {
                    // 捕獲済みにする場合：まだ入っていないIDを追加
                    targetIds.forEach(id => {
                        if (!caughtList.some(existingId => String(existingId) === id)) {
                            caughtList.push(id);
                        }
                    });
                } 
                else {
                    // 解除する場合：リストから除外
                    caughtList = caughtList.filter(existingId => !targetIds.includes(String(existingId)));
                }

                // 保存して再描画
                localStorage.setItem('caughtPokemon', JSON.stringify(caughtList));
                render();
            }
            // 色違いを一括操作する関数
            function bulkShinyDisplayed(isShiny) {
                const action = isShiny ? "「捕獲済み」" : "「未捕獲」";
                if (!confirm(`現在表示されているポケモンの★色違いをすべて${action}にしますか？\n（※色違いボタンが表示されていない個体は無視されます）`)) return;
            
                // 現在表示されているポケモンのうち、色違いボタンが存在するものだけを対象にする
                const config = modeSettings[modeSelect.value] || modeSettings["all"];
                const isGoMode = config.onlyGo === true;
                const isNotInGoActive = isGoMode;
                const targets = getCurrentlyDisplayedTargets().filter(p => {
                    // ボタンが表示される条件を再現
                    return !(p.noShiny || (isNotInGoActive && p.notInGoShiny));
                });
            
                const targetIds = targets.map(p => String(p.id));
            
                if (isShiny) {
                    targetIds.forEach(id => {
                        // String同士で比較して重複チェック
                        if (!shinyList.some(existingId => String(existingId) === id)) {
                            shinyList.push(id);
                        }
                    });
                } 
                else {
                    // 解除時もStringで比較
                    shinyList = shinyList.filter(existingId => !targetIds.includes(String(existingId)));
                }

                localStorage.setItem('shinyPokemon', JSON.stringify(shinyList));
                render();
            }
            
            
            // フィルタ条件を共通化するための補助関数（既存の条件をここにまとめるとスッキリします）
            function getCurrentlyDisplayedTargets() {
                const config = modeSettings[modeSelect.value] || modeSettings["all"];
                const isGoMode = config.onlyGo === true;
                const selectedOrigins = Array.from(document.querySelectorAll('.origin-check:checked')).map(cb => cb.value);
                
                return pokemonData.filter(p => {
                    const bases = Array.isArray(config.base) ? config.base : [config.base];
                    const isBaseMatch = (bases.includes("all")) || (p.localNos && bases.some(b => p.localNos[b] !== undefined));
                    const isModeOriginMatch = config.origins.length === 0 || config.origins.includes(p.origins);
                    const isSelectOriginMatch = (selectedOrigins.length === 0) || (selectedOrigins.includes(p.origins));
                    const matchEvent = eventOnlyFilter.checked || p.isEventOnly !== true;
                    const matchGo = !isGoMode || p.notInGo !== true;
                    const matchForm = !noFormFilter.checked || p.noForm !== true;
                    const match869 = more869Filter.checked || p.more869 !== true;
                    const matchMega = MegaFilter.checked ? p.Mega === true : p.Mega !== true;
                    const matchGmax = GmaxFilter.checked ? p.Gmax === true : p.Gmax !== true;
                    const matchSearch = !searchInput.value || p.name.includes(searchInput.value);
            
                    return isBaseMatch && isModeOriginMatch && isSelectOriginMatch && matchEvent && matchGo && matchForm && match869 && matchGmax && matchMega && matchSearch;
                });
            }
            
            
            // 全データを初期化する関数
            function resetAllData() {
                // 1段階目の確認
                const firstCheck = confirm("【注意】これまでに記録した「捕獲済み」と「色違い」の全データが消去されます。よろしいですか？");

                if (firstCheck) {
                    // 2段階目の確認（誤操作防止）
                    const secondCheck = confirm("本当によろしいですか？この操作は取り消せません。");
                    
                    if (secondCheck) {
                        // 1. 各リストを空にする
                        caughtList = [];
                        shinyList = [];

                        // 2. ローカルストレージを削除
                        localStorage.removeItem('caughtPokemon');
                        localStorage.removeItem('shinyPokemon');

                        // 3. 画面を再描画（これでカウンターも0になります）
                        render();

                        alert("すべてのデータをリセットしました。");
                    }
                }
            }

            const dropBtn = document.getElementById('originDropdownBtn');
            const dropMenu = document.getElementById('originDropdownMenu');

            // 開閉の切り替え
            dropBtn.onclick = (e) => {
                e.stopPropagation();
                const isOpen = dropMenu.style.display === 'block';
                dropMenu.style.display = isOpen ? 'none' : 'block';
            };

            // メニュー外をクリックで閉じる
            document.addEventListener('click', () => {
                dropMenu.style.display = 'none';
            });

            // メニュー内クリックで勝手に閉じないようにする（複数選択のため）
            dropMenu.onclick = (e) => e.stopPropagation();

            // 選択状況をボタンのテキストに反映（おまけ）
            document.querySelectorAll('.origin-check').forEach(cb => {
                cb.addEventListener('change', () => {
                    const checked = document.querySelectorAll('.origin-check:checked');
                    dropBtn.innerText = checked.length > 0 ? `${checked.length}件選択中` : "地方を選択 (複数可)";
                });
            });

            // --- ドラッグ・なぞり操作の統合管理 ---
            let isDragging = false;
            let hasMoved = false; // 「なぞり」が発生したかどうかのフラグ
            let dragMode = null;
            let targetType = null; // 'caught', 'shiny' のいずれか


            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    dragMode = null;
                    targetType = null;
                    // なぞった場合のみ、最後に数字を更新
                    if (hasMoved) render();
                }
            });
            // 共通のなぞり処理関数
            function processDragAction(pId, cardElement) {
                let list, storageKey, activeClass, targetElement;
            
                if (targetType === 'shiny') {
                    list = shinyList; storageKey = 'shinyPokemon'; activeClass = 'shiny-on';
                    targetElement = cardElement.querySelector('.shiny-btn');
                } 
                else {
                    list = caughtList; storageKey = 'caughtPokemon'; activeClass = 'caught';
                    targetElement = cardElement;
                }
            
                if (!targetElement) return;
            
                // 型を文字列に揃えて判定（解除ができない原因を解消）
                const isIncluded = list.some(id => String(id) === String(pId));
            
                if (dragMode === 'add' && !isIncluded) {
                    list.push(pId);
                    targetElement.classList.add(activeClass);
                } 
                else if (dragMode === 'remove' && isIncluded) {
                    // 全ての型に対応して削除
                    const newList = list.filter(id => String(id) !== String(pId));
                    if (targetType === 'shiny') shinyList = newList;
                    else caughtList = newList;
                    
                    targetElement.classList.remove(activeClass);
                }
                localStorage.setItem(storageKey, JSON.stringify(targetType === 'shiny' ? shinyList : caughtList));
            }
            
            function startDrag(pId, type, cardElement) {
                isDragging = true;
                hasMoved = false; // まだ動いていない
                targetType = type;
            
                let list = (type === 'shiny') ? shinyList  : caughtList;
                const isIncluded = list.some(id => String(id) === String(pId));
                
                // モードだけ決めておく
                dragMode = isIncluded ? 'remove' : 'add';
            }
            
            let isTouching = false;
            let startTouchX, startTouchY; // タップか移動かを判定するため
            // スマホ：指が触れた（開始）
            document.addEventListener('touchstart', (e) => {
                const touch = e.touches[0]; // 1本目の指を確実に指定
                const target = e.target;
                const card = target ? target.closest('.pokemon') : null;
                const isControl = target ? target.closest('.mini-btn, input, select, button, .dropdown-menu') : null;
            
                if (card) {
                    isTouching = true;
                    hasMoved = false; 
                    startTouchX = touch.clientX;
                    startTouchY = touch.clientY;
            
                    // 【重要】何をなぞり始めたか（種類）を特定
                    const sBtn = target.closest('.shiny-btn');
                    
                    if (sBtn) targetType = 'shiny';
                    else targetType = 'caught';
            
                    // モード決定（型を考慮）
                    const pId = card.getAttribute('data-id');
                    let list = (targetType === 'shiny') ? shinyList : caughtList;
                    dragMode = list.some(id => String(id) === String(pId)) ? 'remove' : 'add';
                }
            }, { passive: true });
            
            // スマホ：指が動いた（なぞり中）
            document.addEventListener('touchmove', (e) => {
                if (!isTouching) return;
            
                const touch = e.touches[0];
                const dx = Math.abs(touch.clientX - startTouchX);
                const dy = Math.abs(touch.clientY - startTouchY);
            
                // 5px以上動いたら「なぞり（ドラッグ）」と確定
                if (dx > 5 || dy > 5) {
                    hasMoved = true;
                    
                    // なぞり中はスクロールを完全に止める（これで全解除暴発を防ぐ）
                    if (e.cancelable) e.preventDefault();
            
                    const target = document.elementFromPoint(touch.clientX, touch.clientY);
                    const card = target ? target.closest('.pokemon') : null;
                    if (card) {
                        // PC版と共通の「なぞり処理関数」を呼び出す
                        processDragAction(card.getAttribute('data-id'), card);
                    }
                }
            }, { passive: false });
            
            // スマホ：指を離した
            let isBlockingClick = false; // 「偽のクリック」を捨てるためのフラグ
            
            document.addEventListener('touchend', () => {
                if (isTouching && hasMoved) {
                isTouching = false;
                hasMoved = false;
                dragMode = null;
                targetType = null;
                    // 全てのリストを保存
                    localStorage.setItem('caughtPokemon', JSON.stringify(caughtList));
                    localStorage.setItem('shinyPokemon', JSON.stringify(shinyList));
                    
                    render(); // 最新の保存データで画面を清書
                }
            }, { passive: true });
            
            
            // ① データをテキストエリアに書き出す
            function exportToTextarea() {
                const textContent = [
                    `CAUGHT:${caughtList.join(',')}`,
                    `SHINY:${shinyList.join(',')}`,
                ].join('\n');
            
                const textarea = document.getElementById('backupTextarea');
                textarea.value = textContent;
                textarea.select(); // テキストエリアを選択状態にする
            
                // 【修正】安全なコピー処理
                try {
                    // まず新しい方法を試す
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(textContent);
                    } else {
                        // 失敗・または未対応時は古い方法（選択済みのテキストエリアをコピー）を実行
                        document.execCommand('copy');
                    }
                    alert("テキストエリアに書き出し、クリップボードにコピーしました！");
                } catch (err) {
                    // コピー自体が失敗しても、書き出しは成功しているのでアラートのみ
                    alert("テキストエリアに書き出しました。枠内の文字をコピーして保存してください。");
                }
            }
            
            // ② テキストエリアの文字列からデータを復元
            function importFromTextarea() {
                const input = document.getElementById('backupTextarea').value.trim();
                if (!input) {
                    alert("テキストエリアにバックアップデータを貼り付けてください。");
                    return;
                }
            
                try {
                    const lines = input.split('\n');
                    const newData = {};
                    
                    lines.forEach(line => {
                        const separatorIndex = line.indexOf(':');
                        if (separatorIndex !== -1) {
                            const key = line.substring(0, separatorIndex).trim();
                            const value = line.substring(separatorIndex + 1).trim();
                            newData[key] = value ? value.split(',') : [];
                        }
                    });
            
                    // データの整合性チェック
                    if (!newData['CAUGHT'] && !newData['SHINY']) {
                        throw new Error("形式が正しくありません");
                    }
            
                    if (confirm("現在のデータが上書きされます。よろしいですか？")) {
                        caughtList = newData['CAUGHT'] || [];
                        shinyList = newData['SHINY'] || [];
                        
                        localStorage.setItem('caughtPokemon', JSON.stringify(caughtList));
                        localStorage.setItem('shinyPokemon', JSON.stringify(shinyList));
                        
                        render();
                        alert("バックアップからデータを復元しました！");
                    }
                } catch (err) {
                    alert("データの形式が正しくありません。保存したテキストを正しく貼り付けてください。");
                }
            }
            
            function shareProgress() {
                const currentTargets = getCurrentlyDisplayedTargets();
                const total = currentTargets.length;
                
                if (total === 0) {
                    alert("表示されているポケモンがいません。");
                    return;
                }
            
                // 現在の図鑑名を取得（selectのテキストを取得）
                const modeSelect = document.getElementById('pokedexType');
                const configName = modeSelect.options[modeSelect.selectedIndex].text.split(' ')[0];
            
                // 捕獲済み集計（型変換対応の some を使用）
                const caught = currentTargets.filter(p => 
                    caughtList.some(id => String(id) === String(p.id))
                ).length;
            
                // 色違い集計
                // (※ 以前作成した「色違いボタンが表示されているものだけ」を分母にするロジック)
                const config = modeSettings[modeSelect.value] || modeSettings["all"];
                const isGoMode = config.onlyGo === true; // プルダウンがGOモードかどうか
                const isNotInGoActive = isGoMode; // どちらかがONなら true
                const shinyPossibleTargets = currentTargets.filter(p => !(p.noShiny || (isNotInGoActive && p.notInGoShiny)));
                const totalShiny = shinyPossibleTargets.length;
                const shiny = currentTargets.filter(p => 
                    shinyList.some(id => String(id) === String(p.id))
                ).length;
            
                // パーセント計算
                const caughtPer = Math.round((caught / total) * 1000) / 10;
                const shinyPer = totalShiny > 0 ? Math.round((shiny / totalShiny) * 1000) / 10 : 0;
            
                const siteUrl = window.location.href;
                let title = config.suffix || "";
            
                const text = `【ポケモン図鑑コンプ率チェッカー】\n` +
                             `${configName}${title}\n` +
                             `捕獲済み: ${caught} / ${total} (${caughtPer}%)\n` +
                             `色違い: ${shiny} / ${totalShiny} (${shinyPer}%)\n` +
                             `${siteUrl}`;
            
            // ② 実行部分
            const isMobile = /iPhone|Android/i.test(navigator.userAgent);
            const protocol = isMobile ? "twitter://post?message=" : "https://x.com/intent/post?text=";
                const xUrl = protocol + encodeURIComponent(text);
            window.open(xUrl, '_blank');
            }

            // リスト操作の共通関数
            function toggleIdInList(list, id, isAdd, storageKey) {
                if (isAdd) {
                    if (!list.includes(id)) list.push(id);
                } 
                else {
                    const idx = list.indexOf(id);
                    if (idx > -1) list.splice(idx, 1);
                }
                localStorage.setItem(storageKey, JSON.stringify(list));
            }

            modeSelect.onchange = render;
            document.querySelectorAll('.origin-check').forEach(cb => {
                cb.addEventListener('change', render);
            });
            document.getElementById('hideCaughtFilter').onchange = render;
            document.getElementById('hideShinyCaughtFilter').onchange = render;
            searchInput.oninput = render;
            hasFemaleFilter.onchange = render;
            eventOnlyFilter.onchange = render;
            noFormFilter.onchange = render;
            more869Filter.onchange = render;
            GmaxFilter.onchange = render;
            MegaFilter.onchange = render;
            render();