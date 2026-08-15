# AWS CloudFormation

## 1. 소개

AWS CloudFormation은 코드를 사용해 AWS 리소스를 모델링, 프로비저닝, 관리할 수 있게 하는 서비스입니다. CloudFormation을 사용하면 (JSON이나 YAML로 작성된) 템플릿에 인프라의 원하는 상태를 기술하며, 서비스가 올바른 순서로 리소스를 생성, 업데이트, 삭제하는 것을 처리합니다. 이 장에서는 CloudFormation이 리소스 관리를 어떻게 자동화하는지, 버전 관리와 파라미터화 같은 모범 사례를 어떻게 강제하는지, 안전하고 효율적인 배포를 보장하기 위한 수많은 내장 기능을 어떻게 제공하는지 설명합니다.

CloudFormation의 힘은 필요한 리소스가 무엇이고 어떻게 상호 관련되는지 선언함으로써 수동 구성을 제거하고 복잡한 인프라를 조율하는 능력에 있습니다. 단순한 EC2 인스턴스 배포부터 로드 밸런서, 보안 그룹, 스토리지를 갖춘 멀티 티어 애플리케이션 조율까지, CloudFormation은 AWS 리소스 관리의 모든 측면을 간소화합니다.

## 2. AWS CloudFormation이란?

CloudFormation은 템플릿이라고 불리는 코드 파일에 전체 AWS 인프라를 기술할 수 있게 합니다. 이 템플릿에서는 다음을 선언합니다.

- **리소스:** EC2 인스턴스, 보안 그룹, S3 버킷, Elastic IP, 로드 밸런서 등의 AWS 구성 요소.
- **파라미터:** 템플릿 코드를 수정하지 않고도 사용자가 배포를 커스터마이징할 수 있게 하는 동적 입력.
- **매핑:** 구성 세부 사항(예: 리전별 AMI ID)을 제어하는 데 사용되는 정적 변수.
- **출력:** 스택 간 참조를 가능하게 하기 위해 스택 사이에 내보내고 가져올 수 있는 값.
- **조건:** 입력 값이나 환경 설정에 기반해 리소스 생성을 제어하는 논리적 구성체.
- **내장 함수:** 템플릿 선언을 단순화하고 동적 참조 해석을 가능하게 하는 내장 함수(`!Ref`, `Fn::GetAtt`, `Fn::FindInMap` 등).

CloudFormation은 리소스 프로비저닝을 자동화할 뿐만 아니라 버전 관리 시스템과도 통합해 코드 검토와 감사 프로세스를 간소화하는 Infrastructure-as-Code(IaC) 접근 방식을 촉진합니다.

## 3. 리소스 선언과 관리

### 3.1. CloudFormation 템플릿의 핵심

모든 CloudFormation 템플릿의 핵심에는 **Resources** 섹션이 있습니다. 이 섹션은 템플릿의 유일한 필수 요소이며 생성될 모든 AWS 구성 요소의 정의를 포함합니다. 각 리소스는 `service-provider::service-name::data-type-name` 형태의 유형(예: `AWS::EC2::Instance`)으로 선언됩니다. 이 리소스들은 서로 참조할 수 있으며, CloudFormation은 리소스 생성, 업데이트, 삭제의 올바른 순서를 자동으로 결정합니다.

예를 들어 일반적인 템플릿에서는 다음을 선언할 수 있습니다.

- 접근을 통제하기 위한 보안 그룹.
- 보안 그룹을 사용하는 여러 EC2 인스턴스.
- EC2 인스턴스와 연관된 Elastic IP.
- 스토리지를 위한 S3 버킷.
- 인스턴스 앞의 로드 밸런서.

이 선언적 접근 방식은 리소스 조율의 수동 단계를 추상화해, 사람의 실수를 줄이고 배포 속도를 높입니다.

**예시 YAML: 여러 리소스 선언하기**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with multiple resources.
Resources:
  MySecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Allow SSH access
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0

  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-12345678
      InstanceType: t2.micro
      SecurityGroupIds:
        - !Ref MySecurityGroup
