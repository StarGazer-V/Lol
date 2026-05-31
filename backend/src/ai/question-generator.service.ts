export type AiQuestionGenerationInput = {
  sourceType: "topic" | "pdf" | "docx" | "notes" | "guideline" | "custom_prompt";
  prompt: string;
  subject: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  count: number;
};

export type AiQuestionQualityReport = {
  duplicateRisk: number;
  hallucinationRisk: number;
  referenceCoverage: number;
  clinicalAuthenticity: number;
  plagiarismRisk: number;
  facultyReviewRequired: boolean;
};

export class QuestionGeneratorService {
  buildSystemPrompt(): string {
    return [
      "You generate authentic NEET PG and INI-CET medical MCQs.",
      "Every question must include a clinical stem, options, correct answer, option-wise explanations, high-yield notes, memory trick, references, difficulty, tags, and estimated solving time.",
      "If source evidence is insufficient, mark hallucination risk instead of inventing facts.",
      "Output must remain in Draft status until faculty approval."
    ].join(" ");
  }

  scoreQuality(report: AiQuestionQualityReport): number {
    const safetyPenalty = report.duplicateRisk + report.hallucinationRisk + report.plagiarismRisk;
    const evidenceScore = report.referenceCoverage * 0.35 + report.clinicalAuthenticity * 0.35;
    return Math.max(0, Math.min(100, Math.round((evidenceScore * 100) - (safetyPenalty * 18))));
  }
}
