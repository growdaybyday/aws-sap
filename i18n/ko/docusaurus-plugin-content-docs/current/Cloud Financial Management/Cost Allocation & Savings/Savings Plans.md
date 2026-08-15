# Savings Plans

## 1. 소개

Amazon Savings Plans는 1년 또는 3년 기간 동안 일관된 지출(시간당 달러로 측정)을 약정하는 대가로 AWS 컴퓨팅 사용에 대해 상당한 비용을 절감할 수 있게 해주는 유연한 가격 정책 모델입니다. 실제로 일단 약정하면 그 시간당 달러 금액까지의 모든 사용량은 온디맨드 가격에 비해 할인된 요율로 청구되며, 초과 사용량은 표준 온디맨드 요율로 청구됩니다. 워크로드와 유연성 요구에 따라 최대 72%의 절감을 달성할 수 있습니다.

## 2. Savings Plans의 유형

AWS는 세 가지 유형의 Savings Plans를 제공합니다: Compute Savings Plans, EC2 Instance Savings Plans, SageMaker AI Savings Plans.

### 2.1. Compute Savings Plans

**Compute Savings Plans**는 가장 큰 유연성을 제공하며 온디맨드 요율보다 최대 66% 할인된 가격을 제공합니다. 이 플랜들은 인스턴스 패밀리(예: m5, c5 등), 인스턴스 크기(예: c5.large, c5.xlarge 등), 리전(예: us-east-1, us-east-2 등), 운영체제(예: Windows, Linux 등), 또는 테넌시(예: Dedicated, default, Dedicated Host)와 관계없이 EC2 인스턴스 사용량에 자동으로 적용됩니다. 또한 Fargate와 Lambda 사용량에도 적용됩니다. Compute Savings Plans를 사용하면 워크로드를 c5에서 m5로 이동하거나, 사용량을 EU(아일랜드)에서 EU(런던)로 전환하거나, 애플리케이션을 Amazon EC2에서 Fargate를 사용하는 Amazon ECS로 언제든지 마이그레이션할 수 있습니다. 이러한 변경을 하면서도 계속 Compute Savings Plans가 제공하는 낮은 가격의 혜택을 누릴 수 있습니다.
### 2.2. EC2 Instance Savings Plans

**EC2 Instance Savings Plans**는 선택한 AWS 리전에서 특정 인스턴스 패밀리(예: 버지니아의 m5)에 대한 약정을 대가로 온디맨드 대비 최대 72%의 절감을 제공합니다. 이 플랜들은 리전 내 지정된 패밀리 내에서 인스턴스 크기(예: m5.xlarge, m5.2xlarge 등), OS(예: Windows, Linux 등), 테넌시(Host, Dedicated, Default)와 관계없이 사용량에 자동으로 적용됩니다.

EC2 Instance Savings Plan을 사용하면 인스턴스 유형 내에서 인스턴스 크기를 변경하거나(예: c5.xlarge에서 c5.2xlarge로), 운영체제를 변경하거나(예: Windows에서 Linux로), 또는 Dedicated 테넌시에서 Default로 이동하면서도 계속 EC2 Instance Savings Plan이 제공하는 할인된 요율을 받을 수 있습니다.
### 2.3. Amazon SageMaker Savings Plans

**SageMaker AI Savings Plans**는 온디맨드 요율보다 최대 64%의 절감을 제공합니다. 이 플랜들은 인스턴스 패밀리(예: ml.m5, ml.c5 등), 인스턴스 크기(예: ml.c5.large, ml.c5.xlarge 등), 리전(예: us-east-1, us-east-2 등), 구성 요소(예: Notebook, Training 등)와 관계없이 SageMaker AI 인스턴스 사용량에 자동으로 적용됩니다.

SageMaker AI Savings Plans를 사용하면 워크로드를 ml.c5에서 ml.m5로 이동하거나, 사용량을 유럽(아일랜드)에서 유럽(런던)으로 전환하거나, 사용량을 Training에서 Inference로 언제든지 마이그레이션하면서도 계속 혜택을 받을 수 있습니다.
### 2.4. 비교

다음은 Compute Savings Plans, EC2 Instance Savings Plans, SageMaker AI Savings Plans 간의 핵심 차이를 요약한 비교표입니다.

