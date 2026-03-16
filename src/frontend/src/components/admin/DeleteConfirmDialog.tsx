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
import { Loader2 } from "lucide-react";

interface DeleteConfirmDialogProps {
  open: boolean;
  productName: string;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({
  open,
  productName,
  isPending,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent data-ocid="admin.delete.dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display font-medium">
            Delete Product
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">{productName}</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            disabled={isPending}
            data-ocid="admin.delete_cancel_button"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            data-ocid="admin.delete_confirm_button"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting…
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
