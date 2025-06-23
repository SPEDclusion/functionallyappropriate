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
  anecdotalObservationsGE: string;
  academicStrengthsGeneralInfo: string;
  areasOfGrowthQualitative: string;

  // Step 4: Existing Student Data Input
  benchmarkAssessmentType: 'NWEA' | 'Curriculum-Based' | 'Benchmark' | 'Other' | '';
  benchmarkAssessmentOtherName: string;
  benchmarkDataManualInput: string;
  nweaRitScore: string;
  nweaPercentilePeers: string;
  nweaGrowthPercentile: string;
  statewideAssessmentType: 'SBAC' | 'CAA' | '';
  statewideAssessmentScores: string;
  elpacScores: string;

  // Step 5: New Baseline Data Analysis
  newBaselineDomain: string;
  newBaselineStandardId: string;
  newBaselineResultsQuantitative: string;
  newBaselineAdditionalInfoQualitative: string;
  newBaselineSupportsToIncreaseAccess: string;

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

// Mock students data
const mockStudents = [
  { id: 's1', name: 'Alex Chen', grade: '3rd', disability: 'Specific Learning Disability' },
  { id: 's2', name: 'Maria Rodriguez', grade: '5th', disability: 'Autism Spectrum Disorder' },
  { id: 's3', name: 'Jordan Williams', grade: '2nd', disability: 'Speech or Language Impairment' },
  { id: 's4', name: 'Emma Thompson', grade: '4th', disability: 'Intellectual Disability' },
  { id: 's5', name: 'Kai Patel', grade: '1st', disability: 'Multiple Disabilities' },
  { id: 's6', name: 'Sofia Martinez', grade: 'K', disability: 'Developmental Delay' },
];

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
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');

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
    anecdotalObservationsGE: '',
    academicStrengthsGeneralInfo: '',
    areasOfGrowthQualitative: '',
    benchmarkAssessmentType: '',
    benchmarkAssessmentOtherName: '',
    benchmarkDataManualInput: '',
    nweaRitScore: '',
    nweaPercentilePeers: '',
    nweaGrowthPercentile: '',
    statewideAssessmentType: '',
    statewideAssessmentScores: '',
    elpacScores: '',
    newBaselineDomain: '',
    newBaselineStandardId: '',
    newBaselineResultsQuantitative: '',
    newBaselineAdditionalInfoQualitative: '',
    newBaselineSupportsToIncreaseAccess: '',
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
    { id: 1, title: 'Previous IEP Goals Review', description: 'Review progress on prior goals.', icon: <BookOpen className="text-green" size={24} /> },
    { id: 2, title: 'Student Context & Supports', description: 'Gather qualitative information.', icon: <Settings className="text-green" size={24} /> },
    { id: 3, title: 'Existing Student Data Input', description: 'Input data from various assessments.', icon: <BarChart2 className="text-green" size={24} /> },
    { id: 4, title: 'New Baseline Data & Analysis', description: 'Input results from new baseline assessments.', icon: <Microscope className="text-green" size={24} /> },
    { id: 5, title: 'Accommodations & Modifications', description: 'Define supports for the student.', icon: <ShieldCheck className="text-green" size={24} /> },
    { id: 6, title: 'Special Factors', description: 'Address specific considerations.', icon: <Edit3 className="text-green" size={24} /> },
    { id: 7, title: 'Draft Present Levels', description: 'AI will help synthesize data into a PLOP.', icon: <IEPFileTextIcon className="text-green" size={24} /> },
    { id: 8, title: 'Propose IEP Goals & Objectives', description: 'AI will recommend goals.', icon: <GoalTargetIcon className="text-green" size={24} /> },
    { id: 9, title: 'Related Services', description: 'Document related services.', icon: <Handshake className="text-green" size={24} /> },
  ];

  const gradeOptions = ['K', '1', '2', '3', '4', '5']; // Moved here for renderWizardStep

  // Domain areas for previous goals
  const domainAreas = [
    'Counting & Cardinality',
    'Operations & Algebraic Thinking',
    'Number & Operations in Base Ten',
    'Measurement & Data',
    'Geometry',
    'Reading Foundational Skills',
    'Reading Literature',
    'Reading Informational Text',
    'Writing',
    'Speaking & Listening',
    'Language',
    'Social/Emotional',
    'Adaptive/Daily Living Skills',
    'Communication',
    'Fine/Gross Motor'
  ];

  // Example standards (will be expanded later)
  const getStandardsForDomain = (domain: string) => {
    switch (domain) {
      case 'Operations & Algebraic Thinking':
        return [
          { id: 'K.OA.A.1', text: 'K.OA.A.1 - Represent addition and subtraction with objects' },
          { id: 'K.OA.A.2', text: 'K.OA.A.2 - Solve addition and subtraction word problems' },
          { id: '1.OA.A.1', text: '1.OA.A.1 - Use addition and subtraction within 20 to solve problems' },
          { id: '1.OA.B.3', text: '1.OA.B.3 - Apply properties of operations as strategies' },
          { id: '2.OA.A.1', text: '2.OA.A.1 - Use addition and subtraction within 100 to solve problems' }
        ];
      case 'Counting & Cardinality':
        return [
          { id: 'K.CC.A.1', text: 'K.CC.A.1 - Count to 100 by ones and by tens' },
          { id: 'K.CC.A.2', text: 'K.CC.A.2 - Count forward beginning from a given number' },
          { id: 'K.CC.B.4', text: 'K.CC.B.4 - Understand the relationship between numbers and quantities' }
        ];
      case 'Number & Operations in Base Ten':
        return [
          { id: '1.NBT.A.1', text: '1.NBT.A.1 - Count to 120, starting at any number' },
          { id: '1.NBT.B.2', text: '1.NBT.B.2 - Understand that the two digits of a two-digit number represent amounts' },
          { id: '2.NBT.A.1', text: '2.NBT.A.1 - Understand that the three digits of a three-digit number represent amounts' }
        ];
      default:
        return [
          { id: 'select-domain', text: 'Please select a domain area first to see relevant standards' }
        ];
    }
  };

  // UPDATED handleStartWizard to reset ALL new fields and handle student selection
  const handleStartWizard = () => {
    if (!selectedStudentId) return;
    
    const selectedStudent = mockStudents.find(s => s.id === selectedStudentId);
    if (!selectedStudent) return;

    setShowWizard(true);
    setCurrentStep(0);
    setWizardData({
      // Pre-populate with selected student data
      studentName: selectedStudent.name,
      currentGradeLevel: selectedStudent.grade.replace(/\D/g, '') || 'K', // Extract number from grade
      schoolName: '',
      primaryDisability: selectedStudent.disability,
      secondaryDisability: '',
      studentInterestsGeneralInfo: '',
      englishLearnerStatus: '',
      // Reset all other fields
      previousGoalDomain: '', previousGoalStandardId: '', previousGoalAnnualGoalText: '', previousGoalProgressStatus: '', previousGoalContinuedNeed: '', showPreviousObjectives: false, previousObjective1Text: '', previousObjective1Status: '', previousObjective2Text: '', previousObjective2Status: '', previousObjective3Text: '', previousObjective3Status: '',
      anecdotalObservationsGE: '', academicStrengthsGeneralInfo: '', areasOfGrowthQualitative: '',
      benchmarkAssessmentType: '', benchmarkAssessmentOtherName: '', benchmarkDataManualInput: '', nweaRitScore: '', nweaPercentilePeers: '', nweaGrowthPercentile: '', statewideAssessmentType: '', statewideAssessmentScores: '', elpacScores: '',
      newBaselineDomain: '', newBaselineStandardId: '', newBaselineResultsQuantitative: '', newBaselineAdditionalInfoQualitative: '', newBaselineSupportsToIncreaseAccess: '',
      accommodations: [], modifications: [], behaviorNeeds: '', behaviorSupports: [], elSupports: '',
      assistiveTechNeeded: '', assistiveTechRationale: '', blindVisualImpairment: '', deafHardOfHearing: '', behaviorImpedingLearning: '', behaviorInterventionsStrategies: '',
      draftPresentLevels: '', draftAnnualGoal: '', draftObjective1: '', draftObjective2: '', draftObjective3: '',
      relatedServiceType: '', relatedServiceOtherName: '', relatedServiceDuration: '', relatedServiceFrequency: '', relatedServiceDelivery: '', relatedServiceLocation: '', relatedServiceComments: '', relatedServiceStartDate: '', relatedServiceEndDate: '',
    });
  };

  const handleNextStep = () => {
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
      baseline: wizardData.newBaselineResultsQuantitative || 'Baseline to be determined from Step 5 data.',
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
            {/* Previous Goal Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">
                Previous Goal Information
              </h3>
              
              {/* Domain Area Dropdown */}
              <div>
                <label htmlFor="previousGoalDomain" className="block text-sm font-medium mb-1 text-text-primary">
                  Domain Area of Previous Goal:
                </label>
                <select
                  id="previousGoalDomain"
                  value={wizardData.previousGoalDomain}
                  onChange={(e) => setWizardData({ 
                    ...wizardData, 
                    previousGoalDomain: e.target.value,
                    previousGoalStandardId: '' // Reset standard when domain changes
                  })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                >
                  <option value="">Select Domain Area</option>
                  {domainAreas.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>

              {/* Grade Level Standard Alignment Dropdown */}
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
                  <option value="">Select Standard</option>
                  {getStandardsForDomain(wizardData.previousGoalDomain).map(standard => (
                    <option key={standard.id} value={standard.id}>{standard.text}</option>
                  ))}
                </select>
                <p className="text-xs text-text-secondary mt-1">
                  Note: Select Domain Area first to see relevant standards. Full list will be populated from CCSS data.
                </p>
              </div>

              {/* Previous IEP Annual Goal Text */}
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

              {/* Progress and Continued Need - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <option value="not_met">Goal Not Met</option>
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
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Previous Short-Term Objectives Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">
                Previous Short-Term Objectives (Optional)
              </h3>
              
              {/* Objective 1 */}
              <div className="p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                <h4 className="text-md font-medium text-text-primary mb-3">Objective 1</h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="previousObjective1Text" className="block text-sm font-medium mb-1 text-text-primary">
                      Objective Text:
                    </label>
                    <textarea
                      id="previousObjective1Text"
                      value={wizardData.previousObjective1Text}
                      onChange={(e) => setWizardData({ ...wizardData, previousObjective1Text: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
                      placeholder="Enter the first short-term objective..."
                    />
                  </div>
                  <div>
                    <label htmlFor="previousObjective1Status" className="block text-sm font-medium mb-1 text-text-primary">
                      Status:
                    </label>
                    <select
                      id="previousObjective1Status"
                      value={wizardData.previousObjective1Status}
                      onChange={(e) => setWizardData({ ...wizardData, previousObjective1Status: e.target.value as WizardData['previousObjective1Status'] })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                    >
                      <option value="">Select Status</option>
                      <option value="met">Met</option>
                      <option value="partially_met">Partially Met</option>
                      <option value="not_met">Not Met</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Objective 2 */}
              <div className="p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                <h4 className="text-md font-medium text-text-primary mb-3">Objective 2</h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="previousObjective2Text" className="block text-sm font-medium mb-1 text-text-primary">
                      Objective Text:
                    </label>
                    <textarea
                      id="previousObjective2Text"
                      value={wizardData.previousObjective2Text}
                      onChange={(e) => setWizardData({ ...wizardData, previousObjective2Text: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
                      placeholder="Enter the second short-term objective..."
                    />
                  </div>
                  <div>
                    <label htmlFor="previousObjective2Status" className="block text-sm font-medium mb-1 text-text-primary">
                      Status:
                    </label>
                    <select
                      id="previousObjective2Status"
                      value={wizardData.previousObjective2Status}
                      onChange={(e) => setWizardData({ ...wizardData, previousObjective2Status: e.target.value as WizardData['previousObjective2Status'] })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                    >
                      <option value="">Select Status</option>
                      <option value="met">Met</option>
                      <option value="partially_met">Partially Met</option>
                      <option value="not_met">Not Met</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Objective 3 */}
              <div className="p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                <h4 className="text-md font-medium text-text-primary mb-3">Objective 3</h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="previousObjective3Text" className="block text-sm font-medium mb-1 text-text-primary">
                      Objective Text:
                    </label>
                    <textarea
                      id="previousObjective3Text"
                      value={wizardData.previousObjective3Text}
                      onChange={(e) => setWizardData({ ...wizardData, previousObjective3Text: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
                      placeholder="Enter the third short-term objective..."
                    />
                  </div>
                  <div>
                    <label htmlFor="previousObjective3Status" className="block text-sm font-medium mb-1 text-text-primary">
                      Status:
                    </label>
                    <select
                      id="previousObjective3Status"
                      value={wizardData.previousObjective3Status}
                      onChange={(e) => setWizardData({ ...wizardData, previousObjective3Status: e.target.value as WizardData['previousObjective3Status'] })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                    >
                      <option value="">Select Status</option>
                      <option value="met">Met</option>
                      <option value="partially_met">Partially Met</option>
                      <option value="not_met">Not Met</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // Placeholder cases for the remaining steps
      case 2: return <div>Content for Step 3: Student Context & Supports (Coming Soon)</div>;
      case 3: return <div>Content for Step 4: Existing Student Data Input (Coming Soon)</div>;
      case 4: return <div>Content for Step 5: New Baseline Data & Analysis (Coming Soon)</div>;
      case 5: return <div>Content for Step 6: Accommodations & Modifications (Coming Soon)</div>;
      case 6: return <div>Content for Step 7: Special Factors (Coming Soon)</div>;
      case 7: return <div>Content for Step 8: Draft Present Levels (Coming Soon)</div>;
      case 8: // Step 9: Goal Proposal with SMART tips
        return (
          <div className="space-y-8">
            {/* Goal Proposal Content */}
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-4">AI-Generated Goal Proposal</h3>
              <p className="text-text-secondary mb-6">Based on the information provided in previous steps, here are the recommended IEP goals and objectives:</p>
              
              {/* Placeholder for AI-generated content */}
              <div className="p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30 mb-6">
                <p className="text-text-secondary italic">AI-generated goals will appear here based on the data collected in Steps 1-7...</p>
              </div>
            </div>

            {/* SMART Goal Writing Tips - Moved from main page */}
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
      case 9: return <div>Content for Step 10: Related Services (Coming Soon)</div>;
      default:
        return <div>Invalid step or step not yet implemented.</div>;
    }
  };

  // Main component return (non-wizard view)
  if (showWizard) {
    // This is the existing wizard shell from your code, now driven by the new wizardSteps and currentStep
    return (
      <div className="animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-medium">AI-Assisted Goal Creation</h1>
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
                {wizardSteps[currentStep]?.icon || <Sparkles className="text-green" size={24} />}
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
                  onClick={handleGenerateGoal}
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
          
          {/* Student Selection Dropdown */}
          <div className="mb-6 max-w-md mx-auto">
            <label htmlFor="studentSelect" className="block text-sm font-medium mb-2 text-text-primary">
              Select Student:
            </label>
            <select
              id="studentSelect"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
            >
              <option value="">Choose a student...</option>
              {mockStudents.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} - {student.grade} Grade ({student.disability})
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleStartWizard}
            disabled={!selectedStudentId}
            className={`inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg sm:rounded-xl font-medium text-base sm:text-lg transition-all duration-200 shadow-lg transform ${
              selectedStudentId 
                ? 'bg-green text-white hover:bg-opacity-90 hover:shadow-green/30 hover:scale-105' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            <Brain size={20} sm:size={24} />
            {selectedStudentId ? "Let's Start Building" : "Please select a student to begin"}
            <ArrowRight size={20} sm:size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalWriting;