import React, { useState } from 'react';
import {
  User, // For Step 1
  BookOpen, // For Step 2
  Settings, // For Step 3
  BarChart2, // For Step 4
  Microscope, // For Step 5
  ShieldCheck, // For Step 6
  Edit3, // For Step 7
  FileText as IEPFileTextIcon, // For Step 8 (Present Levels)
  Target as GoalTargetIcon, // For Step 9 (Goal Proposal) & main page
  Handshake, // For Step 10
  Lightbulb, // For SMART tips
  Brain, // For hero button & old wizard
  Sparkles, // For hero button & old wizard
  Check,
  ArrowLeft,
  ArrowRight,
  Calendar, // Old wizard icon
  Plus,
  Save, // Old component icon, not used in wizard
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

// Interface for individual goals (remains from your original, studentName added)
interface Goal {
  id: number;
  studentName?: string; // Made optional for flexibility
  area: string;
  description: string;
  baseline: string;
  targetDate: string;
  status: 'draft' | 'active' | 'completed';
}

// Interface for defining each step in the wizard (from your original)
interface WizardStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// NEW/UPDATED WizardData Interface for all 10 steps
interface WizardData {
  // Step 1: Student Demographics
  studentName: string;
  currentGradeLevel: string;
  schoolName: string;
  primaryDisability: string;
  secondaryDisability: string;
  studentInterestsGeneralInfo: string;
  englishLearnerStatus: 'ELL' | 'EO' | 'RFEP' | '';

  // Step 2: Previous IEP Goals
  previousGoalDomain: string;
  previousGoalStandardId: string;
  previousGoalAnnualGoalText: string;
  previousGoalProgressStatus: 'met' | 'not_met' | 'partially_met' | 'minimal_progress' | 'objectives_met' | 'not_annual_goal' | '';
  previousGoalContinuedNeed: 'yes' | 'no' | '';
  showPreviousObjectives: boolean;
  previousObjective1Text: string;
  previousObjective1Status: 'met' | 'not_met' | 'partially_met' | '';
  previousObjective2Text: string;
  previousObjective2Status: 'met' | 'not_met' | 'partially_met' | '';
  previousObjective3Text: string;
  previousObjective3Status: 'met' | 'not_met' | 'partially_met' | '';

  // Step 3: Student Context & Supports
  selectedAreas: string[];
  strengthsAndGrowthData: {
    [area: string]: {
      strengths: string[];
      areasOfGrowth: string[];
      anecdotalStrengths: string;
      anecdotalGrowth: string;
    };
  };
  generalEducationPerformance: string;
  generalEducationTeacherInput: string;

  // Step 4: Existing Student Data Input
  formativeAssessmentType: 'NWEA' | 'SANDI' | 'Other' | '';
  formativeAssessmentOtherName: string;
  nweaReadingRit: string;
  nweaReadingPercentile: string;
  nweaReadingGrowth: string;
  nweaMathRit: string;
  nweaMathPercentile: string;
  nweaMathGrowth: string;
  sandiReadingScore: string;
  sandiReadingLevel: '1' | '2' | '3' | '';
  sandiWritingScore: string;
  sandiWritingLevel: '1' | '2' | '3' | '';
  sandiMathScore: string;
  sandiMathLevel: '1' | '2' | '3' | '';
  sandiCommunicationScore: string;
  sandiCommunicationLevel: '1' | '2' | '3' | '';
  statewideAssessmentType: 'CAASP' | 'CAA' | '';
  caaspMathScore: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | '';
  caaspELAScore: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | '';
  hasElpacScores: 'yes' | 'no' | '';
  elpacOverallScore: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | '';
  elpacOralLanguageScore: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | '';
  elpacWrittenLanguageScore: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | '';

  // Step 5: New Baseline Data Analysis
  recommendedAssessments: Array<{
    domain: string;
    standard: string;
    description: string;
    rationale: string;
  }>;
  baselineDataInputMethod: 'upload' | 'manual' | '';
  baselineAssessmentArea: 'math' | 'reading' | 'writing' | '';
  baselineAssessmentDomain: string;
  baselineResults: string;
  baselineAdditionalInfo: string;
  baselineAccommodations: string;

  // Step 6: Student Accommodations and Supports
  accommodations: string[];
  modifications: string[];
  behaviorNeeds: 'yes' | 'no' | '';
  behaviorSupports: string[];
  elSupports: string;

  // Step 7: Special Factors
  assistiveTechNeeded: 'yes' | 'no' | '';
  assistiveTechRationale: string;
  blindVisualImpairment: 'yes' | 'no' | '';
  deafHardOfHearing: 'yes' | 'no' | '';
  behaviorImpedingLearning: 'yes' | 'no' | '';
  behaviorInterventionsStrategies: string;

  // Step 8: Present Levels
  draftPresentLevels: string;

  // Step 9: Goal Proposal
  draftAnnualGoal: string;
  draftObjective1: string;
  draftObjective2: string;
  draftObjective3: string;

  // Step 10: Related Services
  relatedServiceType: 'SAI' | 'BIS' | 'Other' | '';
  relatedServiceOtherName: string;
  relatedServiceDuration: string;
  relatedServiceFrequency: 'weekly' | 'monthly' | 'daily' | '';
  relatedServiceDelivery: 'individual' | 'group' | '';
  relatedServiceLocation: string;
  relatedServiceComments: string;
  relatedServiceStartDate: string;
  relatedServiceEndDate: string;
}

const GoalWriting: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      studentName: 'Alex Chen',
      area: 'Reading Comprehension',
      description: 'Student will identify the main idea and three supporting details in grade-level text with 80% accuracy in 3 out of 4 trials.',
      baseline: 'Currently identifies main idea with 40% accuracy',
      targetDate: '2025-06-15',
      status: 'active',
    },
    {
      id: 2,
      studentName: 'Maria Rodriguez',
      area: 'Social Skills',
      description: 'Student will initiate appropriate peer interactions during unstructured activities at least 4 times per day for 4 consecutive weeks.',
      baseline: 'Currently initiates interactions 1-2 times per day',
      targetDate: '2025-05-30',
      status: 'active',
    },
  ]);

  const [showWizard, setShowWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // UPDATED useState for wizardData with ALL new fields
  const [wizardData, setWizardData] = useState<WizardData>({
    studentName: '',
    currentGradeLevel: 'K',
    schoolName: '',
    primaryDisability: '',
    secondaryDisability: '',
    studentInterestsGeneralInfo: '',
    englishLearnerStatus: '',
    previousGoalDomain: '',
    previousGoalStandardId: '',
    previousGoalAnnualGoalText: '',
    previousGoalProgressStatus: '',
    previousGoalContinuedNeed: '',
    showPreviousObjectives: false,
    previousObjective1Text: '',
    previousObjective1Status: '',
    previousObjective2Text: '',
    previousObjective2Status: '',
    previousObjective3Text: '',
    previousObjective3Status: '',
    selectedAreas: [],
    strengthsAndGrowthData: {},
    generalEducationPerformance: '',
    generalEducationTeacherInput: '',
    formativeAssessmentType: '',
    formativeAssessmentOtherName: '',
    nweaReadingRit: '',
    nweaReadingPercentile: '',
    nweaReadingGrowth: '',
    nweaMathRit: '',
    nweaMathPercentile: '',
    nweaMathGrowth: '',
    sandiReadingScore: '',
    sandiReadingLevel: '',
    sandiWritingScore: '',
    sandiWritingLevel: '',
    sandiMathScore: '',
    sandiMathLevel: '',
    sandiCommunicationScore: '',
    sandiCommunicationLevel: '',
    statewideAssessmentType: '',
    caaspMathScore: '',
    caaspELAScore: '',
    hasElpacScores: '',
    elpacOverallScore: '',
    elpacOralLanguageScore: '',
    elpacWrittenLanguageScore: '',
    recommendedAssessments: [],
    baselineDataInputMethod: '',
    baselineAssessmentArea: '',
    baselineAssessmentDomain: '',
    baselineResults: '',
    baselineAdditionalInfo: '',
    baselineAccommodations: '',
    accommodations: [],
    modifications: [],
    behaviorNeeds: '',
    behaviorSupports: [],
    elSupports: '',
    assistiveTechNeeded: '',
    assistiveTechRationale: '',
    blindVisualImpairment: '',
    deafHardOfHearing: '',
    behaviorImpedingLearning: '',
    behaviorInterventionsStrategies: '',
    draftPresentLevels: '',
    draftAnnualGoal: '',
    draftObjective1: '',
    draftObjective2: '',
    draftObjective3: '',
    relatedServiceType: '',
    relatedServiceOtherName: '',
    relatedServiceDuration: '',
    relatedServiceFrequency: '',
    relatedServiceDelivery: '',
    relatedServiceLocation: '',
    relatedServiceComments: '',
    relatedServiceStartDate: '',
    relatedServiceEndDate: '',
  });

  // UPDATED wizardSteps array for the new 10-step flow
  const wizardSteps: WizardStep[] = [
    { id: 0, title: 'Student Demographics', description: 'Basic information about the student.', icon: <User className="text-green" size={24} /> },
    { id: 1, title: 'Previous IEPs', description: 'Review progress on prior goals.', icon: <BookOpen className="text-green" size={24} /> },
    { id: 2, title: 'Qualitative Student Data', description: 'Gather qualitative information.', icon: <Settings className="text-green" size={24} /> },
    { id: 3, title: 'Quantitative Student Data', description: 'Input data from various assessments.', icon: <BarChart2 className="text-green" size={24} /> },
    { id: 4, title: 'Baseline Assessments & Data Analysis', description: 'AI recommendations and baseline data input.', icon: <Microscope className="text-green" size={24} /> },
    { id: 5, title: 'Student Accommodations and Supports', description: 'Define supports for the student.', icon: <ShieldCheck className="text-green" size={24} /> },
    { id: 6, title: 'Special Factors', description: 'Address specific considerations.', icon: <Edit3 className="text-green" size={24} /> },
    { id: 7, title: 'Present Levels', description: 'AI will help synthesize data into a PLOP.', icon: <IEPFileTextIcon className="text-green" size={24} /> },
    { id: 8, title: 'Goal Proposal', description: 'AI will recommend goals.', icon: <GoalTargetIcon className="text-green" size={24} /> },
    { id: 9, title: 'Related Services', description: 'Document related services.', icon: <Handshake className="text-green" size={24} /> },
  ];

  const gradeOptions = ['K', '1', '2', '3', '4', '5']; // Moved here for renderWizardStep

  // Domain areas by subject and grade level
  const getDomainAreas = (area: string, gradeLevel: string) => {
    const domains: { [key: string]: { [grade: string]: string[] } } = {
      'Math': {
        'K': ['Counting & Cardinality', 'Geometry', 'Measurement & Data', 'Numbers & Operations in Base Ten', 'Operations & Algebraic Thinking'],
        '1': ['Geometry', 'Measurement & Data', 'Numbers & Operations in Base Ten', 'Operations & Algebraic Thinking'],
        '2': ['Geometry', 'Measurement & Data', 'Numbers & Operations in Base Ten', 'Operations & Algebraic Thinking'],
        '3': ['Geometry', 'Measurement & Data', 'Numbers & Operations in Base Ten', 'Operations & Algebraic Thinking', 'Numbers & Operations - Fractions'],
        '4': ['Geometry', 'Measurement & Data', 'Numbers & Operations in Base Ten', 'Operations & Algebraic Thinking', 'Numbers & Operations - Fractions'],
        '5': ['Geometry', 'Measurement & Data', 'Numbers & Operations in Base Ten', 'Operations & Algebraic Thinking', 'Numbers & Operations - Fractions'],
      },
      'Reading': {
        'K': ['Phonological Awareness', 'Phonics & Word Recognition', 'Fluency', 'Comprehension', 'Vocabulary'],
        '1': ['Phonics & Word Recognition', 'Fluency', 'Comprehension', 'Vocabulary'],
        '2': ['Phonics & Word Recognition', 'Fluency', 'Comprehension', 'Vocabulary'],
        '3': ['Phonics & Word Recognition', 'Fluency', 'Comprehension', 'Vocabulary'],
        '4': ['Phonics & Word Recognition', 'Fluency', 'Comprehension', 'Vocabulary'],
        '5': ['Phonics & Word Recognition', 'Fluency', 'Comprehension', 'Vocabulary'],
      },
      'Writing': {
        'K': ['Text Types & Purposes', 'Production & Distribution', 'Research to Build Knowledge', 'Language Conventions'],
        '1': ['Text Types & Purposes', 'Production & Distribution', 'Research to Build Knowledge', 'Language Conventions'],
        '2': ['Text Types & Purposes', 'Production & Distribution', 'Research to Build Knowledge', 'Language Conventions'],
        '3': ['Text Types & Purposes', 'Production & Distribution', 'Research to Build Knowledge', 'Language Conventions'],
        '4': ['Text Types & Purposes', 'Production & Distribution', 'Research to Build Knowledge', 'Language Conventions'],
        '5': ['Text Types & Purposes', 'Production & Distribution', 'Research to Build Knowledge', 'Language Conventions'],
      }
    };
    return domains[area]?.[gradeLevel] || [];
  };

  // Generate AI recommendations based on previous steps
  const generateAssessmentRecommendations = () => {
    const recommendations: Array<{
      domain: string;
      standard: string;
      description: string;
      rationale: string;
    }> = [];

    // Check if previous goal domain is an area of continued need
    if (wizardData.previousGoalDomain && wizardData.previousGoalContinuedNeed === 'yes') {
      // Check if it's also identified as an area of growth in Step 3
      const hasAreaOfGrowth = Object.values(wizardData.strengthsAndGrowthData).some(data => 
        data.areasOfGrowth.includes(wizardData.previousGoalDomain)
      );

      if (hasAreaOfGrowth || wizardData.previousGoalProgressStatus === 'not_met' || wizardData.previousGoalProgressStatus === 'minimal_progress') {
        recommendations.push({
          domain: wizardData.previousGoalDomain,
          standard: getRecommendedStandard(wizardData.previousGoalDomain, wizardData.currentGradeLevel),
          description: `Baseline assessment for ${wizardData.previousGoalDomain}`,
          rationale: `Previous goal in this domain shows continued need. Student progress was ${wizardData.previousGoalProgressStatus.replace('_', ' ')}.`
        });
      }
    }

    // Add recommendations based on areas of growth identified in Step 3
    Object.entries(wizardData.strengthsAndGrowthData).forEach(([area, data]) => {
      if (data.areasOfGrowth.length > 0) {
        data.areasOfGrowth.forEach(domain => {
          // Avoid duplicates
          if (!recommendations.some(rec => rec.domain === domain)) {
            recommendations.push({
              domain: domain,
              standard: getRecommendedStandard(domain, wizardData.currentGradeLevel),
              description: `Baseline assessment for ${domain}`,
              rationale: `Identified as area of growth in qualitative data analysis.`
            });
          }
        });
      }
    });

    return recommendations;
  };

  // Helper function to get recommended standard (simplified for demo)
  const getRecommendedStandard = (domain: string, gradeLevel: string): string => {
    const standardMappings: { [key: string]: { [grade: string]: string } } = {
      'Operations & Algebraic Thinking': {
        'K': 'K.OA.A.2 - Addition and subtraction within 10',
        '1': '1.OA.A.1 - Addition and subtraction within 20',
        '2': '2.OA.A.1 - Addition and subtraction within 100',
        '3': '3.OA.A.3 - Multiplication and division within 100',
        '4': '4.OA.A.1 - Multiplicative comparisons',
        '5': '5.OA.A.1 - Numerical expressions'
      },
      'Counting & Cardinality': {
        'K': 'K.CC.A.1 - Count to 100 by ones and tens'
      },
      'Numbers & Operations in Base Ten': {
        '1': '1.NBT.A.1 - Count to 120',
        '2': '2.NBT.A.1 - Understand place value',
        '3': '3.NBT.A.1 - Use place value understanding',
        '4': '4.NBT.A.1 - Recognize place value',
        '5': '5.NBT.A.1 - Recognize place value patterns'
      }
    };
    
    return standardMappings[domain]?.[gradeLevel] || `${gradeLevel}.${domain.substring(0, 3).toUpperCase()}.A.1 - Assessment recommended`;
  };

  // UPDATED handleStartWizard to reset ALL new fields
  const handleStartWizard = () => {
    setShowWizard(true);
    setCurrentStep(0);
    setWizardData({
      studentName: '', currentGradeLevel: 'K', schoolName: '', primaryDisability: '', secondaryDisability: '', studentInterestsGeneralInfo: '', englishLearnerStatus: '',
      previousGoalDomain: '', previousGoalStandardId: '', previousGoalAnnualGoalText: '', previousGoalProgressStatus: '', previousGoalContinuedNeed: '', showPreviousObjectives: false, previousObjective1Text: '', previousObjective1Status: '', previousObjective2Text: '', previousObjective2Status: '', previousObjective3Text: '', previousObjective3Status: '',
      selectedAreas: [], strengthsAndGrowthData: {}, generalEducationPerformance: '', generalEducationTeacherInput: '',
      formativeAssessmentType: '', formativeAssessmentOtherName: '', nweaReadingRit: '', nweaReadingPercentile: '', nweaReadingGrowth: '', nweaMathRit: '', nweaMathPercentile: '', nweaMathGrowth: '', sandiReadingScore: '', sandiReadingLevel: '', sandiWritingScore: '', sandiWritingLevel: '', sandiMathScore: '', sandiMathLevel: '', sandiCommunicationScore: '', sandiCommunicationLevel: '', statewideAssessmentType: '', caaspMathScore: '', caaspELAScore: '', hasElpacScores: '', elpacOverallScore: '', elpacOralLanguageScore: '', elpacWrittenLanguageScore: '',
      recommendedAssessments: [], baselineDataInputMethod: '', baselineAssessmentArea: '', baselineAssessmentDomain: '', baselineResults: '', baselineAdditionalInfo: '', baselineAccommodations: '',
      accommodations: [], modifications: [], behaviorNeeds: '', behaviorSupports: [], elSupports: '',
      assistiveTechNeeded: '', assistiveTechRationale: '', blindVisualImpairment: '', deafHardOfHearing: '', behaviorImpedingLearning: '', behaviorInterventionsStrategies: '',
      draftPresentLevels: '', draftAnnualGoal: '', draftObjective1: '', draftObjective2: '', draftObjective3: '',
      relatedServiceType: '', relatedServiceOtherName: '', relatedServiceDuration: '', relatedServiceFrequency: '', relatedServiceDelivery: '', relatedServiceLocation: '', relatedServiceComments: '', relatedServiceStartDate: '', relatedServiceEndDate: '',
    });
  };

  const handleNextStep = () => {
    // Generate recommendations when entering Step 5
    if (currentStep === 3) { // Moving from Step 4 to Step 5
      const recommendations = generateAssessmentRecommendations();
      setWizardData(prev => ({ ...prev, recommendedAssessments: recommendations }));
    }
    
    // Ensure we don't go beyond the last defined step
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // handleGenerateGoal will need significant updates later to use new wizardData
  const handleGenerateGoal = () => {
    console.log("Generating goal with data:", wizardData); // Log new data
    // This is just a placeholder - real goal generation will be much more complex
    const newGoal: Goal = {
      id: goals.length ? Math.max(...goals.map(g => g.id)) + 1 : 1,
      studentName: wizardData.studentName, // Use new studentName
      area: wizardData.previousGoalDomain || 'Math', // Example: use a relevant field
      description: `AI-drafted goal for ${wizardData.studentName}. Focus: ${wizardData.previousGoalDomain || 'General Math Skills'}. (Details to be generated in Step 9)`,
      baseline: wizardData.baselineResults || 'Baseline to be determined from Step 5 data.',
      targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      status: 'draft',
    };
    setGoals([...goals, newGoal]);
    setShowWizard(false);
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'active': return 'bg-green text-white';
      case 'draft': return 'bg-yellow-400 text-black'; // Adjusted yellow for better contrast
      case 'completed': return 'bg-blue-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const renderWizardStep = () => {
    // Ensure currentStep is valid for the new wizardSteps array
    if (!wizardSteps[currentStep]) {
        console.error("Invalid currentStep:", currentStep, "wizardSteps length:", wizardSteps.length);
        return <div>Error: Invalid wizard step. Please restart the wizard.</div>;
    }

    switch (currentStep) {
      case 0: // Step 1: Student Demographics
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium mb-1 text-text-primary">
                Student Name:
              </label>
              <input
                type="text"
                id="studentName"
                value={wizardData.studentName}
                onChange={(e) => setWizardData({ ...wizardData, studentName: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                placeholder="Enter student's full name"
              />
            </div>
            <div>
              <label htmlFor="currentGradeLevel" className="block text-sm font-medium mb-1 text-text-primary">
                Current Grade Level:
              </label>
              <select
                id="currentGradeLevel"
                value={wizardData.currentGradeLevel}
                onChange={(e) => setWizardData({ ...wizardData, currentGradeLevel: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
              >
                {gradeOptions.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="schoolName" className="block text-sm font-medium mb-1 text-text-primary">
                School Name (optional):
              </label>
              <input
                type="text"
                id="schoolName"
                value={wizardData.schoolName}
                onChange={(e) => setWizardData({ ...wizardData, schoolName: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                placeholder="Enter school name"
              />
            </div>
            <div>
              <label htmlFor="primaryDisability" className="block text-sm font-medium mb-1 text-text-primary">
                Primary Disability:
              </label>
              <input
                type="text"
                id="primaryDisability"
                value={wizardData.primaryDisability}
                onChange={(e) => setWizardData({ ...wizardData, primaryDisability: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                placeholder="e.g., Autism, Specific Learning Disability"
              />
            </div>
            <div>
              <label htmlFor="secondaryDisability" className="block text-sm font-medium mb-1 text-text-primary">
                Secondary Disability (optional):
              </label>
              <input
                type="text"
                id="secondaryDisability"
                value={wizardData.secondaryDisability}
                onChange={(e) => setWizardData({ ...wizardData, secondaryDisability: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                placeholder="Enter secondary disability if applicable"
              />
            </div>
            <div>
              <label htmlFor="englishLearnerStatus" className="block text-sm font-medium mb-1 text-text-primary">
                English Learner Status:
              </label>
              <select
                id="englishLearnerStatus"
                value={wizardData.englishLearnerStatus}
                onChange={(e) => setWizardData({ ...wizardData, englishLearnerStatus: e.target.value as WizardData['englishLearnerStatus'] })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
              >
                <option value="">Select Status</option>
                <option value="ELL">English Language Learner (ELL)</option>
                <option value="EO">English Only (EO)</option>
                <option value="RFEP">Redesignated Fluent English Proficient (RFEP)</option>
              </select>
            </div>
            <div>
              <label htmlFor="studentInterestsGeneralInfo" className="block text-sm font-medium mb-1 text-text-primary">
                Student Interests and General Information:
              </label>
              <textarea
                id="studentInterestsGeneralInfo"
                value={wizardData.studentInterestsGeneralInfo}
                onChange={(e) => setWizardData({ ...wizardData, studentInterestsGeneralInfo: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                placeholder="Describe student's interests, hobbies, strengths, learning preferences..."
              />
            </div>
          </div>
        );

      case 1: // Step 2: Previous IEP Goals Review
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Domain Area Dropdown */}
              <div>
                <label htmlFor="previousGoalDomain" className="block text-sm font-medium mb-1 text-text-primary">
                  Domain Area of Previous Goal:
                </label>
                <select
                  id="previousGoalDomain"
                  value={wizardData.previousGoalDomain}
                  onChange={(e) => setWizardData({ ...wizardData, previousGoalDomain: e.target.value })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                >
                  <option value="">Select Domain Area</option>
                  <option value="Counting & Cardinality">Counting & Cardinality</option>
                  <option value="Operations & Algebraic Thinking">Operations & Algebraic Thinking</option>
                  <option value="Number & Operations in Base Ten">Number & Operations in Base Ten</option>
                  <option value="Number & Operations - Fractions">Number & Operations - Fractions</option>
                  <option value="Measurement & Data">Measurement & Data</option>
                  <option value="Geometry">Geometry</option>
                </select>
              </div>

              {/* Standard Alignment Dropdown */}
              <div>
                <label htmlFor="previousGoalStandardId" className="block text-sm font-medium mb-1 text-text-primary">
                  Grade Level Standard Alignment of Previous Goal:
                </label>
                <select
                  id="previousGoalStandardId"
                  value={wizardData.previousGoalStandardId}
                  onChange={(e) => setWizardData({ ...wizardData, previousGoalStandardId: e.target.value })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                  disabled={!wizardData.previousGoalDomain}
                >
                  <option value="">Select Standard (after choosing domain)</option>
                  {wizardData.previousGoalDomain === "Operations & Algebraic Thinking" && (
                    <>
                      <option value="K.OA.A.2">K.OA.A.2 - Solve addition and subtraction word problems...</option>
                      <option value="1.OA.A.1">1.OA.A.1 - Use addition and subtraction within 20...</option>
                    </>
                  )}
                </select>
                <p className="text-xs text-text-secondary mt-1">
                  Note: Select Domain Area first to see relevant standards. Full list will be populated from CCSS data.
                </p>
              </div>

              {/* Annual Goal Text Area */}
              <div>
                <label htmlFor="previousGoalAnnualGoalText" className="block text-sm font-medium mb-1 text-text-primary">
                  Previous IEP Annual Goal Text:
                </label>
                <textarea
                  id="previousGoalAnnualGoalText"
                  value={wizardData.previousGoalAnnualGoalText}
                  onChange={(e) => setWizardData({ ...wizardData, previousGoalAnnualGoalText: e.target.value })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-40"
                  placeholder="Copy and paste the student's previous annual IEP goal here..."
                />
              </div>

              {/* Progress Status and Continued Need Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="previousGoalProgressStatus" className="block text-sm font-medium mb-1 text-text-primary">
                    Progress Towards Previous Annual Goal:
                  </label>
                  <select
                    id="previousGoalProgressStatus"
                    value={wizardData.previousGoalProgressStatus}
                    onChange={(e) => setWizardData({ ...wizardData, previousGoalProgressStatus: e.target.value as WizardData['previousGoalProgressStatus'] })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                  >
                    <option value="">Select Progress Status</option>
                    <option value="met">Goal Met</option>
                    <option value="partially_met">Partially Met</option>
                    <option value="objectives_met">Objectives Met (but not annual goal)</option>
                    <option value="minimal_progress">Minimal Progress</option>
                    <option value="not_met">Goal Not Met</option>
                    <option value="not_annual_goal">Not an Annual Goal (e.g., short-term only)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="previousGoalContinuedNeed" className="block text-sm font-medium mb-1 text-text-primary">
                    Is this a Continued Area of Need?
                  </label>
                  <select
                    id="previousGoalContinuedNeed"
                    value={wizardData.previousGoalContinuedNeed}
                    onChange={(e) => setWizardData({ ...wizardData, previousGoalContinuedNeed: e.target.value as WizardData['previousGoalContinuedNeed'] })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                  >
                    <option value="">Select Yes or No</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              {/* Always Visible Short-Term Objectives Section */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-md font-semibold text-text-primary mb-4">
                  Previous Short-Term Objectives (Optional)
                </h4>
                <div className="space-y-6 p-4 border border-border rounded-lg bg-bg-primary">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="space-y-2 pb-4 border-b border-border last:border-b-0 last:pb-0">
                      <label htmlFor={`previousObjective${num}Text`} className="block text-sm font-medium text-text-primary">
                        Objective {num} Text:
                      </label>
                      <textarea
                        id={`previousObjective${num}Text`}
                        value={wizardData[`previousObjective${num}Text` as keyof WizardData] as string}
                        onChange={(e) => setWizardData({ ...wizardData, [`previousObjective${num}Text`]: e.target.value })}
                        className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
                        placeholder={`Enter text for Objective ${num}...`}
                      />
                      <label htmlFor={`previousObjective${num}Status`} className="block text-sm font-medium text-text-primary pt-1">
                        Objective {num} Status:
                      </label>
                      <select
                        id={`previousObjective${num}Status`}
                        value={wizardData[`previousObjective${num}Status` as keyof WizardData] as WizardData['previousObjective1Status']}
                        onChange={(e) => setWizardData({ ...wizardData, [`previousObjective${num}Status`]: e.target.value as WizardData['previousObjective1Status'] })}
                        className="w-full md:w-1/2 p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                      >
                        <option value="">Select Status</option>
                        <option value="met">Met</option>
                        <option value="partially_met">Partially Met</option>
                        <option value="not_met">Not Met</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Step 3: Qualitative Student Data
        return (
          <div className="space-y-8">
            {/* Student Strengths and Areas of Growth Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Student Strengths and Areas of Growth</h3>
              
              {/* Area Selection Dropdown */}
              <div className="mb-6">
                <label htmlFor="areaSelection" className="block text-sm font-medium mb-2 text-text-primary">
                  Select Academic/Functional Areas to Assess:
                </label>
                <select
                  id="areaSelection"
                  onChange={(e) => {
                    const selectedArea = e.target.value;
                    if (selectedArea && !wizardData.selectedAreas.includes(selectedArea)) {
                      const newSelectedAreas = [...wizardData.selectedAreas, selectedArea];
                      const newStrengthsAndGrowthData = {
                        ...wizardData.strengthsAndGrowthData,
                        [selectedArea]: {
                          strengths: [],
                          areasOfGrowth: [],
                          anecdotalStrengths: '',
                          anecdotalGrowth: ''
                        }
                      };
                      setWizardData({
                        ...wizardData,
                        selectedAreas: newSelectedAreas,
                        strengthsAndGrowthData: newStrengthsAndGrowthData
                      });
                    }
                    e.target.value = ''; // Reset dropdown
                  }}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                >
                  <option value="">Choose an area to add...</option>
                  <option value="Reading">Reading</option>
                  <option value="Writing">Writing</option>
                  <option value="Math">Math</option>
                  <option value="Social Emotional/Behavioral">Social Emotional/Behavioral</option>
                  <option value="Vocational">Vocational</option>
                  <option value="Adaptive/Daily Living Skills">Adaptive/Daily Living Skills</option>
                  <option value="Communication">Communication</option>
                  <option value="Fine/Gross Motor">Fine/Gross Motor</option>
                </select>
              </div>

              {/* Display Selected Areas */}
              {wizardData.selectedAreas.map((area) => {
                const domainAreas = getDomainAreas(area, wizardData.currentGradeLevel);
                const areaData = wizardData.strengthsAndGrowthData[area] || { strengths: [], areasOfGrowth: [], anecdotalStrengths: '', anecdotalGrowth: '' };

                return (
                  <div key={area} className="mb-8 p-6 border border-border rounded-lg bg-bg-primary">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-semibold text-text-primary">{area}</h4>
                      <button
                        onClick={() => {
                          const newSelectedAreas = wizardData.selectedAreas.filter(a => a !== area);
                          const newStrengthsAndGrowthData = { ...wizardData.strengthsAndGrowthData };
                          delete newStrengthsAndGrowthData[area];
                          setWizardData({
                            ...wizardData,
                            selectedAreas: newSelectedAreas,
                            strengthsAndGrowthData: newStrengthsAndGrowthData
                          });
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Domain Area Buttons */}
                    {domainAreas.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2 text-text-primary">
                          Click once for <span className="text-green font-semibold">Strength</span>, twice for <span className="text-orange-500 font-semibold">Area of Growth</span>:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {domainAreas.map((domain) => {
                            const isStrength = areaData.strengths.includes(domain);
                            const isGrowth = areaData.areasOfGrowth.includes(domain);
                            
                            return (
                              <button
                                key={domain}
                                onClick={() => {
                                  const newAreaData = { ...areaData };
                                  
                                  if (!isStrength && !isGrowth) {
                                    // First click - add to strengths
                                    newAreaData.strengths = [...newAreaData.strengths, domain];
                                  } else if (isStrength && !isGrowth) {
                                    // Second click - move to areas of growth
                                    newAreaData.strengths = newAreaData.strengths.filter(s => s !== domain);
                                    newAreaData.areasOfGrowth = [...newAreaData.areasOfGrowth, domain];
                                  } else if (isGrowth) {
                                    // Third click - remove completely
                                    newAreaData.areasOfGrowth = newAreaData.areasOfGrowth.filter(g => g !== domain);
                                  }
                                  
                                  setWizardData({
                                    ...wizardData,
                                    strengthsAndGrowthData: {
                                      ...wizardData.strengthsAndGrowthData,
                                      [area]: newAreaData
                                    }
                                  });
                                }}
                                className={`p-2 text-xs rounded-md border transition-all ${
                                  isStrength ? 'bg-green text-white border-green' :
                                  isGrowth ? 'bg-orange-500 text-white border-orange-500' :
                                  'bg-bg-secondary border-border hover:border-green'
                                }`}
                              >
                                {domain}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Anecdotal Data Text Areas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-text-primary">
                          Anecdotal Data - Strengths in {area}:
                        </label>
                        <textarea
                          value={areaData.anecdotalStrengths}
                          onChange={(e) => {
                            const newAreaData = { ...areaData, anecdotalStrengths: e.target.value };
                            setWizardData({
                              ...wizardData,
                              strengthsAndGrowthData: {
                                ...wizardData.strengthsAndGrowthData,
                                [area]: newAreaData
                              }
                            });
                          }}
                          className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                          placeholder={`e.g., ${area === 'Math' ? 'Shows strong number sense, can count to 100, understands basic addition concepts' : area === 'Reading' ? 'Recognizes all letters, knows letter sounds, enjoys being read to' : 'Demonstrates good understanding of concepts, participates actively'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-text-primary">
                          Anecdotal Data - Areas of Growth in {area}:
                        </label>
                        <textarea
                          value={areaData.anecdotalGrowth}
                          onChange={(e) => {
                            const newAreaData = { ...areaData, anecdotalGrowth: e.target.value };
                            setWizardData({
                              ...wizardData,
                              strengthsAndGrowthData: {
                                ...wizardData.strengthsAndGrowthData,
                                [area]: newAreaData
                              }
                            });
                          }}
                          className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                          placeholder={`e.g., ${area === 'Math' ? 'Needs support with word problems, struggles with subtraction, requires manipulatives' : area === 'Reading' ? 'Difficulty with blending sounds, needs support with comprehension, limited sight word vocabulary' : 'Requires additional support and practice in this area'}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Student Performance in General Education */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Student Performance in General Education</h3>
              <textarea
                value={wizardData.generalEducationPerformance}
                onChange={(e) => setWizardData({ ...wizardData, generalEducationPerformance: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                placeholder="e.g., Student participates in general education math and reading instruction with support. Requires frequent breaks and visual supports to maintain attention. Shows progress when material is presented at a slower pace with additional practice opportunities."
              />
            </div>

            {/* General Education Teacher Input */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">General Education Teacher Input</h3>
              <textarea
                value={wizardData.generalEducationTeacherInput}
                onChange={(e) => setWizardData({ ...wizardData, generalEducationTeacherInput: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                placeholder="e.g., Teacher reports that student works well in small groups, benefits from peer support, and shows improvement when given extra time to complete assignments. Recommends continued use of visual schedules and frequent check-ins for understanding."
              />
            </div>
          </div>
        );

      case 3: // Step 4: Quantitative Student Data
        return (
          <div className="space-y-8">
            {/* Formative Assessment Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Formative Assessment Data</h3>
              
              {/* Assessment Type Selection */}
              <div className="mb-6">
                <label htmlFor="formativeAssessmentType" className="block text-sm font-medium mb-2 text-text-primary">
                  Select Formative Assessment:
                </label>
                <select
                  id="formativeAssessmentType"
                  value={wizardData.formativeAssessmentType}
                  onChange={(e) => setWizardData({ ...wizardData, formativeAssessmentType: e.target.value as WizardData['formativeAssessmentType'] })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                >
                  <option value="">Select Assessment Type</option>
                  <option value="NWEA">NWEA</option>
                  <option value="SANDI">SANDI</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* NWEA Scores Section */}
              {wizardData.formativeAssessmentType === 'NWEA' && (
                <div className="p-4 border border-border rounded-lg bg-bg-primary">
                  <h4 className="font-semibold mb-4">NWEA Scores</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Reading */}
                    <div>
                      <h5 className="font-medium mb-3 text-green">Reading</h5>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">RIT Score:</label>
                          <input
                            type="number"
                            value={wizardData.nweaReadingRit}
                            onChange={(e) => setWizardData({ ...wizardData, nweaReadingRit: e.target.value })}
                            className="w-full p-2 border border-border rounded-md bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                            placeholder="e.g., 145"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">% Compared to Peers:</label>
                          <input
                            type="number"
                            value={wizardData.nweaReadingPercentile}
                            onChange={(e) => setWizardData({ ...wizardData, nweaReadingPercentile: e.target.value })}
                            className="w-full p-2 border border-border rounded-md bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                            placeholder="e.g., 25"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Growth %:</label>
                          <input
                            type="number"
                            value={wizardData.nweaReadingGrowth}
                            onChange={(e) => setWizardData({ ...wizardData, nweaReadingGrowth: e.target.value })}
                            className="w-full p-2 border border-border rounded-md bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                            placeholder="e.g., 45"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Math */}
                    <div>
                      <h5 className="font-medium mb-3 text-green">Math</h5>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">RIT Score:</label>
                          <input
                            type="number"
                            value={wizardData.nweaMathRit}
                            onChange={(e) => setWizardData({ ...wizardData, nweaMathRit: e.target.value })}
                            className="w-full p-2 border border-border rounded-md bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                            placeholder="e.g., 152"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">% Compared to Peers:</label>
                          <input
                            type="number"
                            value={wizardData.nweaMathPercentile}
                            onChange={(e) => setWizardData({ ...wizardData, nweaMathPercentile: e.target.value })}
                            className="w-full p-2 border border-border rounded-md bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                            placeholder="e.g., 30"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Growth %:</label>
                          <input
                            type="number"
                            value={wizardData.nweaMathGrowth}
                            onChange={(e) => setWizardData({ ...wizardData, nweaMathGrowth: e.target.value })}
                            className="w-full p-2 border border-border rounded-md bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                            placeholder="e.g., 50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SANDI Scores Section */}
              {wizardData.formativeAssessmentType === 'SANDI' && (
                <div className="p-4 border border-border rounded-lg bg-bg-primary">
                  <h4 className="font-semibold mb-4">SANDI Scores</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'Reading', scoreKey: 'sandiReadingScore', levelKey: 'sandiReadingLevel' },
                      { key: 'Writing', scoreKey: 'sandiWritingScore', levelKey: 'sandiWritingLevel' },
                      { key: 'Math', scoreKey: 'sandiMathScore', levelKey: 'sandiMathLevel' },
                      { key: 'Communication', scoreKey: 'sandiCommunicationScore', levelKey: 'sandiCommunicationLevel' }
                    ].map(({ key, scoreKey, levelKey }) => (
                      <div key={key} className="p-3 border border-border rounded-md">
                        <h5 className="font-medium mb-2">{key}</h5>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs font-medium mb-1">Score:</label>
                            <input
                              type="text"
                              value={wizardData[scoreKey as keyof WizardData] as string}
                              onChange={(e) => setWizardData({ ...wizardData, [scoreKey]: e.target.value })}
                              className="w-full p-2 border border-border rounded-md bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green text-sm"
                              placeholder="Enter score"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">Level:</label>
                            <select
                              value={wizardData[levelKey as keyof WizardData] as string}
                              onChange={(e) => setWizardData({ ...wizardData, [levelKey]: e.target.value })}
                              className="w-full p-2 border border-border rounded-md bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green text-sm"
                            >
                              <option value="">Select Level</option>
                              <option value="1">Level 1</option>
                              <option value="2">Level 2</option>
                              <option value="3">Level 3</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Assessment */}
              {wizardData.formativeAssessmentType === 'Other' && (
                <div className="p-4 border border-border rounded-lg bg-bg-primary">
                  <label className="block text-sm font-medium mb-2">Assessment Name:</label>
                  <input
                    type="text"
                    value={wizardData.formativeAssessmentOtherName}
                    onChange={(e) => setWizardData({ ...wizardData, formativeAssessmentOtherName: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                    placeholder="Enter assessment name"
                  />
                </div>
              )}
            </div>

            {/* Statewide Assessment Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Statewide Assessment Scores</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-text-primary">
                  Assessment Type:
                </label>
                <select
                  value={wizardData.statewideAssessmentType}
                  onChange={(e) => setWizardData({ ...wizardData, statewideAssessmentType: e.target.value as WizardData['statewideAssessmentType'] })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                >
                  <option value="">Select Assessment</option>
                  <option value="CAASP">CAASP</option>
                  <option value="CAA">CAA</option>
                </select>
              </div>

              {wizardData.statewideAssessmentType === 'CAASP' && (
                <div className="p-4 border border-border rounded-lg bg-bg-primary">
                  <h4 className="font-semibold mb-4">CAASP Scores</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Math Overall:</label>
                      <select
                        value={wizardData.caaspMathScore}
                        onChange={(e) => setWizardData({ ...wizardData, caaspMathScore: e.target.value as WizardData['caaspMathScore'] })}
                        className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                      >
                        <option value="">Select Score</option>
                        <option value="Level 1">Standard Not Met (Level 1)</option>
                        <option value="Level 2">Standard Nearly Met (Level 2)</option>
                        <option value="Level 3">Standard Met (Level 3)</option>
                        <option value="Level 4">Standard Exceeded (Level 4)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">English/Language Arts Overall:</label>
                      <select
                        value={wizardData.caaspELAScore}
                        onChange={(e) => setWizardData({ ...wizardData, caaspELAScore: e.target.value as WizardData['caaspELAScore'] })}
                        className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                      >
                        <option value="">Select Score</option>
                        <option value="Level 1">Standard Not Met (Level 1)</option>
                        <option value="Level 2">Standard Nearly Met (Level 2)</option>
                        <option value="Level 3">Standard Met (Level 3)</option>
                        <option value="Level 4">Standard Exceeded (Level 4)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {wizardData.statewideAssessmentType === 'CAA' && (
                <div className="p-4 border border-border rounded-lg bg-bg-primary">
                  <p className="text-text-secondary">CAA score input will be implemented in a future update.</p>
                </div>
              )}
            </div>

            {/* ELPAC Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">ELPAC Scores</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-text-primary">
                  Does the student have ELPAC scores?
                </label>
                <select
                  value={wizardData.hasElpacScores}
                  onChange={(e) => setWizardData({ ...wizardData, hasElpacScores: e.target.value as WizardData['hasElpacScores'] })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                >
                  <option value="">Select Yes or No</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {wizardData.hasElpacScores === 'yes' && (
                <div className="p-4 border border-border rounded-lg bg-bg-primary">
                  <h4 className="font-semibold mb-4">ELPAC Score Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Overall Score:</label>
                      <select
                        value={wizardData.elpacOverallScore}
                        onChange={(e) => setWizardData({ ...wizardData, elpacOverallScore: e.target.value as WizardData['elpacOverallScore'] })}
                        className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                      >
                        <option value="">Select Level</option>
                        <option value="Level 1">Beginning to Develop (Level 1)</option>
                        <option value="Level 2">Somewhat Developed (Level 2)</option>
                        <option value="Level 3">Moderately Developed (Level 3)</option>
                        <option value="Level 4">Well Developed (Level 4)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Oral Language Score:</label>
                      <select
                        value={wizardData.elpacOralLanguageScore}
                        onChange={(e) => setWizardData({ ...wizardData, elpacOralLanguageScore: e.target.value as WizardData['elpacOralLanguageScore'] })}
                        className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                      >
                        <option value="">Select Level</option>
                        <option value="Level 1">Beginning to Develop (Level 1)</option>
                        <option value="Level 2">Somewhat Developed (Level 2)</option>
                        <option value="Level 3">Moderately Developed (Level 3)</option>
                        <option value="Level 4">Well Developed (Level 4)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Written Language Score:</label>
                      <select
                        value={wizardData.elpacWrittenLanguageScore}
                        onChange={(e) => setWizardData({ ...wizardData, elpacWrittenLanguageScore: e.target.value as WizardData['elpacWrittenLanguageScore'] })}
                        className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                      >
                        <option value="">Select Level</option>
                        <option value="Level 1">Beginning to Develop (Level 1)</option>
                        <option value="Level 2">Somewhat Developed (Level 2)</option>
                        <option value="Level 3">Moderately Developed (Level 3)</option>
                        <option value="Level 4">Well Developed (Level 4)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 4: // Step 5: Baseline Assessments & Data Analysis
        return (
          <div className="space-y-8">
            {/* Baseline Assessments Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Baseline Assessments</h3>
              
              {/* AI Recommendations */}
              <div className="mb-6 p-4 border border-green rounded-lg bg-green bg-opacity-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-green rounded-full text-white flex-shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green mb-2">AI Assessment Recommendations</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      Based on your previous IEP goals, student strengths/growth areas, and existing data, we recommend the following baseline assessments:
                    </p>
                  </div>
                </div>

                {wizardData.recommendedAssessments.length > 0 ? (
                  <div className="space-y-4">
                    {wizardData.recommendedAssessments.map((rec, index) => (
                      <div key={index} className="p-4 bg-bg-primary border border-border rounded-lg">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-green flex-shrink-0 mt-1" size={16} />
                          <div className="flex-1">
                            <h5 className="font-medium text-text-primary">{rec.domain}</h5>
                            <p className="text-sm text-text-secondary mt-1">{rec.standard}</p>
                            <p className="text-sm text-text-secondary mt-2">{rec.description}</p>
                            <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                              <strong>Rationale:</strong> {rec.rationale}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-bg-secondary rounded-lg text-center">
                    <AlertCircle className="text-text-secondary mx-auto mb-2" size={24} />
                    <p className="text-text-secondary text-sm">
                      Complete previous steps to receive AI-powered assessment recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Data Analysis Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Data Analysis</h3>
              
              {/* Data Input Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-text-primary">
                  How would you like to input baseline assessment data?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setWizardData({ ...wizardData, baselineDataInputMethod: 'upload' })}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      wizardData.baselineDataInputMethod === 'upload' 
                        ? 'border-green bg-green bg-opacity-10' 
                        : 'border-border hover:border-green'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Upload className="text-green" size={20} />
                      <h4 className="font-medium">Upload Assessment</h4>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Upload a file containing your assessment results
                    </p>
                  </button>
                  
                  <button
                    onClick={() => setWizardData({ ...wizardData, baselineDataInputMethod: 'manual' })}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      wizardData.baselineDataInputMethod === 'manual' 
                        ? 'border-green bg-green bg-opacity-10' 
                        : 'border-border hover:border-green'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Edit3 className="text-green" size={20} />
                      <h4 className="font-medium">Manual Input</h4>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Manually enter your assessment data
                    </p>
                  </button>
                </div>
              </div>

              {/* Upload Section */}
              {wizardData.baselineDataInputMethod === 'upload' && (
                <div className="p-6 border-2 border-dashed border-border rounded-lg bg-bg-secondary text-center">
                  <Upload className="text-text-secondary mx-auto mb-2" size={32} />
                  <h4 className="font-medium mb-2">Upload Assessment Data</h4>
                  <p className="text-sm text-text-secondary mb-4">
                    Drag and drop your assessment file here, or click to browse
                  </p>
                  <button className="btn bg-green text-white">
                    Choose File
                  </button>
                  <p className="text-xs text-text-secondary mt-2">
                    Supported formats: PDF, DOC, DOCX, XLS, XLSX
                  </p>
                </div>
              )}

              {/* Manual Input Section */}
              {wizardData.baselineDataInputMethod === 'manual' && (
                <div className="space-y-6">
                  {/* Assessment Area Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-primary">
                      Assessment Area:
                    </label>
                    <select
                      value={wizardData.baselineAssessmentArea}
                      onChange={(e) => setWizardData({ 
                        ...wizardData, 
                        baselineAssessmentArea: e.target.value as WizardData['baselineAssessmentArea'],
                        baselineAssessmentDomain: '' // Reset domain when area changes
                      })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                    >
                      <option value="">Select Assessment Area</option>
                      <option value="math">Math</option>
                      <option value="reading">Reading</option>
                      <option value="writing">Writing</option>
                    </select>
                  </div>

                  {/* Domain Area Selection */}
                  {wizardData.baselineAssessmentArea && (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-text-primary">
                        Domain Area:
                      </label>
                      <select
                        value={wizardData.baselineAssessmentDomain}
                        onChange={(e) => setWizardData({ ...wizardData, baselineAssessmentDomain: e.target.value })}
                        className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                      >
                        <option value="">Select Domain Area</option>
                        {getDomainAreas(
                          wizardData.baselineAssessmentArea === 'math' ? 'Math' : 
                          wizardData.baselineAssessmentArea === 'reading' ? 'Reading' : 'Writing',
                          wizardData.currentGradeLevel
                        ).map(domain => (
                          <option key={domain} value={domain}>{domain}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Results Input */}
                  {wizardData.baselineAssessmentDomain && (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-text-primary">
                        Assessment Results:
                      </label>
                      <textarea
                        value={wizardData.baselineResults}
                        onChange={(e) => setWizardData({ ...wizardData, baselineResults: e.target.value })}
                        className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                        placeholder="e.g., 4 out of 5 word problems of addition and subtraction correct, 80% accuracy on single-digit addition facts, needs manipulatives for subtraction problems"
                      />
                    </div>
                  )}

                  {/* Additional Information */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-primary">
                      Additional Information and Observational Data:
                    </label>
                    <textarea
                      value={wizardData.baselineAdditionalInfo}
                      onChange={(e) => setWizardData({ ...wizardData, baselineAdditionalInfo: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                      placeholder="e.g., Student showed good effort and engagement during assessment. Required frequent breaks and encouragement. Demonstrated understanding of concepts when given additional time to process questions."
                    />
                  </div>

                  {/* Accommodations */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-primary">
                      Accommodations Provided During Assessment:
                    </label>
                    <textarea
                      value={wizardData.baselineAccommodations}
                      onChange={(e) => setWizardData({ ...wizardData, baselineAccommodations: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
                      placeholder="e.g., Extended time, read aloud, use of calculator, frequent breaks, small group setting"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      // Placeholder cases for the remaining steps
      case 5: return <div>Content for Step 6: Student Accommodations and Supports (Coming Soon)</div>;
      case 6: return <div>Content for Step 7: Special Factors (Coming Soon)</div>;
      case 7: return <div>Content for Step 8: Present Levels (Coming Soon)</div>;
      case 8: return <div>Content for Step 9: Goal Proposal (Coming Soon)</div>;
      case 9: return <div>Content for Step 10: Related Services (Coming Soon)</div>;
      default:
        return <div>Invalid step or step not yet implemented.</div>;
    }
  };

  // Main component return (non-wizard view) - This part was updated by a previous Bolt prompt
  // based on your request to simplify the main page.
  if (showWizard) {
    // This is the existing wizard shell from your code, now driven by the new wizardSteps and currentStep
    return (
      <div className="animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-medium">AI-Assisted Goal Creation</h1> {/* This title can be updated if needed */}
              <button
                onClick={() => setShowWizard(false)}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                aria-label="Close Wizard"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 mb-6 overflow-x-auto pb-2">
              {wizardSteps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ${
                    index === currentStep ? 'bg-green text-white border-green scale-110' : 
                    index < currentStep ? 'bg-green-200 text-green border-green-200' : 
                    'border-border text-text-secondary'
                  }`}>
                    {index < currentStep ? <Check size={16} smSize={20} /> : <span className="text-xs sm:text-sm font-medium">{index + 1}</span>}
                  </div>
                  <div className="ml-2 sm:ml-3 text-left min-w-max">
                     <p className={`text-xs sm:text-sm font-medium truncate ${index === currentStep ? 'text-green' : 'text-text-secondary'}`}>{step.title}</p>
                  </div>
                  {index < wizardSteps.length - 1 && (
                     <div className={`hidden sm:block w-8 sm:w-12 h-0.5 mx-2 sm:mx-3 transition-all duration-300 ${index < currentStep ? 'bg-green' : 'bg-border'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                {wizardSteps[currentStep]?.icon || <Sparkles className="text-green" size={24} />} {/* Fallback icon */}
                <h2 className="text-2xl font-medium">{wizardSteps[currentStep]?.title || 'Loading Step...'}</h2>
              </div>
              <p className="text-text-secondary">{wizardSteps[currentStep]?.description || 'Please wait...'}</p>
            </div>
            <div className="min-h-[300px]">
              {renderWizardStep()}
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-border mt-6">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentStep === 0 ? 'text-text-disabled' : 'text-green hover:bg-green hover:bg-opacity-10 border border-green border-opacity-30'
                }`}
              >
                <ArrowLeft size={18} />
                Previous
              </button>
              {currentStep === wizardSteps.length - 1 ? (
                <button
                  onClick={handleGenerateGoal} // This will eventually be "Save/Finalize IEP" or similar
                  className="flex items-center gap-2 px-7 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Sparkles size={18} />
                  Finalize & Generate Documents (Placeholder)
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
                >
                  Next
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Non-wizard view (main page of the GoalWriting/IEP Development Studio)
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight">IEP Development Studio</h1>
        {/* Removed Manual Goal button as per previous request */}
      </div>

      <div className="card mb-8 bg-gradient-to-br from-green/5 via-transparent to-green/5 border-green/20 hover:border-green/30 transition-all duration-300 shadow-sm hover:shadow-lg">
        <div className="text-center py-10 sm:py-16 px-4">
          <div className="inline-block p-3 sm:p-4 bg-green/10 rounded-full mb-5 sm:mb-6">
            <Sparkles className="text-green" size={32} sm:size={48} />
          </div>
          <h2 className="text-xl sm:text-3xl font-semibold mb-3 sm:mb-4">AI-Assisted IEP Development</h2>
          <p className="text-text-secondary text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Use our AI-powered assistant to guide you through creating comprehensive, measurable Present Levels, Baselines, and IEP Goals for your students.
          </p>
          <button
            onClick={handleStartWizard}
            className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-3.5 bg-green text-white rounded-lg sm:rounded-xl font-medium text-base sm:text-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-green/30 transform hover:scale-105"
          >
            <Brain size={20} sm:size={24} />
            Create New Student IEP Goals
            <ArrowRight size={20} sm:size={24} />
          </button>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-green/5 via-transparent to-green/5 border-green/20 hover:border-green/30 transition-all duration-300 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
          <Lightbulb className="text-green" size={20} sm:size={22} />
          <h2 className="text-xl sm:text-2xl font-medium">SMART Goal Writing Tips</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {[
            { letter: 'S', term: 'Specific', desc: 'Clearly define what needs to be accomplished. Avoid vague language and be precise about the expected behavior or skill.' },
            { letter: 'M', term: 'Measurable', desc: 'How will you track progress and know when the goal is met? Include specific criteria like percentages or frequency.' },
            { letter: 'A', term: 'Achievable', desc: 'Is the goal realistic given the student\'s current abilities and expected growth? Set challenging but attainable targets.' },
            { letter: 'R', term: 'Relevant', desc: 'Does the goal address the student\'s key needs and align with curriculum expectations and life skills?' },
            { letter: 'T', term: 'Time-bound', desc: 'What is the target date for achieving this goal? Establish clear timelines for assessment and review.' },
          ].map(tip => (
            <div key={tip.letter} className="bg-bg-primary rounded-lg p-4 sm:p-5 border border-border hover:border-green/50 transition-all duration-200 shadow-sm hover:shadow-md">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                  {tip.letter}
                </div>
                <h3 className="font-semibold text-green text-sm sm:text-base">{tip.term}</h3>
              </div>
              <p className="text-text-secondary text-xs sm:text-sm leading-normal">{tip.desc}</p>
            </div>
          ))}
        </div>
         <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border">
          <h3 className="font-semibold text-green mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            Additional Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {[
              "Use positive language focusing on what the student will do",
              "Include conditions under which the skill will be performed",
              "Consider the student's learning style and preferences",
              "Align goals with state standards when appropriate",
              "Ensure goals are functional and meaningful to the student",
              "Plan for regular progress monitoring and data collection"
            ].map(practice => (
               <p key={practice} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
                  <span className="w-1.5 h-1.5 bg-green rounded-full mt-[0.3em] sm:mt-[0.4em] flex-shrink-0"></span>
                  <span>{practice}</span>
               </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalWriting;