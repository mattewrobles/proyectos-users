/**
 * TabBar — uTransfer Design System
 * Figma: 40006284:4192 — SVGs extraídos directamente del archivo
 *
 * Container: bg=#151516, r=40, p=8, w=362, h=70
 * Tab active:   bg=#000000, label=#f9fafb
 * Tab inactive: bg=#151516, label=#484848
 * Tab item: r=9999, h=54, px=24, py=4, gap=2, border #222222/1px
 * Label: Inter Regular 10px
 * Center FAB: logo uTransfer (48×48) extraído del Vector del Figma
 */

// ── Icons extraídos de Figma ──────────────────────────────────────────────────

const HomeIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M18.943 7.59946L15.2572 4.19432C14.1086 3.13316 13.5343 2.60258 12.8818 2.40191C12.3072 2.22522 11.6928 2.22522 11.1182 2.40191C10.4657 2.60258 9.89136 3.13316 8.74275 4.19432L5.057 7.59946C4.29913 8.29963 3.9202 8.64972 3.6486 9.06656C3.40788 9.43603 3.2299 9.84276 3.12187 10.2703C3 10.7527 3 11.2686 3 12.3004V18.5998C3 19.4399 3 19.8599 3.16349 20.1808C3.3073 20.463 3.53677 20.6925 3.81901 20.8363C4.13988 20.9998 4.55992 20.9998 5.4 20.9998H6.6C7.44008 20.9998 7.86012 20.9998 8.18099 20.8363C8.46323 20.6925 8.6927 20.463 8.83651 20.1808C9 19.8599 9 19.4399 9 18.5998V15.3998C9 14.5597 9 14.1397 9.16349 13.8188C9.3073 13.5366 9.53677 13.3071 9.81901 13.1633C10.1399 12.9998 10.5599 12.9998 11.4 12.9998H12.6C13.4401 12.9998 13.8601 12.9998 14.181 13.1633C14.4632 13.3071 14.6927 13.5366 14.8365 13.8188C15 14.1397 15 14.5597 15 15.3998V18.5998C15 19.4399 15 19.8599 15.1635 20.1808C15.3073 20.463 15.5368 20.6925 15.819 20.8363C16.1399 20.9998 16.5599 20.9998 17.4 20.9998H18.6C19.4401 20.9998 19.8601 20.9998 20.181 20.8363C20.4632 20.6925 20.6927 20.463 20.8365 20.1808C21 19.8599 21 19.4399 21 18.5998V12.3004C21 11.2686 21 10.7527 20.8781 10.2703C20.7701 9.84276 20.5921 9.43603 20.3514 9.06656C20.0798 8.64972 19.7009 8.29963 18.943 7.59946Z"
      stroke={active ? '#E1E4E8' : '#484848'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

const MovimientosIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3"
      stroke={active ? '#E1E4E8' : '#484848'} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M13 10L13 21" stroke={active ? '#E1E4E8' : '#484848'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 13L18 21" stroke={active ? '#E1E4E8' : '#484848'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 13L8 20"   stroke={active ? '#E1E4E8' : '#484848'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 7.98693C19.16 7.98693 17.1922 8.24252 15.8771 6.49346C14.3798 4.50218 11.6202 4.50218 10.1229 6.49346C8.80782 8.24252 6.84003 7.98693 5 7.98693H3"
      stroke={active ? '#E1E4E8' : '#484848'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const BeneficiosIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 7H15.5C16.8807 7 18 5.88071 18 4.5C18 3.11929 16.8807 2 15.5 2H15.4286C13.535 2 12 3.53502 12 5.42857M12 7V5.42857M12 7H8.5C7.11929 7 6 5.88071 6 4.5C6 3.11929 7.11929 2 8.5 2H8.57143C10.465 2 12 3.53502 12 5.42857M12 7V22M21 14.5H3M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V11.8C21 10.1198 21 9.27976 20.673 8.63803C20.3854 8.07354 19.9265 7.6146 19.362 7.32698C18.7202 7 17.8802 7 16.2 7H7.8C6.11984 7 5.27976 7 4.63803 7.32698C4.07354 7.6146 3.6146 8.07354 3.32698 8.63803C3 9.27976 3 10.1198 3 11.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
      stroke={active ? '#E1E4E8' : '#484848'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

const AjustesIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke={active ? '#E1E4E8' : '#484848'} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20"
      stroke={active ? '#E1E4E8' : '#484848'} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

/**
 * uTransfer logo — extraído de Figma node 40006205:4342
 * Círculo gris + forma naranja (U derecha) + forma teal (U izquierda)
 */
const UTransferLogo = () => (
  <svg width="36" height="36" viewBox="0 0 50 50" fill="none">
    {/* Background circle */}
    <path
      d="M49 25C49 38.2548 38.2548 49 25 49C11.7452 49 1 38.2548 1 25C1 11.7452 11.7452 1 25 1C38.2548 1 49 11.7452 49 25Z"
      fill="#525252"
    />
    {/* Orange shape — right U */}
    <path
      d="M20.1793 15.7789V11.7867C20.1793 11.5147 20.3132 11.2607 20.5375 11.1068C20.7618 10.9529 21.0476 10.9197 21.3009 11.0178C25.474 12.6329 29.647 14.2487 33.8201 15.8638C35.3268 16.447 36.3208 17.8972 36.3208 19.513V31.3364C36.3208 33.0509 35.77 34.7806 34.6746 36.1265C34.13 36.7953 33.4605 37.3558 32.6888 37.7492C31.9172 38.1427 31.0744 38.3539 30.2061 38.3539C29.3378 38.3539 28.4937 38.1427 27.722 37.7485C26.951 37.3551 26.2822 36.7947 25.7376 36.1265C24.6429 34.7806 24.0922 33.0509 24.0922 31.3371V21.7458C24.0922 19.4087 22.7055 17.2939 20.5617 16.3621C20.3298 16.2613 20.1793 16.0322 20.1793 15.7789Z"
      fill="#FFA400"
    />
    {/* Teal shape — left U */}
    <path
      d="M24.1559 37.2761C24.0558 37.1498 23.9592 37.0214 23.8667 36.8896C23.6969 36.6494 23.5388 36.4009 23.3932 36.1448C23.2482 35.8908 23.1157 35.6299 22.9956 35.3628C22.8769 35.0991 22.7706 34.8306 22.6761 34.5573C22.5836 34.2888 22.5028 34.0162 22.4338 33.7408C22.3668 33.4716 22.3109 33.199 22.2668 32.9249C22.224 32.6585 22.1915 32.39 22.1708 32.1202C22.1501 31.8593 22.1398 31.5977 22.1398 31.3361V21.7462C22.1398 20.1304 21.1465 18.6802 19.6391 18.097C17.4228 17.239 15.2065 16.3811 12.9902 15.5232C12.7362 15.4251 12.4505 15.4583 12.2261 15.6122C12.0018 15.7661 11.8679 16.0208 11.8679 16.2928V27.1706C11.8679 28.9472 12.4056 30.6817 13.4092 32.1471C14.4135 33.6124 15.8374 34.7395 17.4939 35.3814C19.5839 36.1904 21.6739 36.9993 23.7638 37.8082C23.9081 37.8642 24.0717 37.8165 24.1628 37.6923C24.2546 37.5681 24.2511 37.3976 24.1552 37.2768L24.1559 37.2761Z"
      fill="#00BBB4"
    />
  </svg>
)

// ── Tab item ──────────────────────────────────────────────────────────────────
function TabItem({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center shrink-0 transition-colors"
      style={{
        width: 75,
        height: 54,
        borderRadius: 9999,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 4,
        paddingBottom: 4,
        gap: 2,
        background: active ? '#000000' : '#151516',
        border: '1px solid #222222',
        cursor: 'pointer',
        boxSizing: 'border-box',
      }}
    >
      {icon}
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          lineHeight: '14px',
          fontWeight: 400,
          color: active ? '#f9fafb' : '#484848',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </button>
  )
}

// ── Center FAB ────────────────────────────────────────────────────────────────
function CenterFAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center shrink-0 transition-opacity hover:opacity-90 active:scale-95"
      style={{
        width: 48,
        height: 48,
        borderRadius: 9999,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <UTransferLogo />
    </button>
  )
}

/**
 * TabBar component
 *
 * @param {string}   active     - 'home' | 'movimientos' | 'beneficios' | 'ajustes'
 * @param {function} onNavigate - (tab: string) => void
 * @param {function} onFAB      - () => void — center logo button
 */
export function TabBar({ active = 'home', onNavigate, onFAB }) {
  const nav = (tab) => onNavigate?.(tab)

  return (
    <div
      style={{
        width: 362,
        height: 70,
        borderRadius: 40,
        background: '#151516',
        padding: 8,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: 54,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TabItem
          label="Inicio"
          icon={<HomeIcon active={active === 'home'} />}
          active={active === 'home'}
          onClick={() => nav('home')}
        />
        <TabItem
          label="Movimientos"
          icon={<MovimientosIcon active={active === 'movimientos'} />}
          active={active === 'movimientos'}
          onClick={() => nav('movimientos')}
        />

        <div className="flex items-center justify-center" style={{ width: 48, height: 54 }}>
          <CenterFAB onClick={onFAB} />
        </div>

        <TabItem
          label="Beneficios"
          icon={<BeneficiosIcon active={active === 'beneficios'} />}
          active={active === 'beneficios'}
          onClick={() => nav('beneficios')}
        />
        <TabItem
          label="Ajustes"
          icon={<AjustesIcon active={active === 'ajustes'} />}
          active={active === 'ajustes'}
          onClick={() => nav('ajustes')}
        />
      </div>
    </div>
  )
}

/**
 * TabBarFixed — positioned fixed at bottom (for real app use)
 */
export function TabBarFixed({ active, onNavigate, onFAB }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 pt-2" style={{ zIndex: 50 }}>
      <TabBar active={active} onNavigate={onNavigate} onFAB={onFAB} />
    </div>
  )
}
