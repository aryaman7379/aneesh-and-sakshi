/**
 * Serves AVIF → WebP with width/height to avoid CLS.
 * Paths come from content.js image descriptors.
 */
export default function Picture({
  image,
  alt = '',
  className,
  style,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  sizes,
  imgRef,
  as: Img = 'img',
  ...rest
}) {
  const { avif, webp, src, width, height } = image;
  const imgProps = {
    src,
    alt,
    width,
    height,
    className,
    style,
    loading,
    decoding,
    sizes,
    ref: imgRef,
    ...rest,
  };
  if (fetchPriority) imgProps.fetchPriority = fetchPriority;

  if (!avif && !webp) {
    return <Img {...imgProps} />;
  }

  return (
    <picture>
      {avif && <source type="image/avif" srcSet={avif} sizes={sizes} />}
      {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
      <Img {...imgProps} />
    </picture>
  );
}
