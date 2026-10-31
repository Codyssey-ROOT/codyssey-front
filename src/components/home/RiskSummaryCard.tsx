interface RiskSummaryCardProps {
  vulnerableCount: number;
}

export const RiskSummaryCard = ({ vulnerableCount }: RiskSummaryCardProps) => {
  return (
    <section
      aria-labelledby="risk-summary-title"
      className="flex flex-col gap-2 rounded-20 bg-white px-6 py-7 shadow-card"
    >
      <p className="text-body-7 text-fg-secondary-1">내 사진 노출 위험도</p>
      <h2 id="risk-summary-title" className="text-h2 font-bold text-fg-title">
        {vulnerableCount > 0 ? (
          <>
            사진 <span className="text-warning">{vulnerableCount}장</span>에서
            <br />
            <span className="text-warning">위험 요소</span>가 있어요
          </>
        ) : (
          <>
            모든 사진이
            <br />
            안전하게 보호중이에요
          </>
        )}
      </h2>
    </section>
  );
};
