# Amazon EC2 - Security

## 1. 소개

Amazon EC2(Elastic Compute Cloud)는 AWS 클라우드에서 확장 가능한 온디맨드 가상 서버를 제공합니다. 보안은 이 서비스의 모든 계층에 내재되어 있으며 AWS 공동 책임 모델에 따라 관리됩니다. 이 모델에서는 다음과 같이 나뉩니다.

- **클라우드 자체의 보안:** AWS는 데이터센터, 물리적 하드웨어, 네트워킹, 가상화 플랫폼을 포함한 글로벌 인프라의 보호를 책임집니다. 이는 AWS의 데이터센터 설계, 현대적인 EC2 인스턴스의 기반이 되는 Nitro System의 보안, 컴플라이언스를 위한 정기적인 서드파티 감사를 포함합니다.

- **클라우드 내부의 보안:** 고객은 그 인프라 위에 배포하는 것을 보호할 책임이 있습니다. 이는 VPC(Virtual Private Cloud), 보안 그룹, 네트워크 ACL을 적절히 구성하고, 게스트 운영체제를 패치·강화하며, IAM으로 자격 증명과 접근을 관리하고, 데이터를 보호하는 것을 포함합니다.

## 2. EC2 보안의 핵심 구성 요소

### 2.1. 데이터 보호

- **저장 데이터 암호화:**
    - Amazon EBS 볼륨은 AWS Key Management Service(KMS)를 사용해 암호화할 수 있어, 저장된 데이터가 업계 표준 AES-256 암호화로 보호됩니다([Amazon EBS 암호화](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-encryption.html) 참고).
    - 인스턴스 스토어 볼륨은 지원되는 인스턴스 유형에서 하드웨어 지원 암호화를 사용해 자동으로 암호화됩니다.
- **전송 중 데이터 암호화:**
    - AWS 서비스로 오가는 모든 API 호출과 데이터 전송은 SSL/TLS(TLS 1.2 필수, TLS 1.3 권장)를 사용해 전송 중인 데이터를 보호합니다.
### 2.2. 네트워크 보안

- **VPC와 보안 그룹:**
    - Amazon EC2는 Virtual Private Cloud(VPC) 안에 배포되어 가상 네트워킹 환경을 완전히 제어할 수 있게 합니다. 보안 그룹은 인스턴스로의 인바운드·아웃바운드 트래픽을 제어하는 스테이트풀 가상 방화벽 역할을 합니다.
    - 모범 사례로는 보안 그룹 규칙을 정의할 때 최소 권한 원칙을 사용하고 접근을 제한하는 것이 있습니다(예: SSH를 특정 IP 범위에서만 열기).
- **추가 네트워크 제어:**
    - 네트워크 ACL, VPC 엔드포인트(AWS PrivateLink 등)를 사용하고 환경을 설계할 때 의도치 않은 퍼블릭 노출을 피함으로써 보안을 더 강화할 수 있습니다.

### 2.3. 자격 증명 및 접근 관리(IAM)

- **자격 증명 관리:**
    - 안전한 접근은 IAM을 사용해 사용자 계정, 역할, 권한을 관리함으로써 이루어집니다. EC2의 경우 인스턴스에 IAM 역할을 할당해, 임시 자격 증명이 자동으로 교체되고 애플리케이션에 안전하게 제공되도록 하는 것이 포함됩니다.
- **키 페어와 MFA:**
    - EC2는 SSH나 RDP를 통한 안전한 인스턴스 접근을 위해 키 페어(공개/비공개 RSA 키)를 사용합니다. 또한 AWS 계정과 IAM 사용자 접근에는 다중 인증(MFA)이 권장됩니다.

## 3. EC2 보안을 위한 모범 사례

견고한 보안 태세를 보장하기 위해 AWS는 고객에게 다음을 권장합니다.

- **인스턴스 강화:**
    - 게스트 운영체제와 애플리케이션을 정기적으로 업데이트하고 패치합니다.
    - 불필요한 서비스와 계정을 제거하거나 비활성화합니다.
- **최소 권한 적용:**
    - 필요한 최소한의 권한으로 보안 그룹을 정의합니다.
    - 사용자와 역할이 필요한 권한만 부여받도록 IAM 정책을 사용합니다.
- **활동 모니터링과 로깅:**
    - API 활동 로깅을 위해 AWS CloudTrail을 활성화합니다.
    - 시스템과 애플리케이션 지표를 모니터링하기 위해 Amazon CloudWatch를 사용합니다.
    - 취약점 평가를 위해 Amazon Inspector 사용을 고려합니다.
- **백업과 복구 구현:**
    - EBS 스냅샷으로 중요한 데이터를 정기적으로 백업하고, 빠른 복구를 위한 템플릿으로 AMI를 만듭니다.
- **고급 보안 기능 사용:**
    - AWS Security Hub를 활용해 모범 사례에 따라 보안 태세를 지속적으로 평가합니다.
    - 보안 요구가 높은 워크로드라면 전용 인스턴스 배치(Dedicated Instance나 Dedicated Host)와 프라이빗 API 접근을 위한 AWS PrivateLink를 고려합니다.

