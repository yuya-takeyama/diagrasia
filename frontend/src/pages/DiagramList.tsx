import React, { useState, useEffect, SFC } from 'react';
import { Diagram } from '../interfaces';
import { Link } from 'react-router-dom';

export const DiagramList: SFC = () => {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);

  const fetchDiagrams = async () => {
    const res = await fetch('/api/v1/diagrams');
    const json = await res.json();
    setDiagrams(
      json.diagrams.map((d: Diagram) => ({
        ...d,
        createdAt: new Date(d.createdAt),
      })),
    );
  };

  useEffect(() => {
    fetchDiagrams();
  }, []);

  return (
    <div>
      <ul>
        {diagrams.map((d, i) => (
          <li key={`diagram-` + i}>
            {d.createdAt.toISOString()}:{' '}
            <Link to={`/diagrams/${d.id}`}>{d.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
