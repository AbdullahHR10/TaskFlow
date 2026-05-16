import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { BackgroundColor } from "@/features/shared/types/enums";
import { NOTE_BG_COLOR_MAP } from "@/features/notes/utils/noteColors";
import { MdOutlineSubtitles } from "react-icons/md";

const COLORS: BackgroundColor[] = Object.values(BackgroundColor);

interface Props {
  onClose: () => void;
  onCreate: (data: {
    title: string;
    content: string;
    background_color: BackgroundColor;
  }) => Promise<void>;
}

const CreateNoteModal = ({ onClose, onCreate }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bgColor, setBgColor] = useState<BackgroundColor>(BackgroundColor.BLUE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length < 3 || trimmedTitle.length > 30) {
      setError("Title must be between 3 and 30 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      await onCreate({
        title,
        content,
        background_color: bgColor.toUpperCase() as keyof typeof NOTE_BG_COLOR_MAP,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-background p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6">New Note</h2>

        <div className="flex flex-col gap-4">
          <Input
            label="Title"
            placeholder="Untitled"
            icon={<MdOutlineSubtitles />}
            value={title}
            error={error ?? undefined}
            onChange={e => {
              setTitle(e.target.value);
              setError(null);
            }}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Content</label>
            <textarea
              className="w-full rounded-md bg-input px-3 py-2 text-sm border border-input focus:outline-none focus:border-[rgb(var(--input-focus))]"
              rows={4}
              placeholder="Write something..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setBgColor(color)}
                className={`h-8 w-8 rounded-full transition cursor-pointer
                  ${NOTE_BG_COLOR_MAP[color as keyof typeof NOTE_BG_COLOR_MAP]}
                  ${bgColor === color ? "ring-2 ring-foreground" : ""}
                `}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="secondary"
            text="Cancel"
            onClick={onClose}
            disabled={isSubmitting}
          />
          <Button
            text="Create"
            onClick={submit}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;
