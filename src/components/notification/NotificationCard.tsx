import { Info } from "lucide-react";

interface NotificationCardProps {
  title: string;
  message: string;
}

export const NotificationCard = ({ title, message }: NotificationCardProps) => {
  return (
    <article className="flex items-center gap-3 rounded-16 bg-white px-4 py-4 shadow-card">
      <Info aria-hidden className="size-4 shrink-0 text-fg-title" />
      <div className="flex min-w-0 flex-col gap-2">
        <h2 className="text-body-3 text-fg-title">{title}</h2>
        {/* Messages carry their own line breaks. */}
        <p className="text-body-6 leading-relaxed whitespace-pre-line text-fg-primary">{message}</p>
      </div>
    </article>
  );
};
