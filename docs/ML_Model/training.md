---
sidebar_position: 1
---

# Training and results 

This page summarizes the main VAE trainings and validations starting from a single geometry and energy conditioning towards building a generalizale and reusable VAE model. 

## Single geometry

### Energy conditioning 

Simulating showers using the VAE model (FastV) started with investigation and exploration of its performance when trained on a single calorimeter geometry. FastV is trained on electron showering in a homogeneous cylinder of lead (PBWO4). Detector is segmented along **(r,&phi;,z)** to create a readout geometry in the cylindrical coordinates with a segmentation of (24,24,24) in (r,&phi;,z). The model is conditonned on the energy of the incident particle. In this training, the incident energies are sampled from a uniform distribution from 1 GeV to 100 GeV. 

The next training consisted of increasing the granularity of the segmentation to **(r,&phi;,z) ** = (50,48,120).  This demonstrated the learning potential of this model with a highly granular input.  The VAE model is trained on the same particle type and the calorimeter geometry as previously. The energy range is also extended to 500 GeV using discrete energy points.
The gif below shows the longitudinal profile for different energies going from 10 GeV to 500 GeV.

![](/img/ML_Model/Training/PBWO4Geo_50_48_120_CondE/LongProf_120_layers.gif)

The gif below shows the transverse profile for different energies going from 10 GeV to 500 GeV.

![](/img/ML_Model/Training/PBWO4Geo_50_48_120_CondE/LateProf_120_layers.gif)

#### Extrapolation power

One of the key features of a generative model is the capacity to infer distributions of unseen data points during the training. Unseen data points refer to showers originating from particle energies different from the range of training. In the figures below we can see longitudinal and transverse profiles of 0.5 GeV and 600 GeV which are extrapolated values to the energy range of training (1 GeV-500 GeV).

![](/img/ML_Model/Training/PBWO4Geo_50_48_120_CondE/extrapolTest_05GeV.png)

![](/img/ML_Model/Training/PBWO4Geo_50_48_120_CondE/extrapolTest_600GeV.png)

### Energy and angle conditioning 

The next step towards building a generalizable generative model is to condition on the indicent angle of incoming particles. For that study, the calorimeter used is built using PBWO4 geometry with a segmentation of (24,24,24) in (r,&phi;,z). Discrete energy points are considered in the range from 1 GeV to 1 TeV. 

![](/img/ML_Model/Training/incident_angles_PBW04Geo.png)

The angles range from 0&deg; to 90&deg; in a step of 10&deg; corresponding to the arrows from yellow to blue as shown in the figure above.

The longitudinal and lateral profiles are shown in the next two plots where we can see a good agreement to the full simulation. Those results are for 0&deg incident angle. The accuracy of the model deteriorates in this example with increassing angle because the larger the angle the coarser the shower (particle deposits energy in less cells).

![](/img/ML_Model/Training/PBWO4_Geo_24_24_24_CondE_A/LongProf_60GeV_0.png) | ![](/img/ML_Model/Training/PBWO4_Geo_24_24_24_CondE_A/TransProf_60GeV_0.png)


One of the important metrics of a fast simulation appraoch is the simulation time, where it can be demonstrated here as function of different energies and angles. It can be seen that with the full simulation the time icreases with the energy as more interactions are needed to be modeled. On the other hand, with the fast simulation, the time is constant. For 500 GeV we can have 180 speedup factor.

![](/img/ML_Model/Training/PBWO4_Geo_24_24_24_CondE_A/simulationTime.png)

