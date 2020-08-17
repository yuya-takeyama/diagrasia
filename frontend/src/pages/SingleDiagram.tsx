import React, { useState, useEffect, SFC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Diagram } from '../interfaces';

export const SingleDiagram: SFC = () => {
  const { diagramId } = useParams();
  const [diagram, setDiagram] = useState<Diagram | undefined>(undefined);

  const fetchDiagram = async () => {
    const res = await fetch(`/api/v1/diagrams/${diagramId}`);
    const diagram = await res.json();
    setDiagram({
      ...diagram.diagram,
      createdAt: new Date(diagram.diagram.createdAt),
    });
  };

  useEffect(() => {
    fetchDiagram();
  }, []);

  return (
    <div>
      Single Diagram (ID: {diagramId})
      <div>
        {diagram ? (
          <div>
            <dl>
              <dt>Title</dt>
              <dd>{diagram.title}</dd>
              <dt>Content</dt>
              <dd>
                <pre>
                  <code>{diagram.content}</code>
                </pre>
              </dd>
              <dt>Created at</dt>
              <dd>{diagram.createdAt.toISOString()}</dd>
            </dl>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <Link to="/">Back</Link>
      </div>
    </div>
  );
};
