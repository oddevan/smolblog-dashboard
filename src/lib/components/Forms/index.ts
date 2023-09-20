export interface FormPartState {
	payload: Record<string, unknown>;
	dirty: boolean;
	valid: boolean;
}