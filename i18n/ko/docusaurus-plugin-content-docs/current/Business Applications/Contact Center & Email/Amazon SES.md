# Amazon Simple Email Service(SES)

## 1. 소개

Amazon SES는 기업과 개발자가 자체 검증된 이메일 주소와 도메인을 사용해 이메일을 보내고 받을 수 있게 해주는 클라우드 기반 이메일 플랫폼입니다. Amazon.com이 사용하는 것과 동일하게 고도로 확장 가능하고, 신뢰할 수 있고, 비용 효율적인 인프라 위에 구축되어, 이메일 서버 관리가 아니라 고객 참여에 집중할 수 있습니다.

## 2. 핵심 기능

Amazon SES는 대량과 개별 이메일 모두를 안전하고 신뢰성 있게 보낼 수 있게 해줍니다. 비밀번호 재설정 같은 트랜잭션 메시지든 수천 명의 사용자를 위한 마케팅 캠페인이든, 서비스는 원활하게 확장됩니다.

![ses-arch](@site/docs/Business%20Applications/_assets/ses-arch.png)

- **비용 효율적이고 확장 가능:**
    선불 요금 없이 보내고 받은 이메일 양을 기반으로 비용을 지불합니다. 서비스는 대용량 수요를 충족하기 위해 자동으로 확장되며, EC2 사용자는 하루 최대 2,000개 이메일의 무료 티어 혜택까지 누릴 수 있습니다.
    
- **유연한 전송 옵션:**
    테스트를 위한 AWS Management Console, 레거시 시스템이나 커스텀 소프트웨어와의 통합을 위한 SMTP 인터페이스, 또는 Amazon SES API(API v1과 더 새로운 API v2 모두 사용 가능)를 통해 직접 이메일을 보낼 수 있습니다.
    
- **이메일 수신과 처리:**
    발송 외에도 Amazon SES는 이메일을 받을 수 있게 해줍니다. 구성 가능한 수신 규칙과 IP 주소 필터를 통해 (메시지를 S3 버킷, SNS 토픽, 또는 Lambda 함수로 라우팅하는 것 같은) 수신 메일을 처리하고 고급 이메일 처리 워크플로를 구축할 수 있습니다.
    
- **높은 전달률과 인증:**
    Amazon SES는 SPF, (Route 53을 통한 Easy DKIM을 포함한) DKIM, DMARC 같은 업계 표준 인증 방법을 지원합니다. 이 기능들은 이메일이 스팸으로 표시되지 않고 수신자의 받은 편지함에 도달하도록 보장하는 데 도움을 줍니다.
    
- **모니터링과 보고:**
    CloudWatch, CloudTrail, (GetSendStatistics 같은) 상세한 API 작업 같은 통합 도구를 통해 발송 활동을 모니터링하고, 반송과 불만을 추적하고, 그에 따라 이메일 전략을 조정할 수 있습니다.

## 3. 대량 이메일과 트랜잭션 이메일

![ses-send](@site/docs/Business%20Applications/_assets/ses-send.png)

- **대용량 발송**: 내장된 확장을 통해 광범위한 인프라 관리 없이도 대량의 이메일을 보낼 수 있습니다.
- **전달 분석**: 전달, 열람, 반송, 불만을 추적해 청중과 참여하는 방식과 시기를 개선합니다.

## 4. IP 주소 관리

![ses-ip](@site/docs/Business%20Applications/_assets/ses-ip.png)

- **공유 IP**: 다른 SES 고객과 발송 IP 주소를 공유하는 소규모 워크로드나 시작하는 경우에 완벽합니다.
- **전용 IP**: 발신자 평판에 대한 엄격한 제어를 원하는 대용량 시나리오에 이상적입니다.
- **고객 소유 IP**: 이미 신뢰할 수 있는 IP 주소 풀을 가지고 있다면 SES는 완전한 제어를 유지할 수 있도록 이를 통합할 수 있습니다.

> **시험 팁:** 조직이 (비밀번호 재설정 같은) 중요한 트랜잭션 이메일과 프로모션 캠페인을 모두 처리한다면, 별도의 IP 풀과 구성 세트를 사용하는 것을 고려하세요. 이 전략은 마케팅 관련 반송이나 불만이 트랜잭션 이메일 평판에 부정적인 영향을 미치는 것을 방지합니다.

## 5. 평판 대시보드

![ses-rep-dash](@site/docs/Business%20Applications/_assets/ses-rep-dash.png)

받은 편지함 제공자가 이메일을 어떻게 받는지 모니터링하는 것은 매우 중요합니다. 내장된 평판 대시보드는:

- 반송과 불만 지표를 표시합니다.
- 잠재적인 전달 가능성 문제를 식별합니다.
- 발신자 평판을 보호하기 위한 모범 사례를 장려합니다.

## 6. 구성 세트와 이벤트 대상

SES의 구성 세트는 특정 카테고리의 이메일에 대한 지표를 그룹화하고 추적하는 방법을 제공합니다. 이는 다음에 특히 유용합니다.

