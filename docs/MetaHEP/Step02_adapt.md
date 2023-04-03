---
sidebar_position: 1
---

# Adaptation

The adaptation code to perform the adaptation step on a new geometry using a pre-trained model is available in this [repository](https://gitlab.cern.ch/fastsim/metahep).

- **utils/preprocess.py**: defines the data loading and preprocessing functions.
- utils/hyperparameter_tuner.py: defines the HyperparameterTuner class.
- utils/gpu_limiter.py: defines a logic responsible for GPU memory management.
- utils/observables.py: defines a set of observable possibly calculated from a shower.
- utils/plotter.py: defines plotting classes responsible for manufacturing various plots of observables.

- **core/constants.py**: defines the set of common variables.
- core/models/handler.py: defines a handler to construct the model.
- core/models/vae.py: defines the VAE model class and a handler to construct the model.

- adapt.py: performs model adaptation.
- convert.py: defines the conversion function to an ONNX file.
- tune_model.py: performs hyperparameter optimization.

W&B (Weights and Biases), the ML experiment management platform, is used for tracking, visualizing, and analyzing the adaptation experiment.

### Getting Started

Install the list of required packages and their dependencies.

```
pip install -r requirements.txt
``` 

`setup.py` script creates necessary folders used to save model checkpoints, generate showers and validation plots and also downloads the pretrained model from this [link](https://gitlab.cern.ch/fastsim/metahep). 

```
python3 setup.py
``` 

In order to run the adaptation code, you first need to adapt ```core/constants.py``` and ```utils/preprocess.py``` w.r.t your dataset and needs.

The ```core/constants.py``` defines all the set of common variables used such as the name of the directories, the pre-trained model default parameters, the validation parameters (such as the colors for the shower observables) and W&B parameters. The variables that you need to change are:  
- ```GEO_NAME```: the name of your geometry.
- ```SIZE_R, SIZE_Z```: the cell sizes in the r and z directions.
  
The variables that you may change: 
- ```ADAPTATION_STEPS```: the total number of adaptation steps.
- ```CHECKPOINT_STEP```: the number of checkpoints to save the adapted model.
- ```PLOT_FREQ```: the frequency of generating and displaying the validation plots in W&B.

The ```preprocess``` function in ```utils/preprocess.py```, loads the data (from an HDF5 file) and returns 4 arrays: an array for shower energies and 3 arrays for energy, angle and geometry conditions.  Since meta-learning algorithms are designed to be able to quickly adapt to new tasks based on only a few examples, therefore, the number of events per energy and angle can small. The shower energies are normalized to the energy of the incident particle (MeV) to have an input in the range [0,1]. The shape of the expected output from the ```preprocess``` function:
- ```(total number of events, ORIGINAL_DIM)``` for shower energies, where ```ORIGINAL_DIM``` represents the total number of voxels ```N_CELLS_Z * N_CELLS_R * N_CELLS_PHI```, with ```(N_CELLS_Z, N_CELLS_R, N_CELLS_PHI) = (18, 50, 45)```.
- ```(total number of events, 1)``` for energy condition array, where for every shower its condition value is encoded as a normalized value of the energy of the incident particle to the ```MAX_ENERGY``` (defined in ```core/constants.py```).
- ```(total number of events, 1)``` for angle condition array, where for every shower its condition value is encoded as a normalized value of the angle of the incident particle to the ```MAX_ANGLE``` (defined in ```core/constants.py```).
- ```(total number of events, 3)``` for geometry condition array, where the geometry is conditioned as a one hot encoding vector of size 3. Every new geometry should be encoded as ```[1, 0, 0]```.

### Adaptation

In order to launch the adaptation:

```
python3 adapt.py
``` 

You may specify these following flags. If you do not, then default values will be used.

```--model-type``` specified which pre-trained model (architecture) to use.  

```--study-name``` specifies a study name. This name is used as an experiment name in W&B dashboard and as a name of
directory for saving models.

```--run-name``` sets a custom name for your experiment run W&B. 

```--max-gpu-memory-allocation``` specifies a maximum memory allocation on a single, logic GPU unit. Should be given as
an integer.

```--gpu-ids``` specifies IDs of physical GPUs. Should be given as a string, separated with comas, no spaces.
If you specify more than one GPU then automatically ```tf.distribute.MirroredStrategy``` will be applied to the
adaptation.


### Tracking the adaptation

Once you run ```adapt.py``` script it will ask you to create a W&B account or enter an existing one. 

> **Note:** it is important to change the entity name in ```constants.py``` to match your W&B name. 

If you don't have an account please follow the link displayed in your command line. It will then ask you to copy your key (that you can get from this [link](https://wandb.ai/authorize)) and paste it into your command line to authorize it.

Once your experiment is running, a link will be displayed that you can open with your browser. You can track your experiment online using the W&B dashboard. Four different sections will appear: media, validation, charts and system.

- Media: here a 3D (x,y,z) plot of one generated shower will be displayed. This is used to check the blurriness effect.  
- Validation: a list of validation plots will be displayed. The default ones: the longitudinal and lateral profiles, their first and second moments, the cell energy and the total energy. They are displayed every ```PLOT_FREQ``` a constant defined in ```constants.py``` as one of the W&B parameters using ```PLOT_CONFIG```, a list to specify which energy, angle and geometry to track (display as validation plots).
- Charts: displays a visualization of the logged quantities such as the loss function evolution. 
- System: displays a set of system tracking plots such as disk utilization, process memory in use and process CPU threads in use.


### Conversion

After adaptation, the model can be converted into a format that can be used in C++, such as ONNX,
use `convert.py` script:

```
python3 convert.py --adaptaion_step 300
```

You may specify these following flags. If you do not, then default values will be used.

```--study_name``` if you specified the study name when running the adaptation then please specify it here as well. 

```--onnx_file_name``` the name to be given to the converted ```.onnx``` file. The name should contain ```.onnx```. 

