import styles from "./hero-concept.module.css";

/** Brand illustration, deliberately not a client product or interactive UI. */
export default function HeroConcept() {
  return (
    <figure className={styles.concept} aria-label="ICE TECH concept illustration: a digital interface connected to application logic and data">
      <div className={styles.label} aria-hidden="true"><span>ICE TECH / Digital systems</span><span>Concept</span></div>
      <svg viewBox="0 0 680 480" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="hero-concept-surface" x1="125" y1="142" x2="392" y2="340" gradientUnits="userSpaceOnUse"><stop stopColor="#e0efff" /><stop offset="1" stopColor="#f3f8ff" /></linearGradient>
          <linearGradient id="hero-concept-panel" x1="196" y1="187" x2="325" y2="305" gradientUnits="userSpaceOnUse"><stop stopColor="#71adff" /><stop offset="1" stopColor="#287aeb" /></linearGradient>
        </defs>

        <rect x="38" y="10" width="613" height="345" rx="12" fill="#e6f0fd" fillOpacity=".65" stroke="#c6d9ed" />
        <rect x="14" y="28" width="613" height="345" rx="12" fill="#fcfdff" stroke="#a8c1df" />
        <path d="M14 77H627" stroke="#d9e5f3" />
        <g fill="#a7bdd6"><circle cx="37" cy="53" r="3" /><circle cx="49" cy="53" r="3" /><circle cx="61" cy="53" r="3" /></g>
        <text x="320" y="57" textAnchor="middle" fill="#5d7593" fontSize="11" letterSpacing="1.4">ICE TECH</text>
        <path d="m589 48 6 5-6 5m-6-10-6 5 6 5" stroke="#7c9fc7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        <path d="M82 77V373" stroke="#e1eaf5" />
        <rect x="32" y="98" width="32" height="32" rx="8" fill="#e7f1ff" />
        <g stroke="#2c83f6" strokeWidth="1.5" strokeLinejoin="round"><rect x="41" y="107" width="5" height="5" rx="1" /><rect x="50" y="107" width="5" height="5" rx="1" /><rect x="41" y="116" width="5" height="5" rx="1" /><rect x="50" y="116" width="5" height="5" rx="1" /></g>
        <g stroke="#8ca8c9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M41 155h14m-14 5h10m-10 5h14M41 191l7-4 7 4-7 4-7-4Zm0 5 7 4 7-4m-14 5 7 4 7-4" /><circle cx="48" cy="341" r="7" /><path d="M45 341h6m-3-3v6" /></g>

        <text x="107" y="112" fill="#17304f" fontSize="18" fontWeight="600" letterSpacing="-.5">Digital product</text>
        <text x="107" y="133" fill="#66809e" fontSize="10">Designed. Developed. Connected.</text>
        <rect x="539" y="99" width="62" height="24" rx="12" fill="#edf5ff" stroke="#cbdff6" />
        <text x="570" y="115" textAnchor="middle" fill="#4e79b0" fontSize="9">Interface</text>

        <rect x="107" y="154" width="278" height="175" rx="8" fill="url(#hero-concept-surface)" stroke="#cddff1" />
        <g stroke="#c3d8ef" strokeWidth="1"><path d="M137 191H355M137 221H355M137 251H355M137 281H355M166 174V309M206 174V309M246 174V309M286 174V309M326 174V309" /></g>
        <path d="m176 259 70-39 70 39-70 39-70-39Z" fill="#c4dcf8" stroke="#a0bfe5" />
        <path d="m176 237 70-39 70 39-70 39-70-39Z" fill="#d9eaff" stroke="#8ab6ed" />
        <path d="m176 215 70-39 70 39-70 39-70-39Z" fill="url(#hero-concept-panel)" stroke="#619ce9" />
        <path d="m223 216 16-17 13 12 9-4 11 9-29 15-20-15Z" fill="#fff" fillOpacity=".95" />
        <g fill="#6d99cd"><circle cx="137" cy="191" r="2" /><circle cx="355" cy="281" r="2" /></g>

        <rect x="400" y="154" width="201" height="76" rx="8" fill="#f8fbff" stroke="#d4e2f1" />
        <text x="417" y="177" fill="#526f90" fontSize="10">Reusable components</text>
        <g stroke="#b7cfea" fill="#e6f1ff"><rect x="417" y="190" width="45" height="22" rx="4" /><rect x="471" y="190" width="28" height="22" rx="4" /><rect x="508" y="190" width="76" height="22" rx="4" /></g>
        <rect x="400" y="244" width="201" height="85" rx="8" fill="#f8fbff" stroke="#d4e2f1" />
        <text x="417" y="269" fill="#526f90" fontSize="10">Connected workflows</text>
        <path d="M425 297H471Q483 297 483 285V284Q483 277 491 277H565" stroke="#76a8e7" strokeWidth="1.5" />
        <g fill="#f8fbff" stroke="#5f9cec" strokeWidth="1.5"><circle cx="425" cy="297" r="4" /><circle cx="482" cy="291" r="4" /><circle cx="565" cy="277" r="4" /></g>
        <path d="M108 351H182m10 0h34" stroke="#c4d4e7" strokeWidth="3" strokeLinecap="round" />
        <text x="598" y="355" textAnchor="end" fill="#7890ac" fontSize="9">Interface layer</text>

        <path d="M240 373V414Q240 430 256 430H347" stroke="#649ee6" strokeWidth="1.5" />
        <circle cx="240" cy="390" r="3" fill="#2c83f6" />
        <rect x="347" y="399" width="280" height="62" rx="9" fill="#0c233f" />
        <rect x="360" y="411" width="37" height="37" rx="7" fill="#183959" stroke="#325779" />
        <path d="m373 421-6 8 6 8m11-16 6 8-6 8m-5-18-4 21" stroke="#8fc0ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="413" y="424" fill="#e1edff" fontSize="12" fontWeight="500">Application + data</text>
        <text x="413" y="442" fill="#95b4d9" fontSize="9">Logic, APIs and integrations</text>
        <circle cx="606" cy="430" r="3" fill="#7db4ff" />
      </svg>
      <figcaption>From a thoughtful interface to a connected system.</figcaption>
    </figure>
  );
}