- **전달 가능성 분석**: 이메일이 열렸는지, 반송되었는지, 스팸으로 신고되었는지에 대한 통찰을 얻습니다.
- **다중 채널 알림**: 추가 처리를 위해 반송과 불만 이벤트를 외부 서비스로 라우팅합니다.

구성 세트 내에서 하나 이상의 이벤트 대상을 정의합니다.

1. **Amazon Kinesis Data Firehose**
    거의 실시간으로 이메일 지표를 캡처해 다음을 가능하게 합니다.
    - 데이터를 Amazon S3, Amazon Redshift, 또는 Amazon OpenSearch Service로 직접 스트리밍합니다.
    - Amazon Kinesis Data Analytics 같은 서비스를 사용해 클릭률과 열람 지표를 발생하는 즉시 시각화합니다.

2. **Amazon SNS**
    반송과 불만에 대한 즉각적인 알림을 제공합니다. 이 신속한 피드백 루프는 사용자 구독 취소나 마케팅 캠페인 조정 같은 자동화된 워크플로를 트리거할 수 있습니다.

또한 구성 세트는 트랜잭션 메시지를 마케팅이나 대량 이메일과 분리할 수 있게 해주는 **IP Pool Management**를 지원합니다. 이 분리는 서로 다른 사용 사례에 대해 별개의 평판을 유지하는 데 도움을 줍니다.

## 7. 일반적인 아키텍처와 데이터 흐름

![ses-sample-arch](@site/docs/Business%20Applications/_assets/ses-sample-arch.png)

1. Amazon SES는 기본 [구성 세트](https://docs.aws.amazon.com/ses/latest/dg/using-configuration-sets.html)를 사용해 Amazon Kinesis Data Firehose로 [이메일 발송 이벤트를 게시합니다](https://docs.aws.amazon.com/ses/latest/dg/monitor-using-event-publishing.html).
2. Amazon Kinesis Data Firehose 전달 스트림은 대상 버킷으로 알려진 Amazon Simple Storage Service(Amazon S3) 버킷에 이벤트 데이터를 저장합니다.
3. AWS Glue DataBrew는 대상 버킷의 이벤트 데이터를 처리하고 변환합니다. 소스 데이터셋에 [레시피](https://docs.aws.amazon.com/databrew/latest/dg/recipes.html)에 정의된 변환을 적용하고 같은 버킷 내 다른 접두사('/partitioned')를 사용해 출력을 저장합니다. 출력 객체는 [Apache Parquet 형식으로 저장되고 파티션이 지정됩니다](https://docs.aws.amazon.com/databrew/latest/dg/jobs.recipe.html).
4. AWS Lambda 함수는 결과 출력 객체를 집계 버킷으로 복사합니다. Lambda 함수는 대상 버킷에 객체가 생성될 때 [Amazon S3 이벤트 알림을 통해 비동기적으로](https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html) 호출됩니다.
5. AWS Glue 크롤러는 스키마를 결정하고 AWS Glue Data Catalog의 테이블 파티션을 업데이트하기 위해 집계 버킷에 저장된 이벤트 데이터에 대해 [주기적으로 실행됩니다](https://docs.aws.amazon.com/glue/latest/dg/crawler-running.html).
6. Amazon Athena는 표준 SQL을 사용해 AWS Glue Data Catalog에 등록된 이벤트 데이터 테이블을 쿼리합니다.
7. Amazon QuickSight 대시보드는 Amazon Athena 데이터 소스와의 통합을 통해 이벤트 데이터를 대화형으로 시각화할 수 있게 해줍니다.

> 출처: [AWS 분석 서비스로 이메일 참여 추적하기](https://aws.amazon.com/blogs/messaging-and-targeting/tracking-email-engagement-with-aws-analytics-services/)
## 7. 결론

Amazon SES는 철저한 지표와 유연한 통합 지점을 제공하면서 대용량 이메일 작업을 관리하기 위한 견고한 플랫폼을 제공합니다. 구성 세트, 이벤트 대상, IP 풀 관리를 활용함으로써 이메일 전달 가능성을 최적화하고, 실행 가능한 통찰을 수집하고, 서로 다른 메시지 유형에 대해 별개의 평판을 유지할 수 있습니다.

더 자세한 내용은 다음의 공식 AWS 자료를 참고하세요.

- [Amazon SES 개발자 가이드](https://docs.aws.amazon.com/ses/latest/dg/)
- [Amazon SES API 레퍼런스(v1과 v2)](https://docs.aws.amazon.com/ses/latest/APIReference/)
- [Amazon SES 모범 사례](https://docs.aws.amazon.com/ses/latest/dg/ses-best-practices.html)
- [AWS에서 HIPAA 보안과 규정 준수 아키텍처링하기(SES 포함)](https://docs.aws.amazon.com/whitepapers/latest/architecting-hipaa-security-and-compliance-on-aws/amazon-simple-email-service-ses.html)
