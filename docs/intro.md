---
sidebar_position: 1
---

# Full and fast simulation 

In Large Hadron Collider ([LHC](https://home.cern/science/accelerators/large-hadron-collider)) experiments, particle detectors are constructed to measure particle properties when interacting with the detectors’ material. The calorimeter is a key detector to measure the energy of particles, leading to their identification. The particles emerging during collisions interact electromagnetically and hadronically with the material of the calorimeter, creating cascades of secondary particles or showers. Describing the showering process relies on simulation methods that precisely describe all particle interactions with matter. Constrained by the need for precision, the full particle simulation is inherently slow and constitutes a bottleneck for analysis. Furthermore, the High Luminosity upgrade of the LHC ([HL-LHC](https://hilumilhc.web.cern.ch/)) in 2026 will result in more complex events that heavily relies on the simulation.

## Calorimetry

A calorimeter measures properties of charged and neutral particles. The measurement takes place via an energy absorption by the material of the detector. In experimental physics detectors, a calorimeter provides energy measurements and identification of photons, electrons, jets and inference of missing transverse energy. These measurements are possible due to a showering processes as illustrated in the figure below: an incoming (called also primary or incident) particle creates a cascade of secondary particles called a **shower**. Particles produced in this shower deposit energy and produce further particles until the energy is completely absorbed in the calorimeter. In fact, the number of cascade particles is proportional to the energy deposited by the incident particle.

![](/img/fullSim_fastSim/Calo.png)

In the absorption process, the energy is transferred as a mixture of heat, ionization, excitation of atoms, Čerenkov light and nuclear interactions. As a result, the choice of the material composing the calorimeter depends on the targeted effect. Two types of calorimeters exist: homogeneous and sampling. The material of a homogeneous calorimeter is at the same time the absorbing material and the detector. On the other hand, a sampling calorimeter is composed of alternating layers of a passive absorber of dense material used to reduce the energy of the incoming particle, and active detectors for signal generation. The choice of the absorber and detector material can vary according to the application.

:::tip Calorimetry origin
The origin of the term calorimetry comes from thermodynamics and calore in Italian means heat: referring to the energy converted into heat during the absorption process
:::

We can find electromagnetic and hadronic calorimeters. **Electromagnetic calorimeters** (ECALs) measure the energy deposited by electromagnetic showers developed from light electroweak particles such as photons, electrons, and positrons. **Hadronic calorimeters** (HCALs) measure the energy of charged and neutral hadrons, such as pions and protons. The shower development is similar to ECALs. The difference lies in the strong hadronic interactions that lead to  more complex showers, i.e., with a variety of development processes. Hadronic showers are expected to reach larger displacements than electromagnetic ones.  

## Full simulation

Building software that predicts the physics processes happening at the detector level is known as **simulation**. Detector simulation allows us to improve the quality of physics measurements and detector design. It enables the study of physics models by matching theoretical predictions to experimental measurements. In order to understand and label physics processes, it is necessary to accurately simulate the detector response. This response is simulated iteratively, i.e., the physics at a small scale helps understand the physics at a larger scale. 

Simulation techniques combine randomness with computational algorithms in order to approximate a function as complex as the one describing the showering of a particle. Specifically, **Monte Carlo** (MC) methods are a collection of computational algorithms used to estimate probability distributions of an uncertain event. In physics, and more precisely in experimental particle physics, MC methods are used for designing detectors, simulating their response to particle interactions and comparing experimental data to theory. 


### Geant4 : a simulation toolkit 

**[Geant4](https://geant4.web.cern.ch/)** is a simulation toolkit born in the 1990s. It provids a highly flexible simulation framework in C++. It simulates particle interaction with matter using **MC methods**. It is used by large scale experiments and projects such as nuclear medicine, astrophysics, and high energy physics (HEP). In HEP, it provides a production-quality simulation toolkit and support to experiments. Geant4 missions are also to improve the physics models with better precision and energy range extensions, to improve the overall computational performance of simulation and also to provide long-term maintenance and sustainability. 

Geant4 is a set of components which include, among others, geometry and tracking descriptions, detector response modeling, event management and user interfaces. The geometry feature covers all the physics aspects of an experiment, including the detector material. The tracking component allows the modelling of the particle trajectory through matter, its potential interactions and decays. 

### Simulation of particle interactions with Geant4

The illustractions below show how particle interaction is simulated in Geant4 which refers to as **full simulation** or **detailed simulation**. This simulation is considered as the ground truth for the modeled interactions, as it encodes current high fidelity physics knowledge.

The figure below shows a usual HEP setup of an experiment. There are cylinders around the beam line where collions happen: the inner most cylinder is usually a tracker detector to track the trajectory of particles, and then we have calorimeters to stop these particles. 

![](/img/fullSim_fastSim/fullsim-1.png)

There is some structure in the detectors where the particle behaviour is registered and these represent the **detector readouts**. 

![](/img/fullSim_fastSim/fullsim-2.png)

When a particle enteres the detector, a lot of physics processes happen in the passage of this particle. In the calorimeter, a particle loses its energy in a cascade of electromagnetic and hadronic interactions with a dense absorbing material.  

![](/img/fullSim_fastSim/fullsim-3.png)

The colored yellow blue and red shapes represent the sginals left in the detectors which are the results that are then reconstructed and analyzed. In the calorimeters, the blue and red signals represent the shower energy depositon of a particle.  

![](/img/fullSim_fastSim/fullsim-4.png)

At the end of the simulation these signals are retrived.  

![](/img/fullSim_fastSim/fullsim-5.png)

Technically, the full simulation is a pipeline where the first stage consists of constructing a detector geometry to define the detector volume. This construction describes every detector component and its composing material. These descriptions are technical translations of how all the detector components are set up together. The full detector simulation then models the passage of particles while interacting with every detector component. For each of the particles, this simulation includes the physics models to describe processes such as ionization, decays and nuclear interactions. In practice, simulating all these processes at the highest fidelity is not feasible due to the tremendous amount of time required. Instead, any effects that have a small impact on the physics and the detector are turned off. In addition, specific Geant4 parameters are set, such as the parameters to control the creation of secondary photons or electrons during ionization and Bremsstrahlung processes. This detector response modeling includes as well a detailed map of the magnetic field used to bend charged particles and effects of detector misalignment. 

Although processes can be fully simulated, only the relevant ones are stored for further analysis. During the simulation, a large number of secondary tracks is produced and the definition of relevance, in this case, relies on a strategy at the level of the inner tracker and the calorimeter detectors. For example, the strategy at the inner detector level concerns the storage of ionization vertices if the primary particle has an energy above 500 MeV and the energy of the generated electron is above 100 MeV. At the calorimeter level, muon Bremsstrahlung vertices are stored if they have energies above 1 GeV and 500 MeV for the primary muon and the generated photon, respectively. The parts of the detector that are of relevance are known as **sensitive detectors** in which the simulation creates a snapshot of the physical interactions known as **hits**. These hits are uniquely labeled with an ID. In the tracker, a hit for every single step of every single track is stored. It contains information on the position, time, deposited energy and the corresponding track identifier. At the calorimeter level, a hit is created for every cell. The calorimeter hit contains the cell ID and its accumulated energy deposition. Geant4 stores also the truth information which describes what actually happened in the simulation.

### The need for fast simulation

The detailed and step-by-step modeling at distance scales as small as 10<sup>-20</sup> m using the Geant4 toolkit is CPU and memory intensive. Moreover, the full simulation depends entirely on the detector design, which means if parts of the detector are upgraded, the simulation has to adapt. 

LHC experiemtns are standing in front of the slow simulation challenge. For example, the ATLAS experiment expects significant increase in annual CPU consumption in the coming years with the HL-LHC, the more we increse the rate of collions per unit of time time know as **lumuniosity** then we have a lot of overlaping interactions happening simulatnously which refers to as **pilup**, and with the HL-LHC we would have about 20 times more beam data that we have today and more beam data would require more simulated data to support analysis. The figure below (taken from this [link](https://twiki.cern.ch/twiki/pub/AtlasPublic/ComputingandSoftwarePublicResults/cpuHLLHC_comparison_2020_InputData_3April_ATLAS.pdf)) shows the projected CPU requirements for ATLAS between 2020 and 2034. The solid black lines represent a projection of the computing availability assuming a yearly budget increase of +10% and+20%. The empty circles show the projection of what the computing needs will be if the experiment would keep the same computing model as in Run 2. The filled triangles refer to the conservative and aggressive R&D scenarios. The empty triangles indicate the conservative R&D scenario under the assumption of the LHC reaching an average of 200 proton-proton interactions per bunch crossing in Run4 and beyond (2028-2030). In a nutshell, this shows that if ATLAS would mainly rely on the full simulation (the baseline curve) it is clearly exeeding the computing resources (the solid black curve).

![](/img/fullSim_fastSim/ATLAS.png)  

Similarly, we can see the same behaviour for the CMS experiment (figure taken from this [link](https://twiki.cern.ch/twiki/pub/CMSPublic/CMSOfflineComputingResults/cpu_cms2020.png)).

![](/img/fullSim_fastSim/CMS.png)

So in order to gain speed in simulation, fast simulations techniques have been studied and developed. Another application of fast simulation would be for instance to study the impact of the detector perfornace on physics observables. For example, the figure below (taken from [arxiv:1606.09408](https://arxiv.org/pdf/1606.09408.pdf)) shows the distribution of the reconstructed invariant mass of the photon pair. It shows how the distributions vary in the “Low” (red curve), “Medium” (blue curve) and “High” (black curve) detector performance benchmarks. Fast simulation techniques can be used for these studies. 

![](/img/fullSim_fastSim/Eg_fastSimApp.png)

## Fast simulation

As interactions of particles with detector material is often the slowest component of the full simulation, in a fast simulation appraoch, instead of full simulating the cascade of particles in the caloriemeter, it is based on a parametirzation of the energy deposition in a single step. 

![](/img/fullSim_fastSim/fastsim.gif)


### Classical fast simulation

Classical fast simulation techniques such as [Gflash](http://cds.cern.ch/record/134293/files/198012206.pdf) for example, are  parameterizations of longitudinal and lateral shower profiles of electromagnetic and hadronic showers. 


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