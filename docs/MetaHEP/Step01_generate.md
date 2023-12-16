---
sidebar_position: 1
---

# Generate full simulation samples

## Overview

The idea of a general fast shower simulation model is based on the assumption that showers can be represented in an identical format, independent on the physical layouts of the detectors. This is why all showers that we consider (either as model input or output) are represented as energy values scored in a cylindrical mesh readout (a 3D grid), centred around the momentum of the incident particle, as presented in the figure below.

![](/img/MetaHEP/cylinder_detector.png)

Momentum of the particle determines $z$ axis of the local coordinate system. Radius is measured along $r$ axis, and azimuthal angle $\varphi$ is measured in the transverse plane to $z$ axis. There are six parameters of this grid: size and number of cells in the grid in $r, \varphi. z$ coordinates.
$$
(\Delta r, \Delta \varphi, \Delta z), (R, P, N)
$$
Of course given the full coverage in azimuthal angle, $\Delta\varphi = \frac{2\pi}{P}$, hence only 5 parameters are needed to describe the grid.

![](/img/MetaHEP/cylinder_readout.png) 

## Number of cells

ML model that is pre-trained expects a fixed size input, which means that change of (R, P, N) is possible only at the very beginning of the training. Current model expects $\mathbf{(R,P,N)=(18,50,45)}$. We are investigating if more than one granularity would be beneficial for our users (e.g. smaller granularity for better performance).

## Size of cells

Size in the azimuthal angle is determined by the number of cells: $\Delta\varphi = \frac{2\pi}{P}= \frac{2\pi}{50}$.

Size of a single mesh cell in the direction of particle momentum ($z$) and in the distance in the transverse plane from particle momentum ($r$) are the  ** two custom parameters** that each user need to choose. In the training dataset they were chosen to correspond to a similar size expressed in the units of radiation length $X_0$ for $z$ axis and in Moliere radius $R_M$ along $r$ axis.

There is no strict answer as to what distance should be used as a cell size. Thanks to the adaptation process, model can adapt to the new detector and to this new size of the cell. The size of cell will not be seen by model directly, but rather indirectly by a different distribution of energy within a cylinder. Suggestions regarding the cell size are placed below. They can be used as a start point. The size of those cells will have a direct impact on the containment of energy. In the tested sample the cylinders are large enough to contain $98\%$ energy of electrons with highest energy, 1 TeV. This of course should be adapted to the different needs of detectors.

### Longitudinal distance

Size of a cell along $z$ axis, corresponding to the thickness of a cylindrical layer can be chosen to correspond to the thickness of a physical layer of the detector, especially in case of highly grangular sampling calorimeters. For calorimeters with low (or no) longitudinal granularity, a size of $\mathbf{\Delta z = 0.5 - 0.75~X_0}$ is recommended. It is an approximate size, calculated e.g. taking only the absorber into account.

### Radial distance

Size of a cell along $r$ axis, can be chosen to the same size as in the training sample, where it corresponds to  $\mathbf{\Delta r = 0.25~R_M}$ (measured using the absorber properites). It means that the size of the readout mesh in $r$ direction is $R\cdot\Delta r=18\cdot 0.25~R_M=4.5~R_M$.

## Sensitive detector

Custom readout structure requires a custom implementation of the sensitive detector in the detector. It will take energy deposit position in the detector and calculate the cell where this deposit should be recorded based on the position and orientation of the readout mesh.

Examples of this SD implementation can be found in the Par04 example:
- [Par04SensitiveDetector.hh](https://gitlab.cern.ch/geant4/geant4/-/blob/master/examples/extended/parameterisations/Par04/include/Par04SensitiveDetector.hh)
- [Par04SensitiveDetector.cc](https://gitlab.cern.ch/geant4/geant4/-/blob/master/examples/extended/parameterisations/Par04/src/Par04SensitiveDetector.cc)

and in the FCC SW (k4SimGeant4):
- [DynamicMeshCalorimeterSD](https://github.com/HEP-FCC/k4SimGeant4/commit/d98905859296bdb291cc8644b86c6b3515730fa0)

The main difference comes from a different class used to describe a hit. FCC SW uses a built-in hit type to reduce the complexity of a new implementation and to allow o integrate with the existing tools (e.g. to save the output to disk).

## Mesh orientation and position

Readout mesh is oriented and positioned based on the momentum of the incident particle. This means that this momentum must be measured at a frontface of the calorimeter, and this information must be kept and be available from the sensitive detector. This could be achieved in more than one way. An implementation in the example uses saves the incident particle momentum in the event information. A trigger to perform this measurement is achieved by attaching a simple "fast sim" model that onlychecks and stores the momentum.

In Par04 example it is implemented as:
- [Par04DefineMeshModel.hh](https://gitlab.cern.ch/geant4/geant4/-/blob/master/examples/extended/parameterisations/Par04/include/Par04DefineMeshModel.hh)
- [Par04DefineMeshModel.cc](https://gitlab.cern.ch/geant4/geant4/-/blob/master/examples/extended/parameterisations/Par04/src/Par04DefineMeshModel.cc)
- [Par04EventInformation.hh](https://gitlab.cern.ch/geant4/geant4/-/blob/master/examples/extended/parameterisations/Par04/include/Par04EventInformation.hh)
- [Par04EventInformation.cc](https://gitlab.cern.ch/geant4/geant4/-/blob/master/examples/extended/parameterisations/Par04/src/Par04EventInformation.cc)

and in FCC SW (k4SimGeant4) it is implemented in a same manner, but it takes into account DD4hep-created detector and Gaudi as the event processing framework:
- [DefineMeshModel and MeshEventInformation](https://github.com/HEP-FCC/k4SimGeant4/commit/70f37cf21723504ebabdf5fe82526be43782482e)


## Data production

Example code listed above assumes that simulation is run with **single particles**. In case multiple particles will be registered in the calorimeters within the same event, this code must be extended (e.g. by adding a primary track ID to the mesh parameters and the SD hit collections, and then adapt the translation to h5). However, this is not needed for the sake of input production to MetaHEP. Those classes are not needed to run ML model inference, which certainly requires to simulate multiple particles per event (realistic events).

Data samples that need to be produced for the MetaHEP adaptation are the following:
- single electron or photon events (seperate model is used for photons, and seperate one for electrons, but this could also be a condition parameter)
- discrete or continous energy spectrum of incident particles. A pre-training data included discrete spectrum with 11 samples for energies $E=2^n,~n=0,..,10$ so those values are recommended (in the energy range interesting for the user)
- discrete angle spectrum of incident particles. A pre-training data included samples from $50^\circ$ to $90^\circ$, with a $10^\circ$ step. This should also depend on the need of the experiment.
- at least 1'000 events per single-energy single-angle data sample (should be enough to adapt the model)

## Data output format

Produced data in the simulation is stored in a ROOT file. It must be labeled with particle type, energy, and incident angle (e.g. in the filename), and contain energy deposits in a cylindircal mesh. Data may be stored in different formats, depending on the used software framework. ML adaptation requires the shower data to be in a format of HDF5 file. For this reason the data translation script was implemented. It needs to be run first, prior to using that data in the adaptation:

- [root2h5.py](https://gitlab.cern.ch/fastsim/par04/-/blob/master/training/root2h5.py)