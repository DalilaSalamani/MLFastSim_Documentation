---
sidebar_position: 1
---

## Objective

The project's objective is to use Kubeflow, whose instance is hosted at [ml.cern.ch](https://ml.cern.ch/) to handle the development of a scalable ML Pipeline for the ML FastSimulation in Geant4. The Training would be used to generate a optimised tuned generative model which will later be connected with Inference. Motivation behind using Kubeflow ML pipelines is as follows:
- Utilise power of Kubernetes to run ML jobs
- Web UI to interact with components and features
- Support for the entire lifecycle of ML applications
- Training, inference, deployment
- Open source, wide community support

##### The ML FastSim in Geant4 has two main components:
- Training 
- Inference

Training a  pipeline involves preparing an ML workflow that can be broken down into individual functionalities through which respective Pipeline components can be derived and made into a separate entity. Some basic functionalities are Input Parameters, Preprocessing, Exploratory Data Analysis, Model Hyperparameters, Model architecture definition, Model Instantiation and training, Model Validation, Tuning and many more based on the type of projects we are trying to deal with.

**The ML FastSimulation (Training) in Geant4 can be broken down into the following functional components, namely:**
- Input Parameters
- Preprocessing of Data
- Model Parameters
- Model architecture and Training 
- Generation of Showers (Generative Modelling)
- Validations of Results through Visualisations


**Exisitng ML Code Base:**

Before beginning the discussion about the Kubeflow Component Creation, it is important to look at the existing code base, which will be molded into Kubeflow Pipeline.
```
|---convert.py
|---generate.py
|---README.md
|---requirements.txt
|---setup.py
|---train.py
|---validate.py
|   
+---core
|-------constants.py
|-------model.py
|       
+---utils
|-------observables.py
|-------preprocess.py
```

From the image above, the basic understanding of the python file structure can be understood. It is important to note that the existing code base structuring forms the basis of Kubeflow pipeline design. The Full codebase can be found [here.](https://github.com/DalilaSalamani/MLFastSim)

## Kubeflow
***

**What is Kubeflow?**
Kubeflow is an open source end-to-end machine learning stack orchestration toolset based on Kubernetes for deploying, scaling, and managing complex systems. Kubeflow emphasizes detailed project management and in-depth monitoring and analysis of the said project. Data scientists and engineers can now create a fully functional pipeline composed of standard ML operations broken down in the form of individual entities. These entities in Kubeflow are loosely coupled components of an ML pipeline, a feature not seen in other frameworks that allow pipelines to be reused and modified for subsequent workloads.

**Kubeflow Pipeline** 
Kubeflow Pipelines is the Kubeflow extension that provides the tools to create machine learning workflows. Basically these workflows are chains of tasks designed in the form of graphs and that are represented as Directed Acyclic Graphs (DAGs). Each node of the graph is called a component, where that component represents a self-contained task which lives inside a docker container

**Kubeflow Elements:**
The following section gives a brief about some functions,keywords and commands which are constantly used while creating a Kubeflow Pipeline. These elements are native to Kubeflow and helps in making the process easier for us:

##### Kubeflow Packages
- [**kfp.Client**](https://www.kubeflow.org/docs/components/pipelines/sdk/sdk-overview/#:~:text=the%20boolean%20expression.-,kfp.Client,-contains%20the%20Python) contains the Python client libraries for the Kubeflow Pipelines API.
- [**kfp.dsl**](https://kubeflow-pipelines.readthedocs.io/en/stable/source/kfp.dsl.html) contains the domain-specific language (DSL) that you can use to define and interact with pipelines and components. 
- [**kfp.components**](https://www.kubeflow.org/docs/components/pipelines/sdk/sdk-overview/#:~:text=resources%20for%20execution.-,kfp.components,-includes%20classes%20and) includes classes and methods for interacting with pipeline components.
- [**kfp.compiler**](https://www.kubeflow.org/docs/components/pipelines/sdk/sdk-overview/#:~:text=the%20following%20packages%3A-,kfp.compiler,-includes%20classes%20and) includes classes and methods for compiling pipeline Python DSL into a workflow yaml spec.

##### Kubeflow functions
>Note :Its important to note that Kubeflow Pipeline SDK currently have two versions: v1 and v2. The current pipeline developed in the project was done using v1 but for future reference it is important to consider the migration to stable v2 version as well.
- **Kfp.components.create\_component\_from\_func:** Converts a user defined Python function to a Kubeflow component. The following [example](https://kubeflow-pipelines.readthedocs.io/en/1.8.13/source/kfp.components.html#:~:text=in%20a%20container.-,Examples,-The%20function%20name) explains about the given function in details. 
- **Kfp.components.create\_component\_from\_func\_v2:** Converts a Python function to a component for the v2 version of kubeflow SDK.

[**The Kubeflow Pipelines CLI**](https://www.kubeflow.org/docs/components/pipelines/sdk/sdk-overview/#:~:text=your%20GCP%20environment.-,Kubeflow%20Pipelines%20CLI%20tool,-The%20Kubeflow%20Pipelines) tool enables you to use a subset of the Kubeflow Pipelines SDK directly from the command line.

[**kubectl**](https://kubernetes.io/docs/reference/kubectl/)[:](https://kubernetes.io/docs/reference/kubectl/) Kubernetes provides a command line tool for communicating with a Kubernetes cluster's control plane, using the Kubernetes API.



**Kubeflow Pipeline Preparation:**

To design any pipeline, the following steps are essential:

* Identify individual functionalities present in the Workflow as they can simply be considered as the Kubeflow component. This early identification can help in envisioning the pipeline structure easily.
* For each python file or function that we have, understand and confirm what are the inputs and the outputs of that particular module
* Kubeflow cannot convert a class or a nested class structure to a pipeline component. Therefore, the definition of  model architectures or custom layers definition  must remain intact and part of a single Kubeflow component where it is later instantiated. 
* The Trained model can be saved into the persistent memory and be later called upon in some other component for the downstream tasks.
* The primitive variables: Boolean, Integer, String, and Float can be passed from one component to another without explicitly storing them in the memory. 
* To handle large files or complex data structures like lists, arrays, dictionaries, etc., it is important that the component saves these in the memory,so that later they are accessible for other components.
* CERN provides some [standard docker images](https://gitlab.cern.ch/ai-ml/kubeflow_images) on which we can run our individual kubeflow components. 
* Usually, the basic docker images are not enough to fulfill the project's requirements, and in those cases, it is better to create your own custom docker images. The steps of creating a custom docker image will be discussed in upcoming sections.
* CERN employs the use of EOS for its memory management. This would be everyone’s go-to place for saving and accessing files for experimentation. The setup of EOS will be discussed `Memory Management Section`.
* Kubeflow Visualisations components suits the purpose of mostly classification models and basic regression metrics which are enough to cater to the needs of an ML Engineer. It is preferred to store the custom graphs, plots, and images in the directory and create an HTML page to showcase your visualizations through Kubeflow because the UI is still incapable of handling the complex visualizations implicitly.
* Kubeflow also provides a powerful tool called Kale which can convert any standard jupyter notebook into a kubeflow pipeline without writing a single line of code. [This method is not preferred since it doesn't offer control over the workflow and eventually would not help in moving ahead with complex code bases.]
* Your component’s goal may be to create a dataset in an external service, such as a BigQuery table. In this case, it may make sense for the component to output an identifier for the produced data, such as a table name, instead of the data itself. We recommend limiting this pattern to cases where the data must be put into an external system instead of keeping it inside the Kubeflow Pipelines system.
* Since input and output paths are passed in as command-line arguments, your component’s code must be able to read inputs from the command line. If your component is built with Python, libraries such as argparse and absl.flags make it easier to read your component’s inputs.
* Your component’s code can be implemented in any language, so long as it can run in a container image.

##### Project Component Discussion
***
##### Input Paramters
The following component initialises the variables that will be common to all the components throughout. They can be treated as a set of global variables whose access would be required numerously by other functions. To construct this component it is important to note that it will act as the first pipeline component and thus would not include any input in the function definition. The function aims to returns all the parameters which can be seen in the `Demonstration` Section.
_Component creation of this function_: 
```
input_parameters_comp = create_component_from_func(
    func=input_parameters,
    base_image='python:3.7')
```

##### Preprocessing of Data
In the original code base the preprocess.py consisted of the `preprocess` along with ` get_condition_arrays ` and `load_showers` However when structuring the preprocess component only the   `preprocess` was kept a part of the component as it served the purpose of generating `energies_train, cond_e_train, cond_angle_train, cond_geo_train.`. In kubeflow these variables cant be directly passed into the downstream components therefore it was important to first save them in `EOS` and return their paths as outputs from this components. Also the preprocess uses the global varibales from the input parameters above and thus this shows are first basic Kubeflow Connection. The following discussion can be well understood in the `Demonstration section`.
_Component creation of this function_: 
```
preprocess_comp = create_component_from_func(
func=preprocess,
base_image='gitlab-registry.cern.ch/ai-ml/kubeflow_images/tensorflow-notebook-gpu-2.1.0:v0.6.1-33')
```

##### Model Parameters
The Parameters involving models had to be kept as a separate Kubeflow component because this component would later be attached with`Katib` in the next phase which would help in managing the Hyperparameter Tuning of our model. 
_Component creation of this function_: 
```
input_parameters_comp = create_component_from_func(
    func=input_parameters,
    base_image='python:3.7')
```

##### Model Setup:
The core component of any ML workflow is the model architecture definition and training. At first the aim was to pickle the Model definition and reload it into a training component and carry on the other implementations from that point however it was not possible because python pickle module faces lots of errors while pickling nested class structure and objects because of which it was not able to pickle the Model definition which consisted of `VAE, VAEHandler, Sampling Layer and Reparameterizr layer`. Due to this it became difficult to construct a modular pipeline and the component was restructured in a way that the Class definition, Instantiation as well as training was combined and the Model was saved in the EOS at specified location. This component was connected with all the previously discussed components since it required the outputs from all the above corresponding components. CERN Base image tends to use `TF2.1` which was different from the development environment of the FastSim project hence it was important to create our custom image and push it to the registry so that it could be accessed inside the pod assigned to us for the devlopment.The detailed steps have been discussed in the `Containerizing your components`. The below code snippet shows a custom image that was created by me which include `TF2.8`
_Component creation of this function_: 
```
input_parameters_comp = create_component_from_func(
func=input_parameters,
base_image='gitlab-registry.cern.ch/gkohli/mlfastsim-kubeflow-pipeline/kube_gkohli:cern_pipelinev2')
```

**Demonstration of converting Python code bases to Kubeflow components:**

To understand the following section, we will dive into a particular python file of the Geant4 FastSim that can be found here and see its existing Kubeflow component here.

- **The First component of the pipeline [Input Parameters]**

`	`![](Aspose.Words.cfb18be7-f32c-42d1-8ac5-8722c3798a0e.001.png)

The same code will look as follows:

![](Aspose.Words.cfb18be7-f32c-42d1-8ac5-8722c3798a0e.002.png)

So following the rules in the previous section, we found that the input parameters will be the first component of the pipeline and thus would be returning all the variables that will be used throughout the pipeline, or we can call it easily accessible for any component present.

- **The preprocessing component**

The complete preprocess file can be accessed [here](https://github.com/DalilaSalamani/MLFastSim/blob/main/utils/preprocess.py). However, we will see an example of how to transfer complex variables or data structures from one component to another.

Original preprocess:
```
def preprocess():
    energies_train = []
    cond_e_train = []
    cond_angle_train = []
    cond_geo_train = []
    # This example is trained using 2 detector geometries
    for geo in ["SiW", "SciPb"]:
        dir_geo = INIT_DIR + geo + "/"
        # loop over the angles in a step of 10
        for angle_particle in range(MIN_ANGLE, MAX_ANGLE + 10, 10):
            f_name = f"{geo}_angle_{angle_particle}.h5"
            f_name = dir_geo + f_name
            # read the HDF5 file
            h5 = h5py.File(f_name, "r")
            # loop over energies from min_energy to max_energy
            energy_particle = MIN_ENERGY
            while energy_particle <= MAX_ENERGY:
                # scale the energy of each cell to the energy of the primary particle (in MeV units)
                events = np.array(h5[f"{energy_particle}"]) / (energy_particle * 1000)
                energies_train.append(events.reshape(len(events), ORIGINAL_DIM))
                # build the energy and angle condition vectors
                cond_e_train.append([energy_particle / MAX_ENERGY] * len(events))
                cond_angle_train.append([angle_particle / MAX_ANGLE] * len(events))
                # build the geometry condition vector (1 hot encoding vector)
                if geo == "SiW":
                    cond_geo_train.append([[0, 1]] * len(events))
                if geo == "SciPb":
                    cond_geo_train.append([[1, 0]] * len(events))
                energy_particle *= 2
    # return numpy arrays
    energies_train = np.concatenate(energies_train)
    cond_e_train = np.concatenate(cond_e_train)
    cond_angle_train = np.concatenate(cond_angle_train)
    cond_geo_train = np.concatenate(cond_geo_train)
    return energies_train, cond_e_train, cond_angle_train, cond_geo_train
```
Kubeflow component:
```
# preprocess function loads the data and returns the array of the shower energies and the condition arrays 
def preprocess_new(nCells_z:int,nCells_r:int,nCells_phi:int,original_dim:int,min_energy: int,max_energy: int,
                     min_angle :int,max_angle :int,init_dir :str,checkpoint_dir :str,conv_dir :str,valid_dir :str,gen_dir :str)-> NamedTuple('Variable_Details',
                            [('energies_train_location', str), ('condE_train_location', str), ('condAngle_train_location', str), ('condGeo_train_location', str)]):
    import h5py
    import numpy as np
    energies_Train = []
    condE_Train = []
    condAngle_Train = []
    condGeo_Train = []
    # This example is trained using 2 detector geometries
    for geo in [ 'SciPb'  ]: 
        dirGeo = init_dir + geo + '/'
        # loop over the angles in a step of 10
        for angleParticle in range(min_angle,max_angle+10,10): 
            fName = '%s_angle_%s.h5' %(geo,angleParticle)
            fName = dirGeo + fName
#             read the HDF5 file
            h5 = h5py.File(fName,'r')
            # loop over energies from min_energy to max_energy
            energyParticle = min_energy
            while(energyParticle<=max_energy):
                # scale the energy of each cell to the energy of the primary particle (in MeV units) 
                events = np.array(h5['%s'%energyParticle])/(energyParticle*1000)
                energies_Train.append(events.reshape(len(events),original_dim))
                # build the energy and angle condition vectors
                condE_Train.append( [energyParticle/max_energy]*len(events) )
                condAngle_Train.append( [angleParticle/max_angle]*len(events) )
                # build the geometry condition vector (1 hot encoding vector)
                if( geo == 'SiW' ):
                    condGeo_Train.append( [[0,1]]*len(events) )
                if( geo == 'SciPb' ):
                    condGeo_Train.append( [[1,0]]*len(events) )
                    print("Done")
                energyParticle *=2
    # return numpy arrays 
    energies_Train = np.concatenate(energies_Train)
    condE_Train = np.concatenate(condE_Train)
    condAngle_Train = np.concatenate(condAngle_Train)
    condGeo_Train = np.concatenate(condGeo_Train)
    energies_train_location='/eos/user/g/gkohli/input_save/energies_train4.npy'
    np.save(energies_train_location,energies_Train)
    condE_train_location='/eos/user/g/gkohli/input_save/condE_train.npy'
    np.save(condE_train_location,condE_Train)
    condAngle_train_location='/eos/user/g/gkohli/input_save/condAngle_train.npy'
    np.save(condAngle_train_location,condAngle_Train)
    condGeo_train_location='/eos/user/g/gkohli/input_save/condGeo_train.npy'
    np.save(condGeo_train_location,condGeo_Train)
    return energies_train_location,condE_train_location,condAngle_train_location,condGeo_train_location
```

The significant difference that can be seen is the introduction of {custom\_file\_paths} which will be storing the NumPy arrays in the EOS. Since kubeflow allows easy transfer of strings from one component to another, the file paths would can be used to load variable's content from the memoryand this willmake the loading of this array possible in some others component.

- **Model Setup which discusses handling of class structures in case of Kubeflow]:**

The model.py file, as seen [here](https://github.com/DalilaSalamani/MLFastSim/blob/main/core/model.py) shows the definition of a Model Class and its functions. The model architecture can be handled either by instantiating it in the same component where it was defined and saving the complete model after the training. The other way is to pickle the class into a pickle object and save it in the memory. This offers the flexibility of reloading the architecture and using it in other components. The only problem, in the latter case, is that pickle fails to handle nested class structure which will generally be encountered in actual scenarios thus, it's better to instantiate and train the model in the same component and then exploit the model power for validation, generation, inference and analysis in separate components using the saved model weights, architecture, etc.

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
@dsl.pipeline(
    name='ML first',
    description='ML first).'
)
def ml_pipeline_first():
    
    data_dir = input_parameters_comp() \
                .add_volume(krb_secret_volume) \
                .add_volume_mount(krb_secret_volume_mount) \
                .add_volume(eos_volume) \
                .add_volume_mount(eos_volume_mount)

    preprocessed_input = preprocess_comp1(data_dir.outputs['nCells_z'],data_dir.outputs['nCells_r'],data_dir.outputs['nCells_phi'],data_dir.outputs['original_dim'],
                             data_dir.outputs['min_energy'],data_dir.outputs['max_energy'],data_dir.outputs['min_angle'],data_dir.outputs['max_angle'],
                             data_dir.outputs['init_dir'],data_dir.outputs['checkpoint_dir'],data_dir.outputs['conv_dir'],data_dir.outputs['valid_dir'],
                             data_dir.outputs['gen_dir']) \
                .add_volume(krb_secret_volume) \
                .add_volume_mount(krb_secret_volume_mount) \
                .add_volume(eos_volume) \
                .add_volume_mount(eos_volume_mount)
    model_instantations= model_input_parameters_comp(data_dir.outputs['original_dim'],data_dir.outputs['checkpoint_dir']) \
                .add_volume(krb_secret_volume) \
                .add_volume_mount(krb_secret_volume_mount) \
                .add_volume(eos_volume) \
                .add_volume_mount(eos_volume_mount)
    generate = generate_comp(data_dir.outputs['max_energy'],model_instantations.outputs['checkpoint_dir'],data_dir.outputs['gen_dir'],
                              model_instantations.outputs['batch_size'],model_instantations.outputs['original_dim'],
                              model_instantations.outputs['latent_dim'],model_instantations.outputs['epsilon_std'],
                              model_instantations.outputs['mu'],model_instantations.outputs['epochs'],
                              model_instantations.outputs['lr'],model_instantations.outputs['outActiv'],
                              model_instantations.outputs['validation_split'],model_instantations.outputs['wReco'],
                              model_instantations.outputs['wkl'],model_instantations.outputs['ki'],
                              model_instantations.outputs['bi'],model_instantations.outputs['earlyStop']) \
                .add_volume(krb_secret_volume) \
                .add_volume_mount(krb_secret_volume_mount) \
                .add_volume(eos_volume) \
                .add_volume_mount(eos_volume_mount)
    model_setup = model_setup_comp(model_instantations.outputs['batch_size'],model_instantations.outputs['original_dim'],
                                 model_instantations.outputs['intermediate_dim1'],model_instantations.outputs['intermediate_dim2'],
                                 model_instantations.outputs['intermediate_dim3'],model_instantations.outputs['intermediate_dim4'],
                                 model_instantations.outputs['latent_dim'],model_instantations.outputs['epsilon_std'],
                                 model_instantations.outputs['mu'],model_instantations.outputs['epochs'],
                                 model_instantations.outputs['lr'],model_instantations.outputs['outActiv'],
                                 model_instantations.outputs['validation_split'],model_instantations.outputs['wReco'],
                                 model_instantations.outputs['wkl'],model_instantations.outputs['ki'],
                                 model_instantations.outputs['bi'],model_instantations.outputs['earlyStop'],
                                 model_instantations.outputs['checkpoint_dir'],preprocessed_input.outputs['energies_train_location'],
                                 preprocessed_input.outputs['condE_train_location'],preprocessed_input.outputs['condAngle_train_location'],
                                 preprocessed_input.outputs['condGeo_train_location']) \
                .add_volume(krb_secret_volume) \
                .add_volume_mount(krb_secret_volume_mount) \
                .add_volume(eos_volume) \
                .add_volume_mount(eos_volume_mount)
    validate = validate_comp(generate.outputs['generate_data'],data_dir.outputs['nCells_z'],
                             data_dir.outputs['nCells_r'],data_dir.outputs['nCells_phi'],
                             data_dir.outputs['save_dir'],data_dir.outputs['max_energy'],
                             model_instantations.outputs['checkpoint_dir'],data_dir.outputs['init_dir'],
                             data_dir.outputs['gen_dir'],data_dir.outputs['save_dir'],model_instantations.outputs['original_dim'],data_dir.outputs['valid_dir']) \
                .add_volume(krb_secret_volume) \
                .add_volume_mount(krb_secret_volume_mount) \
                .add_volume(eos_volume) \
                .add_volume_mount(eos_volume_mount)
```

The important factor to observe here is the passing of arguments from one component to another, establishing the link among the components, and defining the workflow.

##### Containerizing your components

A specific methodology needs to be followed while creating your docker image. The following steps discuss its creation:

`Step1`:  ```$ docker login gitlab-registry.cern.ch```

`Step2`: Goto this [link](https://gitlab.cern.ch/ai-ml/kubeflow_images/-/tree/cern_14/base) and download the folder. The Dockerfile and requirements.txt found here are the base images over which we will be adding our own additional requirements.

`Step3`: **If unable to login in step 1, try this first and then again put in login credentials**

```$ sudo chmod 666 /var/run/docker.sock```

`Step4`: Update the requirements.txt file according to the needs of the projects and mention the libraries to be installed using pip.

`Step5`: Custom DockerFile content:
```
# Select a base image from which to extend
FROM testrun1:latest
# or: FROM custom_public_registry/username/image

USER root

# Install required packages
COPY custom_requirements.txt /requirements.txt
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FEEA9169307EA071 8B57C5C2836F4BEB && apt-get -qq update && pip3 install -r /requirements.txt

USER jovyan

# The following line is mandatory:
CMD ["sh", "-c", \
     "jupyter lab --notebook-dir=/home/jovyan --ip=0.0.0.0 --no-browser \
      --allow-root --port=8888 --LabApp.token='' --LabApp.password='' \
      --LabApp.allow_origin='*' --LabApp.base_url=${NB_PREFIX}"]
```

`Step6`: ```$ docker build. -f <Base\_Dockerfile\_Name>  -t <your\_alias>```

`Step7`: ```$ docker build . -f <Custom\_Dockerfile\_name> -t gitlab-registry.cern.ch/<repo\_name>/<container\_name>:<tag\_name>```

`Step8`:``` $ docker push gitlab-registry.cern.ch/<repo\_name>/<container\_name>:<tag\_name>```

`Step9`: Once you have pushed the image to the GitLab registry, it is now easily accessible for the containers. My images can be found [here.](https://gitlab.cern.ch/gkohli/mlfastsim-kubeflow-pipeline/container_registry)

##### Memory Management using EOS

`Step1`:  ```$ git clone https://gitlab.cern.ch/ai-ml/examples.git```

`Step2`: Navigate to examples/pipelines/argo-workflows/access\_eos and login to Kerberos with kinit by typing:
`$ kinit <CERN-USER-ID>`

`Step3`: Delete existing Kerberos Secret:
`kubectl delete secret krb-secret`

`Step4`: Create a new general Kerberos Secret:

```kubectl create secret generic krb-secret --from-file=/tmp/krb5cc\_1000```

`Step5`: Configure EOS in the Pipeline Code. Mounting Kerberos and EOS to the kubeflow environment
```
eos\_host\_path = k8s\_client.V1HostPathVolumeSource(path='/var/eos')
eos\_volume = k8s\_client.V1Volume(name='eos', host\_path=eos\_host\_path)
eos\_volume\_mount = k8s\_client.V1VolumeMount(name=eos\_volume.name, mount\_path='/eos')

krb\_secret = k8s\_client.V1SecretVolumeSource(secret\_name='krb-secret')
krb\_secret\_volume = k8s\_client.V1Volume(name='krb-secret-vol', secret=krb\_secret)
krb\_secret\_volume\_mount = k8s\_client.V1VolumeMount(name=krb\_secret\_volume.name, mount\_path='/secret/krb-secret-vol')
```

`Step 6`: To add the volumes so that EOS is accessible through each component, we add the following to each of the function components created using the kfp sdk:

```
.add\_volume(krb\_secret\_volume) \
`                `.add\_volume\_mount(krb\_secret\_volume\_mount) \
`                `.add\_volume(eos\_volume) \
`                `.add\_volume\_mount(eos\_volume\_mount)
```
`Step7`: Once the above setup completes, we can access publicly visible files from the EOS.





















**This page is under construction**
