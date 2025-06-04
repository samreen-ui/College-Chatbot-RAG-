// collegeData.ts

import supabase from "../Supabase";
import { CollegeData } from "types";

// Existing interfaces (from previous responses) remain unchanged
export interface CollegeInfo {
    id: string;
    name: string;
    established_year: number;
    affiliation: string;
    approval: string;
    location: string;
    mission: string;
    vision: string;
    objectives: string[];
    core_values: string;
    created_at: string;
}

export interface AcademicRegulations {
    id: string;
    description: string;
    evaluation_methods: string[];
    activities: string[];
    monitored_by: string;
    created_at: string;
}

export interface BTechRegulation {
    id: string;
    regulation_code: string;
    program: string;
    created_at: string;
}

export interface YearlyRegulation {
    id: string;
    academic_year: string;
    i_year_regulation: string;
    ii_year_regulation: string;
    iii_year_regulation: string;
    iv_year_regulation: string;
    created_at: string;
}

export interface IICInfo {
    id: string;
    description: string;
    functions: string[];
    created_at: string;
}

export interface IDMCMember {
    id: string;
    name: string;
    department: string;
    designation: string;
    created_at: string;
}

export interface PerspectivePlan {
    id: string;
    description: string;
    innovations: string[];
    created_at: string;
}

export interface HRPolicy {
    id: string;
    description: string;
    created_at: string;
}

export interface Course {
    id: string;
    degree: string;
    name: string;
    total_intake: number;
    management_seats: number;
    convenor_seats: number;
    start_year?: number;
    created_at: string;
}

export interface AdmissionsInfo {
    id: string;
    eligibility_criteria: string;
    admission_pattern: string;
    fee_structure: {
        year: string;
        i_year: { tuition_fee: number; special_fee: number; nba_fee: number };
        ii_year: { tuition_fee: number; special_fee: number; nba_fee: number };
        iii_year: { tuition_fee: number; special_fee: number; nba_fee: number };
        iv_year: { tuition_fee: number; special_fee: number; nba_fee: number };
    };
    nri_fee_usd: number;
    application_fee: number;
    last_date_application: string;
    created_at: string;
}

export interface ContactInfo {
    id: string;
    phone_number: string;
    address: string;
    website: string;
    created_at: string;
}

export interface Event {
    id: string;
    name: string;
    date: string;
    description: string;
    activities: string[];
    created_at: string;
}

export interface IFSProgram {
    id: string;
    name: string;
    description: string;
    duration_hours: number;
    prerequisite?: string;
    created_at: string;
}

export interface IFSOutcome {
    id: string;
    description: string;
    created_at: string;
}

export interface IFSDelivery {
    id: string;
    description: string;
    platforms: string[];
    features: string[];
    created_at: string;
}

export interface Committees {
    id: string;
    name: string;
    description: string;
    functions?: string[];
    objectives?: string[];
    responsibilities?: string[];
    created_at: string;
}

export interface CommitteeMember {
    id: string;
    committee_name: string;
    name: string;
    department: string;
    designation: string;
    created_at: string;
}

export interface StudentCouncil {
    id: string;
    description: string;
    objectives: string[];
    created_at: string;
}

export interface StudentCouncilRepresentative {
    id: string;
    name: string;
    roll_number: string;
    designation: string;
    academic_year: string;
    created_at: string;
}

export interface Club {
    id: string;
    name: string;
    description: string;
    created_at: string;
}

export interface ClubEvent {
    id: string;
    club_name: string;
    name: string;
    date: string;
    description: string;
    created_at: string;
}

export interface NSSEvent {
    id: string;
    name: string;
    date: string;
    description: string;
    faculties_participated: number;
    students_participated: number;
    created_at: string;
}

export interface AlumniInfo {
    id: string;
    description: string;
    website: string;
    contact_name: string;
    contact_designation: string;
    contact_number: string;
    created_at: string;
}

export interface PlacementAchievement {
    id: string;
    student_name: string;
    roll_number: string;
    description: string;
    year: string;
    created_at: string;
}

export interface PlacementStats {
    id: string;
    academic_year: string;
    companies_visited: number;
    offers_rolled_out: number;
    students_placed: number;
    total_students: number;
    average_salary_lpa: number;
    salary_highlights: {
        above_40_lpa: number;
        between_30_40_lpa: number;
        between_20_30_lpa: number;
        between_10_20_lpa: number;
        between_8_10_lpa: number;
        between_6_8_lpa: number;
        between_5_6_lpa: number;
    };
    created_at: string;
}

export interface PlacementCell {
    id: string;
    description: string;
    dean_name: string;
    dean_qualifications: string;
    dean_experience: string;
    created_at: string;
}

