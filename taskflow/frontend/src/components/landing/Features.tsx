import { FiCheckSquare, FiTrendingUp, FiDollarSign, FiFileText } from "react-icons/fi";

const features = [
  {
    icon: FiCheckSquare,
    title: "Tasks List",
    description: "Create, organize, and prioritize your to-dos. Set deadlines, add labels, and never miss an important task again.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-600",
    lightBg: "bg-blue-50 dark:bg-blue-950/20"
  },
  {
    icon: FiTrendingUp,
    title: "Habit Tracker",
    description: "Build lasting habits with daily tracking and visual progress charts. See your streaks grow and stay motivated.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-600",
    lightBg: "bg-green-50 dark:bg-green-950/20"
  },
  {
    icon: FiDollarSign,
    title: "Budget Tracker",
    description: "Take control of your finances. Track expenses, set budgets, and gain insights into your spending patterns.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-600",
    lightBg: "bg-purple-50 dark:bg-purple-950/20"
  },
  {
    icon: FiFileText,
    title: "Note Taker",
    description: "Capture ideas instantly. Create rich text notes, organize them into folders, and search through them effortlessly.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-600",
    lightBg: "bg-orange-50 dark:bg-orange-950/20"
  }
];

const Features = () => {
  return (
    <section id="features" className="px-6 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl mb-4">Everything You Need</h2>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          Powerful tools working together to help you achieve more every day
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index} 
              className="group relative p-8 rounded-2xl transition-all duration-300 hover:scale-105 border-divider hover:border-transparent hover:shadow-2xl"
            >
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${feature.lightBg}`} />
              
              <div className="relative">
                <div className={`inline-flex items-center justify-center size-16 rounded-xl ${feature.bgColor} mb-6 shadow-lg`}>
                  <Icon className="size-8 text-white" />
                </div>
                
                <h3 className="text-3xl mb-4">{feature.title}</h3>
                
                <p className="text-lg text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Features;
