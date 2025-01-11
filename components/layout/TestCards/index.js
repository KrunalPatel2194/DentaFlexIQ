import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SolutionView from './solutionCards';


const sampleQuestions = [
  {
    id: 1,
    question: "A patient with pain in the upper right molar area is found to have a carious lesion that extends to the pulp. What is the most appropriate initial treatment?",
    options: [
      "A. Extraction of the tooth",
      "B. Root canal treatment",
      "C. Temporary filling",
      "D. Prescribe antibiotics"
    ],
    correctAnswer: "B. Root canal treatment",
    category: "Root Canal",
    explanation: "Root canal treatment is necessary when decay has reached the pulp, causing irreversible damage. This preserves the natural tooth while addressing the infection and pain."
  },
  {
    id: 2,
    question: "Which of the following is most commonly associated with acute pulpitis?",
    options: [
      "A. Spontaneous pain",
      "B. Pain on percussion",
      "C. Tooth mobility",
      "D. Gingival swelling"
    ],
    correctAnswer: "A. Spontaneous pain",
    category: "Root Canal",
    explanation: "Acute pulpitis typically presents with spontaneous pain as the primary symptom due to inflammation of the pulp tissue."
  },
  // Add more questions with categories and explanations
];

const TestModule = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewList, setReviewList] = useState([]);
  const [showReviewSummary, setShowReviewSummary] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalQuestions = sampleQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  const calculateResults = () => {
    let score = 0;
    const userAnswersList = [];
    const correctAnswersList = [];
    const explanationsList = [];
    const categoryScores = {};
    const categoryCount = {};

    sampleQuestions.forEach((question, index) => {
      const userAnswer = answers[index + 1] || "Not answered";
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) score++;
      
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = 0;
        categoryCount[question.category] = 0;
      }
      categoryCount[question.category]++;
      if (isCorrect) categoryScores[question.category]++;

      userAnswersList.push(userAnswer);
      correctAnswersList.push(question.correctAnswer);
      explanationsList.push({
        question: question.question,
        explanation: question.explanation
      });
    });

    const categoryProgress = Object.keys(categoryScores).map(category => ({
      category,
      score: (categoryScores[category] / categoryCount[category]) * 100
    }));

    return {
      score,
      totalQuestions,
      categoryProgress,
      userAnswers: userAnswersList,
      correctAnswers: correctAnswersList,
      explanations: explanationsList
    };
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const toggleReview = (questionId) => {
    setReviewList(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      }
      return [...prev, questionId];
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      if (showReviewSummary) {
        setIsSubmitted(true);
      } else {
        setShowReviewSummary(true);
      }
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handlePageSelect = (pageNumber) => {
    setCurrentQuestion(pageNumber - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        <Pressable 
          style={[styles.pageButton, styles.navButton]} 
          onPress={() => setCurrentQuestion(0)}
        >
          <Text style={styles.pageButtonText}>{'<<'}</Text>
        </Pressable>
        
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(page => (
          <Pressable
            key={page}
            style={[
              styles.pageButton,
              currentQuestion + 1 === page && styles.activePage,
              answers[page] && styles.answeredPage,
              reviewList.includes(page) && styles.reviewPage
            ]}
            onPress={() => handlePageSelect(page)}
          >
            <Text style={[
              styles.pageButtonText,
              (currentQuestion + 1 === page || reviewList.includes(page)) && styles.activePageText
            ]}>
              {page}
            </Text>
          </Pressable>
        ))}

        <Pressable 
          style={[styles.pageButton, styles.navButton]}
          onPress={() => setCurrentQuestion(totalQuestions - 1)}
        >
          <Text style={styles.pageButtonText}>{'>>'}</Text>
        </Pressable>
      </View>
    );
  };

  if (isSubmitted) {
    return <SolutionView {...calculateResults()} />;
  }

  return (
    <View style={styles.container}>
      {showReviewSummary ? (
        <View style={styles.container}>
          <Text style={styles.title}>Questions Marked for Review</Text>
          {reviewList.map(questionId => (
            <Pressable
              key={questionId}
              style={styles.reviewItem}
              onPress={() => {
                setShowReviewSummary(false);
                setCurrentQuestion(questionId - 1);
              }}
            >
              <Text style={styles.reviewText}>
                Question {questionId}: {sampleQuestions[questionId - 1].question}
              </Text>
            </Pressable>
          ))}
          <Pressable 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit Test</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {renderPagination()}
          
          <View style={styles.card}>
            <Text style={styles.questionText}>
              {sampleQuestions[currentQuestion].question}
            </Text>
            
            <View style={styles.options}>
              {sampleQuestions[currentQuestion].options.map((option, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.option,
                    answers[currentQuestion + 1] === option && styles.selectedOption
                  ]}
                  onPress={() => handleAnswerSelect(currentQuestion + 1, option)}
                >
                  <Text style={[
                    styles.optionText,
                    answers[currentQuestion + 1] === option && styles.selectedOptionText
                  ]}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.button, styles.prevButton]} 
              onPress={handlePrev}
            >
              <Text style={styles.buttonText}>Prev</Text>
            </Pressable>

            <Pressable 
              style={[styles.button, styles.reviewButton]}
              onPress={() => toggleReview(currentQuestion + 1)}
            >
              <Text style={styles.buttonText}>Review</Text>
            </Pressable>

            <Pressable 
              style={[styles.button, styles.nextButton]}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>
                {isLastQuestion ? (showReviewSummary ? 'Submit' : 'Review') : 'Next'}
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    maxWidth: 800,
    width: '100%',
    margin: 'auto',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  pageButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#003366',
    borderRadius: 4,
  },
  pageButtonText: {
    color: '#003366',
    fontSize: 16,
  },
  activePage: {
    backgroundColor: '#003366',
  },
  activePageText: {
    color: '#ffffff',
  },
  answeredPage: {
    backgroundColor: '#e6f3ff',
  },
  reviewPage: {
    backgroundColor: '#ffd700',
  },
  navButton: {
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 24,
    lineHeight: 26,
  },
  options: {
    gap: 12,
  },
  option: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  selectedOption: {
    borderColor: '#003366',
    backgroundColor: '#e6f3ff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#003366',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: '#003366',
  },
  nextButton: {
    backgroundColor: '#003366',
  },
  reviewButton: {
    backgroundColor: '#ffd700',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  reviewItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f8f8f8',
  },
  reviewText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#003366',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TestModule;