/**
 * Упрощённая инициализация OpenTelemetry для Next.js
 * Совместима с Next.js 16 и Turbopack
 */

export async function register() {
  // Работает только в Node.js runtime, не в Edge
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('🔧 [instrumentation.ts] Инициализация OpenTelemetry...')
    
    try {
      const { NodeSDK } = await import('@opentelemetry/sdk-node')
      const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http')

      const exporterUrl = process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || 'http://localhost:4318/v1/traces'
      
      console.log('📡 [instrumentation.ts] URL экспортера:', exporterUrl)

      const sdk = new NodeSDK({
        serviceName: 'coffeemagia-app',
        traceExporter: new OTLPTraceExporter({ url: exporterUrl }),
      })

      sdk.start()
      console.log('✅ [instrumentation.ts] OpenTelemetry SDK запущен!')
    } catch (error) {
      console.error('❌ [instrumentation.ts] Ошибка:', error)
    }
  }
}


