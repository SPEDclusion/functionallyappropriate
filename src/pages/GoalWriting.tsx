import React, { useState } from 'react';
import { Target, ChevronLeft, ChevronRight, FileText, Lightbulb, Plus, X, Check } from 'lucide-react';

// Interfaces
interface RelatedServiceEntry {
  id: string;
  serviceType: string;
  serviceOtherName?: string;
  duration: string;
  frequency: string;
  delivery: string;
  location: string;
  comments: string;
  startDate: string;
  endDate: string;
}

interface StrengthsAndGrowthData {
  [area: string]: {
    domains: { [domain: string]: 'strength' | 'growth' | 'unselected' };
    strengthsAnecdotal: string;
    growthAnecdotal: string;
  };
}

interface WizardData {
  // Step 1 - Student Selection
  selectedStudent: string;
  
  // Step 2 - Goal Context
  goalContext: string;
  
  // Step 3 - Qualitative Student Data
  selectedAreas: string[];
  strengthsAndGrowthData: StrengthsAndGrowthData;
  generalEducationPerformance: string;
  generalEducationTeacherInput: string;
  
  // Step 4 - Quantitative Data
  quantitativeData: string;
  
  // Step 5 - Baseline Analysis
  baselineAnalysis: string;
  
  // Step 6 - Goal Development
  goalDevelopment: string;
  
  // Step 7 - Special Factors
  assistiveTechNeeded: boolean;
  assistiveTechRationale: string;
  blindVisualImpairment: boolean;
  deafHardOfHearing: boolean;
  behaviorImpedingLearning: boolean;
  behaviorInterventionsStrategies: string;
  
  // Step 8 - Present Levels
  draftPresentLevels: string;
  
  // Step 9 - Goal Finalization
  finalizedGoals: string;
  
  // Step 10 - Related Services
  relatedServices: RelatedServiceEntry[];
}

const GoalWriting: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [pendingAreaSelection, setPendingAreaSelection] = useState('');

  const wizardSteps = [
    'Student Selection',
    'Goal Context',
    'Qualitative Student Data',
    'Quantitative Data',
    'Baseline Analysis',
    'Goal Development',
    'Special Factors',
    'Present Levels',
    'Goal Finalization',
    'Related Services'
  ];

  const [wizardData, setWizardData] = useState<WizardData>({
    selectedStudent: '',
    goalContext: '',
    selectedAreas: [],
    strengthsAndGrowthData: {},
    generalEducationPerformance: '',
    generalEducationTeacherInput: '',
    quantitativeData: '',
    baselineAnalysis: '',
    goalDevelopment: '',
    assistiveTechNeeded: false,
    assistiveTechRationale: '',
    blindVisualImpairment: false,
    deafHardOfHearing: false,
    behaviorImpedingLearning: false,
    behaviorInterventionsStrategies: '',
    draftPresentLevels: '',
    finalizedGoals: '',
    relatedServices: []
  });

  // Mock student data
  const students = [
    { id: '1', name: 'John Smith', grade: '3rd' },
    { id: '2', name: 'Emma Johnson', grade: '5th' },
    { id: '3', name: 'Michael Brown', grade: '2nd' }
  ];

  // Function to get domain areas based on subject and grade
  const getDomainAreas = (area: string, grade: string): string[] => {
    const gradeNum = parseInt(grade);
    
    switch (area) {
      case 'Math':
        if (gradeNum <= 2) {
          return ['Counting & Cardinality', 'Operations & Algebraic Thinking', 'Number & Operations in Base Ten', 'Measurement & Data', 'Geometry'];
        } else if (gradeNum <= 5) {
          return ['Operations & Algebraic Thinking', 'Number & Operations in Base Ten', 'Number & Operations - Fractions', 'Measurement & Data', 'Geometry'];
        } else {
          return ['Ratios & Proportional Relationships', 'The Number System', 'Expressions & Equations', 'Geometry', 'Statistics & Probability'];
        }
      case 'Reading':
        return ['Reading Foundations', 'Reading Literature', 'Reading Informational Text', 'Language'];
      case 'Writing':
        return ['Text Types & Purposes', 'Production & Distribution of Writing', 'Research to Build Knowledge', 'Language'];
      default:
        return [];
    }
  };

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddArea = () => {
    if (pendingAreaSelection && !wizardData.selectedAreas.includes(pendingAreaSelection)) {
      const newSelectedAreas = [...wizardData.selectedAreas, pendingAreaSelection];
      const newStrengthsAndGrowthData = { ...wizardData.strengthsAndGrowthData };
      
      // Initialize data for the new area
      newStrengthsAndGrowthData[pendingAreaSelection] = {
        domains: {},
        strengthsAnecdotal: '',
        growthAnecdotal: ''
      };

      // If it's a CCSS area, initialize domain statuses
      if (['Math', 'Reading', 'Writing'].includes(pendingAreaSelection)) {
        const selectedStudent = students.find(s => s.id === wizardData.selectedStudent);
        const grade = selectedStudent?.grade || '3rd';
        const domains = getDomainAreas(pendingAreaSelection, grade);
        
        domains.forEach(domain => {
          newStrengthsAndGrowthData[pendingAreaSelection].domains[domain] = 'unselected';
        });
      }

      setWizardData({
        ...wizardData,
        selectedAreas: newSelectedAreas,
        strengthsAndGrowthData: newStrengthsAndGrowthData
      });
      
      setPendingAreaSelection('');
    }
  };

  const handleRemoveArea = (areaToRemove: string) => {
    const newSelectedAreas = wizardData.selectedAreas.filter(area => area !== areaToRemove);
    const newStrengthsAndGrowthData = { ...wizardData.strengthsAndGrowthData };
    delete newStrengthsAndGrowthData[areaToRemove];

    setWizardData({
      ...wizardData,
      selectedAreas: newSelectedAreas,
      strengthsAndGrowthData: newStrengthsAndGrowthData
    });
  };

  const handleDomainClick = (area: string, domain: string) => {
    const currentStatus = wizardData.strengthsAndGrowthData[area]?.domains[domain] || 'unselected';
    let newStatus: 'strength' | 'growth' | 'unselected';
    
    switch (currentStatus) {
      case 'unselected':
        newStatus = 'strength';
        break;
      case 'strength':
        newStatus = 'growth';
        break;
      case 'growth':
        newStatus = 'unselected';
        break;
      default:
        newStatus = 'unselected';
    }

    const newStrengthsAndGrowthData = { ...wizardData.strengthsAndGrowthData };
    newStrengthsAndGrowthData[area].domains[domain] = newStatus;

    setWizardData({
      ...wizardData,
      strengthsAndGrowthData: newStrengthsAndGrowthData
    });
  };

  const handleAnecdotalChange = (area: string, type: 'strengthsAnecdotal' | 'growthAnecdotal', value: string) => {
    const newStrengthsAndGrowthData = { ...wizardData.strengthsAndGrowthData };
    newStrengthsAndGrowthData[area][type] = value;

    setWizardData({
      ...wizardData,
      strengthsAndGrowthData: newStrengthsAndGrowthData
    });
  };

  const getDomainStatusColor = (status: 'strength' | 'growth' | 'unselected') => {
    switch (status) {
      case 'strength':
        return 'bg-green text-white border-green';
      case 'growth':
        return 'bg-orange-500 text-white border-orange-500';
      case 'unselected':
        return 'bg-bg-secondary text-text-primary border-border hover:border-purple/30';
    }
  };

  const renderWizardStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="studentSelect" className="block text-sm font-medium mb-2">
                Select Student
              </label>
              <select
                id="studentSelect"
                value={wizardData.selectedStudent}
                onChange={(e) => setWizardData({ ...wizardData, selectedStudent: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
              >
                <option value="">-- Select a Student --</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.grade} Grade)
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="goalContext" className="block text-sm font-medium mb-2">
                Goal Context and Background
              </label>
              <textarea
                id="goalContext"
                value={wizardData.goalContext}
                onChange={(e) => setWizardData({ ...wizardData, goalContext: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                rows={8}
                placeholder="Provide context for this goal development session. What prompted the need for new goals? What areas of concern have been identified?"
              />
            </div>
          </div>
        );

      case 2:
        const selectedStudent = students.find(s => s.id === wizardData.selectedStudent);
        const studentGrade = selectedStudent?.grade || '3rd';
        
        return (
          <div className="space-y-8">
            {/* Student Strengths and Areas of Growth Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Student Strengths and Areas of Growth</h3>
              
              {/* Area Selection */}
              <div className="mb-6 p-4 bg-bg-secondary rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <select
                    value={pendingAreaSelection}
                    onChange={(e) => setPendingAreaSelection(e.target.value)}
                    className="flex-1 p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                  >
                    <option value="">-- Select Area to Add --</option>
                    <option value="Reading">Reading</option>
                    <option value="Writing">Writing</option>
                    <option value="Math">Math</option>
                    <option value="Social Emotional/Behavioral">Social Emotional/Behavioral</option>
                    <option value="Communication">Communication</option>
                    <option value="Motor Skills">Motor Skills</option>
                    <option value="Independent Living">Independent Living</option>
                    <option value="Vocational">Vocational</option>
                  </select>
                  <button
                    onClick={handleAddArea}
                    disabled={!pendingAreaSelection || wizardData.selectedAreas.includes(pendingAreaSelection)}
                    className="px-4 py-2 bg-green text-white rounded-md hover:bg-green/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Area
                  </button>
                </div>
              </div>

              {/* Display Added Areas */}
              {wizardData.selectedAreas.map((area, areaIndex) => (
                <div key={area} className="mb-6 p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-semibold">{area}</h4>
                    <button
                      onClick={() => handleRemoveArea(area)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      aria-label="Remove area"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* CCSS Domain Boxes for Math, Reading, Writing */}
                  {['Math', 'Reading', 'Writing'].includes(area) && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium mb-3">Common Core Standards Domains:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {getDomainAreas(area, studentGrade).map((domain) => {
                          const status = wizardData.strengthsAndGrowthData[area]?.domains[domain] || 'unselected';
                          return (
                            <button
                              key={domain}
                              onClick={() => handleDomainClick(area, domain)}
                              className={`p-3 text-sm rounded-lg border-2 transition-all text-left ${getDomainStatusColor(status)}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{domain}</span>
                                {status === 'strength' && <Check size={16} />}
                                {status === 'growth' && <span className="text-xs">Growth</span>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-text-secondary mt-2">
                        Click once for <span className="text-green font-medium">Strength</span>, 
                        twice for <span className="text-orange-500 font-medium">Area of Growth</span>, 
                        three times to unselect
                      </p>
                    </div>
                  )}

                  {/* Anecdotal Data Textareas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor={`strengths-${areaIndex}`}
                        className="block text-sm font-medium mb-2"
                      >
                        Anecdotal Data - Strengths in {area}
                      </label>
                      <textarea
                        id={`strengths-${areaIndex}`}
                        value={wizardData.strengthsAndGrowthData[area]?.strengthsAnecdotal || ''}
                        onChange={(e) => handleAnecdotalChange(area, 'strengthsAnecdotal', e.target.value)}
                        className="w-full p-3 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                        rows={4}
                        placeholder={`Describe what the student does well in ${area}. Include specific examples, behaviors, and skills you've observed...`}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor={`growth-${areaIndex}`}
                        className="block text-sm font-medium mb-2"
                      >
                        Anecdotal Data - Areas of Growth in {area}
                      </label>
                      <textarea
                        id={`growth-${areaIndex}`}
                        value={wizardData.strengthsAndGrowthData[area]?.growthAnecdotal || ''}
                        onChange={(e) => handleAnecdotalChange(area, 'growthAnecdotal', e.target.value)}
                        className="w-full p-3 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                        rows={4}
                        placeholder={`Describe areas where the student needs support or shows challenges in ${area}. Include specific examples and observed difficulties...`}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {wizardData.selectedAreas.length === 0 && (
                <div className="text-center py-8 text-text-secondary border-2 border-dashed border-border rounded-lg">
                  <Target size={40} className="mx-auto mb-2 opacity-30" />
                  <p>No areas selected yet. Use the dropdown above to add areas for assessment.</p>
                </div>
              )}
            </div>

            {/* Student Performance in General Education Section */}
            <div>
              <label htmlFor="generalEducationPerformance" className="block text-sm font-medium mb-2">
                Student Performance in General Education
              </label>
              <textarea
                id="generalEducationPerformance"
                value={wizardData.generalEducationPerformance}
                onChange={(e) => setWizardData({ ...wizardData, generalEducationPerformance: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                rows={6}
                placeholder="Describe how the student performs in the general education setting. Include information about participation, engagement, independence, and any accommodations or modifications currently in place..."
              />
            </div>

            {/* General Education Teacher Input Section */}
            <div>
              <label htmlFor="generalEducationTeacherInput" className="block text-sm font-medium mb-2">
                General Education Teacher Input
              </label>
              <textarea
                id="generalEducationTeacherInput"
                value={wizardData.generalEducationTeacherInput}
                onChange={(e) => setWizardData({ ...wizardData, generalEducationTeacherInput: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                rows={6}
                placeholder="Include input from the general education teacher about the student's performance, behavior, social interactions, and any concerns or observations they have shared..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="quantitativeData" className="block text-sm font-medium mb-2">
                Quantitative Data and Assessment Results
              </label>
              <textarea
                id="quantitativeData"
                value={wizardData.quantitativeData}
                onChange={(e) => setWizardData({ ...wizardData, quantitativeData: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                rows={8}
                placeholder="Include formal assessment results, standardized test scores, curriculum-based measurements, and other quantitative data..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="baselineAnalysis" className="block text-sm font-medium mb-2">
                Baseline Analysis
              </label>
              <textarea
                id="baselineAnalysis"
                value={wizardData.baselineAnalysis}
                onChange={(e) => setWizardData({ ...wizardData, baselineAnalysis: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                rows={8}
                placeholder="Analyze the student's current baseline performance levels that will inform goal development..."
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="goalDevelopment" className="block text-sm font-medium mb-2">
                Goal Development
              </label>
              <textarea
                id="goalDevelopment"
                value={wizardData.goalDevelopment}
                onChange={(e) => setWizardData({ ...wizardData, goalDevelopment: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                rows={8}
                placeholder="Develop specific, measurable goals based on the data collected..."
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            {/* Assistive Technology */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Does the student require assistive technology devices or services?
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="assistiveTech"
                      checked={wizardData.assistiveTechNeeded === true}
                      onChange={() => setWizardData({ ...wizardData, assistiveTechNeeded: true })}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="assistiveTech"
                      checked={wizardData.assistiveTechNeeded === false}
                      onChange={() => setWizardData({ ...wizardData, assistiveTechNeeded: false })}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
                
                {wizardData.assistiveTechNeeded && (
                  <div>
                    <label htmlFor="assistiveTechRationale" className="block text-sm font-medium mb-2">
                      Rationale for Assistive Technology:
                    </label>
                    <textarea
                      id="assistiveTechRationale"
                      value={wizardData.assistiveTechRationale}
                      onChange={(e) => setWizardData({ ...wizardData, assistiveTechRationale: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                      rows={4}
                      placeholder="Describe the specific devices/services and why they are needed..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Blind or Visual Impairment */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Does the student have a blind or visual impairment that impacts their learning?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="blindVisual"
                    checked={wizardData.blindVisualImpairment === true}
                    onChange={() => setWizardData({ ...wizardData, blindVisualImpairment: true })}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="blindVisual"
                    checked={wizardData.blindVisualImpairment === false}
                    onChange={() => setWizardData({ ...wizardData, blindVisualImpairment: false })}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Deaf or Hard of Hearing */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Does the student have a deaf or hard of hearing condition that impacts their learning?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deafHearing"
                    checked={wizardData.deafHardOfHearing === true}
                    onChange={() => setWizardData({ ...wizardData, deafHardOfHearing: true })}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deafHearing"
                    checked={wizardData.deafHardOfHearing === false}
                    onChange={() => setWizardData({ ...wizardData, deafHardOfHearing: false })}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Behavior Impeding Learning */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Does the student exhibit behavior that impedes their learning or the learning of others?
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="behaviorImpeding"
                      checked={wizardData.behaviorImpedingLearning === true}
                      onChange={() => setWizardData({ ...wizardData, behaviorImpedingLearning: true })}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="behaviorImpeding"
                      checked={wizardData.behaviorImpedingLearning === false}
                      onChange={() => setWizardData({ ...wizardData, behaviorImpedingLearning: false })}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
                
                {wizardData.behaviorImpedingLearning && (
                  <div>
                    <label htmlFor="behaviorInterventions" className="block text-sm font-medium mb-2">
                      Interventions, Strategies, and Supports for Behavior:
                    </label>
                    <textarea
                      id="behaviorInterventions"
                      value={wizardData.behaviorInterventionsStrategies}
                      onChange={(e) => setWizardData({ ...wizardData, behaviorInterventionsStrategies: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                      rows={6}
                      placeholder="Describe the positive behavioral interventions, strategies, and supports to be implemented..."
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            {/* Informational Section */}
            <div className="p-4 bg-green bg-opacity-10 border border-green rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <FileText className="text-green flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-green mb-1">AI-Drafted Present Levels of Performance (PLOP)</h4>
                  <p className="text-sm text-text-secondary">
                    Based on the information you've provided in the previous steps, our AI will generate a draft PLOP below. 
                    This draft will attempt to summarize student interests, strengths (qualitative and quantitative), areas of growth 
                    (qualitative and quantitative, including baseline data), and general context. Please review it carefully, edit as 
                    needed to ensure accuracy and completeness, and add any further details or specific examples.
                  </p>
                </div>
              </div>
            </div>

            {/* Draft Present Levels Textarea */}
            <div>
              <label htmlFor="draftPresentLevels" className="block text-sm font-medium mb-2 text-text-primary">
                Review and Edit Draft Present Levels Statement:
              </label>
              <textarea
                id="draftPresentLevels"
                value={wizardData.draftPresentLevels}
                onChange={(e) => setWizardData({ ...wizardData, draftPresentLevels: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green transition-colors"
                rows={20}
                placeholder="The AI-generated draft of the Present Levels of Performance will appear here once all necessary prior data is entered and processed. You can then edit and refine it..."
              />
            </div>

            {/* Guidance Section */}
            <div className="mt-8 p-4 border border-border rounded-lg bg-bg-primary">
              <h4 className="text-md font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Lightbulb className="text-green" size={18} />
                Elements of a Strong Present Levels Statement
              </h4>
              <p className="text-sm text-text-secondary mb-4">
                A well-written Present Levels statement provides a comprehensive snapshot of the student. 
                Ensure your final version addresses the following for relevant academic and functional areas:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary">
                <li>
                  Anecdotal student information: Include interests, how they participate in school, learning preferences, 
                  and general relevant background.
                </li>
                <li>
                  Strengths: Describe what the student *can* do. Include both qualitative observations 
                  (e.g., 'shows enthusiasm for reading') and quantitative data (e.g., 'can identify 20/26 uppercase letters').
                </li>
                <li>
                  Areas of Growth/Needs: Describe skills the student is still developing or finds challenging. 
                  Include both qualitative observations (e.g., 'struggles to organize thoughts for writing') and 
                  quantitative data (e.g., 'solves 2 out of 10 single-step math word problems').
                </li>
                <li>
                  Baseline Data: Clearly state the student's current performance level on the specific skill(s) targeted 
                  for new goals. This should be measurable (e.g., 'When given a 3rd-grade passage, reads 45 words correct 
                  per minute with 5 errors'). This baseline directly informs goal development.
                </li>
                <li>
                  Impact of Disability: Briefly explain how the student's disability affects their involvement and 
                  progress in the general education curriculum.
                </li>
              </ul>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="finalizedGoals" className="block text-sm font-medium mb-2">
                Finalized Goals
              </label>
              <textarea
                id="finalizedGoals"
                value={wizardData.finalizedGoals}
                onChange={(e) => setWizardData({ ...wizardData, finalizedGoals: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-green"
                rows={8}
                placeholder="Review and finalize the goals based on all collected data..."
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Related Services</h3>
              <button
                onClick={() => {
                  const newService: RelatedServiceEntry = {
                    id: Date.now().toString(),
                    serviceType: '',
                    serviceOtherName: '',
                    duration: '',
                    frequency: '',
                    delivery: '',
                    location: '',
                    comments: '',
                    startDate: '',
                    endDate: ''
                  };
                  setWizardData({
                    ...wizardData,
                    relatedServices: [...wizardData.relatedServices, newService]
                  });
                }}
                className="px-4 py-2 bg-green text-white rounded-md hover:bg-green/80 transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Add New Service
              </button>
            </div>

            {wizardData.relatedServices.map((service, index) => (
              <div key={service.id} className="space-y-6 border border-border p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Service #{index + 1}</h4>
                  <button
                    onClick={() => {
                      const newServices = wizardData.relatedServices.filter(s => s.id !== service.id);
                      setWizardData({ ...wizardData, relatedServices: newServices });
                    }}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    aria-label="Remove service"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Service Type */}
                  <div>
                    <label htmlFor={`serviceType-${service.id}`} className="block text-sm font-medium mb-2">
                      Type of Service:
                    </label>
                    <select
                      id={`serviceType-${service.id}`}
                      value={service.serviceType}
                      onChange={(e) => {
                        const newServices = wizardData.relatedServices.map(s =>
                          s.id === service.id ? { ...s, serviceType: e.target.value } : s
                        );
                        setWizardData({ ...wizardData, relatedServices: newServices });
                      }}
                      className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                    >
                      <option value="">-- Select Service --</option>
                      <option value="Specialized Academic Instruction (SAI)">Specialized Academic Instruction (SAI)</option>
                      <option value="Behavior Intervention Services (BIS)">Behavior Intervention Services (BIS)</option>
                      <option value="Speech and Language">Speech and Language</option>
                      <option value="Occupational Therapy (OT)">Occupational Therapy (OT)</option>
                      <option value="Adapted Physical Education (APE)">Adapted Physical Education (APE)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label htmlFor={`duration-${service.id}`} className="block text-sm font-medium mb-2">
                      Duration (e.g., minutes per session):
                    </label>
                    <input
                      type="text"
                      id={`duration-${service.id}`}
                      value={service.duration}
                      onChange={(e) => {
                        const newServices = wizardData.relatedServices.map(s =>
                          s.id === service.id ? { ...s, duration: e.target.value } : s
                        );
                        setWizardData({ ...wizardData, relatedServices: newServices });
                      }}
                      className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      placeholder="e.g., 30 minutes"
                    />
                  </div>
                </div>

                {/* Other Service Name (conditional) */}
                {service.serviceType === 'Other' && (
                  <div>
                    <label htmlFor={`serviceOtherName-${service.id}`} className="block text-sm font-medium mb-2">
                      Specify Other Service Name:
                    </label>
                    <input
                      type="text"
                      id={`serviceOtherName-${service.id}`}
                      value={service.serviceOtherName || ''}
                      onChange={(e) => {
                        const newServices = wizardData.relatedServices.map(s =>
                          s.id === service.id ? { ...s, serviceOtherName: e.target.value } : s
                        );
                        setWizardData({ ...wizardData, relatedServices: newServices });
                      }}
                      className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      placeholder="Enter service name"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Frequency */}
                  <div>
                    <label htmlFor={`frequency-${service.id}`} className="block text-sm font-medium mb-2">
                      Frequency:
                    </label>
                    <select
                      id={`frequency-${service.id}`}
                      value={service.frequency}
                      onChange={(e) => {
                        const newServices = wizardData.relatedServices.map(s =>
                          s.id === service.id ? { ...s, frequency: e.target.value } : s
                        );
                        setWizardData({ ...wizardData, relatedServices: newServices });
                      }}
                      className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                    >
                      <option value="">-- Select Frequency --</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor={`location-${service.id}`} className="block text-sm font-medium mb-2">
                      Location of Service:
                    </label>
                    <input
                      type="text"
                      id={`location-${service.id}`}
                      value={service.location}
                      onChange={(e) => {
                        const newServices = wizardData.relatedServices.map(s =>
                          s.id === service.id ? { ...s, location: e.target.value } : s
                        );
                        setWizardData({ ...wizardData, relatedServices: newServices });
                      }}
                      className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                      placeholder="e.g., General Ed Classroom, Resource Room"
                    />
                  </div>
                </div>

                {/* Delivery Method */}
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Method:</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`delivery-${service.id}`}
                        value="Individual"
                        checked={service.delivery === 'Individual'}
                        onChange={(e) => {
                          const newServices = wizardData.relatedServices.map(s =>
                            s.id === service.id ? { ...s, delivery: e.target.value } : s
                          );
                          setWizardData({ ...wizardData, relatedServices: newServices });
                        }}
                        className="mr-2"
                      />
                      Individual
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`delivery-${service.id}`}
                        value="Group"
                        checked={service.delivery === 'Group'}
                        onChange={(e) => {
                          const newServices = wizardData.relatedServices.map(s =>
                            s.id === service.id ? { ...s, delivery: e.target.value } : s
                          );
                          setWizardData({ ...wizardData, relatedServices: newServices });
                        }}
                        className="mr-2"
                      />
                      Group
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div>
                    <label htmlFor={`startDate-${service.id}`} className="block text-sm font-medium mb-2">
                      Service Start Date:
                    </label>
                    <input
                      type="date"
                      id={`startDate-${service.id}`}
                      value={service.startDate}
                      onChange={(e) => {
                        const newServices = wizardData.relatedServices.map(s =>
                          s.id === service.id ? { ...s, startDate: e.target.value } : s
                        );
                        setWizardData({ ...wizardData, relatedServices: newServices });
                      }}
                      className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label htmlFor={`endDate-${service.id}`} className="block text-sm font-medium mb-2">
                      Service End Date:
                    </label>
                    <input
                      type="date"
                      id={`endDate-${service.id}`}
                      value={service.endDate}
                      onChange={(e) => {
                        const newServices = wizardData.relatedServices.map(s =>
                          s.id === service.id ? { ...s, endDate: e.target.value } : s
                        );
                        setWizardData({ ...wizardData, relatedServices: newServices });
                      }}
                      className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                    />
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label htmlFor={`comments-${service.id}`} className="block text-sm font-medium mb-2">
                    Comments (optional):
                  </label>
                  <textarea
                    id={`comments-${service.id}`}
                    value={service.comments}
                    onChange={(e) => {
                      const newServices = wizardData.relatedServices.map(s =>
                        s.id === service.id ? { ...s, comments: e.target.value } : s
                      );
                      setWizardData({ ...wizardData, relatedServices: newServices });
                    }}
                    className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                    rows={3}
                    placeholder="Any additional notes or details about the service..."
                  />
                </div>
              </div>
            ))}

            {wizardData.relatedServices.length === 0 && (
              <div className="text-center py-8 text-text-secondary border-2 border-dashed border-border rounded-lg">
                <FileText size={40} className="mx-auto mb-2 opacity-30" />
                <p>No services added yet. Click "Add New Service" to get started.</p>
              </div>
            )}
          </div>
        );

      default:
        return <div>Step not implemented</div>;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Goal Writing Wizard</h1>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Target className="text-green" size={16} />
          <span>Step {currentStep + 1} of {wizardSteps.length}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-secondary">Progress</span>
          <span className="text-sm text-text-secondary">
            {Math.round(((currentStep + 1) / wizardSteps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-bg-secondary rounded-full h-2">
          <div 
            className="bg-green h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / wizardSteps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {wizardSteps.map((step, index) => (
            <div
              key={index}
              className={`px-3 py-2 rounded-md text-sm whitespace-nowrap transition-all ${
                index === currentStep
                  ? 'bg-green text-white'
                  : index < currentStep
                  ? 'bg-green/20 text-green'
                  : 'bg-bg-secondary text-text-secondary'
              }`}
            >
              {index + 1}. {step}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="card mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{wizardSteps[currentStep]}</h2>
          <div className="w-full bg-bg-secondary rounded-full h-1">
            <div 
              className="bg-green h-1 rounded-full transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / wizardSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {renderWizardStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="btn border border-border hover:bg-bg-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === wizardSteps.length - 1}
          className="btn bg-accent-green text-white hover:bg-green/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default GoalWriting;