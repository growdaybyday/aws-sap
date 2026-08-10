# AWS Pro Architect Prep
![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)

**AWS Certified Solutions Architect – Professional** 시험 대비 학습 가이드입니다. [Docusaurus](https://docusaurus.io/)로 만들었고, AWS 서비스와 아키텍처 패턴을 시험 도메인 순서에 맞춰 정리했습니다.

🌐 **Live Site**
- 영문: [https://growdaybyday.github.io/aws-sap/](https://growdaybyday.github.io/aws-sap/)
- 한글: [https://growdaybyday.github.io/aws-sap/ko/](https://growdaybyday.github.io/aws-sap/ko/)

> 이 저장소는 [adavoudi/aws-sap](https://github.com/adavoudi/aws-sap)를 **CC BY 4.0** 라이선스에 따라 포크하여 한글 번역을 추가한 것입니다. 원문 사이트는 [adavoudi.info/aws-sap](https://adavoudi.info/aws-sap/)에서 볼 수 있습니다.

---

## 로컬 실행

```bash
yarn install
yarn start              # 영문 (기본 로케일)
yarn start --locale ko  # 한글
```

`yarn start`는 한 번에 하나의 로케일만 띄웁니다. 두 로케일을 동시에 확인하려면 빌드 후 서브합니다.

```bash
yarn build   # en + ko 전체 빌드
yarn serve
```

---

## 다국어 (i18n) 구조

영문이 원본이고 한글은 번역 로케일입니다. **한글 번역이 없는 문서는 영문 원문으로 자동 폴백**되므로, 번역을 문서 단위로 점진적으로 추가할 수 있습니다.

```
docs/                                             # 영문 원본 (번역의 기준)
i18n/ko/
├── code.json                                     # 테마·홈페이지 UI 문자열
├── docusaurus-theme-classic/
│   ├── navbar.json                               # 상단바
│   └── footer.json                               # 푸터
└── docusaurus-plugin-content-docs/
    ├── current.json                              # 사이드바 카테고리 라벨
    └── current/                                  # 번역된 문서 (docs/ 와 동일한 경로·파일명)
```

문서를 번역할 때는 `docs/` 아래의 상대 경로와 파일명을 그대로 유지해 `i18n/ko/docusaurus-plugin-content-docs/current/` 에 두어야 Docusaurus가 짝을 맞춥니다.

```
docs/Compute/Serverless & Managed Compute/AWS Lambda.md
→ i18n/ko/docusaurus-plugin-content-docs/current/Compute/Serverless & Managed Compute/AWS Lambda.md
```

UI 문자열 키를 새로 생성하거나 갱신하려면:

```bash
yarn write-translations --locale ko
```

기존 번역은 덮어쓰지 않고 새 키만 추가됩니다.

### 번역 시 지켜야 할 것

- **프런트매터**(`sidebar_position` 등)는 값을 번역하지 않고 그대로 둡니다.
- **코드 블록과 mermaid 다이어그램**은 문법이 깨지지 않도록 원문을 유지합니다.
- **이미지 경로**: 원본 문서는 `../_assets/foo.png` 같은 상대 경로를 씁니다. 번역 파일은 디렉터리 깊이가 달라 이 경로가 깨지므로, `@site/docs/<원본경로>/_assets/foo.png` 형태로 바꿔 원본 이미지를 그대로 참조합니다(에셋 복제 불필요).
- **문서 간 링크**는 `./경로/파일.md` 처럼 상대 경로로 씁니다. `/aws-sap/docs/...` 같은 절대 경로는 한글 로케일에서 `/aws-sap/ko/aws-sap/docs/...` 로 접두어가 중복되어 빌드가 실패합니다.

---

## 배포

`main` 브랜치에 푸시하면 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)이 두 로케일을 빌드해 GitHub Pages로 배포합니다. Actions 탭에서 수동 실행도 가능합니다.

최초 1회, 리포지토리 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정해야 합니다.

---

## 기여

1. 브랜치 생성: `git checkout -b feature/your-topic`
2. 영문은 `docs/<Domain>/`, 한글은 `i18n/ko/docusaurus-plugin-content-docs/current/<Domain>/` 에 작성합니다. 이미지는 같은 폴더의 `_assets` 에 둡니다.
3. `yarn build` 로 두 로케일이 모두 빌드되는지 확인합니다 (`onBrokenLinks: 'throw'` 설정이라 깨진 링크는 빌드 실패로 잡힙니다).
4. 커밋·푸시 후 `main` 으로 Pull Request를 엽니다.

---

## 라이선스

[Creative Commons Attribution 4.0 International](LICENSE). 출처를 표기하면 자유롭게 공유·변경할 수 있습니다. 원저작자: [adavoudi](https://github.com/adavoudi).