More plots and details are available in this **[notebook](https://gitlab.cern.ch/dasalama/ag_ml_sim/-/blob/agmlsim_test_Pb_Geo/Geant4MLFastSim_Par04/build/ValidationPlots.ipynb)**.


## Multiple geometries

The model in this case is tasked to learn to reconstruct showers coming from different calorimeter geometries. At first, the model learns to reconstruct showers using two simplified (idealized) geometries of lead-tungestate (PbWO4) and silicon-tungsten (SiW). The model learns p(x|e,a,g), where conditions **(e,a,g)=(energy,angle,geometry)** 

### Multi-task learning

In the multi-task learning, the model is trained on a fixed number of tasks (calorimeter geometries in our case) and it can be evaluated only on the same tasks. The multi-task VAE model is trained on showers coming from the two simplified geometries lead-tungestate (PBW04) and silicon-tungesten (SiW). This conditional VAE model of this step is used to demonstrate how to use ML inference in Geant4. **[Par04](https://gitlab.cern.ch/geant4/geant4/-/tree/master/examples/extended/parameterisations/Par04)** is a Geant4 example which demonstrates how to infer energies using the trained VAE model. More details on the example are given in [Geant4 section](/docs/G4_Inference/G4_examples).  

### Meta-learning

Meta-learning is a learning to learn technique which takes a distribution of tasks, where each task corresponds to a learning problem with its set of examples, and it produces a quick learner which can generalize from small amounts of data examples. Model-agnostic meta-learning ([MAML](https://arxiv.org/abs/1703.03400)) is a meta-learning algorithm which optimization problem is learning the initialization parameters (weights) of a neural network. These parameters constitute the **meta-knowledge** and their learning process is the **meta-training step**. They can be used as an initialization weights of the model and subsequently tuned on a new task. [Reptile](https://arxiv.org/abs/1803.02999) is a first order gradient-based meta-learning algorithm, i.e. it performs stochastic gradient descent (SGD) on each task in a standard way as opposed to MAML which computes the second derivatives. This makes Reptile take less computations and memory, while the optimization problem remains the same as for MAML.

In this section, we show some results of **MetaHEP**, the first application of the meta-learning approach to accelerate shower simulation using very high granular data. The key idea behind a meta-learning approach is that instead of starting the training process from scratch on every new geometry, we can use the meta-knowledge for a faster and more data-efficient adaptation. This refers to learning from prior experience and using this step knowledge to guide the search of an optimal model for a new geometry. In our Reptile training loop, or meta-training, only two detector geometries of cylindrical SiW and SciPb are used to build the meta-knowledge. Tow remaining two geometries of cylindrical PBWO4 and SiW FCC-ee, one of the calorimeters proposed for the Future Circular Collider (FCC), a next generation of high performance particle colliders, are used to demonstrate the adaptation capabilities of the model. In order to compare between the full simulation (FullSim) and the fast simulation (MLSim), in this section, only the decoder network is used as a generator to perform inference after the adaptation step. The input inference vector is constructed by sampling from a d Gaussian distribution (where d is the dimension of the latent space). The condition vector comprises condition values of particle energy, entrance angle and detector identifier.

Let θ denote the initial model parameters, and t a task from the set of tasks. In our case a task corresponds to learning to simulate showers from a single detector geometry. Different geometries correspond to different tasks. For a randomly sampled task t, the learning minimizes **E<sub>t</sub>[L<sub>t</sub>(U<sup>k</sup><sub>t</sub>(&theta;))]**, where L<sub>t</sub> represents the loss of the task t, k is the number of steps or updates and U denotes the updating operator such as gradient descent. Reptile is an iterative algorithm which starts by sampling a task from the distribution of tasks, trains on the task, and then moves weights of the model towards the trained weights. 

The full simulation samples are showers of electrons generated with an energy range from 1 GeV to 1 TeV (in powers of 2) and angles from 50&deg; to 90&deg; (in a step of 10&deg;). Entrance angle of 90&deg;means perpendicular to the z-axis. The used segmentation is (r,&phi;,z)=(18,50,45), i.e, each shower has 18x50x45 energies. Ten thousand particle showers are simulated for each primary particle energy and angle. In order to demonstrate that the model can learn from a small amount of datasets, only 30% of the available statistics (for each energy and angle) are used for the training. Sample used in this studies is published on [zenodo](https://zenodo.org/record/6082201).


#### Validation on a meta-training calorimeter geometry

Reptile is demonstrated to converge towards a solution θ that is close (in Euclidean distance) to each task manifold of optimal solutions. This section demonstrates how the meta-knowledge can be applied on a meta-training task (geometry) and which can be fine tuned using few adaptation steps for a better performance. The below figures show the longitudinal profile for 64 (512) GeV particle with 90&deg;entrance angle for the SiW geometry. Because this is one of the geometries that was used during the meta-learning step, one can see in the case where only the meta-knowledge is used (Step 0), there is fair agreement. After performing the adaption step with 100 steps, a better agreement is observed.  

![](/img/ML_Model/Training/Meta_learning_Siw_SciPb_Pb_e-/LongProf_E64_A90_0_100.png) | ![](/img/ML_Model/Training/Meta_learning_Siw_SciPb_Pb_e-/LongProf_E512_A90_0_100.png)


#### Fast adaptation with a simplified calorimeter geometry

To test MetaHEP on a new calorimeter geometry, full simulation samples are generated using a lead tungstate (PBWO4) geometry with the same segmentation of (r,&phi;,z)=(18,50,45). The weights of the model are first initialized with the meta-knowledge and the adaptation step is tested for a 1000 steps with checkpoints every 10 steps. The adaptation progress is illustrated in the figures below, using the longitudinal profile distribution with 50 and 360 steps respectively. After 50 steps the generated longitudinal profile is in poor agreement with full simulation, but with 360 steps there is a very good agreement to the full simulation.

![](/img/ML_Model/Training/Meta_learning_Siw_SciPb_Pb_e-/LongProf_E64_A90_AdaStep_50.png) | ![](/img/ML_Model/Training/Meta_learning_Siw_SciPb_Pb_e-/LongProf_E64_A90_AdaStep_360.png)


#### Adaptation and traditional training

The strength of the MetaHEP approach is best visible in comparison to a ``traditional'' training where a model starts the learning process from scratch. In the figure below, the longitudinal profile for the compared models using the same architecture and the same number of training/adaptation steps is illustrated. This shows that the adaptation step, after meta-training, can provide a faster solution to converge. A traditional training requires many more steps to converge. On top of that, the time to run 400 steps of adaptation is about 20.5s compared to 1200s for the same number of 400 steps of the traditional training on the same machine. around 3h for 3900 steps

![](/img/ML_Model/Training/Meta_learning_Siw_SciPb_Pb_e-/AdaptationVsTradTraining.png)


#### Fast adaptation with a realistic calorimeter geometry

The second test of MetaHEP capabilities is done on the SiW FCC-ee detector, which is very different from the other three detectors considered so far. As it is a detector with realistic layout, it is much more complicated, and more importantly further from the detectors that were used in the training. Detectors used for training were cylinders, while FCC-ee SiW detectors uses flat sensors distributed on octagon in the transverse cross section. For the adaptation to this fourth detector, the weights of the model are first initialized with the meta-knowledge and the adaptation step is tested every 10 steps up to 2000 adaptation steps. Compared to the idealised PbWO4 calorimeter, the number of adaptation steps to get a very good agreement with the full simulation is almost 3 times higher. The main origin of this difference is justified by the fact that it is a more complex geometry, and further from the detectors used for training, therefore more steps are needed. In fact, the figures below show that with 1000 steps of adaptation the model is able to well reproduce the longitudinal and the lateral profiles. 

![](/img/ML_Model/Training/Meta_learning_FCC-ee/FCC-ee_Long_E64_A90_1000.png)
![](/img/ML_Model/Training/Meta_learning_FCC-ee/FCC-ee_LatPro_E64_A90_1000.png)


To read more:

- Caruana, R. (1997). Multitask learning. Machine learning, 28(1), 41-75.
- Naik, D. K., & Mammone, R. J. (1992, June). Meta-neural networks that learn by learning. In [Proceedings 1992] IJCNN International Joint Conference on Neural Networks (Vol. 1, pp. 437-442). IEEE.
- Finn, C., Abbeel, P., & Levine, S. (2017, July). Model-agnostic meta-learning for fast adaptation of deep networks. In International conference on machine learning (pp. 1126-1135). PMLR.
- Nichol, A., Achiam, J., & Schulman, J. (2018). On first-order meta-learning algorithms. arXiv preprint arXiv:1803.02999.