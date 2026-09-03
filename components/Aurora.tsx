/**
 * The light the liquid glass refracts. Five soft blobs in the site's accent
 * colours drift slowly behind the whole page (fixed, so every surface keeps a
 * coloured backdrop as you scroll). Pure CSS — see `.lg-aurora` in
 * app/globals.css; motion is transform-only so it stays on the compositor.
 */
export default function Aurora() {
  return (
    <div className="lg-aurora" aria-hidden="true">
      <span className="lg-aurora-violet" />
      <span className="lg-aurora-lilac" />
      <span className="lg-aurora-periwinkle" />
      <span className="lg-aurora-rose" />
      <span className="lg-aurora-deep" />
    </div>
  );
}
