type ConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  isOpen,
  title,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-slate-900">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-red-600">ยืนยันการลบเกม</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            คุณต้องการลบ &ldquo;{title}&rdquo; ออกจากคลัง Backlog หรือไม่?
          </p>
        </div>
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs transition"
            onClick={onCancel}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl text-xs transition shadow-sm"
            onClick={onConfirm}
          >
            ยืนยันการลบ
          </button>
        </div>
      </div>
    </div>
  );
}
