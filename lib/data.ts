import type { Item } from "./types"

export async function getPapers(): Promise<Item[]> {
  return items
}

export async function getPapersSortedByIlyaList(): Promise<Item[]> {
  return itemsSortedByIlyaList
}

const items: Item[] = [
  { 
    type: "event", 
    date: "01 Jan 1974", 
    start: 1974, 
    end: 1980, 
    title: "First AI winter: limited progress, loss of funding due to overly optimistic expectations" 
  },
  { 
    type: "event", 
    date: "01 Jan 1987", 
    start: 1987, 
    end: 1993, 
    title: "Second AI winter: reduced funding after expert systems failed commercially" 
  },
  {
    type: "paper",
    id: 1,
    date: "01 Jul 1993",
    title: "Keeping Neural Networks Simple by Minimizing the Description Length of the Weights",
    authors: "Geoffrey E. Hinton; Drew van Camp",
    link: "https://www.cs.toronto.edu/~hinton/absps/colt93.pdf",
    slides: [
      {
        content:
        "Hinton & van Camp reduce overfitting in neural networks by minimizing weight description length using the MDL principle. This method simplifies to L2 weight-decay with a Gaussian prior, linking MDL to Bayesian regularization. It supports weight-sharing, pruning, and adaptive noise, effectively improving test errors.",
        type: "summary",
      },
      {
        content:
        "1. Simplifies neural network models by reducing the complexity of weight descriptions. \n2. Enhances model generalization by focusing on essential features. \n3. Reduces overfitting by minimizing unnecessary parameters.",
        type: "keyTakeaways",
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Jan 1997", 
    title: "IBM's Deep Blue beats chess champion Garry Kasparov" 
  },
  {
    type: "paper",
    id: 2,
    date: "04 Jun 2004",
    title: "A Tutorial Introduction to the Minimum Description Length Principle",
    authors: "Peter Grunwald",
    link: "https://arxiv.org/pdf/math/0406077.pdf",
    slides: [ 
      {
        content:
        "This paper introduces the MDL principle, a method for model selection and inference in information theory. It minimizes data and model description length to prevent overfitting. The paper covers MDL's foundations, applications, and practical guidance, aiding in selecting models that generalize well.",
        type: "summary",
      },
      {
        content:
        "1. Provides a comprehensive overview of the MDL principle in model selection. \n2. Demonstrates the application of MDL in various statistical models. \n3. Highlights the balance between model complexity and data fitting.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 3,
    date: "01 Jan 2008",
    title: "Kolmogorov Complexity and Algorithmic Randomness",
    authors: "A. Shen; V. A. Uspensky; N. Vereshchagin",
    link: "https://www.lirmm.fr/~ashen/kolmbook-eng-scan.pdf",
    slides: [
      {
        content:
        "This paper examines Kolmogorov complexity, measuring randomness by the shortest description length of a string. It explores algorithmic randomness and its implications in data compression, information theory, and computational theory, serving as a foundational text for understanding the mathematical basis of randomness.",
        type: "summary",
      },
      {
        content:
        "1. Explores the concept of Kolmogorov complexity in measuring randomness. \n2. Discusses the implications of algorithmic randomness in computation. \n3. Connects complexity theory with practical applications in data compression.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 4,
    date: "22 Jun 2008",
    title: "Machine Super Intelligence",
    authors: "Shane Legg",
    link: "https://www.vetta.org/documents/Machine_Super_Intelligence.pdf",
    slides: [
      {
        content:
        "This paper discusses machine superintelligence, an AI surpassing human intelligence. It examines societal, ethical, and future implications, focusing on controlling and aligning such systems with human values. The paper emphasizes safety measures and explores superintelligence's transformative impact on technology, economy, and global power dynamics.",
        type: "summary",
      },
      {
        content:
        "1. Examines the potential and challenges of achieving superintelligent AI. \n2. Discusses ethical considerations and safety measures for AI development. \n3. Analyzes the impact of superintelligence on society and future technologies.",
        type: "keyTakeaways",
      }
    ]
  },
  { type: "event", date: "2011", title: "IBM Watson wins Jeopardy!" },

  { type: "event", date: "2012", title: "AlexNet wins ImageNet challenge, sparking deep learning revolution" },
  {
    type: "paper",
    id: 6,
    date: "01 Dec 2012",
    title: "ImageNet Classification with Deep Convolutional Neural Networks",
    authors: "Alex Krizhevsky; Ilya Sutskever; Geoffrey E. Hinton",
    link: "https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
    slides: [
      {
        content:
        "AlexNet transformed image classification with deep convolutional neural networks, achieving high accuracy on ImageNet. It introduced ReLU activations, dropout, and GPU use, significantly advancing computer vision and deep learning architectures.",
        type: "summary",
      },
      {
        content:
        "1. Demonstrates the effectiveness of deep CNNs in large-scale image classification. \n2. Highlights the role of data augmentation and dropout in improving model performance. \n3. Sets a new benchmark for image recognition tasks with significant accuracy improvements.",
        type: "keyTakeaways",
      }
    ]
  },
  { type: "event", date: "2014", title: "Launch GPT" },
  {
    type: "paper",
    id: 7,
    date: "27 May 2014",
    title: "Quantifying the Rise and Fall of Complexity in Closed Systems: the Coffee Automaton",
    authors: "Scott Aaronson; Sean M. Carroll; Lauren Ouellette",
    link: "https://scottaaronson.blog/?p=762",
    slides: [
      {
        content:
        "This paper explores the dynamics of complexity in closed systems using the Coffee Automaton model. It analyzes how complexity emerges, evolves, and dissipates, providing insights into the fundamental principles governing complex systems and their applications in various scientific fields.",
        type: "summary",
      },
      {
        content:
        "1. Analyzes the dynamics of complexity in closed systems using the Coffee Automaton model. \n2. Provides insights into the mechanisms driving complexity changes over time. \n3. Offers a framework for predicting complexity trends in similar systems.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 8,
    date: "01 Sep 2014",
    title: "Neural Machine Translation by Jointly Learning to Align and Translate",
    authors: "Dzmitry Bahdanau; Kyunghyun Cho; Yoshua Bengio",
    link: "https://arxiv.org/pdf/1409.0473.pdf",
    slides: [
      {
        content:
        "This paper introduces a novel approach to neural machine translation by integrating alignment and translation processes. It enhances translation accuracy by jointly learning these tasks, significantly improving performance over traditional methods, and setting a new standard in machine translation research.",
        type: "summary",
      },
      {
        content:
        "1. Introduces a novel approach to neural machine translation by integrating alignment and translation processes. \n2. Improves translation accuracy by leveraging joint learning techniques. \n3. Demonstrates the effectiveness of the model on various language pairs.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 9,
    date: "08 Sep 2014",
    title: "Recurrent Neural Network Regularization",
    authors: "Wojciech Zaremba; Ilya Sutskever; Oriol Vinyals",
    link: "https://arxiv.org/pdf/1409.2329.pdf",
    slides: [
      {
        content:
        "This paper explores techniques to regularize recurrent neural networks, addressing overfitting issues. It introduces methods like dropout and weight noise, improving model generalization and performance. These techniques are crucial for enhancing the robustness of RNNs in various applications.",
        type: "summary",
      },
      {
        content:
        "1. Proposes new regularization techniques to enhance the performance of recurrent neural networks. \n2. Reduces overfitting and improves generalization in RNN models. \n3. Validates the effectiveness of the methods through extensive experiments.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
        id: 10,
    date: "20 Oct 2014",
    title: "Neural Turing Machines",
    authors: "Alex Graves; Greg Wayne; Ivo Danihelka",
    link: "https://arxiv.org/pdf/1405.6903.pdf",
    slides: [
      {
        content:
        "This paper presents Neural Turing Machines, a model combining neural networks with external memory resources. It mimics the capabilities of a Turing machine, enabling complex data manipulation and storage, advancing the field of neural computation and memory-augmented networks.",
        type: "summary",
      },
      {
        content:
        "1. Combines neural networks with external memory resources to create Neural Turing Machines. \n2. Enhances the ability of neural networks to perform algorithmic tasks. \n3. Demonstrates the potential of NTMs in solving complex computational problems.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 11,
    date: "01 Jan 2015",
    title: "Stanford's CS231n Convolutional Neural Networks for Visual Recognition",
    authors: "Fei-Fei Li; Justin Johnson; Serena Yeung",
    link: "https://cs231n.github.io/",
    slides: [
      {
        content:
        "This course provides comprehensive insights into convolutional neural networks for visual recognition. It covers fundamental concepts, architectures, and applications, equipping students with practical skills and theoretical knowledge to tackle computer vision challenges using deep learning techniques.",
        type: "summary",
      },
      {
        content:
        "1. Provides comprehensive coverage of CNNs for visual recognition tasks. \n2. Offers practical insights and techniques for improving CNN performance. \n3. Serves as a foundational resource for students and practitioners in the field.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 12,
    date: "21 May 2015",
    title: "The Unreasonable Effectiveness of Recurrent Neural Networks",
    authors: "Andrej Karpathy",
    link: "https://karpathy.github.io/2015/05/21/rnn-effectiveness/",
    slides: [
      {
        content:
        "This paper highlights the surprising capabilities of recurrent neural networks in sequence prediction tasks. It demonstrates their effectiveness in generating coherent sequences, from text to music, showcasing the potential of RNNs in creative and predictive applications.",
        type: "summary",
      },
      {
        content:
        "1. Highlights the surprising capabilities of recurrent neural networks in various applications. \n2. Explores the reasons behind the effectiveness of RNNs in sequence modeling. \n3. Discusses the potential and limitations of RNNs in real-world scenarios.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 13,
    date: "09 Jun 2015",
    title: "Pointer Networks",
    authors: "Oriol Vinyals; Meire Fortunato; Navdeep Jaitly",
    link: "https://arxiv.org/pdf/1506.03134.pdf",
    slides: [
      {
        content:
        "This paper introduces Pointer Networks, a novel neural architecture for solving combinatorial optimization problems. It uses attention mechanisms to select output sequences, outperforming traditional methods in tasks like sorting and routing, and offering new solutions in optimization challenges.",
        type: "summary",
      },
      {
        content:
        "1. Introduces Pointer Networks, a novel neural architecture for solving combinatorial problems. \n2. Demonstrates the model's ability to handle variable-sized outputs. \n3. Validates the approach on tasks like sorting and the traveling salesman problem.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 14,
    date: "27 Aug 2015",
    title: "Understanding LSTM Networks",
    authors: "Christopher Olah",
    link: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/",
    slides: [
      {
        content:
        "This paper explains Long Short-Term Memory (LSTM) networks, a type of recurrent neural network capable of learning long-term dependencies. It covers their architecture, functionality, and applications, highlighting their effectiveness in sequence prediction tasks across various domains.",
        type: "summary",
      },
      {
        content:
        "1. Provides an in-depth explanation of Long Short-Term Memory (LSTM) networks. \n2. Clarifies the mechanisms that enable LSTMs to capture long-range dependencies. \n3. Offers practical guidance for implementing and training LSTM models.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 15,
    date: "19 Nov 2015",
    title: "Order Matters: Sequence to sequence for sets",
    authors: "Oriol Vinyals; Samy Bengio; Manjunath Kudlur",
    link: "https://arxiv.org/pdf/1511.06391.pdf",
    slides: [
      {
        content:
        "This paper explores the importance of order in sequence-to-sequence models for set-based tasks. It demonstrates how different orderings can impact model performance, providing insights into optimizing sequence processing for improved accuracy in set-related applications.",
        type: "summary",
      },
      {
        content:
        "1. Investigates the impact of input order on sequence-to-sequence models for set-based tasks. \n2. Proposes methods to mitigate order sensitivity in model training. \n3. Demonstrates improved performance on tasks where order invariance is crucial.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 16,
    date: "23 Nov 2015",
    title: "Multi-Scale Context Aggregation by Dilated Convolutions",
    authors: "Fisher Yu; Vladlen Koltun",
    link: "https://arxiv.org/pdf/1511.07122.pdf",
    slides: [
      {
        content:
        "This paper introduces dilated convolutions for multi-scale context aggregation in neural networks. It enhances feature extraction by expanding the receptive field without increasing parameters, improving performance in tasks like image segmentation and object detection.",
        type: "summary",
      },
      {
        content:
        "1. Introduces dilated convolutions for effective multi-scale context aggregation. \n2. Enhances feature extraction without increasing computational cost. \n3. Improves performance in dense prediction tasks like semantic segmentation.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 17,
    date: "08 Dec 2015",
    title: "Deep Speech 2: End-to-End Speech Recognition in English and Mandarin",
    authors:
      "Dario Amodei; Rishita Anubhai; Eric Battenberg; Carl Case; Jared Casper; Bryan Catanzaro; Jingdong Chen; Mike Chrzanowski; Adam Coates; Greg Diamos; Erich Elsen; Jesse Engel; Linxi Fan; Christopher Fougner; Tony Han; Awni Hannun; Billy Jun; Patrick LeGresley; Libby Lin; Sharan Narang; Andrew Ng; Sherjil Ozair; Ryan Prenger; Jonathan Raiman; Sanjeev Satheesh; David Seetapun; Shubho Sengupta; Yi Wang; Zhiqian Wang; Chong Wang; Bo Xiao; Dani Yogatama; Jun Zhan; Zhenyao Zhu",
    link: "https://arxiv.org/pdf/1512.02595.pdf",
    slides: [
      {
        content:
        "This paper presents Deep Speech 2, an end-to-end speech recognition system for English and Mandarin. It utilizes deep learning techniques to achieve high accuracy, demonstrating significant improvements over traditional methods in speech recognition tasks.",
        type: "summary",
      },
      {
        content:
        "1. Proposes an end-to-end deep learning approach for speech recognition. \n2. Achieves state-of-the-art performance in both English and Mandarin. \n3. Utilizes a deep recurrent neural network architecture for improved accuracy.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 18,
    date: "10 Dec 2015",
    title: "Deep Residual Learning for Image Recognition",
    authors: "Kaiming He; Xiangyu Zhang; Shaoqing Ren; Jian Sun",
    link: "https://arxiv.org/pdf/1512.03385.pdf",
    slides: [
      {
        content:
        "This paper introduces deep residual networks (ResNets) for image recognition. It addresses the degradation problem in deep networks by using residual learning, significantly improving accuracy and enabling the training of much deeper models.",
        type: "summary",
      },
      {
        content:
        "1. Introduces residual learning framework to ease training of deep networks. \n2. Significantly improves accuracy in image recognition tasks. \n3. Enables the training of extremely deep networks with hundreds of layers.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "event",
    date: "01 Jan 2016",
    title: "AlphaGo beats Lee Sedol in Go"
  },
  {
    type: "paper",
    id: 19,
    date: "16 Mar 2016",
    title: "Identity Mappings in Deep Residual Networks",
    authors: "Kaiming He; Xiangyu Zhang; Shaoqing Ren; Jian Sun",
    link: "https://arxiv.org/pdf/1603.05027.pdf",
    slides: [
      {
        content:
        "This paper explores identity mappings in deep residual networks, enhancing their performance. It shows how identity shortcuts improve training efficiency and accuracy, contributing to the success of ResNets in various computer vision tasks.",
        type: "summary",
      },
      {
        content:
        "1. Proposes identity mappings to improve residual network training. \n2. Enhances learning by simplifying the optimization process. \n3. Demonstrates improved performance on benchmark image recognition datasets.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 20,
    date: "08 Nov 2016",
    title: "Variational Lossy Autoencoder",
    authors:
      "Xi Chen; Diederik P. Kingma; Tim Salimans; Yan Duan; Prafulla Dhariwal; John Schulman; Ilya Sutskever; Pieter Abbeel",
    link: "https://arxiv.org/pdf/1611.02731.pdf",
    slides: [
      {
        content:
        "This paper introduces a variational approach to lossy autoencoders, focusing on efficient data compression and reconstruction. It explores the trade-offs between compression rate and quality, providing insights into optimizing autoencoder performance for various applications.",
        type: "summary",
      },
      {
        content:
        "1. Introduces a variational approach to lossy data compression. \n2. Balances reconstruction quality and compression rate effectively. \n3. Provides insights into the trade-offs in lossy compression using neural networks.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 21,
    date: "04 Apr 2017",
    title: "Neural Message Passing for Quantum Chemistry",
    authors: "Justin Gilmer; Samuel S. Schoenholz; Patrick F. Riley; Oriol Vinyals; George E. Dahl",
    link: "https://arxiv.org/pdf/1704.01212.pdf",
    slides: [
      {
        content:
        "This paper presents a neural message passing framework for quantum chemistry, enhancing molecular property prediction. It leverages graph neural networks to model interactions, improving accuracy and efficiency in computational chemistry tasks.",
        type: "summary",
      },
      {
        content:
        "1. Develops a neural message passing framework for molecular property prediction. \n2. Achieves state-of-the-art results in quantum chemistry tasks. \n3. Offers a scalable approach to model complex molecular interactions.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 22,
    date: "05 Jun 2017",
    title: "A Simple Neural Network Module for Relational Reasoning",
    authors:
      "Adam Santoro; David Raposo; David G.T. Barrett; Mateusz Malinowski; Razvan Pascanu; Peter Battaglia; Timothy Lillicrap",
    link: "https://arxiv.org/pdf/1706.01427.pdf",
    slides: [
      {
        content:
        "This paper introduces a neural network module designed for relational reasoning tasks. It enhances the model's ability to process and infer relationships between entities, improving performance in tasks requiring complex relational understanding.",
        type: "summary",
      },
      {
        content:
        "1. Proposes a neural network module for effective relational reasoning. \n2. Enhances the ability to process and reason about relationships in data. \n3. Demonstrates improved performance on visual question answering tasks.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 23,
    date: "12 Jun 2017",
    title: "Attention Is All You Need",
    authors:
      "Ashish Vaswani; Noam Shazeer; Niki Parmar; Jakob Uszkoreit; Llion Jones; Aidan N. Gomez; Łukasz Kaiser; Illia Polosukhin",
    link: "https://arxiv.org/pdf/1706.03762.pdf",
    slides: [
      {
        content:
        "This paper introduces the Transformer model, revolutionizing natural language processing by using self-attention mechanisms. It eliminates recurrence, improving parallelization and performance in sequence transduction tasks, setting new standards in NLP.",
        type: "summary",
      },
      {
        content:
        "1. Introduces the Transformer model, relying solely on attention mechanisms. \n2. Achieves superior performance in machine translation tasks. \n3. Simplifies the architecture by removing recurrence and convolutions.",
        type: "keyTakeaways",
      }
    ]
  },
  // {
  //   type: "paper",
  //   id: 31,
  //   date: "01 Aug 2017",
  //   title: "The Annotated Transformer",
  //   authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
  //   link: "https://nlp.seas.harvard.edu/annotated-transformer/",
  //   slides: [
  //     {
  //       content:
  //       "This resource provides a line-by-line implementation of the Transformer model with detailed annotations. It presents the original 'Attention is All You Need' paper as executable code, making it accessible for practitioners. The implementation covers the complete architecture including encoder-decoder stacks, multi-head attention, and training procedures.",
  //       type: "summary",
  //     },
  //     {
  //       content:
  //       "1. Offers a practical, executable implementation of the Transformer architecture. \n2. Breaks down complex concepts with detailed annotations and explanations. \n3. Serves as an educational bridge between theoretical papers and practical implementation.",
  //       type: "keyTakeaways",
  //     }
  //   ]
  // },
  {
    type: "event",
    date: "01 Jan 2018",
    title: "Launch GPT-2; Launch BERT"
  },
  {
    type: "paper",
    id: 24,
    date: "05 Jun 2018",
    title: "Relational Recurrent Neural Networks",
    authors:
      "Adam Santoro; Ryan Faulkner; David Raposo; Jack Rae; Mike Chrzanowski; Theophane Weber; Daan Wierstra; Oriol Vinyals; Razvan Pascanu; Timothy Lillicrap",
    link: "https://arxiv.org/pdf/1806.01822.pdf",
    slides: [
      {
        content:
        "This paper explores relational recurrent neural networks, integrating relational reasoning into RNNs. It enhances the model's ability to capture complex dependencies and relationships, improving performance in tasks requiring sequential and relational understanding.",
        type: "summary",
      },
      {
        content:
        "1. Combines relational reasoning with recurrent neural networks for enhanced modeling. \n2. Improves the ability to capture complex dependencies in sequential data. \n3. Demonstrates effectiveness in tasks requiring relational understanding.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 25,
    date: "16 Nov 2018",
    title: "GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism",
    authors:
      "Yanping Huang; Youlong Cheng; Ankur Bapna; Orhan Firat; Mia Xu Chen; Dehao Chen; HyoukJoong Lee; Jiquan Ngiam; Quoc V. Le; Yonghui Wu; Zhifeng Chen",
    link: "https://arxiv.org/pdf/1811.06965.pdf",
    slides: [
      {
        content:
        "This paper presents GPipe, a method for training large neural networks efficiently using pipeline parallelism. It improves scalability and reduces training time, enabling the handling of giant models in deep learning applications.",
        type: "summary",
      },
      {
        content:
        "1. Introduces pipeline parallelism to efficiently train large neural networks. \n2. Reduces memory usage by partitioning models across multiple accelerators. \n3. Demonstrates scalability and improved training speed for giant models.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "event",
    date: "01 Jan 2020",
    title: "Launch GPT-3"
  },
  {
    type: "paper",
    id: 26,
    date: "23 Jan 2020",
    title: "Scaling Laws for Neural Language Models",
    authors:
      "Jared Kaplan; Sam McCandlish; Tom Henighan; Tom B. Brown; Benjamin Chess; Rewon Child; Scott Gray; Alec Radford; Jeffrey Wu; Dario Amodei",
    link: "https://arxiv.org/pdf/2001.08361.pdf",
    slides: [
      {
        content:
        "This paper explores the scaling laws governing neural language models, analyzing how model size, data, and compute affect performance. It provides insights into optimizing resources for improved language model efficiency and effectiveness.",
        type: "summary",
      },
      {
        content:
        "1. Identifies scaling laws that govern the performance of neural language models. \n2. Provides insights into model size, data, and compute requirements for optimal performance. \n3. Guides the development of more efficient and effective language models.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 27,
    date: "10 Apr 2020",
    title: "Dense Passage Retrieval for Open-Domain Question Answering",
    authors:
      "Vladimir Karpukhin; Barlas Oğuz; Sewon Min; Patrick Lewis; Ledell Wu; Sergey Edunov; Danqi Chen; Wen-tau Yih",
    link: "https://arxiv.org/pdf/2004.04906.pdf",
    slides: [
      {
        content:
        "This paper introduces dense passage retrieval, enhancing open-domain question answering by efficiently retrieving relevant passages. It improves accuracy and speed, offering a robust solution for handling large-scale information retrieval tasks in natural language processing.",
        type: "summary",
      },
      {
        content:
        "1. Proposes a dense retrieval method for improving open-domain question answering. \n2. Enhances retrieval accuracy by leveraging dense vector representations. \n3. Demonstrates significant improvements over traditional sparse retrieval techniques.",
        type: "keyTakeaways",
      }
    ]
  },
      {
    type: "event",
    date: "01 Jan 2021",
    title: "Launch DALL-E; Launch Codex"
  },
  {
    type: "event",
    date: "01 Jan 2022",
    title: "Launch ChatGPT (GPT-3.5); Stable Diffusion; Midjourney"
  },
  {
    type: "paper",
    id: 28,
    date: "22 May 2020",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors:
      "Patrick Lewis; Ethan Perez; Aleksandra Piktus; Fabio Petroni; Vladimir Karpukhin; Naman Goyal; Heinrich Küttler; Mike Lewis; Wen-tau Yih; Tim Rocktäschel; Sebastian Riedel; Douwe Kiela",
    link: "https://arxiv.org/pdf/2005.11401.pdf",
    slides: [
      {
        content:
      "This paper presents retrieval-augmented generation, combining retrieval and generation for knowledge-intensive NLP tasks. It enhances model performance by integrating external knowledge, improving accuracy and relevance in tasks like question answering and summarization.",
        type: "summary",
      },
      {
        content:
        "1. Combines retrieval and generation to enhance knowledge-intensive NLP tasks. \n2. Improves model performance by integrating external knowledge sources. \n3. Validates the approach on tasks like question answering and fact-checking.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "paper",
    id: 29,
    date: "20 Dec 2022",
    title: "Precise Zero-Shot Dense Retrieval Without Relevance Labels",
    authors: "Luyu Gao; Xueguang Ma; Jimmy Lin; Jamie Callan",
    link: "https://arxiv.org/pdf/2212.10496.pdf",
    slides: [
      {
        content:
        "This paper explores zero-shot dense retrieval, achieving precise results without relevance labels. It leverages pre-trained models to enhance retrieval accuracy, offering a novel approach to information retrieval in scenarios lacking labeled data.",
        type: "summary",
      },
      {
        content:
        "1. Introduces a method for zero-shot dense retrieval without the need for relevance labels. \n2. Achieves high retrieval accuracy using pre-trained language models. \n3. Demonstrates effectiveness in various retrieval scenarios.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "event",
    date: "01 Jan 2023",
    title: "Launch GPT-4; Launch Claude"
  },
  {
    type: "paper",
    id: 30,
    date: "06 Jul 2023",
    title: "Lost in the Middle: How Language Models Use Long Contexts",
    authors: "Nelson F. Liu; Kevin Lin; John Hewitt; Ashwin Paranjape; Michele Bevilacqua; Fabio Petroni; Percy Liang",
    link: "https://arxiv.org/pdf/2307.03172.pdf",
    slides: [
      {
        content:
        "This paper examines how language models utilize long contexts, identifying challenges and opportunities. It provides insights into optimizing context usage for improved model performance, addressing issues like context fragmentation and information retention.",
        type: "summary",
      },
      {
        content:
        "1. Analyzes the ability of language models to utilize long contexts effectively. \n2. Identifies challenges and limitations in processing extended sequences. \n3. Suggests improvements for better handling of long-range dependencies.",
        type: "keyTakeaways",
      }
    ]
  },
  {
    type: "event",
    date: "2024",
    title: "Launch Gemini 1.5; Launch GPT-4 Turbo"
  },
  {
    type: "event",
    date: "2025",
    title: "Launch GPT-4o; Launch Gemini 2.5"
  },
]


const IlyaList: { title: string; url: string }[] = [
  { title: "The Annotated Transformer", url: "https://nlp.seas.harvard.edu/annotated-transformer/" },
  { title: "The First Law of Complexodynamics", url: "https://scottaaronson.blog/?p=762" },
  { title: "The Unreasonable Effectiveness of Recurrent Neural Networks", url: "https://karpathy.github.io/2015/05/21/rnn-effectiveness/" },
  { title: "Understanding LSTM Networks", url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/" },
  { title: "Recurrent Neural Network Regularization", url: "https://arxiv.org/pdf/1409.2329.pdf" },
  { title: "Keeping Neural Networks Simple by Minimizing the Description Length of the Weights", url: "https://www.cs.toronto.edu/~hinton/absps/colt93.pdf" },
  { title: "Pointer Networks", url: "https://arxiv.org/pdf/1506.03134.pdf" },
  { title: "ImageNet Classification with Deep Convolutional Neural Networks", url: "https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf" },
  { title: "Order Matters: Sequence-to-Sequence for Sets", url: "https://arxiv.org/pdf/1511.06391.pdf" },
  { title: "GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism", url: "https://arxiv.org/pdf/1811.06965.pdf" },
  { title: "Deep Residual Learning for Image Recognition", url: "https://arxiv.org/pdf/1512.03385.pdf" },
  { title: "Multi-Scale Context Aggregation by Dilated Convolutions", url: "https://arxiv.org/pdf/1511.07122.pdf" },
  { title: "Neural Message Passing for Quantum Chemistry", url: "https://arxiv.org/pdf/1704.01212.pdf" },
  { title: "Attention Is All You Need", url: "https://arxiv.org/pdf/1706.03762.pdf" },
  { title: "Neural Machine Translation by Jointly Learning to Align and Translate", url: "https://arxiv.org/pdf/1409.0473.pdf" },
  { title: "Identity Mappings in Deep Residual Networks", url: "https://arxiv.org/pdf/1603.05027.pdf" },
  { title: "A Simple Neural Network Module for Relational Reasoning", url: "https://arxiv.org/pdf/1706.01427.pdf" },
  { title: "Variational Lossy Autoencoder", url: "https://arxiv.org/pdf/1611.02731.pdf" },
  { title: "Relational Recurrent Neural Networks", url: "https://arxiv.org/pdf/1806.01822.pdf" },
  { title: "Quantifying the Rise and Fall of Complexity in Closed Systems: The Coffee Automaton", url: "https://arxiv.org/pdf/1405.6903.pdf" },
  { title: "Neural Turing Machines", url: "https://arxiv.org/pdf/1410.5401.pdf" },
  { title: "Deep Speech 2: End-to-End Speech Recognition in English and Mandarin", url: "https://arxiv.org/pdf/1512.02595.pdf" },
  { title: "Scaling Laws for Neural Language Models", url: "https://arxiv.org/pdf/2001.08361.pdf" },
  { title: "A Tutorial Introduction to the Minimum Description Length Principle", url: "https://arxiv.org/pdf/math/0406077.pdf" },
  { title: "Machine Super Intelligence", url: "https://www.vetta.org/documents/Machine_Super_Intelligence.pdf" },
  { title: "Kolmogorov Complexity and Algorithmic Randomness", url: "https://www.lirmm.fr/~ashen/kolmbook-eng-scan.pdf" },
  { title: "CS231n: Deep Learning for Computer Vision", url: "https://cs231n.github.io/" }
]

function sortByIlyaList(items: Item[], ilyaList: { title: string; url: string }[]): Item[] {
  const ilyaTitles = ilyaList.map(item => item.title);
  const sortedItems = [...items].sort((a, b) => {
    const indexA = ilyaTitles.indexOf(a.title);
    const indexB = ilyaTitles.indexOf(b.title);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
  return sortedItems;
}

const itemsSortedByIlyaList = sortByIlyaList(items, IlyaList);