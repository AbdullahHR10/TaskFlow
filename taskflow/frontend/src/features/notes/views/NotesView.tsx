import { useState } from "react";

import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import FullPageSpinner from "@/components/ui/FullPageSpinner";
import Pagination from "@/components/ui/Pagination";

import NotesList from "../components/NotesList";
import CreateNoteModal from "../components/CreateNoteModal";
import ViewNoteModal from "../components/ViewNoteModal";
import EditNoteModal from "../components/EditNoteModal";

import { useNotes } from "@/features/notes/hooks/useNotes";

import type { Note } from "@/features/notes/types/note";

import { FaPlus } from "react-icons/fa";

const NotesView = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const {
    notes,
    page,
    pages,
    isInitialLoading,
    isFetching,
    fetchPage,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();

  if (isInitialLoading) {
    return <FullPageSpinner />;
  }

  return (
    <div className="mr-12 flex min-h-screen flex-col">
      <PageHeader
        title="Notes"
        subtitle="Take notes of whatever's on your mind!"
        actions={
          <Button
            text="New Note"
            icon={<FaPlus />}
            onClick={() => setIsCreateOpen(true)}
          />
        }
      />

      {selectedNote && (
        <ViewNoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={(note) => {
            setSelectedNote(null);
            setEditingNote(note);
          }}
          onDelete={async (note) => {
            await deleteNote(note.id);
            setSelectedNote(null);
          }}
        />
      )}

      {editingNote && (
        <EditNoteModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onEdit={async (id, data) => {
            await updateNote(id, data);
            setEditingNote(null);
          }}
        />
      )}

      {isCreateOpen && (
        <CreateNoteModal
          onClose={() => setIsCreateOpen(false)}
          onCreate={async (data) => {
            await createNote(data);
            setIsCreateOpen(false);
          }}
        />
      )}

      <NotesList
        notes={notes}
        onNoteClick={(note) => {
          setSelectedNote(note);
        }}
      />

      <div className="sticky bottom-0 p-4">
        <Pagination
          page={page}
          pages={pages}
          isFetching={isFetching}
          onChange={fetchPage}
        />
      </div>
    </div>
  );
};

export default NotesView;