```

### 3.2. 리소스 문서와 문법

각 AWS 리소스 유형에는 AWS 웹사이트를 통해 상세한 문서가 제공됩니다. 문서는 다음을 제공합니다.

- **속성 정의:** 각 리소스를 구성하는 키-값 쌍 목록.
- **사용 예시:** 리소스를 구성하는 방법을 이해하는 데 도움이 되는 JSON과 YAML 예시.
- **반환 값:** 각 리소스가 참조될 때 반환하는 것(예: 인스턴스 ID, 가용 영역)에 대한 정보.

예를 들어 `AWS::EC2::Instance`로 작업할 때는 `ImageId`, `InstanceType`, `SecurityGroups` 같은 속성이 템플릿에 정의됩니다. 내장 함수 `!Ref`나 `Fn::GetAtt`를 사용하면 템플릿의 다른 곳에서 리소스의 속성을 참조할 수 있습니다.

**예시 YAML: 내장 함수 사용하기**

```yaml
Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-12345678
      InstanceType: t2.micro

Outputs:
  InstanceAZ:
    Description: The Availability Zone of the EC2 instance
    Value: !GetAtt MyEC2Instance.AvailabilityZone
```

## 4. 파라미터와 매핑

### 4.1. 파라미터

파라미터는 CloudFormation 템플릿에 동적 값을 전달할 수 있게 해, 템플릿을 서로 다른 환경 전반에서 재사용할 수 있게 합니다. 다음 핵심 사항을 고려하세요.

- **사용법:** 시간이 지남에 따라 변할 수 있거나 미리 결정할 수 없는 값에 파라미터를 사용하세요. 예를 들어 보안 그룹 설명이나 인스턴스 유형입니다.
- **검증:** 파라미터는 유형 정의(String, Number, CommaDelimitedList 등)와 허용된 값, 최소/최대 길이, 정규식 같은 검증 규칙을 지원합니다.
- **예시:** EC2 인스턴스 유형에 대한 파라미터는 `t2.micro`가 기본값인 `t2.micro`, `t2.small`, `t2.medium`만 허용할 수 있습니다. 데이터베이스 비밀번호 같은 민감한 정보는 `NoEcho` 속성을 사용해 보호할 수 있습니다.

**예시 YAML: 파라미터 정의와 사용하기**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with parameters.
Parameters:
  InstanceType:
    Type: String
    Default: t2.micro
    AllowedValues:
      - t2.micro
      - t2.small
      - t2.medium

Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-12345678
      InstanceType: !Ref InstanceType
```

### 4.2. 매핑

매핑은 리전, 환경, 또는 아키텍처 같은 특정 키에 따라 달라지는 정적 값을 정의하는 데 사용됩니다. 배포 전반에서 다른 고정 구성이 있을 때 특히 유용합니다. 예를 들어:

- 매핑은 EC2 인스턴스를 위한 리전별 AMI ID를 지정하는 데 사용할 수 있습니다.
- 현재 환경(리전과 인스턴스 아키텍처 등)에 기반해 올바른 값을 동적으로 검색하는 `Fn::FindInMap` 함수를 사용해 매핑 값에 접근할 수 있습니다.

**예시 YAML: 매핑 사용하기**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with mappings.
Mappings:
  RegionMap:
    us-east-1:
      AMI: ami-0abcdef1234567890
    us-west-1:
      AMI: ami-0fedcba9876543210

Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !FindInMap [RegionMap, !Ref "AWS::Region", AMI]
      InstanceType: t2.micro
```

## 5. 출력, 조건, 내장 함수

### 5.1. 출력

**Outputs** 섹션은 선택 사항이지만 다음에 매우 유용합니다.

- 다른 스택이 가져올 수 있는 값(VPC ID나 보안 그룹 ID 등)을 내보냅니다.
- AWS 콘솔이나 CLI 명령을 통해 중요한 정보를 표시합니다.
- 관심사 분리와 협업적인 인프라 관리를 강제하기 위한 스택 간 참조를 촉진합니다.

**예시 YAML: 출력 정의하기**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with outputs.
Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-12345678
      InstanceType: t2.micro

Outputs:
  InstanceId:
    Description: The Instance ID of the newly created EC2 instance
    Value: !Ref MyEC2Instance
    Export:
      Name: MyEC2InstanceID
```

