"use strict";(self.webpackChunkml_4_sim=self.webpackChunkml_4_sim||[]).push([[197],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=d(n),m=r,h=u["".concat(l,".").concat(m)]||u[m]||p[m]||i;return n?a.createElement(h,o(o({ref:t},c),{},{components:n})):a.createElement(h,o({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var d=2;d<i;d++)o[d]=n[d];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8776:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return d},toc:function(){return c},default:function(){return u}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],s={sidebar_position:2},l="Generative modeling",d={unversionedId:"ml_fastsim",id:"ml_fastsim",title:"Generative modeling",description:"Generative models combines deep learning with statistical inference and probabilistic modeling. They aim to learn the process by which data are generated according to some true, unknown distribution representd by a finite number of observations distributed according to it. The advantage of using these models is the ability to create new samples from the underlying distribution. In the literature, there are many variants of these models such as Generative Adversarial Networks and Variational Autoencoders.",source:"@site/docs/ml_fastsim.md",sourceDirName:".",slug:"/ml_fastsim",permalink:"/docs/ml_fastsim",editUrl:"https://github.com/DalilaSalamani/ML4Sim_Documentation.git/docs/ml_fastsim.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Full and fast simulation",permalink:"/docs/intro"},next:{title:"Machine learning workflow",permalink:"/docs/ml_workflow"}},c=[{value:"Generative Adversarial Networks (GANs)",id:"generative-adversarial-networks-gans",children:[],level:3},{value:"Variational Autoencoders (VAEs)",id:"variational-autoencoders-vaes",children:[{value:"Representation learning",id:"representation-learning",children:[],level:4},{value:"Latent variable modeling",id:"latent-variable-modeling",children:[],level:4}],level:3},{value:"Autoencoders and variational autoencoders",id:"autoencoders-and-variational-autoencoders",children:[],level:3},{value:"VAE for fast shower simulation (FastV)",id:"vae-for-fast-shower-simulation-fastv",children:[],level:3}],p={toc:c};function u(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"generative-modeling"},"Generative modeling"),(0,i.kt)("p",null,"Generative models combines deep learning with statistical inference and probabilistic modeling. They aim to learn the process by which data are generated according to some true, unknown distribution representd by a finite number of observations distributed according to it. The advantage of using these models is the ability to create new samples from the underlying distribution. In the literature, there are many variants of these models such as Generative Adversarial Networks and Variational Autoencoders."),(0,i.kt)("h3",{id:"generative-adversarial-networks-gans"},"Generative Adversarial Networks (GANs)"),(0,i.kt)("p",null,"GANs are deep generative learning models in which two non-cooperative networks define its architecture: a generator and a discriminator. The generator is trained to produce samples to confuse the discriminator in distinguishing fake and real samples (drawn from the training data distribution). The discriminator tries to correctly identify the original from the generated (fake) sample. When the two networks converge, the GAN is able to generate data that the trained classifier cannot recognize anymore. "),(0,i.kt)("h3",{id:"variational-autoencoders-vaes"},"Variational Autoencoders (VAEs)"),(0,i.kt)("h4",{id:"representation-learning"},"Representation learning"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Representation learning")," or ",(0,i.kt)("strong",{parentName:"p"},"information bottleneck learning"),", is an information theory technique to derive (infer) intrinsic structure from the data. Over the years, it was used as a data compression tool for object detection and speech recognition. Moreover, it was used in natural language processing to learn a distributed representation for each word, referred to as word embedding. Learning word embeddings can be combined with learning image representations in a way that allows to associate text and images. This approach has been used successfully to build Google\u2019s image search, exploiting large datasets to map images and queries in the same space. Among the first methods in representation learning is ",(0,i.kt)("strong",{parentName:"p"},"principal component analysis")," proposed by Pearson in 1901, a linear projection of the base feature set to a new feature space where the new features are uncorrelated. Fisher, in 1936, proposed the ",(0,i.kt)("strong",{parentName:"p"},"linear discriminant analysis")," to project a dataset onto a lower-dimensional space with a class-separability (distance between the mean of different classes) in order to avoid overfitting. The introduction of ",(0,i.kt)("strong",{parentName:"p"},"meaningful representation")," with a ",(0,i.kt)("strong",{parentName:"p"},"variational principle")," of the input data appeared first in 1999. Extracting relevance from the data was presented as finding a compressed version of an input x that preserves the information about x using a set of bottleneck code words. In 2014, Kingma and Rezende presented the ",(0,i.kt)("strong",{parentName:"p"},"stochastic variational algorithm")," for inferring and learning from a continuous unobserved or latent space in the presence of intractable posterior distributions. "),(0,i.kt)("h4",{id:"latent-variable-modeling"},"Latent variable modeling"),(0,i.kt)("p",null,"Let ",(0,i.kt)("strong",{parentName:"p"},"D")," denote a dataset of N data points. Given D, the goal of a latent variable model is to infer unobserved or latent variable ",(0,i.kt)("strong",{parentName:"p"},"z")," of ",(0,i.kt)("strong",{parentName:"p"},"m")," dimension for every observed variable ",(0,i.kt)("strong",{parentName:"p"},"x")," in D of ",(0,i.kt)("strong",{parentName:"p"},"n")," dimension (where n>m) in order to explain and retrieve hidden structures. ",(0,i.kt)("strong",{parentName:"p"},"p(z)")," is the prior distribution over ",(0,i.kt)("strong",{parentName:"p"},"z")," and the posterior inference is represented by the probability distribution ",(0,i.kt)("strong",{parentName:"p"},"p(z|x)"),". A deep latent variable model denotes a latent variable model whose distributions are parameterized by neural networks. We refer as well to a conditional model p(x,z|c), where ",(0,i.kt)("strong",{parentName:"p"},"c")," is a condition (in our case this condition can be the energy of the primary particle). The goal is to learn the generative distribution of ",(0,i.kt)("strong",{parentName:"p"},"x")," from ",(0,i.kt)("strong",{parentName:"p"},"z"),", i.e., ",(0,i.kt)("strong",{parentName:"p"},"p(x|z)"),". One assumption in this model is that the prior ",(0,i.kt)("strong",{parentName:"p"},"p(z)")," is known. Set p(z) to be a unit Gaussian. A good generative model would assign high probabilities to observed x, i.e., learning a good p(x|z) is equivalent to maximizing the probability of the observed data p(x). "),(0,i.kt)("p",null,"In the area of unsupervised deep learning, combing the idea of representation learning with latent variable models results in having the autoencoder act as a generative model. VAEs are autoencoders designed with a prior on the latent space. "),(0,i.kt)("h3",{id:"autoencoders-and-variational-autoencoders"},"Autoencoders and variational autoencoders"),(0,i.kt)("p",null,"An autoencoder is a neural network trained to reconstruct its input from a latent representation of this input. If the representation has a lower dimension than the input, the model can be used for dimensionality reduction and feature learning. In this case, it is called an ",(0,i.kt)("strong",{parentName:"p"},"undercomplete autoencoder"),". The autoencoder concept has evolved over the years with neural networks. The motivation behind autoencoders is related to learning low dimensional representations. One of the examples of its efficient usage is to derive/retrieve information in a query database. Autoencoders as a semantic hashing approach can be used in the way they learn a reduced, binary representation, then all database entries can be stored in a hash table that maps representation vectors to entries. This hash table allows us to perform information retrieval by returning all database entries that have the same binary code as the query. When the representation has a greater dimension than the input, the model is called ",(0,i.kt)("strong",{parentName:"p"},"overcomplete autoencoder"),". It learns to copy the input  without learning useful features about the data distribution. Using a regularizer in this case avoids limiting the model's capacity. This consists of using a loss function to learn other features, such as the sparsity of the representation, rather than only the copy function. Autoencoders are also algorithms that learn a manifold of the data or the structure of the manifold. A manifold is a region where the data is represented as connected points associated within a neighborhood."),(0,i.kt)("p",null,"Variational inference models the true distribution ",(0,i.kt)("strong",{parentName:"p"},"p(x|z)")," using a simpler parametric distribution ",(0,i.kt)("strong",{parentName:"p"},"q",(0,i.kt)("sub",null,"\u03c6"),"(x|z)"),". This modeling of q","\u03c6","(x|z) refers to the encoder part of the VAE, also called the inference model, and the parameters ",(0,i.kt)("strong",{parentName:"p"},"\u03c6")," are called ",(0,i.kt)("strong",{parentName:"p"},"variational parameters"),". The distribution q",(0,i.kt)("sub",null,"\u03c6"),"(x|z) can be parametrized using neural networks and therefore ","\u03c6","parameters represent the weights and biases of the neural network. Applying variational inference consists of first choosing a family of distributions over the latent variables. Then the optimization procedure consists of finding the set of parameters to best approximate the posterior distribution using the Kulback-Leibler divergence. "),(0,i.kt)("h3",{id:"vae-for-fast-shower-simulation-fastv"},"VAE for fast shower simulation (FastV)"),(0,i.kt)("p",null,"The VAE model used in the next pages is composed of two stacked deep neural networks acting as encoder and decoder. The encoder learns a mapping from the input space to an unobserved or latent space in which a lower dimensional representation of the full simulation is learned. The decoder learns the inverse mapping, thus reconstructing the original input from this latent representation. The encoded distributions are constrained to be Gaussian distributions and the encoder is tasked to return the mean and the covariance matrix that describe those distributions. The loss function that is optimized during the training of the VAE is composed of a regularization loss to minimize the ",(0,i.kt)("strong",{parentName:"p"},"Kulback-Leibler divergence")," between encoded distributions and prior Gaussian distributions, and a ",(0,i.kt)("strong",{parentName:"p"},"reconstruction loss")," to minimize the error by computing the binary cross-entropy between the input and its reconstruction version using the latent representation. "),(0,i.kt)("p",null,"To read more: "),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Principal component analysis : Pearson, K. On lines and planes of closest fit to systems ofpoints in space.Philosophical Magazine, 1901."),(0,i.kt)("li",{parentName:"ul"},"Linear discriminant analysis: Fisher,  Ronald A. The use of multiple measurements intaxonomic problems.Annals of eugenics, 7(2):179\u2013188,193."),(0,i.kt)("li",{parentName:"ul"},"Rezende, D. J., Mohamed, S., & Wierstra, D. (2014, June). Stochastic backpropagation and approximate inference in deep generative models. In International conference on machine learning (pp. 1278-1286). PMLR."),(0,i.kt)("li",{parentName:"ul"},"Kingma, D. P., & Welling, M. (2013). Auto-encoding variational bayes. arXiv preprint arXiv:1312.6114.")),(0,i.kt)("p",null,"To read more about generative models applied in HEP for fast detector simulation:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"ATLAS Collaboration (2018). Deep generative models for fast shower simulation in ATLAS. ATL-SOFT-PUB-2018-001. ",(0,i.kt)("a",{parentName:"li",href:"https://cds.cern.ch/record/2630433"},"CDS"),"."),(0,i.kt)("li",{parentName:"ul"},"Paganini, M., de Oliveira, L., & Nachman, B. (2018). CaloGAN: Simulating 3D high energy particle showers in multilayer electromagnetic calorimeters with generative adversarial networks. Physical Review D, 97(1), 014021."),(0,i.kt)("li",{parentName:"ul"},"Erdmann, M., Glombitza, J., & Quast, T. (2019). Precise simulation of electromagnetic calorimeter showers using a Wasserstein Generative Adversarial Network. Computing and Software for Big Science, 3(1), 1-13."),(0,i.kt)("li",{parentName:"ul"},"Krause, C., & Shih, D. (2021). Caloflow: Fast and accurate generation of calorimeter showers with normalizing flows. arXiv preprint arXiv:2106.05285."),(0,i.kt)("li",{parentName:"ul"},"Bourilkov, D. (2019). Machine and deep learning applications in particle physics. International Journal of Modern Physics A, 34(35), 1930019.")))}u.isMDXComponent=!0}}]);