# AI Coding Quality — Reglas globales

Fuentes: Agentic Coding Handbook (tweag), OpenSSF Security Guide, awesome-cursorrules, agent-style.

## Plan antes de código (CRÍTICO)

NUNCA escribir código sin entender primero. Orden obligatorio:

1. **Explorar** — leer los archivos que el cambio toca, trazar el flujo real
2. **Planear** — escribir qué se va a cambiar y por qué antes de tocar nada
3. **Implementar** — el diff mínimo que resuelve el problema
4. **Revisar** — preguntarse: ¿qué pasa si el usuario hace X? ¿Y si Y falla?

Si la tarea toca más de 3 archivos → crear un plan escrito antes de empezar.

## Razonamiento de edge cases (OBLIGATORIO)

Antes de cualquier código que maneja input de usuario, autenticación, o datos externos:

> "Trazar el input del usuario desde el punto de entrada hasta el almacenamiento, listando cada punto donde se necesita validación, encoding, o verificación de auth."

Preguntas a hacerse siempre:
- ¿Qué pasa si el usuario envía vacío / null / string muy largo?
- ¿Qué pasa si la request falla a mitad?
- ¿Qué pasa si el usuario no tiene permisos?
- ¿Qué pasa si dos usuarios hacen esto al mismo tiempo?

## Seguridad — reglas negativas (NUNCA hacer)

- **NUNCA** interpolar input de usuario en queries SQL → usar always parameterized queries
- **NUNCA** hardcodear secrets, API keys, tokens en código → usar env variables
- **NUNCA** confiar en datos externos sin validar (APIs, user input, archivos)
- **NUNCA** exponer mensajes de error con stack traces al usuario
- **NUNCA** usar `PUBLIC_` prefix en Astro para variables secretas
- **NUNCA** hacer queries sin RLS activado en Supabase
- **NUNCA** aceptar uploads sin validar tipo y tamaño
- **NUNCA** guardar passwords en texto plano

Validación siempre en el server, nunca solo en el cliente.

## Código limpio — reglas negativas

- **NUNCA** mutar objetos existentes → retornar nuevas copias (inmutabilidad)
- **NUNCA** funciones de más de 50 líneas → extraer
- **NUNCA** archivos de más de 400 líneas → dividir por dominio
- **NUNCA** anidación mayor de 4 niveles
- **NUNCA** duplicar lógica → buscar si ya existe en el repo antes de escribir
- **NUNCA** agregar manejo de errores para casos que no pueden ocurrir
- **NUNCA** agregar abstracciones especulativas → YAGNI
- **NUNCA** comentarios que explican QUÉ → solo comentar el POR QUÉ no obvio

## Auto-revisión (recursive improvement)

Después de escribir código:
1. Revisar el propio output buscando: null checks faltantes, ramas no manejadas, defaults inseguros
2. Si es código de autenticación o dinero → una segunda pasada explícita de seguridad
3. Preguntarse: "¿qué rompería esto si el input fuera inesperado?"

## Astro — reglas específicas

- Server components por defecto → client:* solo cuando hay interactividad real
- `client:visible` para below-fold, `client:idle` para no crítico, `client:load` solo above-fold
- Content Collections tipadas con Zod → errores en build, no en runtime
- `@supabase/ssr` en server (nunca browser client en server) → nuevo client por request
- `export const prerender = false` en rutas que leen cookies
- Variables de entorno: Zod schema en `src/env.ts`, nunca acceso directo a `import.meta.env`
- Middleware centralizado para auth guards en `src/middleware.ts`

## Next.js — reglas específicas

- Server components por defecto, `'use client'` solo cuando necesario
- `layout.tsx` para layouts compartidos, `loading.tsx` para loading states
- `error.tsx` para error boundaries por ruta
- Route handlers para API, nunca lógica en page components
- Imágenes siempre con `<Image />` de next/image
- Metadata explícita en cada page para SEO

## TypeScript — reglas

- `strict: true` siempre, sin excepciones
- Nunca `any` → usar `unknown` y narrowing
- Tipos en las boundaries (API responses, user input) → Zod para runtime validation
- No castear con `as` sin entender por qué el tipo es correcto

## Recursive self-check antes de entregar

Antes de decir "listo":
- [ ] ¿Se validaron todos los inputs en el boundary del sistema?
- [ ] ¿Hay algún null/undefined que pueda explotar?
- [ ] ¿Los secrets están en env variables?
- [ ] ¿El código más corto que hace lo mismo existe ya en el repo?
- [ ] ¿Qué pasa si este endpoint recibe 1000 requests simultáneas?
