import React from 'react';
import { useLocation } from 'react-router-dom';
import ComingSoon from './ComingSoon';

export const ComingSoonWrapper: React.FC = () => {
  const location = useLocation();
  const state = location.state as {
    title?: string;
    subtitle?: string;
    description?: string;
    expectedLaunch?: string;
  } | null;

  const defaultProps = {
    title: "Insurance Product Coming Soon",
    subtitle: "We're working on this insurance solution",
    description: "Our team is developing this comprehensive insurance product to better serve your needs. Stay tuned for updates!",
    expectedLaunch: "Q1 2025"
  };

  return (
    <ComingSoon 
      title={state?.title || defaultProps.title}
      subtitle={state?.subtitle || defaultProps.subtitle}
      description={state?.description || defaultProps.description}
      expectedLaunch={state?.expectedLaunch || defaultProps.expectedLaunch}
    />
  );
};

export default ComingSoonWrapper;
