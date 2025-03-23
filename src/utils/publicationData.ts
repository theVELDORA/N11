
import { Publication, User } from './types';

export const sampleUser: User = {
  id: '1',
  name: 'Dr. Jane Smith',
  email: 'jane.smith@university.edu',
  affiliation: 'University of Science & Technology',
  position: 'Associate Professor',
  department: 'Computer Science',
  photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop'
};

export const samplePublications: Publication[] = [
  {
    id: '1',
    title: 'Machine Learning Approaches for Predictive Analytics in Higher Education',
    authors: ['Jane Smith', 'Robert Johnson', 'Maria Garcia'],
    journal: 'Journal of Educational Data Mining',
    year: 2023,
    doi: '10.1234/jedm.2023.01.001',
    abstract: 'This study explores various machine learning algorithms to predict student performance and retention in higher education institutions.',
    citations: 12,
    type: 'journal',
    tags: ['machine learning', 'education', 'data mining']
  },
  {
    id: '2',
    title: 'A Framework for Secure Cloud Computing in Academic Environments',
    authors: ['Jane Smith', 'David Lee'],
    conference: 'International Conference on Cloud Computing',
    year: 2022,
    doi: '10.5678/iccc.2022.02.015',
    abstract: 'We present a novel framework for ensuring data security and privacy in cloud-based academic computing environments.',
    citations: 8,
    type: 'conference',
    tags: ['cloud computing', 'security', 'education']
  },
  {
    id: '3',
    title: 'Advances in Natural Language Processing for Scientific Literature Analysis',
    authors: ['Jane Smith', 'Michael Brown', 'Sophia Wang'],
    journal: 'Computational Linguistics Journal',
    year: 2023,
    doi: '10.9101/clj.2023.03.005',
    abstract: 'This paper reviews recent advances in NLP techniques specifically tailored for analyzing scientific literature across disciplines.',
    citations: 15,
    type: 'journal',
    tags: ['NLP', 'scientific literature', 'text mining']
  },
  {
    id: '4',
    title: 'Ethical Considerations in AI-Driven Educational Systems',
    authors: ['Jane Smith', 'Elena Rodriguez'],
    book: 'Handbook of Artificial Intelligence in Education',
    year: 2021,
    doi: '10.1112/aie.2021.04.007',
    abstract: 'This chapter discusses ethical implications and considerations when deploying AI systems in educational contexts.',
    citations: 22,
    type: 'chapter',
    tags: ['AI ethics', 'education', 'policy']
  },
  {
    id: '5',
    title: 'Quantum Computing: Implications for Cryptography and Data Security',
    authors: ['Jane Smith', 'Alex Chen', 'William Taylor'],
    journal: 'Journal of Quantum Information Science',
    year: 2022,
    doi: '10.3141/jqis.2022.05.012',
    abstract: 'We analyze how advances in quantum computing will impact current cryptographic methods and data security protocols.',
    citations: 18,
    type: 'journal',
    tags: ['quantum computing', 'cryptography', 'security']
  },
  {
    id: '6',
    title: 'Blockchain Technology for Academic Credential Verification',
    authors: ['Jane Smith', 'Thomas Wilson'],
    conference: 'IEEE Blockchain Conference',
    year: 2021,
    doi: '10.7272/ieee-bc.2021.06.009',
    abstract: 'This paper proposes a blockchain-based system for verifying academic credentials and reducing certificate fraud.',
    citations: 10,
    type: 'conference',
    tags: ['blockchain', 'education', 'security']
  },
  {
    id: '7',
    title: 'The Future of Higher Education: A Computational Perspective',
    authors: ['Jane Smith'],
    book: 'Computational Approaches to Educational Innovation',
    year: 2020,
    abstract: 'This book explores how computational methods are reshaping higher education systems globally.',
    citations: 45,
    type: 'book',
    tags: ['education', 'innovation', 'technology']
  }
];

export const generatePublicationSummary = (publications: Publication[]) => {
  const summary = {
    totalPublications: publications.length,
    journalArticles: publications.filter(p => p.type === 'journal').length,
    conferenceProceedings: publications.filter(p => p.type === 'conference').length,
    books: publications.filter(p => p.type === 'book').length,
    bookChapters: publications.filter(p => p.type === 'chapter').length,
    other: publications.filter(p => p.type === 'other').length,
    citationCount: publications.reduce((sum, pub) => sum + (pub.citations || 0), 0),
    publicationsByYear: {} as Record<string, number>,
    topJournals: {} as Record<string, number>,
    topConferences: {} as Record<string, number>,
    coAuthors: {} as Record<string, number>,
  };

  // Count publications by year
  publications.forEach(pub => {
    const year = pub.year.toString();
    summary.publicationsByYear[year] = (summary.publicationsByYear[year] || 0) + 1;
  });

  // Count journals
  publications.forEach(pub => {
    if (pub.journal) {
      summary.topJournals[pub.journal] = (summary.topJournals[pub.journal] || 0) + 1;
    }
  });

  // Count conferences
  publications.forEach(pub => {
    if (pub.conference) {
      summary.topConferences[pub.conference] = (summary.topConferences[pub.conference] || 0) + 1;
    }
  });

  // Count co-authors
  publications.forEach(pub => {
    pub.authors.forEach(author => {
      if (author !== 'Jane Smith') { // Exclude the main author
        summary.coAuthors[author] = (summary.coAuthors[author] || 0) + 1;
      }
    });
  });

  return summary;
};
