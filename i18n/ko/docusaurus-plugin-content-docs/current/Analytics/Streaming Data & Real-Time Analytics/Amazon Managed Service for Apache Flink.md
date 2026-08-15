# Amazon Managed Service for Apache Flink

## 1. 소개

오늘날의 데이터 중심 환경에서 조직은 즉각적인 통찰을 얻고 시기적절한 결정을 내리기 위해 실시간으로 데이터를 변환하고 분석해야 합니다. Amazon Managed Service for Apache Flink(AMSAF)는 대규모로 Apache Flink 애플리케이션을 실행하기 위한 완전관리형 서버리스 환경을 제공합니다. 클러스터를 프로비저닝, 관리, 확장하는 운영 오버헤드를 없애줌으로써 AMSAF는 견고한 스트림 처리 로직을 만드는 데 집중할 수 있게 해줍니다.
## 2. Apache Flink 개요

Apache Flink는 상태 기반 스트림 처리와 복잡한 이벤트 처리를 위해 설계된 오픈소스 엔진입니다. 낮은 지연 시간과 높은 처리량으로 데이터 스트림의 지속적인 계산을 가능하게 합니다. Flink는 Java, Scala, Python, SQL을 포함한 여러 프로그래밍 언어를 지원하며, 고수준 SQL/Table API부터 저수준 DataStream API까지 다양한 API를 제공해 애플리케이션에 맞는 올바른 추상화를 선택할 수 있습니다. 정확히 한 번의 상태 일관성, 고급 윈도우 처리, 체크포인트와 세이브포인트를 통한 내결함성 같은 기능을 통해 Apache Flink는 반응적이고 확장 가능한 실시간 애플리케이션 구축에 널리 채택되고 있습니다.

## 3. Amazon Managed Service for Apache Flink 개요

![managed-flink](@site/docs/Analytics/_assets/managed-flink.png)

Amazon Managed Service for Apache Flink는 기본 인프라를 관리할 필요 없이 Apache Flink 애플리케이션을 구축, 배포, 실행할 수 있게 해주는 완전관리형 서비스입니다. 이전에는 Amazon Kinesis Data Analytics for Apache Flink로 알려졌던 이 서비스는 서버 프로비저닝, 용량 계획, 클러스터 관리를 추상화합니다. 핵심 이점은 다음을 포함합니다.

- **서버리스와 완전관리형:**
    서버나 클러스터를 수동으로 프로비저닝할 필요가 없습니다. AWS는 Amazon KPU(각 KPU는 1 vCPU와 4GB 메모리를 제공)를 사용해 자동으로 리소스 확장을 처리하고 상태 관리를 위해 KPU당 50GB의 애플리케이션 스토리지를 제공합니다.
    
- **유연한 API 지원:**
    세밀한 제어를 위한 Apache Flink DataStream API, 더 높은 수준의 추상화를 위한 Table API/SQL, 또는 신속한 프로토타이핑과 애드혹 분석을 위한 AMSAF Studio를 통한 대화형 노트북을 사용해 애플리케이션을 개발할 수 있습니다.
    
- **내결함성과 정확히 한 번 시맨틱:**
    내장된 체크포인트와 스냅샷 메커니즘은 애플리케이션이 정확히 한 번 처리 시맨틱을 유지하면서 장애로부터 원활하게 복구될 수 있도록 보장합니다.
    
- **통합된 생태계:**
	AMSAF는 Amazon Kinesis Data Streams, Amazon Managed Streaming for Apache Kafka(MSK), Amazon S3, DynamoDB, Amazon OpenSearch Service 같은 서비스를 위한 사전 구축된 커넥터와 함께 제공되어, 손쉽게 엔드투엔드 스트리밍 파이프라인을 구축할 수 있게 해줍니다.
## 4. 핵심 사용 사례

AMSAF는 다양한 실시간 데이터 처리 시나리오를 지원하도록 설계되었습니다. 일반적인 사용 사례는 다음을 포함합니다.

- **스트리밍 ETL:**
    데이터 레이크나 웨어하우스로 로드하기 전에 (IoT 센서 출력이나 웹 클릭스트림 같은) 원시 데이터를 지속적으로 수집, 정리, 강화, 변환합니다.
    
- **지속적인 지표 생성:**
    스트리밍 데이터를 거의 실시간에 가깝게 집계해 시계열 분석과 실시간 리더보드를 계산합니다.
    
- **반응형 실시간 분석:**
    특정 임계값이 위반될 때 즉각적인 알림이나 통지를 트리거하기 위해 (API 성공률 같은) 핵심 성과 지표를 모니터링합니다.
    
- **대화형 데이터 탐색:**
    라이브 데이터 스트림에 대한 애드혹 쿼리를 실행하기 위해 AMSAF Studio 노트북을 사용해, 신속한 프로토타이핑, 디버깅, 시각화를 용이하게 합니다.
    

> **시험 팁:** 어떤 데이터 소스가 지원되는지에 대한 지식을 테스트하는 문제가 나올 수 있습니다. AMSAF는 Amazon Kinesis Data Streams와 MSK와 통합되지만 Amazon Kinesis Data Firehose와는 직접 통합되지 않는다는 점을 기억하세요.

## 5. 아키텍처 하이라이트

Amazon Managed Service for Apache Flink 솔루션의 아키텍처는 높은 확장성, 내결함성, 다른 AWS 서비스와의 원활한 통합을 제공하도록 설계되었습니다. 핵심 구성 요소는 다음을 포함합니다.

- **스트리밍 데이터 소스:**
    데이터는 Amazon Kinesis Data Streams나 Amazon MSK 같은 소스에서 수집됩니다.
    
- **Flink 애플리케이션 환경:**
    Apache Flink의 API를 사용해 작성된 애플리케이션이 관리형 환경에서 실행됩니다. AWS는 자동으로 컴퓨팅 리소스를 프로비저닝하고 들어오는 데이터의 양과 복잡성에 따라 확장합니다.
    
- **체크포인트와 스냅샷:**
    내결함성을 보장하기 위해 AMSAF는 자동으로 애플리케이션 상태의 주기적인 체크포인트를 수행합니다. 이 체크포인트는 세이브포인트(수동으로 트리거되는 백업)와 함께 애플리케이션이 정확히 한 번 보장으로 장애로부터 복구될 수 있게 해줍니다.
    
- **통합된 커넥터:**
    사전 구축된 커넥터는 처리된 데이터를 유지하거나 분석 대시보드를 공급하기 위해 다운스트림 시스템(예: Amazon S3, DynamoDB)과의 쉬운 통합을 가능하게 합니다.

다음 다이어그램은 간소화된 데이터 흐름을 보여줍니다.
```mermaid
flowchart LR
    A[Kinesis Data Streams / MSK] --> B[Amazon Managed Service for Apache Flink]
    B --> C[Custom Transformations]
    C --> D["Analytics or Storage (e.g. S3, DynamoDB)"]
```

## 6. 배포와 운영

AMSAF의 주요 이점 중 하나는 AWS가 많은 부분을 처리해준다는 것입니다.

- **자동 확장:**
    서비스는 데이터 처리량과 처리 복잡성에 맞춰 KPU 수를 동적으로 조정해, 수동 개입 없이 최적의 성능을 보장합니다.
    
- **관리형 인프라:**
    AWS는 기본 컴퓨팅 리소스를 프로비저닝하고 유지 관리하며, 여러 가용 영역에 애플리케이션을 분산하고, 소프트웨어 업데이트와 패치 같은 일상적인 작업을 처리합니다.
    
- **모니터링과 관리:**
    Apache Flink Dashboard와 AWS CloudWatch와 통합되어 AMSAF는 실시간 모니터링, 로깅, 지표를 제공해, 애플리케이션 성능을 추적하고 문제를 효과적으로 해결할 수 있게 해줍니다.
## 7. 개발 접근 방식과 API 옵션

개발자는 AMSAF로 애플리케이션을 구축할 때 두 가지 주요 경로 중에서 선택할 수 있습니다.