### 5.2. 조건

조건은 사전 정의된 기준에 기반해 리소스 생성을 제어할 수 있게 합니다. 흔히 서로 다른 환경(예: 개발 vs. 프로덕션)을 구별하거나 특정 리소스가 생성되어야 하는지 결정하는 데 사용됩니다.

- 조건은 `And`, `Equals`, `If`, `Not`, `Or` 같은 논리 함수를 사용합니다.
- 조건을 리소스나 출력에 연결할 수 있어, 조건을 충족하는 리소스만 생성되도록 보장합니다.

**예시 YAML: 조건 사용하기**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with conditions.
Parameters:
  EnvironmentType:
    Type: String
    Default: dev

Conditions:
  IsProd:
    Fn::Equals: [ !Ref EnvironmentType, prod ]

Resources:
  ProdOnlyBucket:
    Type: AWS::S3::Bucket
    Condition: IsProd
    Properties:
      BucketName: my-prod-bucket
```

### 5.3. 내장 함수

내장 함수는 복잡한 템플릿 작업을 단순화합니다. 가장 흔히 사용되는 함수는 다음을 포함합니다.

- **Ref:** 파라미터의 값이나 리소스의 물리적 ID를 반환합니다.
- **GetAtt:** 리소스로부터 속성을 검색합니다(예: EC2 인스턴스의 가용 영역).
- **FindInMap:** 매핑으로부터 값을 반환합니다.
- **ImportValue:** 다른 스택에서 내보낸 값을 가져옵니다.
- **Join과 Sub:** 문자열 조작에 유용합니다.
- **기타:** `Base64`, `Cidr`, `GetAZs`, `Select`, `Split` 같은 함수와 논리 함수(`If`, `Not`, `Equals` 등)는 템플릿 유연성을 강화합니다.

**예시 YAML: 내장 함수 함께 사용하기**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template using intrinsic functions.
Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-12345678
      InstanceType: t2.micro

Outputs:
  InstanceAZ:
    Description: The Availability Zone of the EC2 instance
    Value: !GetAtt MyEC2Instance.AvailabilityZone
```

## 6. 롤백과 실패 처리

CloudFormation은 스택 생성이나 업데이트 중 오류를 처리하는 견고한 메커니즘을 제공합니다.

- **기본 롤백:** 스택 생성이 실패하면 CloudFormation은 프로비저닝된 모든 리소스를 삭제하며 모든 변경 사항을 롤백합니다.
- **리소스 보존:** 실패 중 롤백을 비활성화하거나 성공적으로 프로비저닝된 리소스를 보존하도록 선택할 수 있습니다. 이는 리소스 생성 문제를 문제 해결하는 데 유용합니다.
- **스택 업데이트:** 업데이트 중 실패가 발생하면 CloudFormation은 이전의 안정적인 상태로 롤백합니다. 롤백 자체가 실패하면(흔히 리소스에 대한 수동 변경으로 인해) 수동으로 개입해 프로세스를 완료하기 위해 `ContinueUpdateRollback` 작업을 사용해야 할 수 있습니다.

## 7. CloudFormation의 보안과 IAM 역할

CloudFormation은 서비스 역할 사용을 통해 강화된 보안을 지원합니다.

- **서비스 역할:** 이는 서비스가 여러분을 대신해 리소스를 생성, 업데이트, 삭제할 수 있게 하는 CloudFormation 전용 IAM 역할입니다. 이 역할을 통해 필요한 권한(예: `iam:PassRole`)만 부여함으로써 최소 권한의 원칙을 준수합니다.
- **사용 사례:** 서비스 역할은 사용자가 제한된 권한을 가지고 있지만 스택 작업을 수행해야 할 때 특히 유용합니다. 예를 들어 사용자는 스택을 시작하도록 허용되지만 기반이 되는 리소스를 직접 수정하지는 못할 수 있습니다.

