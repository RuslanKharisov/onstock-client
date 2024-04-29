import { Button } from "@/shared/ui/button";

export function AvatarField({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value?: string) => void;
}) {

  return (
    <Button
      variant="ghost"
      className="w-[84px] h-[84px] p-0.5 rounded-full relative block"
      type="button"
    >
    </Button>
  );
}