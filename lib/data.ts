import image from "next/image"
import type { Item } from "./types"

export async function getPapers(): Promise<Item[]> {
  // Create a Map to track unique items by title
  const uniqueItems = new Map<string, Item>();
  
  // Add all items to the map, using title as the key
  [...events, ...itemsSortedByDate].forEach(item => {
    uniqueItems.set(item.title, item);
  });
  
  // Convert map values back to array and sort by date
  return Array.from(uniqueItems.values())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item, index) => ({ ...item, id: index + 1 }));
}

export async function getPapersSortedByIlyaList(): Promise<Item[]> {
  return itemsSortedByIlyaList.map((item, index) => ({ ...item, id: index + 1 }))
}

const events: Item[] = [
  { 
    type: "event", 
    date: "01 Jan 1974", 
    start: 1974, 
    end: 1980, 
    title: "First AI winter: limited progress, loss of funding due to overly optimistic expectations", 
    slides: [
      {
        content: "The first AI winter was a period of reduced funding and interest in artificial intelligence research. Following a series of criticisms and government report cutbacks in funding, especially from DARPA, AI research slowed significantly from 1974-1980.",
        bullets: [
          "Caused by failure to meet ambitious expectations and promises",
          "DARPA funding cuts after the Lighthill Report questioned AI progress",
          "Highlighted the difficulty of natural language processing and expert systems"
        ]
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Jan 1987", 
    start: 1987, 
    end: 1993, 
    title: "Second AI winter: reduced funding after expert systems failed commercially",
    slides: [
      {
        content: "The second major AI winter occurred when the market for expert systems collapsed in the late 1980s. Specialized AI hardware companies suffered as conventional desktop computers became more powerful, making dedicated AI machines unnecessary.",
        videoUrl: "https://youtu.be/fZYUqICYCAk?si=xlq5LB1XRTNQtEIP"
      }
    ] 
  },
  { 
    type: "event", 
    date: "01 Jan 1997", 
    title: "IBM's Deep Blue beats chess champion Garry Kasparov", 
    slides: [
      {
        content: "In 1997, IBM's Deep Blue became the first computer chess-playing system to beat a reigning world chess champion, Garry Kasparov, in a match under standard chess tournament time controls.",
        imageUrl: "https://eu-images.contentstack.com/v3/assets/blt6b0f74e5591baa03/blt7cc688614b70f9be/65672f49361a98040a9a8940/News_Image_-_2023-11-29T123206.186.jpg",
      },
      {
        videoUrl: "https://www.youtube.com/watch?v=KF6sLCeBj0s"
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Jan 2011", 
    title: "IBM Watson wins Jeopardy!",
    slides: [
      {
        content: "IBM's Watson computer system competed on Jeopardy! against former winners Brad Rutter and Ken Jennings. Watson won the first place prize of $1 million, demonstrating significant advances in natural language processing and question answering.",
        imageUrl: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/msnbc/Components/Photo/_new/110114-watson-hmed-5p.jpg"
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Jan 2012", 
    title: "AlexNet wins ImageNet challenge, sparking deep learning revolution",
    slides: [
      {
        content: "AlexNet, developed by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton, won the ImageNet Large Scale Visual Recognition Challenge (ILSVRC) with significantly better results than previous approaches. This victory sparked the modern deep learning revolution.",
        imageUrl: "https://miro.medium.com/v2/resize:fit:1400/1*bD_DMBtKwveuzIkQTwjKQQ.png"
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Jan 2016", 
    title: "AlphaGo beats Lee Sedol in Go",
    slides: [
      {
        content: "DeepMind's AlphaGo defeated 18-time world champion Lee Sedol in the board game Go, which was considered a grand challenge for AI due to its complexity. AlphaGo's victory was a landmark achievement for deep reinforcement learning.",
        imageUrl: "https://storage.googleapis.com/deepmind-live-cms/images/AlphaGo%2520documentary%2520still%25203.max-1100x1100.jpg"
      }
    ]
  },
  { 
    type: "event", 
    date: "01 June 2018", 
    title: "Launch GPT-1",
    slides: [
      {
        content: "In 2018, the first steps toward what would become the Generative Pre-trained Transformer (GPT) model began with advances in sequence-to-sequence learning and attention mechanisms, laying the groundwork for future large language models.",
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Feb 2019", 
    title: "Launch GPT-2; Launch BERT",
    slides: [
      {
        title: "Major Language Model Advances",
        bullets: [
          "OpenAI released GPT-2, a 1.5B parameter model showing impressive text generation capabilities",
          "Google released BERT (Bidirectional Encoder Representations from Transformers)",
          "These models set new standards for language understanding and generation tasks"
        ],
        imageUrl: "https://miro.medium.com/v2/resize:fit:1400/1*vTRzCQsyP-lcJBTJYxdKYQ.png"
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Jun 2020", 
    title: "Launch GPT-3",
    slides: [
      {
        content: "OpenAI released GPT-3, a 175-billion parameter language model that demonstrated unprecedented capabilities in natural language understanding and generation, showing few-shot and zero-shot learning abilities.",
        imageUrl: "https://techmond.com/wp-content/uploads/2023/02/Applications-of-GPT3.jpg"
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Jan 2021", 
    title: "Launch DALL-E; Launch Codex",
    slides: [
      {
        title: "Multimodal AI Models",
        bullets: [
          "OpenAI introduced DALL-E, generating images from natural language descriptions",
          "OpenAI released Codex, powering GitHub Copilot for code generation",
          "These systems extended language models to new domains beyond text"
        ],
        imageUrl: "https://miro.medium.com/v2/resize:fit:1400/1*s8JFjWCh_WU4JnPF1IdQSA.jpeg"
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Jan 2022", 
    title: "Launch ChatGPT (GPT-3.5); Stable Diffusion; Midjourney",
    slides: [
      {
        content: "2022 marked the beginning of AI going mainstream with ChatGPT (based on GPT-3.5) and the release of powerful image generation models like Stable Diffusion and Midjourney that democratized access to AI creative tools.",
        imageUrl: "https://www.thurrott.com/wp-content/uploads/sites/2/2023/03/ChatGPT.jpg"
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Jan 2023", 
    title: "Launch GPT-4; Launch Claude",
    slides: [
      {
        title: "Next Generation AI Models",
        bullets: [
          "OpenAI released GPT-4 with multimodal capabilities and improved reasoning",
          "Anthropic introduced Claude, focusing on constitutional AI and safety",
          "Major improvements in reasoning, coding, and multimodal understanding"
        ],
        imageUrl: "https://media.wired.com/photos/641a2065e416a93659850ce2/master/pass/GPT-4-Scores-Gear.jpg"
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Jan 2024", 
    title: "Launch Gemini 1.5; Launch GPT-4 Turbo",
    slides: [
      {
        content: "The AI race accelerated with Google releasing Gemini 1.5 featuring million-token context windows, while OpenAI launched GPT-4 Turbo with improved capabilities and lower costs.",
        imageUrl: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_15_header_4.width-1000.format-webp.webp"
      }
    ]
  },
  { 
    type: "event", 
    date: "01 Jan 2025", 
    title: "Launch GPT-4o; Launch Gemini 2.5",
    slides: [
      {
        content: "Predicted future releases of next-generation models with even more advanced capabilities in multimodal understanding, reasoning, and real-time interactions.",
      }
    ]
  },
]


const items: Item[] = [
  {
    type: "paper",
    order: 1,
    date: "01 Aug 2017",
    title: "The Annotated Transformer",
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
    link: "https://nlp.seas.harvard.edu/annotated-transformer/",
    slides: [
      {
        content: "This paper is a simplified and annotated version of the Attention Is All You Need paper, it shows the architecture of the Transformer model, with diagrams and python code.",
      },
      {
        bullets: [
          "Offers a practical, executable implementation of the Transformer architecture.",
          "Breaks down complex concepts with detailed annotations and explanations.",
          "Serves as an educational bridge between theoretical papers and practical implementation.",
        ],
      },
      {
        title: "Transformer Architecture",
        imageUrl: "https://miro.medium.com/v2/resize:fit:640/format:webp/1*InsTuWpZTYm0kwi8ovIMAQ.png",
      }
    ]
  },
  {
    type: "paper",
    order: 2,
    date: "23 Sep 2011",
    title: "The First Law of Complexodynamics",
    authors: "Scott Aaronson",
    link: "https://scottaaronson.blog/?p=762",
    slides: [
      {
        content:
        "This blog post explores the dynamics of complexity in closed systems using the Coffee Automaton model. It analyzes how complexity emerges, evolves, and dissipates, providing insights into the fundamental principles governing complex systems and their applications in various scientific fields.",
      },
      {
        content: "Its about the notion of complexity, and how it tends to have a inverted U shape.. in layman terms the system starts and ends in simplicity, but peaks for complexity in the middle intermediate stage. \nInteresting how this looks like a computation, you start your program, it expands into many states,  and then it converges back into a single state",
        imageUrl: "https://149663533.v2.pressablecdn.com/coffee-small.jpg",
      },
      {
        content: "Entropy increases but entropy follows a curve.",
        imageUrl: "https://scottaaronson.blog/complexity-lrg.jpg",
        intuition: "does this mean universe can be modelled as a computation? and entropy is increasing because of it's relation with time?... "                
      },
      {
        title: "Questions about Entropy",
        bullets: [
          "What is the formal definition of complexity?",
          "Prove that the complexity we define ends up explaining the pattern we are seeing.",
        ],
        content: "It's intuitively easy to guess why it is so, but for mathematical rigor, the author uses ideas from 'Kolmogorov complexity', the concept of Kolmogorov complexity itself, and another concept called 'sophistication'. KC of a string is the smallest program that can generate it, which can be thought of as the smallest compression of it that can computationally expand, somewhat akin to the notion of intelligence.",
        imageUrl: "https://pbs.twimg.com/media/GrXJ8sZbAAEYXBh?format=jpg&name=medium"
      },
      {
        title: "Kolmogorov Complexity (KC)",
        content: "An example of KC is 01010101 can be represented as 01 repeated 4 times; while a random string like 01100101 can't be compressed further"
      },
      {
        content: "Kolmogorov Complexity (KC) helps explain entropy. A random string has high KC but is uninteresting because it lacks structure. Complexity needs structure to be meaningful. We can use limited computations or a probabilistic model to match KC and entropy with observed complexity. Without structure, a string seems random and uninteresting.",
        imageUrl: "https://pbs.twimg.com/media/GrXM_JBbgAAnn5I?format=jpg&name=medium"
      },
      {
        content: "Sophistication means being hard to describe. A string with a simple generator has low sophistication. Low entropy means fewer states and low sophistication, while high entropy means randomness, low sophistication, but high KC. This offers a fresh view on complexity.",
        imageUrl: "https://pbs.twimg.com/media/GrXPZcDbAAI01Ou?format=jpg&name=medium"
      }
    ]
  },
  {
    type: "paper",
    order: 3,
    date: "21 May 2015",
    title: "The Unreasonable Effectiveness of Recurrent Neural Networks",
    authors: "Andrej Karpathy",
    link: "https://karpathy.github.io/2015/05/21/rnn-effectiveness/",
    slides: [
      {
        content:
        "This paper highlights the surprising capabilities of recurrent neural networks in sequence prediction tasks. It demonstrates their effectiveness in generating coherent sequences, from text to music, showcasing the potential of RNNs in creative and predictive applications.",
        imageUrl: "https://pbs.twimg.com/media/GrXdeNwa8AEeuw8?format=jpg&name=medium"
      },
      {
        bullets: [
          "RNNs were the state-of-the-art before transformers, but faced challenges like scalability.",
          "Attention mechanisms revolutionized the field, yet RNNs still appear in projects like RWKV.",
          "Despite their limitations, RNNs continue to be relevant in certain applications."
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 4,
    date: "27 Aug 2015",
    title: "Understanding LSTM Networks",
    authors: "Christopher Olah",
    link: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/",
    slides: [
      {
        content:
        "This paper explains Long Short-Term Memory (LSTM) networks, a type of recurrent neural network capable of learning long-term dependencies. It covers their architecture, functionality, and applications, highlighting their effectiveness in sequence prediction tasks across various domains.",
        imageUrl: "https://pbs.twimg.com/media/GrXexl6bAAM3DQO?format=jpg&name=medium"
      },
      {
        content: "The paper provides a detailed explanation of LSTM networks, illustrating how they can be viewed as standard neural networks once the recurrence is unrolled. It explores their architecture, functionality, and applications, raising the question of whether solving the long context problem in RNNs could lead to insights applicable to a mathematically equivalent Transformer.",
        imageUrl: "https://pbs.twimg.com/media/GrXfqKabAAAc3ZF?format=jpg&name=medium"
      },
      {
        content: "So RNN have issues wiht long context... LSTM came to solve it .. LSTM = Long short temr memory \n\n the repeating module of LSTM is more complex than RNN and something to do with the memory part",
        imageUrl: "https://pbs.twimg.com/media/GrXgjJGbAAIJ9Kw?format=jpg&name=medium"
      },
      {
        content: "What intrigues me about LSTM networks is their resemblance to the residual stream concept, with a primary path that remains unaltered and additional circuits diverging through alternative routes. The operations within LSTMs are akin to memory operations, involving function compositions. The article also discusses more complex variants of these networks.",
        imageUrl: "https://pbs.twimg.com/media/GrXhm8bbAAQyKa_?format=jpg&name=medium"
      },
      {
        bullets: [
          "Provides an in-depth explanation of Long Short-Term Memory (LSTM) networks.",
          "Clarifies the mechanisms that enable LSTMs to capture long-range dependencies.",
          "Offers practical guidance for implementing and training LSTM models.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 5,
    date: "08 Sep 2014",
    title: "Recurrent Neural Network Regularization",
    authors: "Wojciech Zaremba; Ilya Sutskever; Oriol Vinyals",
    link: "https://arxiv.org/pdf/1409.2329.pdf",
    slides: [
      {
        content:
        "This paper explores techniques to regularize recurrent neural networks, addressing overfitting issues. It introduces methods like dropout and weight noise, improving model generalization and performance. These techniques are crucial for enhancing the robustness of RNNs in various applications.",
        imageUrl: "https://pbs.twimg.com/media/GrXkGnIboAAHIeB?format=jpg&name=medium",
      },
      {
        content: "dropout was known to work for NN, but not for RNN/LSTM.. this paper helps in that",
      },
      {
        content: "They introduce a dropout operator that 'corrupts' the information carried by the unit, which according to them, leads to more robust computations. One way to imagine this is if there was a boundary where it could just 'tip' into the wrong computation zone. Adding noise/corruption forces the network to learn to remain some steps away from it.",
        imageUrl: "https://pbs.twimg.com/media/GrXkhvkbAAIHkVX?format=jpg&name=medium"
      },
      {
        bullets: [
          "Proposes new regularization techniques to enhance the performance of recurrent neural networks.",
          "Reduces overfitting and improves generalization in RNN models.",
          "Validates the effectiveness of the methods through extensive experiments.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 6,
    date: "01 Jul 1993",
    title: "Keeping Neural Networks Simple by Minimizing the Description Length of the Weights",
    authors: "Geoffrey E. Hinton; Drew van Camp",
    link: "https://www.cs.toronto.edu/~hinton/absps/colt93.pdf",
    slides: [
      {
        content:
        "Hinton & van Camp reduce overfitting in neural networks by minimizing weight description length using the MDL principle. This method simplifies to L2 weight-decay with a Gaussian prior, linking MDL to Bayesian regularization. It supports weight-sharing, pruning, and adaptive noise, effectively improving test errors.",
        imageUrl: "https://pbs.twimg.com/media/GrXRyILbAAI_k2g?format=png&name=medium"
      },
      {
        bullets: [
          "Simplifies neural network models by reducing the complexity of weight descriptions.",
          "Enhances model generalization by focusing on essential features.",
          "Reduces overfitting by minimizing unnecessary parameters.",
        ],
      },
      {
        imageUrl: "https://pbs.twimg.com/media/GrXSwdCa4AAHXdn?format=png&name=medium"
      },
      {
        content: "The majority of the paper discusses applying the MDL principle to weights, resulting in some improvements. However, the truly fascinating aspect is the assertion that 'the best model of some data is the one that minimizes the combined cost of describing the model and describing the misfit between the model and the data.' This notion of misfit is something I hadn't previously considered, though I recently encountered a similar concept in another paper. Additionally, I'm amazed by the insightful clarity with which these papers were written. Achieving such clarity of thought decades ago is no small feat. In hindsight, everything seems straightforward, but the brilliance of these ideas remains impressive today.",
        imageUrl: "https://pbs.twimg.com/media/GrXSwdCa4AAHXdn?format=png&name=medium"
      }
    ]
  },
  {
    type: "paper",
    order: 7,
    date: "09 Jun 2015",
    title: "Pointer Networks",
    authors: "Oriol Vinyals; Meire Fortunato; Navdeep Jaitly",
    link: "https://arxiv.org/pdf/1506.03134.pdf",
    slides: [
      {
        content:
        "This paper introduces Pointer Networks, a novel neural architecture for solving combinatorial optimization problems. It uses attention mechanisms to select output sequences, outperforming traditional methods in tasks like sorting and routing, and offering new solutions in optimization challenges.",
      },
      {
        bullets: [
          "Introduces Pointer Networks, a novel neural architecture for solving combinatorial problems.",
          "Demonstrates the model's ability to handle variable-sized outputs.",
          "Validates the approach on tasks like sorting and the traveling salesman problem.",
        ],
      }
    ]
  },


  {
    type: "paper",
    order: 8,
    date: "01 Dec 2012",
    title: "ImageNet Classification with Deep Convolutional Neural Networks",
    authors: "Alex Krizhevsky; Ilya Sutskever; Geoffrey E. Hinton",
    link: "https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
    slides: [
      {
        content:
        "AlexNet transformed image classification with deep convolutional neural networks, achieving high accuracy on ImageNet. It introduced ReLU activations, dropout, and GPU use, significantly advancing computer vision and deep learning architectures. Non saturating neurons + dropout + efficient gpu implementation on image dataset",
        imageUrl: "https://pbs.twimg.com/media/GrXkGnIboAAHIeB?format=jpg&name=medium",
      },
      {
        content: "> most paper is talking about stuff we consider obvious nowadays.. like use of relu, dropout, how to run code on gpus assinging blocks etc.. in hindsight it looks simple but this was sota at the time",
        imageUrl: "https://pbs.twimg.com/media/GrXm4riboAAyk8V?format=png&name=medium"
      },

      {
        bullets: [
          "Demonstrates the effectiveness of deep CNNs in large-scale image classification.",
          "Highlights the role of data augmentation and dropout in improving model performance.",
          "Sets a new benchmark for image recognition tasks with significant accuracy improvements.",
        ],
      }
    ]
  },

  {
    type: "paper",
    order: 9,
    date: "19 Nov 2015",
    title: "Order Matters: Sequence-to-sequence for sets",
    authors: "Oriol Vinyals; Samy Bengio; Manjunath Kudlur",
    link: "https://arxiv.org/pdf/1511.06391.pdf",
    slides: [
      {
        content:
        "This paper investigates how the order of input and output data significantly affects the learning of underlying models in sequence-to-sequence tasks for sets. It highlights the impact of different orderings on model performance and offers strategies to optimize sequence processing for enhanced accuracy in set-related applications.",
        imageUrl: "https://pbs.twimg.com/media/GrXYaQtbcAAghEm?format=png&name=medium"
      },
      {
        content: "The paper primarily conducts various experiments on different datasets using LSTM models, focusing less on theoretical discussions. It highlights how ordering data can enhance learning, akin to the concept of 'curriculum learning' where strategic data sequencing maximizes model performance.",
        imageUrl: "https://pbs.twimg.com/media/GrXbHZQbAAIpmY_?format=png&name=medium"
      },
      {
        content: "The paper delves into the significance of input order in sequence-to-sequence models for set-based tasks. It discusses how searching for the optimal order can enhance model performance, akin to the effect of multiple training epochs which might help the model learn the data in a more effective sequence. Additionally, it raises the question of whether a perfect order exists for data with cyclic dependencies, suggesting that achieving an ideal sequence might be challenging in such cases.",
      },
      {
        bullets: [
          "Investigates the impact of input order on sequence-to-sequence models for set-based tasks.",
          "Proposes methods to mitigate order sensitivity in model training.",
          "Demonstrates improved performance on tasks where order invariance is crucial.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 10,
    date: "16 Nov 2018",
    title: "GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism",
    authors:
      "Yanping Huang; Youlong Cheng; Ankur Bapna; Orhan Firat; Mia Xu Chen; Dehao Chen; HyoukJoong Lee; Jiquan Ngiam; Quoc V. Le; Yonghui Wu; Zhifeng Chen",
    link: "https://arxiv.org/pdf/1811.06965.pdf",
    slides: [
      {
        content:
        "This paper presents GPipe, a method for training large neural networks efficiently using pipeline parallelism. It improves scalability and reduces training time, enabling the handling of giant models in deep learning applications.",
      },
      {
        bullets: [
          "Introduces pipeline parallelism to efficiently train large neural networks.",
          "Reduces memory usage by partitioning models across multiple accelerators.",
          "Demonstrates scalability and improved training speed for giant models.",
        ],
      }
    ]
  },

  {
    type: "paper",
    order: 11,
    date: "10 Dec 2015",
    title: "Deep Residual Learning for Image Recognition",
    authors: "Kaiming He; Xiangyu Zhang; Shaoqing Ren; Jian Sun",
    link: "https://arxiv.org/pdf/1512.03385.pdf",
    slides: [
      {
        content:
        "This paper introduces deep residual networks (ResNets) for image recognition. It addresses the degradation problem in deep networks by using residual learning, significantly improving accuracy and enabling the training of much deeper models.",
      },
      {
        bullets: [
          "Introduces residual learning framework to ease training of deep networks.",
          "Significantly improves accuracy in image recognition tasks.",
          "Enables the training of extremely deep networks with hundreds of layers.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 12,
    date: "23 Nov 2015",
    title: "Multi-Scale Context Aggregation by Dilated Convolutions",
    authors: "Fisher Yu; Vladlen Koltun",
    link: "https://arxiv.org/pdf/1511.07122.pdf",
    slides: [
      {
        content:
        "This paper introduces dilated convolutions for multi-scale context aggregation in neural networks. It enhances feature extraction by expanding the receptive field without increasing parameters, improving performance in tasks like image segmentation and object detection.",
      },
      {
        bullets: [
          "Introduces dilated convolutions for effective multi-scale context aggregation.",
          "Enhances feature extraction without increasing computational cost.",
          "Improves performance in dense prediction tasks like semantic segmentation.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 13,
    date: "04 Apr 2017",
    title: "Neural Message Passing for Quantum Chemistry",
    authors: "Justin Gilmer; Samuel S. Schoenholz; Patrick F. Riley; Oriol Vinyals; George E. Dahl",
    link: "https://arxiv.org/pdf/1704.01212.pdf",
    slides: [
      {
        content:
        "This paper presents a neural message passing framework for quantum chemistry, enhancing molecular property prediction. It leverages graph neural networks to model interactions, improving accuracy and efficiency in computational chemistry tasks.",
      },
      {
        bullets: [
          "Develops a neural message passing framework for molecular property prediction.",
          "Achieves state-of-the-art results in quantum chemistry tasks.",
          "Offers a scalable approach to model complex molecular interactions.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 14,
    date: "12 Jun 2017",
    title: "Attention Is All You Need",
    authors:
      "Ashish Vaswani; Noam Shazeer; Niki Parmar; Jakob Uszkoreit; Llion Jones; Aidan N. Gomez; Łukasz Kaiser; Illia Polosukhin",
    link: "https://arxiv.org/pdf/1706.03762.pdf",
    slides: [
      {
        content:
        "This paper introduces the Transformer model, revolutionizing natural language processing by using self-attention mechanisms. It eliminates recurrence, improving parallelization and performance in sequence transduction tasks, setting new standards in NLP.",
      },
      {
        bullets: [
          "Introduces the Transformer model, relying solely on attention mechanisms.",
          "Achieves superior performance in machine translation tasks.",
          "Simplifies the architecture by removing recurrence and convolutions.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 15,
    date: "01 Sep 2014",
    title: "Neural Machine Translation by Jointly Learning to Align and Translate",
    authors: "Dzmitry Bahdanau; Kyunghyun Cho; Yoshua Bengio",
    link: "https://arxiv.org/pdf/1409.0473.pdf",
    slides: [
      {
        content:
        "This paper introduces a novel approach to neural machine translation by integrating alignment and translation processes. It enhances translation accuracy by jointly learning these tasks, significantly improving performance over traditional methods, and setting a new standard in machine translation research.",
      },
      {
        bullets: [
          "Introduces a novel approach to neural machine translation by integrating alignment and translation processes.",
          "Improves translation accuracy by leveraging joint learning techniques.",
          "Demonstrates the effectiveness of the model on various language pairs.",
        ],
      }
    ]
  },

  {
    type: "paper",
    order: 16,
    date: "16 Mar 2016",
    title: "Identity Mappings in Deep Residual Networks",
    authors: "Kaiming He; Xiangyu Zhang; Shaoqing Ren; Jian Sun",
    link: "https://arxiv.org/pdf/1603.05027.pdf",
    slides: [
      {
        content:
        "This paper explores identity mappings in deep residual networks, enhancing their performance. It shows how identity shortcuts improve training efficiency and accuracy, contributing to the success of ResNets in various computer vision tasks.",
      },
      {
        bullets: [
          "Proposes identity mappings to improve residual network training.",
          "Enhances learning by simplifying the optimization process.",
          "Demonstrates improved performance on benchmark image recognition datasets.",
        ],
      }
    ]
  },

  {
    type: "paper",
    order: 17,
    date: "05 Jun 2017",
    title: "A Simple Neural Network Module for Relational Reasoning",
    authors:
      "Adam Santoro; David Raposo; David G.T. Barrett; Mateusz Malinowski; Razvan Pascanu; Peter Battaglia; Timothy Lillicrap",
    link: "https://arxiv.org/pdf/1706.01427.pdf",
    slides: [
      {
        content:
        "This paper introduces a neural network module designed for relational reasoning tasks. It enhances the model's ability to process and infer relationships between entities, improving performance in tasks requiring complex relational understanding.",
      },
      {
        bullets: [
          "Proposes a neural network module for effective relational reasoning.",
          "Enhances the ability to process and reason about relationships in data.",
          "Demonstrates improved performance on visual question answering tasks.",
        ],
      }
    ]
  },

  {
    type: "paper",
    order: 18,
    date: "08 Nov 2016",
    title: "Variational Lossy Autoencoder",
    authors:
      "Xi Chen; Diederik P. Kingma; Tim Salimans; Yan Duan; Prafulla Dhariwal; John Schulman; Ilya Sutskever; Pieter Abbeel",
    link: "https://arxiv.org/pdf/1611.02731.pdf",
    slides: [
      {
        content:
        "This paper introduces a variational approach to lossy autoencoders, focusing on efficient data compression and reconstruction. It explores the trade-offs between compression rate and quality, providing insights into optimizing autoencoder performance for various applications.",
      },
      {
        bullets: [
          "Introduces a variational approach to lossy data compression.",
          "Balances reconstruction quality and compression rate effectively.",
          "Provides insights into the trade-offs in lossy compression using neural networks.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 19,
    date: "05 Jun 2018",
    title: "Relational Recurrent Neural Networks",
    authors:
      "Adam Santoro; Ryan Faulkner; David Raposo; Jack Rae; Mike Chrzanowski; Theophane Weber; Daan Wierstra; Oriol Vinyals; Razvan Pascanu; Timothy Lillicrap",
    link: "https://arxiv.org/pdf/1806.01822.pdf",
    slides: [
      {
        content:
        "This paper explores relational recurrent neural networks, integrating relational reasoning into RNNs. It enhances the model's ability to capture complex dependencies and relationships, improving performance in tasks requiring sequential and relational understanding.",
      },
      {
        bullets: [
          "Combines relational reasoning with recurrent neural networks for enhanced modeling.",
          "Improves the ability to capture complex dependencies in sequential data.",
          "Demonstrates effectiveness in tasks requiring relational understanding.",
        ],
      }
    ]
  },

  {
    type: "paper",
    order: 20,
    date: "27 May 2014",
    title: "Quantifying the Rise and Fall of Complexity in Closed Systems: The Coffee Automaton",
    authors: "Scott Aaronson, Sean M. Carroll, Lauren Ouellette",
    link: "https://arxiv.org/pdf/1405.6903",
    slides: [
      {
        content:
        "In contrast to entropy, which increases monotonically, the 'complexity' or 'interestingness' of closed systems seems intuitively to increase at first and then decrease as equilibrium is approached. For example, our universe lacked complex structures at the Big Bang and will also lack them after black holes evaporate and particles are dispersed. This paper makes an initial attempt to quantify this pattern. As a model system, we use a simple, two-dimensional cellular automaton that simulates the mixing of two liquids ('coffee' and 'cream'). A plausible complexity measure is then the Kolmogorov complexity of a coarse-grained approximation of the automaton's state, which we dub the 'apparent complexity.' We study this complexity measure, and show analytically that it never becomes large when the liquid particles are non-interacting. By contrast, when the particles do interact, we give numerical evidence that the complexity reaches a maximum comparable to the 'coffee cup's' horizontal dimension. We raise the problem of proving this behavior analytically.",
      },
    ]
  },

  {
    type: "paper",
    order: 21,
    date: "20 Oct 2014",
    title: "Neural Turing Machines",
    authors: "Alex Graves; Greg Wayne; Ivo Danihelka",
    link: "https://arxiv.org/pdf/1405.6903.pdf",
    slides: [
      {
        content:
        "This paper presents Neural Turing Machines, a model combining neural networks with external memory resources. It mimics the capabilities of a Turing machine, enabling complex data manipulation and storage, advancing the field of neural computation and memory-augmented networks.",
      },
      {
        bullets: [
          "Combines neural networks with external memory resources to create Neural Turing Machines.",
          "Enhances the ability of neural networks to perform algorithmic tasks.",
          "Demonstrates the potential of NTMs in solving complex computational problems.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 22,
    date: "08 Dec 2015",
    title: "Deep Speech 2: End-to-End Speech Recognition in English and Mandarin",
    authors:
      "Dario Amodei; Rishita Anubhai; Eric Battenberg; Carl Case; Jared Casper; Bryan Catanzaro; Jingdong Chen; Mike Chrzanowski; Adam Coates; Greg Diamos; Erich Elsen; Jesse Engel; Linxi Fan; Christopher Fougner; Tony Han; Awni Hannun; Billy Jun; Patrick LeGresley; Libby Lin; Sharan Narang; Andrew Ng; Sherjil Ozair; Ryan Prenger; Jonathan Raiman; Sanjeev Satheesh; David Seetapun; Shubho Sengupta; Yi Wang; Zhiqian Wang; Chong Wang; Bo Xiao; Dani Yogatama; Jun Zhan; Zhenyao Zhu",
    link: "https://arxiv.org/pdf/1512.02595.pdf",
    slides: [
      {
        content:
        "This paper presents Deep Speech 2, an end-to-end speech recognition system for English and Mandarin. It utilizes deep learning techniques to achieve high accuracy, demonstrating significant improvements over traditional methods in speech recognition tasks.",
      },
      {
        bullets: [
          "Proposes an end-to-end deep learning approach for speech recognition.",
          "Achieves state-of-the-art performance in both English and Mandarin.",
          "Utilizes a deep recurrent neural network architecture for improved accuracy.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 23,
    date: "23 Jan 2020",
    title: "Scaling Laws for Neural Language Models",
    authors:
      "Jared Kaplan; Sam McCandlish; Tom Henighan; Tom B. Brown; Benjamin Chess; Rewon Child; Scott Gray; Alec Radford; Jeffrey Wu; Dario Amodei",
    link: "https://arxiv.org/pdf/2001.08361.pdf",
    slides: [
      {
        content:
        "This paper explores the scaling laws governing neural language models, analyzing how model size, data, and compute affect performance. It provides insights into optimizing resources for improved language model efficiency and effectiveness.",
      },
      {
        bullets: [
          "Identifies scaling laws that govern the performance of neural language models.",
          "Provides insights into model size, data, and compute requirements for optimal performance.",
          "Guides the development of more efficient and effective language models.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 24,
    date: "04 Jun 2004",
    title: "A Tutorial Introduction to the Minimum Description Length Principle",
    authors: "Peter Grunwald",
    link: "https://arxiv.org/pdf/math/0406077.pdf",
    slides: [ 
      {
        content:
        "This paper introduces the MDL principle, a method for model selection and inference in information theory. It minimizes data and model description length to prevent overfitting. The paper covers MDL's foundations, applications, and practical guidance, aiding in selecting models that generalize well.",
      },
      {
        bullets: [
          "Provides a comprehensive overview of the MDL principle in model selection.",
          "Demonstrates the application of MDL in various statistical models.",
          "Highlights the balance between model complexity and data fitting.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 25,
    date: "22 Jun 2008",
    title: "Machine Super Intelligence",
    authors: "Shane Legg",
    link: "https://www.vetta.org/documents/Machine_Super_Intelligence.pdf",
    slides: [
      {
        content:
        "This paper discusses machine superintelligence, an AI surpassing human intelligence. It examines societal, ethical, and future implications, focusing on controlling and aligning such systems with human values. The paper emphasizes safety measures and explores superintelligence's transformative impact on technology, economy, and global power dynamics.",
      },
      {
        bullets: [
          "Examines the potential and challenges of achieving superintelligent AI.",
          "Discusses ethical considerations and safety measures for AI development.",
          "Analyzes the impact of superintelligence on society and future technologies.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 26,
    date: "01 Jan 2008",
    title: "Kolmogorov Complexity and Algorithmic Randomness",
    authors: "A. Shen; V. A. Uspensky; N. Vereshchagin",
    link: "https://www.lirmm.fr/~ashen/kolmbook-eng-scan.pdf",
    slides: [
      {
        content:
        "This paper examines Kolmogorov complexity, measuring randomness by the shortest description length of a string. It explores algorithmic randomness and its implications in data compression, information theory, and computational theory, serving as a foundational text for understanding the mathematical basis of randomness.",
      },
      {
        bullets: [
          "Explores the concept of Kolmogorov complexity in measuring randomness.",
          "Discusses the implications of algorithmic randomness in computation.",
          "Connects complexity theory with practical applications in data compression.",
        ],
      }
    ]
  },
  {
    type: "paper",
    order: 27,
    date: "01 Jan 2015",
    title: "Stanford's CS231n Convolutional Neural Networks for Visual Recognition",
    authors: "Fei-Fei Li; Justin Johnson; Serena Yeung",
    link: "https://cs231n.github.io/",
    slides: [
      {
        content:
        "This course provides comprehensive insights into convolutional neural networks for visual recognition. It covers fundamental concepts, architectures, and applications, equipping students with practical skills and theoretical knowledge to tackle computer vision challenges using deep learning techniques.",
      },
      {
        bullets: [
          "Provides comprehensive coverage of CNNs for visual recognition tasks.",
          "Offers practical insights and techniques for improving CNN performance.",
          "Serves as a foundational resource for students and practitioners in the field.",
        ],
      }
    ]
  },
]

const otherFoundationPapers: Item[] = [
  {
    type: "paper",
    order: 28,
    date: "06 Jul 2023",
    title: "Lost in the Middle: How Language Models Use Long Contexts",
    authors: "Nelson F. Liu; Kevin Lin; John Hewitt; Ashwin Paranjape; Michele Bevilacqua; Fabio Petroni; Percy Liang",
    link: "https://arxiv.org/pdf/2307.03172.pdf",
    slides: [
      {
        content:
        "This paper examines how language models utilize long contexts, identifying challenges and opportunities. It provides insights into optimizing context usage for improved model performance, addressing issues like context fragmentation and information retention.",
      },
      {
        bullets: [
          "Analyzes the ability of language models to utilize long contexts effectively.",
          "Identifies challenges and limitations in processing extended sequences.",
          "Suggests improvements for better handling of long-range dependencies.",
        ],
      }
    ]
  },
]



function sortByOrder(items: Item[]): Item[] {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function sortByDate(items: Item[], events: Item[]): Item[] {
  return [...items, ...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
const itemsSortedByDate = sortByDate(items, events);
const itemsSortedByIlyaList = sortByOrder(items);
