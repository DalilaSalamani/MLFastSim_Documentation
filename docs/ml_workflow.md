---
sidebar_position: 3
---

# Machine learning workflow

## Workflow description

The figure below represents the different componenet of the ML workflow. 

![](/img/ML_workflow/MLWorkflow.png) 

- The preprocessing module allows us to prepare (data cleaning, scaling,...) the full simulated data generated using Geant4 applications, creating a universal shower representation. It also encodes all condition information (to build conditional generative models) the calorimeter ID, energy of the particle initiating the shower, and the angle at which particles enters the detector. 
- The preprocessed data is then used by the generative model for training. 
- In order to search for the best set of hyperparameters of the model, the optimization module (at training step) is used.
- After training, optimization and validation the model is converted into a format such as JSON or ONNX that can be used for inference in C++ (Geant4 inference). 
- Optimization (at inference step) techniques such as quantization and graph optimizations are used to further reduce the memory footprint of the model at the inference time.  

## Dataset description

### Calorimeter setup and mesh definition

In our studies, we use simplified and realistic calorimeter geometries. The simplified calorimeter is a setup of concentric cylinders with interchanging layers of materials (active and passive). Energy deposits are scored in the detector using a cylindrical readout structure, centered around the particle momentum, as shown in the figure below. Dimensions of the readout structure are configured w.r.t what the study needs in terms of granularity.

![](/img/ML_workflow/Par04_CaloSetup_EnergyDep.png) 

We use a geometry with layers of silicon and tungsten (**SiW**). Aother geometry is built up with materials of scintillator and lead (**SciPb**). One of the geometries consists of a single material, lead tungstate (**PbWO4**). 

For realistic geometries, we use one geometry studied in the context of the electron positron FCC-ee experiment and based on the CLIC detector. This geometry comprises of flat silicon sensors, accompanied with number of materials, most notably tungsten, but also readout and electrode plates, as well as spacing in between layers. In the transverse cross section of the detector flat sensors are placed on octagon.

As mentionned in the workflow, particles showerers are simulated with Geant4 (Geant4-app refers to as developping a Geant4 application for particle simulation). In order to register deposited energy at the granularity level independent on the detector readout, we implemented a **scoring mesh** which is not connected to the physical detector segmentation. The advantage of using this mesh is the possibility of defining a high granularity segmentation independently of the angle at which a particle enters the detector. The energy scoring in a mesh works as follow: whenever a particle enters the volume of the calorimeter, its momentum direction is used to define the position and the orientation of the cylindrical readout structure, which is centred around the particle momentum, as shown in the previous figure. The size of the mesh determines the granularity of the produced showers, and can differ for each of the studied geometries. However, the number of mesh cells should remain identical, as it is directly linked to the model design. The cylindrical readout is presented in the figure below. 

![](/img/ML_workflow/Par04_CaloSetup_CaloSegmentation.png)

Dimensions of the physical detector layers and the mesh readout for the studied geometries are summarised in table below. The number of mesh cells has been optimised to contain on average 95 % of energy of 1 TeV particles.

|  Detector |  Thickness of the active material (mm) |  Thickness of the passive material (mm) |  Number of layers |  R | P | N |
|---|---|---|---|---|---|---|
| SiW | 0.3 | 1.4| 90| 18 | 50| 45 |
| SciPb | 1.2| 1.4| 45| 18 | 50| 45 |  
| PBW04| 200.25|  | 1| 18| 50| 45 |   
| SiW FCC-ee| 0.5 |1.8 |40 |18| 50| 45|  

In some early studies, different granularities were explored such a segmentation of (24,24,24) or (50,48,120) in (r,&phi;,z).

### Particles, energies and angles

For our studies we use different particles, energies and angles. The full simulation samples are showers of electrons and photons generated with an energy range from 1 GeV to 1 TeV (in powers of 2) and angles from 50&deg;to 90&deg; (in a step of 10&deg;). Entrance angle of 90&deg; means perpendicular to the z-axis. Ten thousand particle showers are simulated for each primary particle energy and angle. 


### Data preprocessing 

The output of the full simulation is a [ROOT](https://root.cern) file per energy and angle. Structure of the output file has two branches one containing information collected during the full simulation of particle showers in Geant4 and the second contains histograms of an analysis of shower shapes. In the events branch, information of each cell is stored (energy deposited, r,&phi; and z) and also the energy of the primary particle. 

In order to be able to train the models, the ROOT files are converted into a ML-friendly format [HDF5](https://www.hdfgroup.org/solutions/hdf5/). Dataset of showers are stored as 3D array representing the energy deposition of cells in (r,&phi;,z). The preprocessing component allows us as well to define encoding values of conditional information such as the detector ID, the energy and angle of the incoming particle.


## Validation

The validation is used to access the performance of the model. Figues of merit are based on shower observables, which describe shower characteristics and shape. This validation compares distributions of shower observables of full and fast simulation. There are two validation levels: the standalone validation, performed in python within or after the training, is used as a metric to evaluate the generation power of the model. The validation at the inference time, performed within Geant4 in C++ is used to ensure that the fast simulation is accurate after mapping the inferred energies to positions in the calorimeter.


Among shower observables, there are the so-called shower profiles, which are calculated as fraction of energy in different parts of the calorimeter. The **longitudinal profile** represents the energy deposited by a shower as a function of the depth of the calorimeter (z-axis). The **lateral (transverse) profile** represents the energy density distribution as function of the radial coordinate.  

Individual profiles may vary significantly, due to the nature of the stochastic process of shower development. This can be see in the figure below where it shows the longitudinal profiles of electromagnetic showers of different energies of eletron particles for 1, 10, 100, 1000, 10 000 GeV.   

![](/img/ML_Model/Validation/AverageLongShowerProfile.png)

Moments of the longitudinal and transverse profiles can also be used to validate the fast simulation model. Moments used to characterize ameasure the shape of the graph of the function.   Other quantities such as the energy per layer or the total energy are also used for validation purposes. The energy per layer represents the energy sum of deposited energies in one calorimeter layer (along the z-axis). The total energy represents the sum of energy deposited in the calorimeter (all cells in all layers). 

Other relevant metrics of validation are the simulation time and the memory footprint of the model. The simulation time refers to the time needed for the full/fast simulation appraoch to run particle simulation in Geant4. The memory footrpint is used to measure the amount of memory needed by the fast simulation model to run the inference.  



To read more:

- FCC collaboration. (2019). FCC Physics Opportunities: Future Circular Collider Conceptual Design Report Volume 1. European Physical Journal C, 79(6), 474.
- FCC collaboration. (2019). FCC-ee: The Lepton Collider: Future Circular Collider Conceptual Design Report Volume 2. European Physical Journal: Special Topics, 228(2), 261-623.
- Arominski, D., Blaising, J. J., Brondolin, E., Dannheim, D., Elsener, K., Gaede, F., ... & Xu, B. (2018). A detector for CLIC: main parameters and performance. arXiv preprint arXiv:1812.07337.
- Dotti, A. (2012). Simplified Calorimeter: shower moments. [URL](https://ep-dep-sft.web.cern.ch/sites/default/files/documents/ShowerMoments.pdf) 
- Zaborowska, A. (2017). Calorimetry for the Future Circular Collider experiments (Doctoral dissertation, Warsaw U. of Tech.). 



