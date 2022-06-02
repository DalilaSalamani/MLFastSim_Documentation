---
sidebar_position: 2
---

# Geant4 examples

## Par04

**[Par04](https://gitlab.cern.ch/geant4/geant4/-/tree/master/examples/extended/parameterisations/Par04)** is a Geant4 example which demonstrates how to use ML techniques for the fast simulation of calorimeters, and how to incorporate inference libraries into C++ framework. The example depends on external libraries used for the ML inference. Currently, **[LWTNN](https://github.com/lwtnn/lwtnn)** and **[ONNXRuntime](https://github.com/microsoft/onnxruntime)** libraries can be used.

### Calorimeter setup

The calorimeter in this example, is a setup of concentric cylinders of layers. Each layer consists of active and passive material (or just active material for homogeneous calorimeters). Energy deposits are scored in the detector using the cylindrical readout structure, centred around the particle momentum. In this example two detector geometries are used SiW and SciPb with a very granular segmentation (r,&phi;,z)=(18,50,45) described in the calorimeter setup and mesh definition of this page. 

Detector and readout (mesh) used in the example macros are configured with following commands:

```bash
# Detector Construction
/Par04/detector/setDetectorInnerRadius 80 cm
/Par04/detector/setDetectorLength 2 m
/Par04/detector/setNbOfLayers 90
/Par04/detector/setAbsorber 0 G4_W 1.4 mm false
/Par04/detector/setAbsorber 1 G4_Si 0.3 mm true
## 2.325 mm of tungsten =~ 0.25 * 9.327 mm = 0.25 * R_Moliere
/Par04/mesh/setSizeOfRhoCells 2.325 mm
## 2 * 1.4 mm of tungsten =~ 0.65 X_0
/Par04/mesh/setSizeOfZCells 3.4 mm
/Par04/mesh/setNbOfRhoCells 18
/Par04/mesh/setNbOfPhiCells 50
/Par04/mesh/setNbOfZCells 45
```

### Training data

The full simulation samples for the two detector geometries (**SiW** and **SciPb**) are showers of electrons generated with an energy range from 1 GeV to 1 TeV (in powers of 2) and angles from 50&deg;to 90&deg; (in a step of 10&deg;). Entrance angle of 90&deg;means perpendicular to the z-axis. Ten thousand particle showers are simulated for each primary particle energy and angle.  

### ML model 

The model used in this example was trained externally (in Python) on data from this examples’ full simulation. It is a Variational Autoencoder (VAE) composed of two stacked deep neural networks acting as encoder and decoder. The encoded distributions are constrained to be Gaussian distributions and the encoder is tasked to return the mean and the covariance matrix that describe these distributions. The loss function that is optimized during the training of the VAE is composed of a regularisation loss to minimize Kulback-Leibler divergence between encoded distributions and prior Gaussian distributions, a reconstruction loss to minimize the error by computing the binary cross-entropy between the input and its reconstruction version using the latent representation.

The VAE architecture used in this example comprises 4 hidden layers with width of 100,50,20,14 and 14,20,50,100 for the encoder and decoder respectively as shown in the figure below.

![](/img/Geant4_Inference/Geant4_examples/Par04_MLModel.png)


### Validation

The three figures below show the validation plots comparing the full simulation to the (ML) fast simulation after using the inference with **ONNXRuntime**. The plots show the longitudinal, transverse profiles and simulation time for 64 GeV particles with an angle of 90&deg; for the **SiW** geometry.

![](/img/Geant4_Inference/Geant4_examples/Par04_LongProfile.png)
![](/img/Geant4_Inference/Geant4_examples/Par04_LatProfile.png)
![](/img/Geant4_Inference/Geant4_examples/Par04_SimTime.png)

:::tip More details

More details on this example can be found in the **[Geant4 Book For Application Developers](https://geant4-userdoc.web.cern.ch/UsersGuides/ForApplicationDeveloper/html/Examples/extended/Par04.html#par04)**.

:::


