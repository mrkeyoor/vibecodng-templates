// Source slug: tripled-gallery-grid-block-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
const photos = [
  ['photos/interior.webp','Sunlit Amber Room cafe interior with wooden tables and tall black-framed windows','The front room'],
  ['photos/pour.webp','Fresh filter coffee pouring into a glass carafe','Our daily ritual'],
  ['photos/pastry.webp','Croissants and small pastries served on a ceramic platter','From the pastry counter'],
  ['art/window-seat.png','Flat geometric illustration of the cafe window seat','The window seat'],
  ['art/stay-awhile.png','Flat geometric illustration of friends sharing coffee','Stay a while'],
]
export default function Gallery(){return <section id="gallery" className="section shell"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end" data-reveal><div><p className="kicker"><span/> Inside Amber Room</p><h2 className="section-title mt-5">Come as you are.</h2></div><p className="max-w-sm leading-7 text-muted">A room with golden light, scratched wooden tables, and no pressure to hurry.</p></div><div className="gallery mt-14">{photos.map(([src,alt,label],i)=><figure key={src} className={`gallery-${i+1}`} data-reveal style={{'--delay':`${i*60}ms`}}><img src={`${import.meta.env.BASE_URL}${src}`} alt={alt} loading="lazy" decoding="async"/><figcaption>{label}<span>0{i+1}</span></figcaption></figure>)}</div></section>}
