import React, { useState } from 'react';
import { MapPin, Briefcase, Phone, Award, FileText, UserCheck } from 'lucide-react';
import { SyllabusFlow } from './SyllabusFlow'; // Adjust path if needed

interface FunctionBoxesProps {
    onSelect: (query: string, response?: string, requiresBackend?: boolean) => void;
}

const FunctionBoxes: React.FC<FunctionBoxesProps> = ({ onSelect }) => {
    const [showSyllabus, setShowSyllabus] = useState(false);

    const functions = [
        {
            id: 'collegeMap',
            name: 'College Map',
            icon: <MapPin size={24} className="text-blue-600" />,
            bgColor: 'bg-blue-100',
            link: 'https://www.google.com/maps/place/Keshav+Memorial+Institute+of+Technology+(KMIT)/@17.4073032,78.4850806,15z',
        },
        {
            id: 'placement',
            name: 'Placement (2025)',
            icon: <Briefcase size={24} className="text-green-600" />,
            bgColor: 'bg-green-100',
            response:
                'For the 2024-2025 batch at KMIT, 549 out of 570 students were placed, achieving a 96% placement rate. 136 companies visited, offering 705 job offers. The average salary was 9.74 LPA, with 9 students securing offers above 40 LPA, 17 between 30-40 LPA, and 219 between 10-20 LPA.',
        },
        {
            id: 'importantNumbers',
            name: 'Important Call Numbers',
            icon: <Phone size={24} className="text-purple-600" />,
            bgColor: 'bg-purple-100',
            response:
                'Here are some important contact numbers for KMIT:\n- Administration Office:040-23261407\n- Email :  info@kmit.in',
        },
        {
            id: 'cutoff',
            name: 'College Cutoff',
            icon: <Award size={24} className="text-red-600" />,
            bgColor: 'bg-red-100',
            response:
                'KMIT’s EAMCET cutoff ranks for 2024 (approximate):\n- CSE: 5000-6000\n- IT: 6000-8000\n- AI-ML: 7000-9000\n- ECE: 10000-12000\nNote: Cutoffs vary each year based on the applicant pool.',
        },
        {
            id: 'syllabus',
            name: 'Syllabus',
            icon: <FileText size={24} className="text-indigo-600" />,
            bgColor: 'bg-indigo-100',
        },
        {
            id: 'checkAttendance',
            name: 'Check Attendance',
            icon: <UserCheck size={24} className="text-teal-600" />,
            bgColor: 'bg-teal-100',
            requiresBackend: true,
        },
    ];

    const handleClick = (item: typeof functions[0]) => {
        if (item.id === 'syllabus') {
            setShowSyllabus(true);
            return;
        }
        if (item.link) {
            window.open(item.link, '_blank');
        }
        if (item.requiresBackend) {
            onSelect(item.name, 'checkAttendance', true);
        } else {
            onSelect(item.name, item.response);
        }
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 border-t overflow-x-auto">
                {functions.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleClick(item)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg ${item.bgColor} hover:opacity-90 transition-opacity`}
                    >
                        <div className="mb-2">{item.icon}</div>
                        <span className="text-xs font-medium text-center">{item.name}</span>
                    </button>
                ))}
            </div>
            {showSyllabus && <SyllabusFlow />}
        </>
    );
};

export default FunctionBoxes;
