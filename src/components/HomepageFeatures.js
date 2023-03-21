import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Get started',
    Svg : require('../../static/img/fullsim4.svg').default,
    link: '/docs/intro',
    description: (
      <>
        What you need to understand how to start with Machine Learning for fast simulation!
      </>
    ),
  },
  {
    title: 'Fast shower simulation',
    Svg: require('../../static/img/fastsim4.svg').default,
    link: '/docs/ml_workflow',
    description: (
      <>
        Description of fast shower simulation with machine learning tools. Have a look to check our recent results!
      </>
    ),
  },
  {
    title: 'Inference within Geant4',
    Svg: require('../../static/img/showersimulation.svg').default,
    link: 'docs/G4_Inference/from_training_to_inference',
    description: (
      <>
          Learn about integration of our tools with Geant4, a standard toolkit for full simulation studies.
      </>
    ),
  },
  {
    title: 'Use MetaHEP in your simulation',
    Svg: require('../../static/img/showersimulation.svg').default,
    link: 'docs/MetaHEP/Step00_overview',
    description: (
      <>
          How to use MetaHEP, a quickly adapting fast simulation in your simulation application.
      </>
    ),
  },
];

function Feature({Svg, title, description, link}) {
  return (
      <div className={clsx('col col--4')}>
          <a href={link}>
              <div className="text--center">
                  <Svg className={styles.featureSvg} alt={title} />
              </div>
              <div className="text--center padding-horiz--md">
                  <h3>{title}</h3>
                  <p>{description}</p>
              </div>
          </a>
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
