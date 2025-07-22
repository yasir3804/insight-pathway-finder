import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle,
  Timer,
  BookOpen
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  type: "multiple-choice" | "likert-scale";
  category: string;
}

interface TestData {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  questions: Question[];
  instructions: string[];
}

const mockTestData: TestData = {
  id: "1",
  title: "Cognitive Ability Assessment",
  description: "Comprehensive assessment of your cognitive abilities including logical reasoning, problem-solving, and analytical thinking.",
  category: "Aptitude",
  duration: 60,
  instructions: [
    "Read each question carefully before selecting your answer",
    "You cannot go back to previous questions once submitted",
    "Take your time but be mindful of the time limit",
    "Select the best answer from the given options"
  ],
  questions: [
    {
      id: "q1",
      text: "If all roses are flowers and some flowers are red, which statement is definitely true?",
      options: [
        "All roses are red",
        "Some roses might be red",
        "No roses are red",
        "All flowers are roses"
      ],
      type: "multiple-choice",
      category: "logical-reasoning"
    },
    {
      id: "q2",
      text: "What comes next in the sequence: 2, 6, 18, 54, ?",
      options: [
        "108",
        "162",
        "216",
        "270"
      ],
      type: "multiple-choice",
      category: "numerical-reasoning"
    },
    {
      id: "q3",
      text: "I enjoy solving complex problems",
      options: [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree"
      ],
      type: "likert-scale",
      category: "personality"
    }
  ]
};

export const TestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(mockTestData.duration * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (testStarted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmitTest();
    }
  }, [testStarted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setTestStarted(true);
    toast({
      title: "Test Started",
      description: "Good luck! Remember to read each question carefully.",
    });
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [mockTestData.questions[currentQuestion].id]: value
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockTestData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Test Submitted Successfully",
      description: "Your results will be available shortly. Redirecting to results page...",
    });

    setTimeout(() => {
      navigate("/results");
    }, 2000);
  };

  const progress = ((currentQuestion + 1) / mockTestData.questions.length) * 100;
  const currentQuestionData = mockTestData.questions[currentQuestion];
  const answeredQuestions = Object.keys(answers).length;

  if (!testStarted) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/tests")}
          className="mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Tests
        </Button>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{mockTestData.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">
                    {mockTestData.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{mockTestData.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-sm">
                    <strong>{mockTestData.duration} minutes</strong> duration
                  </span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-sm">
                    <strong>{mockTestData.questions.length} questions</strong> total
                  </span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-sm">
                    <strong>No</strong> going back
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Instructions</h3>
                <ul className="space-y-2">
                  {mockTestData.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-primary/10 text-primary rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleStartTest} size="lg">
                  Start Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold">Submitting Your Test</h2>
              <p className="text-muted-foreground">
                Please wait while we process your responses...
              </p>
              <Progress value={75} className="w-64 mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header with timer and progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">{mockTestData.title}</h1>
          <Badge variant="outline">
            Question {currentQuestion + 1} of {mockTestData.questions.length}
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm">
            <Timer className="h-4 w-4 mr-1" />
            <span className={timeRemaining < 300 ? "text-red-600" : ""}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Question card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">
            {currentQuestionData.text}
          </CardTitle>
          {currentQuestionData.type === "likert-scale" && (
            <CardDescription>
              Rate your agreement with the following statement
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestionData.id] || ""}
            onValueChange={handleAnswerChange}
          >
            {currentQuestionData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          {answeredQuestions} of {mockTestData.questions.length} questions answered
        </div>

        {currentQuestion === mockTestData.questions.length - 1 ? (
          <Button
            onClick={handleSubmitTest}
            disabled={!answers[currentQuestionData.id]}
          >
            Submit Test
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestionData.id]}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};