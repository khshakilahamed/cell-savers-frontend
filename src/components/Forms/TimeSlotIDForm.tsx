import { useTimeSlotsQuery } from "@/redux/api/timeSlotApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type TimeSlotIDFieldProps = {
  name: string;
  label?: string;
  onChange: (e: any) => void;
};

const TimeSlotIDField = ({ name, label, onChange }: TimeSlotIDFieldProps) => {
  const { data, isLoading } = useTimeSlotsQuery({
    limit: 100,
    page: 1,
  });

  const timeSlots = data?.timeSlots;
  const timeSlotOptions = timeSlots?.map((timeSlot: any) => {
    // console.log(timeSlot?.id);
    return {
      label: timeSlot?.startTime + " - " + timeSlot?.endTime,
      value: timeSlot?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={timeSlotOptions as SelectOptions[]}
      handleChange={(e) => onChange(e)}
    />
  );
};

export default TimeSlotIDField;
