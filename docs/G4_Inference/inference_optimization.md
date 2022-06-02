---
sidebar_position: 3
---

# Inference optimization

One of the figures of merit for selecting the best performing ML fast simulation model is the one with the best accuray while keeping the memory footprint as small as possible. Advances in memory optimization techniques allow the task of inference to have a small memory footprint. Employing these techniques can result in few factors of smaller memory footprint than a non optimzed model.


## Optimization with ONNXRuntime 

### Graph optimization in ONNXRuntime 

Graph optimizations are graph-level transformations. ONNXRuntime provides various graph optimizations to improve model performance.Among those: 

- Basic Graph Optimizations : which perform a removal of redundant nodes and redundant computations
- Extended Graph Optimizations: which fuse nodes

Graph optimizations can be performed either in:
- Online mode: where the optimizations are done before the inference. 
- Offline mode: the runtime saves the optimized graph to disk. 

ONNX Runtime provides Python, C#, C++, and C APIs to enable different optimization levels and to choose between offline vs. online mode.

### Quantization in ONNX Runtime

[Quantization in ONNX Runtime](https://onnxruntime.ai/docs/performance/quantization.html) refers to 8 bit linear quantization. Floating point real values are mapped to an 8 bit quantization space.

The table below shows the disk space and the memory footprint of the model using the quantization.

|   |  Raw model |  Quantized model |  
|---|---|---|
| Disk space (MB)  |    551        |           139         |  
| Resident memory (MB)  |    2265.34         |       650.414             |  
| Virtual memory(MB)  |     3205.26        |        1339.22            |  

Graph optimization of a quantized model in an online mode would give:

|   |  Basic optimization|  Extended mooptimizationdel |  
|---|---|---|
|  Resident memory (MB) |  650.414        |   555.828       |  
|  Virtual memory (MB) |    1339.22     |    1073.21     |  


### Model profiling 

Using ONNXRuntime, we can enable model execution profiling by setting this in the inference session options. This saves a JSON file which can be used by trace event profiling tools such as chrome for tracing, in order to analyze the execution for example to refine and check time and effect of sequential or parallel execution.

The image below shows the execution profile of running a single shower simulation event. We can see there are three sequential steps:

- Model loading
- Session initialization : doing graph optim exe when the model is loaded
- Inference running  


![](/img/Geant4_Inference/Inference_optimization/ONNX_Profile_1.png)


If we zoom into the inference running, we can see the model run time, the sequential executtor and all the set of operations used by the model such as the **Relu** activation function (red circle), where the tool can provide us more information such as the wall duration (0.007ms) and the provider which is a CPU executor.

![](/img/Geant4_Inference/Inference_optimization/ONNX_Profile_2.png)


:::tip Sequential executor 
This means that the graph is not solved in a parallel way but sequentially 
:::

To read more:

- Graph Optimizations in ONNX Runtime, [URL](https://onnxruntime.ai/docs/performance/graph-optimizations.html)