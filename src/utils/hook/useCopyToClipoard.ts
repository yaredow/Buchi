import { toast } from "@/components/ui/use-toast";

export default function useCopyToClipboard(path: string) {
  const copytoClipboard = async () => {
    try {
      await navigator.clipboard.writeText(path);
      toast({
        description: "Copied to clipboard",
      });
    } catch (error) {
      console.error("Can not copy to the clipboard");
    }
  };

  return { copytoClipboard };
}
