import { TriangleAlert } from "lucide-react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "../UI/Button";

interface IDeleteModel {
  onDelete?: () => void;
  onCancel?: () => void;
}

export function DeleteModel(props: IDeleteModel) {
  return (
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col bg-neutral-100 rounded-xl p-6 m-2">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <div className="p-4 bg-red-100 rounded-full">
              <TriangleAlert className="text-red-500" />
            </div>
            <div className="flex flex-col">
              <div>Delete Item</div>
              <div className="text-sm text-neutral-500">
                This action cannot be undone
              </div>
            </div>
          </div>
          <div
            className="mr-2 cursor-pointer z-10 hover:bg-neutral-300/60 p-2 rounded-lg"
            onClick={props.onCancel}
          >
            <CloseIcon size="size-7" />
          </div>
        </div>
        <div className="max-w-sm mt-5 text-neutral-700 text-md">
          Are you sure you want to delete this item? This will permanently
          remove it from your collection and cannot be recovered.
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            varient="normal"
            size="md"
            text="Cancel"
            className="w-full"
            onClick={props.onCancel}
          />
          <Button
            varient="danger"
            size="md"
            text="Delete"
            className="w-full"
            onClick={props.onDelete}
          />
        </div>
      </div>
    </div>
  );
}
