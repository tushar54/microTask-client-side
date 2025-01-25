import React from "react";
import { Briefcase, CheckSquare, User } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: <Briefcase size={40} color="#FF6B6B" />,
      value: "50K+",
      label: "TOTAL JOB POSTS",
    },
    {
      id: 2,
      icon: <CheckSquare size={40} color="#FF6B6B" />,
      value: "26K+",
      label: "COMPLETED PROJECTS",
    },
    {
      id: 3,
      icon: <User size={40} color="#FF6B6B" />,
      value: "94K+",
      label: "REGISTERED FREELANCERS",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="w-60 bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full mb-4">
            {stat.icon}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h2>
          <p className="text-gray-500 text-center">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
