export type ValidationResult = {
    valid: true,
    validation_message: null
} | {
    valid: false,
    validation_message: string
}