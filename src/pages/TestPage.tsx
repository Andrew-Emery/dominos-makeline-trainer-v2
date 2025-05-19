import {
  Container,
  Typography,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import { useState } from 'react';

import { trainingData } from '../data/trainingData';

const CATEGORIES = [
  { key: 'crust-codes', label: 'Crust Codes' },
  { key: 'ingredient-codes', label: 'Ingredient Codes' },
  { key: 'portion-codes', label: 'Portion Codes' },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]['key'];

type SelectedState = Record<CategoryKey, boolean>;

type QuizState = {
  question: string;
  options: string[];
  answer: string;
  category: CategoryKey;
  prompt: string;
};

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomOptions<T>(arr: T[], count: number, exclude: T): T[] {
  const filtered = arr.filter((item) => item !== exclude);
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getAllPossibleQuestions(selected: SelectedState): {
  category: CategoryKey;
  question: string;
  answer: string;
  prompt: string;
  options: string[];
}[] {
  const result: {
    category: CategoryKey;
    question: string;
    answer: string;
    prompt: string;
    options: string[];
  }[] = [];

  if (selected['crust-codes']) {
    const items = trainingData['crust-codes'];
    for (const item of items) {
      const answer = item.name;
      const prompt = `What does the crust code "${item.code}" mean?`;
      const incorrect = getRandomOptions(
        items.map((i) => i.name),
        3,
        answer,
      );
      const options = [answer, ...incorrect].sort(() => Math.random() - 0.5);
      result.push({ category: 'crust-codes', question: item.code, answer, prompt, options });
    }
  }

  if (selected['ingredient-codes']) {
    const items = trainingData['ingredient-codes'];
    for (const item of items) {
      const answer = item.name;
      const prompt = `What ingredient does the code "${item.code}" represent?`;
      const incorrect = getRandomOptions(
        items.map((i) => i.name),
        3,
        answer,
      );
      const options = [answer, ...incorrect].sort(() => Math.random() - 0.5);
      result.push({ category: 'ingredient-codes', question: item.code, answer, prompt, options });
    }
  }

  if (selected['portion-codes']) {
    const items = trainingData['portion-codes'];
    for (const item of items) {
      const answer = item.name;
      const prompt = `What does the portion code "${item.code}" mean?`;
      const incorrect = getRandomOptions(
        items.map((i) => i.name),
        3,
        answer,
      );
      const options = [answer, ...incorrect].sort(() => Math.random() - 0.5);
      result.push({ category: 'portion-codes', question: item.code, answer, prompt, options });
    }
  }

  return result;
}

const TestPage = () => {
  const [selected, setSelected] = useState<SelectedState>({
    'crust-codes': true,
    'ingredient-codes': true,
    'portion-codes': true,
  });
  const [quiz, setQuiz] = useState<QuizState | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [asked, setAsked] = useState<Set<string>>(new Set());
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [completed, setCompleted] = useState(false);
  const [testInProgress, setTestInProgress] = useState(false);

  const getQuestionKey = (q: { category: CategoryKey; question: string }) =>
    `${q.category}:${q.question}`;

  const startTest = () => {
    setScore({ correct: 0, total: 0 });
    setAsked(new Set());
    setCompleted(false);
    setTestInProgress(true);
    nextQuestion();
  };

  const nextQuestion = () => {
    const allQuestions = getAllPossibleQuestions(selected);
    const available = allQuestions.filter((q) => !asked.has(getQuestionKey(q)));
    if (available.length === 0) {
      setQuiz(null);
      setCompleted(true);
      setTestInProgress(false);
      return;
    }
    const q = getRandom(available);
    setQuiz({
      question: q.question,
      options: q.options,
      answer: q.answer,
      category: q.category,
      prompt: q.prompt,
    });
    setSelectedOption(null);
    setShowFeedback(false);
    setAsked((prev) => new Set(prev).add(getQuestionKey(q)));
  };

  const handleOptionClick = (option: string) => {
    if (!showFeedback && quiz) {
      setSelectedOption(option);
      setShowFeedback(true);
      setScore((prev) => ({
        correct: prev.correct + (option === quiz.answer ? 1 : 0),
        total: prev.total + 1,
      }));
    }
  };

  const handleReset = () => {
    setScore({ correct: 0, total: 0 });
    setAsked(new Set());
    setCompleted(false);
    setQuiz(null);
    setSelectedOption(null);
    setShowFeedback(false);
    setTestInProgress(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Test Yourself
        </Typography>
        <Typography variant="body1">
          Choose one or more code categories and test your knowledge!
        </Typography>
      </Box>

      {!testInProgress && !completed && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <ToggleButtonGroup
            color="primary"
            value={Object.entries(selected)
              .filter(([, value]) => value)
              .map(([key]) => key)}
            exclusive={false}
            onChange={(_, value) => {
              const newSelected = { ...selected };
              Object.keys(newSelected).forEach((key) => {
                newSelected[key as CategoryKey] = value.includes(key);
              });
              setSelected(newSelected);
            }}
            sx={{ mb: 2 }}
            aria-label="Choose code categories"
          >
            {CATEGORIES.map((cat) => (
              <ToggleButton key={cat.key} value={cat.key} aria-label={cat.label}>
                {cat.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={startTest}
            disabled={Object.values(selected).every((v) => !v)}
          >
            Start Test
          </Button>
        </Box>
      )}

      {testInProgress && quiz && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            {quiz.prompt}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {quiz.options.map((option) => (
              <Card
                key={option}
                sx={{
                  cursor: showFeedback ? 'default' : 'pointer',
                  bgcolor: showFeedback
                    ? option === quiz.answer
                      ? 'success.light'
                      : option === selectedOption
                        ? 'error.main'
                        : 'background.paper'
                    : 'background.paper',
                  '&:hover': {
                    bgcolor: showFeedback ? undefined : 'action.hover',
                  },
                }}
                onClick={() => handleOptionClick(option)}
              >
                <CardContent>
                  <Typography>{option}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Box
            sx={{ mt: 3, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 2 }}
          >
            {showFeedback && (
              <Button variant="contained" color="primary" onClick={nextQuestion} sx={{ mt: 2 }}>
                Next Question
              </Button>
            )}
            <Button variant="outlined" color="error" onClick={handleReset} sx={{ mt: 2 }}>
              Stop Test
            </Button>
          </Box>
        </Paper>
      )}

      {completed && (
        <Paper sx={{ p: 3, mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Test Completed!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your score: {score.correct} out of {score.total} correct
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            ({Math.round((score.correct / score.total) * 100)}%)
          </Typography>
          <Button variant="contained" color="primary" onClick={handleReset} sx={{ mt: 2 }}>
            Start New Test
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default TestPage;
