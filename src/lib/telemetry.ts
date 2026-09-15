import { trace, context, propagation, SpanKind, SpanStatusCode } from '@opentelemetry/api';

export function createSpan(name: string, options: { kind?: SpanKind } = {}) {
	const tracer = trace.getTracer('ftnui');
	return tracer.startSpan(name, {
		kind: options.kind || SpanKind.CLIENT
	});
}

export function getTraceHeaders(): Record<string, string> {
	const headers: Record<string, string> = {};

	// Inject the current trace context into headers
	propagation.inject(context.active(), headers);

	return headers;
}

export function withSpan<T>(
	name: string,
	fn: () => Promise<T>,
	options: { kind?: SpanKind } = {}
): Promise<T> {
	const span = createSpan(name, options);

	return context.with(trace.setSpan(context.active(), span), async () => {
		try {
			const result = await fn();
			span.setStatus({ code: SpanStatusCode.OK });
			return result;
		} catch (error) {
			span.setStatus({
				code: SpanStatusCode.ERROR,
				message: error instanceof Error ? error.message : 'Unknown error'
			});
			span.recordException(error instanceof Error ? error : new Error(String(error)));
			throw error;
		} finally {
			span.end();
		}
	});
}
