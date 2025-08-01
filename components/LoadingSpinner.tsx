const LoadingSpinner = ({ size = "md", text = "Loading..." }: { size?: "sm" | "md" | "lg", text?: string }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
