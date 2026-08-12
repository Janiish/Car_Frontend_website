type MicrocopyGetErrorType = "microcopySetKey" | "microcopy" | "microcopyKey" | "microcopyValue";

export class MicrocopyGetError extends Error {
    constructor(
        message: string,
        public type: MicrocopyGetErrorType,
        public microcopyKey?: string,
        public microcopySetKey?: string
    ) {
        super(message);
        this.name = "MicrocopyGetError";
        this.type = type;
        microcopyKey && (this.microcopyKey = microcopyKey);
        microcopySetKey && (this.microcopySetKey = microcopySetKey);
    }
}