**예시 YAML: CloudFormation을 위한 IAM 역할 생성하기**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template to create a service role for CloudFormation.
Resources:
  CloudFormationServiceRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: CloudFormationServiceRole
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: cloudformation.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: S3FullAccessPolicy
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action: s3:*
                Resource: '*'
```

## 8. 권한과 위험 승인

특정 CloudFormation 템플릿은 잠재적인 위험에 대한 명시적인 승인이 필요합니다.

- **CAPABILITY_IAM과 CAPABILITY_NAMED_IAM:** 템플릿이 IAM 리소스를 생성하거나 수정할 때 이 권한들을 지정해야 합니다. 이 승인은 잠재적으로 광범위한 권한을 가진 리소스를 생성하는 것의 함의를 이해했다는 것을 보장합니다.
- **CAPABILITY_AUTO_EXPAND:** 동적 변환을 수행하는 매크로나 중첩 스택을 사용할 때 필요합니다.

`InsufficientCapabilitiesException`을 만나면 진행하기 위해 필요한 권한과 함께 템플릿을 다시 시작해야 합니다.

## 9. 삭제 정책

삭제 정책은 스택에서 리소스가 제거될 때 어떤 일이 발생하는지 제어할 수 있게 합니다.

- **Delete:** 리소스를 제거하는 기본 정책입니다.
- **Retain:** 스택이 삭제된 후에도 리소스를 보존합니다.
- **Snapshot:** 지원되는 리소스(EBS 볼륨, RDS 인스턴스 등)의 경우 삭제 전에 스냅샷을 생성합니다.

예를 들어 백업 목적으로 데이터를 보존하기 위해 보안 그룹을 보존하거나 EBS 볼륨의 스냅샷을 생성할 수 있습니다. S3 버킷의 경우 버킷이 비어 있어야만 삭제가 성공한다는 점에 유의하세요.

**예시 YAML: 삭제 정책 사용하기**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template demonstrating deletion policies.
Resources:
  MyDynamoDBTable:
    Type: AWS::DynamoDB::Table
    DeletionPolicy: Retain
    Properties:
      TableName: MyTable
      AttributeDefinitions:
        - AttributeName: Id
          AttributeType: S
      KeySchema:
        - AttributeName: Id
          KeyType: HASH
      BillingMode: PAY_PER_REQUEST

  MyEBSVolume:
    Type: AWS::EC2::Volume
    DeletionPolicy: Snapshot
    Properties:
      Size: 8
      AvailabilityZone: us-east-1a
```

## 10. 스택 정책과 종료 보호

### 10.1. 스택 정책

스택 정책은 스택 업데이트 중 어떤 리소스가 업데이트될 수 있는지 정의하는 JSON 문서입니다. 실수로 인한 수정으로부터 중요한 리소스를 보호하는 데 도움을 줍니다. 일반적인 패턴은 대부분의 리소스에서 업데이트를 허용하면서 프로덕션 데이터베이스나 다른 민감한 구성 요소에 대한 변경은 명시적으로 거부하는 것입니다.

### 10.2. 종료 보호

종료 보호는 CloudFormation 스택의 실수로 인한 삭제를 방지하는 안전 기능입니다. 활성화되면 스택을 삭제하기 전에 종료 보호를 명시적으로 비활성화해야 하므로, 배포에 추가적인 보안 계층을 더합니다.

_참고: 종료 보호는 템플릿 내에서가 아니라 AWS Management Console, CLI, 또는 API를 통해 스택 수준에서 구성됩니다._

## 11. 커스텀 리소스

커스텀 리소스는 CloudFormation의 기능을 확장해 네이티브로 지원되지 않는 리소스를 관리할 수 있게 합니다. 일반적으로 Lambda 함수나 SNS 토픽을 사용해 구현되며, 다음을 할 수 있게 합니다.

