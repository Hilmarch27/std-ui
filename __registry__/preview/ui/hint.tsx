import { Button } from "@/components/ui/button";
import { Hint } from "@/registry/extension/hint";

const HintPreview = () => {
  return (
    <Hint content="This is the hint text">
      <Button>Hover me</Button>
    </Hint>
  );
};

export default HintPreview;
