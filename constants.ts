import { Section } from './types';

export const quizQuestions: Section[] = [
  {
    title: "Welcome & Ease In",
    questions: [
      { id: "q1", text: "I'm on a journey of growth as a leader, and I'm curious to understand myself more deeply." },
      { id: "q2", text: "I'm willing to be honest with myself about where I am right now—my challenges, my patterns, and what I want to change." },
      { id: "q3", text: "I'm interested in understanding myself better—how I think, how I respond to situations, and what drives my choices." },
      { id: "q4", text: "I sense that something could shift for me—in how I lead, how I show up, or how I feel about myself—and I'm open to exploring what that might be." }
    ]
  },
  {
    title: "Gentle Awareness & Presence",
    questions: [
      { id: "q5", text: "I notice the voice in my head—the one that comments on what I'm doing, what I should be doing, or what others might think. Sometimes I'm aware of it, sometimes I'm not." },
      { id: "q6", text: "When something unexpected happens, I sometimes react quickly and sometimes pause to think about how I want to respond. It depends on the situation." },
      { id: "q7", text: "When I'm under pressure, I'd like to feel calm and access my clearest thinking. Sometimes I do, and sometimes I get caught in stress or emotion." },
      { id: "q8", text: "I've noticed patterns in how I respond to certain situations—maybe how I handle conflict, or what tends to trigger doubt or stress for me." },
      { id: "q9", text: "Sometimes I notice when my actions don't match my values—like when I say yes to something that doesn't feel right, or when I'm not being fully myself." },
      { id: "q10", text: "In my important relationships, I'd like to be fully present and listening. Sometimes I am, and sometimes my mind is elsewhere or I'm thinking about what to say next." }
    ]
  },
  {
    title: "Emotional Grounding",
    questions: [
      { id: "q11", text: "When I get triggered or upset, I sometimes can calm myself down and think clearly. Other times, my thoughts spiral and it takes a while to access my clearer thinking." },
      { id: "q12", text: "I'm becoming more aware of how stress shows up in my body—maybe tension, racing thoughts, or a tight chest. I'm learning what helps me calm down." },
      { id: "q13", text: "In high-stakes situations, I'd like to feel confident and grounded. Sometimes I do, and sometimes I feel uncertain or anxious." },
      { id: "q14", text: "I sometimes experience self-doubt or wonder if I'm \"enough,\" especially when I'm stepping into something new or being more visible." },
      { id: "q15", text: "I'm learning to name what I'm feeling in the moment, and I'm discovering what my emotions are telling me about what matters to me." },
      { id: "q16", text: "When I experience a setback, I eventually bounce back and learn from it. Sometimes it takes a while, and sometimes I get stuck for a bit." }
    ]
  }
];

export const totalQuestions = quizQuestions.reduce((acc, section) => acc + section.questions.length, 0);

export const answerOptions = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];