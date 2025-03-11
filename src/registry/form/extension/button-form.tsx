import { Button } from "@/components/ui/button";
import { useFormContext } from "../hooks/useAppForm";

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <Button type="submit" disabled={isSubmitting}>{label}</Button>}
    </form.Subscribe>
  );
}