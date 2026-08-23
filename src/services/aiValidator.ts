import {
  GeminiDecisionContext,
  GeminiRecommendationResponse,
} from '../types';

export interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

/**
 * AI Response Validator.
 * Strictly verifies that the AI's selected recommendation matches a feasible deterministic candidate
 * and contains valid operational explainability structures.
 */
export function validateAiResponse(
  response: unknown,
  context: GeminiDecisionContext
): ValidationResult {
  if (!response || typeof response !== 'object') {
    return { isValid: false, reason: 'Response is not a valid JSON object.' };
  }

  const res = response as Partial<GeminiRecommendationResponse>;

  // 1. Verify candidate ID exists in candidate actions
  if (!res.selectedCandidateId) {
    return { isValid: false, reason: 'selectedCandidateId is missing from AI response.' };
  }

  const matchedCandidate = context.candidateActions.find(
    (c) => c.id === res.selectedCandidateId
  );

  if (!matchedCandidate) {
    return {
      isValid: false,
      reason: `AI selected unknown candidate ID "${res.selectedCandidateId}".`,
    };
  }

  // 2. Verify candidate is operationally feasible
  if (!matchedCandidate.isFeasible) {
    return {
      isValid: false,
      reason: `AI selected infeasible candidate "${matchedCandidate.id}": ${matchedCandidate.invalidationReason || 'Violates safety threshold'}`,
    };
  }

  // 3. Verify confidence classification
  if (!res.confidence || !['HIGH', 'MEDIUM', 'LOW'].includes(res.confidence)) {
    return { isValid: false, reason: `Invalid confidence value "${res.confidence}".` };
  }

  // 4. Verify 5-Point Explainability Rationale structure
  const rationale = res.rationale;
  if (!rationale || typeof rationale !== 'object') {
    return { isValid: false, reason: '5-Point explainability rationale is missing.' };
  }

  if (
    !rationale.what ||
    !rationale.why ||
    !Array.isArray(rationale.evidence) ||
    rationale.evidence.length === 0 ||
    !rationale.selection ||
    !rationale.consequences
  ) {
    return {
      isValid: false,
      reason: 'Rationale is incomplete. All 5 points (what, why, evidence, selection, consequences) are required.',
    };
  }

  return { isValid: true };
}