export interface HighestPlacement {
    id: string;
    academic_year: string;
    company: string;
    number_of_selects: number;
    internship_per_month?: number | null;
    ctc_per_annum: string;
    created_at: string;
}

// New interfaces for Parts 11 and 12

// Research (Part 11)
export interface ResearchLab {
    id: string;
    name: string;
    description: string;
    created_at: string;
}

export interface RNDCell {
    id: string;
    description: string;
    collaborations: string[];
    created_at: string;
}

export interface ResearchOutcome {
    id: string;
    description: string;
    created_at: string;
}

export interface SpecificResearchLab {
    id: string;
    name: string;
    description: string;
    projects?: string[];
    created_at: string;
}

export interface ResearchFaculty {
    id: string;
    lab_name: string;
    name: string;
    created_at: string;
}

export interface CenterOfExcellence {
    id: string;
    name: string;
    description: string;
    created_at: string;
}

export interface SponsoredResearch {
    id: string;
    name: string;
    description: string;
    funding_agency: string;
    funding_amount: string;
    team: string[];
    created_at: string;
}

// Educational Tools and Teaching Methods (Part 12)
export interface EducationalTool {
    id: string;
    name: string;
    description: string;
    download_link?: string;
    features: string[];
    created_at: string;
}

export interface TeachingMethod {
    id: string;
    description: string;
    methods: string[];
    benefits: string[];
    created_at: string;
}

export interface AudioVisualCentre {
    id: string;
    description: string;
    features: string[];
    created_at: string;
}

export interface GSoCParticipation {
    id: string;
    student_name: string;
    organization: string;
    project_name: string;
    participation_year: string;
    created_at: string;
}
export async function fetchCollegeData(): Promise<CollegeData> {
    try {
        const [
            { data: collegeInfo, error: collegeError },
            { data: placements, error: placementError },
            { data: stats, error: statsError },
            { data: admin, error: adminError },
            { data: syllabus, error: syllabusError },
        ] = await Promise.all([
            supabase.from('college_info').select('*').limit(1),
            supabase.from('highest_placements').select('*').order('academic_year', { ascending: false }).limit(5),
            supabase.from('placement_stats').select('*').order('academic_year', { ascending: false }).limit(5),
            supabase.from('administration_management_lms').select('*'),
            supabase.from('syllabus').select('*').in('department', ['CSE', 'CSM', 'IT', 'CSD']), // Broader filter
        ]);

        if (collegeError || placementError || statsError || adminError || syllabusError) {
            console.error('Fetch error:', collegeError || placementError || statsError || adminError || syllabusError);
            throw new Error('Failed to fetch data');
        }

        return {
            college_info: collegeInfo || [],
            highest_placements: placements || [],
            placement_stats: stats || [],
            administration_management_lms: admin || [],
            syllabus: syllabus || [],
        };
    } catch (error) {
        console.error('Error fetching college data:', error);
        throw error;
    }
}

export async function searchCollegeData(query: string): Promise<string> {
    const lowerQuery = query.toLowerCase().trim();
    const data = await fetchCollegeData();
    console.log('Fetched data:', data); // Debug

    // Handle syllabus queries
    if (lowerQuery.includes('syllabus') || lowerQuery.includes('syllabi') || lowerQuery.includes('course')) {
        // Try regex matching for regulation and department
        const regulationMatch = lowerQuery.match(/(kr-?\d{2})/i); // Support KR24 or KR-24
        const departmentMatch = lowerQuery.match(/\b(cse|csd|csm|it|computer science|information technology)\b/i);

        if (regulationMatch && departmentMatch) {
            const regulation = regulationMatch[1].toUpperCase().replace('-', ''); // Normalize KR-24 to KR24
            const department = departmentMatch[1].toUpperCase().replace('COMPUTER SCIENCE', 'CSE').replace('INFORMATION TECHNOLOGY', 'IT');
            const syllabusUrl = `https://kmit.in/department/syllabus_${regulation.toLowerCase()}_${department.toLowerCase()}.php`;
            return `Syllabus for ${department} (${regulation}): ${syllabusUrl}`;
        }

        // Fallback to Supabase data if available
        const syllabus = data.syllabus;
        if (syllabus.length) {
            const course = syllabus[0];
            return `Syllabus for ${course.course_name} (${course.course_code}, ${course.academic_year}): ${course.syllabus_details}`;
        }

        // Fallback response with guidance
        return `No specific syllabus data found for your query. Please specify a regulation (e.g., KR24) and department (e.g., CSE), or use the syllabus button to select them. Visit https://kmit.in for more details.`;
    }

    // Handle placement queries
    if (lowerQuery.includes('placement')) {
        const placements = data.highest_placements;
        const stats = data.placement_stats;
        if (placements.length || stats.length) {
            let response = '';
            if (placements.length) {
                const latest = placements[0];
                response += `In ${latest.academic_year}, KMIT had ${latest.number_of_selects} students placed at ${latest.company} with a CTC of ${latest.ctc_per_annum}. `;
            }
            if (stats.length) {
                const latestStats = stats[0];
                response += `Overall, ${latestStats.students_placed}/${latestStats.total_students} students were placed (${((latestStats.students_placed / latestStats.total_students) * 100).toFixed(2)}%) with an average salary of ₹${latestStats.average_salary_lpa} LPA. Contact Mr. D. Sudheer Reddy (sudheer@kmit.in) for details.`;
            }
            return response;
        }
        return 'No placement data found.';
    }

    // Handle Deepa Mam
    if (lowerQuery.includes('deepa mam') || lowerQuery.includes('deepa ganu')) {
        const admin = data.administration_management_lms.find((item: { name: string }) =>
            item.name.toLowerCase().includes('deepa')
        );
        if (admin) {
            return `${admin.name} is the ${admin.role} at KMIT. ${admin.details}`;
        }
        return 'No information found for Deepa Mam.';
    }

    // Default response with guidance
    return 'Thanks for your query! Please try specific keywords like "syllabus," "placement," or "contact," or use the interactive buttons for more options.';
}






