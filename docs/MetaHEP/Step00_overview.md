---
sidebar_position: 1
---

# MetaHEP

MetaHEP is an ML-aided fast shower simulation that is able to adapt quickly to a new geometry. More details can be found in [ACAT 2021 proceedings](TODO:add) and [a publication](TODO:add). This is a manual for users that want to use MetaHEP on their detectors.

Currently we provide a pre-trained VAE model with high granularity, pre-trained on two datasets [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.6082201.svg)](https://doi.org/10.5281/zenodo.6082201).

Work on a more accurate underlying model is on-going, but any new model or a change in granularity will not affect the overall procedure described in this manual.

The demonstrator is based on [Par04 example of Geant4](https://gitlab.cern.ch/geant4/geant4/-564/tree/master/examples/extended/parameterisations/Par04) and documents how to implement MetaHEP approach on the example of the key4HEP software. A similar approach may be implemented within any experiments framework.

Three consecutive steps are needed in order to integrate MetaHEP with experiment's software framework. Two first steps are necessary to access in a first validation if the underlying model offers satisfying results.

## [Step 1: Generate samples](Step01_generate)

Input (and output) of the ML fast shower model is a 3D regular grid (mesh) of energy deposits, centred around the incident particle momentum.

Preparation of input samples can be achieved in two ways:

1) Custom simulation that allows to score energy in the detector directly in the cylindrical mesh of desired dimensions. This allows to prepare a high granularity input and exploit to the great extend the ML model.

2) [experimental] Re-use of existing simulation datasets and mapping them into the cylindrical mesh. This method is not fully tested and can strongly depend on the difference between the granularity of the existing dataset and the granularity of the mesh. It may lead to lower accuracy as the output of the ML model will contain entries in the high granularity mesh. It allows however, to quickly progress to Step 2.

## [Step 2: Adapt a pre-trained model](Step02_adapt)

While any model can be trained from scratch (including the VAE model released with Par04), there is a benefit of using a pretrained model, which is speed. It takes much less time to adapt the model.

If no changes were made to the size of the cylindrical mesh (number of voxels, because size of each dimension should change according to the radiation length and the Moliere radius), the meta learning approach may be applied. Adaptation of the pre-trained model is described in this section.

## [Step 3: Use ML fast shower simulation](Step03_use)

Inference in the C++ framework can me applied using the classes prepared for Par04. Currently ONNX runtime, lwttn, and Torch are supported.