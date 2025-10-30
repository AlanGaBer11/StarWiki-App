import React from "react";

interface TimeLineItemProps {
  titulo: string;
  texto: string;
}

const TimelineItem: React.FC<TimeLineItemProps> = ({ titulo, texto }) => (
  <li className="timeline-item">
    <div className="dot"></div>
    <h3 className="timeline-title">{titulo}</h3>
    <p className="timeline-text">{texto}</p>
  </li>
);
export default TimelineItem;
