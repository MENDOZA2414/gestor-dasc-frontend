import Card from './Card';

const SummaryCard = ({ icon, label, value, color }) => {
  return (
    <Card className="col-span-12 sm:col-span-6 lg:col-span-3 h-[100px]">
      <div className="flex items-center h-full px-2 gap-4">
        {/* Ícono */}
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
          <div className="text-white text-2xl">{icon}</div>
        </div>

        {/* Texto */}
        <div className="flex flex-col justify-center flex-1 leading-snug">
          <p className="text-base md:text-lg text-gray-700 font-medium leading-snug mb-0">
            {label}
          </p>
        </div>

        {/* Valor */}
        <div className="text-[22px] font-bold text-neutral-900">{value}</div>
      </div>
    </Card>
  );
};

export default SummaryCard;