// // src/data/CollegeData.ts
// import { supabase } from '../lib/supabase';

// export interface CollegeDataResponse {
//   text: string;
//   buttons?: Array<{ label: string; value: string }>;
// }

// interface Context {
//   selectedRegulation?: string;
// }

// // Define types for all tables (original 10 + new 4)
// type AboutKMIT = {
//   id: number;
//   established_year: number;
//   affiliation: string;
//   accreditation: string | null;
//   mission: string | null;
//   location: string | null;
//   contact_phone: string | null;
// };

// type Placement = {
//   id: number;
//   academic_year: string;
//   company_name: string;
//   num_selects: number;
//   ctc_per_annum: string;
//   internship_stipend: string | null;
// };

// type PlacementHighlight = {
//   id: number;
//   academic_year: string;
//   total_companies: number;
//   total_offers: number;
//   students_placed: number;
//   total_registered: number;
//   average_salary: string;
//   salary_breakdown: Record<string, number>;
// };

// type StudentAchievement = {
//   id: number;
//   student_name: string;
//   achievement: string;
//   details: Record<string, any>;
//   academic_year: string | null;
// };

// type Event = {
//   id: number;
//   name: string;
//   date: string;
//   description: string | null;
//   organizer: string | null;
// };

// type ResearchLab = {
//   id: number;
//   name: string;
//   description: string | null;
//   faculty: Array<{ name: string }>;
// };

// type CenterOfExcellence = {
//   id: number;
//   name: string;
//   description: string | null;
//   faculty: Array<{ name: string }>;
// };

// type AutoEducationTool = {
//   id: number;
//   name: string;
//   description: string | null;
//   features: Array<{ feature: string }>;
// };

// type StudentCouncil = {
//   id: number;
//   name: string;
//   roll_number: string;
//   designation: string;
//   academic_year: string;
// };

// type Club = {
//   id: number;
//   name: string;
//   description: string | null;
//   activities: Array<{ name: string; date?: string; theme?: string; description?: string; event?: string; platform?: string }>;
// };

// type AdministrationManagement = {
//   id: number;
//   role: string;
//   name: string;
//   details: Record<string, any>;
// };

// type Department = {
//   id: number;
//   name: string;
//   hod_name: string;
//   description: string;
// };

// type Committee = {
//   id: number;
//   name: string;
//   objectives: string;
//   functions: string[];
//   members: Array<{ name: string; department: string; designation: string }>;
// };

// type CoCurricular = {
//   id: number;
//   name: string;
//   description: string;
//   details: Record<string, any>;
// };

// export interface CollegeData {
//   aboutKMIT: AboutKMIT[];
//   placements: Placement[];
//   placementHighlights: PlacementHighlight[];
//   studentAchievements: StudentAchievement[];
//   events: Event[];
//   researchLabs: ResearchLab[];
//   centersOfExcellence: CenterOfExcellence[];
//   autoEducationTools: AutoEducationTool[];
//   studentCouncil: StudentCouncil[];
//   clubs: Club[];
//   administrationManagement: AdministrationManagement[];
//   departments: Department[];
//   committees: Committee[];
//   coCurriculars: CoCurricular[];
// }

