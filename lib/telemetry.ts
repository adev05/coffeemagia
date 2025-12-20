import { trace, SpanStatusCode, Span } from '@opentelemetry/api'
import { logWithTrace } from './logger'

/**
 * Утилиты для работы с OpenTelemetry трейсами
 */

const tracer = trace.getTracer('coffeemagia-tracer', '1.0.0')

/**
 * Создает span для отслеживания операции
 * @param name Имя операции
 * @param fn Функция для выполнения
 * @param attributes Дополнительные атрибуты для span
 */
export async function traceOperation<T>(
  name: string,
  fn: (span: Span) => Promise<T>,
  attributes?: Record<string, string | number | boolean>
): Promise<T> {
  return tracer.startActiveSpan(name, async (span) => {
    logWithTrace('info', `Начало операции: ${name}`, attributes)
    try {
      // Добавляем атрибуты к span
      if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
          span.setAttribute(key, value)
        })
      }

      const result = await fn(span)
      
      span.setStatus({ code: SpanStatusCode.OK })
      logWithTrace('info', `Завершено: ${name}`)
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      logWithTrace('error', `Ошибка в ${name}: ${errorMessage}`, { error })
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: errorMessage,
      })
      span.recordException(error as Error)
      throw error
    } finally {
      span.end()
    }
  })
}

/**
 * Создает синхронный span
 */
export function traceSync<T>(
  name: string,
  fn: (span: Span) => T,
  attributes?: Record<string, string | number | boolean>
): T {
  return tracer.startActiveSpan(name, (span) => {
    logWithTrace('info', `Начало: ${name}`, attributes)
    try {
      if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
          span.setAttribute(key, value)
        })
      }

      const result = fn(span)
      span.setStatus({ code: SpanStatusCode.OK })
      logWithTrace('info', `Завершено: ${name}`)
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      logWithTrace('error', `Ошибка в ${name}: ${errorMessage}`, { error })
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: errorMessage,
      })
      span.recordException(error as Error)
      throw error
    } finally {
      span.end()
    }
  })
}

/**
 * Добавляет событие к текущему span
 */
export function addEvent(name: string, attributes?: Record<string, string | number | boolean>) {
  const span = trace.getActiveSpan()
  if (span) {
    span.addEvent(name, attributes)
  }
}

/**
 * Устанавливает атрибут к текущему span
 */
export function setAttribute(key: string, value: string | number | boolean) {
  const span = trace.getActiveSpan()
  if (span) {
    span.setAttribute(key, value)
  }
}

/**
 * Получает текущий tracer
 */
export function getTracer() {
  return tracer
}
