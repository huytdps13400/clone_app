import React from 'react';
import CounterCard from '../../../../@jumbo/components/Common/CounterCard';

const TeamsCounterCard = ({ user = [] }) => {
  return (
    <CounterCard
      icon={'/images/dashboard/teamsIcon.svg'}
      number={user.length}
      label="Người dùng"
      labelProps={{
        fontSize: 16,
      }}
      backgroundColor={['#C076FB -18.96%', '#7717C2 108.17%']}
      gradientDirection="180deg"
    />
  );
};

export default TeamsCounterCard;