| **기능**                    | **Compute Savings Plans** 💻📊                                                                 | **EC2 Instance Savings Plans** 🖥️🔒                                                                 | **SageMaker AI Savings Plans** 🤖🧠                                                         |
|--------------------------------|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **절감(온디맨드 대비)**    | 최대 **66% 할인** 💸                                                                          | 최대 **72% 할인** 💰(가장 높은 할인)                                                            | 최대 **64% 할인** 📉                                                                         |
| **적용 가능 서비스**        | EC2, Fargate, Lambda 🖥️🚢λ                                                                   | EC2 전용 🖥️                                                                                        | SageMaker AI 인스턴스 🤖(노트북, 훈련, 추론)                                   |
| **약정 범위**           | **유연함** 🌐🔀(모든 서비스, 패밀리, 리전, 크기, OS, 테넌시)                            | 인스턴스 패밀리 + 리전에 **고정**됨 🔒(예: "버지니아의 m5")                                 | **유연함** 🌐🔀(모든 SageMaker 패밀리, 리전, 크기, 구성 요소)                            |
| **유연성**                |                                                                                               |                                                                                                     |                                                                                             |
| - **인스턴스 패밀리**          | 모든 패밀리 ✅(예: c5 → m5)                                                                 | 선택한 패밀리에 고정 ❌(예: m5만)                                                         | 모든 SageMaker 패밀리 ✅(예: ml.c5 → ml.m5)                                                |
| - **인스턴스 크기**            | 모든 크기 ✅(예: c5.large → c5.xlarge)                                                      | 패밀리 내 모든 크기 ✅(예: m5.large → m5.2xlarge)                                            | 모든 SageMaker 크기 ✅(예: ml.c5.large → ml.c5.xlarge)                                     |
| - **리전**                   | 모든 리전 ✅🌍                                                                                | 선택한 리전에 고정 ❌📍                                                                        | 모든 리전 ✅🌍                                                                               |
| - **OS/테넌시**               | 모든 OS/테넌시 ✅(Windows ↔ Linux, Dedicated ↔ Default)                                      | 패밀리/리전 내에서 OS/테넌시 변경 허용 ✅(예: Windows → Linux)                         | 해당 없음 ❌(OS/테넌시가 아닌 SageMaker 구성 요소에 적용)                                      |
| - **구성 요소/워크로드**       | EC2, Fargate, Lambda에 적용 ↔🔄                                                           | 해당 없음 ❌                                                                                             | 모든 구성 요소 ✅(Notebook ↔ Training ↔ Inference)                                           |
| **허용되는 변경**            | **어디로나** 마이그레이션 🔄🌐(패밀리, 리전, OS, 테넌시, 또는 서비스)                           | **패밀리/리전 내에서** 크기/OS/테넌시 변경 ↔🔄                                               | **자유롭게** 전환 🔄(패밀리, 리전, 구성 요소)                                               |

## 3. Savings Plans 작동 방식

Savings Plans는 1년 또는 3년 기간 동안 지정된 양의 컴퓨팅 파워(시간당 측정)를 사용하는 것을 약정하는 대가로 온디맨드 요율을 넘어서는 절감을 제공합니다.

Savings Plans는 AWS 사용에 대한 절감을 제공하는 유연한 가격 정책 모델을 제공합니다. AWS 컴퓨팅 워크로드에서 최대 72%까지 절감할 수 있습니다. Compute Savings Plans는 인스턴스 패밀리, 인스턴스 크기, OS, 테넌시, 또는 AWS 리전과 관계없이 Amazon EC2 인스턴스 사용량에 더 낮은 가격을 제공합니다. 이는 AWS Fargate와 AWS Lambda 사용량에도 적용됩니다. SageMaker AI Savings Plans는 인스턴스 패밀리, 인스턴스 크기, 구성 요소, 또는 AWS 리전과 관계없이 Amazon SageMaker AI 인스턴스 사용량에 더 낮은 가격을 제공합니다.

AWS Cost Explorer의 권장 사항, 성능 보고, 예산 알림을 사용해 플랜을 관리할 수 있습니다.

Savings Plans에 가입하면 사용에 대해 지불하는 가격은 플랜 기간 동안 동일하게 유지됩니다. **전액 선불**, **부분 선불**, 또는 **선불 없음** 지불 옵션을 사용해 약정에 대해 지불할 수 있습니다.

