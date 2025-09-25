import UploadDropzone from "@/components/UploadDropzone";

export default function UploadPage() {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h1 className="mb-4 text-2xl font-semibold">PDF hochladen</h1>
      <UploadDropzone />
    </div>
  );
}
