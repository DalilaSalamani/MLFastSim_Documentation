---
sidebar_position: 1
---

# Full and fast simulation 

In Large Hadron Collider ([LHC](https://home.cern/science/accelerators/large-hadron-collider)) experiments, particle detectors are measuring particle properties when interacting with the detectors’ material. The calorimeter is a key detector to measure the energy of particles. The particles emerging from the collisions in a collider traverse the detector and can interact electromagnetically and/or hadronically with the material of the calorimeter, creating cascades of secondary particles called showers. Describing the showering process relies on simulation methods and their precision of modeling of particle interactions with matter. Constrained by the need for accuracy, this detailed (full) particle simulation is inherently slow and constitutes a bottleneck. With the High Luminosity upgrade of the LHC ([HL-LHC](https://hilumilhc.web.cern.ch/)) planned for 2026, the will be even more demand for simulation, and moreover the complexity of the events will increase, both factors increasing the requirements on the computing resources used for simulation.

## Calorimetry

A calorimeter measures energy deposited by charged and neutral particles. The measurement takes place via an energy absorption by the material of the detector. In experimental physics detectors, a calorimeter provides energy measurements of photons, electrons (positrons), jets and inference of missing transverse energy. These measurements are possible due to a showering processes as illustrated in the figure below: an incoming (called also primary or incident) particle creates a cascade of secondary particles called a **shower**. Particles produced in this shower deposit energy and produce further particles until the energy is completely absorbed in the calorimeter. In fact, the number of cascade particles is proportional to the energy deposited by the incident particle.

![](/img/fullSim_fastSim/Calo.png)

In the absorption process, the energy can be transferred as a mixture of heat, ionization, excitation of atoms, Čerenkov light and nuclear interactions. The goal is to produce a measurable signal that is proportional to the energy deposited by the particle. The choice of this so-called active material determines how the deposited energy is converted to a measurable signal. We could distinguish two types of calorimeters based on its composition: homogeneous and sampling. The material of a homogeneous calorimeter is at the same time the active material (producing signal) the absorbing material (passive material which does not produce signal but is dense enough to create lots of cascading particles). A sampling calorimeter is composed of alternating layers of a passive absorber of dense material, and active material. The choice of the absorber and active detector material can vary according to the application.

:::tip Origin of term calorimetry
The origin of the term calorimetry comes from thermodynamics. *calore* in Italian means heat and it refers to transfer of energy through heat.
:::

We can find electromagnetic and hadronic calorimeters. **Electromagnetic calorimeters** (ECals) measure the energy deposited by electromagnetic showers developed from light electroweak particles such as photons, electrons, and positrons. **Hadronic calorimeters** (HCals) measure the energy of charged and neutral hadrons, such as pions and protons. The shower development process of incident hadrons is different than the electromagnetic ones due to variety of processes that particle may encounter.

## Full simulation

Building software that predicts the physics processes happening at the detector level is known as **simulation**. Detector simulation allows us to design detectors and to perform physics analyses. It enables the study of physics models by matching theoretical predictions to experimental measurements. In order to understand physics processes, it is necessary to accurately simulate the detector response. This response is simulated iteratively, i.e., the physics at a small scale helps understand the physics at a larger scale. 

Simulation techniques combine randomness with computational algorithms in order to approximate phenomena as complex as showers of particles. Specifically, **Monte Carlo** (MC) methods are a collection of computational algorithms used to estimate probability distributions of an uncertain event. In physics, and more precisely in experimental particle physics, MC methods are used for designing detectors, simulating their response to particle interactions and comparing experimental data to theoretical predictions. 


### Geant4 : a simulation toolkit 

**[Geant4](https://geant4.web.cern.ch/)** is a simulation toolkit born in the 1990s. It provides a highly flexible simulation framework in C++. It simulates particle interaction with matter using **MC methods**. It is used by large scale experiments and projects from the domains of nuclear medicine, astrophysics, and high energy physics (HEP). Geant4 missions are to continuously improve the physics models with better precision and energy range extensions, to improve the overall computational performance of simulation and also to provide long-term maintenance and sustainability. 

Geant4 is a toolkit, a set of components which include, among others, geometry and tracking descriptions, detector response modeling, event management and user interfaces. The geometry description covers all the physical aspects of a detector, including the detector material, shapes, positioning. The tracking component allows the modeling of the particle trajectory through matter, its potential interactions and decays. 

### Simulation of particle interactions with Geant4

The illustrations below show how particle interaction is simulated in Geant4 which we refer to as to **full simulation** or **detailed simulation**. This simulation is considered as the baseline (truth) for the modeled interactions, as it encodes current high fidelity physics knowledge, validated with different experiments.

The figure below shows a usual HEP setup of an experiment. There are cylinders around the beam line where collisions happen: the inner most cylinder is a tracker detector to track the trajectory of charged particles, and then we have calorimeters to stop these particles and measure their energy.

![](/img/fullSim_fastSim/fullsim-1.png)

There is some structure in the detectors where the signal created by particles is registered and it represents the **detector readouts**. Thanks to this segmentation the signal can be associated with a certain position inside of the detector.

![](/img/fullSim_fastSim/fullsim-2.png)

When a particle enters the detector, a lot of physics processes can happen within its passage through the detector. In the calorimeter, particle loses its energy in a cascade of electromagnetic and/or hadronic interactions.

![](/img/fullSim_fastSim/fullsim-3.png)

The colored yellow, blue and red shapes represent the signals created in the detectors. Those signals are the visible result of particle traversing the detector, hence they are reconstructed and analyzed. The blue and red signals represent the shower energy deposition of a particle in calorimeters.

![](/img/fullSim_fastSim/fullsim-4.png)

At the end of the simulation these signals created in the active material of the detector are retrieved and stored.

![](/img/fullSim_fastSim/fullsim-5.png)

Technically, the full simulation is a pipeline where the first stage consists of constructing a geometry which defines the detector. This construction describes every detector component, its position, and its composing material. The full detector simulation then models the passage of particles which can interact with material of every detector component. For each of the particles, this simulation considers all physics models of interactions it may undergo, such as for instance ionization, decays and nuclear interactions. In practice, simulating all these processes at the highest fidelity is not feasible due to the tremendous amount of time required. Instead, any effects that have a negligible impact on the result are ignored. This tuning is an important step in optimization of the full simulation. Specific Geant4 parameters should be set, such as the parameters to control the creation of secondary photons or electrons during ionization and Bremsstrahlung processes.

Full simulation creates enormous level of information, and only the relevant one is stored for further analysis. A large number of secondary particles is produced and the definition of relevance, in this case, relies on a strategy at the level of the inner tracker and the calorimeter detectors. The parts of the detector that are of relevance (produce measurable/visible signal) are known as **sensitive detectors** in which the simulation creates a snapshot of the physical interactions known as **hits**. These hits are uniquely labeled with an ID, to associate that hit with a specific position within the detector. At the calorimeter level, a hit is created for every readout cell. The calorimeter hit contains the cell ID and its accumulated energy deposition, of all particles within this event that deposited energy in this material within this cell.

### The need for fast simulation

The detailed and step-by-step modeling at distance scales using the Geant4 toolkit is CPU and memory intensive. Moreover, the full simulation depends entirely on the detector, which means if parts of the detector are upgraded, the simulation has to adapt. 

LHC experiments are now facing the challenge of producing sufficient amount of simulation data using the available computing resources. The more the rate of collisions per unit of time time know as **luminosity** is increased, the more data can be collected byt the experiments, which is great news for physicists. However, with this increase of collision data, the demand on the amount of simulated data also increases to support physics analyses, allow them to maintain their sensitivity. For example, the ATLAS experiment expects significant increase in annual CPU consumption in the coming years with the HL-LHC, the figure below (taken from this [link](https://twiki.cern.ch/twiki/pub/AtlasPublic/ComputingandSoftwarePublicResults/cpuHLLHC_comparison_2020_InputData_3April_ATLAS.pdf)) shows the projected CPU requirements for ATLAS between 2020 and 2034. The solid black lines represent a projection of the computing availability assuming a yearly budget increase of +10% and+20%. The empty circles show the projection of what the computing needs will be if the experiment would keep the same computing model as in Run 2. The filled triangles refer to the conservative and aggressive R&D scenarios. The empty triangles indicate the conservative R&D scenario under the assumption of the LHC reaching an average of 200 proton-proton interactions per bunch crossing in Run4 and beyond (2028-2030). In a nutshell, this shows that if ATLAS would mainly rely on the full simulation (the baseline curve) it is clearly exeeding the computing resources (the solid black curve).

![](/img/fullSim_fastSim/ATLAS.png)  

Similarly, we can see the same behaviour for the CMS experiment (figure taken from this [link](https://twiki.cern.ch/twiki/pub/CMSPublic/CMSOfflineComputingResults/cpu_cms2020.png)).

![](/img/fullSim_fastSim/CMS.png)

So in order to gain speed in simulation, fast simulations techniques are in demand, and are being studied, developed, and adopted for production. Another application of fast simulation would be for instance to study the impact of the detector performance on physics observables. For example, the figure below (taken from [arxiv:1606.09408](https://arxiv.org/pdf/1606.09408.pdf)) shows the distribution of the reconstructed invariant mass of the photon pair. It shows how the distributions vary in the “Low” (red curve), “Medium” (blue curve) and “High” (black curve) detector performance benchmarks. Fast simulation techniques can be used for these studies, where the detailed detector geometry layout is either not important, or unknown, and the focus is the impact of detector performance on physics analyses.

![](/img/fullSim_fastSim/Eg_fastSimApp.png)

## Fast simulation

As interactions of particles with detector material is often the slowest component of the full simulation, in a fast simulation approach, instead of simulating in detail the cascade of particles in the caloriemeter, one can parametrize the energy deposition. All hits are created in a single step.

![](/img/fullSim_fastSim/fastsim.gif)


### Classical fast simulation

Classical fast simulation techniques such as [Gflash](http://cds.cern.ch/record/134293/files/198012206.pdf) are parameterizations of longitudinal and lateral shower profiles of electromagnetic and hadronic showers, with mathematical furmulas describing the shower profiles.


### Machine learning for fast simulation

To speed-up detector simulations a class of machine learning models called **generative models** is used in HEP applications. The next page provides more details on these models. 


To read more: 

<!---
For references, the APA style citation is used. 
-->

- Wigmans, R., & Wigmans, R. (2000). Calorimetry: Energy measurement in particle physics (Vol. 107). Oxford University Press.
- Agostinelli, S. (2003). GEANT4 a simulation toolkit. Nucl. Instrum. Meth. A, 506(25), 0.
- Allison, J., Amako, K., Apostolakis, J. E. A., Araujo, H. A. A. H., Dubois, P. A., Asai, M. A. A. M., ... & Yoshida, H. A. Y. H. (2006). Geant4 developments and applications. IEEE Transactions on nuclear science, 53(1), 270-278.
- Mahboubi, K., & Jakobs, K. (2005). A fast parametrization of electromagnetic and hadronic calorimeter showers (No. ATL-SOFT-PUB-2006-001).