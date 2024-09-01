import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobCard from './JobCard';

describe('JobCard Component', () => {
    it('renders job name, skills, location, and company', () => {
        render(
            <JobCard
                job={{
                    name: 'Frontend Developer',
                    skills: [{ name: 'JavaScript' }, { name: 'React' }],
                    location: { text: 'Remote' },
                    tags: [{ name: 'company', value: 'TechCorp' }],
                    summary: 'Full stack developer',
                }}
            />
        );

        expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
        expect(screen.getByText('JavaScript, React')).toBeInTheDocument();
        expect(screen.getByText('Remote')).toBeInTheDocument();
        expect(screen.getByText('TechCorp')).toBeInTheDocument();
    });

    it('renders default text when summary is empty', () => {
        render(
            <JobCard
                job={{
                    name: 'Frontend Developer',
                    skills: [{ name: 'JavaScript' }, { name: 'React' }],
                    location: { text: 'Remote' },
                    tags: [{ name: 'company', value: 'TechCorp' }],
                    summary: '',
                }}
            />
        );

        expect(screen.getByText('--- NO DESCRIPTION AVAILABLE ---')).toBeInTheDocument();
    });

    it('does not show "Show More" if the content does not need truncation', () => {
        render(
            <JobCard
                job={{
                    name: 'Frontend Developer',
                    skills: [{ name: 'JavaScript' }, { name: 'React' }],
                    location: { text: 'Remote' },
                    tags: [{ name: 'company', value: 'TechCorp' }],
                    summary: 'Short summary.',
                }}
            />
        );

        expect(screen.queryByText('Show More')).not.toBeInTheDocument();
    });

});
