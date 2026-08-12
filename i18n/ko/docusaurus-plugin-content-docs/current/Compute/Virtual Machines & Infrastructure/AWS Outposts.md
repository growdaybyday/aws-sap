# AWS Outposts

## 1. 소개

**AWS Outposts**는 거의 모든 온프레미스나 엣지 위치에 네이티브 AWS 서비스, 인프라, 운영 모델을 가져오도록 설계된 완전관리형 서비스입니다. Outposts는 조직이 낮은 지연 시간, 로컬 데이터 처리, 또는 데이터 레지던시 요구사항이 있는 애플리케이션을 구축·운영하면서도 AWS 서비스의 전체 범위를 그대로 활용할 수 있게 합니다. AWS를 데이터센터로 확장함으로써 온프레미스와 클라우드 환경 사이의 일관성을 얻게 되어, 하이브리드 아키텍처가 단순해지고 애플리케이션 마이그레이션이 쉬워집니다.

![aws-outpost](@site/docs/Compute/_assets/aws-outpost.png)

아래는 AWS Outposts Rack의 이미지입니다.

![outpost-rack](@site/docs/Compute/_assets/outpost-rack.png)

AWS Outposts는 AWS 인프라, 서비스, API, 도구를 온프레미스 환경으로 확장합니다. AWS가 관리하는 컴퓨팅·스토리지 용량에 로컬로 접근할 수 있게 해, 낮은 지연 시간과 로컬 데이터 처리가 필요한 애플리케이션을 AWS 리전과 일관된 경험으로 실행할 수 있게 합니다.

## 2. 배포와 물리적 구성 요소

- **Outpost 사이트:** 특정 전력, 네트워킹, 시설 요구사항을 충족하는 고객 관리 시설입니다.
- **Outpost 장비:** AWS가 소유하고 관리하는 물리적 하드웨어(랙, 서버, 스위치, 케이블링)입니다.
- **Outposts Rack:** AWS 하드웨어로 미리 구성된 업계 표준 42U 랙입니다.
- **Outposts ACE Rack:** 4개 이상의 컴퓨팅 랙을 배포할 때 네트워크 집계 지점으로 사용되는 Aggregation, Core, Edge(ACE) 랙으로, 네트워킹 복잡성을 줄여 줍니다.
- **Outposts Server:** 공간이나 용량이 제한된 사이트를 위한 더 작은 폼팩터(1U 또는 2U 서버)입니다.

## 3. 연결과 통합

- **Service Link:** Outpost를 연관된 AWS 리전에 연결하는 전용 네트워크 경로로, AWS 서비스와 매끄러운 통합을 가능하게 합니다.
- **Local Gateway와 Local Network Interface:** Outpost와 온프레미스 네트워크 사이의 통신을 보장해 낮은 지연 시간과 안전한 데이터 전송을 유지합니다.

## 4. AWS 리소스 배포

Outposts에는 컴퓨팅(Amazon EC2, ECS 클러스터, EKS 노드), 데이터베이스(Amazon RDS, ElastiCache, EMR), 네트워킹(VPC 서브넷, Application Load Balancer, Route 53), 스토리지(Amazon EBS 볼륨, S3 버킷) 등 다양한 AWS 리소스를 배포할 수 있습니다. 이를 통해 데이터와 애플리케이션에 가까운 곳에서 낮은 지연 시간의 하이브리드 워크로드를 실행할 수 있습니다.

## 5. 관리와 소유

AWS Outposts는 하드웨어 유지 관리, 소프트웨어 패치, 인프라 모니터링을 포함해 AWS가 완전히 관리합니다. Outposts를 주문한 계정의 소유자가 설치, 업데이트, 지원의 주 연락처 역할을 합니다.

## 6. AWS Outposts vs. AWS Snow Family

데이터센터나 콜로케이션에 AWS를 매끄럽고 영구적으로 확장하고, 온프레미스에서 EC2/EBS와 네이티브 AWS 서비스 전체를 사용하고자 하며, AWS 리전과의 안정적인 연결이 있다면 AWS Outposts를 선택하세요.

오프라인 데이터 마이그레이션(예: 테라바이트에서 페타바이트 규모의 데이터)이 필요하거나, 연결이 끊긴 환경에서 경량 엣지 컴퓨팅이 필요하며 디바이스를 왕복으로 배송할 수 있는 상황이라면 AWS Snow Family를 선택하세요.

## 7. 요금 모델

AWS Outposts의 요금은 선택한 구성(랙 또는 서버), 계약 기간, 결제 옵션에 따라 달라집니다. 하드웨어 배송, 설치, 유지 관리, Outpost와 AWS 리전 간 데이터 전송에 대한 요금이 포함됩니다.

## 8. 결론

AWS Outposts는 AWS의 안정성과 확장성을, 로컬 온프레미스 배포의 이점과 결합하려는 조직을 위해 설계되었습니다. 온프레미스와 클라우드 양쪽에서 일관된 AWS 경험을 제공함으로써 Outposts는 하이브리드 클라우드 아키텍처를 단순화하고, 낮은 지연 시간 요구사항을 충족하며, 데이터 레지던시 규정 준수를 보장합니다. 더 자세한 기술 정보와 운영 가이드는 AWS의 공식 문서와 백서를 참고하세요.

더 자세한 내용은 [공식 페이지](https://aws.amazon.com/outposts/)를 참고하세요.
