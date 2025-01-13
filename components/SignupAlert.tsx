import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { SignupForm } from "./signup-form";

export default function SignupAlert({
  open,
  onAlertClose,
}: {
  open: boolean;
  onAlertClose: () => void;
}) {
  return (
    <Dialog>
      <DialogContent>
        <SignupForm />
      </DialogContent>

      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to create a free account to save your progress?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Your progress won't be saved unless you create a free account.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={onAlertClose}>
              No
              {/* if no - add red notification in sidebar */}
            </AlertDialogCancel>

            <DialogTrigger asChild>
              <AlertDialogAction>Yes</AlertDialogAction>
            </DialogTrigger>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
