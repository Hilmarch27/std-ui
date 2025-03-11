import { Input } from "@/components/ui/input";
import { useFieldContext } from "../hooks/useAppForm";

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  return (
    <label>
      <div>{label}</div>
      <Input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </label>
  );
}