이런 실무는 [Amazon EC2 모범 사례](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-best-practices.html) 문서에 자세히 설명되어 있습니다.

## 4. AWS Nitro System과 EC2 격리

현대적인 EC2 인스턴스는 AWS Nitro System을 기반으로 동작합니다. 이는 가상화 기능을 전용 하드웨어로 오프로드해 보안을 강화하는, 목적에 맞게 설계된 플랫폼입니다. 주요 이점은 다음과 같습니다.

- **강력한 격리:**
    - Nitro Hypervisor는 불필요한 구성 요소를 제거하고 게스트 인스턴스가 다른 테넌트와 CPU 캐시나 메모리를 공유하지 않도록 보장함으로써 공격 표면을 최소화하여, 사이드 채널 공격의 위험을 효과적으로 완화합니다.
- **하드웨어 지원 보안:**
    - Nitro Card와 Nitro Security Chip은 시큐어 부트, 하드웨어 기반 신뢰, 암호화를 제공해 AWS 관리자조차 인스턴스 데이터에 접근할 수 없도록 보장합니다.

## 5. 컴플라이언스와 인증

Amazon EC2는 엄격한 글로벌 컴플라이언스 표준을 충족하도록 설계되었습니다. AWS는 정기적인 서드파티 감사를 받으며 PCI DSS, HIPAA, FedRAMP, ISO 27001, SOC 1/2/3 등의 프레임워크를 다루는 포괄적인 컴플라이언스 보고서를 제공합니다. 고객은 AWS Compliance Programs를 통해 이 보고서들에 접근할 수 있습니다.

## 6. 인스턴스 프로필

**인스턴스 프로필**은 본질적으로 Amazon EC2 인스턴스에 연결하는 IAM 역할을 담는 컨테이너입니다. 이를 통해 인스턴스는 장기 자격 증명을 하드코딩할 필요 없이, 인스턴스의 애플리케이션이 AWS API를 호출하는 데 사용할 수 있는 임시 보안 자격 증명을 얻을 수 있습니다. 이 메커니즘은 EC2가 AWS Identity and Access Management(IAM)와 통합되는 핵심적인 방식입니다.

IAM 콘솔을 사용해 EC2용 IAM 역할을 만들면 AWS는 그 역할과 같은 이름의 인스턴스 프로필을 자동으로 만듭니다. 다만 AWS CLI, API, SDK로 역할을 만든다면 인스턴스 프로필을 별도 단계로 만들고 그 역할을 추가해야 합니다.

![instance-profile](@site/docs/Compute/_assets/instance-profile.png)

각 인스턴스 프로필에는 하나의 IAM 역할만 담을 수 있습니다. 동일한 역할을 여러 인스턴스 프로필에서 사용할 수는 있지만, EC2 인스턴스는 한 번에 하나의 인스턴스 프로필만 연결할 수 있습니다.

### 6.1. 인스턴스 프로필의 동작 방식

1. **역할 연결:**
    EC2 인스턴스를 시작할 때 IAM 역할을 지정합니다. 콘솔을 사용할 때는 목록에서 선택하고(인스턴스 프로필 이름이 표시됨), CLI/API를 사용할 때는 인스턴스 프로필 이름을 지정합니다.

2. **임시 자격 증명 전달:**
    연결된 인스턴스 프로필은 인스턴스의 메타데이터 엔드포인트([http://169.254.169.254](http://169.254.169.254))를 통해 역할의 임시 보안 자격 증명을 제공합니다. AWS SDK는 대부분 애플리케이션을 위해 이 자격 증명을 자동으로 가져오고 갱신합니다.

3. **자격 증명 교체:**
    자격 증명이 임시적이므로 자동으로 교체되고 갱신되어, 장기 자격 증명과 관련된 위험이 줄어듭니다.

4. **관리와 수정:**
    AWS CLI 명령(`create-instance-profile`, `add-role-to-instance-profile`, `associate-iam-instance-profile` 등)을 사용해 인스턴스 프로필을 관리할 수 있습니다. 또한 인스턴스가 시작된 후에도 인스턴스 프로필을 연결하거나 분리할 수 있습니다.
## 결론

Amazon EC2 보안은 견고한 공동 책임 모델, Nitro System을 통한 고급 하드웨어 지원 격리, 데이터 보호·네트워크 보안·자격 증명 관리를 위한 포괄적인 제어를 활용하는 다면적인 분야입니다. AWS의 모범 사례를 따르고 방대한 공식 문서와 백서를 활용함으로써, 고객은 자신의 환경이 복원력 있고 안전하다는 확신을 갖고 EC2 인스턴스를 배포할 수 있습니다.

더 자세한 내용은 다음 공식 AWS 자료를 참고하세요.

- [**Amazon EC2의 보안**](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security.html)
- [**Amazon Web Services: 보안 프로세스 개요**](https://docs.aws.amazon.com/whitepapers/latest/aws-overview-security-processes/aws-overview-security-processes.pdf)
- **[AWS Nitro System의 보안 설계](https://docs.aws.amazon.com/whitepapers/latest/security-design-of-aws-nitro-system/security-design-of-aws-nitro-system.html):** EC2 인스턴스의 격리와 보안을 강화하는 아키텍처 상의 결정을 설명합니다.
