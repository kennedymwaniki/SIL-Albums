interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  // action?: React.ReactNode;
}

const EmptyState = ({ title, description, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && <div className="mb-4 text-gray-300">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">{description}</p>
      {/* {action && action} */}
    </div>
  );
};

export default EmptyState;
