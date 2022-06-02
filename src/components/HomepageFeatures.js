import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Get started',
    Svg : require('../../static/img/fullsim4.svg').default,
    description: (
      <>
        Everything you need to start with Machine Learning for fast simulation!
      </>
    ),
  },
  {
    title: 'Full simulation',
    Svg: require('../../static/img/showersimulation.svg').default,
    description: (
      <>
        Learn about Geant4 and full simulation
      </>
    ),
  },
  {
    title: 'Fast simulation',
    Svg: require('../../static/img/fastsim4.svg').default,
    description: (
      <>
        Learn about fast simulation
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
