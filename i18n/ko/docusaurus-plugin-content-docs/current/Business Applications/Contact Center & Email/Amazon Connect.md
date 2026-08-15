# Amazon Connect

## 1. 소개

**Amazon Connect**는 설정이 쉽고, 확장 가능하고, 비용 효율적으로 설계된 AWS의 클라우드 기반 콘택트 센터 솔루션입니다. 조직이 음성, 채팅, 다른 채널을 지원하는 옴니채널 콘택트 센터를 신속하게 시작할 수 있게 해주면서 AI와 머신 러닝을 통합해 고객 상호 작용을 향상시킵니다. 사용한 만큼 지불하는 가격 정책 모델과 완전관리형 인프라를 통해 Amazon Connect는 선불 투자와 온프레미스 하드웨어의 필요성을 최소화합니다.
## 2. 핵심 기능과 역량

![amazon-connect](@site/docs/Business%20Applications/_assets/amazon-connect.png)

- **옴니채널 고객 경험:**
    Amazon Connect는 음성과 웹 채팅 상호 작용을 위한 통합 인터페이스를 제공합니다. (대화형 봇을 위한 Amazon Lex, 커스텀 로직을 위한 AWS Lambda, 메시징을 위한 Amazon Pinpoint 같은) 다른 AWS 서비스와 원활하게 통합되어 기능을 확장하고 개인화된 고객 경험을 전달합니다.

- **AI와 분석 통합:**
    
    - **Contact Lens for Amazon Connect:** 고급 자연어 처리를 사용해 통화 녹취록을 분석하고, 감정을 측정하고, 심지어 민감한 정보를 자동으로 삭제합니다.
    - **Amazon Q in Connect:** 응답 시간과 서비스 품질을 개선하기 위해 상담원에게 실시간 생성형 AI 지원을 제공합니다.
    - 내장된 지표와 보고는 관리자가 거의 실시간으로 핵심 성과 지표를 모니터링하는 데 도움을 줍니다.

- **API와 확장성:**
    Amazon Connect는 개발자가 콘택트 센터를 기존 CRM 시스템, 데이터 레이크, 서드파티 애플리케이션과 통합할 수 있게 해주는 광범위한 API(그리고 Amazon Connect Streams API 같은 SDK)를 갖춘 개방형 플랫폼입니다.

- **확장성과 유연성:**
	이 서비스는 소수의 상담원부터 수천 명까지 확장할 수 있으며 스킬 기반 라우팅, 태스크 관리, 상세한 컨택트 흐름 커스터마이징 같은 고급 기능을 지원합니다 — 모두 웹 기반 관리 콘솔을 통해 관리됩니다.

- **보안과 규정 준수:**
	보안은 처음부터 내장되어 있습니다. Amazon Connect는 시그널링과 미디어 트래픽 모두를 보호하기 위해 업계 표준 TLS와 SRTP를 사용합니다. 고도로 규제된 산업의 경우 AWS는 프라이빗 연결을 설정하고 규정 준수 요구 사항을 충족하는 데 도움이 되는 추가 백서(Amazon Connect를 위한 AWS Direct Connect 등)를 제공합니다.

## 3. 아키텍처와 통합

- **콘택트 센터 아키텍처:**
    Amazon Connect의 아키텍처는 단순함과 통합을 위해 설계되었습니다. 웹 기반 상담원 데스크톱(Contact Control Panel)과 통화 경로 및 디지털 상호 작용의 생성과 커스터마이징을 가능하게 하는 고도로 유연한 컨택트 흐름 편집기를 제공합니다.

- **데이터 레이크 통합:**
    더 깊은 통찰을 위해 데이터를 활용하고자 하는 조직의 경우 [Amazon Connect 데이터 레이크 모범 사례](https://docs.aws.amazon.com/whitepapers/latest/amazon-connect-data-lake-best-practices/amazon-connect.html) 백서는 (컨택트 추적 레코드, 통화 녹음, 컨택트 흐름 로그 같은) 다양한 데이터 유형을 Amazon S3에 중앙화하는 방법을 설명합니다. 이 통합은 고급 분석, 머신 러닝, 실시간 대시보드를 지원합니다.
    
- **연결 옵션:**
    고객이 퍼블릭 인터넷에 의존하는 대신 프라이빗하고 신뢰할 수 있는 연결이 필요하다면 [Amazon Connect를 위한 AWS Direct Connect](https://docs.aws.amazon.com/whitepapers/latest/aws-direct-connect-for-amazon-connect/technical-overview.html) 백서는 물리적 교차 연결, 통신사 상호 연결, 또는 데이터 센터 상호 연결을 통해 전용 연결을 설정하는 방법을 설명합니다.

## 4. 사용 사례와 비즈니스 이점

- **비용 효율성과 ROI:**
    [Amazon Connect 데이터 레이크 모범 사례](https://docs.aws.amazon.com/whitepapers/latest/amazon-connect-data-lake-best-practices/amazon-connect.html) 백서에서 참조된 연구에 따르면, 고객들은 (클라우드 기술과 구독 비용 절감을 포함한) 상당한 비용 절감과 향상된 상담원 생산성을 실현해 최대 241%의 ROI를 달성했습니다.
    
- **모든 규모를 위한 확장성:**
    소규모 비즈니스이든 수만 명의 상담원을 가진 엔터프라이즈이든 Amazon Connect는 추가 인프라 투자 없이도 수요를 충족하기 위해 자동으로 확장됩니다.
    
- **향상된 고객 경험:**
    AI 기반 분석과 실시간 데이터 통찰을 통합함으로써 조직은 문제를 신속하게 식별하고 해결하고, 상담원 성과를 최적화하고, 궁극적으로 더 개인화되고 효율적인 고객 서비스 경험을 전달할 수 있습니다.

## 5. 결론

더 자세한 내용과 최신 업데이트는 다음의 자료를 참고하세요.

- [Amazon Connect를 위한 AWS Direct Connect](https://docs.aws.amazon.com/whitepapers/latest/aws-direct-connect-for-amazon-connect/technical-overview.html)
- [Amazon Connect 데이터 레이크 모범 사례](https://docs.aws.amazon.com/whitepapers/latest/amazon-connect-data-lake-best-practices/amazon-connect.html)
