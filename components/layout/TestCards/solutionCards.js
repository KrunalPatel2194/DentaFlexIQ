import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { CheckCircle, XCircle } from 'lucide-react';

const SolutionView = ({ 
  score, 
  totalQuestions,
  categoryProgress,
  userAnswers,
  correctAnswers,
  explanations 
}) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(1);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Score Summary */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreValue}>{percentage}%</Text>
            <Text style={styles.scoreText}>{score} / {totalQuestions}</Text>
          </View>

          {/* Category Progress */}
          <View style={styles.graphContainer}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={categoryProgress}
                layout="vertical"
                margin={{ top: 0, right: 0, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis 
                  type="category" 
                  dataKey="category" 
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Bar
                  dataKey="score"
                  fill="#0099ff"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </View>
        </View>
      </View>

      {/* Solutions Section */}
      <Text style={styles.solutionsTitle}>Solution</Text>
      
      <ScrollView style={styles.solutionsScrollView}>
        <View style={[styles.card, styles.solutionsCard]}>
          {userAnswers.map((userAnswer, index) => {
            const isCorrect = userAnswer === correctAnswers[index];
            
            return (
              <View key={index} style={styles.questionBlock}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionNumber}>Q{index + 1}</Text>
                  {isCorrect ? (
                    <CheckCircle size={20} color="#16a34a" style={{ marginLeft: 8 }} />
                  ) : (
                    <XCircle size={20} color="#dc2626" style={{ marginLeft: 8 }} />
                  )}
                </View>
                
                <Text style={styles.questionText}>
                  {explanations[index].question}
                </Text>

                <View style={styles.answerGrid}>
                  <View style={[
                    styles.answerBlock,
                    isCorrect ? styles.correctAnswer : styles.wrongAnswer
                  ]}>
                    <Text style={styles.answerLabel}>Your Answer</Text>
                    <Text style={styles.answerText}>{userAnswer}</Text>
                  </View>

                  {!isCorrect && (
                    <View style={[styles.answerBlock, styles.correctAnswer]}>
                      <Text style={styles.answerLabel}>Correct Answer</Text>
                      <Text style={styles.answerText}>{correctAnswers[index]}</Text>
                    </View>
                  )}
                </View>

                {!isCorrect && (
                  <Text style={styles.explanation}>
                    {explanations[index].explanation}
                  </Text>
                )}

                {index < userAnswers.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxWidth: 800,
    width: '100%',
    margin: 'auto',
    backgroundColor: '#f5f5f5',
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
  },
  scoreSection: {
    backgroundColor: '#ffffff',
  },
  scoreCard: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0099ff',
  },
  scoreText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  graphContainer: {
    height: 200,
    marginTop: 16,
  },
  solutionsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginTop: 24,
    marginBottom: 16,
  },
  solutionsScrollView: {
    flex: 1,
  },
  solutionsCard: {
    marginBottom: 20,
  },
  questionBlock: {
    position: 'relative',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
  },
  questionText: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 12,
    lineHeight: 20,
  },
  answerGrid: {
    gap: 8,
    marginBottom: 12,
  },
  answerBlock: {
    padding: 12,
    borderRadius: 6,
  },
  correctAnswer: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  wrongAnswer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  answerLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: 4,
  },
  answerText: {
    fontSize: 14,
    color: '#1f2937',
  },
  explanation: {
    fontSize: 13,
    color: '#6b7280',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
});

export default SolutionView;