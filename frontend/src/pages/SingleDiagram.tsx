import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Diagram } from '../interfaces';

interface DiagramResponse {
  diagram: Diagram | undefined;
}

export const SingleDiagram = () => {
  const { diagramId } = useParams();
  const [diagram, setDiagram] = useState<DiagramResponse>({
    diagram: undefined,
  });

  const fetchDiagram = async () => {
    const res = await fetch(`/api/v1/diagrams/${diagramId}`);
    const diagram = await res.json();
    setDiagram(diagram);
  };

  useEffect(() => {
    fetchDiagram();
  }, []);

  return (
    <div>
      Single Diagram (ID: {diagramId})
      <div>
        {diagram.diagram ? (
          <div>
            <dl>
              <dt>content</dt>
              <dd>
                <pre>
                  <code>{diagram.diagram.content}</code>
                </pre>
              </dd>
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
