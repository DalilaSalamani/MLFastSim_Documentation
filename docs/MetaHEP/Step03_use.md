---
sidebar_position: 1
---

# Inference

Once a trained model is stored in as ONNX, or lwtnn (json), or torch model, it can be used in the C++ framework.

A following pictures presents how classes in Par04 examples are defined:

![](/img/MetaHEP/inference.png)

Each user may reuse class that triggers the ML inference (`MLFastSimModel`) and a chosen inference library (e.g. `OnnxInterface`).
There is typically no need to reimplement more than one inference library. Those interfaces to the inference libraries should be generic enough to support typical usecases, and most likely do not need any changes.

The user (model) dependent code is implemented in `InferenceSetup`. If no changes are done to the model, this class may also be simply reused.

Code of the Par04 example:

- [include/](https://gitlab.cern.ch/geant4/geant4/-/blob/master/examples/extended/parameterisations/Par04/include/)
- [src/](https://gitlab.cern.ch/geant4/geant4/-/blob/master/examples/extended/parameterisations/Par04/src/)