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
  Trash2,
  Upload,
  FileUp,
  ChevronDown,
} from 'lucide-react';

// Mock students data - used both on main page and Step 1
const mockStudents = [
  { id: 's1', name: 'Alex Chen', grade: '3rd', disability: 'Specific Learning Disability' },
  { id: 's2', name: 'Maria Rodriguez', grade: '5th', disability: 'Autism Spectrum Disorder' },
  { id: 's3', name: 'Jordan Williams', grade: '2nd', disability: 'Speech or Language Impairment' },
  { id: 's4', name: 'Emma Thompson', grade: '4th', disability: 'Intellectual Disability' },
  { id: 's5', name: 'Kai Patel', grade: '1st', disability: 'Multiple Disabilities' },
  { id: 's6', name: 'Sofia Martinez', grade: 'K', disability: 'Developmental Delay' },
];

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
      growth: string[];
      anecdotalStrengths: string;
      anecdotalGrowth: string;
    };
  };
  generalEducationPerformance: string;
  generalEducationTeacherInput: string;

  // Step 4: Existing Student Data Input
  formativeAssessment: 'NWEA' | 'SANDI' | '';
  nweaData: {
    reading: { ritScore: string; percentilePeers: string; growthPercentile: string };
    math: { ritScore: string; percentilePeers: string; growthPercentile: string };
  };
  sandiData: {
    reading: { score: string; level: '1' | '2' | '3' | '' };
    writing: { score: string; level: '1' | '2' | '3' | '' };
    math: { score: string; level: '1' | '2' | '3' | '' };
    communication: { score: string; level: '1' | '2' | '3' | '' };
  };
  statewideAssessment: 'CAASP' | 'CAA' | '';
  caaspData: {
    math: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | '';
    ela: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | '';
  };
  elpacTaken: 'yes' | 'no' | '';
  elpacData: {
    overall: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | '';
    oral: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | '';
    written: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | '';
  };

  // Step 5: New Baseline Data Analysis
  recommendedAssessments: Array<{
    domain: string;
    standard: string;
    rationale: string;
    assessmentLevel: string;
  }>;
  manualDataEntries: Array<{
    area: 'math' | 'reading' | 'writing';
    domain: string;
    results: string;
    additionalInfo: string;
    accommodations: string;
  }>;
  uploadedFiles: File[];

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
    selectedAreas: [],
    strengthsAndGrowthData: {},
    generalEducationPerformance: '',
    generalEducationTeacherInput: '',
    formativeAssessment: '',
    nweaData: {
      reading: { ritScore: '', percentilePeers: '', growthPercentile: '' },
      math: { ritScore: '', percentilePeers: '', growthPercentile: '' }
    },
    sandiData: {
      reading: { score: '', level: '' },
      writing: { score: '', level: '' },
      math: { score: '', level: '' },
      communication: { score: '', level: '' }
    },
    statewideAssessment: '',
    caaspData: { math: '', ela: '' },
    elpacTaken: '',
    elpacData: { overall: '', oral: '', written: '' },
    recommendedAssessments: [],
    manualDataEntries: [],
    uploadedFiles: [],
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
    { id: 2, title: 'Qualitative Student Data', description: 'Gather qualitative information.', icon: <Settings className="text-green" size={24} /> },
    { id: 3, title: 'Quantitative Student Data', description: 'Input data from various assessments.', icon: <BarChart2 className="text-green" size={24} /> },
    { id: 4, title: 'Baseline Assessments & Data Analysis', description: 'AI recommendations and baseline data input.', icon: <Microscope className="text-green" size={24} /> },
    { id: 5, title: 'Student Accommodations & Supports', description: 'Define supports for the student.', icon: <ShieldCheck className="text-green" size={24} /> },
    { id: 6, title: 'Special Factors', description: 'Address specific considerations.', icon: <Edit3 className="text-green" size={24} /> },
    { id: 7, title: 'Present Levels', description: 'AI will help synthesize data into a PLOP.', icon: <IEPFileTextIcon className="text-green" size={24} /> },
    { id: 8, title: 'Goal Proposal', description: 'AI will recommend goals.', icon: <GoalTargetIcon className="text-green" size={24} /> },
    { id: 9, title: 'Related Services', description: 'Document related services.', icon: <Handshake className="text-green" size={24} /> },
  ];

  const gradeOptions = ['K', '1', '2', '3', '4', '5']; // Moved here for renderWizardStep

  // UPDATED handleStartWizard to reset ALL new fields and pre-populate student data
  const handleStartWizard = () => {
    const selectedStudent = mockStudents.find(s => s.id === selectedStudentId);
    
    setShowWizard(true);
    setCurrentStep(0);
    setWizardData({
      // Pre-populate student data if selected
      studentName: selectedStudent?.name || '',
      currentGradeLevel: selectedStudent?.grade.replace(/\D/g, '') || 'K', // Extract number from grade
      schoolName: '', 
      primaryDisability: selectedStudent?.disability || '', 
      secondaryDisability: '', 
      studentInterestsGeneralInfo: '', 
      englishLearnerStatus: '',
      previousGoalDomain: '', previousGoalStandardId: '', previousGoalAnnualGoalText: '', previousGoalProgressStatus: '', previousGoalContinuedNeed: '', showPreviousObjectives: false, previousObjective1Text: '', previousObjective1Status: '', previousObjective2Text: '', previousObjective2Status: '', previousObjective3Text: '', previousObjective3Status: '',
      selectedAreas: [], strengthsAndGrowthData: {}, generalEducationPerformance: '', generalEducationTeacherInput: '',
      formativeAssessment: '', nweaData: { reading: { ritScore: '', percentilePeers: '', growthPercentile: '' }, math: { ritScore: '', percentilePeers: '', growthPercentile: '' } }, sandiData: { reading: { score: '', level: '' }, writing: { score: '', level: '' }, math: { score: '', level: '' }, communication: { score: '', level: '' } }, statewideAssessment: '', caaspData: { math: '', ela: '' }, elpacTaken: '', elpacData: { overall: '', oral: '', written: '' },
      recommendedAssessments: [], manualDataEntries: [], uploadedFiles: [],
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
      baseline: wizardData.manualDataEntries.length > 0 ? wizardData.manualDataEntries[0].results : 'Baseline to be determined from Step 5 data.',
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

  // Domain mappings for different areas and grade levels
  const getDomainsByAreaAndGrade = (area: string, grade: string): string[] => {
    const gradeNum = grade === 'K' ? 0 : parseInt(grade);
    
    switch (area) {
      case 'math':
        if (gradeNum === 0) { // Kindergarten
          return ['Counting & Cardinality', 'Geometry', 'Measurement & Data', 'Numbers & Operations in Base Ten', 'Operations & Algebraic Thinking'];
        } else if (gradeNum >= 1 && gradeNum <= 5) {
          return ['Geometry', 'Measurement & Data', 'Numbers & Operations in Base Ten', 'Operations & Algebraic Thinking'];
        }
        break;
      case 'reading':
        return ['Phonological Awareness', 'Phonics & Word Recognition', 'Fluency', 'Comprehension', 'Vocabulary'];
      case 'writing':
        return ['Text Types & Purposes', 'Production & Distribution of Writing', 'Research to Build Knowledge', 'Language Conventions'];
      case 'social emotional/behavioral':
        return ['Self-Awareness', 'Self-Management', 'Social Awareness', 'Relationship Skills', 'Responsible Decision-Making'];
      case 'vocational':
        return ['Work Habits', 'Job Skills', 'Safety Awareness', 'Communication in Workplace'];
      case 'adaptive/daily living skills':
        return ['Personal Care', 'Domestic Skills', 'Community Use', 'Safety Skills'];
      case 'communication':
        return ['Receptive Language', 'Expressive Language', 'Pragmatic Language', 'Articulation'];
      case 'fine/gross motor':
        return ['Fine Motor Skills', 'Gross Motor Skills', 'Motor Planning', 'Sensory Integration'];
      default:
        return [];
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
              <select
                id="studentName"
                value={wizardData.studentName}
                onChange={(e) => {
                  const selectedStudent = mockStudents.find(s => s.name === e.target.value);
                  setWizardData({ 
                    ...wizardData, 
                    studentName: e.target.value,
                    currentGradeLevel: selectedStudent?.grade.replace(/\D/g, '') || wizardData.currentGradeLevel,
                    primaryDisability: selectedStudent?.disability || wizardData.primaryDisability
                  });
                }}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
              >
                <option value="">Select a student</option>
                {mockStudents.map(student => (
                  <option key={student.id} value={student.name}>{student.name}</option>
                ))}
              </select>
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
        return <div>Content for Step 2: Previous IEP Goals Review (Coming Soon)</div>;
      
      case 2: // Step 3: Qualitative Student Data
        return (
          <div className="space-y-8">
            {/* Student Strengths and Areas of Growth */}
            <div>
              <h3 className="text-lg font-medium mb-4">Student Strengths and Areas of Growth</h3>
              
              {/* Area Selection Dropdown */}
              <div className="mb-6">
                <label htmlFor="areaSelect" className="block text-sm font-medium mb-2">
                  Select Area to Assess:
                </label>
                <select
                  id="areaSelect"
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                  onChange={(e) => {
                    const area = e.target.value;
                    if (area && !wizardData.selectedAreas.includes(area)) {
                      setWizardData({
                        ...wizardData,
                        selectedAreas: [...wizardData.selectedAreas, area],
                        strengthsAndGrowthData: {
                          ...wizardData.strengthsAndGrowthData,
                          [area]: {
                            strengths: [],
                            growth: [],
                            anecdotalStrengths: '',
                            anecdotalGrowth: ''
                          }
                        }
                      });
                    }
                    e.target.value = ''; // Reset dropdown
                  }}
                >
                  <option value="">Choose an area...</option>
                  <option value="reading">Reading</option>
                  <option value="writing">Writing</option>
                  <option value="math">Math</option>
                  <option value="social emotional/behavioral">Social Emotional/Behavioral</option>
                  <option value="vocational">Vocational</option>
                  <option value="adaptive/daily living skills">Adaptive/Daily Living Skills</option>
                  <option value="communication">Communication</option>
                  <option value="fine/gross motor">Fine/Gross Motor</option>
                </select>
              </div>

              {/* Display Selected Areas */}
              {wizardData.selectedAreas.map((area) => {
                const domains = getDomainsByAreaAndGrade(area, wizardData.currentGradeLevel);
                const areaData = wizardData.strengthsAndGrowthData[area] || { strengths: [], growth: [], anecdotalStrengths: '', anecdotalGrowth: '' };

                return (
                  <div key={area} className="mb-8 p-6 border border-border rounded-lg bg-bg-secondary">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium capitalize">{area}</h4>
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
                        Remove Area
                      </button>
                    </div>

                    {/* Domain Buttons */}
                    <div className="mb-6">
                      <p className="text-sm text-text-secondary mb-3">
                        Click once for <span className="text-green font-medium">Strength</span>, twice for <span className="text-orange-500 font-medium">Area of Growth</span>:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {domains.map((domain) => {
                          const isStrength = areaData.strengths.includes(domain);
                          const isGrowth = areaData.growth.includes(domain);
                          
                          return (
                            <button
                              key={domain}
                              onClick={() => {
                                const newAreaData = { ...areaData };
                                
                                if (!isStrength && !isGrowth) {
                                  // First click - add to strengths
                                  newAreaData.strengths = [...newAreaData.strengths, domain];
                                } else if (isStrength && !isGrowth) {
                                  // Second click - move to growth
                                  newAreaData.strengths = newAreaData.strengths.filter(s => s !== domain);
                                  newAreaData.growth = [...newAreaData.growth, domain];
                                } else if (isGrowth) {
                                  // Third click - remove completely
                                  newAreaData.growth = newAreaData.growth.filter(g => g !== domain);
                                }
                                
                                setWizardData({
                                  ...wizardData,
                                  strengthsAndGrowthData: {
                                    ...wizardData.strengthsAndGrowthData,
                                    [area]: newAreaData
                                  }
                                });
                              }}
                              className={`p-3 text-sm rounded-lg border-2 transition-all ${
                                isStrength 
                                  ? 'bg-green text-white border-green' 
                                  : isGrowth 
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'bg-bg-primary border-border hover:border-green'
                              }`}
                            >
                              {domain}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Anecdotal Data Text Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
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
                          className="w-full p-3 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
                          placeholder={`Example: Student demonstrates strong ${area} skills when...`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
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
                          className="w-full p-3 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-24"
                          placeholder={`Example: Student needs support with ${area} when...`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Student Performance in General Education */}
            <div>
              <h3 className="text-lg font-medium mb-4">Student Performance in General Education</h3>
              <textarea
                value={wizardData.generalEducationPerformance}
                onChange={(e) => setWizardData({ ...wizardData, generalEducationPerformance: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                placeholder="Example: Student participates actively in whole group instruction, requires visual supports for independent work, demonstrates understanding through verbal responses..."
              />
            </div>

            {/* General Education Teacher Input */}
            <div>
              <h3 className="text-lg font-medium mb-4">General Education Teacher Input</h3>
              <textarea
                value={wizardData.generalEducationTeacherInput}
                onChange={(e) => setWizardData({ ...wizardData, generalEducationTeacherInput: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                placeholder="Example: Teacher reports that student works well in small groups, benefits from extended time on assignments, shows improvement in reading fluency with daily practice..."
              />
            </div>
          </div>
        );
      
      case 3: // Step 4: Quantitative Student Data
        return (
          <div className="space-y-8">
            {/* Formative Assessment Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Formative Assessment Data</h3>
              
              <div className="mb-6">
                <label htmlFor="formativeAssessment" className="block text-sm font-medium mb-2">
                  Select Formative Assessment:
                </label>
                <select
                  id="formativeAssessment"
                  value={wizardData.formativeAssessment}
                  onChange={(e) => setWizardData({ ...wizardData, formativeAssessment: e.target.value as 'NWEA' | 'SANDI' | '' })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                >
                  <option value="">Select Assessment</option>
                  <option value="NWEA">NWEA</option>
                  <option value="SANDI">SANDI</option>
                </select>
              </div>

              {/* NWEA Data Input */}
              {wizardData.formativeAssessment === 'NWEA' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-border rounded-lg bg-bg-secondary">
                  <div>
                    <h4 className="font-medium mb-3">Reading</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="RIT Score"
                        value={wizardData.nweaData.reading.ritScore}
                        onChange={(e) => setWizardData({
                          ...wizardData,
                          nweaData: {
                            ...wizardData.nweaData,
                            reading: { ...wizardData.nweaData.reading, ritScore: e.target.value }
                          }
                        })}
                        className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      />
                      <input
                        type="text"
                        placeholder="% Compared to Peers"
                        value={wizardData.nweaData.reading.percentilePeers}
                        onChange={(e) => setWizardData({
                          ...wizardData,
                          nweaData: {
                            ...wizardData.nweaData,
                            reading: { ...wizardData.nweaData.reading, percentilePeers: e.target.value }
                          }
                        })}
                        className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      />
                      <input
                        type="text"
                        placeholder="Growth %"
                        value={wizardData.nweaData.reading.growthPercentile}
                        onChange={(e) => setWizardData({
                          ...wizardData,
                          nweaData: {
                            ...wizardData.nweaData,
                            reading: { ...wizardData.nweaData.reading, growthPercentile: e.target.value }
                          }
                        })}
                        className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Math</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="RIT Score"
                        value={wizardData.nweaData.math.ritScore}
                        onChange={(e) => setWizardData({
                          ...wizardData,
                          nweaData: {
                            ...wizardData.nweaData,
                            math: { ...wizardData.nweaData.math, ritScore: e.target.value }
                          }
                        })}
                        className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      />
                      <input
                        type="text"
                        placeholder="% Compared to Peers"
                        value={wizardData.nweaData.math.percentilePeers}
                        onChange={(e) => setWizardData({
                          ...wizardData,
                          nweaData: {
                            ...wizardData.nweaData,
                            math: { ...wizardData.nweaData.math, percentilePeers: e.target.value }
                          }
                        })}
                        className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      />
                      <input
                        type="text"
                        placeholder="Growth %"
                        value={wizardData.nweaData.math.growthPercentile}
                        onChange={(e) => setWizardData({
                          ...wizardData,
                          nweaData: {
                            ...wizardData.nweaData,
                            math: { ...wizardData.nweaData.math, growthPercentile: e.target.value }
                          }
                        })}
                        className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SANDI Data Input */}
              {wizardData.formativeAssessment === 'SANDI' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-bg-secondary">
                  {['reading', 'writing', 'math', 'communication'].map((subject) => (
                    <div key={subject}>
                      <h4 className="font-medium mb-3 capitalize">{subject}</h4>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Score"
                          value={wizardData.sandiData[subject as keyof typeof wizardData.sandiData].score}
                          onChange={(e) => setWizardData({
                            ...wizardData,
                            sandiData: {
                              ...wizardData.sandiData,
                              [subject]: { ...wizardData.sandiData[subject as keyof typeof wizardData.sandiData], score: e.target.value }
                            }
                          })}
                          className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                        />
                        <select
                          value={wizardData.sandiData[subject as keyof typeof wizardData.sandiData].level}
                          onChange={(e) => setWizardData({
                            ...wizardData,
                            sandiData: {
                              ...wizardData.sandiData,
                              [subject]: { ...wizardData.sandiData[subject as keyof typeof wizardData.sandiData], level: e.target.value as '1' | '2' | '3' | '' }
                            }
                          })}
                          className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                        >
                          <option value="">Select Level</option>
                          <option value="1">Level 1</option>
                          <option value="2">Level 2</option>
                          <option value="3">Level 3</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Statewide Assessment Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Statewide Assessment Scores</h3>
              
              <div className="mb-6">
                <label htmlFor="statewideAssessment" className="block text-sm font-medium mb-2">
                  Select Statewide Assessment:
                </label>
                <select
                  id="statewideAssessment"
                  value={wizardData.statewideAssessment}
                  onChange={(e) => setWizardData({ ...wizardData, statewideAssessment: e.target.value as 'CAASP' | 'CAA' | '' })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                >
                  <option value="">Select Assessment</option>
                  <option value="CAASP">CAASP</option>
                  <option value="CAA">CAA</option>
                </select>
              </div>

              {/* CAASP Data Input */}
              {wizardData.statewideAssessment === 'CAASP' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-border rounded-lg bg-bg-secondary">
                  <div>
                    <label className="block text-sm font-medium mb-2">Math Overall Score:</label>
                    <select
                      value={wizardData.caaspData.math}
                      onChange={(e) => setWizardData({
                        ...wizardData,
                        caaspData: { ...wizardData.caaspData, math: e.target.value as any }
                      })}
                      className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                    >
                      <option value="">Select Score</option>
                      <option value="Level 1">Standard Not Met (Level 1)</option>
                      <option value="Level 2">Standard Nearly Met (Level 2)</option>
                      <option value="Level 3">Standard Met (Level 3)</option>
                      <option value="Level 4">Standard Exceeded (Level 4)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">English/Language Arts Overall Score:</label>
                    <select
                      value={wizardData.caaspData.ela}
                      onChange={(e) => setWizardData({
                        ...wizardData,
                        caaspData: { ...wizardData.caaspData, ela: e.target.value as any }
                      })}
                      className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                    >
                      <option value="">Select Score</option>
                      <option value="Level 1">Standard Not Met (Level 1)</option>
                      <option value="Level 2">Standard Nearly Met (Level 2)</option>
                      <option value="Level 3">Standard Met (Level 3)</option>
                      <option value="Level 4">Standard Exceeded (Level 4)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* ELPAC Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">ELPAC Scores</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Did the student take ELPAC?</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="elpacTaken"
                      value="yes"
                      checked={wizardData.elpacTaken === 'yes'}
                      onChange={(e) => setWizardData({ ...wizardData, elpacTaken: e.target.value as 'yes' | 'no' })}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="elpacTaken"
                      value="no"
                      checked={wizardData.elpacTaken === 'no'}
                      onChange={(e) => setWizardData({ ...wizardData, elpacTaken: e.target.value as 'yes' | 'no' })}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* ELPAC Data Input */}
              {wizardData.elpacTaken === 'yes' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-border rounded-lg bg-bg-secondary">
                  {[
                    { key: 'overall', label: 'Overall Score' },
                    { key: 'oral', label: 'Oral Language Score' },
                    { key: 'written', label: 'Written Language Score' }
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-2">{label}:</label>
                      <select
                        value={wizardData.elpacData[key as keyof typeof wizardData.elpacData]}
                        onChange={(e) => setWizardData({
                          ...wizardData,
                          elpacData: {
                            ...wizardData.elpacData,
                            [key]: e.target.value
                          }
                        })}
                        className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      >
                        <option value="">Select Level</option>
                        <option value="Level 1">Beginning to Develop (Level 1)</option>
                        <option value="Level 2">Somewhat Developed (Level 2)</option>
                        <option value="Level 3">Moderately Developed (Level 3)</option>
                        <option value="Level 4">Well Developed (Level 4)</option>
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      
      case 4: // Step 5: Baseline Assessments & Data Analysis
        // Generate AI recommendations based on previous steps
        const generateRecommendations = () => {
          const recommendations: Array<{
            domain: string;
            standard: string;
            rationale: string;
            assessmentLevel: string;
          }> = [];

          // Check previous goal data for continued needs
          if (wizardData.previousGoalContinuedNeed === 'yes' && wizardData.previousGoalDomain) {
            recommendations.push({
              domain: wizardData.previousGoalDomain,
              standard: `${wizardData.currentGradeLevel}.${wizardData.previousGoalDomain.substring(0, 3).toUpperCase()}.1`,
              rationale: `Previous IEP goal in ${wizardData.previousGoalDomain} shows continued need based on ${wizardData.previousGoalProgressStatus} progress status.`,
              assessmentLevel: wizardData.currentGradeLevel
            });
          }

          // Check qualitative data for areas of growth
          Object.entries(wizardData.strengthsAndGrowthData).forEach(([area, data]) => {
            if (data.growth && data.growth.length > 0) {
              data.growth.forEach(domain => {
                recommendations.push({
                  domain: domain,
                  standard: `${wizardData.currentGradeLevel}.${area.substring(0, 3).toUpperCase()}.${domain.substring(0, 2)}`,
                  rationale: `Identified as area of growth in qualitative assessment. ${data.anecdotalGrowth ? 'Teacher notes: ' + data.anecdotalGrowth.substring(0, 50) + '...' : ''}`,
                  assessmentLevel: wizardData.currentGradeLevel
                });
              });
            }
          });

          // Check quantitative data for low performance
          if (wizardData.formativeAssessment === 'NWEA') {
            if (wizardData.nweaData.math.percentilePeers && parseInt(wizardData.nweaData.math.percentilePeers) < 25) {
              recommendations.push({
                domain: 'Operations & Algebraic Thinking',
                standard: `${wizardData.currentGradeLevel}.OA.1`,
                rationale: `NWEA Math score at ${wizardData.nweaData.math.percentilePeers}th percentile indicates need for targeted assessment in foundational math skills.`,
                assessmentLevel: wizardData.currentGradeLevel
              });
            }
            if (wizardData.nweaData.reading.percentilePeers && parseInt(wizardData.nweaData.reading.percentilePeers) < 25) {
              recommendations.push({
                domain: 'Reading Comprehension',
                standard: `${wizardData.currentGradeLevel}.RL.1`,
                rationale: `NWEA Reading score at ${wizardData.nweaData.reading.percentilePeers}th percentile indicates need for targeted assessment in reading comprehension.`,
                assessmentLevel: wizardData.currentGradeLevel
              });
            }
          }

          return recommendations;
        };

        const recommendations = generateRecommendations();

        return (
          <div className="space-y-8">
            {/* AI Baseline Assessment Recommendations */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Brain className="text-green" size={20} />
                AI Baseline Assessment Recommendations
              </h3>
              
              {recommendations.length > 0 ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green bg-opacity-10 border border-green rounded-lg">
                    <p className="text-sm text-green mb-3">
                      <strong>🤖 AI Analysis:</strong> Based on your input from Steps 2-4, I recommend the following baseline assessments:
                    </p>
                  </div>
                  
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg bg-bg-secondary">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-green">{rec.domain}</h4>
                        <span className="text-xs bg-green text-white px-2 py-1 rounded">
                          Grade {rec.assessmentLevel} Level
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">
                        <strong>Aligned Standard:</strong> {rec.standard}
                      </p>
                      <p className="text-sm">
                        <strong>Rationale:</strong> {rec.rationale}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button className="text-xs bg-green text-white px-3 py-1 rounded hover:bg-opacity-90">
                          Create Assessment
                        </button>
                        <button className="text-xs border border-green text-green px-3 py-1 rounded hover:bg-green hover:bg-opacity-10">
                          View Standard Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 border border-border rounded-lg bg-bg-secondary text-center">
                  <Brain className="text-text-secondary mx-auto mb-2" size={32} />
                  <p className="text-text-secondary">
                    Complete Steps 2-4 to receive AI-powered baseline assessment recommendations.
                  </p>
                </div>
              )}
            </div>

            {/* Data Analysis Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Data Analysis</h3>
              
              {/* Upload Assessment Option */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Upload Assessment Data</h4>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-bg-secondary hover:border-green transition-colors">
                  <FileUp className="text-text-secondary mx-auto mb-2" size={32} />
                  <p className="text-text-secondary mb-2">Drag and drop assessment files here, or click to browse</p>
                  <p className="text-xs text-text-secondary">Supports PDF, DOC, XLS files</p>
                  <button className="mt-3 btn bg-accent-green text-xs">
                    <Upload size={14} className="mr-1" />
                    Upload Files
                  </button>
                </div>
              </div>

              {/* Manual Data Entry */}
              <div>
                <h4 className="font-medium mb-3">Manual Data Entry</h4>
                
                {wizardData.manualDataEntries.map((entry, index) => (
                  <div key={index} className="mb-4 p-4 border border-border rounded-lg bg-bg-secondary">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium capitalize">{entry.area} - {entry.domain}</h5>
                      <button
                        onClick={() => {
                          const newEntries = wizardData.manualDataEntries.filter((_, i) => i !== index);
                          setWizardData({ ...wizardData, manualDataEntries: newEntries });
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Results:</label>
                        <textarea
                          value={entry.results}
                          onChange={(e) => {
                            const newEntries = [...wizardData.manualDataEntries];
                            newEntries[index] = { ...entry, results: e.target.value };
                            setWizardData({ ...wizardData, manualDataEntries: newEntries });
                          }}
                          className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green h-20"
                          placeholder="e.g., 4 out of 5 word problems correct"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Additional Information:</label>
                        <textarea
                          value={entry.additionalInfo}
                          onChange={(e) => {
                            const newEntries = [...wizardData.manualDataEntries];
                            newEntries[index] = { ...entry, additionalInfo: e.target.value };
                            setWizardData({ ...wizardData, manualDataEntries: newEntries });
                          }}
                          className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green h-20"
                          placeholder="Observational data, context, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Accommodations Provided:</label>
                        <textarea
                          value={entry.accommodations}
                          onChange={(e) => {
                            const newEntries = [...wizardData.manualDataEntries];
                            newEntries[index] = { ...entry, accommodations: e.target.value };
                            setWizardData({ ...wizardData, manualDataEntries: newEntries });
                          }}
                          className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green h-20"
                          placeholder="Extended time, visual supports, etc."
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Entry Form */}
                <div className="p-4 border border-border rounded-lg bg-bg-secondary">
                  <h5 className="font-medium mb-3">Add New Assessment Data</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Assessment Area:</label>
                      <select
                        id="newEntryArea"
                        className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      >
                        <option value="">Select Area</option>
                        <option value="math">Math</option>
                        <option value="reading">Reading</option>
                        <option value="writing">Writing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Domain Area:</label>
                      <select
                        id="newEntryDomain"
                        className="w-full p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      >
                        <option value="">Select Domain</option>
                        <option value="Operations & Algebraic Thinking">Operations & Algebraic Thinking</option>
                        <option value="Numbers & Operations in Base Ten">Numbers & Operations in Base Ten</option>
                        <option value="Measurement & Data">Measurement & Data</option>
                        <option value="Geometry">Geometry</option>
                        <option value="Reading Comprehension">Reading Comprehension</option>
                        <option value="Phonics & Word Recognition">Phonics & Word Recognition</option>
                        <option value="Fluency">Fluency</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const areaSelect = document.getElementById('newEntryArea') as HTMLSelectElement;
                      const domainSelect = document.getElementById('newEntryDomain') as HTMLSelectElement;
                      
                      if (areaSelect.value && domainSelect.value) {
                        const newEntry = {
                          area: areaSelect.value as 'math' | 'reading' | 'writing',
                          domain: domainSelect.value,
                          results: '',
                          additionalInfo: '',
                          accommodations: ''
                        };
                        setWizardData({
                          ...wizardData,
                          manualDataEntries: [...wizardData.manualDataEntries, newEntry]
                        });
                        areaSelect.value = '';
                        domainSelect.value = '';
                      }
                    }}
                    className="btn bg-accent-green text-sm"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Assessment Entry
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 5: return <div>Content for Step 6: Student Accommodations & Supports (Coming Soon)</div>;
      case 6: return <div>Content for Step 7: Special Factors (Coming Soon)</div>;
      case 7: return <div>Content for Step 8: Present Levels (Coming Soon)</div>;
      
      case 8: // Step 9: Goal Proposal (with SMART tips moved here)
        return (
          <div className="space-y-8">
            {/* Goal Proposal Content */}
            <div>
              <h3 className="text-lg font-medium mb-4">AI-Generated Goal Proposal</h3>
              <div className="p-4 bg-green bg-opacity-10 border border-green rounded-lg mb-6">
                <p className="text-sm text-green">
                  <strong>🤖 AI Analysis:</strong> Based on your comprehensive data input, here are the recommended IEP goals:
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Annual Goal:</label>
                  <textarea
                    value={wizardData.draftAnnualGoal}
                    onChange={(e) => setWizardData({ ...wizardData, draftAnnualGoal: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green h-24"
                    placeholder="AI will generate a SMART annual goal based on your data..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Objective 1:</label>
                    <textarea
                      value={wizardData.draftObjective1}
                      onChange={(e) => setWizardData({ ...wizardData, draftObjective1: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green h-20"
                      placeholder="Short-term objective..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Objective 2:</label>
                    <textarea
                      value={wizardData.draftObjective2}
                      onChange={(e) => setWizardData({ ...wizardData, draftObjective2: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green h-20"
                      placeholder="Short-term objective..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Objective 3:</label>
                    <textarea
                      value={wizardData.draftObjective3}
                      onChange={(e) => setWizardData({ ...wizardData, draftObjective3: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green h-20"
                      placeholder="Short-term objective..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SMART Goal Writing Tips (moved from main page) */}
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
          <div className="mb-6 sm:mb-8 max-w-md mx-auto">
            <label htmlFor="studentSelect" className="block text-sm font-medium mb-2 text-text-primary">
              Select Student:
            </label>
            <div className="relative">
              <select
                id="studentSelect"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors appearance-none pr-10"
              >
                <option value="">Choose a student...</option>
                {mockStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.grade} Grade
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" size={20} />
            </div>
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
          
          {!selectedStudentId && (
            <p className="text-xs text-text-secondary mt-3">
              Please select a student to begin the IEP development process
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalWriting;