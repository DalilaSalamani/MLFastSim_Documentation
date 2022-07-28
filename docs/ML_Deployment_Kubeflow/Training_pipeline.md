---
sidebar_position: 1
---

﻿#Problem Statement:

In [Large Hadron Collider](https://home.cern/science/accelerators/large-hadron-collider) (LHC) experiments at [CERN](https://home.cern/) in Geneva, the calorimeter is a crucial detector technology to measure the energy of particles. These particles interact electromagnetically and/or hadronically with the material of the calorimeter, creating cascades of secondary particles or showers. Describing the showering process relies on simulation methods describing all particle interactions with matter. A detailed and accurate simulation is based on the [Geant4](https://geant4.web.cern.ch/) toolkit. Constrained by the need for precision, the simulation is inherently slow and constitutes a bottleneck for physics analysis. Furthermore, with the upcoming [high luminosity upgrade](https://hilumilhc.web.cern.ch/) of the LHC with more complex events and a much-increased trigger rate, the amount of required simulated events will increase. Machine Learning (ML) techniques such as generative modeling are used as fast simulation alternatives to learn to generate showers in a calorimeter, i.e., simulating the calorimeter response to certain particles. The pipeline of a fast simulation solution can be categorized into five components: data preprocessing, ML model design, validation, inference, and optimization. The preprocessing module allows us to derive a suitable representation of showers and to perform data cleaning, scaling, and encoding. The preprocessed data is then used by the generative model for training. To search for the best set of hyperparameters of the model, techniques such as Automatic Machine Learning (AutoML) are used. The validation component is based on comparing different ML metrics and physics quantities between the input and generated data. The aim of this project is to optimize the ML pipeline of the fast simulation approach using the open-source platform [Kubeflow](https://github.com/kubeflow/kubeflow). Furthermore, a byproduct of this project is that the student will gain expertise in cutting-edge ML techniques and learn to use them in the context of high granularity image generation and fast simulation. Moreover, this project can serve as a baseline for future ML pipelines for all experiments at CERN.

**Objective:**

The project's objective was to use Kubeflow, the platform CERN used to handle the development of a scalable ML Pipeline for the Geant4 Fast Simulation. ML pipelines help in the smooth training process and better logging of experiments being carried out, making them more suitable for analysis. The Geant4 Simulation has two main components:

- Training 
- Inference

Training in the ML pipeline involves curating the ML workflow so that it can be broken down into components that individually hold significance in the whole analysis and simplify the training and validation process for the scientists to gain insights into the ML simulations more efficiently and in a well-presented way. The Geant4 FastSimulation can be broken down into the following components, namely:

- Input Parameters
- Preprocessing of Data
- Model Parameters
- Model architecture and Training 
- Generation of simulations using Decoders
- Validations of Results through Visualisations

**ML Code Base:**

Before beginning the discussion about the Kubeflow Component Creation, it is important to look at the existing code base, which will be molded into Kubeflow Pipeline.

(Image of the Code Base)

From the image above, the basic understanding of the python file structure can be understood. It is important to note that the existing code base structuring forms the basis of Kubeflow pipeline design. The codebase can be found [here.](https://github.com/DalilaSalamani/MLFastSim)

**Kubeflow:**

**What is Kubeflow?**

Kubeflow is an open source end-to-end machine learning stack orchestration toolset based on Kubernetes for deploying, scaling, and managing complex systems. Kubeflow’s features like operating JupyterHub servers allow numerous people to contribute to a project simultaneously. Kubeflow emphasizes detailed project management and in-depth monitoring and analysis of the said project. Data scientists and engineers may now create a fully functional pipeline with segmented steps. These segmented phases in Kubeflow are loosely coupled components of an ML pipeline, a feature not seen in other frameworks that allow pipelines to be reused and modified for subsequent workloads.


**Kubeflow Elements:**

The following section discusses the various Kubeflow elements employed while creating the pipeline.

**Kfp.components.create\_component\_from\_func:** 

Converts a Python function to a component. The following [example](https://kubeflow-pipelines.readthedocs.io/en/1.8.13/source/kfp.components.html#:~:text=in%20a%20container.-,Examples,-The%20function%20name) explains the creation of the kubeflow component from a python function.

**Kfp.components.create\_component\_from\_func\_v2:**

Converts a Python function to a component for the V2 version of kubeflow SDK.

[**kfp.dsl**](https://kubeflow-pipelines.readthedocs.io/en/stable/source/kfp.dsl.html) contains the domain-specific language (DSL) that you can use to define and interact with pipelines and components. 

[**kfp.Client](https://www.kubeflow.org/docs/components/pipelines/sdk/sdk-overview/#:~:text=the%20boolean%20expression.-,kfp.Client,-contains%20the%20Python)** contains the Python client libraries for the Kubeflow Pipelines API.

[**kubectl**](https://kubernetes.io/docs/reference/kubectl/)[:](https://kubernetes.io/docs/reference/kubectl/) Kubernetes provides a command line tool for communicating with a Kubernetes cluster's control plane, using the Kubernetes API.

[**The Kubeflow Pipelines CLI**](https://www.kubeflow.org/docs/components/pipelines/sdk/sdk-overview/#:~:text=your%20GCP%20environment.-,Kubeflow%20Pipelines%20CLI%20tool,-The%20Kubeflow%20Pipelines) tool enables you to use a subset of the Kubeflow Pipelines SDK directly from the command line.

**Kubeflow Pipeline Preparation:**

To design any pipeline, the following steps are essential:

* Confirming the existing workflow that we have an understanding of what all standalone components we can derive which further would become components of Kubeflow Pipeline
* For each python file or function that we have, what are the inputs and the outputs of that particular module
* Kubeflow cannot convert a class or a nested class structure to a pipeline component. Therefore, the class-defining model architectures or custom layers must remain intact and part of the Kubeflow component where it is instantiated. 
* The instantiated model can be saved into the persistent memory and be later called upon in some other component for the downstream tasks.
* Memory management holds a key in Kubeflow. The primitive variables: Boolean, Integer, String, and Float can be passed from one component to another without explicitly storing them in the memory. However, this is usually not the case in real-life scenarios.
* To handle large files or complex data structures like lists, arrays, dictionaries, etc., the component saves these in the memory, making them easily accessible for other components.
* CERN provides some [standard docker images](https://gitlab.cern.ch/ai-ml/kubeflow_images) on which we can run our individual kubeflow components. 
* Usually, the basic docker images are not enough to fulfill the project's requirements, and in those cases, it is better to create your own custom docker images. The steps of creating a custom docker image will be discussed in upcoming sections.
* CERN employs the use of EOS for its memory management. This would be everyone’s go-to place for saving and accessing files for experimentation. The setup of EOS will be discussed in the upcoming sections.
* Kubeflow Visualisations components are still not powerful enough to cater to the needs of an ML Engineer. It is preferred to store the custom graphs, plots, and images in the directory and create an HTML page to showcase your visualizations through Kubeflow because the UI is still incapable of handling the complex visualizations implicitly.
* Kubeflow also provides a powerful tool called Kale which can convert any standard jupyter notebook into a kubeflow pipeline without writing a single line of code. [This method is not preferred since it doesn't offer control over the workflow and eventually would not help in moving ahead with complex code bases.]
* Your component’s goal may be to create a dataset in an external service, such as a BigQuery table. In this case, it may make sense for the component to output an identifier for the produced data, such as a table name, instead of the data itself. We recommend limiting this pattern to cases where the data must be put into an external system instead of keeping it inside the Kubeflow Pipelines system.
* Since input and output paths are passed in as command-line arguments, your component’s code must be able to read inputs from the command line. If your component is built with Python, libraries such as argparse and absl.flags make it easier to read your component’s inputs.
* Your component’s code can be implemented in any language, so long as it can run in a container image.










**Demonstration of converting Python code bases to Kubeflow components:**

To understand the following section, we will dive into a particular python file of the Geant4 FastSim that can be found here and see its existing Kubeflow component here.

1) The First component of the pipeline [Input Parameters]:

`	`![](Aspose.Words.cfb18be7-f32c-42d1-8ac5-8722c3798a0e.001.png)

The same code will look as follows:

![](Aspose.Words.cfb18be7-f32c-42d1-8ac5-8722c3798a0e.002.png)

So following the rules in the previous section, we found that the input parameters will be the first component of the pipeline and thus would be returning all the variables that will be used throughout the pipeline, or we can call it easily accessible for any component present.

- **The preprocessing component:**

The complete preprocess file can be accessed [here](https://github.com/DalilaSalamani/MLFastSim/blob/main/utils/preprocess.py). However, we will see an example of how to transfer complex variables or data structures from one component to another.

Original preprocess:

![](Aspose.Words.cfb18be7-f32c-42d1-8ac5-8722c3798a0e.003.png)

Kubeflow component:

![](Aspose.Words.cfb18be7-f32c-42d1-8ac5-8722c3798a0e.004.png)

The significant difference that can be seen is the introduction of {custom\_file\_paths} which will be storing the NumPy arrays in the EOS memory. Since kubeflow allows easy transfer of strings from one component to another, the file paths would serve as the variable, which would make the loading of this array possible in some stand-alone component that earlier was being handled by local and global variables.

- **Model Setup [Showcasing handling of class structures in case of Kubeflow]:**

The model.py file, as seen here, shows the definition of a Model Class and its functions. The model architecture can be handled either by instantiating it in the same component where it was defined or saving the complete model after the training. The other way is to pickle the class into a pickle object and save it in the memory. This offers the flexibility of reloading the architecture and using it in other components. The only problem, in this case, would be that pickle fails to handle nested class structure which will generally be encountered in actual scenarios thus, it's better to instantiate and train the model in the same component and then exploit the model power for validation, generation, inference and analysis in separate components using the saved model weights, architecture, etc.

- **Reusing the model saved in another component [Generate Component]:**

In generative modeling, the decoder uses the latent space to create the simulations studied as a downstream task. The generate.py file present here showcases the generative modeling employed to produce simulations in our case, we had trained the model and saved the best version in the previous component, and now it will be required here in the ‘generate’ component. The first necessary step is to create a model object with previous instantiations so that we can access the decoder to perform the generations. Lets observe the differences below:

Original generate.py:

![](Aspose.Words.cfb18be7-f32c-42d1-8ac5-8722c3798a0e.005.png)

In the case of Kubeflow, the code structure almost remains the same but with the addition of model definition in the current component so that the object created is capable enough to load the weights, which it will not understand if we don't have the class definition. If the class definition had not been complex, the pickle object would have helped us avoid these repetitions.

The Kubeflow component of generate can be observed here.


-  **KFP function in action:**

In the above points, we saw how the individual python files were now being converted into Kubeflow function formats. The functions are still just functions and not actual components that can be fitted into YAML and uploaded as Kubeflow components. To complete this conversion of function to the component, we do as follows:

![](Aspose.Words.cfb18be7-f32c-42d1-8ac5-8722c3798a0e.006.png)

The above create\_component\_from\_func helps digest the generate function we wrote and create a component, which gets stored in generate\_comp. The base\_image refers to the docker images in which this component would run. In the given example, a custom image has been created with additional requirements handled to suit the use case of the project development environment.

- **Pipeline component Connections:**

Until now, we have seen the construction of individual components and nuances involved in various cases that may arise in an ML project. The final conclusion to any individual component is the connection between its component to formalize a pipeline completely.

The following snippet shows the connection of the pipeline.

```

***@dsl.pipeline(***

`    `***name='ML first',***

`    `***description='ML first).'***

***)***

***def ml\_pipeline\_first():***
\***


`    `***data\_dir = input\_parameters\_comp() \***

`                `***.add\_volume(krb\_secret\_volume) \***

`                `***.add\_volume\_mount(krb\_secret\_volume\_mount) \***

`                `***.add\_volume(eos\_volume) \***

`                `***.add\_volume\_mount(eos\_volume\_mount)***

`    `***preprocessed\_input = preprocess\_comp1(data\_dir.outputs['nCells\_z'],data\_dir.outputs['nCells\_r'],data\_dir.outputs['nCells\_phi'],data\_dir.outputs['original\_dim'],***

`                             `***data\_dir.outputs['min\_energy'],data\_dir.outputs['max\_energy'],data\_dir.outputs['min\_angle'],data\_dir.outputs['max\_angle'],***

`                             `***data\_dir.outputs['init\_dir'],data\_dir.outputs['checkpoint\_dir'],data\_dir.outputs['conv\_dir'],data\_dir.outputs['valid\_dir'],***

`                             `***data\_dir.outputs['gen\_dir']) \***

`                `***.add\_volume(krb\_secret\_volume) \***

`                `***.add\_volume\_mount(krb\_secret\_volume\_mount) \***

`                `***.add\_volume(eos\_volume) \***

`                `***.add\_volume\_mount(eos\_volume\_mount)***

`    `***model\_instantations= model\_input\_parameters\_comp(data\_dir.outputs['original\_dim'],data\_dir.outputs['checkpoint\_dir']) \***

`                `***.add\_volume(krb\_secret\_volume) \***

`                `***.add\_volume\_mount(krb\_secret\_volume\_mount) \***

`                `***.add\_volume(eos\_volume) \***

`                `***.add\_volume\_mount(eos\_volume\_mount)***

`    `***generate = generate\_comp(data\_dir.outputs['max\_energy'],model\_instantations.outputs['checkpoint\_dir'],data\_dir.outputs['gen\_dir'],***

`                              `***model\_instantations.outputs['batch\_size'],model\_instantations.outputs['original\_dim'],***

`                              `***model\_instantations.outputs['latent\_dim'],model\_instantations.outputs['epsilon\_std'],***

`                              `***model\_instantations.outputs['mu'],model\_instantations.outputs['epochs'],***

`                              `***model\_instantations.outputs['lr'],model\_instantations.outputs['outActiv'],***

`                              `***model\_instantations.outputs['validation\_split'],model\_instantations.outputs['wReco'],***

`                              `***model\_instantations.outputs['wkl'],model\_instantations.outputs['ki'],***

`                              `***model\_instantations.outputs['bi'],model\_instantations.outputs['earlyStop']) \***

`                `***.add\_volume(krb\_secret\_volume) \***

`                `***.add\_volume\_mount(krb\_secret\_volume\_mount) \***

`                `***.add\_volume(eos\_volume) \***

`                `***.add\_volume\_mount(eos\_volume\_mount)***

`    `***model\_setup = model\_setup\_comp(model\_instantations.outputs['batch\_size'],model\_instantations.outputs['original\_dim'],***

`                                 `***model\_instantations.outputs['intermediate\_dim1'],model\_instantations.outputs['intermediate\_dim2'],***

`                                 `***model\_instantations.outputs['intermediate\_dim3'],model\_instantations.outputs['intermediate\_dim4'],***

`                                 `***model\_instantations.outputs['latent\_dim'],model\_instantations.outputs['epsilon\_std'],***

`                                 `***model\_instantations.outputs['mu'],model\_instantations.outputs['epochs'],***

`                                 `***model\_instantations.outputs['lr'],model\_instantations.outputs['outActiv'],***

`                                 `***model\_instantations.outputs['validation\_split'],model\_instantations.outputs['wReco'],***

`                                 `***model\_instantations.outputs['wkl'],model\_instantations.outputs['ki'],***

`                                 `***model\_instantations.outputs['bi'],model\_instantations.outputs['earlyStop'],***

`                                 `***model\_instantations.outputs['checkpoint\_dir'],preprocessed\_input.outputs['energies\_train\_location'],***

`                                 `***preprocessed\_input.outputs['condE\_train\_location'],preprocessed\_input.outputs['condAngle\_train\_location'],***

`                                 `***preprocessed\_input.outputs['condGeo\_train\_location']) \***

`                `***.add\_volume(krb\_secret\_volume) \***

`                `***.add\_volume\_mount(krb\_secret\_volume\_mount) \***

`                `***.add\_volume(eos\_volume) \***

`                `***.add\_volume\_mount(eos\_volume\_mount)***

`    `***validate = validate\_comp(generate.outputs['generate\_data'],data\_dir.outputs['nCells\_z'],***

`                             `***data\_dir.outputs['nCells\_r'],data\_dir.outputs['nCells\_phi'],***

`                             `***data\_dir.outputs['save\_dir'],data\_dir.outputs['max\_energy'],***

`                             `***model\_instantations.outputs['checkpoint\_dir'],data\_dir.outputs['init\_dir'],***

`                             `***data\_dir.outputs['gen\_dir'],data\_dir.outputs['save\_dir'],model\_instantations.outputs['original\_dim'],data\_dir.outputs['valid\_dir']) \***

`                `***.add\_volume(krb\_secret\_volume) \***

`                `***.add\_volume\_mount(krb\_secret\_volume\_mount) \***

`                `***.add\_volume(eos\_volume) \***

`                `***.add\_volume\_mount(eos\_volume\_mount)
```

The important factor to observe here is the passing of arguments from one component to another, establishing the link among the components, and defining the workflow.

**Containerizing your components:**

A specific methodology needs to be followed while creating your docker image. The following steps discuss its creation:

'Step1':  $ docker login gitlab-registry.cern.ch

'Step2': Goto this [link](https://gitlab.cern.ch/ai-ml/kubeflow_images/-/tree/cern_14/base) and download the folder. The Dockerfile and requirements.txt found here are the base images over which we will be adding our own additional requirements.

'Step3': *[If unable to login in step 1, try this first and then again put in login credentials]*

$ sudo chmod 666 /var/run/docker.sock

'Step4': Update the requirements.txt file according to the needs of the projects and mention the libraries to be installed using pip.

'Step5': Custom DockerFile content:
```

***# Select a base image from which to extend***

***FROM <your\_alias>:latest***

***# or: FROM custom\_public\_registry/username/image***

***USER root***

***# Install required packages***

***COPY <your\_custom\_requirements.txt> /requirements.txt***

***RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FEEA9169307EA071 8B57C5C2836F4BEB && apt-get -qq update && pip3 install -r /requirements.txt***

***USER jovyan***

***# The following line is mandatory:***

***CMD ["sh", "-c", \***

`     `***"jupyter lab --notebook-dir=/home/jovyan --ip=0.0.0.0 --no-browser \***

`      `***--allow-root --port=8888 --LabApp.token='' --LabApp.password='' \***

`      `***--LabApp.allow\_origin='\*' --LabApp.base\_url=${NB\_PREFIX}"]***
```

'Step6': ```$ docker build. -f <Base\_Dockerfile\_Name>  -t <your\_alias>```

'Step7': $ docker build . -f <Custom\_Dockerfile\_name> -t gitlab-registry.cern.ch/<repo\_name>/<container\_name>:<tag\_name>

'Step8':``` docker push gitlab-registry.cern.ch/<repo\_name>/<container\_name>:<tag\_name>```

'Step9': Once you have pushed the image to the GitLab registry, it is now easily accessible for the containers. My images can be found [here.](https://gitlab.cern.ch/gkohli/mlfastsim-kubeflow-pipeline/container_registry)

**Memory Management using EOS:**

Step1:  git clone https://gitlab.cern.ch/ai-ml/examples.git

Step2: Navigate to examples/pipelines/argo-workflows/access\_eos and login to Kerberos with kinit by typing:

kinit <CERN-USER-ID>

Step3: Delete existing Kerberos Secret:

*kubectl delete secret krb-secret*

Step4: Create a new general Kerberos Secret:

*kubectl create secret generic krb-secret --from-file=/tmp/krb5cc\_1000*

Step5: Configure EOS in the Pipeline Code. Mounting Kerberos and EOS to the kubeflow environment
```

eos\_host\_path = k8s\_client.V1HostPathVolumeSource(path='/var/eos')

eos\_volume = k8s\_client.V1Volume(name='eos', host\_path=eos\_host\_path)

eos\_volume\_mount = k8s\_client.V1VolumeMount(name=eos\_volume.name, mount\_path='/eos')

krb\_secret = k8s\_client.V1SecretVolumeSource(secret\_name='krb-secret')

krb\_secret\_volume = k8s\_client.V1Volume(name='krb-secret-vol', secret=krb\_secret)

krb\_secret\_volume\_mount = k8s\_client.V1VolumeMount(name=krb\_secret\_volume.name, mount\_path='/secret/krb-secret-vol')
```


Step 6: $ To add the volumes so that EOS is accessible through each component, we add the following to each of the function components created using the kfp sdk:

```
.add\_volume(krb\_secret\_volume) \

`                `.add\_volume\_mount(krb\_secret\_volume\_mount) \

`                `.add\_volume(eos\_volume) \

`                `.add\_volume\_mount(eos\_volume\_mount)

```

Step7: Once the above setup completes, we can access publicly visible files from the EOS.

