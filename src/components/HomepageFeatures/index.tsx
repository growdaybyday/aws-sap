import type {ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: ReactNode;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: (
      <Translate id="homepage.feature.structured.title">
        Structured Learning
      </Translate>
    ),
    Svg: require('@site/static/img/structured-learning.svg').default,
    description: (
      <Translate id="homepage.feature.structured.description">
        Move through core AWS topics in the ideal order — from foundational to advanced
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.feature.examFocused.title">
        Exam-Focused Topics
      </Translate>
    ),
    Svg: require('@site/static/img/aws-solution-architect-pro.svg').default,
    description: (
      <Translate id="homepage.feature.examFocused.description">
        Every topic is curated to align with the AWS Certified Solutions Architect – Professional exam domains.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.feature.comprehensive.title">
        Comprehensive Coverage
      </Translate>
    ),
    Svg: require('@site/static/img/comprehensive-coverage.svg').default,
    description: (
      <Translate id="homepage.feature.comprehensive.description">
        From core services to advanced architecture patterns, everything you need to master AWS is in one place.
      </Translate>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
