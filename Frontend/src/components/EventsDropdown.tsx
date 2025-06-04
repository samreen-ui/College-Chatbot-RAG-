import React from 'react';
import { Calendar } from 'lucide-react';

interface Event {
    id: string;
    name: string;
    // date: string;
    description: string;
    link?: string;
}

interface EventsDropdownProps {
    onSelect: (eventName: string) => void;
}

const EventsDropdown: React.FC<EventsDropdownProps> = ({ onSelect }) => {
    // Sample events data (replace with actual data source as needed)
    const events: Event[] = [
        {
            id: '1',
            name: 'Prakalp',
            // date: '2025-05-10',
            description: 'Join us for a day of innovation and technology showcases.',
            // link: 'https://kmit.in/techfest',
        },
        // {
        //   id: '2',
        //   name: 'Career Fair',
        //   date: '2025-07-10',
        //   description: 'Meet top employers and explore job opportunities.',
        // },
    ];

    return (
        <div className="bg-gray-50 px-3 py-2 text-sm">
            <h4 className="font-medium text-gray-700 mb-2">Upcoming Events</h4>
            <div className="space-y-2">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white p-2 rounded border cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => onSelect(event.name)}
                    >
                        <div className="flex items-start">
                            <Calendar size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                            <div>
                                <h5 className="font-medium">{event.name}</h5>
                                <p className="text-xs text-gray-500">{event.date}</p>
                                <p className="text-xs mt-1">{event.description}</p>
                                {event.link && (
                                    <a
                                        href={event.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                                        onClick={(e) => e.stopPropagation()} // Prevent triggering onSelect when clicking link
                                    >
                                        Learn more
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsDropdown;