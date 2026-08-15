# Amazon EventBridge

## 1. 소개
이전에는 CloudWatch Events로 알려졌던 Amazon EventBridge는 여러 AWS 서비스, 파트너 애플리케이션, 커스텀 이벤트를 통합할 수 있는 강력한 이벤트 버스 역할을 합니다. 일정에 따라, 특정 이벤트에 대응해, 또는 둘 다에 대해 환경의 변화를 탐지하고 AWS 인프라에서 작업을 트리거하는 방법을 제공합니다.

## 2. 이벤트 버스

![eventbridge](@site/docs/Application%20Integration/_assets/eventbridge.png)

EventBridge는 모든 종류의 알림, 상태 변화, 예약된 간격을 위한 중앙화된 허브로 작동합니다. 이벤트는 AWS 서비스, 서드파티 SaaS(Software as a Service) 파트너, 또는 자체 커스텀 애플리케이션에서 발생할 수 있습니다. 이벤트가 버스에 배치되면 어떻게, 어디로 라우팅될지에 대한 완전한 제어권을 갖습니다.

### 2.1. 기본 이벤트 버스
기본 이벤트 버스는 계정에서 AWS 서비스가 발생시키는 이벤트를 자동으로 캡처합니다. 예를 들어 EC2 인스턴스가 성공적으로 시작되거나 IAM 루트 사용자가 콘솔에 로그인하는 것 같은 특정 조건에 주의를 기울이는 규칙을 설정할 수 있습니다. 이벤트 기준이 일치하면 EventBridge는 선택한 대상(일반적으로 알림을 위한 SNS 토픽이나 자동화된 워크플로를 위한 Lambda 함수)을 호출합니다.

### 2.2. 파트너 이벤트 버스
기본 버스 외에도 EventBridge는 선택된 SaaS 파트너 솔루션과 통합해 계정으로 그들의 이벤트 스트림을 네이티브로 수집합니다. Datadog나 Zendesk 같은 서드파티 서비스를 사용한다면 그 플랫폼들은 전용 파트너 이벤트 버스에 이벤트를 게시할 권한을 부여받을 수 있습니다. 그런 다음 그 외부 시스템에서 무언가가 발생할 때마다 실시간으로 대응하는 규칙을 만들 수 있습니다.

### 2.3. 커스텀 이벤트 버스
커스텀 이벤트 버스도 지원되어, 자체 애플리케이션이나 마이크로서비스가 이벤트를 게시할 수 있게 합니다. 이 설계는 명확한 관심사 분리를 제공합니다: 하나의 버스는 표준 AWS 서비스 이벤트를 처리하고, 다른 버스는 내부 앱 신호 전용으로 예약될 수 있습니다. 게시되면 이 이벤트들은 기본 버스에서 사용 가능한 것과 동일한 필터링과 대상 기능의 이점을 누립니다.
## 3. 이벤트 패턴과 규칙

![eventbridge-rule](@site/docs/Application%20Integration/_assets/eventbridge-rule.png)

EventBridge를 사용하면 필터 역할을 하는 세밀한 이벤트 패턴을 정의할 수 있습니다. 어떤 소스에서든 이벤트가 지정된 속성과 일치하면 EventBridge는 그 이벤트를 관련 대상으로 라우팅합니다. 예를 들어 이 메커니즘을 사용하면 다음이 가능합니다.

- IAM 루트 사용자 로그인을 모니터링하고 SNS를 통해 실시간 알림을 보냅니다.
- CodeBuild의 빌드 실패를 개선 Lambda를 호출해 처리합니다.
- Amazon S3에 대한 업로드를 탐지하고 객체를 자동으로 처리합니다.

각 이벤트를 설명하는 JSON 객체는 시간, 서비스별 세부 사항, 리전 등의 메타데이터를 포함합니다. 규칙에서 필요한 부분만 필터링하거나 통과시킬 수 있는 완전한 제어권을 가집니다.

## 4. 리소스 기반 정책과 크로스 계정 접근

![eventbridge-cross-account](@site/docs/Application%20Integration/_assets/eventbridge-cross-account.png)

리소스 기반 정책을 사용하면 각 이벤트 버스에 세밀한 접근 제어를 설정할 수 있어, 다른 AWS 계정(또는 특정 principal)이 여러분의 버스에 이벤트를 게시할 수 있게 합니다. 이는 지정된 관리 계정의 중앙 이벤트 버스로 로그나 알림을 통합할 때 특히 유용합니다. 선택된 계정이나 조직 단위에 권한을 부여하는 정책을 구성해 `PutEvents`를 통해 이벤트를 보낼 수 있게 합니다.

## 5. 이벤트 아카이빙과 재생
![eventbridge-archive-replay](@site/docs/Application%20Integration/_assets/eventbridge-archive-replay.png)

문제 해결이나 규정 준수를 위해 특히 많은 시나리오에서 들어오는 이벤트를 보존하고 싶을 수 있습니다. EventBridge는 필터에 따라 모든 이벤트 또는 일부 하위 집합을 아카이빙할 수 있습니다. 무기한 또는 시간 제한이 있는 보존은 필요할 때마다 이벤트를 재생할 수 있게 해줍니다 — 대상의 버그를 수정하거나 업데이트된 로직으로 데이터를 재처리할 때 유용합니다.

## 6. 스키마 레지스트리

![eventbridge-schema-reg](@site/docs/Application%20Integration/_assets/eventbridge-schema-reg.png)

이벤트의 구조를 관리하는 데 도움이 되도록 EventBridge는 버스를 통과하는 이벤트의 스키마를 자동으로 발견하고 추론하는 스키마 레지스트리를 제공합니다. 이 레지스트리는 버전 관리되어 애플리케이션이 이벤트 형식의 점진적인 변화를 따라갈 수 있도록 보장합니다. 개발자는 이 스키마를 기반으로 Java나 Python 같은 언어의 코드 바인딩을 다운로드할 수 있어, 이벤트 데이터를 더 쉽게 파싱하고 처리할 수 있습니다.

## 7. 결론

Amazon EventBridge는 AWS 생태계 안팎에서 수많은 트리거에 시기적절하게 대응할 수 있는 강력한 이벤트 기반 아키텍처 기능을 AWS에 제공합니다. 이벤트 패턴, 일정, 다양한 대상 통합, 크로스 계정 정책을 통해 복잡함을 최소화하고 운영 오버헤드를 줄이는 포괄적이고 반응형인 솔루션을 만들 수 있습니다. 내장된 아카이빙과 스키마 레지스트리는 거버넌스와 라이프사이클 관리를 더욱 단순화합니다. 이러한 기능을 활용하면 마이크로서비스, 서버리스 워크플로, 엔터프라이즈 규모 통합에 적합한 복원력 있고 분리된 시스템을 만들 수 있습니다.

더 자세한 지침, 코드 예제, 모범 사례는 공식 AWS 문서를 참고하세요.

- [Amazon EventBridge란?](https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html)
- [Amazon EventBridge의 이벤트 버스](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html)
- [Amazon EventBridge의 규칙](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html)
- [Amazon EventBridge 가격 정책](https://aws.amazon.com/eventbridge/pricing/)
