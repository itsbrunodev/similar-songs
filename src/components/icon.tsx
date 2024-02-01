import { Disc3Icon } from "lucide-react";

export function Icon() {
  return (
    <div className="flex items-center gap-2.5 text-3xl font-bold text-white">
      <Disc3Icon className="text-primary-600" size={28} />
      <span>Similar Songs</span>
    </div>
  );
}
