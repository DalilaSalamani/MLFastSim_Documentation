---
sidebar_position: 1
---

# From ML training to Geant4 inference

Once the model is trained, tested and validated, it is then deployed in a production framework. ML deployment involves placing this ML model into an environment where it can perform inference for fast shower simulation. This environment is Geant4. 

The ML model trained in a python envirnment needs to be first converted to to a format ready to use in C++. The process of model deployment in Geant4 uses external libraries used for ML inference such as LWTNN and ONNXRuntime. Fast simulation components such as an inference model are implemented. 

## Inference libraries 

### LWTNN

Lightweight Trained Neural Network or **[LWTNN](https://github.com/lwtnn/lwtnn)** is a C++ library to apply neural networks. It has minimal dependencies: Eigen and Boost. It loads and applies the saved model (as a JSON file) using LWTNN in C++. 

After mdoel training, to save it as a format that can be used for inference in C++, it should be saved as two separate files of the architecture (in JSON) and the weights (in HDF5). This operation can be done (in Python) with:

```bash
# save the architecture in a JSON file
with open('architecture.json', 'w') as arch_file:
    arch_file.write(model.to_json())
# save the weights as an HDF5 file
model.save_weights('weights.h5')
```

After building the LWTNN code available at this **[link](https://github.com/lwtnn/lwtnn)**, run the **kerasfunc2json** python script (available in lwtnn/converters/) to generate a template file of your functional model input variables by calling:

```bash
$ kerasfunc2json.py architecture.json weights.h5 > inputs.json
```

And run again **kerasfunc2json** script to get your output file that would be used for the inference in C++:

```bash
$ kerasfunc2json.py architecture.json weights.h5 inputs.json > Generator.json
```

The object that will do the computation in this class is a **LightweightGraph**, initialized from Generator.json file. The inference is based on evaluating the graph using an input inference vector.

### ONNXRuntime

Open Neural Network Exchange Runtime or **[ONNXRuntime](https://github.com/microsoft/onnxruntime)** is a framework for neural networks inference.

After training, to save a model as a format that can be used for inference in C++, for a Keras model for example, first it should be saved as HDF5 file with:

```bash
model.save("model.h5")
```

This model is then converted into an ONNX format using the model converted **[keras2onnx](https://github.com/onnx/keras-onnx)** with: 

```bash
# Create the Keras model
kerasModel = tensorflow.keras.models.load_model(“model.h5”)
# Convert Keras model into an ONNX model
onnxModel = keras2onnx.convert_keras( kerasModel , ‘name’ )
# Save the ONNX model
keras2onnx.save_model(onnxModel, ‘Generator.onnx')
```

The inference code should create an **environment** which manages an internal thread pool and creates as well the **inference session** for the model. This session runs the inference using an input vector.

:::tip Geant4 inference in C++
Check in the next page the **[Par04 example](/docs/G4_Inference/G4_examples)** to see the implementation of the inference in C++ using LWTNN and ONNXRuntime
:::

### Comparison between LWTNN and ONNXRuntime

The table below summarizes the difference between in the two inference libraries in terms of supported ML libraries, disk space and memory footrpint when using the same model to perform inference in Geant4. 


|   |  LWTNN |  ONNXRuntime |  
|---|---|---|
| Supported ML libraries    | Saves only Keras and Sklearn models   |  Saves models from (almost) all libraries  | 
| Supported layers   | All expect:  CNN, Repeat vector, Reshape.  | All  |   
| Supported Activation functions  | All except: Selu, PRelu  | All  |   
| File format  |  JSON | ONNX  |   
| Disk space (MB) | 195  | 28.3  |   
| Resident memory (MB)  | 4000  |  61  |   
| Virtual memory (MB) | 4000  |  52 |   
 

:::tip Tensorflow models and LWTNN
It is also possible to convert a tensorflow model into a Keras model and then use it with LWTNN
:::

For the training, the detector considered is a homogeneous cylinder of lead (PBWO4). It is segmented along (r,&phi;,z)=(24,24,24) to create a readout geometry in the cylindrical coordinates. The model is conditonned on the energy of the incident particle, where a flat energy range is considered for the training going from 1 GeV to 100 GeV. After training the same model is converted into a JSON file and into ONNX. For reference, the disk space for the weights, saved as hdf5 file, is 28.3 MB and the model's architecture, saved as a JSON file is 5.71 kB. The memory footprint of the model presented in the table represents the evaluation of the **inference in C++**. For **LWTNN**, it represents the memory used to compute the graph. For **ONNXRuntime**, it represents the memory used to run the inference session.






 