Savings Plans를 시작하려면 Cost Explorer를 활성화해야 합니다. Cost Explorer는 Savings Plans로 비용을 최적화하는 데 도움을 줍니다. Cost Explorer에서 과거 AWS 사용량을 기반으로 맞춤화된 구매 권장 사항에 접근하고, Savings Plans를 구매하고, 구매한 Savings Plans를 쉽게 관리할 수 있습니다.

Savings Plans를 보고, 분석하고, 관리하기 위해 AWS Billing and Cost Management 콘솔을 사용하기 전에 Cost Explorer에서 설정과 권한을 활성화하는 것으로 시작하세요.

## 4. 예약 인스턴스와의 비교

Compute Savings Plans는 Amazon EC2 예약 인스턴스(RI)와 마찬가지로 낮은 가격을 제공하는 유연한 가격 정책 모델이지만, 추가적인 유연성을 제공합니다. Savings Plans를 사용하면 특정 인스턴스 구성이 아니라 일관된 양의 컴퓨팅 사용량(시간당 $로 측정)을 약정함으로써 청구서를 줄일 수 있습니다. Savings Plans는 교환이나 수정을 수행할 필요 없이 낮은 가격으로 요구에 가장 적합한 컴퓨팅 옵션을 사용할 수 있는 유연성을 제공합니다.

Compute Savings Plans는 Convertible RI와 유사하게 온디맨드 대비 최대 66%의 절감을 제공합니다. Compute Savings Plans는 EC2 인스턴스 사용량, Fargate, Lambda에서 자동으로 비용을 절감해줍니다. EC2 Instance Savings Plans는 Standard RI와 유사하게 온디맨드 대비 최대 72%의 절감을 제공합니다. 또한 선택한 리전의 지정된 EC2 인스턴스 패밀리 내에서 모든 인스턴스 사용에 대해 자동으로 비용을 절감해줍니다.

| **기능/측면**                 | **Compute Savings Plans** | **EC2 Instance Savings Plans** | **Convertible RI**          | **Standard RI**          |
| ---------------------------------- | ------------------------- | ------------------------------ | ---------------------------- | ------------------------- |
| **온디맨드 대비 절감**         | 💰 최대 **66%**          | 💰 최대 **72%**               | 💰 최대 **66%**             | 💰 최대 **72%**          |
| **금전적 약정**            | ✅ 예                     | ✅ 예                          | ❌ 아니오                         | ❌ 아니오                      |
| **모든 인스턴스 패밀리에 적용** | ✅ **예**                 | ❌ 아니오                           | 🔄 수동 교환*          | ❌ 아니오                      |
| **모든 인스턴스 크기에 적용**   | ✅ **예**                 | ✅ **예**                      | 🌐 리전 유연성**    | 🌐 리전 유연성** |
| **모든 테넌시/OS에 적용**      | ✅ **예**                 | ✅ **예**                      | 🔄 수동 교환*          | ❌ 아니오                      |
| **Fargate(ECS/EKS)에 적용**   | ✅ **예**                 | ❌ 아니오                           | ❌ 아니오                         | ❌ 아니오                      |
| **Lambda에 적용**              | ✅ **예**                 | ❌ 아니오                           | ❌ 아니오                         | ❌ 아니오                      |
| **리전 간 적용**       | 🌍 **예**                | ❌ 아니오                           | ❌ 아니오                         | ❌ 아니오                      |
| **기간 길이(1년 또는 3년)**     | 📅 ✅                      | 📅 ✅                           | 📅 ✅                         | 📅 ✅                      |
| **기간 중 취소**       | 🚫 **불가**                 | 🚫 **불가**                      | 🚫 **불가**(🔄 교환만 가능) | 🚫 **불가**                 |

## 5. 결론

Amazon Savings Plans는 요구가 진화함에 따라 사용량을 조정할 수 있는 자유를 제공하면서도 AWS 컴퓨팅 비용을 낮추는 현대적이고 유연한 방법을 제공합니다. 더 유연한 Compute Savings Plans나 더 높은 할인율이지만 리전과 패밀리에 특화된 EC2 Instance Savings Plans(또는 ML 워크로드를 위한 SageMaker Savings Plans) 중에서 선택함으로써, 사용 프로필에 맞는 약정을 맞춤화하고 상당한 절감을 달성할 수 있습니다.

Savings Plans에 대한 가장 권위 있는 세부 사항은 다음의 공식 자료를 참고하세요.

* [AWS Savings Plans 사용자 가이드](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
