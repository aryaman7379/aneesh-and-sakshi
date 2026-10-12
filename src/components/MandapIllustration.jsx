/**
 * Hand-crafted gold line-art: floral mandap, stylized couple, havan, diyas,
 * kalash pots, bells and doves. Groups expose classes for entrance / sway CSS.
 */
export default function MandapIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 320 360"
      className={`std-illustration ${className}`}
      role="img"
      aria-label="Gold line illustration of a wedding mandap with bride and groom, sacred fire, diyas and kalash pots"
    >
      {/* Outer arch frame */}
      <g className="std-arch std-draw" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path className="std-stroke"
          pathLength="1"
          d="M28 330 V90 C28 40 80 18 160 18 C240 18 292 40 292 90 V330"
        />
        <path className="std-stroke"
          pathLength="1"
          d="M40 330 V96 C40 52 88 30 160 30 C232 30 280 52 280 96 V330"
          opacity="0.55"
          strokeWidth="0.8"
        />
      </g>

      {/* Background mandala (faint) is drawn in CSS as a separate layer */}

      {/* Mandap structure */}
      <g className="mandap std-draw" fill="none" stroke="currentColor" strokeWidth="1.35">
        {/* Pillars */}
        <path className="std-stroke" pathLength="1" d="M78 300 V128" />
        <path className="std-stroke" pathLength="1" d="M108 300 V118" />
        <path className="std-stroke" pathLength="1" d="M212 300 V118" />
        <path className="std-stroke" pathLength="1" d="M242 300 V128" />
        {/* Canopy dome */}
        <path className="std-stroke" pathLength="1" d="M70 128 C70 88 110 62 160 58 C210 62 250 88 250 128" />
        <path className="std-stroke" pathLength="1" d="M70 128 H250" />
        <path className="std-stroke" pathLength="1" d="M88 118 C110 96 140 88 160 86 C180 88 210 96 232 118" opacity="0.7" />
        {/* Kalash finial */}
        <path className="std-stroke" pathLength="1" d="M160 58 V42" />
        <ellipse className="std-stroke" cx="160" cy="40" rx="7" ry="4" pathLength="1" />
        <circle className="std-stroke" cx="160" cy="32" r="3.5" pathLength="1" />
        <path className="std-stroke" pathLength="1" d="M160 28 L157 20 M160 28 L163 20 M160 28 L160 18" strokeWidth="1" />
        {/* Sheer curtains */}
        <g className="curtain curtain-l" style={{ transformOrigin: '90px 128px' }}>
          <path className="std-stroke" pathLength="1" d="M78 128 C92 160 70 200 88 250 C96 270 84 290 90 300" />
          <path className="std-stroke" pathLength="1" d="M108 118 C118 150 102 190 114 240" opacity="0.65" />
        </g>
        <g className="curtain curtain-r" style={{ transformOrigin: '230px 128px' }}>
          <path className="std-stroke" pathLength="1" d="M242 128 C228 160 250 200 232 250 C224 270 236 290 230 300" />
          <path className="std-stroke" pathLength="1" d="M212 118 C202 150 218 190 206 240" opacity="0.65" />
        </g>
      </g>

      {/* Garlands */}
      <g className="garland std-draw" fill="none" stroke="var(--color-rose-light)" strokeWidth="1.2">
        <g className="garland-swag" style={{ transformOrigin: '160px 130px' }}>
          <path className="std-stroke" pathLength="1" d="M78 132 C110 168 140 168 160 150 C180 168 210 168 242 132" />
          <path className="std-stroke"
            pathLength="1"
            d="M108 122 C130 148 150 148 160 136 C170 148 190 148 212 122"
            opacity="0.75"
          />
        </g>
        {[100, 130, 160, 190, 220].map((x) => (
          <circle key={x} className="std-fill" cx={x} cy={x === 160 ? 152 : 145} r="3.2" fill="var(--color-gold)" stroke="none" />
        ))}
      </g>

      {/* Hanging jasmine + bells */}
      <g className="bells std-draw" fill="none" stroke="currentColor" strokeWidth="1">
        <g className="bell" style={{ transformOrigin: '120px 140px' }}>
          <path className="std-stroke" pathLength="1" d="M120 140 V158" />
          <path className="std-stroke" pathLength="1" d="M114 158 H126 L123 168 H117 Z" />
          <circle cx="120" cy="170" r="1.4" fill="currentColor" stroke="none" />
        </g>
        <g className="bell" style={{ transformOrigin: '200px 140px' }}>
          <path className="std-stroke" pathLength="1" d="M200 140 V158" />
          <path className="std-stroke" pathLength="1" d="M194 158 H206 L203 168 H197 Z" />
          <circle cx="200" cy="170" r="1.4" fill="currentColor" stroke="none" />
        </g>
        <g className="jasmine" style={{ transformOrigin: '145px 138px' }}>
          <path className="std-stroke" pathLength="1" d="M145 138 V175" opacity="0.6" />
          <circle cx="145" cy="178" r="2" fill="var(--color-cream)" stroke="currentColor" strokeWidth="0.6" />
        </g>
        <g className="jasmine" style={{ transformOrigin: '175px 138px' }}>
          <path className="std-stroke" pathLength="1" d="M175 138 V172" opacity="0.6" />
          <circle cx="175" cy="175" r="2" fill="var(--color-cream)" stroke="currentColor" strokeWidth="0.6" />
        </g>
      </g>

      {/* Couple silhouettes */}
      <g className="couple std-draw" fill="none" stroke="currentColor" strokeWidth="1.35">
        {/* Groom */}
        <g className="groom">
          <ellipse className="std-fill" cx="132" cy="210" rx="16" ry="28" fill="var(--color-maroon)" fillOpacity="0.35" stroke="none" />
          <path className="std-stroke" pathLength="1" d="M118 238 C118 200 146 200 146 238" />
          <circle className="std-stroke" pathLength="1" cx="132" cy="188" r="11" />
          {/* Turban */}
          <path className="std-stroke" pathLength="1" d="M121 182 C124 170 140 168 143 182" />
          <path className="std-stroke" pathLength="1" d="M132 168 V160" />
          <circle cx="132" cy="158" r="2" fill="currentColor" stroke="none" />
          {/* Dupatta / sash */}
          <path className="std-stroke" pathLength="1" d="M120 210 C128 218 136 218 144 210" opacity="0.7" />
        </g>
        {/* Bride */}
        <g className="bride">
          <ellipse className="std-fill" cx="188" cy="214" rx="18" ry="30" fill="var(--color-rose)" fillOpacity="0.35" stroke="none" />
          <path className="std-stroke" pathLength="1" d="M170 244 C170 200 206 200 206 244" />
          <circle className="std-stroke" pathLength="1" cx="188" cy="188" r="11" />
          {/* Dupatta over head */}
          <path className="std-stroke" pathLength="1" d="M176 186 C178 174 198 174 200 186 C206 200 210 220 204 238" />
          <path className="std-stroke" pathLength="1" d="M172 200 C168 220 170 236 174 244" opacity="0.7" />
        </g>
        {/* Hands / closeness hint */}
        <path className="std-stroke" pathLength="1" d="M146 220 C158 224 162 224 174 220" opacity="0.8" />
      </g>

      {/* Havan kund + flame */}
      <g className="flame-group std-draw" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path className="std-stroke" pathLength="1" d="M148 268 H172 L168 278 H152 Z" />
        <path className="std-stroke" pathLength="1" d="M152 268 V262 H168 V268" />
        <g className="flame" style={{ transformOrigin: '160px 250px' }}>
          <path className="std-stroke"
            pathLength="1"
            d="M160 248 C166 256 168 262 160 268 C152 262 154 256 160 248"
            fill="var(--color-gold)"
            fillOpacity="0.85"
            stroke="var(--color-gold-dark)"
          />
          <path
            d="M160 254 C163 258 163 262 160 265 C157 262 157 258 160 254"
            fill="var(--color-cream)"
            stroke="none"
          />
        </g>
      </g>

      {/* Ground diyas */}
      <g className="diyas std-draw" fill="none" stroke="currentColor" strokeWidth="1.1">
        <g transform="translate(62 292)">
          <ellipse cx="0" cy="8" rx="12" ry="4" fill="var(--color-maroon)" fillOpacity="0.25" stroke="none" />
          <path className="std-stroke" pathLength="1" d="M-10 6 C-8 12 8 12 10 6" />
          <g className="flame" style={{ transformOrigin: '0px -2px' }}>
            <path d="M0 -10 C4 -2 3 4 0 6 C-3 4 -4 -2 0 -10" fill="var(--color-gold)" stroke="var(--color-gold-dark)" />
          </g>
        </g>
        <g transform="translate(258 292)">
          <ellipse cx="0" cy="8" rx="12" ry="4" fill="var(--color-maroon)" fillOpacity="0.25" stroke="none" />
          <path className="std-stroke" pathLength="1" d="M-10 6 C-8 12 8 12 10 6" />
          <g className="flame" style={{ transformOrigin: '0px -2px' }}>
            <path d="M0 -10 C4 -2 3 4 0 6 C-3 4 -4 -2 0 -10" fill="var(--color-gold)" stroke="var(--color-gold-dark)" />
          </g>
        </g>
      </g>

      {/* Kalash pots with mango leaves + coconut */}
      <g className="kalash std-draw" fill="none" stroke="currentColor" strokeWidth="1.15">
        <g transform="translate(88 300)">
          <path className="std-stroke" pathLength="1" d="M-10 0 C-12 14 12 14 10 0" />
          <path className="std-stroke" pathLength="1" d="M-8 0 H8" />
          <ellipse className="std-stroke" cx="0" cy="-4" rx="5" ry="3" pathLength="1" />
          <path className="std-stroke" pathLength="1" d="M0 -7 V-14 M-6 -10 C-2 -16 2 -16 6 -10" />
          <circle cx="0" cy="-16" r="3" fill="var(--color-cream)" stroke="currentColor" />
        </g>
        <g transform="translate(232 300)">
          <path className="std-stroke" pathLength="1" d="M-10 0 C-12 14 12 14 10 0" />
          <path className="std-stroke" pathLength="1" d="M-8 0 H8" />
          <ellipse className="std-stroke" cx="0" cy="-4" rx="5" ry="3" pathLength="1" />
          <path className="std-stroke" pathLength="1" d="M0 -7 V-14 M-6 -10 C-2 -16 2 -16 6 -10" />
          <circle cx="0" cy="-16" r="3" fill="var(--color-cream)" stroke="currentColor" />
        </g>
      </g>

      {/* Doves */}
      <g className="doves std-draw" fill="none" stroke="currentColor" strokeWidth="1">
        <g className="dove" style={{ transformOrigin: '118px 48px' }}>
          <path className="std-stroke" pathLength="1" d="M110 52 C114 46 122 46 126 52 C122 50 118 50 114 52" />
        </g>
        <g className="dove" style={{ transformOrigin: '202px 46px' }}>
          <path className="std-stroke" pathLength="1" d="M194 50 C198 44 206 44 210 50 C206 48 202 48 198 50" />
        </g>
      </g>

      {/* Base platform line */}
      <path
        className="std-draw std-stroke"
        pathLength="1"
        d="M50 312 H270"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}