1. **직접 애플리케이션 개발:**
    DataStream API나 Table API를 사용해 선호하는 언어(Java, Scala, Python)로 Apache Flink 코드를 작성합니다. 이 접근 방식은 CI/CD 파이프라인과 단위 테스트와의 통합에서 이점을 얻는 장기 실행 애플리케이션에 이상적입니다.
    
2. **관리형 Studio 노트북:**
    AMSAF Studio(Apache Zeppelin으로 구동)를 사용해 SQL, Python, 또는 Scala를 사용한 스트림 처리 애플리케이션을 대화형으로 개발하고 실행합니다. Studio 노트북은 프로덕션급 애플리케이션을 배포하기 전에 애드혹 데이터 탐색, 신속한 프로토타이핑, 대화형 디버깅에 뛰어납니다.

## 8. 보안, 통합, 확장성 고려 사항

- **IAM과 VPC 통합:**
    AMSAF는 데이터 소스와 싱크에 접근하기 위해 적절한 AWS Identity and Access Management(IAM) 역할이 필요합니다. Virtual Private Cloud(VPC)에서 실행되는 애플리케이션의 경우 기본적으로 인터넷 접근이 없다는 점에 유의하세요. 필요하면 추가 구성이 필요합니다.
    
- **데이터 거버넌스와 스키마 관리:**
    Flink DataStream 커넥터를 사용할 때는 스트리밍 파이프라인 전반에서 데이터 스키마를 관리하고 시행하기 위해 AWS Glue Schema Registry와 통합할 수 있습니다.
    
- **가격 정책과 청구:**
    애플리케이션이 소비하는 KPU와 스토리지에 대해서만 비용을 지불하며, 애플리케이션이 유휴 상태일 때도 최소 요금이 부과됩니다. 또한 애플리케이션이 상호 작용하는 모든 다운스트림 서비스에 대해서는 별도로 요금이 청구됩니다.

## 9. 시험 팁

- **지원되는 데이터 소스:**
    AMSAF의 지원 소스를 명확히 알아두세요. 이 서비스는 Amazon Kinesis Data Streams와 MSK와 작동하며, Amazon Kinesis Data Firehose와는 작동하지 않습니다.
    
- **내결함성 메커니즘:**
    정확히 한 번 처리 시맨틱을 보장하는 데 있어 체크포인트와 스냅샷의 역할을 이해하세요.
    
- **API 옵션과 개발 모델:**
    (DataStream이나 Table API를 사용해) IDE에서 직접 개발하는 것과 대화형 개발을 위해 Studio 노트북을 사용하는 것 사이의 차이를 숙지하세요.
    
- **확장과 리소스 프로비저닝:**
    AMSAF가 Amazon KPU로 자동으로 확장되는 방법과 리소스 할당에서 이 단위의 역할을 알아두세요.
## 10. 결론

Amazon Managed Service for Apache Flink는 최소한의 운영 오버헤드로 실시간 데이터 처리 파이프라인을 구축할 수 있게 해줍니다. 자동 확장, 내장된 내결함성, 원활한 AWS 통합 같은 관리형 기능을 활용함으로써, 즉각적인 통찰을 제공하고 비즈니스 결정을 이끄는 정교한 스트림 처리 로직을 만드는 데 집중할 수 있습니다.

더 자세한 내용과 애플리케이션 구축을 시작하려면 다음의 공식 문서를 탐색하세요.

- [Amazon Managed Service for Apache Flink 개요](https://aws.amazon.com/managed-service-apache-flink/)
- [AMSAF 개발자 문서](https://docs.aws.amazon.com/managed-flink/)
- [Flink Studio 노트북](https://aws.amazon.com/managed-service-apache-flink/studio/)
- [자주 묻는 질문(FAQ)](https://aws.amazon.com/managed-service-apache-flink/faqs/)

AMSAF로 실시간 데이터 스트림 처리의 힘을 받아들이고 조직이 규모에 맞게 데이터를 다루는 방식을 변화시키세요.
