import React from "react";
import { BookOpen, Users, TrendingUp } from "lucide-react";

const StatsSection =()=> {
  const stats = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      value: "1000+",
      label: "Articles Published",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      value: "50K+",
      label: "Active Readers",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      value: "95%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center"
        >
          <div className="flex justify-center mb-4">{stat.icon}</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {stat.value}
          </h3>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsSection; 