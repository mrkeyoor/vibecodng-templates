// Source slug: hyperui-blog-cards-4
// Author repo: https://github.com/markmead/hyperui
import ProductIllustration from './ProductIllustration.jsx'
const products=[
  {name:'Dawn Cup',color:'Chalk / Stoneware',price:'£34',kind:'cup'},
  {name:'Folded Napkin Set',color:'Oat / Belgian linen',price:'£48',photo:'photos/textile.webp',alt:'Stack of folded natural linen napkins in oat, clay, and cream'},
  {name:'Pour Bowl',color:'Earth / Stoneware',price:'£56',photo:'photos/bowl.webp',alt:'Hand-thrown cream stoneware bowl with a softly textured glaze'},
  {name:'Window Throw',color:'Clay / Welsh wool',price:'£120',kind:'throw'},
  {name:'Sunday Board',color:'Ash / Food-safe oil',price:'£68',kind:'board'},
  {name:'Morning Carafe',color:'Clear / Recycled glass',price:'£72',kind:'carafe'},
  {name:'Hearth Candle',color:'Honey / Beeswax',price:'£28',kind:'candle'},
  {name:'Market Basket',color:'Rush / Hand woven',price:'£94',kind:'basket'},
]
export default function Products(){return <section id="shop" className="section products" data-reveal-group><div className="shell"><header className="section-head" data-reveal><div><span>THE COMPLETE EDIT / 08 OBJECTS</span><h2>Made for the table.<br/>Built for daily use.</h2></div><a href="#shop">View all objects →</a></header><div className="product-grid">{products.map(({name,color,price,kind,photo,alt},i)=><article key={name} data-reveal style={{'--order':i}}><a href="#shop" className={`product-art${photo?' product-art-photo':''}`} aria-label={`View ${name}`}>{photo?<img src={`${import.meta.env.BASE_URL}${photo}`} alt={alt} loading="lazy" decoding="async"/>:<ProductIllustration kind={kind}/>}<span>Quick add +</span></a><div className="product-info"><p><strong>{name}</strong><small>{color}</small></p><span>{price}</span></div></article>)}</div></div></section>}
