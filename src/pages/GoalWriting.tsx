import React, { useState } from 'react';
import {
  User, // For Step 1 Icon
  BookOpen, // For Step 2 Icon
  Settings, // For Step 3 Icon
  BarChart2, // For Step 4 Icon
  Microscope, // For Step 5 Icon
  ShieldCheck, // For Step 6 Icon
  Edit3, // For Step 7 Icon
  FileText as IEPFileTextIcon, // For Step 8 Icon (Present Levels) - aliased
  Target as GoalTargetIcon, // For Step 9 Icon (Goal Proposal) - aliased, also used on main page
  Handshake, // For Step 10 Icon
  Lightbulb, // For SMART tips on main page
  Brain, // For Hero button on main page & old wizard icon
  Sparkles, // For Hero button on main page & old wizard icon & wizard navigation
  Check, // For Wizard progress
  ArrowLeft, // For Wizard navigation
  ArrowRight, // For Wizard navigation
  Plus, // For adding new areas
  X, // For removing areas
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

interface StrengthGrowthEntry {
  id: string;
  mainDomain: string; // e.g., "Math", "Reading"
  ccssDomainsStatus: Array<{ domainName: string; status: 'strength' | 'growth' | 'unselected' }>;
  strengthsAnecdotal: string;
  growthAreasAnecdotal: string;
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

  // Step 3: Qualitative Student Data
  strengthGrowthEntries: StrengthGrowthEntry[];
  studentPerformanceInGE: string;
  generalEducationTeacherInput: string;

  // Step 4: Quantitative Student Data
  benchmarkAssessmentType: 'NWEA' | 'Curriculum-Based' | 'Benchmark' | 'Other' | '';
  benchmarkAssessmentOtherName: string;
  benchmarkDataManualInput: string;
  nweaRitScore: string;
  nweaPercentilePeers: string;
  nweaGrowthPercentile: string;
  statewideAssessmentType: 'SBAC' | 'CAA' | '';
  statewideAssessmentScores: string;
  elpacScores: string;

  // Step 5: Data Analysis
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
    strengthGrowthEntries: [],
    studentPerformanceInGE: '',
    generalEducationTeacherInput: '',
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

  // UPDATED wizardSteps array for the new 10-step flow with your specified titles
  const wizardSteps: WizardStep[] = [
    { id: 0, title: 'Student Demographics', description: 'Basic information about the student.', icon: <User className="text-green" size={24} /> },
    { id: 1, title: 'Previous IEPs', description: 'Review progress on prior goals.', icon: <BookOpen className="text-green" size={24} /> },
    { id: 2, title: 'Qualitative Student Data', description: 'Gather qualitative information.', icon: <Settings className="text-green" size={24} /> },
    { id: 3, title: 'Quantitative Student Data', description: 'Input data from various assessments.', icon: <BarChart2 className="text-green" size={24} /> },
    { id: 4, title: 'Data Analysis', description: 'Input results from new baseline assessments.', icon: <Microscope className="text-green" size={24} /> },
    { id: 5, title: 'Student Accommodations and Supports', description: 'Define supports for the student.', icon: <ShieldCheck className="text-green" size={24} /> },
    { id: 6, title: 'Special Factors', description: 'Address specific considerations.', icon: <Edit3 className="text-green" size={24} /> },
    { id: 7, title: 'Present Levels', description: 'AI will help synthesize data into a PLOP.', icon: <IEPFileTextIcon className="text-green" size={24} /> },
    { id: 8, title: 'Goal Proposal', description: 'AI will recommend goals.', icon: <GoalTargetIcon className="text-green" size={24} /> },
    { id: 9, title: 'Related Services', description: 'Document related services.', icon: <Handshake className="text-green" size={24} /> },
  ];

  const gradeOptions = ['K', '1', '2', '3', '4', '5'];
  
  // Domain mappings for different areas
  const DOMAIN_MAPPINGS: Record<string, Record<string, string[]>> = {
    'Math': {
      'K': ["Counting & Cardinality", "Operations & Algebraic Thinking", "Number & Operations in Base Ten", "Measurement & Data", "Geometry"],
      '1': ["Operations & Algebraic Thinking", "Number & Operations in Base Ten", "Measurement & Data", "Geometry"],
      '2': ["Operations & Algebraic Thinking", "Number & Operations in Base Ten", "Measurement & Data", "Geometry"],
      '3': ["Operations & Algebraic Thinking", "Number & Operations in Base Ten", "Number & Operations - Fractions", "Measurement & Data", "Geometry"],
      '4': ["Operations & Algebraic Thinking", "Number & Operations in Base Ten", "Number & Operations - Fractions", "Measurement & Data", "Geometry"],
      '5': ["Operations & Algebraic Thinking", "Number & Operations in Base Ten", "Number & Operations - Fractions", "Measurement & Data", "Geometry"]
    },
    'Reading': {
      'K': ["Phonological Awareness", "Print Concepts", "Phonics & Word Recognition", "Fluency", "Comprehension"],
      '1': ["Phonics & Word Recognition", "Fluency", "Comprehension", "Vocabulary"],
      '2': ["Phonics & Word Recognition", "Fluency", "Comprehension", "Vocabulary"],
      '3': ["Phonics & Word Recognition", "Fluency", "Comprehension", "Vocabulary", "Text Analysis"],
      '4': ["Phonics & Word Recognition", "Fluency", "Comprehension", "Vocabulary", "Text Analysis"],
      '5': ["Phonics & Word Recognition", "Fluency", "Comprehension", "Vocabulary", "Text Analysis"]
    },
    'Writing': {
      'K': ["Text Types & Purposes", "Production & Distribution", "Research", "Language Conventions"],
      '1': ["Text Types & Purposes", "Production & Distribution", "Research", "Language Conventions"],
      '2': ["Text Types & Purposes", "Production & Distribution", "Research", "Language Conventions"],
      '3': ["Text Types & Purposes", "Production & Distribution", "Research", "Language Conventions"],
      '4': ["Text Types & Purposes", "Production & Distribution", "Research", "Language Conventions"],
      '5': ["Text Types & Purposes", "Production & Distribution", "Research", "Language Conventions"]
    },
    'Social Emotional/Behavioral': {
      'K': ["Self-Awareness", "Self-Management", "Social Awareness", "Relationship Skills", "Responsible Decision-Making"],
      '1': ["Self-Awareness", "Self-Management", "Social Awareness", "Relationship Skills", "Responsible Decision-Making"],
      '2': ["Self-Awareness", "Self-Management", "Social Awareness", "Relationship Skills", "Responsible Decision-Making"],
      '3': ["Self-Awareness", "Self-Management", "Social Awareness", "Relationship Skills", "Responsible Decision-Making"],
      '4': ["Self-Awareness", "Self-Management", "Social Awareness", "Relationship Skills", "Responsible Decision-Making"],
      '5': ["Self-Awareness", "Self-Management", "Social Awareness", "Relationship Skills", "Responsible Decision-Making"]
    },
    'Vocational': {
      'K': ["Work Habits", "Following Directions", "Task Completion", "Social Skills"],
      '1': ["Work Habits", "Following Directions", "Task Completion", "Social Skills"],
      '2': ["Work Habits", "Following Directions", "Task Completion", "Social Skills", "Basic Job Skills"],
      '3': ["Work Habits", "Following Directions", "Task Completion", "Social Skills", "Basic Job Skills"],
      '4': ["Work Habits", "Following Directions", "Task Completion", "Social Skills", "Basic Job Skills", "Career Exploration"],
      '5': ["Work Habits", "Following Directions", "Task Completion", "Social Skills", "Basic Job Skills", "Career Exploration"]
    },
    'Adaptive/Daily Living Skills': {
      'K': ["Personal Care", "Safety Skills", "Basic Communication", "Following Routines"],
      '1': ["Personal Care", "Safety Skills", "Basic Communication", "Following Routines", "Money Concepts"],
      '2': ["Personal Care", "Safety Skills", "Basic Communication", "Following Routines", "Money Concepts"],
      '3': ["Personal Care", "Safety Skills", "Communication", "Following Routines", "Money Skills", "Time Management"],
      '4': ["Personal Care", "Safety Skills", "Communication", "Following Routines", "Money Skills", "Time Management"],
      '5': ["Personal Care", "Safety Skills", "Communication", "Following Routines", "Money Skills", "Time Management", "Community Skills"]
    },
    'Communication': {
      'K': ["Receptive Language", "Expressive Language", "Social Communication", "Articulation"],
      '1': ["Receptive Language", "Expressive Language", "Social Communication", "Articulation"],
      '2': ["Receptive Language", "Expressive Language", "Social Communication", "Articulation", "Pragmatics"],
      '3': ["Receptive Language", "Expressive Language", "Social Communication", "Articulation", "Pragmatics"],
      '4': ["Receptive Language", "Expressive Language", "Social Communication", "Articulation", "Pragmatics"],
      '5': ["Receptive Language", "Expressive Language", "Social Communication", "Articulation", "Pragmatics"]
    },
    'Fine/Gross Motor': {
      'K': ["Fine Motor Skills", "Gross Motor Skills", "Motor Planning", "Sensory Processing"],
      '1': ["Fine Motor Skills", "Gross Motor Skills", "Motor Planning", "Sensory Processing"],
      '2': ["Fine Motor Skills", "Gross Motor Skills", "Motor Planning", "Sensory Processing"],
      '3': ["Fine Motor Skills", "Gross Motor Skills", "Motor Planning", "Sensory Processing"],
      '4': ["Fine Motor Skills", "Gross Motor Skills", "Motor Planning", "Sensory Processing"],
      '5': ["Fine Motor Skills", "Gross Motor Skills", "Motor Planning", "Sensory Processing"]
    }
  };

  const MAIN_DOMAIN_OPTIONS = [
    'Reading',
    'Writing', 
    'Math',
    'Social Emotional/Behavioral',
    'Vocational',
    'Adaptive/Daily Living Skills',
    'Communication',
    'Fine/Gross Motor'
  ];

  // Helper functions for Step 3
  const addNewStrengthGrowthEntry = () => {
    const newEntry: StrengthGrowthEntry = {
      id: Date.now().toString(),
      mainDomain: '',
      ccssDomainsStatus: [],
      strengthsAnecdotal: '',
      growthAreasAnecdotal: ''
    };
    setWizardData({
      ...wizardData,
      strengthGrowthEntries: [...wizardData.strengthGrowthEntries, newEntry]
    });
  };

  const removeStrengthGrowthEntry = (entryId: string) => {
    setWizardData({
      ...wizardData,
      strengthGrowthEntries: wizardData.strengthGrowthEntries.filter(entry => entry.id !== entryId)
    });
  };

  const updateStrengthGrowthEntry = (entryId: string, updates: Partial<StrengthGrowthEntry>) => {
    setWizardData({
      ...wizardData,
      strengthGrowthEntries: wizardData.strengthGrowthEntries.map(entry =>
        entry.id === entryId ? { ...entry, ...updates } : entry
      )
    });
  };

  const handleDomainSelection = (entryId: string, selectedDomain: string) => {
    const domains = DOMAIN_MAPPINGS[selectedDomain]?.[wizardData.currentGradeLevel] || [];
    const ccssDomainsStatus = domains.map(domain => ({
      domainName: domain,
      status: 'unselected' as const
    }));
    
    updateStrengthGrowthEntry(entryId, {
      mainDomain: selectedDomain,
      ccssDomainsStatus,
      strengthsAnecdotal: '',
      growthAreasAnecdotal: ''
    });
  };

  const toggleDomainStatus = (entryId: string, domainName: string) => {
    const entry = wizardData.strengthGrowthEntries.find(e => e.id === entryId);
    if (!entry) return;

    const updatedDomains = entry.ccssDomainsStatus.map(domain => {
      if (domain.domainName === domainName) {
        const nextStatus = domain.status === 'unselected' ? 'strength' : 
                          domain.status === 'strength' ? 'growth' : 'unselected';
        return { ...domain, status: nextStatus };
      }
      return domain;
    });

    updateStrengthGrowthEntry(entryId, { ccssDomainsStatus: updatedDomains });
  };

  const getAnecdotalPlaceholder = (domain: string, type: 'strengths' | 'growth') => {
    const examples = {
      'Math': {
        strengths: 'e.g., "Student demonstrates strong number sense when working with manipulatives, can count to 20 with accuracy, shows understanding of one-to-one correspondence"',
        growth: 'e.g., "Student struggles with number recognition beyond 10, needs support with basic addition concepts, requires visual aids for problem solving"'
      },
      'Reading': {
        strengths: 'e.g., "Student shows strong phonemic awareness, can identify beginning sounds, demonstrates good listening comprehension when text is read aloud"',
        growth: 'e.g., "Student needs support with letter-sound correspondence, struggles with sight word recognition, requires assistance with reading fluency"'
      },
      'Writing': {
        strengths: 'e.g., "Student can form most letters correctly, shows creativity in storytelling, willing to attempt writing tasks"',
        growth: 'e.g., "Student needs support with spelling patterns, struggles with sentence structure, requires assistance with organizing ideas"'
      },
      'Social Emotional/Behavioral': {
        strengths: 'e.g., "Student shows empathy toward peers, follows classroom routines well, demonstrates good self-regulation during preferred activities"',
        growth: 'e.g., "Student needs support with conflict resolution, struggles with transitions, requires reminders for appropriate social interactions"'
      },
      'Communication': {
        strengths: 'e.g., "Student uses gestures effectively to communicate, shows good receptive language skills, attempts verbal communication"',
        growth: 'e.g., "Student needs support with expressive language, struggles with articulation of certain sounds, requires assistance with social communication"'
      }
    };
    
    return examples[domain as keyof typeof examples]?.[type] || `Describe ${type} in ${domain}...`;
  };

  // UPDATED handleStartWizard to reset ALL new fields
  const handleStartWizard = () => {
    setShowWizard(true);
    setCurrentStep(0);
    setWizardData({
      studentName: '', currentGradeLevel: 'K', schoolName: '', primaryDisability: '', secondaryDisability: '', studentInterestsGeneralInfo: '', englishLearnerStatus: '',
      previousGoalDomain: '', previousGoalStandardId: '', previousGoalAnnualGoalText: '', previousGoalProgressStatus: '', previousGoalContinuedNeed: '', showPreviousObjectives: false, previousObjective1Text: '', previousObjective1Status: '', previousObjective2Text: '', previousObjective2Status: '', previousObjective3Text: '', previousObjective3Status: '',
      strengthGrowthEntries: [], studentPerformanceInGE: '', generalEducationTeacherInput: '',
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
              <div className="mt-6 pt-6 border-t border-border"> {/* Added some top margin/padding and a border for separation */}
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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Student Strengths and Areas of Growth</h3>
                <button
                  onClick={addNewStrengthGrowthEntry}
                  className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  <Plus size={16} />
                  Add Area
                </button>
              </div>

              {wizardData.strengthGrowthEntries.length === 0 && (
                <div className="text-center py-8 text-text-secondary border border-border rounded-lg bg-bg-secondary">
                  <p>No areas added yet. Click "Add Area" to start documenting student strengths and growth areas.</p>
                </div>
              )}

              {wizardData.strengthGrowthEntries.map((entry) => (
                <div key={entry.id} className="border border-border rounded-lg p-6 bg-bg-primary space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-medium text-text-primary">Area Assessment</h4>
                    <button
                      onClick={() => removeStrengthGrowthEntry(entry.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove this area"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Domain Selection Dropdown */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-primary">
                      Select Domain Area:
                    </label>
                    <select
                      value={entry.mainDomain}
                      onChange={(e) => handleDomainSelection(entry.id, e.target.value)}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                    >
                      <option value="">Choose an area...</option>
                      {MAIN_DOMAIN_OPTIONS.map(domain => (
                        <option key={domain} value={domain}>{domain}</option>
                      ))}
                    </select>
                  </div>

                  {/* CCSS Domain Boxes */}
                  {entry.mainDomain && entry.ccssDomainsStatus.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium mb-3 text-text-primary">
                        Click once for Strength (green), twice for Growth Area (orange):
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {entry.ccssDomainsStatus.map((domain) => (
                          <button
                            key={domain.domainName}
                            onClick={() => toggleDomainStatus(entry.id, domain.domainName)}
                            className={`p-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                              domain.status === 'strength' 
                                ? 'bg-green text-white border-green' 
                                : domain.status === 'growth'
                                ? 'bg-orange-500 text-white border-orange-500'
                                : 'bg-bg-secondary border-border text-text-primary hover:border-green'
                            }`}
                          >
                            {domain.domainName}
                            {domain.status === 'strength' && <span className="ml-2">✓</span>}
                            {domain.status === 'growth' && <span className="ml-2">⚠</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Anecdotal Data Text Areas */}
                  {entry.mainDomain && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-text-primary">
                          Anecdotal Data - Strengths in {entry.mainDomain}:
                        </label>
                        <textarea
                          value={entry.strengthsAnecdotal}
                          onChange={(e) => updateStrengthGrowthEntry(entry.id, { strengthsAnecdotal: e.target.value })}
                          className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                          placeholder={getAnecdotalPlaceholder(entry.mainDomain, 'strengths')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-text-primary">
                          Anecdotal Data - Areas of Growth in {entry.mainDomain}:
                        </label>
                        <textarea
                          value={entry.growthAreasAnecdotal}
                          onChange={(e) => updateStrengthGrowthEntry(entry.id, { growthAreasAnecdotal: e.target.value })}
                          className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-32"
                          placeholder={getAnecdotalPlaceholder(entry.mainDomain, 'growth')}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Student Performance in General Education Section */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Student Performance in General Education</h3>
              <div>
                <textarea
                  value={wizardData.studentPerformanceInGE}
                  onChange={(e) => setWizardData({ ...wizardData, studentPerformanceInGE: e.target.value })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-40"
                  placeholder="e.g., 'Student participates in grade-level math instruction with support. Requires visual aids and manipulatives to access content. Shows engagement during small group activities but struggles with independent work completion. Needs frequent breaks and redirection to maintain focus during whole group instruction.'"
                />
              </div>
            </div>

            {/* General Education Teacher Input Section */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">General Education Teacher Input</h3>
              <div>
                <textarea
                  value={wizardData.generalEducationTeacherInput}
                  onChange={(e) => setWizardData({ ...wizardData, generalEducationTeacherInput: e.target.value })}
                  className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors h-40"
                  placeholder="e.g., 'Teacher reports that student works well with peers and shows strong effort in all subjects. Student benefits from preferential seating and visual schedules. Challenges include completing multi-step directions and staying organized with materials. Student responds well to positive reinforcement and clear expectations.'"
                />
              </div>
            </div>
          </div>
        );
      // Placeholder cases for the remaining steps
      case 3: return <div>Content for Step 4: Quantitative Student Data (Coming Soon)</div>;
      case 4: return <div>Content for Step 5: Data Analysis (Coming Soon)</div>;
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
                    {index < currentStep ? <Check size={16} /> : <span className="text-xs sm:text-sm font-medium">{index + 1}</span>}
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
            <Sparkles className="text-green" size={32} />
          </div>
          <h2 className="text-xl sm:text-3xl font-semibold mb-3 sm:mb-4">AI-Assisted IEP Development</h2>
          <p className="text-text-secondary text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Use our AI-powered assistant to guide you through creating comprehensive, measurable Present Levels, Baselines, and IEP Goals for your students.
          </p>
          <button
            onClick={handleStartWizard}
            className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-3.5 bg-green text-white rounded-lg sm:rounded-xl font-medium text-base sm:text-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-green/30 transform hover:scale-105"
          >
            <Brain size={20} />
            Create New Student IEP Goals
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-green/5 via-transparent to-green/5 border-green/20 hover:border-green/30 transition-all duration-300 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
          <Lightbulb className="text-green" size={20} />
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