// export const fetchCollegeData = async (): Promise<CollegeData> => {
//   console.log('Starting fetchCollegeData...');

//   // Fetch about_kmit
//   const { data: aboutKMITData, error: aboutKMITError } = await supabase.from('about_kmit').select('*');
//   if (aboutKMITError) throw new Error(`Error fetching about KMIT: ${aboutKMITError.message}`);
//   if (!aboutKMITData || aboutKMITData.length === 0) throw new Error('No about KMIT data available');

//   // Fetch placements
//   const { data: placementsData, error: placementsError } = await supabase.from('placements').select('*');
//   if (placementsError) throw new Error(`Error fetching placements: ${placementsError.message}`);
//   if (!placementsData) throw new Error('No placements data available');

//   // Fetch placement_highlights
//   const { data: placementHighlightsData, error: placementHighlightsError } = await supabase.from('placement_highlights').select('*');
//   if (placementHighlightsError) throw new Error(`Error fetching placement highlights: ${placementHighlightsError.message}`);
//   if (!placementHighlightsData) throw new Error('No placement highlights data available');

//   // Fetch student_achievements
//   const { data: studentAchievementsData, error: studentAchievementsError } = await supabase.from('student_achievements').select('*');
//   if (studentAchievementsError) throw new Error(`Error fetching student achievements: ${studentAchievementsError.message}`);
//   if (!studentAchievementsData) throw new Error('No student achievements data available');

//   // Fetch events
//   const today = new Date().toISOString().split('T')[0];
//   const { data: eventsData, error: eventsError } = await supabase
//     .from('events')
//     .select('*')
//     .gte('date', today)
//     .order('date', { ascending: true });
//   if (eventsError) throw new Error(`Error fetching events: ${eventsError.message}`);
//   if (!eventsData) throw new Error('No events data available');

//   // Fetch research_labs
//   const { data: researchLabsData, error: researchLabsError } = await supabase.from('research_labs').select('*');
//   if (researchLabsError) throw new Error(`Error fetching research labs: ${researchLabsError.message}`);
//   if (!researchLabsData) throw new Error('No research labs data available');

//   // Fetch centers_of_excellence
//   const { data: centersOfExcellenceData, error: centersOfExcellenceError } = await supabase.from('centers_of_excellence').select('*');
//   if (centersOfExcellenceError) throw new Error(`Error fetching centers of excellence: ${centersOfExcellenceError.message}`);
//   if (!centersOfExcellenceData) throw new Error('No centers of excellence data available');

//   // Fetch auto_education_tools
//   const { data: autoEducationToolsData, error: autoEducationToolsError } = await supabase.from('auto_education_tools').select('*');
//   if (autoEducationToolsError) throw new Error(`Error fetching auto education tools: ${autoEducationToolsError.message}`);
//   if (!autoEducationToolsData) throw new Error('No auto education tools data available');

//   // Fetch student_council
//   const { data: studentCouncilData, error: studentCouncilError } = await supabase.from('student_council').select('*');
//   if (studentCouncilError) throw new Error(`Error fetching student council: ${studentCouncilError.message}`);
//   if (!studentCouncilData) throw new Error('No student council data available');

//   // Fetch clubs
//   const { data: clubsData, error: clubsError } = await supabase.from('clubs').select('*');
//   if (clubsError) throw new Error(`Error fetching clubs: ${clubsError.message}`);
//   if (!clubsData) throw new Error('No clubs data available');

//   // Fetch administration_management
//   const { data: adminData, error: adminError } = await supabase.from('administration_management').select('*');
//   if (adminError) throw new Error(`Error fetching administration_management: ${adminError.message}`);
//   if (!adminData) throw new Error('No administration_management data available');

//   // Fetch departments
//   const { data: deptData, error: deptError } = await supabase.from('departments').select('*');
//   if (deptError) throw new Error(`Error fetching departments: ${deptError.message}`);
//   if (!deptData) throw new Error('No departments data available');

//   // Fetch committees
//   const { data: committeeData, error: committeeError } = await supabase.from('committees').select('*');
//   if (committeeError) throw new Error(`Error fetching committees: ${committeeError.message}`);
//   if (!committeeData) throw new Error('No committees data available');

//   // Fetch co_curriculars
//   const { data: coCurricularData, error: coCurricularError } = await supabase.from('co_curriculars').select('*');
//   if (coCurricularError) throw new Error(`Error fetching co_curriculars: ${coCurricularError.message}`);
//   if (!coCurricularData) throw new Error('No co_curriculars data available');

//   return {
//     aboutKMIT: aboutKMITData,
//     placements: placementsData,
//     placementHighlights: placementHighlightsData,
//     studentAchievements: studentAchievementsData,
//     events: eventsData,
//     researchLabs: researchLabsData,
//     centersOfExcellence: centersOfExcellenceData,
//     autoEducationTools: autoEducationToolsData,
//     studentCouncil: studentCouncilData,
//     clubs: clubsData,
//     administrationManagement: adminData,
//     departments: deptData,
//     committees: committeeData,
//     coCurriculars: coCurricularData,
//   };
// };

// let cachedCollegeData: CollegeData | null = null;

// export const getCollegeData = async (query: string, context: Context = {}): Promise<CollegeDataResponse | null> => {
//   if (!cachedCollegeData) {
//     try {
//       cachedCollegeData = await fetchCollegeData();
//     } catch (error) {
//       console.error('Error fetching college data:', error);
//       return { text: 'Sorry, I couldn’t fetch the data at the moment. Please try again later.' };
//     }
//   }

//   const collegeData = cachedCollegeData;
//   const lowerQuery = query.toLowerCase();

//   // Handle general greetings
//   if (lowerQuery === 'hi' || lowerQuery === 'hello' || lowerQuery === 'hey') {
//     return { text: "Namaste! I'm Vidya, your assistant for KMIT College queries. Ask about placements, events, clubs, or more!" };
//   }

//   // Check for about KMIT
//   if (lowerQuery.includes('about') || lowerQuery.includes('kmit') || lowerQuery.includes('college')) {
//     const kmit = collegeData.aboutKMIT[0];
//     return {
//       text: `Keshav Memorial Institute of Technology (KMIT), established in ${kmit.established_year}, is affiliated with ${kmit.affiliation}. ${kmit.accreditation}. Mission: ${kmit.mission} Located at ${kmit.location}, contact: ${kmit.contact_phone}.`,
//     };
//   }

//   // Check for placements
//   if (lowerQuery.includes('placement') || lowerQuery.includes('recruitment')) {
//     const highlight = collegeData.placementHighlights[0];
//     const highlights = Object.entries(highlight.salary_breakdown)
//       .map(([range, students]) => `- ${range.replace('_', ' ')}: ${students} students`)
//       .join('\n');
//     return {
//       text: `Placement Highlights for ${highlight.academic_year}: ${highlight.total_companies} companies visited, ${highlight.total_offers} offers rolled out, ${highlight.students_placed}/${highlight.total_registered} students placed, average salary ${highlight.average_salary}.\n\nHighlights:\n${highlights}`,
//     };
//   }

//   // Check for highest placements
//   if (lowerQuery.includes('highest placement') || lowerQuery.includes('top placement')) {
//     const placements = collegeData.placements
//       .map((p) => `- ${p.academic_year}: ${p.company_name} selected ${p.num_selects} student(s) with CTC ${p.ctc_per_annum} (Internship: ${p.internship_stipend})`)
//       .join('\n');
//     return { text: `Highest Placements at KMIT:\n\n${placements}` };
//   }

//   // Check for student achievements
//   if (lowerQuery.includes('achievement') || lowerQuery.includes('student success')) {
//     const achievements = collegeData.studentAchievements
//       .map((a) => `- ${a.student_name} (${a.academic_year}): ${a.achievement}`)
//       .join('\n');
//     return { text: `Student Achievements at KMIT:\n\n${achievements}` };
//   }

//   // Check for events
//   if (lowerQuery.includes('event') || lowerQuery.includes('upcoming')) {
//     const events = collegeData.events
//       .map((e) => `- ${e.name} (${e.date}): ${e.description}${e.organizer ? `, Organizer: ${e.organizer}` : ''}`)
//       .join('\n');
//     return { text: `Upcoming Events at KMIT:\n\n${events || 'No upcoming events.'}` };
//   }

//   // Check for research labs
//   if (lowerQuery.includes('research') || lowerQuery.includes('labs')) {
//     const labs = collegeData.researchLabs
//       .map((l) => `- ${l.name}: ${l.description} (Faculty: ${l.faculty.map((f) => f.name).join(', ')})`)
//       .join('\n');
//     return { text: `Research Labs at KMIT:\n\n${labs}` };
//   }

//   // Check for centers of excellence
//   if (lowerQuery.includes('center of excellence') || lowerQuery.includes('coe')) {
//     const centers = collegeData.centersOfExcellence
//       .map((c) => `- ${c.name}: ${c.description} (Faculty: ${c.faculty.map((f) => f.name).join(', ')})`)
//       .join('\n');
//     return { text: `Centers of Excellence at KMIT:\n\n${centers}` };
//   }

//   // Check for auto education tools
//   if (lowerQuery.includes('education tool') || lowerQuery.includes('lms') || lowerQuery.includes('tessellator') || lowerQuery.includes('telescope')) {
//     const tools = collegeData.autoEducationTools
//       .map((t) => `- ${t.name}: ${t.description} (Features: ${t.features.map((f) => f.feature).join(', ')})`)
//       .join('\n');
//     return { text: `Auto Education Tools at KMIT:\n\n${tools}` };
//   }

//   // Check for student council
//   if (lowerQuery.includes('student council') || lowerQuery.includes('representatives')) {
//     const council = collegeData.studentCouncil
//       .map((s) => `- ${s.name} (${s.roll_number}): ${s.designation} (${s.academic_year})`)
//       .join('\n');
//     return { text: `Student Council Representatives at KMIT:\n\n${council}` };
//   }

//   // Check for clubs
//   if (lowerQuery.includes('club') || lowerQuery.includes('extracurricular')) {
//     const clubs = collegeData.clubs
//       .map((c) => `- ${c.name}: ${c.description}\n  Activities: ${c.activities.map((a) => a.name).join(', ')}`)
//       .join('\n');
//     return { text: `Clubs at KMIT:\n\n${clubs}` };
//   }

//   // Check for administration management
//   if (lowerQuery.includes('administration') || lowerQuery.includes('management')) {
//     const admins = collegeData.administrationManagement
//       .map((a) => `- ${a.role}: ${a.name}`)
//       .join('\n');
//     return { text: `Administration at KMIT:\n\n${admins}` };
//   }

//   // Check for departments
//   if (lowerQuery.includes('department') || lowerQuery.includes('hod')) {
//     const depts = collegeData.departments
//       .map((d) => `- ${d.name}: ${d.hod_name}`)
//       .join('\n');
//     return { text: `Departments at KMIT:\n\n${depts}` };
//   }

//   // Check for committees
//   if (lowerQuery.includes('committee')) {
//     const committees = collegeData.committees
//       .map((c) => `- ${c.name}: ${c.objectives}`)
//       .join('\n');
//     return { text: `Committees at KMIT:\n\n${committees}` };
//   }

//   // Check for co-curricular programs
//   if (lowerQuery.includes('co-curricular') || lowerQuery.includes('extracurricular')) {
//     const programs = collegeData.coCurriculars
//       .map((p) => `- ${p.name}: ${p.description}`)
//       .join('\n');
//     return { text: `Co-Curricular Programs at KMIT:\n\n${programs}` };
//   }

//   // Dynamic search across all tables
//   const searchAcrossTables = (query: string) => {
//     const results: string[] = [];
//     const searchInObject = (obj: any, prefix: string = ''): string[] => {
//       const matches: string[] = [];
//       for (const key in obj) {
//         const value = obj[key];
//         if (typeof value === 'string' && value.toLowerCase().includes(query)) {
//           matches.push(`${prefix}${key}: ${value}`);
//         } else if (Array.isArray(value)) {
//           value.forEach((item, index) => {
//             const subMatches = searchInObject(item, `${prefix}${key}[${index}].`);
//             matches.push(...subMatches);
//           });
//         } else if (typeof value === 'object' && value !== null) {
//           const subMatches = searchInObject(value, `${prefix}${key}.`);
//           matches.push(...subMatches);
//         }
//       }
//       return matches;
//     };

//     results.push(...searchInObject(collegeData.aboutKMIT, 'About KMIT - '));
//     results.push(...searchInObject(collegeData.placements, 'Placements - '));
//     results.push(...searchInObject(collegeData.placementHighlights, 'Placement Highlights - '));
//     results.push(...searchInObject(collegeData.studentAchievements, 'Student Achievements - '));
//     results.push(...searchInObject(collegeData.events, 'Events - '));
//     results.push(...searchInObject(collegeData.researchLabs, 'Research Labs - '));
//     results.push(...searchInObject(collegeData.centersOfExcellence, 'Centers of Excellence - '));
//     results.push(...searchInObject(collegeData.autoEducationTools, 'Auto Education Tools - '));
//     results.push(...searchInObject(collegeData.studentCouncil, 'Student Council - '));
//     results.push(...searchInObject(collegeData.clubs, 'Clubs - '));
//     results.push(...searchInObject(collegeData.administrationManagement, 'Administration - '));
//     results.push(...searchInObject(collegeData.departments, 'Departments - '));
//     results.push(...searchInObject(collegeData.committees, 'Committees - '));
//     results.push(...searchInObject(collegeData.coCurriculars, 'Co-Curriculars - '));

//     return results.length > 0 ? results.join('\n\n') : null;
//   };

//   // Try dynamic search for the query
//   const searchResult = searchAcrossTables(lowerQuery);
//   if (searchResult) {
//     return { text: searchResult };
//   }

//   // Default response for unmatched queries
//   return { text: 'Sorry, I couldn’t find information matching your query. Try asking about placements, events, clubs, or other KMIT-related topics!' };
// };
// export interface CollegeData {
//   collegeMap: {
//     description: string;
//     link: string;
//   };
//   placement: {
//     description: string;
//     highlights: string[];
//   };
//   importantNumbers: {
//     description: string;
//     numbers: { name: string; number: string }[];
//   };
//   cutoff: {
//     description: string;
//     branches: { name: string; cutoff: string }[];
//   };
//   feedback: {
//     description: string;
//     link: string;
//   };
//   syllabus: {
//     regulations: {
//       name: string;
//       departments: { name: string; link: string }[];
//     }[];
//   };
//   upcomingEvents: {
//     id: string;
//     name: string;
//     date: string;
//     description: string;
//     link?: string;
//   }[];
// }

// export const collegeData: CollegeData = {
//   collegeMap: {
//     description: "KMIT is located at 8-3-1022, Keshav Memorial Institute of Technology, Narayanaguda, Hyderabad, Telangana 500029. The campus is easily accessible and centrally located.",
//     link: "https://www.google.com/maps/place/Keshav+Memorial+Institute+of+Technology+(KMIT)/@17.4073032,78.4850806,15z/data=!4m6!3m5!1s0x3bcb99c44533324f:0x8aa5456a7d836bb5!8m2!3d17.4073032!4d78.4850806!16s%2Fm%2F0r4s9_l?entry=ttu"
//   },
//   placement: {
//     description: "The 2025 Placement season at KMIT is expected to be excellent. In the previous year, over 85% of eligible students were placed with an average package of 7.5 LPA. Top recruiters include TCS, Infosys, Wipro, Accenture, and Amazon.",
//     highlights: [
//       "Expected average package: 7.5+ LPA",
//       "Highest package in previous batch: 35 LPA",
//       "85%+ placement rate expected",
//       "Pre-placement training begins in 6th semester"
//     ]
//   },
//   importantNumbers: {
//     description: "Here are some important contact numbers for KMIT:",
//     numbers: [
//       { name: "Main Office", number: "040-27567501" },
//       { name: "Admissions", number: "040-27567502" },
//       { name: "Examination Cell", number: "040-27567503" },
//       { name: "Placement Cell", number: "040-27567504" },
//       { name: "Library", number: "040-27567505" },
//       { name: "Security", number: "040-27567506" }
//     ]
//   },
//   cutoff: {
//     description: "KMIT is one of the premier engineering colleges with competitive cutoffs. For 2023, the EAMCET cutoff ranks were:",
//     branches: [
//       { name: "Computer Science Engineering", cutoff: "Below 10,000 rank" },
//       { name: "Information Technology", cutoff: "Below 15,000 rank" },
//       { name: "Electronics & Communication", cutoff: "Below 20,000 rank" },
//       { name: "Electrical & Electronics", cutoff: "Below 25,000 rank" }
//     ]
//   },
//   feedback: {
//     description: "We value your feedback on college facilities, faculty, and academics. You can submit your feedback through our online portal or directly to the respective department heads.",
//     link: "https://kmit.in/feedback"
//   },
//   syllabus: {
//     regulations: [
//       {
//         name: "KR24",
//         departments: [
//           { name: "IT", link: "https://kmit.in/syllabus/kr24/it.pdf" },
//           { name: "CSE", link: "https://kmit.in/syllabus/kr24/cse.pdf" },
//           { name: "CSD", link: "https://kmit.in/syllabus/kr24/csd.pdf" },
//           { name: "CSM", link: "https://kmit.in/syllabus/kr24/csm.pdf" }
//         ]
//       },
//       {
//         name: "KR23",
//         departments: [
//           { name: "IT", link: "https://kmit.in/syllabus/kr23/it.pdf" },
//           { name: "CSE", link: "https://kmit.in/syllabus/kr23/cse.pdf" },
//           { name: "CSD", link: "https://kmit.in/syllabus/kr23/csd.pdf" },
//           { name: "CSM", link: "https://kmit.in/syllabus/kr23/csm.pdf" }
//         ]
//       },
//       {
//         name: "KR22",
//         departments: [
//           { name: "IT", link: "https://kmit.in/syllabus/kr22/it.pdf" },
//           { name: "CSE", link: "https://kmit.in/syllabus/kr22/cse.pdf" },
//           { name: "CSD", link: "https://kmit.in/syllabus/kr22/csd.pdf" },
//           { name: "CSM", link: "https://kmit.in/syllabus/kr22/csm.pdf" }
//         ]
//       },
//       {
//         name: "KR21",
//         departments: [
//           { name: "IT", link: "https://kmit.in/syllabus/kr21/it.pdf" },
//           { name: "CSE", link: "https://kmit.in/syllabus/kr21/cse.pdf" },
//           { name: "CSD", link: "https://kmit.in/syllabus/kr21/csd.pdf" },
//           { name: "CSM", link: "https://kmit.in/syllabus/kr21/csm.pdf" }
//         ]
//       },
//       {
//         name: "Other",
//         departments: [
//           { name: "IT", link: "https://kmit.in/syllabus/other/it.pdf" },
//           { name: "CSE", link: "https://kmit.in/syllabus/other/cse.pdf" },
//           { name: "CSD", link: "https://kmit.in/syllabus/other/csd.pdf" },
//           { name: "CSM", link: "https://kmit.in/syllabus/other/csm.pdf" }
//         ]
//       }
//     ]
//   },
//   upcomingEvents: [
//     {
//       id: "event1",
//       name: "Tech Fest 2024",
//       date: "October 15-16, 2024",
//       description: "Annual technical festival with competitions, workshops, and guest lectures",
//       link: "https://kmit.in/techfest2024"
//     },
//     {
//       id: "event2",
//       name: "Campus Recruitment Drive",
//       date: "November 5-10, 2024",
//       description: "Major companies visiting for 2025 batch recruitment"
//     },
//     {
//       id: "event3",
//       name: "Alumni Meet",
//       date: "December 22, 2024",
//       description: "Annual alumni gathering with networking opportunities"
//     },
//     {
//       id: "event4",
//       name: "National Conference on AI",
//       date: "January 15-16, 2025",
//       description: "Research conference on latest developments in Artificial Intelligence"
//     }
//   ]
// };

