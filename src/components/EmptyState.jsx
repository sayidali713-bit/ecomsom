import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  actionTo,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {Icon && (
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <Icon size={36} className="text-slate-400" />
        </div>
      )}
      <h2 className="text-xl font-semibold text-slate-800 mb-2">{title}</h2>
      {description && (
        <p className="text-slate-500 text-sm max-w-sm mb-8">{description}</p>
      )}
      {action && (
        <button onClick={action} className="btn-primary">
          {actionLabel}
        </button>
      )}
      {actionTo && !action && (
        <Link to={actionTo} className="btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
