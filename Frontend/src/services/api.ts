// src/services/api.ts
interface BackendResponse {
    generated_response: string;
    error?: string;
}

interface AttendanceResponse {
    roll_number: string;
    attendance: string;
    error?: string;
}

export const searchQuery = async (query: string): Promise<{ summary: string; results: string[] }> => {
    try {
        const response = await fetch('http://localhost:5000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data: BackendResponse = await response.json();

        if (response.ok && data.generated_response) {
            return { summary: data.generated_response, results: [] };
        } else {
            return { summary: data.error || 'Sorry, I couldn’t process that. Can you try again?', results: [] };
        }
    } catch (error) {
        console.error('Error fetching response from Flask backend:', error);
        throw new Error('Failed to fetch response from the server.');
    }
};

export const getAttendance = async (rollNumber: string): Promise<{ rollNumber: string; attendance: string }> => {
    try {
        const response = await fetch('http://localhost:5000/get-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rollNumber }),
        });

        const data: AttendanceResponse = await response.json();

        if (response.ok && data.attendance) {
            return { rollNumber: data.roll_number, attendance: data.attendance };
        } else {
            throw new Error(data.error || 'Failed to fetch attendance.');
        }
    } catch (error) {
        console.error('Error fetching attendance:', error);
        throw error;
    }
  };