import React from 'react';

interface Club {
    name: string;
    instagramLink: string;
}

interface ClubsDropdownProps {
    onSelect: (clubName: string) => void;
}

const clubs: Club[] = [
    { name: 'Mudra', instagramLink: 'https://www.instagram.com/mudraofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'Vachan', instagramLink: 'https://www.instagram.com/vachan.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'Aakarshan', instagramLink: 'https://www.instagram.com/aakarshanofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'PR KMIT', instagramLink: 'https://www.instagram.com/pr.kmit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'Traces of Lenses', instagramLink: 'https://www.instagram.com/tracesoflenses?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'KMIT Official', instagramLink: 'https://www.instagram.com/kmitofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'Abhinaya', instagramLink: 'https://www.instagram.com/abhinaya_thedramaclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'Recurse', instagramLink: 'https://www.instagram.com/recurse.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'NSS KMIT', instagramLink: 'https://www.instagram.com/nss.kmit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'Rotaract KMIT', instagramLink: 'https://www.instagram.com/rotaract_kmit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'Kaivalya', instagramLink: 'https://www.instagram.com/kaivalya_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'Aalap', instagramLink: 'https://www.instagram.com/aalapofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'OC KMIT', instagramLink: 'https://www.instagram.com/oc.kmit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
];

const ClubsDropdown: React.FC<ClubsDropdownProps> = ({ onSelect }) => {
    return (
        <div className="p-2">
            {clubs.map((club, index) => (
                <a
                    key={index}
                    href={club.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 text-kmit-teal hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => onSelect(club.name)}
                >
                    {club.name}
                </a>
            ))}
        </div>
    );
};

export default ClubsDropdown;