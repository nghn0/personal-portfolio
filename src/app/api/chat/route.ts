import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();

    let responseText = "";

    if (lastMessage.includes("project") || lastMessage.includes("portfolio")) {
      responseText = "Nithish has several key projects:\n\n• Loomera: An AI Silk Classification & E-Commerce platform using MobileNetV2 with 92% accuracy.\n• Emojify: A Real-Time Facial Emotion Detection System using a Hybrid CNN + ViT architecture.\n• Sentient NPC: An offline conversational AI system with <245ms voice latency.\n• Smart Lock: An IoT hardware project using NodeMCU and RFID.\n\nYou can explore these in detail in the Projects section!";
    } 
    else if (lastMessage.includes("experience") || lastMessage.includes("work") || lastMessage.includes("intern")) {
      responseText = "Nithish has great professional experience:\n\n• AI Intern at Dhee Center for AI & Data Science: He developed an LSTM-based time series forecasting model to predict sunspot activity and conducted extensive trend analysis.\n\n• Full-Stack Developer Intern at Janmamithra Trust: He built a secure PHP–MySQL administrative portal for managing projects and volunteers.";
    }
    else if (lastMessage.includes("skill") || lastMessage.includes("tech") || lastMessage.includes("language")) {
      responseText = "Nithish is highly skilled in intelligent systems. His stack includes:\n\n• Languages: Python, JavaScript, Java, C++\n• AI/ML: TensorFlow, Keras, OpenCV, PyTorch, Scikit-Learn\n• Architectures: CNNs, LSTMs, Vision Transformers (ViT), Transfer Learning, Explainable AI (Grad-CAM)\n• Web: React, Next.js, Flask, Node.js, Tailwind CSS";
    }
    else if (lastMessage.includes("education") || lastMessage.includes("study") || lastMessage.includes("university")) {
      responseText = "Nithish is pursuing his B.Tech (Honors) in Computer Science and Engineering, with a major in Artificial Intelligence & Machine Learning at RV University (Bengaluru). He currently holds a CGPA of 8.74.";
    }
    else if (lastMessage.includes("contact") || lastMessage.includes("email") || lastMessage.includes("hire") || lastMessage.includes("reach")) {
      responseText = "You can easily reach Nithish by emailing him directly at nithi9905@gmail.com. You can also find him on LinkedIn (nithishgowda) or GitHub (nghn0). Feel free to use the Contact form at the bottom of the page!";
    }
    else if (lastMessage.includes("hello") || lastMessage.includes("hi") || lastMessage.includes("hey")) {
      responseText = "Hello there! I am Nithish's AI assistant. You can ask me about his projects, professional experience, tech stack, or how to contact him. What would you like to know?";
    }
    else if (lastMessage.includes("who are you") || lastMessage.includes("what are you")) {
      responseText = "I am an intelligent simulated assistant built directly into Nithish's portfolio. I run locally without needing external APIs, ensuring maximum privacy and zero latency. How can I help you explore his work?";
    }
    else {
      responseText = "That's an interesting question! I am a simulated local AI currently programmed with Nithish's core professional data. For specific details on that topic, it's best to reach out to him directly at nithi9905@gmail.com!";
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      role: 'assistant',
      content: responseText,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'An error occurred during your request.' },
      { status: 500 }
    );
  }
}
