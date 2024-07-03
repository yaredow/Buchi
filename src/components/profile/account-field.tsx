import { Button } from "../ui/button";
import { Input } from "../ui/input";

type AccountFieldsProps = {
  label: string;
  value: string | null | undefined;
  isEditing: boolean;
  isFieldEditing: boolean;
  onEditClick: () => void;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AccountField({
  label,
  value,
  isEditing,
  isFieldEditing,
  onEditClick,
  onChange,
}: AccountFieldsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="h-12">
        <h4 className="font-semibold">{label}</h4>
        {isFieldEditing ? (
          <Input
            className="mt-2"
            type="text"
            value={value || ""}
            onChange={onChange}
          />
        ) : (
          <p className="text-sm">{value}</p>
        )}
      </div>
      <Button
        className="w-[85px]"
        disabled={!isEditing}
        onClick={onEditClick}
        variant="outline"
      >
        {isFieldEditing ? "Save" : "Change"}
      </Button>
    </div>
  );
}
