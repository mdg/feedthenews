import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

let traceExporter;
if (process.env.HONEYCOMB_KEY) {
	traceExporter = new OTLPTraceExporter({
		url: 'https://api.honeycomb.io/v1/traces',
		headers: {
			'x-honeycomb-team': process.env.HONEYCOMB_KEY,
			'x-honeycomb-dataset': 'ftnui'
		}
	});
}

const sdk = new NodeSDK({
	serviceName: 'ftnui',
	traceExporter,
	instrumentations: []
});

sdk.start();
