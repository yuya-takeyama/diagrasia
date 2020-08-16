import React, { useState, useEffect, SFC } from 'react';
import { Diagram } from '../interfaces';
import { Link } from 'react-router-dom';

interface DiagramsResponse {
  diagrams: Diagram[];
}

export const DiagramList: SFC = () => {
  const [diagrams, setDiagrams] = useState<DiagramsResponse>({ diagrams: [] });

  const fetchDiagrams = async () => {
    const res = await fetch('/api/v1/diagrams');
    const diagrams = await res.json();
    setDiagrams(diagrams);
  };

  useEffect(() => {
    fetchDiagrams();
  }, []);

  return (
    <div>
      <ul>
        {diagrams.diagrams.map((d, i) => (
          <li key={`diagram-` + i}>
            <Link to={`/diagrams/${d.id}`}>{d.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
