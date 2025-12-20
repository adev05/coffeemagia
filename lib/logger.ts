import { trace } from '@opentelemetry/api'

// Создаём logger только на сервере
let logger: any = null

if (typeof window === 'undefined') {
  const winston = require('winston')
  const LokiTransport = require('winston-loki')

  const transports: any[] = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]

  try {
    transports.push(
      new LokiTransport({
        host: process.env.LOKI_URL || 'http://localhost:3100',
        labels: { app: 'coffeemagia-app' },
        json: true,
        format: winston.format.json(),
        replaceTimestamp: true,
        onConnectionError: (err: Error) => console.error('Loki connection error:', err)
      })
    )
  } catch (error) {
    console.warn('Не удалось подключить Loki транспорт:', error)
  }

  logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    defaultMeta: { service: 'coffeemagia-app' },
    transports
  })
}

/**
 * Логирование с добавлением trace context
 */
export function logWithTrace(level: 'info' | 'error' | 'warn' | 'debug', message: string, meta?: Record<string, unknown>) {
  // На клиенте просто используем console
  if (typeof window !== 'undefined') {
    console[level](message, meta)
    return
  }

  if (!logger) return

  const span = trace.getActiveSpan()
  const traceContext = span ? {
    traceId: span.spanContext().traceId,
    spanId: span.spanContext().spanId,
  } : {}

  logger.log(level, message, { ...meta, ...traceContext })
}