// export const getCollegeData = (query: string): string | null => {
//   const lowerQuery = query.toLowerCase();

//   // Handle general greetings
//   if (lowerQuery === "hi" || lowerQuery === "hello" || lowerQuery === "hey") {
//     return "Namaste! I'm Vidya, your assistant for KMIT College related queries. How can I assist you today? You can ask about placements, syllabus, or upcoming events!";
//   }

//   // Check for college map
//   if (lowerQuery.includes("map") || lowerQuery.includes("location")) {
//     return `${collegeData.collegeMap.description}\n\nView the map here: ${collegeData.collegeMap.link}`;
//   }

//   // Check for placement
//   if (lowerQuery.includes("placement") || lowerQuery.includes("recruitment")) {
//     const highlights = collegeData.placement.highlights.map(h => `- ${h}`).join('\n');
//     return `${collegeData.placement.description}\n\nHighlights:\n${highlights}`;
//   }

//   // Check for important numbers
//   if (lowerQuery.includes("number") || lowerQuery.includes("contact")) {
//     const numbers = collegeData.importantNumbers.numbers.map(n => `- ${n.name}: ${n.number}`).join('\n');
//     return `${collegeData.importantNumbers.description}\n\n${numbers}`;
//   }

//   // Check for cutoff
//   if (lowerQuery.includes("cutoff") || lowerQuery.includes("rank")) {
//     const branches = collegeData.cutoff.branches.map(b => `- ${b.name}: ${b.cutoff}`).join('\n');
//     return `${collegeData.cutoff.description}\n\n${branches}`;
//   }

//   // Check for feedback
//   if (lowerQuery.includes("feedback")) {
//     return `${collegeData.feedback.description}\n\nSubmit feedback here: ${collegeData.feedback.link}`;
//   }

//   // Check for syllabus or regulation codes (will be handled in ChatWindow for multi-step interaction)
//   const regulationNames = collegeData.syllabus.regulations.map(r => r.name.toLowerCase());
//   if (lowerQuery.includes("syllabus") || regulationNames.includes(lowerQuery)) {
//     return "Which regulation would you like the syllabus for?";
//   }

//   // Check for upcoming events
//   if (lowerQuery.includes("event") || lowerQuery.includes("upcoming")) {
//     const events = collegeData.upcomingEvents
//       .map(e => {
//         const link = e.link ? `\nLink: ${e.link}` : '';
//         return `- ${e.name} (${e.date}): ${e.description}${link}`;
//       })
//       .join('\n');
//     return `Upcoming Events at KMIT:\n\n${events}`;
//   }

//   // Default response for unmatched queries
//   return null;
// };