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
  const [selectedStudentId, setSelectedStudentId] = useState('');

  // Mock students for the dropdown
  const mockStudents = [
    { id: 'student1', name: 'Alex Chen' },
    { id: 'student2', name: 'Maria Rodriguez' },
    { id: 'student3', name: 'Jordan Smith' },
    { id: 'student4', name: 'Taylor Johnson' },
    { id: 'student5', name: 'Casey Williams' },
  ];

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

  // UPDATED handleStartWizard to reset ALL new fields
  const handleStartWizard = () => {
    if (!selectedStudentId) {
      alert('Please select a student first.');
      return;
    }
    
    const selectedStudent = mockStudents.find(s => s.id === selectedStudentId);
    
    setShowWizard(true);
    setCurrentStep(0);
    setWizardData({
      studentName: selectedStudent?.name || '', currentGradeLevel: 'K', schoolName: '', primaryDisability: '', secondaryDisability: '', studentInterestsGeneralInfo: '', englishLearnerStatus: '',
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

  // Helper functions for Step 6
  const handleAccommodationChange = (accommodation: string, checked: boolean) => {
    if (checked) {
      setWizardData(prev => ({
        ...prev,
        accommodations: [...prev.accommodations, accommodation]
      }));
    } else {
      setWizardData(prev => ({
        ...prev,
        accommodations: prev.accommodations.filter(item => item !== accommodation)
      }));
    }
  };

  const handleModificationChange = (modification: string, checked: boolean) => {
    if (checked) {
      setWizardData(prev => ({
        ...prev,
        modifications: [...prev.modifications, modification]
      }));
    } else {
      setWizardData(prev => ({
        ...prev,
        modifications: prev.modifications.filter(item => item !== modification)
      }));
    }
  };

  const handleBehaviorSupportChange = (support: string, checked: boolean) => {
    if (checked) {
      setWizardData(prev => ({
        ...prev,
        behaviorSupports: [...prev.behaviorSupports, support]
      }));
    } else {
      setWizardData(prev => ({
        ...prev,
        behaviorSupports: prev.behaviorSupports.filter(item => item !== support)
      }));
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
          <div className="space-y-6">
            {/* Domain Area Selection */}
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
                <option value="Measurement & Data">Measurement & Data</option>
                <option value="Geometry">Geometry</option>
                <option value="Reading Foundational Skills">Reading Foundational Skills</option>
                <option value="Reading Literature">Reading Literature</option>
                <option value="Reading Informational Text">Reading Informational Text</option>
                <option value="Writing">Writing</option>
                <option value="Speaking & Listening">Speaking & Listening</option>
                <option value="Language">Language</option>
              </select>
            </div>

            {/* Standard Alignment Selection */}
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
                {wizardData.previousGoalDomain === 'Operations & Algebraic Thinking' && (
                  <>
                    <option value="K.OA.A.2">K.OA.A.2 - Solve addition and subtraction word problems</option>
                    <option value="1.OA.A.1">1.OA.A.1 - Use addition and subtraction within 20</option>
                    <option value="2.OA.A.1">2.OA.A.1 - Use addition and subtraction within 100</option>
                  </>
                )}
                {wizardData.previousGoalDomain === 'Counting & Cardinality' && (
                  <>
                    <option value="K.CC.A.1">K.CC.A.1 - Count to 100 by ones and tens</option>
                    <option value="K.CC.B.4">K.CC.B.4 - Understand relationship between numbers and quantities</option>
                  </>
                )}
                {/* Add more standards for other domains as needed */}
              </select>
              <p className="text-xs text-text-secondary mt-1">
                Note: Select Domain Area first to see relevant standards. Full list will be populated from CCSS data.
              </p>
            </div>

            {/* Previous Annual Goal Text */}
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

            {/* Progress Status and Continued Need */}
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
                  <option value="minimal_progress">Minimal Progress</option>
                  <option value="objectives_met">Objectives Met</option>
                  <option value="not_annual_goal">Not an Annual Goal</option>
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

            {/* Previous Short-Term Objectives */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-medium mb-4 text-text-primary">Previous Short-Term Objectives (Optional)</h3>
              
              {/* Objective 1 */}
              <div className="mb-6 p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                <h4 className="font-medium mb-3 text-text-primary">Objective 1</h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="previousObjective1Text" className="block text-sm font-medium mb-1 text-text-primary">
                      Objective Text:
                    </label>
                    <textarea
                      id="previousObjective1Text"
                      value={wizardData.previousObjective1Text}
                      onChange={(e) => setWizardData({ ...wizardData, previousObjective1Text: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
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
                      className="w-full p-3 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
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
              <div className="mb-6 p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                <h4 className="font-medium mb-3 text-text-primary">Objective 2</h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="previousObjective2Text" className="block text-sm font-medium mb-1 text-text-primary">
                      Objective Text:
                    </label>
                    <textarea
                      id="previousObjective2Text"
                      value={wizardData.previousObjective2Text}
                      onChange={(e) => setWizardData({ ...wizardData, previousObjective2Text: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
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
                      className="w-full p-3 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
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
              <div className="mb-6 p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                <h4 className="font-medium mb-3 text-text-primary">Objective 3</h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="previousObjective3Text" className="block text-sm font-medium mb-1 text-text-primary">
                      Objective Text:
                    </label>
                    <textarea
                      id="previousObjective3Text"
                      value={wizardData.previousObjective3Text}
                      onChange={(e) => setWizardData({ ...wizardData, previousObjective3Text: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
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
                      className="w-full p-3 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
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

      case 2: // Step 3: Student Context & Supports
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="anecdotalObservationsGE" className="block text-sm font-medium mb-1 text-text-primary">
                Anecdotal Observations in General Education:
              </label>
              <textarea
                id="anecdotalObservationsGE"
                value={wizardData.anecdotalObservationsGE}
                onChange={(e) => setWizardData({ ...wizardData, anecdotalObservationsGE: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-40"
                placeholder="Describe observations of the student in the general education classroom, including behavior, participation, social interactions, and learning patterns..."
              />
            </div>

            <div>
              <label htmlFor="academicStrengthsGeneralInfo" className="block text-sm font-medium mb-1 text-text-primary">
                Academic Strengths and General Information:
              </label>
              <textarea
                id="academicStrengthsGeneralInfo"
                value={wizardData.academicStrengthsGeneralInfo}
                onChange={(e) => setWizardData({ ...wizardData, academicStrengthsGeneralInfo: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                placeholder="Describe the student's academic strengths, preferred learning styles, motivating factors, and any other relevant information..."
              />
            </div>

            <div>
              <label htmlFor="areasOfGrowthQualitative" className="block text-sm font-medium mb-1 text-text-primary">
                Areas of Growth (Qualitative):
              </label>
              <textarea
                id="areasOfGrowthQualitative"
                value={wizardData.areasOfGrowthQualitative}
                onChange={(e) => setWizardData({ ...wizardData, areasOfGrowthQualitative: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                placeholder="Describe areas where the student needs additional support or shows potential for growth, including academic, behavioral, or social areas..."
              />
            </div>
          </div>
        );

      case 3: // Step 4: Existing Student Data Input
        return (
          <div className="space-y-8">
            {/* Formative Assessment Section */}
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-medium mb-4 text-text-primary">Formative Assessment Data</h3>
              
              <div className="mb-4">
                <label htmlFor="benchmarkAssessmentType" className="block text-sm font-medium mb-1 text-text-primary">
                  Assessment Type:
                </label>
                <select
                  id="benchmarkAssessmentType"
                  value={wizardData.benchmarkAssessmentType}
                  onChange={(e) => setWizardData({ ...wizardData, benchmarkAssessmentType: e.target.value as WizardData['benchmarkAssessmentType'] })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                >
                  <option value="">Select Assessment Type</option>
                  <option value="NWEA">NWEA MAP</option>
                  <option value="Curriculum-Based">SANDI (Curriculum-Based)</option>
                  <option value="Benchmark">District Benchmark</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {wizardData.benchmarkAssessmentType === 'Other' && (
                <div className="mb-4">
                  <label htmlFor="benchmarkAssessmentOtherName" className="block text-sm font-medium mb-1 text-text-primary">
                    Specify Assessment Name:
                  </label>
                  <input
                    type="text"
                    id="benchmarkAssessmentOtherName"
                    value={wizardData.benchmarkAssessmentOtherName}
                    onChange={(e) => setWizardData({ ...wizardData, benchmarkAssessmentOtherName: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                    placeholder="Enter assessment name"
                  />
                </div>
              )}

              {/* NWEA Specific Fields */}
              {wizardData.benchmarkAssessmentType === 'NWEA' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Reading Section */}
                    <div className="p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                      <h4 className="font-medium mb-3 text-text-primary">Reading</h4>
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="nweaReadingRit" className="block text-xs font-medium mb-1 text-text-primary">
                            RIT Score:
                          </label>
                          <input
                            type="number"
                            id="nweaReadingRit"
                            className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm"
                            placeholder="e.g., 185"
                          />
                        </div>
                        <div>
                          <label htmlFor="nweaReadingPercentile" className="block text-xs font-medium mb-1 text-text-primary">
                            Percentile (compared to peers):
                          </label>
                          <input
                            type="number"
                            id="nweaReadingPercentile"
                            className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm"
                            placeholder="e.g., 45"
                            min="1"
                            max="99"
                          />
                        </div>
                        <div>
                          <label htmlFor="nweaReadingGrowth" className="block text-xs font-medium mb-1 text-text-primary">
                            Growth Percentile:
                          </label>
                          <input
                            type="number"
                            id="nweaReadingGrowth"
                            className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm"
                            placeholder="e.g., 60"
                            min="1"
                            max="99"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Math Section */}
                    <div className="p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                      <h4 className="font-medium mb-3 text-text-primary">Math</h4>
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="nweaMathRit" className="block text-xs font-medium mb-1 text-text-primary">
                            RIT Score:
                          </label>
                          <input
                            type="number"
                            id="nweaMathRit"
                            className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm"
                            placeholder="e.g., 190"
                          />
                        </div>
                        <div>
                          <label htmlFor="nweaMathPercentile" className="block text-xs font-medium mb-1 text-text-primary">
                            Percentile (compared to peers):
                          </label>
                          <input
                            type="number"
                            id="nweaMathPercentile"
                            className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm"
                            placeholder="e.g., 35"
                            min="1"
                            max="99"
                          />
                        </div>
                        <div>
                          <label htmlFor="nweaMathGrowth" className="block text-xs font-medium mb-1 text-text-primary">
                            Growth Percentile:
                          </label>
                          <input
                            type="number"
                            id="nweaMathGrowth"
                            className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm"
                            placeholder="e.g., 55"
                            min="1"
                            max="99"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SANDI Specific Fields */}
              {wizardData.benchmarkAssessmentType === 'Curriculum-Based' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Reading */}
                    <div className="p-3 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                      <h4 className="font-medium mb-2 text-text-primary text-sm">Reading</h4>
                      <div className="space-y-2">
                        <input
                          type="text"
                          className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm"
                          placeholder="Score"
                        />
                        <select className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm">
                          <option value="">Level</option>
                          <option value="1">Level 1</option>
                          <option value="2">Level 2</option>
                          <option value="3">Level 3</option>
                          <option value="4">Level 4</option>
                        </select>
                      </div>
                    </div>

                    {/* Writing */}
                    <div className="p-3 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                      <h4 className="font-medium mb-2 text-text-primary text-sm">Writing</h4>
                      <div className="space-y-2">
                        <input
                          type="text"
                          className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm"
                          placeholder="Score"
                        />
                        <select className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm">
                          <option value="">Level</option>
                          <option value="1">Level 1</option>
                          <option value="2">Level 2</option>
                          <option value="3">Level 3</option>
                          <option value="4">Level 4</option>
                        </select>
                      </div>
                    </div>

                    {/* Math */}
                    <div className="p-3 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                      <h4 className="font-medium mb-2 text-text-primary text-sm">Math</h4>
                      <div className="space-y-2">
                        <input
                          type="text"
                          className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm"
                          placeholder="Score"
                        />
                        <select className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm">
                          <option value="">Level</option>
                          <option value="1">Level 1</option>
                          <option value="2">Level 2</option>
                          <option value="3">Level 3</option>
                          <option value="4">Level 4</option>
                        </select>
                      </div>
                    </div>

                    {/* Communication */}
                    <div className="p-3 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                      <h4 className="font-medium mb-2 text-text-primary text-sm">Communication</h4>
                      <div className="space-y-2">
                        <input
                          type="text"
                          className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm"
                          placeholder="Score"
                        />
                        <select className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors text-sm">
                          <option value="">Level</option>
                          <option value="1">Level 1</option>
                          <option value="2">Level 2</option>
                          <option value="3">Level 3</option>
                          <option value="4">Level 4</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Manual Input for Other Assessment Types */}
              {(wizardData.benchmarkAssessmentType === 'Benchmark' || wizardData.benchmarkAssessmentType === 'Other') && (
                <div>
                  <label htmlFor="benchmarkDataManualInput" className="block text-sm font-medium mb-1 text-text-primary">
                    Assessment Results:
                  </label>
                  <textarea
                    id="benchmarkDataManualInput"
                    value={wizardData.benchmarkDataManualInput}
                    onChange={(e) => setWizardData({ ...wizardData, benchmarkDataManualInput: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
                    placeholder="Enter assessment results and scores..."
                  />
                </div>
              )}
            </div>

            {/* Statewide Assessment Section */}
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-medium mb-4 text-text-primary">Statewide Assessment Data</h3>
              
              <div className="mb-4">
                <label htmlFor="statewideAssessmentType" className="block text-sm font-medium mb-1 text-text-primary">
                  Assessment Type:
                </label>
                <select
                  id="statewideAssessmentType"
                  value={wizardData.statewideAssessmentType}
                  onChange={(e) => setWizardData({ ...wizardData, statewideAssessmentType: e.target.value as WizardData['statewideAssessmentType'] })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                >
                  <option value="">Select Assessment</option>
                  <option value="SBAC">SBAC (Smarter Balanced)</option>
                  <option value="CAA">CAA (California Alternate Assessment)</option>
                </select>
              </div>

              {wizardData.statewideAssessmentType && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                    <h4 className="font-medium mb-3 text-text-primary">ELA/Reading</h4>
                    <select className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors">
                      <option value="">Select Level</option>
                      <option value="1">Level 1 - Standard Not Met</option>
                      <option value="2">Level 2 - Standard Nearly Met</option>
                      <option value="3">Level 3 - Standard Met</option>
                      <option value="4">Level 4 - Standard Exceeded</option>
                    </select>
                  </div>

                  <div className="p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                    <h4 className="font-medium mb-3 text-text-primary">Mathematics</h4>
                    <select className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors">
                      <option value="">Select Level</option>
                      <option value="1">Level 1 - Standard Not Met</option>
                      <option value="2">Level 2 - Standard Nearly Met</option>
                      <option value="3">Level 3 - Standard Met</option>
                      <option value="4">Level 4 - Standard Exceeded</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* ELPAC Section */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-text-primary">ELPAC (English Language Proficiency)</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-text-primary">
                  Has the student taken ELPAC?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasElpac"
                      value="yes"
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasElpac"
                      value="no"
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                  <h4 className="font-medium mb-3 text-text-primary">Overall Score</h4>
                  <select className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors">
                    <option value="">Select Level</option>
                    <option value="1">Level 1 - Minimally Developed</option>
                    <option value="2">Level 2 - Somewhat Developed</option>
                    <option value="3">Level 3 - Moderately Developed</option>
                    <option value="4">Level 4 - Well Developed</option>
                  </select>
                </div>

                <div className="p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                  <h4 className="font-medium mb-3 text-text-primary">Oral Language</h4>
                  <select className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors">
                    <option value="">Select Level</option>
                    <option value="1">Level 1 - Minimally Developed</option>
                    <option value="2">Level 2 - Somewhat Developed</option>
                    <option value="3">Level 3 - Moderately Developed</option>
                    <option value="4">Level 4 - Well Developed</option>
                  </select>
                </div>

                <div className="p-4 border border-border rounded-lg bg-bg-secondary bg-opacity-30">
                  <h4 className="font-medium mb-3 text-text-primary">Written Language</h4>
                  <select className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors">
                    <option value="">Select Level</option>
                    <option value="1">Level 1 - Minimally Developed</option>
                    <option value="2">Level 2 - Somewhat Developed</option>
                    <option value="3">Level 3 - Moderately Developed</option>
                    <option value="4">Level 4 - Well Developed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Step 5: New Baseline Data & Analysis
        return (
          <div className="space-y-8">
            {/* Baseline Assessments Section */}
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-medium mb-4 text-text-primary">Baseline Assessments</h3>
              
              {/* AI Recommendation Box */}
              <div className="mb-6 p-4 bg-green bg-opacity-10 border border-green rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green rounded-full text-white flex-shrink-0">
                    <Brain size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-green mb-2">AI Assessment Recommendation</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      Based on the previous goal information and student context, we recommend assessing the following domain areas:
                    </p>
                    <div className="bg-bg-primary p-3 rounded border border-border">
                      <p className="text-sm font-medium text-text-primary">
                        Recommended Domain: <span className="text-green">Operations & Algebraic Thinking</span>
                      </p>
                      <p className="text-sm text-text-secondary mt-1">
                        Suggested Assessment Level: 2nd Grade Standards (K.OA.A.2 - Addition/Subtraction within 10)
                      </p>
                      <p className="text-xs text-text-secondary mt-2">
                        This recommendation is based on the student's previous goal progress and identified areas of need.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Domain and Standard Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="newBaselineDomain" className="block text-sm font-medium mb-1 text-text-primary">
                    Assessment Domain Area:
                  </label>
                  <select
                    id="newBaselineDomain"
                    value={wizardData.newBaselineDomain}
                    onChange={(e) => setWizardData({ ...wizardData, newBaselineDomain: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                  >
                    <option value="">Select Domain</option>
                    <option value="Counting & Cardinality">Counting & Cardinality</option>
                    <option value="Operations & Algebraic Thinking">Operations & Algebraic Thinking</option>
                    <option value="Number & Operations in Base Ten">Number & Operations in Base Ten</option>
                    <option value="Measurement & Data">Measurement & Data</option>
                    <option value="Geometry">Geometry</option>
                    <option value="Reading Foundational Skills">Reading Foundational Skills</option>
                    <option value="Reading Literature">Reading Literature</option>
                    <option value="Reading Informational Text">Reading Informational Text</option>
                    <option value="Writing">Writing</option>
                    <option value="Speaking & Listening">Speaking & Listening</option>
                    <option value="Language">Language</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="newBaselineStandardId" className="block text-sm font-medium mb-1 text-text-primary">
                    CCSS Standard Alignment:
                  </label>
                  <select
                    id="newBaselineStandardId"
                    value={wizardData.newBaselineStandardId}
                    onChange={(e) => setWizardData({ ...wizardData, newBaselineStandardId: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                    disabled={!wizardData.newBaselineDomain}
                  >
                    <option value="">Select Standard</option>
                    {wizardData.newBaselineDomain === 'Operations & Algebraic Thinking' && (
                      <>
                        <option value="K.OA.A.2">K.OA.A.2 - Addition/Subtraction within 10</option>
                        <option value="1.OA.A.1">1.OA.A.1 - Addition/Subtraction within 20</option>
                        <option value="2.OA.A.1">2.OA.A.1 - Addition/Subtraction within 100</option>
                      </>
                    )}
                    {wizardData.newBaselineDomain === 'Counting & Cardinality' && (
                      <>
                        <option value="K.CC.A.1">K.CC.A.1 - Count to 100</option>
                        <option value="K.CC.B.4">K.CC.B.4 - Number relationships</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Data Analysis Section */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-text-primary">Data Analysis</h3>
              
              {/* Upload Assessment Placeholder */}
              <div className="mb-6 p-6 border-2 border-dashed border-border rounded-lg text-center bg-bg-secondary bg-opacity-30">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-green bg-opacity-10 rounded-full mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </div>
                  <h4 className="font-medium text-text-primary mb-1">Upload Assessment Results</h4>
                  <p className="text-sm text-text-secondary mb-3">
                    Drag and drop your assessment files here, or click to browse
                  </p>
                  <button className="btn bg-green text-white text-sm px-4 py-2">
                    Choose Files
                  </button>
                  <p className="text-xs text-text-secondary mt-2">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG
                  </p>
                </div>
              </div>

              {/* Manual Input Options */}
              <div className="space-y-6">
                {/* Assessment Area Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-text-primary">
                    Assessment Area:
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="assessmentArea"
                        value="math"
                        className="mr-2 text-green focus:ring-green"
                      />
                      Math
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="assessmentArea"
                        value="reading"
                        className="mr-2 text-green focus:ring-green"
                      />
                      Reading
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="assessmentArea"
                        value="writing"
                        className="mr-2 text-green focus:ring-green"
                      />
                      Writing
                    </label>
                  </div>
                </div>

                {/* Results Input */}
                <div>
                  <label htmlFor="newBaselineResultsQuantitative" className="block text-sm font-medium mb-1 text-text-primary">
                    Quantitative Results:
                  </label>
                  <textarea
                    id="newBaselineResultsQuantitative"
                    value={wizardData.newBaselineResultsQuantitative}
                    onChange={(e) => setWizardData({ ...wizardData, newBaselineResultsQuantitative: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
                    placeholder="e.g., 4 out of 5 word problems of addition and subtraction correct, 80% accuracy on number identification 1-10"
                  />
                </div>

                <div>
                  <label htmlFor="newBaselineAdditionalInfoQualitative" className="block text-sm font-medium mb-1 text-text-primary">
                    Additional Information and Observational Data:
                  </label>
                  <textarea
                    id="newBaselineAdditionalInfoQualitative"
                    value={wizardData.newBaselineAdditionalInfoQualitative}
                    onChange={(e) => setWizardData({ ...wizardData, newBaselineAdditionalInfoQualitative: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                    placeholder="Describe student behavior during assessment, strategies used, areas of difficulty, strengths observed..."
                  />
                </div>

                <div>
                  <label htmlFor="newBaselineSupportsToIncreaseAccess" className="block text-sm font-medium mb-1 text-text-primary">
                    Accommodations Provided During Assessment:
                  </label>
                  <textarea
                    id="newBaselineSupportsToIncreaseAccess"
                    value={wizardData.newBaselineSupportsToIncreaseAccess}
                    onChange={(e) => setWizardData({ ...wizardData, newBaselineSupportsToIncreaseAccess: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
                    placeholder="List any accommodations provided during the assessment (e.g., extended time, visual aids, manipulatives, etc.)"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Step 6: Student Accommodations and Supports
        return (
          <div className="space-y-8">
            {/* Accommodations Section */}
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-medium mb-3 text-text-primary">Accommodations</h3>
              <p className="text-sm text-text-secondary mb-4">
                Accommodations help students access the same curriculum and meet the same learning goals and expectations as their peers. They change <em>how</em> a student learns, not <em>what</em> they learn.
              </p>
              
              <h4 className="font-medium mb-3 text-text-primary">Select Common Accommodations:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {[
                  'Extended Time',
                  'Preferential Seating',
                  'Visual Aids/Schedules',
                  'Manipulatives',
                  'Frequent Breaks',
                  'Graphic Organizers',
                  'Simplified Directions',
                  'Text-to-Speech',
                  'Speech-to-Text',
                  'Note-taker/Copy of Notes',
                  'Use of Calculator (for specific tasks)',
                  'Small Group Testing',
                  'Reduced Distractions Environment'
                ].map((accommodation) => (
                  <label key={accommodation} className="flex items-center p-2 hover:bg-bg-secondary rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={wizardData.accommodations.includes(accommodation)}
                      onChange={(e) => handleAccommodationChange(accommodation, e.target.checked)}
                      className="mr-3 text-green focus:ring-green"
                    />
                    <span className="text-sm">{accommodation}</span>
                  </label>
                ))}
              </div>
              
              <div>
                <label htmlFor="otherAccommodations" className="block text-sm font-medium mb-1 text-text-primary">
                  Specify Other Accommodations (if any):
                </label>
                <textarea
                  id="otherAccommodations"
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-20"
                  placeholder="Describe any additional accommodations not listed above..."
                />
              </div>
            </div>

            {/* Modifications Section */}
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-medium mb-3 text-text-primary">Modifications</h3>
              <p className="text-sm text-text-secondary mb-4">
                Modifications adjust the learning goals or expectations to match the student's individual needs and abilities. They change <em>what</em> a student is expected to learn or demonstrate.
              </p>
              
              <h4 className="font-medium mb-3 text-text-primary">Select Common Modifications:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {[
                  'Reduced Number of Problems/Tasks',
                  'Modified Curriculum (e.g., below grade-level content)',
                  'Alternative Assessment Format',
                  'Grading Based on IEP Goals/Effort',
                  'Shorter Assignments',
                  'Simplified Content/Text',
                  'Use of Alternate Materials'
                ].map((modification) => (
                  <label key={modification} className="flex items-center p-2 hover:bg-bg-secondary rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={wizardData.modifications.includes(modification)}
                      onChange={(e) => handleModificationChange(modification, e.target.checked)}
                      className="mr-3 text-green focus:ring-green"
                    />
                    <span className="text-sm">{modification}</span>
                  </label>
                ))}
              </div>
              
              <div>
                <label htmlFor="otherModifications" className="block text-sm font-medium mb-1 text-text-primary">
                  Specify Other Modifications (if any):
                </label>
                <textarea
                  id="otherModifications"
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-20"
                  placeholder="Describe any additional modifications not listed above..."
                />
              </div>
            </div>

            {/* Behavioral Supports Section - Conditional */}
            {wizardData.behaviorNeeds === 'yes' && (
              <div className="border-b border-border pb-6">
                <h3 className="text-lg font-medium mb-3 text-text-primary">Behavioral Supports</h3>
                
                <h4 className="font-medium mb-3 text-text-primary">Select Common Behavioral Supports:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {[
                    'First-Then Statements',
                    'Token Board/Reinforcement System',
                    'Scheduled Breaks/Movement Breaks',
                    'Visual Timer',
                    'Positive Phrasing & Redirection',
                    'Check-in/Check-out System',
                    'Clear & Consistent Expectations',
                    'Social Stories/Scripts'
                  ].map((support) => (
                    <label key={support} className="flex items-center p-2 hover:bg-bg-secondary rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={wizardData.behaviorSupports.includes(support)}
                        onChange={(e) => handleBehaviorSupportChange(support, e.target.checked)}
                        className="mr-3 text-green focus:ring-green"
                      />
                      <span className="text-sm">{support}</span>
                    </label>
                  ))}
                </div>
                
                <div>
                  <label htmlFor="otherBehaviorSupports" className="block text-sm font-medium mb-1 text-text-primary">
                    Specify Other Behavioral Supports (if any):
                  </label>
                  <textarea
                    id="otherBehaviorSupports"
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-20"
                    placeholder="Describe any additional behavioral supports not listed above..."
                  />
                </div>
              </div>
            )}

            {/* English Learner Supports Section - Conditional */}
            {wizardData.englishLearnerStatus === 'ELL' && (
              <div>
                <h3 className="text-lg font-medium mb-3 text-text-primary">English Learner (EL) Supports</h3>
                
                <h4 className="font-medium mb-3 text-text-primary">Select Common EL Supports:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {[
                    'Bilingual Dictionary/Glossary',
                    'Visuals/Realia/Manipulatives',
                    'Sentence Frames/Starters',
                    'Native Language Support (when available)',
                    'Simplified Language/Instructions',
                    'Graphic Organizers specifically for ELs',
                    'Peer Tutoring/Partner Work'
                  ].map((support) => (
                    <label key={support} className="flex items-center p-2 hover:bg-bg-secondary rounded transition-colors">
                      <input
                        type="checkbox"
                        className="mr-3 text-green focus:ring-green"
                      />
                      <span className="text-sm">{support}</span>
                    </label>
                  ))}
                </div>
                
                <div>
                  <label htmlFor="elSupports" className="block text-sm font-medium mb-1 text-text-primary">
                    Specify Other EL Supports or Details:
                  </label>
                  <textarea
                    id="elSupports"
                    value={wizardData.elSupports}
                    onChange={(e) => setWizardData({ ...wizardData, elSupports: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-20"
                    placeholder="Describe any additional EL supports or provide details about selected supports..."
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 6: // Step 7: Special Factors
        return (
          <div className="space-y-8">
            {/* Assistive Technology Devices/Services */}
            <div>
              <label className="block text-sm font-medium mb-3 text-text-primary">
                Does the student require assistive technology devices or services?
              </label>
              <div className="flex gap-6 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="assistiveTechNeeded"
                    value="yes"
                    checked={wizardData.assistiveTechNeeded === 'yes'}
                    onChange={(e) => setWizardData({ ...wizardData, assistiveTechNeeded: e.target.value as 'yes' | 'no' })}
                    className="mr-2 text-green focus:ring-green"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="assistiveTechNeeded"
                    value="no"
                    checked={wizardData.assistiveTechNeeded === 'no'}
                    onChange={(e) => setWizardData({ ...wizardData, assistiveTechNeeded: e.target.value as 'yes' | 'no' })}
                    className="mr-2 text-green focus:ring-green"
                  />
                  No
                </label>
              </div>
              
              {wizardData.assistiveTechNeeded === 'yes' && (
                <div>
                  <label htmlFor="assistiveTechRationale" className="block text-sm font-medium mb-1 text-text-primary">
                    Rationale for Assistive Technology:
                  </label>
                  <textarea
                    id="assistiveTechRationale"
                    value={wizardData.assistiveTechRationale}
                    onChange={(e) => setWizardData({ ...wizardData, assistiveTechRationale: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
                    placeholder="Describe the specific devices/services and why they are needed..."
                  />
                </div>
              )}
            </div>

            {/* Blind or Visual Impairment */}
            <div>
              <label className="block text-sm font-medium mb-3 text-text-primary">
                Does the student have a blind or visual impairment that impacts their learning?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="blindVisualImpairment"
                    value="yes"
                    checked={wizardData.blindVisualImpairment === 'yes'}
                    onChange={(e) => setWizardData({ ...wizardData, blindVisualImpairment: e.target.value as 'yes' | 'no' })}
                    className="mr-2 text-green focus:ring-green"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="blindVisualImpairment"
                    value="no"
                    checked={wizardData.blindVisualImpairment === 'no'}
                    onChange={(e) => setWizardData({ ...wizardData, blindVisualImpairment: e.target.value as 'yes' | 'no' })}
                    className="mr-2 text-green focus:ring-green"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Deaf or Hard of Hearing */}
            <div>
              <label className="block text-sm font-medium mb-3 text-text-primary">
                Does the student have a deaf or hard of hearing condition that impacts their learning?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deafHardOfHearing"
                    value="yes"
                    checked={wizardData.deafHardOfHearing === 'yes'}
                    onChange={(e) => setWizardData({ ...wizardData, deafHardOfHearing: e.target.value as 'yes' | 'no' })}
                    className="mr-2 text-green focus:ring-green"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deafHardOfHearing"
                    value="no"
                    checked={wizardData.deafHardOfHearing === 'no'}
                    onChange={(e) => setWizardData({ ...wizardData, deafHardOfHearing: e.target.value as 'yes' | 'no' })}
                    className="mr-2 text-green focus:ring-green"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Behavior Impeding Learning */}
            <div>
              <label className="block text-sm font-medium mb-3 text-text-primary">
                Does the student exhibit behavior that impedes their learning or the learning of others?
              </label>
              <div className="flex gap-6 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="behaviorImpedingLearning"
                    value="yes"
                    checked={wizardData.behaviorImpedingLearning === 'yes'}
                    onChange={(e) => setWizardData({ ...wizardData, behaviorImpedingLearning: e.target.value as 'yes' | 'no' })}
                    className="mr-2 text-green focus:ring-green"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="behaviorImpedingLearning"
                    value="no"
                    checked={wizardData.behaviorImpedingLearning === 'no'}
                    onChange={(e) => setWizardData({ ...wizardData, behaviorImpedingLearning: e.target.value as 'yes' | 'no' })}
                    className="mr-2 text-green focus:ring-green"
                  />
                  No
                </label>
              </div>
              
              {wizardData.behaviorImpedingLearning === 'yes' && (
                <div>
                  <label htmlFor="behaviorInterventionsStrategies" className="block text-sm font-medium mb-1 text-text-primary">
                    Interventions, Strategies, and Supports for Behavior:
                  </label>
                  <textarea
                    id="behaviorInterventionsStrategies"
                    value={wizardData.behaviorInterventionsStrategies}
                    onChange={(e) => setWizardData({ ...wizardData, behaviorInterventionsStrategies: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                    placeholder="Describe the positive behavioral interventions, strategies, and supports to be implemented..."
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 7: return <div>Content for Step 8: Draft Present Levels (Coming Soon)</div>;
      case 8: return <div>Content for Step 9: Propose IEP Goals & Objectives (Coming Soon)</div>;
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
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleStartWizard}
            disabled={!selectedStudentId}
            className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-3.5 bg-green text-white rounded-lg sm:rounded-xl font-medium text-base sm:text-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-green/30 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Brain size={20} sm:size={24} />
            Let's Start Building
            <ArrowRight size={20} sm:size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalWriting;