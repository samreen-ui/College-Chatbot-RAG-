import React, { useState } from 'react';

export const SyllabusFlow = () => {
    const [step, setStep] = useState<'regulation' | 'department' | 'link' | null>(null);
    const [regulation, setRegulation] = useState('');
    const [department, setDepartment] = useState('');

    const handleStart = () => setStep('regulation');

    const handleRegulation = (reg: string) => {
        setRegulation(reg);
        setStep('department');
    };

    const handleDepartment = (dept: string) => {
        setDepartment(dept);
        setStep('link');
    };

    const renderRegulationOptions = () => (
        <div className="space-x-3">
            {['KR21', 'KR22', 'KR23', 'KR24'].map((reg) => (
                <button key={reg} onClick={() => handleRegulation(reg)} className="px-4 py-2 bg-blue-200 rounded">
                    {reg}
                </button>
            ))}
        </div>
    );

    const renderDepartmentOptions = () => {
        const departments = regulation === 'KR24' ? ['CSE', 'CSM'] : ['CSE', 'IT', 'CSD', 'CSM'];
        return (
            <div className="space-x-3">
                {departments.map((dept) => (
                    <button key={dept} onClick={() => handleDepartment(dept)} className="px-4 py-2 bg-green-200 rounded">
                        {dept}
                    </button>
                ))}
            </div>
        );
    };

    const renderFinalLink = () => {
        const url = `https://kmit.in/department/syllabus_${department.toLowerCase()}.php`;
        return (
            <div>
                <p className="mb-2">Here is your syllabus link:</p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                    onError={() => alert('Failed to load syllabus. Please visit https://kmit.in for more details.')}
                >
                    Open {regulation} - {department} Syllabus
                </a>
            </div>
        );
    };

    return (
        <div className="p-4 border rounded mt-4">
            {step === null && (
                <button onClick={handleStart} className="px-4 py-2 bg-indigo-300 rounded">
                    Start Syllabus Selection
                </button>
            )}
            {step === 'regulation' && renderRegulationOptions()}
            {step === 'department' && renderDepartmentOptions()}
            {step === 'link' && renderFinalLink()}
        </div>
    );
};