- 커스텀 프로비저닝 로직을 실행합니다.
- 온프레미스나 서드파티 리소스를 관리합니다.
- 삭제 전에 비어 있지 않은 S3 버킷을 비우는 것 같은 작업을 수행합니다.

커스텀 리소스는 템플릿에서 `Custom::`으로 시작하는 유형(예: `Custom::MyCustomResourceTypeName`)을 사용해 선언되며, 커스텀 로직을 실행하기 위해 서비스 토큰(Lambda 함수나 SNS 토픽의 ARN)에 의존합니다.

**예시 YAML: 커스텀 리소스 선언하기**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with a custom resource.
Resources:
  MyCustomResource:
    Type: Custom::MyCustomResourceType
    Properties:
      ServiceToken: arn:aws:lambda:us-east-1:123456789012:function:MyCustomFunction
      SomeProperty: SomeValue
```

## 12. 동적 참조

동적 참조는 CloudFormation이 AWS Systems Manager Parameter Store나 AWS Secrets Manager로부터 런타임에 민감한 데이터를 검색할 수 있게 합니다. 이 기능은 다음을 할 수 있게 합니다.

- Parameter Store에 평문 값이나 (`ssm`이나 `ssm-secure`를 사용하는) 보안 문자열을 저장합니다.
- 템플릿 내에서 직접 (`secretsmanager`를 사용해) 시크릿을 검색합니다.
- 스택 작업 중 값을 동적으로 삽입하기 위해 `{{resolve:service-name:reference-key}}` 문법을 사용합니다.

**예시 YAML: 동적 참조 사용하기**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template using dynamic references.
Resources:
  MyS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-dynamic-bucket
      AccessControl: !Sub "{{resolve:ssm:my-parameter:1}}"

  MyRDSInstance:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: mydbinstance
      MasterUsername: !Sub "{{resolve:secretsmanager:my-db-secret:SecretString:username}}"
      MasterUserPassword: !Sub "{{resolve:secretsmanager:my-db-secret:SecretString:password}}"
      DBInstanceClass: db.t2.micro
      Engine: mysql
      AllocatedStorage: 20
```

## 13. CloudFormation StackSets

StackSets는 여러 AWS 계정과 리전에 걸쳐 스택을 배포할 수 있게 함으로써 CloudFormation의 힘을 확장합니다.

- **배포 모델:** 관리자 계정이 StackSets를 생성하고 관리하며, 대상 계정은 배포된 스택 인스턴스를 받습니다.
- **권한:** 자체 관리형 권한은 관리자와 대상 계정 모두에서 IAM 역할이 필요합니다. 서비스 관리형 권한을 사용하면 AWS Organizations가 필요한 역할을 자동으로 생성하고 신뢰할 수 있는 접근을 부여함으로써 역할 관리를 단순화합니다.
- **자동화:** 조직 내 새 계정이 지정된 조직 단위(OU)에 속한다면 자동으로 스택 인스턴스를 받을 수 있습니다.

## 14. 결론

AWS CloudFormation은 클라우드 인프라를 관리하는 방식을 변화시키는 강력한 도구입니다. 인프라를 코드로 취급함으로써 CloudFormation은 리소스 프로비저닝을 자동화할 뿐만 아니라 배포가 반복 가능하고, 버전 관리되며, 확장 가능하도록 보장합니다. 이 장에서는 리소스 선언과 파라미터화의 기본 사항부터 롤백 전략, 보안 역할, 삭제 정책, 커스텀 리소스, 동적 참조, StackSets를 사용한 멀티 계정 배포 같은 고급 주제까지 CloudFormation의 모든 측면을 살펴보았습니다.

이러한 인사이트와 실용적인 YAML 예시를 통해 복잡한 AWS 아키텍처를 자신 있고 효율적으로 설계, 배포, 관리할 준비를 갖추게 되었습니다. 단일 리전에서 작업하든 전 세계 기업 전반의 배포를 조율하든, CloudFormation의 기능과 모범 사례를 이해하는 것은 AWS의 전체적인 힘을 활용하는 핵심입니다.
