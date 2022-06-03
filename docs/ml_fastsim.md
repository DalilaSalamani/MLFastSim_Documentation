---
sidebar_position: 2
---

# Generative modeling

Generative models combines deep learning with statistical inference and probabilistic modeling. They aim to learn the process by which data are generated according to some true, unknown distribution represented by a finite number of observations. The advantage of using these models is the ability to create new samples from the underlying distribution. In the literature, there are many variants of these models such as Generative Adversarial Networks and Variational Autoencoders.

### Generative Adversarial Networks (GANs) 

GANs are deep generative learning models in which two non-cooperative networks define its architecture: a generator and a discriminator. The generator is trained to produce samples to confuse the discriminator in distinguishing fake and real samples (drawn from the training data distribution). The discriminator tries to correctly identify the original from the generated (fake) sample. When the two networks converge, the GAN is able to generate data that the trained classifier cannot recognize anymore. 

### Variational Autoencoders (VAEs)

#### Representation learning 

**Representation learning** or **information bottleneck learning**, is an information theory technique to derive (infer) intrinsic structure from the data. Over the years, it was used as a data compression tool for object detection and speech recognition. Moreover, it was used in natural language processing to learn a distributed representation for each word, referred to as word embedding. Learning word embeddings can be combined with learning image representations in a way that allows to associate text and images. This approach has been used successfully to build Google’s image search, exploiting large datasets to map images and queries in the same space. Among the first methods in representation learning is **principal component analysis** proposed by Pearson in 1901, a linear projection of the base feature set to a new feature space where the new features are uncorrelated. Fisher, in 1936, proposed the **linear discriminant analysis** to project a dataset onto a lower-dimensional space with a class-separability (distance between the mean of different classes) in order to avoid over-fitting. The introduction of **meaningful representation** with a **variational principle** of the input data appeared first in 1999. Extracting relevance from the data was presented as finding a compressed version of an input x that preserves the information about x using a set of bottleneck code words. In 2014, Kingma and Rezende presented the **stochastic variational algorithm** for inferring and learning from a continuous unobserved or latent space in the presence of intractable posterior distributions. 

#### Latent variable modeling

Let **D** denote a dataset of N data points. Given D, the goal of a latent variable model is to infer unobserved or latent variable **z** of **m** dimension for every observed variable **x** in D of **n** dimension (where n>m) in order to explain and retrieve hidden structures. **p(z)** is the prior distribution over **z** and the posterior inference is represented by the probability distribution **p(z|x)**. A deep latent variable model denotes a latent variable model whose distributions are parameterized by neural networks. We refer as well to a conditional model p(x,z|c), where **c** is a condition (in our case this condition can be the energy of the primary particle). The goal is to learn the generative distribution of **x** from **z**, i.e., **p(x|z)**. One assumption in this model is that the prior **p(z)** is known. We assume p(z) to be a unit Gaussian. A good generative model would assign high probabilities to observed x, i.e., learning a good p(x|z) is equivalent to maximizing the probability of the observed data p(x). 

In the area of unsupervised deep learning, combing the idea of representation learning with latent variable models results in having the autoencoder act as a generative model. VAEs are autoencoders designed with a prior on the latent space. 

### Autoencoders and variational autoencoders

An autoencoder is a neural network trained to reconstruct its input from a latent representation of this input. If the representation has a lower dimension than the input, the model can be used for dimensionality reduction and feature learning. In this case, it is called an **undercomplete autoencoder**. The autoencoder concept has evolved over the years with neural networks. The motivation behind autoencoders is related to learning low dimensional representations. One of the examples of its efficient usage is to derive/retrieve information in a query database. Autoencoders as a semantic hashing approach can be used in the way they learn a reduced, binary representation, then all database entries can be stored in a hash table that maps representation vectors to entries. This hash table allows us to perform information retrieval by returning all database entries that have the same binary code as the query. When the representation has a greater dimension than the input, the model is called **overcomplete autoencoder**. It learns to copy the input  without learning useful features about the data distribution. Using a regularizer in this case avoids limiting the model's capacity. This consists of using a loss function to learn other features, such as the sparsity of the representation, rather than only the copy function. Autoencoders are also algorithms that learn a manifold of the data or the structure of the manifold. A manifold is a region where the data is represented as connected points associated within a neighborhood.

Variational inference models the true distribution **p(x|z)** using a simpler parametric distribution **q<sub>&phi;</sub>(x|z)**. This modeling of q&phi;(x|z) refers to the encoder part of the VAE, also called the inference model, and the parameters **&phi;** are called **variational parameters**. The distribution q<sub>&phi;</sub>(x|z) can be parameterized using neural networks and therefore &phi;parameters represent the weights and biases of the neural network. Applying variational inference consists of first choosing a family of distributions over the latent variables. Then the optimization procedure consists of finding the set of parameters to best approximate the posterior distribution using the Kulback-Leibler divergence. 

### VAE for fast shower simulation (FastV)

The VAE model used in the studies described in the next pages, which we call FastV, is composed of two stacked deep neural networks acting as encoder and decoder. The encoder learns a mapping from the input space to an unobserved or latent space in which a lower dimensional representation of the full simulation is learned. The decoder learns the inverse mapping, thus reconstructing the original input from this latent representation. The encoded distributions are constrained to be Gaussian distributions and the encoder is tasked to return the mean and the covariance matrix that describe those distributions. The loss function that is optimized during the training of the VAE is composed of a regularization loss to minimize the **Kulback-Leibler divergence** between encoded distributions and prior Gaussian distributions, and a **reconstruction loss** to minimize the error by computing the binary cross-entropy between the input and its reconstruction version using the latent representation. 



To read more: 

- Principal component analysis : Pearson, K. On lines and planes of closest fit to systems of points in space.Philosophical Magazine, 1901.
- Linear discriminant analysis: Fisher,  Ronald A. The use of multiple measurements intaxonomic problems.Annals of eugenics, 7(2):179–188,193.
- Rezende, D. J., Mohamed, S., & Wierstra, D. (2014, June). Stochastic backpropagation and approximate inference in deep generative models. In International conference on machine learning (pp. 1278-1286). PMLR.
- Kingma, D. P., & Welling, M. (2013). Auto-encoding variational bayes. arXiv preprint arXiv:1312.6114.

To read more about generative models applied in HEP for fast detector simulation:

- ATLAS Collaboration (2018). Deep generative models for fast shower simulation in ATLAS. ATL-SOFT-PUB-2018-001. [CDS](https://cds.cern.ch/record/2630433).
- Paganini, M., de Oliveira, L., & Nachman, B. (2018). CaloGAN: Simulating 3D high energy particle showers in multilayer electromagnetic calorimeters with generative adversarial networks. Physical Review D, 97(1), 014021.
- Erdmann, M., Glombitza, J., & Quast, T. (2019). Precise simulation of electromagnetic calorimeter showers using a Wasserstein Generative Adversarial Network. Computing and Software for Big Science, 3(1), 1-13.
- Krause, C., & Shih, D. (2021). Caloflow: Fast and accurate generation of calorimeter showers with normalizing flows. arXiv preprint arXiv:2106.05285.
- Bourilkov, D. (2019). Machine and deep learning applications in particle physics. International Journal of Modern Physics A, 34(35), 1930019.



