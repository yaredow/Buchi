import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UpdatePasswordForm from "../form/update-password-form";

export default function PasswordResetField({
  isEditing,
}: {
  isEditing: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-semibold">Password</h4>
        <p className="text-sm">************</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={!isEditing} variant="outline" className="w-[85px]">
            Reset
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-lg">
          <DialogHeader>
            <DialogTitle className="mb-4">Update your password</DialogTitle>
            <DialogDescription>
              You will be logged out once you change your password
            </DialogDescription>
          </DialogHeader>
          <UpdatePasswordForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
