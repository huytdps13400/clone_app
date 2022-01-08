import React from 'react';
import CounterCard from '../../../../@jumbo/components/Common/CounterCard';

const ProjectCounterCard = ({ project = [] }) => {
  return (
    <CounterCard
      icon={'/images/dashboard/projectIcon.svg'}
      number={project.length}
      label="Dự án"
      labelProps={{
        fontSize: 16,
      }}
      backgroundColor={['#8E49F0 -18.96%', '#4904AB 108.17%']}
      gradientDirection="180deg"
    />
  );
};

export default ProjectCounterCard;
