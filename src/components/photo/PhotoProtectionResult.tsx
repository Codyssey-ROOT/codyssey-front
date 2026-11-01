import { InfoBox } from "@/components/common/InfoBox";
import { Process } from "@/components/common/Process";
import { SERVICE_NAME } from "@/const/service";
import type { PhotoStatus } from "@/types/photo";

const PROTECTION_ITEMS = [
  "얼굴",
  "차량 번호판",
  "신분증·카드",
  "주소·간판",
  "전화번호·텍스트",
  "위치 정보",
] as const;

const RESULT_GUIDES = {
  safe: {
    title: "사진 보호가 완료되었어요",
    description: ["방어 모델링이 완료되었어요.", `${SERVICE_NAME}가 다음과 같은 정보를 보호했어요`],
  },
  vulnerable: {
    title: "취약점이 발견되었어요",
    description: ["취약점이 발견되었어요", `${SERVICE_NAME}가 다음과 같은 정보를 보호하세요`],
  },
} satisfies Record<Exclude<PhotoStatus, "inProgress">, { title: string; description: string[] }>;

interface PhotoProtectionResultProps {
  status: Exclude<PhotoStatus, "inProgress">;
}

export const PhotoProtectionResult = ({ status }: PhotoProtectionResultProps) => {
  const { title, description } = RESULT_GUIDES[status];

  return (
    <div className="flex flex-col gap-4">
      <InfoBox variant="summary" title={title}>
        {description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </InfoBox>
      <ul className="flex flex-col gap-4 rounded-20 bg-white p-4 shadow-card">
        {PROTECTION_ITEMS.map((item) => (
          <li key={item}>
            <Process className="text-body-3">{item}</Process>
          </li>
        ))}
      </ul>
    </div>
  );
};
